import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SoluWaste - Waste Management",
  description: "SoluWaste is a Web-Based Computer Application for Analyzing Waste Management Policies and Produced Waste Weight Across Baguio City; it aims to compare data and discover a correlation between the waste weight and the level of enforcement of waste policies amongst the barangay of Baguio City. Additionally, it aims to identify the best practices to be more efficient and automated.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main id="root" className="h-screen">{children}</main>
      </body>
    </html>
  );
}
