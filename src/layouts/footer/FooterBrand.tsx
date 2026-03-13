import Link from "next/link";

export default function FooterBrand() {
  return (
    <div className="space-y-4">

      <Link
        href="/index_vn"
        className="text-2xl font-bold text-white"
      >
        VN_Index
      </Link>

      <p className="text-sm text-gray-400 leading-relaxed">
    
      </p>

    </div>
  );
}