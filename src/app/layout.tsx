"use client";

import { Inter } from "next/font/google";
import { createGlobalStyle } from "styled-components";

const inter = Inter({ subsets: ["latin"] });
const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  body {
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GlobalStyles />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
