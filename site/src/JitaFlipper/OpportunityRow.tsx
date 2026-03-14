import styled from "styled-components";
import { Cell, Row } from "../Market/Orders/Table";
import { useMarketGroups } from "../hooks/useMarketGroups";

const OpportunitiesRow = styled(Row)`
  display: contents;

  & > * {
    background-color: ${({ theme }) => theme.colors.emDarkGrey};
  }

  &:nth-child(even) > * {
    background-color: ${({ theme }) => theme.colors.emBlack};
  }

  &:hover > * {
    background-color: #3a2800;
  }
`;

const baseCell = `
  width: auto;
  min-width: 0;
  min-height: 64px;
  height: auto;
  line-height: 1.3;
  padding: 4px 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const OpportunitiesCell = styled(Cell)`
  ${baseCell}
`;

const ItemCell = styled(OpportunitiesCell)`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ItemIcon = styled.img`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
`;

const NumericCell = styled(OpportunitiesCell)`
  justify-content: flex-end;
  font-variant-numeric: tabular-nums;
`;

const PriceStackCell = styled(OpportunitiesCell)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  font-variant-numeric: tabular-nums;
`;

const PriceLine = styled.div`
  display: grid;
  grid-template-columns: 34px max-content max-content;
  align-items: baseline;
  column-gap: 6px;
  width: max-content;
`;

const PriceLabel = styled.span`
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.emLightGrey};
`;

const BuyPrice = styled.span`
  color: #e74c3c;
  font-weight: 600;
`;

const SellPrice = styled.span`
  color: #00ff00;
  font-weight: 600;
`;

interface MarginCellProps {
  $value: number;
}

const MarginCell = styled(NumericCell)<MarginCellProps>`
  color: ${({ theme }) => theme.colors.orange};
  font-weight: ${({ $value }) => ($value > 0.1 ? "600" : "400")};
`;

export interface Opportunity {
  type_id: number;
  item_name: string;
  best_buy: number;
  best_sell: number;
  net_margin: number;
  avg_daily_trade_value: number;
}

export interface OpportunityRowProps {
  opp: Opportunity;
  numberFormatter: Intl.NumberFormat;
  priceFormatter: Intl.NumberFormat;
  marginFormatter: Intl.NumberFormat;
}

export function OpportunityRow({
  opp,
  numberFormatter,
  priceFormatter,
  marginFormatter,
}: OpportunityRowProps) {
  const groups = useMarketGroups(opp.type_id);
  const isBp = groups?.includes("Blueprints") ? "bp" : "icon";
  const imgSrc = `https://images.evetech.net/types/${opp.type_id}/${isBp}?size=64`;
  const bestBuy = priceFormatter.format(opp.best_buy);
  const bestSell = priceFormatter.format(opp.best_sell);

  return (
    <OpportunitiesRow>
      <ItemCell title={opp.item_name}>
        <ItemIcon src={imgSrc} alt={opp.item_name} />
        {opp.item_name}
      </ItemCell>
      <PriceStackCell title={`Buy: ${bestBuy} ISK / Sell: ${bestSell} ISK`}>
        <PriceLine>
          <PriceLabel>Buy</PriceLabel>
          <BuyPrice>{bestBuy}</BuyPrice>
        </PriceLine>
        <PriceLine>
          <PriceLabel>Sell</PriceLabel>
          <SellPrice>{bestSell}</SellPrice>
        </PriceLine>
      </PriceStackCell>
      <MarginCell
        $value={opp.net_margin}
        title={`${marginFormatter.format(opp.net_margin * 100)}%`}
      >
        {marginFormatter.format(opp.net_margin * 100)}%
      </MarginCell>
      <NumericCell title={numberFormatter.format(opp.avg_daily_trade_value)}>
        {numberFormatter.format(opp.avg_daily_trade_value)}
      </NumericCell>
    </OpportunitiesRow>
  );
}
