import type { Metadata } from "next";
import StoreProvider from "./StoreProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Template App - Typescript + Redux",
  description: "Template App.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><StoreProvider>{children}</StoreProvider></body>
    </html>
  );
}
