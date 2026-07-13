"use client";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const headerRef = useRef<HTMLDivElement>(null);

  const [isTop, setIsTop] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const prevScrollPos = useRef<number>(0);

  useEffect(() => {
    const handler = () => {
      const currentScroll = window.scrollY;

      if (currentScroll === 0) {
        setIsTop(true);
      } else if (currentScroll < prevScrollPos.current) {
        setIsVisible(true);
      } else {
        setIsTop(false);
        setIsVisible(false);
      }

      prevScrollPos.current = currentScroll;
    };

    window.addEventListener("scroll", handler);

    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  useGSAP(
    () => {
      gsap.to(headerRef.current, {
        opacity: isVisible ? 1 : 0,
        yPercent: isVisible ? 0 : 100,
        duration: 0.5,
        ease: "linear",
        pointerEvents: isVisible ? "all" : "none",
      });
    },
    {
      dependencies: [isVisible],
    },
  );

  return (
    <header
      ref={headerRef}
      className={`fixed top-5 left-5 right-5 h-[7vh] rounded-3xl w-auto p-5 flex items-center justify-between transition-bg duration-1000 ${isTop ? "bg-transparent" : "bg-black/50 backdrop-blur-md"}`}
    >
      <section className="h-full flex items-center gap-2">
        <div className="h-full rounded-full">
          <img
            src="/logo.jpeg"
            alt="logo"
            className="size-full object-cover object-center"
          />
        </div>
        <span className="text-2xl font-sans">New - Messanger</span>
      </section>

      {!isMobile ? (
        <nav className="flex items-center gap-4">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="relative text-white text-xl font-mono before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-white before:transition-all before:duration-300 hover:before:w-full"
            >
              {label}
            </Link>
          ))}
        </nav>
      ) : (
        <div className="flex flex-col gap-1">
          {[1, 2, 3].map((i) => (
            <span key={i} className="h-1 w-5 bg-white"></span>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
