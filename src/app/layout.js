import "./globals.css";

import { Inter } from "next/font/google";
import { PrismicText } from "@prismicio/react";
import { PrismicNextLink, PrismicPreview } from "@prismicio/next";
import * as prismic from "@prismicio/client";

import { createClient, repositoryName } from "@/prismicio";
import { Bounded } from "@/components/Bounded";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/**
 * @param {{ children: React.ReactNode }}
 */
export default async function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="overflow-x-hidden antialiased">
        {/* @ts-expect-error Async Server Component */}
        <Header />
        {children}
        <PrismicPreview repositoryName={repositoryName} />
        <Footer />
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="w-full ">
      <div className="container bg-gray flex flex-wrap justify-around  m-auto p-0 md:p-6">
        <div className="flex w-full md:w-auto p-4">
          <svg
            className="w-6 h-6 text-gray-800 dark:text-d-gray mr-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 15h12M6 6h12m-6 12h.01M7 21h10a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1Z"
            />
          </svg>
          <h3>+91 9448450245</h3>
        </div>
        <div className="flex w-full md:w-auto p-4">
          <svg
            className="w-6 h-6 text-gray-800 dark:text-d-gray mr-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 16v-5.5A3.5 3.5 0 0 0 7.5 7m3.5 9H4v-5.5A3.5 3.5 0 0 1 7.5 7m3.5 9v4M7.5 7H14m0 0V4h2.5M14 7v3m-3.5 6H20v-6a3 3 0 0 0-3-3m-2 9v4m-8-6.5h1"
            />
          </svg>
          <h3>vinahe@gmail.com</h3>
        </div>
        <div className="flex w-full md:w-auto p-4">
          <svg
            className="w-6 h-6 text-gray-800 dark:text-d-gray mr-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
            />
          </svg>
          <h3>Bangalore, Karnataka - 560078</h3>
        </div>
      </div>
    </footer>
  );
}
