"use client";

import NavbarLogo from "./NavbarLogo";
import NavbarMenu from "./NavbarMenu";

export default function PublicNavbar() {
  return (
    <nav className="w-full border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

        <NavbarLogo />

        <div className="hidden md:flex items-center gap-8">
          <NavbarMenu />
        </div>

      </div>
    </nav>
  );
}