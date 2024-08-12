export interface Region {
  id: number;
  constellations: number[];
  name: string;
}

export interface MarketGroup {
  description: string;
  market_group_id: number;
  name: string;
  parent_group_id?: number;
  types: number[];
}

export interface MarketOrder {
  duration: number;
  is_buy_order: boolean;
  issued: string;
  location_id: number;
  min_volume: number;
  order_id: number;
  price: number;
  range: string;
  system_id: number;
  type_id: number;
  volume_remain: number;
  volume_total: number;
}

export interface ItemType {
  capacity: number;
  description: string;
  dogma_attributes: Record<string, number>[];
  group_id: number;
  icon_id: number;
  market_group_id: number;
  mass: number;
  name: string;
  packaged_volume: number;
  portion_size: number;
  published: boolean;
  radius: number;
  type_id: number;
  volume: number;
}
