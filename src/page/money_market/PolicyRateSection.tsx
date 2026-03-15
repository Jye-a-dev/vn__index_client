"use client";

import { usePolicyRate } from "@/hooks/money/usePolicyRate";

type Props = {
  page: number;
  limit: number;
};

export default function PolicyRateSection({ page, limit }: Props) {

  const { data, loading, error } = usePolicyRate(page, limit);

  if (loading) return <p>Đang tải lãi suất điều hành...</p>;
  if (error) return <p>{error}</p>;

  const latest = data?.[0];

  return (
    <section className="bg-white border rounded-xl p-6">

      <h2 className="text-xl font-semibold mb-6">
        Lãi suất điều hành
      </h2>

      {latest ? (
        <div className="grid md:grid-cols-3 gap-4">

          <div className="border rounded-lg p-4">
            <div className="text-sm text-gray-500">
              Lãi suất OMO
            </div>

            <div className="text-lg font-semibold mt-1">
              {latest.lai_suat_dieu_hanh_omo ?? "N/A"}%
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="text-sm text-gray-500">
              Lãi suất tái cấp vốn
            </div>

            <div className="text-lg font-semibold mt-1">
              {latest.lai_suat_dieu_hanh_tai_cap_von ?? "N/A"}%
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="text-sm text-gray-500">
              Lãi suất chiết khấu
            </div>

            <div className="text-lg font-semibold mt-1">
              {latest.lai_suat_dieu_hanh_chiet_khau ?? "N/A"}%
            </div>
          </div>

        </div>
      ) : (
        <p className="text-gray-500">
          Không có dữ liệu lãi suất điều hành.
        </p>
      )}

    </section>
  );
}