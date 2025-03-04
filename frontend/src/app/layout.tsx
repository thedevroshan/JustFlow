import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";

const robotFlex = Roboto_Flex({
  weight: ['400',"600","600", '700'],
  display: "swap",
  subsets: ["latin"],
  style: "normal",
});

export const metadata: Metadata = {
  title: "NexFlow",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotFlex.className} antialiased vsc-initialized`}
      >
        {children}
      </body>
    </html>
  );
}
