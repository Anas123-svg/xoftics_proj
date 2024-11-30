
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Image from "next/image";

export const metadata: Metadata = {
  title:
    "Employee",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
  icons:{
    icon : '/favicon.png'
  }
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <h1 className="text-white">Hello</h1>
        {/* <Image src="/favicon.png" alt="img" height={100} width={100}></Image> */}
      </DefaultLayout>
    </>
  );
}
