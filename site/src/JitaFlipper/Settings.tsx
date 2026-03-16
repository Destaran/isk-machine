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
        <input
          placeholder="Buy location"
          type="number"
          value={filters.buyLocation}
          onChange={handleFilterChange("buyLocation")}
        ></input>
        <input
          placeholder="Sell location"
          type="number"
          value={filters.sellLocation}
          onChange={handleFilterChange("sellLocation")}
        ></input>
        <input
          placeholder="Volatility"
          type="number"
          step="0.01"
          value={filters.volatility}
          onChange={handleFilterChange("volatility")}
        ></input>
        <input
          placeholder="Margin"
          type="number"
          step="0.01"
          value={filters.margin}
          onChange={handleFilterChange("margin")}
        ></input>
        <input
          placeholder="Max margin"
          type="number"
          step="0.01"
          value={filters.maxMargin}
          onChange={handleFilterChange("maxMargin")}
        ></input>
        <input
          placeholder="Daily profit"
          type="number"
          value={filters.dailyProfit}
          onChange={handleFilterChange("dailyProfit")}
        ></input>
        <input
          placeholder="Min volume"
          type="number"
          value={filters.minVolume}
          onChange={handleFilterChange("minVolume")}
        ></input>
      </Wrapper>
      <Wrapper>
        <button onClick={handleGetOpportunities}>Get opportunities</button>
      </Wrapper>
    </Container>
  );
}
