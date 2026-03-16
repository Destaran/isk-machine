import styled from "styled-components";
import { Container, SectionTitle } from "../components/pageElements";
import { useCallback, useState } from "react";
import {
  getOpportunities,
  type OpportunitiesParams,
} from "../api/market/useGetOpportunities";
import { useDispatch } from "react-redux";
import { setOpportunities } from "../redux/orders/opportunitiesSlice";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Intro = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.emWhite};
  line-height: 1.5;
`;

const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const FieldCard = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.emDarkGrey};
  border: 1px solid ${({ theme }) => theme.colors.emBlack};
`;

const FieldLabel = styled.span`
  font-family: Orbitron;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.white};
`;

const FieldHint = styled.span`
  min-height: 2.4em;
  font-size: 0.85rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.emLightGrey};
`;

const StyledInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.emGrey};
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.emBlack};
  color: ${({ theme }) => theme.colors.white};
  padding: 10px 12px;
  font-size: 0.95rem;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.orange};
    outline-offset: 1px;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const FetchButton = styled.button`
  border: none;
  border-radius: 6px;
  padding: 12px 18px;
  background: ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.black};
  font-family: Orbitron;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    filter: brightness(1.05);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const defaultOpportunityFilters: OpportunitiesParams = {
  buyLocation: 60003760,
  sellLocation: 60003760,
  volatility: 0.25,
  margin: 0.2,
  maxMargin: 10,
  dailyProfit: 5000000,
  minVolume: 100,
};

const fieldConfigs: Array<{
  key: keyof OpportunitiesParams;
  label: string;
  hint: string;
  step?: string;
}> = [
  {
    key: "buyLocation",
    label: "Buy location",
    hint: "Station or structure ID used to read the highest buy order.",
  },
  {
    key: "sellLocation",
    label: "Sell location",
    hint: "Station or structure ID used to read the lowest sell order.",
  },
  {
    key: "margin",
    label: "Min margin",
    hint: "Minimum net margin after fees, expressed as a decimal.",
    step: "0.01",
  },
  {
    key: "maxMargin",
    label: "Max margin",
    hint: "Upper margin limit used to filter out unrealistic spreads.",
    step: "0.01",
  },
  {
    key: "volatility",
    label: "Volatility",
    hint: "Maximum 30-day price volatility allowed for a market item.",
    step: "0.01",
  },
  {
    key: "dailyProfit",
    label: "Daily profit",
    hint: "Minimum estimated ISK profit per day required to include an item.",
  },
  {
    key: "minVolume",
    label: "Min volume",
    hint: "Minimum tradeable volume at the best buy and sell prices.",
  },
];

export function Settings() {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState<OpportunitiesParams>(
    defaultOpportunityFilters,
  );

  const handleFilterChange =
    (key: keyof OpportunitiesParams) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilters((current) => ({
        ...current,
        [key]: event.target.valueAsNumber,
      }));
    };

  const handleGetOpportunities = useCallback(async () => {
    const opportunities = await getOpportunities(filters);
    localStorage.setItem("opportunities", JSON.stringify(opportunities));
    dispatch(setOpportunities(opportunities));
  }, [dispatch, filters]);

  return (
    <Container>
      <SectionTitle>Settings</SectionTitle>
      <Wrapper>
        <Intro>
          Tune the market filters below before fetching Jita flipper
          opportunities. Each value maps directly to the backend query.
        </Intro>
        <FieldsGrid>
          {fieldConfigs.map((field) => (
            <FieldCard key={field.key}>
              <FieldLabel>{field.label}</FieldLabel>
              <FieldHint>{field.hint}</FieldHint>
              <StyledInput
                type="number"
                step={field.step}
                value={filters[field.key]}
                onChange={handleFilterChange(field.key)}
              />
            </FieldCard>
          ))}
        </FieldsGrid>
      </Wrapper>
      <Actions>
        <FetchButton onClick={handleGetOpportunities}>
          Get opportunities
        </FetchButton>
      </Actions>
    </Container>
  );
}
