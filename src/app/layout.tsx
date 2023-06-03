"use client";

import { Inter } from "next/font/google";
import { createGlobalStyle } from "styled-components";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

// Note: @import url removed from createGlobalStyle.
const GlobalStyles = createGlobalStyle`
  body {
    background-color: #f0f0f0;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap"
        />
      </Head>
      <GlobalStyles />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
