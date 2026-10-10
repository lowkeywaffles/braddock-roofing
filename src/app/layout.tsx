import type { Metadata, Viewport } from "next";
import { Figtree, Roboto_Slab } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SmoothScroll } from "@/components/smooth-scroll";
import { LangProvider } from "@/lib/i18n";
import strings from "@/content/strings.json";

const EN = strings.en as Record<string, string>;
import "./globals.css";

const slab = Roboto_Slab({ variable: "--font-slab", subsets: ["latin"], weight: ["600", "700", "800"] });
const fig = Figtree({ variable: "--font-figtree", subsets: ["latin"] });

const ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%232626b0'/%3E%3Cpath d='M14 32 32 16l18 16M20 28v18h24V28' fill='none' stroke='%23fff' stroke-width='5' stroke-linejoin='round'/%3E%3C/svg%3E";

export const metadata: Metadata = {
  title: EN.title.replace(/&amp;/g, "&"),
  description: EN.desc,
  icons: { icon: ICON },
};
export const viewport: Viewport = { themeColor: "#2626b0" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${slab.variable} ${fig.variable}`}>
      <body className="min-h-dvh leading-relaxed">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LangProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
