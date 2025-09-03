import type { Metadata } from "next";
import "./globals.css";
import { ProfileProvider } from "../context/ProfileContext";
import { inter } from "@/fonts/fonts";
import { config } from "@/config";

export const metadata: Metadata = config.metadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProfileProvider>{children}</ProfileProvider>
      </body>
    </html>
  );
}
