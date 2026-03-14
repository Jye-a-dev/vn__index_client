"use client";

import { useEffect, useState } from "react";

export type ExchangeRate = {
  ngay: string;
  kieu_thoi_gian: number;

  usd_nhtm_mua_vao: number;
  usd_nhtm_ban_ra: number;
  usd_nhtm_chuyen_khoan: number;

  usd_tu_do_mua_vao: number;
  usd_tu_do_ban_ra: number;

  usd_nhnn_trung_tam: number;
  usd_nhnn_tran: number;
  usd_nhnn_san: number;

  usd_nhnn_mua_vao: number;
  usd_nhnn_ban_ra: number;
};

type ApiResponse = {
  data: ExchangeRate[];
};

export function useExchangeRate(page: number = 1, limit: number = 100) {

  const [data, setData] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    async function fetchRates() {

      try {

        setLoading(true);

        const res = await fetch(
          `https://wifeed.vn/api/du-lieu-vimo/ty-gia?page=${page}&limit=${limit}&apikey=demo`
        );

        const json: ApiResponse = await res.json();

        setData(json.data || []);

      } catch (err) {

        console.error(err);
        setError("Failed to fetch exchange rate");

      } finally {

        setLoading(false);

      }
    }

    fetchRates();

  }, [page, limit]);

  return { data, loading, error };

}