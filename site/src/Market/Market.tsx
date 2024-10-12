import { Navigation } from './Navigation/Navigation';
import { PageBase } from '../components/PageBase';
import { Orders } from './Orders/Orders';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useData } from '../api/market/useData';
import { useEffect } from 'react';
import { resetData, setData } from '../redux/orders/ordersSlice';

export function Market() {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const { data, isFetched, isError } = useData(Number(id), id ? true : false);

  useEffect(() => {
    if (isFetched && data) {
      dispatch(setData(data));
    } else if (!id) {
      dispatch(resetData());
    }
  }, [isFetched, dispatch, data, isError, id]);

  return (
    <PageBase>
      <Navigation />
      <Orders />
    </PageBase>
  );
}
