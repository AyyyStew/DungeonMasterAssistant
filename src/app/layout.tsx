import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Banner from "./components/Banner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dungeon Master Assistant",
  description: "An application to make running a table top rpg easier",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-screen flex-col justify-between bg-neutral-950">
        <div className="">
          <Banner></Banner>
          <div className="mx-4">{children}</div>
        </div>
        <footer className="mx-4 mb-4 text-center text-white">
          Created by
          <a className="underline" href="https://github.com/AyyyStew">
            AyyyStew
          </a>
        </footer>
      </body>
    </html>
  );
}
