"use client";

import { useState, useEffect } from "react";
import { COMMODITY_SYMBOLS } from "@/constants/commoditySymbols";
import { COMMODITY_NAME_MAP } from "@/constants/commondodityName";

export type GlobalCommodity = {
	ten_hang_hoa: string;
	gia: number;
	don_vi: string;
	ngay: string;
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
									ngay: "",
								};
							}

							const price = meta.regularMarketPrice ?? 0;
							const currency = meta.currency ?? "USD";
							const time = meta.regularMarketTime;

							return {
								ten_hang_hoa: COMMODITY_NAME_MAP[symbol] ?? meta.shortName ?? symbol,

								gia: Number(price),

								don_vi: currency,

								ngay: typeof time === "number" ? new Date(time * 1000).toLocaleString() : "",
							};
						} catch (err) {
							console.error("Commodity error:", symbol, err);

							return {
								ten_hang_hoa: COMMODITY_NAME_MAP[symbol] ?? symbol,
								gia: 0,
								don_vi: "USD",
								ngay: "",
							};
						}
					}),
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
