import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Banner from "./components/Banner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dungeon Master's Assistant",
  description: "An application to make running a table top rpg easier",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-900">
        <Banner></Banner>
        <div className="mx-3">{children}</div>
      </body>
    </html>
  );
}
