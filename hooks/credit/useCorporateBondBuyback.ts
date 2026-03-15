"use client";

import { useEffect, useState, useCallback } from "react";

export type CorporateBondBuyback = {
  ma_trai_phieu: string;
  doanh_nghiep: string;
  gia_tri_mua_lai: number;
  ngay_mua_lai: string;
};

export function useCorporateBondBuyback() {
  const [data, setData] = useState<CorporateBondBuyback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://wifeed.vn/api/du-lieu-trai-phieu/v2/trai-phieu-dn/v2/mua-lai-truoc-han?apikey=demo"
      );

      const json = await res.json();

      setData(json.data || []);
    } catch {
      setError("Failed to fetch corporate bond buyback");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
}