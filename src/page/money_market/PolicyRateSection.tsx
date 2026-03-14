"use client";

import { usePolicyRate } from "@/hooks/money/usePolicyRate";

type Props = {
  page: number;
  limit: number;
};

export default function PolicyRateSection({ page, limit }: Props) {

  const { data, loading, error } = usePolicyRate(page, limit);

  if (loading) return <p>Loading policy rate...</p>;
  if (error) return <p>{error}</p>;

  const latest = data?.[0];

  return (
    <section className="bg-white border rounded-xl p-6">

      <h2 className="text-xl font-semibold mb-4">
        Policy Rates
      </h2>

      {latest && (
        <div className="grid md:grid-cols-3 gap-4">

          <div>
            OMO: {latest.lai_suat_dieu_hanh_omo ?? "N/A"}%
          </div>

          <div>
            Tái cấp vốn: {latest.lai_suat_dieu_hanh_tai_cap_von ?? "N/A"}%
          </div>

          <div>
            Chiết khấu: {latest.lai_suat_dieu_hanh_chiet_khau ?? "N/A"}%
          </div>

        </div>
      )}

    </section>
  );
}