import { Navigation } from "./Navigation/Navigation";
import { PageBase } from "../components/PageBase";
import { Orders } from "./Orders/Orders";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useData } from "../api/market/useData";
import { useEffect } from "react";
import { resetData, setData } from "../redux/orders/ordersSlice";

const LAST_MARKET_ROUTE_KEY = "market:last-route";

export function Market() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data, isFetched, isError } = useData(Number(id), id ? true : false);

  useEffect(() => {
    if (id) {
      window.localStorage.setItem(LAST_MARKET_ROUTE_KEY, `/market/${id}`);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      return;
    }

    const savedRoute = window.localStorage.getItem(LAST_MARKET_ROUTE_KEY);
    if (savedRoute && /^\/market\/\d+$/.test(savedRoute)) {
      navigate(savedRoute, { replace: true });
    }
  }, [id, navigate]);

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
