import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar.jsx";

export const metadata: Metadata = {
  title: "Cambodia Tax Calculator",
  description: "Calculate Cambodian taxes - Business Classification, Salary, VAT, Excise, Withholding, and Minimum Tax",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="km">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Sidebar />
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
