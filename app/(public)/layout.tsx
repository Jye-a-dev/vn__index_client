import PublicSetup from "@/src/layouts/PublicSetup";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicSetup>{children}</PublicSetup>;
}
