import aiohttp
import asyncio
import json
import ssl
import certifi

TYPES_API = "https://esi.evetech.net/latest/universe/types/?datasource=tranquility&page={}"
TYPES_ID_API = "https://esi.evetech.net/latest/universe/types/{}/?datasource=tranquility&language=en"

ssl_context = ssl.create_default_context(cafile=certifi.where())

async def fetch_types_ids(session, page, delay=0.5):
    url_with_page = TYPES_API.format(page)

    try:
        async with session.get(url_with_page) as response:
            if response.status == 200:
                print(f"Successful request (200) for type IDs page {page}.")
                return await response.json()
            elif response.status == 420:
                print(
                    f"Rate limited (420) for page {page}. Retrying after {delay} seconds...")
                await asyncio.sleep(delay)
                return await fetch_types_ids(session, page, delay + 0.5)
            else:
                print(
                    f"Failed to retrieve type IDs, status code: {response.status}")
                return []
    except aiohttp.ClientError as e:
        print(f"Error occurred: {e}")
        return None

async def fetch_type(session, type_id, delay=0.5):
    url = TYPES_ID_API.format(type_id)

    try:
        async with session.get(url) as response:
            if response.status == 200:
                print(
                    f"Successful request (200) for group ID {type_id}.")
                return await response.json()
            elif response.status == 420:  
                print(
                    f"Rate limited (420) for group ID {type_id}. Retrying after {delay} seconds...")
                await asyncio.sleep(delay)
                return await fetch_type(session, type_id, delay + 0.5)
            else:
                print(
                    f"Failed to retrieve details for market group ID {type_id}, status code: {response.status}")
                return None
    except aiohttp.ClientError as e:
        print(f"Error occurred: {e}")
        return None

async def main():
    async with aiohttp.ClientSession(connector=aiohttp.TCPConnector(ssl=ssl_context)) as session:

        all_type_ids = []
        page_count = 49

        for page_num in range(1, page_count + 1):
            type_ids = await fetch_types_ids(session, page_num)
            all_type_ids.extend(type_ids)

        all_types = []

        for type_id in all_type_ids:
            details = await fetch_type(session, type_id)
            if details:
                all_types.append(details)

        with open('all_types.json', 'w') as json_file:
            json.dump(all_types, json_file, indent=4)

        print(f"Saved market group details to 'all_types.json'")

if __name__ == "__main__":
    asyncio.run(main())
