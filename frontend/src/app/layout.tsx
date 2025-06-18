import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SEA Catering - Healthy Customizable Meals",
  description: "SEA Catering provides customizable healthy meals delivered to cities across Indonesia. Fresh, nutritious, and delicious meals tailored to your dietary preferences.",
  keywords: ["catering", "healthy meals", "Indonesia", "food delivery", "customizable", "nutrition"],
  authors: [{ name: "SEA Catering Team" }],
  creator: "SEA Catering",
  openGraph: {
    title: "SEA Catering - Healthy Customizable Meals",
    description: "Fresh, nutritious, and delicious meals delivered across Indonesia",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
