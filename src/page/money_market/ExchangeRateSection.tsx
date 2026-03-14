"use client";

import { useExchangeRate } from "@/hooks/money/useExchangeRate";

type Props = {
  page: number;
  limit: number;
};

export default function ExchangeRateSection({ page, limit }: Props) {

  const { data, loading, error } = useExchangeRate(page, limit);

  if (loading) return <p>Loading exchange rate...</p>;
  if (error) return <p>{error}</p>;

  const latest = data[0];

  return (
    <section className="bg-white border rounded-xl p-6">

      <h2 className="text-xl font-semibold mb-4">
        USD Exchange Rate
      </h2>

      {latest && (
        <div className="grid md:grid-cols-3 gap-4">

          <div>Bank Buy: {latest.usd_nhtm_mua_vao}</div>

          <div>Bank Sell: {latest.usd_nhtm_ban_ra}</div>

          <div>Free Market Sell: {latest.usd_tu_do_ban_ra}</div>

        </div>
      )}

    </section>
  );
}