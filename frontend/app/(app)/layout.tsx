"use client";

import "../styles/globals.css";
import type { Metadata } from "next";
import Nav from "@/components/Nav";

import Providers from "./providers";

import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const isUserAuthenticated: boolean = true;

  if (!isUserAuthenticated) {
    router.push("/login");
  }

  return (
    <html lang="en" >
      <body className=' bg-cover bg-gradient-to-bl from-blue-100 to-white'>
      <div className=' bg-cover bg-gradient-to-bl from-blue-100 to-white'>
        <Providers>
          <Nav />
          {children}
        </Providers>
        </div>
      </body>
    </html>
  );
}
