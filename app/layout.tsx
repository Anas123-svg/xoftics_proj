import type { Metadata } from "next";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google"; 
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"], 
  variable: "--font-jakarta-sans", 
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"], 
  variable: "--font-poppins", 
});

export const metadata: Metadata = {
  title: "Xoftics",
  description: "Digital Solutions Company",
  icons:{
    icon : '/favicon.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jakartaSans.variable} ${poppins.variable} antialiased`} 
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
