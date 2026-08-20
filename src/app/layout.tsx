import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://mitanshkanani.dev"),
  title: {
    default: "Mitansh Kanani — Portfolio",
    template: "%s · Mitansh Kanani",
  },
  description:
    "Selected engineering work by Mitansh Kanani — a programming language and IDE (GOCO), AI-assisted platforms, from-scratch machine learning, and full-stack systems.",
  authors: [{ name: "Mitansh Kanani" }],
  keywords: [
    "Mitansh Kanani",
    "software engineer",
    "GOCO",
    "programming language",
    "compiler",
    "IDE",
    "machine learning",
    "full-stack developer",
    "portfolio",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", geist.variable, geistMono.variable)}
    >
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
