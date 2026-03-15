"use client";

import { useEffect, useState, useCallback } from "react";

export type GovBondYield = {
  ngay: string;
  ky_han: string;
  loi_suat: number;
};

export function useGovBondYield(page: number, limit: number) {
  const [data, setData] = useState<GovBondYield[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://wifeed.vn/api/du-lieu-trai-phieu/loi-suat-trai-phieu-chinh-phu?page=${page}&limit=${limit}&apikey=demo`
      );

      const json = await res.json();

      setData(json.data || []);
    } catch {
      setError("Failed to fetch government bond yield");
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
}