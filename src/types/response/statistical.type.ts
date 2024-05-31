export interface StatisticalService {
  purchase: number;
  service: number;
  recharge: number;
  withdraw: number;
  user: number;
}

export interface StatisticalRevenue {
  month: number;
  day: number;
}

export interface StatisticalCharts {
  recharge_chart: Array<number>;
  user_chart: Array<number>;
}

interface Withdraw {
  withdraw_type: string;
  parcel?: number;
  total: number;
}

interface Withdraws {
  gamepass: Withdraw[];
  robux: Withdraw[];
  diamond: Withdraw[];
  units: Withdraw[]; 
}

interface Account {
  id: number;
  game_id: number;
  service_key: string;
  price: number;
  note: string;
  accounts_sum_price: number;
  accounts_count: number;
  game_list: {
    id: number;
    game_key: string;
    game_name: string;
  };
}

export interface ResponseStatisticalByDomain {
  withdraws: Withdraws;
  accounts: Account[];
}
