import Link from "next/link";

const menu = [
  { name: "Trang chủ", href: "/" },
  { name: "Trái phiếu", href: "/credit_market" },
  { name: "Tiền tệ", href: "/money_market" },
  { name: "Cổ phiếu", href: "/stock_market" },
];

export default function NavbarMenu() {
  return (
    <ul className="flex items-center gap-6 text-sm font-medium">
      {menu.map((item) => (
        <li key={item.name}>
          <Link
            href={item.href}
            className="hover:text-blue-600 transition"
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}