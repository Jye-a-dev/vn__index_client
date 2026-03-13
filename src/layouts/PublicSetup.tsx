// app/layouts/PublicSetup.tsx
"use client";

import Navbar from "@/src/layouts/navbar/PublicNavbar";
import { ReactNode } from "react";
import NavbarContainer from "@/src/layouts/navbar/Container";

import Footer from "@/src/layouts/footer/PublicFooter";
import FooterContainer from "@/src/layouts/footer/FooterContainer";

interface PublicSetupProps {
    children: ReactNode;
}

export default function PublicSetup({ children }: PublicSetupProps) {
    return (
        <div className="relative min-h-screen flex flex-col">

            <NavbarContainer>
                <Navbar />
            </NavbarContainer>

            <main className="flex-1 relative z-0">
                {children}
            </main>

            <FooterContainer>
                <Footer />
            </FooterContainer>
        </div>
    );
}

