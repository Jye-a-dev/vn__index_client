"use client";

import { useEffect, useState } from "react";

export type DepositRate = {
  id: number;
  bankCode: string;
  bankName: string;
  term: number;
  interestRate: number;
  createdDate: string;
};

type InterestRateResponse = {
  data: DepositRate[];
};

export function useDepositRates(term: number = 1) {

  const [data, setData] = useState<DepositRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    async function fetchRates() {

      try {

        setLoading(true);

        const res = await fetch(
          "https://api-finfo.vndirect.com.vn/v4/interest-rates"
        );

        const json: InterestRateResponse = await res.json();

        const list = Array.isArray(json?.data) ? json.data : [];

        const filtered = list.filter(
          (item) => item.term === term
        );

        setData(filtered);

      } catch (err) {

        console.error(err);
        setError("Failed to fetch deposit rates");

      } finally {

        setLoading(false);

      }

    }

    fetchRates();

  }, [term]);

  return { data, loading, error };

}