"use client";

import { useGlobalCommodityPrice } from "@/hooks/money/useGlobalCommodityPrice";

export default function GlobalCommoditySection() {

  const { data, loading, error } = useGlobalCommodityPrice();

  if (loading) {
    return <p>Đang tải giá hàng hóa quốc tế...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="bg-white border rounded-xl p-6">

      <h2 className="text-xl font-semibold mb-6">
        Giá hàng hóa quốc tế
      </h2>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">

        {data.map((item) => (

          <div
            key={item.ten_hang_hoa}
            className="border rounded-lg p-4 hover:shadow-sm transition"
          >

            <div className="text-sm text-gray-500 mb-1">
              Hàng hóa
            </div>

            <div className="text-base font-semibold mb-3">
              {item.ten_hang_hoa}
            </div>

            <div className="text-sm text-gray-500">
              Giá thị trường
            </div>

            <div className="text-lg font-bold">
              {item.gia.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })} {item.don_vi}
            </div>

            <div className="text-xs text-gray-400 mt-2">
              {item.ngay || "N/A"}
            </div>

          </div>

        ))}

      </div>

    </section>
  );
}