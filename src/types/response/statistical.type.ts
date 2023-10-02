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
