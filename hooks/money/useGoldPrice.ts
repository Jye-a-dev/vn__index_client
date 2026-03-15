"use client";

import { useState, useEffect } from "react";

type GoldApiItem = {
  name: string;
  buy: number;
  sell: number;
  change_buy: number;
  change_sell: number;
  currency: string;
};

type GoldApiResponse = {
  success: boolean;
  timestamp: number;
  time: string;
  date: string;
  count: number;
  prices: Record<string, GoldApiItem>;
};

export type GoldRow = {
  code: string;
  name: string;
  buy: number;
  sell: number;
  currency: string;
};

const GOLD_NAME_MAP: Record<string, string> = {
  XAUUSD: "Vàng Thế Giới (XAU/USD)",
  SJL1L10: "SJC 9999",
  SJ9999: "Nhẫn SJC",
  DOHNL: "DOJI Hà Nội",
  DOHCML: "DOJI HCM",
  DOJINHTV: "DOJI Nữ Trang",
  BTSJC: "Bảo Tín SJC",
  BT9999NTT: "Bảo Tín 9999",
  PQHNVM: "PNJ Hà Nội",
  PQHN24NTT: "PNJ 24K",
  VNGSJC: "VN Gold SJC",
  VIETTINMSJC: "Viettin SJC",
};

export function useGoldPrice() {

  const [data, setData] = useState<GoldRow[]>([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchGold = async () => {

      try {

        setLoading(true);

        const res = await fetch("https://www.vang.today/api/prices");

        if (!res.ok) throw new Error("API error");

        const json: GoldApiResponse = await res.json();

        const rows: GoldRow[] = Object.entries(json.prices).map(
          ([code, item]) => ({
            code,
            name: GOLD_NAME_MAP[code] ?? item.name,
            buy: item.buy,
            sell: item.sell,
            currency: item.currency,
          })
        );

        setData(rows);
        setDate(json.date);
        setError(null);

      } catch {
        setError("Failed to fetch gold price");
      } finally {
        setLoading(false);
      }

    };

    fetchGold();

  }, []);

  return {
    data,
    date,
    loading,
    error,
  };
}