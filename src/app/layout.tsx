import "@/styles/globals.css";

import { Cairo } from "next/font/google";

import TopNav from "./_components/top-nav";

const font = Cairo({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "نخلة جي أس",
  description: "نخلة جي أس",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="dark" suppressHydrationWarning>
      <body className={`${font.className}`}>
        <TopNav />
        {children}
      </body>
    </html>
  );
}
