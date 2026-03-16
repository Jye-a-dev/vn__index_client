"use client";

import { useBondYield } from "@/hooks/credit/useBondYield";

export default function GovernmentBondYieldSection() {

    const { data, loading, error } = useBondYield();

    if (loading) return <p>Loading government bond yields...</p>;
    if (error) return <p>{error}</p>;

    const today = new Date().toLocaleDateString();

    return (
        <section className="bg-white border rounded-xl p-6">

            <h2 className="text-xl font-semibold mb-4">
                Government Bond Yield
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

                {data.map((row) => (

                    <div
                        key={row.ngay}
                        className="border rounded-lg p-4 hover:shadow transition"
                    >

                        <div className="font-semibold">
                            Date
                        </div>

                        <div className="text-sm text-gray-500">
                            {today}
                        </div>

                        <div className="mt-3 space-y-1 text-sm">

                            <div>
                                VN 10Y: <span className="font-medium">{row.vietnam_10y}%</span>
                            </div>

                            <div>
                                US 10Y: <span className="font-medium">{row.us_10y}%</span>
                            </div>

                            <div>
                                China 10Y: <span className="font-medium">{row.china_10y}%</span>
                            </div>

                            <div>
                                Japan 10Y: <span className="font-medium">{row.japan_10y}%</span>
                            </div>

                            <div>
                                Korea 10Y: <span className="font-medium">{row.south_korea_10y}%</span>
                            </div>

                            <div>
                                India 10Y: <span className="font-medium">{row.india_10y}%</span>
                            </div>

                            <div>
                                Indonesia 10Y: <span className="font-medium">{row.indonesia_10y}%</span>
                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </section>
    );
}