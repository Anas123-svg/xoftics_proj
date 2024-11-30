import SignIn from "./auth/signin/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xoftics-Admin",
  icons: {
    icon: "/public/logo/logo.png", 
  },
};


export default function Home() {
  return (
    <SignIn></SignIn>
      
  );
}
