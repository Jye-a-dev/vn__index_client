"use client";

import { useEffect, useState, useCallback } from "react";

export type CorporateBondBuyback = {
  ma_trai_phieu: string;
  gia_tri_mua_lai: number;
  ngay_mua_lai: string;
};

type ApiItem = {
  bond_ticker?: string;
  buyback_value?: number | null;
  execute_date?: string | null;
};

type ApiResponse = {
  data?: ApiItem[];
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

      if (!res.ok) throw new Error("API error");

      const json: ApiResponse = await res.json();

      const today = new Date().toISOString();

      const normalized: CorporateBondBuyback[] =
        (json.data ?? []).map((item) => ({
          ma_trai_phieu: item.bond_ticker ?? "N/A",
          gia_tri_mua_lai: item.buyback_value ?? 0,
          ngay_mua_lai: item.execute_date ?? today
        }));

      setData(normalized);

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