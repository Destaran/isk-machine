import styled from "styled-components";
import { Container, SectionTitle } from "../components/pageElements";
import { useCallback, useState } from "react";
import { getOpportunities } from "../api/market/useGetOpportunities";
import { useDispatch } from "react-redux";
import { setOpportunities } from "../redux/orders/opportunitiesSlice";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export function Settings() {
  const dispatch = useDispatch();
  const [buyLocation, setBuyLocation] = useState("");
  const [sellLocation, setSellLocation] = useState("");

  const handleGetOpportunities = useCallback(async () => {
    const opportunities = await getOpportunities();
    localStorage.setItem("opportunities", JSON.stringify(opportunities));
    dispatch(setOpportunities(opportunities));
  }, [dispatch]);

  return (
    <Container>
      <SectionTitle>Settings</SectionTitle>
      <Wrapper>
        <input
          placeholder="Buy location"
          value={buyLocation}
          onChange={(e) => setBuyLocation(e.target.value)}
        ></input>
        <input
          placeholder="Sell location"
          value={sellLocation}
          onChange={(e) => setSellLocation(e.target.value)}
        ></input>
        <input placeholder="Volatility" type="number"></input>
        <input placeholder="Margin" type="number"></input>
        <input placeholder="Daily profit" type="number"></input>
        <input placeholder="Min volume" type="number"></input>
      </Wrapper>
      <Wrapper>
        <button onClick={handleGetOpportunities}>Get opportunities</button>
      </Wrapper>
    </Container>
  );
}
