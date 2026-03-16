"use client";

import { useCorporateBondBuyback } from "@/hooks/credit/useCorporateBondBuyback";

export default function CorporateBondBuybackSection() {

  const { data, loading, error } = useCorporateBondBuyback();

  if (loading) return <p>Loading corporate bond buyback...</p>;
  if (error) return <p>{error}</p>;

  const today = new Date().toLocaleDateString();

  return (
    <section className="bg-white border rounded-xl p-6">

      <h2 className="text-xl font-semibold mb-4">
        Corporate Bond Buyback
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

        {data.map((bond, index) => {

          const value = bond.gia_tri_mua_lai ?? 0;

          return (
            <div
              key={`${bond.ma_trai_phieu}-${index}`}
              className="border rounded-lg p-4 hover:shadow transition"
            >

              <div className="font-semibold">
                {bond.ma_trai_phieu}
              </div>

              <div className="mt-2 text-sm">
                Buyback Value:
                <span className="font-medium ml-1">
                  {value.toLocaleString()} VND
                </span>
              </div>

              <div className="text-sm text-gray-600">
                Date: {today}
              </div>

            </div>
          );

        })}

      </div>

    </section>
  );
}