import type { Metadata } from "next";
import "./globals.css";
import { ProfileProvider } from "../context/ProfileContext";
import { inter } from "@/fonts/fonts";
import { config } from "@/config";
import { Analytics } from "@vercel/analytics/next";
import { AlertProvider } from "@/context/AlertContext";

export const metadata: Metadata = config.metadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProfileProvider>
          <AlertProvider>
            {children}
            <Analytics />
          </AlertProvider>
        </ProfileProvider>
      </body>
    </html>
  );
}
