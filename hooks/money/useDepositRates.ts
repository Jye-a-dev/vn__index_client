"use client";

import { useEffect, useState } from "react";
import { VN_BANKS } from "@/constants/vnBanks";

export type DepositRatePoint = [string, string];

export type BankDepositRate = {
	ky_han: number;
	bank_code: string;
	mack?: string;
	kieu_thoi_gian: number;
	data: DepositRatePoint[];
	created_at: string;
	updated_at: string;
};

type WifeedDepositRate = {
	ky_han: number;
	bank_code: string;
	mack?: string;
	kieu_thoi_gian: number;
	data: DepositRatePoint[];
	created_at: string;
	updated_at: string;
};

export function useDepositRates(kyHan: number = 1, limit: number = 100) {
	const [data, setData] = useState<BankDepositRate[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchRates() {
			try {
				setLoading(true);

				const res = await fetch(`https://wifeed.vn/api/du-lieu-vimo/v2/lai-suat/huy-dong-theo-tung-ngan-hang?ky_han=${kyHan}&limit=${limit}&apikey=demo`);

				const json = await res.json();

				const apiData: BankDepositRate[] = (Array.isArray(json) ? json : []).map(
					(b: WifeedDepositRate): BankDepositRate => ({
						...b,
						mack: b.mack ?? b.bank_code,
					}),
				);

				const apiBankSet = new Set(apiData.map((b) => b.mack));

				const missingBanks: BankDepositRate[] = VN_BANKS.filter(
					(bank) => !apiBankSet.has(bank.api_code) && bank.api_code !== "ACB" && bank.api_code !== "ABB",
				).map((bank) => ({
					ky_han: kyHan,
					bank_code: bank.api_code,
					mack: bank.api_code,
					kieu_thoi_gian: 1,
					data: [],
					created_at: "",
					updated_at: "",
				}));

				setData([...apiData, ...missingBanks]);
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
