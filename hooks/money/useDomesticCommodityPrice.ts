"use client";

import { useState, useEffect, useCallback } from "react";

export type DomesticCommodity = {
  ten_hang_hoa: string;
  gia: number;
  don_vi: string;
  ngay: string;
};

export function useDomesticCommodityPrice(page: number, limit: number) {
  const [data, setData] = useState<DomesticCommodity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://wifeed.vn/api/du-lieu-vimo/hang-hoa/v2/gia-hang-hoa-trong-nuoc/ngay?page=${page}&limit=${limit}&data_type=value_today&apikey=demo`
      );

      const json = await res.json();
      setData(json.data || []);
    } catch {
      setError("Failed to fetch domestic commodity price");
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
}