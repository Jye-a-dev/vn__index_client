"use client";

import { useEffect, useState } from "react";
import { BondYield, BondYieldResponse } from "@/types/BondYield.type";
import { BOND_YIELD_FALLBACK } from "@/constants/bondYieldFallback";

const API =
  "https://wifeed.vn/api/du-lieu-trai-phieu/loi-suat-trai-phieu-chinh-phu?page=1&limit=10&apikey=demo";

type YieldField = Exclude<
  keyof BondYield,
  "ngay" | "created_at" | "updated_at"
>;

function fillNull(data: BondYield): BondYield {
  const result: BondYield = { ...data };

  for (const key of Object.keys(BOND_YIELD_FALLBACK) as YieldField[]) {
    if (result[key] === null) {
      const fallback = BOND_YIELD_FALLBACK[key];
      if (fallback !== undefined) {
        result[key] = fallback;
      }
    }
  }

  return result;
}

export function useBondYield() {
  const [data, setData] = useState<BondYield[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(API);
        if (!res.ok) throw new Error("API error");

        const json: BondYieldResponse = await res.json();

        const filled = json.data.map(fillNull);

        setData(filled);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}