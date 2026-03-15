"use client";

import { useEffect, useState } from "react";

export type DepositRatePoint = [string, string];

export type BankDepositRate = {
  ky_han: number;
  bank_code: string;
  mack: string;
  kieu_thoi_gian: number;
  data: DepositRatePoint[];
  created_at: string;
  updated_at: string;
};

export function useDepositRates(
  kyHan: number = 1,
  limit: number = 100
) {
  const [data, setData] = useState<BankDepositRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRates() {
      try {
        setLoading(true);

        const res = await fetch(
          `https://wifeed.vn/api/du-lieu-vimo/v2/lai-suat/huy-dong-theo-tung-ngan-hang?ky_han=${kyHan}&limit=${limit}&apikey=demo`
        );

        const json = await res.json();

        // API trả array trực tiếp
        setData(Array.isArray(json) ? json : []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch deposit rates");
      } finally {
        setLoading(false);
      }
    }

    fetchRates();
  }, [kyHan, limit]);

  return { data, loading, error };
}