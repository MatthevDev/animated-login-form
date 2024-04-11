import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Animated Login",
  description: "An animated login template made in NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}
