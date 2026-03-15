"use client";

import { useDomesticFuelPrice } from "@/hooks/money/useDomesticFuelPrice";

export default function FuelPriceSection() {
  const { data, loading, error } = useDomesticFuelPrice();

  if (loading) return <p>Đang tải giá xăng dầu...</p>;
  if (error) return <p>{error}</p>;

  const format = (v?: number) =>
    v ? v.toLocaleString("vi-VN") : "N/A";

  const date = data?.[0]?.ngay ?? "N/A";

  return (
    <section className="bg-white border rounded-xl p-6 space-y-6">
      <h2 className="text-xl font-semibold">
        Giá xăng dầu trong nước ({date})
      </h2>

      <div className="grid md:grid-cols-4 gap-4">
        {data.map((item) => (
          <div
            key={item.ten_hang_hoa}
            className="border rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition"
          >
            <div className="text-sm text-gray-500">
              Loại nhiên liệu
            </div>

            <div className="font-semibold text-base mt-1 mb-3">
              {item.ten_hang_hoa}
            </div>

            <div className="text-sm text-gray-500">
              Giá
            </div>

            <div className="text-lg font-bold text-blue-600">
              {format(item.gia)} {item.don_vi}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}