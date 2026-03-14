"use client";

import { useEffect, useState } from "react";

export type MoneySupply = {
	ngay: string;
	kieu_thoi_gian: number;
	m2: number;
	m2_yoy: number;
	m2_mom: number;
};

type ApiResponse = {
	data: MoneySupply[];
	page: number;
	limit: number;
	total: number;
};

export function useMoneySupply(page: number = 1, limit: number = 10) {
	const [data, setData] = useState<MoneySupply[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchData() {
			try {
				setLoading(true);

				const res = await fetch(`https://wifeed.vn/api/du-lieu-vimo/tien-te/cung-tien?page=${page}&limit=${limit}&apikey=demo`);

				const json: ApiResponse = await res.json();

				setData(json.data || []);
			} catch (err) {
				console.error(err);
				setError("Failed to fetch money supply data");
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, [page, limit]);

	return { data, loading, error };
}
