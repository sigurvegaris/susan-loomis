import type { Metadata, Viewport } from "next";
import "./globals.css";
import LoadingScreen from "./components/LoadingScreen";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Susan Herrmann Loomis – Author, Chef & Cooking School",
  description:
    "Fourteen cookbooks. Thirty years in a Norman kitchen. Author of French Farmhouse Cookbook, On Rue Tatin, French Grill, and more.",
  icons: {
    icon: "/onruetatinlogo.png",
    apple: "/onruetatinlogo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <LoadingScreen />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}