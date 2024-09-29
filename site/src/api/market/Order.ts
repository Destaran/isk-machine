export interface Order {
  order_id: number;
  duration: number;
  is_buy_order: boolean;
  issued: Date;
  min_volume: number;
  volume_remain: number;
  volume_total: number;
  location_id: number;
  system_id: number;
  region_id: number;
  type_id: number;
  price: number;
  range: string;
}
