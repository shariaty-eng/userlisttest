import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/react-query-provider";
import localFont from 'next/font/local'

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: 'swap',
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const yekan = localFont({
  src: [
    {
      path: '../../public/fonts/IRANYekanXFaNum/IRANYekanXFaNum-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/IRANYekanXFaNum/IRANYekanXFaNum-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/IRANYekanXFaNum/IRANYekanXFaNum-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/IRANYekanXFaNum/IRANYekanXFaNum-DemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/IRANYekanXFaNum/IRANYekanXFaNum-Black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/IRANYekanXFaNum/IRANYekanXFaNum-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-yekan'
})


export const metadata: Metadata = {
  title: "User List Interface",
  description: "Display a list of user name's with Infinite Scroll",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${yekan.variable}`}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
