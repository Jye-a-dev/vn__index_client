"use client";

import { useExchangeRate } from "@/hooks/money/useExchangeRate";

type Props = {
  page: number;
  limit: number;
};

export default function ExchangeRateSection({ page, limit }: Props) {

  const { data, loading, error } = useExchangeRate(page, limit);

  if (loading) return <p>Đang tải tỷ giá...</p>;
  if (error) return <p>{error}</p>;

  const latest = data?.[0];

  return (
    <section className="bg-white border rounded-xl p-6">

      <h2 className="text-xl font-semibold mb-6">
        Tỷ giá USD
      </h2>

      {latest ? (
        <div className="grid md:grid-cols-3 gap-4">

          <div className="border rounded-lg p-4">
            <div className="text-sm text-gray-500">
              Ngân hàng mua vào
            </div>

            <div className="text-lg font-semibold mt-1">
              {latest.usd_nhtm_mua_vao}
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="text-sm text-gray-500">
              Ngân hàng bán ra
            </div>

            <div className="text-lg font-semibold mt-1">
              {latest.usd_nhtm_ban_ra}
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="text-sm text-gray-500">
              Thị trường tự do
            </div>

            <div className="text-lg font-semibold mt-1">
              {latest.usd_tu_do_ban_ra}
            </div>
          </div>

        </div>
      ) : (
        <p className="text-gray-500">
          Không có dữ liệu tỷ giá.
        </p>
      )}

    </section>
  );
}