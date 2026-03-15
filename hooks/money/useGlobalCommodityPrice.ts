"use client";

import { useState, useEffect } from "react";
import { COMMODITY_SYMBOLS } from "@/constants/commoditySymbols";

export type GlobalCommodity = {
  ten_hang_hoa: string;
  gia: number;
  don_vi: string;
  ngay: string;
};

const COMMODITY_NAME_MAP: Record<string, string> = {
  // Metals
  "GC=F": "Gold",
  "SI=F": "Silver",
  "PL=F": "Platinum",
  "PA=F": "Palladium",
  "HG=F": "Copper",

  // Energy
  "CL=F": "Crude Oil",
  "BZ=F": "Brent Oil",
  "NG=F": "Natural Gas",
  "RB=F": "Gasoline",
  "HO=F": "Heating Oil",

  // Agriculture
  "ZW=F": "Wheat",
  "ZC=F": "Corn",
  "ZS=F": "Soybeans",
  "ZM=F": "Soybean Meal",
  "ZL=F": "Soybean Oil",

  // Soft commodities
  "KC=F": "Coffee",
  "SB=F": "Sugar",
  "CC=F": "Cocoa",
  "CT=F": "Cotton",
  "OJ=F": "Orange Juice",

  // Livestock
  "LE=F": "Live Cattle",
  "HE=F": "Lean Hogs",
  "GF=F": "Feeder Cattle",
};

export function useGlobalCommodityPrice() {

  const [data, setData] = useState<GlobalCommodity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    async function fetchData() {

      try {

        setLoading(true);

        const results = await Promise.all(

          COMMODITY_SYMBOLS.map(async (symbol) => {

            try {

              const res = await fetch(`/api/yahoo/${symbol}`);

              if (!res.ok) {
                throw new Error("API error");
              }

              const json = await res.json();

              const meta = json?.chart?.result?.[0]?.meta;

              if (!meta) {
                return {
                  ten_hang_hoa: COMMODITY_NAME_MAP[symbol] ?? symbol,
                  gia: 0,
                  don_vi: "USD",
                  ngay: ""
                };
              }

              const price = meta.regularMarketPrice ?? 0;
              const currency = meta.currency ?? "USD";
              const time = meta.regularMarketTime;

              return {
                ten_hang_hoa:
                  COMMODITY_NAME_MAP[symbol] ??
                  meta.shortName ??
                  symbol,

                gia: Number(price),

                don_vi: currency,

                ngay:
                  typeof time === "number"
                    ? new Date(time * 1000).toLocaleString()
                    : ""
              };

            } catch (err) {

              console.error("Commodity error:", symbol, err);

              return {
                ten_hang_hoa: COMMODITY_NAME_MAP[symbol] ?? symbol,
                gia: 0,
                don_vi: "USD",
                ngay: ""
              };

            }

          })

        );

        setData(results);

      } catch (err) {

        console.error(err);
        setError("Failed to fetch global commodity price");

      } finally {

        setLoading(false);

      }

    }

    fetchData();

  }, []);

  return { data, loading, error };

}