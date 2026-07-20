import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LangProvider } from "@/components/LangContext";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { BASE_PATH, SITE_URL } from "@/lib/config";
import { DICT } from "@/lib/i18n";

// Poppins = the app's brand Latin face. adjustFontFallback is off so Arabic
// glyphs fall through to Alexandria instead of the auto Arial fallback.
const poppins = localFont({
  src: [
    { path: "./fonts/poppins-400-latin.woff2", weight: "400" },
    { path: "./fonts/poppins-600-latin.woff2", weight: "600" },
    { path: "./fonts/poppins-700-latin.woff2", weight: "700" },
  ],
  variable: "--font-poppins",
  display: "swap",
  adjustFontFallback: false,
});

// Alexandria = geometric Arabic companion to Poppins (variable, 100–900).
const alexandria = localFont({
  src: [{ path: "./fonts/alexandria-var-arabic.woff2", weight: "100 900" }],
  variable: "--font-alexandria",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: DICT.ar._title,
  description: DICT.ar._desc,
  icons: {
    icon: `${BASE_PATH}/img/favicon.png`,
    apple: `${BASE_PATH}/img/apple-touch-icon.png`,
  },
  openGraph: {
    title: DICT.ar._title,
    description: DICT.ar._desc,
    url: SITE_URL,
    type: "website",
    images: ["/img/app-icon.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${poppins.variable} ${alexandria.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* apply the saved theme before first paint to avoid a flash */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('semiona-theme');if(t==='dark'||t==='light')document.documentElement.dataset.theme=t}catch(e){}",
          }}
        />
        <LangProvider>
          <a className="skip-link" href="#main">
            {DICT.ar.skip}
          </a>
          <Nav />
          {children}
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
