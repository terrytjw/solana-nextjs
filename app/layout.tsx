import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppBar } from "@/components/AppBar";
import { Toaster } from "react-hot-toast";
import WalletContextProvider from "@/components/WalletContextProvider";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const IS_DEV_MODE = process.env.NEXT_PUBLIC_ENV === "dev";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WalletContextProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={IS_DEV_MODE ? "debug-screens" : ""}
      >
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <AppBar />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </WalletContextProvider>
  );
}
