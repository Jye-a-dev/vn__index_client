export type BondYield = {
  ngay: string;

  vietnam_1y: number | null;
  vietnam_3y: number | null;
  vietnam_5y: number | null;
  vietnam_10y: number | null;
  vietnam_15y: number | null;
  vietnam_20y: number | null;

  us_1y: number | null;
  us_3y: number | null;
  us_5y: number | null;
  us_10y: number | null;
  us_20y: number | null;

  china_1y: number | null;
  china_3y: number | null;
  china_5y: number | null;
  china_10y: number | null;
  china_20y: number | null;

  japan_1y: number | null;
  japan_3y: number | null;
  japan_5y: number | null;
  japan_10y: number | null;
  japan_20y: number | null;

  south_korea_1y: number | null;
  south_korea_3y: number | null;
  south_korea_5y: number | null;
  south_korea_10y: number | null;
  south_korea_20y: number | null;

  taiwan_5y: number | null;
  taiwan_10y: number | null;
  taiwan_20y: number | null;

  india_1y: number | null;
  india_3y: number | null;
  india_5y: number | null;
  india_10y: number | null;

  indonesia_1y: number | null;
  indonesia_3y: number | null;
  indonesia_5y: number | null;
  indonesia_10y: number | null;
  indonesia_20y: number | null;

  malaysia_1y: number | null;
  malaysia_3y: number | null;
  malaysia_5y: number | null;
  malaysia_10y: number | null;
  malaysia_20y: number | null;

  philippines_1y: number | null;
  philippines_3y: number | null;
  philippines_5y: number | null;
  philippines_10y: number | null;
  philippines_20y: number | null;

  singapore_1y: number | null;
  singapore_5y: number | null;
  singapore_10y: number | null;
  singapore_20y: number | null;

  thailand_1y: number | null;
  thailand_3y: number | null;
  thailand_5y: number | null;
  thailand_10y: number | null;
  thailand_20y: number | null;
};

export type BondYieldResponse = {
  meta: {
    total_page: number;
    total_count: number;
  };
  data: BondYield[];
};