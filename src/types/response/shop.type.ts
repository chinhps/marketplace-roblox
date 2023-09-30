export interface IShopList {
  id: number;
  stt: number;
  domain: string;
  shop: string;
  created_at: string;
}

export interface IShopDetailList extends IShopList {
  shop_detail: {
    id: number;
    shop_title: string;
    percent_recharge: string;
    cash_new_user: number;
    information: {
      keyword: string;
      logo_url: string;
      banner_url: string;
      favicon_url: string;
      background_url: string;
    };
  };
}
