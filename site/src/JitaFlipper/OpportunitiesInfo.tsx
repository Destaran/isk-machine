import styled from "styled-components";
import { useAppSelector } from "../redux/hooks";
import {
  lastOpportunityFetchedAt,
  lastOpportunityQuery,
  opportunities as selectOpportunities,
} from "../redux/orders/opportunitiesSlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  gap: 12px;
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.emDarkGrey};
  border-radius: 8px;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.emDarkGrey} 0%,
    ${({ theme }) => theme.colors.emBlack} 100%
  );
`;

const Header = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
`;

const Title = styled.h2`
  margin: 0;
  font-family: Orbitron;
  font-size: 1rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const ResultBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.orange};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  white-space: nowrap;
`;

const Meta = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.emLightGrey};
  font-size: 11px;
  line-height: 1.4;
`;

const Text = styled.p`
  margin: 0;
  font-size: 11px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.emWhite};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.emGrey};
  background-color: ${({ theme }) => theme.colors.emDarkGrey};
`;

const StatLabel = styled.span`
  color: ${({ theme }) => theme.colors.emLightGrey};
  font-size: 10px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const StatValue = styled.span`
  color: ${({ theme }) => theme.colors.emWhite};
  font-size: 13px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
`;

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <StatCard>
      <StatLabel>{label}</StatLabel>
      <StatValue>{value}</StatValue>
    </StatCard>
  );
}

export function OpportunitiesInfo() {
  const query = useAppSelector(lastOpportunityQuery);
  const fetchedAt = useAppSelector(lastOpportunityFetchedAt);
  const opportunities = useAppSelector(selectOpportunities);

  if (!query) {
    return (
      <Container>
        <Title>Last Opportunity Query</Title>
        <Text>
          Fetch opportunities to store the executed filters and result summary
          here.
        </Text>
      </Container>
    );
  }

  const countFormatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  });
  const percentFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const fetchedAtText = fetchedAt
    ? dateFormatter.format(new Date(fetchedAt))
    : "Unknown";

  const stats = [
    {
      label: "Buy location",
      value: countFormatter.format(query.buyLocation),
    },
    {
      label: "Sell location",
      value: countFormatter.format(query.sellLocation),
    },
    {
      label: "Margin range",
      value: `${percentFormatter.format(query.margin * 100)}% to ${percentFormatter.format(query.maxMargin * 100)}%`,
    },
    {
      label: "Max volatility",
      value: `${percentFormatter.format(query.volatility * 100)}%`,
    },
    {
      label: "Min daily profit",
      value: `${countFormatter.format(query.dailyProfit)} ISK`,
    },
    {
      label: "Min volume",
      value: countFormatter.format(query.minVolume),
    },
  ];

  return (
    <Container>
      <Header>
        <Title>Last Opportunity Query</Title>
        <ResultBadge>
          {countFormatter.format(opportunities.length)} results
        </ResultBadge>
      </Header>
      <Meta>Fetched: {fetchedAtText}</Meta>
      <StatsGrid>
        {stats.map((stat) => (
          <Stat key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </StatsGrid>
    </Container>
  );
}
