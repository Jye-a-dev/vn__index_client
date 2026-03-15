"use client";

import { useMoneySupply } from "@/hooks/money/useMoneySupply";

type Props = {
  page: number;
  limit: number;
};

export default function MoneySupplySection({ page, limit }: Props) {

  const { data, loading, error } = useMoneySupply(page, limit);

  if (loading) return <p>Đang tải dữ liệu cung tiền...</p>;
  if (error) return <p>{error}</p>;

  const latest = data?.[0];

  return (
    <section className="bg-white border rounded-xl p-6">

      <h2 className="text-xl font-semibold mb-6">
        Cung tiền M2
      </h2>

      {latest ? (
        <div className="grid md:grid-cols-3 gap-4">

          <div className="border rounded-lg p-4">
            <div className="text-sm text-gray-500">
              Tổng cung tiền (M2)
            </div>

            <div className="text-lg font-semibold mt-1">
              {latest.m2}
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="text-sm text-gray-500">
              Tăng trưởng năm (YoY)
            </div>

            <div className="text-lg font-semibold mt-1">
              {latest.m2_yoy}%
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="text-sm text-gray-500">
              Tăng trưởng tháng (MoM)
            </div>

            <div className="text-lg font-semibold mt-1">
              {latest.m2_mom}%
            </div>
          </div>

        </div>
      ) : (
        <p className="text-gray-500">
          Không có dữ liệu cung tiền.
        </p>
      )}

    </section>
  );
}