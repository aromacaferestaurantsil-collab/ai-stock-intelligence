import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "AI Stock Intelligence", description: "Research dashboard for Indian and US markets" };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body>{children}</body></html>; }
