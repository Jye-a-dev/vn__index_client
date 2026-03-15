"use client";

import { useEffect, useState } from "react";

export type FuelPrice = {
  ten_hang_hoa: string;
  gia: number;
  don_vi: string;
  ngay: string;
};

type ApiItem = {
  title: string;
  zone1_price: number;
  date: string;
};

export function useDomesticFuelPrice() {

  const [data, setData] = useState<FuelPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchFuel = async () => {

      try {

        const today = new Date().toISOString().slice(0,10);

        const url =
          "https://giaxanghomnay.com/api/pvdate/" + today;

        const res = await fetch(url);

        const json = await res.json();

        console.log("Fuel API response:", json);

        const fuelList: ApiItem[] = json[0]; // <-- sửa chỗ này

        const rows: FuelPrice[] = fuelList.map((item) => ({
          ten_hang_hoa: item.title,
          gia: item.zone1_price,
          don_vi: "VND/L",
          ngay: item.date
        }));

        setData(rows);

      } catch (err) {

        console.error("Fuel fetch error:", err);

        setError("Không thể tải dữ liệu giá xăng");

      } finally {

        setLoading(false);

      }

    };

    fetchFuel();

  }, []);

  return { data, loading, error };
}