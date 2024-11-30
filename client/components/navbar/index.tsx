'use client';
import { Menu, X } from "lucide-react";
import Logo from "../../app/assets/logo.png";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../general/button";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 80);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveLink(id);
      setIsMenuOpen(false);
    }
  };

  const handleLoginRedirect = () => {
    router.push("/login"); 
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 right-0 w-full transition-all duration-300 ${
        isScrolled ? "bg-black bg-opacity-50 backdrop-blur-lg" : "bg-transparent"
      } z-20`}
    >
      {/* Desktop Menu */}
      <div className="container hidden lg:flex justify-between items-center h-[80px] py-6">
        <div className="text-white font-bold text-xl">
          <Link href={"/"}>
            <Image src={Logo} alt="Logo" height={50} />
          </Link>
        </div>

        <nav className="hidden md:flex space-x-8">
          <Link
            href="#"
            onClick={() => scrollToSection("#")}
            className={`text-white ${
              activeLink === "/" || (activeLink === "#" && "active")
            } hover:text-primary transition py-1 para-large`}
          >
            Home
          </Link>
          <Link
            href="#about"
            onClick={() => scrollToSection("about")}
            className={`text-white ${
              activeLink === "about" && "active"
            } py-1 hover:text-primary transition para-large`}
          >
            About
          </Link>
          <Link
            href="#services"
            onClick={() => scrollToSection("services")}
            className={`text-white ${
              activeLink === "services" && "active"
            } py-1 hover:text-primary transition para-large`}
          >
            Services
          </Link>
          <Link
            href="#testimonials"
            onClick={() => scrollToSection("testimonials")}
            className={`text-white ${
              activeLink === "testimonials" && "active"
            } py-1 hover:text-primary transition para-large`}
          >
            Testimonials
          </Link>
          <Link
            href="#contact"
            onClick={() => scrollToSection("contact")}
            className={`text-white ${
              activeLink === "contact" && "active"
            } py-1 hover:text-primary transition para-large`}
          >
            Contact
          </Link>
        </nav>

        <div>
          <Button message="Get in Touch" onClick={handleLoginRedirect} />
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="container flex lg:hidden justify-between items-center min-h-[60px] py-6">
        <div className="text-white font-bold text-xl relative">
          <Link href={"/"}>
            <Image src={Logo} alt="Logo" height={35} />
          </Link>
        </div>
        <div onClick={toggleMenu}>
          {isMenuOpen ? (
            <X className="text-white cursor-pointer" />
          ) : (
            <Menu className="text-white cursor-pointer" />
          )}
        </div>
      </div>

      <div
        className={`lg:hidden absolute right-0 top-13 z-20 bg-black bg-opacity-90 flex flex-col gap-10 p-4 w-[300px] rounded-xl justify-center items-center transition-transform duration-300 ease-in-out transform ${
          isMenuOpen
            ? "translate-x-0 opacity-1"
            : "translate-x-full opacity-0"
        }`}
      >
        {isMenuOpen && (
          <>
            <div className="flex flex-col space-y-3 mt-4 justify-center items-center ">
              <Link
                href="#"
                onClick={() => scrollToSection("#")}
                className={`text-white ${
                  activeLink === "/" || (activeLink === "#" && "active")
                } hover:text-primary transition py-1 para-large`}
              >
                Home
              </Link>
              <Link
                href="#about"
                onClick={() => scrollToSection("about")}
                className={`text-white ${
                  activeLink === "about" && "active"
                } py-1 hover:text-primary transition para-large`}
              >
                About
              </Link>
              <Link
                href="#services"
                onClick={() => scrollToSection("services")}
                className={`text-white ${
                  activeLink === "services" && "active"
                } py-1 hover:text-primary transition para-large`}
              >
                Services
              </Link>
              <Link
                href="#testimonials"
                onClick={() => scrollToSection("testimonials")}
                className={`text-white ${
                  activeLink === "testimonials" && "active"}
                } py-1 hover:text-primary transition para-large`}
              >
                Testimonials
              </Link>
              <Link
                href="#contact"
                onClick={() => scrollToSection("contact")}
                className={`text-white ${
                  activeLink === "contact" && "active"
                } py-1 hover:text-primary transition para-large`}
              >
                Contact
              </Link>
            </div>
            <div className="mt-auto mb-4">
              <Button message="Get in Touch" onClick={handleLoginRedirect} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
