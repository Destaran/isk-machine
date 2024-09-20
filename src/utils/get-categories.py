import aiohttp
import asyncio
import json
import ssl
import certifi

# API endpoints
MARKET_GROUPS_API = "https://esi.evetech.net/latest/markets/groups/?datasource=tranquility"
MARKET_GROUP_DETAILS_API = "https://esi.evetech.net/latest/markets/groups/{}/?datasource=tranquility&language=en"

# SSL context to use certifi's certificates
ssl_context = ssl.create_default_context(cafile=certifi.where())

# Function to fetch list of market group IDs


async def fetch_market_group_ids(session):
    async with session.get(MARKET_GROUPS_API) as response:
        if response.status == 200:
            return await response.json()
        else:
            print(
                f"Failed to retrieve market group IDs, status code: {response.status}")
            return []

# Function to fetch details for a specific market group ID, with delay


async def fetch_market_group_details(session, market_group_id, delay):
    url = MARKET_GROUP_DETAILS_API.format(market_group_id)

    try:
        async with session.get(url) as response:
            if response.status == 200:
                print(
                    f"Successful request (200) for group ID {market_group_id}.")
                return await response.json()
            elif response.status == 420:  # Handle rate-limiting response
                print(
                    f"Rate limited (420) for group ID {market_group_id}. Retrying after delay...")
                await asyncio.sleep(delay)  # Retry after delay
                return await fetch_market_group_details(session, market_group_id, delay)
            else:
                print(
                    f"Failed to retrieve details for market group ID {market_group_id}, status code: {response.status}")
                return None
    except aiohttp.ClientError as e:
        print(f"Error occurred: {e}")
        return None

# Main function to coordinate fetching data and saving it to JSON


async def main():
    delay = 1  # Delay of 1 second between requests
    async with aiohttp.ClientSession(connector=aiohttp.TCPConnector(ssl=ssl_context)) as session:
        # Step 1: Retrieve the list of market group IDs
        market_group_ids = await fetch_market_group_ids(session)

        # Step 2: Fetch details for each market group ID with a delay between each request
        market_groups_details = []
        for market_group_id in market_group_ids:
            details = await fetch_market_group_details(session, market_group_id, delay)
            if details:
                market_groups_details.append(details)

            # Adding a delay between each request
            await asyncio.sleep(delay)

        # Step 3: Save the data into a JSON file
        with open('market_groups_details.json', 'w') as json_file:
            json.dump(market_groups_details, json_file, indent=4)

        print(f"Saved market group details to 'market_groups_details.json'")

# Run the script
if __name__ == "__main__":
    asyncio.run(main())
