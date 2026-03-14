"use client";

import { useMoneySupply } from "@/hooks/money/useMoneySupply";

type Props = {
  page: number;
  limit: number;
};

export default function MoneySupplySection({ page, limit }: Props) {

  const { data, loading, error } = useMoneySupply(page, limit);

  if (loading) return <p>Loading money supply...</p>;
  if (error) return <p>{error}</p>;

  const latest = data?.[0];

  return (
    <section className="bg-white border rounded-xl p-6">

      <h2 className="text-xl font-semibold mb-4">
        Money Supply (M2)
      </h2>

      {latest && (
        <div className="grid md:grid-cols-3 gap-4">

          <div>M2: {latest.m2}</div>

          <div>YoY: {latest.m2_yoy}%</div>

          <div>MoM: {latest.m2_mom}%</div>

        </div>
      )}

    </section>
  );
}