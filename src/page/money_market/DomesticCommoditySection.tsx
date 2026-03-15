"use client";

import { useDomesticCommodityPrice } from "@/hooks/money/useDomesticCommodityPrice";

type Props = {
  page: number;
  limit: number;
};

export default function DomesticCommoditySection({ page, limit }: Props) {

  const { data, loading, error } = useDomesticCommodityPrice(page, limit);

  if (loading) return <p>Đang tải giá hàng hóa trong nước...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="bg-white border rounded-xl p-6">

      <h2 className="text-xl font-semibold mb-6">
        Giá hàng hóa trong nước
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        {data.map((item, index) => (
          <div key={index} className="border rounded-lg p-4">

            {Object.entries(item).map(([key, value]) => (
              <div key={key} className="mb-1">

                <div className="text-xs text-gray-500">
                  {key}
                </div>

                <div className="text-sm font-semibold">
                  {value ?? "N/A"}
                </div>

              </div>
            ))}

          </div>
        ))}

      </div>

    </section>
  );
}