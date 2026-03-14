"use client";

import { useState } from "react";

import PolicyRateSection from "./PolicyRateSection";
import ExchangeRateSection from "./ExchangeRateSection";
import MoneySupplySection from "./MoneySupplySection";
import DepositRateSection from "./DepositRateSection";

type Section = "policy" | "exchange" | "money" | "deposit";

export default function MoneyMarketContainer() {

  const [depositTenor, setDepositTenor] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [activeSection, setActiveSection] = useState<Section>("policy");

  const tenorOptions = [1, 3, 6, 12];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">

      <h1 className="text-3xl font-bold">
        Money Market Dashboard
      </h1>

      {/* SECTION SWITCH */}
      <div className="flex gap-2">

        <button
          onClick={() => setActiveSection("policy")}
          className={`px-4 py-2 rounded-lg border
          ${activeSection === "policy"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 hover:bg-gray-200"}`}
        >
          Policy Rates
        </button>

        <button
          onClick={() => setActiveSection("exchange")}
          className={`px-4 py-2 rounded-lg border
          ${activeSection === "exchange"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 hover:bg-gray-200"}`}
        >
          Exchange Rate
        </button>

        <button
          onClick={() => setActiveSection("money")}
          className={`px-4 py-2 rounded-lg border
          ${activeSection === "money"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 hover:bg-gray-200"}`}
        >
          Money Supply
        </button>

        <button
          onClick={() => setActiveSection("deposit")}
          className={`px-4 py-2 rounded-lg border
          ${activeSection === "deposit"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 hover:bg-gray-200"}`}
        >
          Deposit Rates
        </button>

      </div>

      {/* FILTER BAR */}
      <div className="flex flex-wrap items-center gap-4 bg-white border rounded-xl p-4">

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            Deposit Tenor:
          </span>

          {tenorOptions.map((t) => (
            <button
              key={t}
              onClick={() => setDepositTenor(t)}
              className={`px-3 py-1 rounded-lg border text-sm
              ${depositTenor === t
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"}
              `}
            >
              {t}M
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">

          <span className="text-sm font-medium">
            Limit:
          </span>

          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="border rounded-lg px-2 py-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>

        </div>

        <div className="flex items-center gap-2">

          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Prev
          </button>

          <span className="text-sm">
            Page {page}
          </span>

          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Next
          </button>

        </div>

      </div>

      {/* SECTION RENDER */}

      {activeSection === "policy" && (
        <PolicyRateSection page={page} limit={limit} />
      )}

      {activeSection === "exchange" && (
        <ExchangeRateSection page={page} limit={limit} />
      )}

      {activeSection === "money" && (
        <MoneySupplySection page={page} limit={limit} />
      )}

      {activeSection === "deposit" && (
       <DepositRateSection kyHan={1} />
      )}

    </div>
  );
}