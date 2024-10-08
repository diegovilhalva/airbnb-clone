import type { Metadata } from "next";
import { Nunito } from "next/font/google"
import "./globals.css";
import Navbar from "../components/Navbar/Navbar";
import ClientOnly from "../components/ClientOnly";
import Modal from "@/components/Modals/Modal";
import RegisterModal from "@/components/Modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";



export const metadata: Metadata = {
  title: "Airbnb | Locações por temporada,chalés,casas de praia e muito mais.",
  description: "Airbnb encontre sua próxima jornada",
};

const font = Nunito({
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={font.className}
      >
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
