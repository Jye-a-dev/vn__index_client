import Link from "next/link";
import FooterBrand from "./FooterBrand";
import FooterBottom from "./FooterBottom";

const sections = [
  {
    title: "Nền tảng",
    links: [
      { name: "Khóa học", href: "/courses" },
      { name: "Giảng viên", href: "/instructors" },
      { name: "Lộ trình học", href: "/learning-path" },
    ],
  },
  {
    title: "Hỗ trợ",
    links: [
      { name: "Trung tâm trợ giúp", href: "/help" },
      { name: "Điều khoản", href: "/terms" },
      { name: "Chính sách bảo mật", href: "/privacy" },
    ],
  },
];

export default function PublicFooter() {
  return (
    <footer className="bg-gray-900 rounded-2xl text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

        <FooterBrand />

        {sections.map((section) => (  
          <div key={section.title}>
            <h3 className="text-white font-semibold mb-4">
              {section.title}
            </h3>

            <ul className="space-y-2 text-sm">
              {section.links.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>

      <FooterBottom />
    </footer>
  );
}