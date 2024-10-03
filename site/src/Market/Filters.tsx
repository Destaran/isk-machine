import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setLocation } from '../redux/orders/ordersSlice';

const FilterName = styled.p`
  color: white;
`;

const Container = styled.div``;

const Row = styled.div`
  display: flex;
`;

export function Filters() {
  const dispatch = useDispatch();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setLocation(e.target.checked));
  }

  return (
    <Container>
      <Row>
        <FilterName>Market Hubs Only</FilterName>
        <input type="checkbox" onChange={handleChange} />
      </Row>
    </Container>
  );
}
