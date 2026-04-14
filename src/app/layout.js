import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollObserver from "@/components/ScrollObserver";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const jost = Jost({
  weight: ["200", "300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-jost",
});

export const metadata = {
  title: "Karigor Interior",
  description: "A global luxury interior design studio. Spaces crafted for extraordinary living.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <Cursor />
        <ScrollObserver />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
