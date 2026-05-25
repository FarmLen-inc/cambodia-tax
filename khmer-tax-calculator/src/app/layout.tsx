import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ប្រព័ន្ធគណនាពន្ធ - ទំព័រដើម",
  description: "ប្រព័ន្ធអប់រំសម្រាប់គណនាពន្ធនៅកម្ពុជា។",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="km" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Public+Sans:wght@600;700&family=Kantumruy+Pro:wght@400;600;700&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
