import { dir } from "i18next";import { languages } from "../i18n/setting";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "../providers/SessioProviders";
import StoreProvider from "../StoreProvider";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Fiber",
  description: "Dashboard for Fiber app",
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default async function RootLayout({
  children,
  params: { lng },
}: RootLayoutProps) {
  return (
    <html lang={lng} dir={dir(lng)} suppressHydrationWarning>
      <body className={`${inter.className} antialiased dark:bg-[#09090B]`}>
        <NextTopLoader
          color="hsl(212, 74%, 27%, 1)"
          initialPosition={0.08}
          crawlSpeed={200}
          height={5}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={1600}
          showAtBottom={false}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Provider>
            <StoreProvider>
              <main>{children}</main>
            </StoreProvider>
          </Provider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
