import Link from "next/link";

type LinkItem = {
  label: string;
  href: string;
};

type Props = {
  title: string;
  links: LinkItem[];
};

export default function FooterLinks({ title, links }: Props) {
  return (
    <div>

      <h3 className="text-white font-semibold mb-4">
        {title}
      </h3>

      <ul className="space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="hover:text-white transition"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

    </div>
  );
}