import styled from "styled-components";
import { Cell, Row } from "../Market/Orders/Table";
import { useMarketGroups } from "../hooks/useMarketGroups";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";
import { useNavigate } from "react-router-dom";

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

const ItemContent = styled.div`
  min-width: 0;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ItemName = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface CopyButtonProps {
  $copied?: boolean;
}

const CopyButton = styled.button<CopyButtonProps>`
  flex-shrink: 0;
  padding: 4px 8px;
  border: 1px solid
    ${({ theme, $copied }) =>
      $copied ? theme.colors.orange : theme.colors.emGrey};
  border-radius: 4px;
  background-color: ${({ theme, $copied }) =>
    $copied ? "#3a2800" : theme.colors.emBlack};
  color: ${({ theme, $copied }) =>
    $copied ? theme.colors.orange : theme.colors.emWhite};
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;

  &:hover {
    border-color: ${({ theme }) => theme.colors.orange};
    color: ${({ theme }) => theme.colors.orange};
    cursor: pointer;
  }
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
  const navigate = useNavigate();
  const { copied, copyText } = useCopyToClipboard();
  const groups = useMarketGroups(opp.type_id);
  const isBp = groups?.includes("Blueprints") ? "bp" : "icon";
  const imgSrc = `https://images.evetech.net/types/${opp.type_id}/${isBp}?size=64`;
  const bestBuy = priceFormatter.format(opp.best_buy);
  const bestSell = priceFormatter.format(opp.best_sell);

  return (
    <OpportunitiesRow>
      <ItemCell title={opp.item_name}>
        <ItemIcon src={imgSrc} alt={opp.item_name} />
        <ItemContent>
          <ItemName>{opp.item_name}</ItemName>
          <CopyButton
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              void copyText(opp.item_name);
            }}
            title={`Copy ${opp.item_name}`}
            aria-label={`Copy ${opp.item_name}`}
            $copied={copied}
          >
            Copy
          </CopyButton>
          <CopyButton
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              navigate(`/market/${opp.type_id}`);
            }}
            title={`View ${opp.item_name} in market`}
            aria-label={`View ${opp.item_name} in market`}
          >
            Market
          </CopyButton>
        </ItemContent>
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
