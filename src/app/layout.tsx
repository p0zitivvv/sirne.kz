import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SIRNE.KZ — Halal Этно-Ресторан в Талдыкоргане",
  description: "Премиальный halal этно-ресторан SIRNE.KZ в Талдыкоргане. Настоящий вкус казахских традиций: бешбармак, национальная кухня, юрта на 60 человек, банкетный зал на 100 гостей. Бронируйте столик!",
  keywords: "ресторан Талдыкорган, халяль кухня, казахская кухня, бешбармак, этно-ресторан, SIRNE, юрта, банкет, той, кудалык",
  openGraph: {
    title: "SIRNE.KZ — Halal Этно-Ресторан",
    description: "Настоящий вкус казахских традиций в современном исполнении. Забронируйте столик!",
    type: "website",
    locale: "ru_RU",
  },
};

import { CartProvider } from "@/context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0A0A0A" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
