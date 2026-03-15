"use client";

import { VN_BANKS } from "@/constants/vnBanks";
import { useDepositRates } from "@/hooks/money/useDepositRates";

type Props = {
  kyHan: number;
};

export default function DepositRateSection({ kyHan }: Props) {

  const { data, loading, error } = useDepositRates(kyHan);

  if (loading) return <p>Loading deposit rates...</p>;
  if (error) return <p>{error}</p>;

  const rateMap = new Map(
    data?.map((b) => [b.mack, b])
  );

  return (
    <section className="bg-white border rounded-xl p-6">

      <h2 className="text-xl font-semibold mb-4">
        Bank Deposit Rates ({kyHan}M)
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

        {VN_BANKS.map((bank) => {

          const apiBank = rateMap.get(bank.api_code);

          const latestRate =
            apiBank?.data?.[0]?.[1] ?? "N/A";

          return (
            <div
              key={bank.code}
              className="border rounded-lg p-4 hover:shadow transition"
            >

              <div className="font-semibold">
                {bank.name}
              </div>

              <div className="text-sm text-gray-500">
                {bank.code}
              </div>

              <div className="mt-2 text-lg font-medium">
                Latest Rate: {latestRate}%
              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}