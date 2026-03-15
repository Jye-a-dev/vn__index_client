"use client";

import { useGoldPrice } from "@/hooks/money/useGoldPrice";

export default function GoldPriceSection() {

  const { data, date, loading, error } = useGoldPrice();

  if (loading) return <p>Loading gold price...</p>;
  if (error) return <p>{error}</p>;

  const format = (value?: number) =>
    value ? value.toLocaleString("vi-VN") : "N/A";

  const world = data.find((g) => g.code === "XAUUSD");
  const sjc = data.find((g) => g.code === "SJL1L10");

  return (

    <div className="space-y-8">

      <h2 className="text-xl font-semibold">
        Giá vàng ({date})
      </h2>

      {/* SUMMARY */}

      <div className="grid md:grid-cols-2 gap-4">

        <div className="p-4 border rounded-xl bg-yellow-50">

          <p className="text-sm text-gray-500">
            Vàng thế giới
          </p>

          <p className="text-xl font-bold">
            {format(world?.buy)} USD
          </p>

        </div>

        <div className="p-4 border rounded-xl bg-yellow-50">

          <p className="text-sm text-gray-500">
            SJC 9999
          </p>

          <p className="text-xl font-bold">
            <span className="text-green-600">
              {format(sjc?.buy)}
            </span>
            {" | "}
            <span className="text-red-600">
              {format(sjc?.sell)}
            </span>
          </p>
        </div>

      </div>

      {/* TABLE */}

      <div className="border rounded-xl overflow-hidden">

        <div className="px-4 py-3 bg-gray-100 font-semibold">
          Giá vàng trong nước
        </div>

        <table className="w-full text-sm">

          <thead>

            <tr className="bg-gray-50">

              <th className="p-3 text-left">Loại vàng</th>
              <th className="p-3">Mua vào</th>
              <th className="p-3">Bán ra</th>
              <th className="p-3">Tiền tệ</th>

            </tr>

          </thead>

          <tbody>

            {data.map((g) => (

              <tr
                key={g.code}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-3 font-medium">
                  {g.name}
                </td>

                <td className="p-3 text-center text-green-600">
                  {format(g.buy)}
                </td>

                <td className="p-3 text-center text-red-600">
                  {format(g.sell)}
                </td>

                <td className="p-3 text-center">
                  {g.currency}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}