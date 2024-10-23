import styled from 'styled-components';
import { useAppSelector } from '../../hooks/redux';
import { useAppDispatch } from '../../redux/hooks';
import { setSortingKey, sorting, switchSorting } from '../../redux/orders/ordersSlice';
import { Cell, MarketTableColumnWidths, Head } from './Table';

const HeaderCell = styled(Cell)`
  justify-content: space-between;
  padding-right: 5px;
  &:hover {
    background-color: ${({ theme, $interactive }) =>
      $interactive ? theme.colors.emBlack : theme.colors.emDarkGrey};
  }
`;

interface Props {
  isBuy?: boolean;
}

export function TableHead({ isBuy }: Props) {
  const dispatch = useAppDispatch();
  const sortingState = useAppSelector(sorting)[isBuy ? 'buy' : 'sell'];
  const { key, direction } = sortingState;
  const indicator = direction === 'asc' ? '▲' : '▼';

  const { regionW, quantityW, priceW, locationW, jumpsW, expiresW, lastModifiedW } =
    MarketTableColumnWidths;

  function handleClick(clickedKey: 'price' | 'volume') {
    if (key === clickedKey) {
      dispatch(switchSorting(isBuy ? 'buy' : 'sell'));
    } else {
      dispatch(setSortingKey({ key: clickedKey, type: isBuy ? 'buy' : 'sell' }));
    }
  }

  return (
    <Head>
      <HeaderCell $interactive width={regionW}>
        Region
      </HeaderCell>
      <HeaderCell $interactive onClick={() => handleClick('volume')} width={quantityW}>
        <span>Quantity</span>
        <span>{key === 'volume' && indicator}</span>
      </HeaderCell>
      <HeaderCell $interactive onClick={() => handleClick('price')} width={priceW}>
        <span>Price</span>
        <span>{key === 'price' && indicator}</span>
      </HeaderCell>
      <HeaderCell $interactive width={locationW}>
        Location
      </HeaderCell>
      <HeaderCell $interactive width={jumpsW}>
        Jumps
      </HeaderCell>
      <HeaderCell $interactive width={expiresW}>
        Expires In
      </HeaderCell>
      <HeaderCell $interactive width={lastModifiedW}>
        Last Modified
      </HeaderCell>
    </Head>
  );
}
