
//import { useState } from 'react'
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import "./globals.css";
import {unstable_setRequestLocale} from 'next-intl/server';

const locales = ['en', 'pt'];

import { Inter } from "next/font/google";
import Header from '../common/Header';



const inter = Inter({ subsets: ["latin"] });


export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const locale = await getLocale();
  // Providing all messages to the client
  // side is the easiest way to get started

  unstable_setRequestLocale(locale);
  
  const messages = await getMessages();

  //const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <div className="h-full bg-gradient-to-b from-indigo-950 to-white via-indigo-300">
            <Header />
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
