"use client";

import { useEffect, useState } from "react";

export type PolicyRate = {
  ngay: string;
  kieu_thoi_gian: number;

  lai_suat_dieu_hanh_omo?: number;
  lai_suat_dieu_hanh_tin_phieu?: number;
  lai_suat_dieu_hanh_chiet_khau?: number;
  lai_suat_dieu_hanh_tai_cap_von?: number;

  ls_toi_da_6_thang?: number;
};

type ApiResponse = {
  data: PolicyRate[];
};

export function usePolicyRate(page: number = 1, limit: number = 10) {
  const [data, setData] = useState<PolicyRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRates() {
      try {
        setLoading(true);

        const res = await fetch(
          `https://wifeed.vn/api/du-lieu-vimo/chinh-sach/lai-suat?page=${page}&limit=${limit}&apikey=demo`
        );

        const json: ApiResponse = await res.json();
        setData(json.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch policy rates");
      } finally {
        setLoading(false);
      }
    }

    fetchRates();
  }, [page, limit]);

  return { data, loading, error };
}