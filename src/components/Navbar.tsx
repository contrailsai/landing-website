"use client";

import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useEffect } from "react"
import DemoButton from "@/components/demo_button";
import Image from "next/image"
import Link from "next/link";

interface NavbarProps {
    top_animation: boolean
}

const Navbar = ({ top_animation }: NavbarProps) => {
    const [scrollY, setScrollY] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollY(currentScrollY);
            setIsScrolled(currentScrollY > 75);
        };

        const handleResize = () => {
            setIsMobile(window.innerWidth < 600);
        };

        // Initial check
        handleResize();

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, element_id: string) => {
        // scroll to the top only if we are already at the target page for it
        if (window.location.href !== String(e.currentTarget)) {
            return;
        }

        e.preventDefault(); // Prevent default anchor behavior
        const target = document.getElementById(element_id);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Mobile Navbar
    if (isMobile) {
        return (
            <motion.nav
                className="fixed top-0 w-full flex justify-between items-center px-4 py-3 z-50"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div
                    className=" relative w-full flex justify-between items-center rounded-full px-4 py-3 backdrop-blur bg-white/60 border-primary/10 border"
                >
                    <Image alt="logo" src={"/logo.png"} height={28} width={28} />
                    {/* Navigation Menu - always visible */}
                    <div>
                        <ul className="flex gap-2 text-xs">
                            <li className="cursor-pointer hover:opacity-70 transition-opacity">
                                <Link onClick={(event) => handleScroll(event, "services")} href="/#services">Services</Link>
                            </li>
                            <li className="cursor-pointer hover:opacity-70 transition-opacity">
                                <Link href="/blogs">Blogs</Link>
                            </li>
                            <li className="cursor-pointer hover:opacity-70 transition-opacity">
                                <Link href="/about">About</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="w-36 h-4" />

                    <div className=" absolute scale-75 -right-2">
                        <DemoButton type="1" onClick={() => window.open("https://cal.com/ami-contrails/", "_blank")} />
                    </div>

                </div>
            </motion.nav >
        );
    }

    // Desktop Navbar
    return (
        <motion.nav
            className="fixed top-0 left-1/2 flex justify-center py-2 z-50"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="absolute flex justify-center items-center gap-10 min-w-[522px] rounded-full px-5 py-1 backdrop-blur bg-white/30"
                animate={{
                    boxShadow: isScrolled
                        ? "0 4px 6px -1px rgba(37, 48, 255, 0.1), 0 2px 4px -1px rgba(37, 48, 255, 0.06)"
                        : "0 0 0 0 rgba(0, 0, 0, 0)"
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                {/* Logo - slides in from left */}
                <motion.div
                    className="flex items-center gap-2"
                    initial={top_animation ? { x: -50, opacity: 0, scale: 0.8 } : { y: -10, opacity: 0, scale: 0.8 }}
                    animate={top_animation ?
                        {
                            x: isScrolled ? 0 : -50,
                            opacity: isScrolled ? 1 : 0,
                            scale: isScrolled ? 1 : 0.8
                        } :
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1
                        }
                    }
                    transition={{
                        duration: 0.5,
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                    }}
                >
                    <Link className="z-20" href="/" onClick={(event) => handleScroll(event, "home")}>
                        <Image alt="logo" src={"/logo.png"} height={36} width={36} />
                    </Link>
                    <div className="h-9 w-9 absolute bg-white blur-md rounded-full " />
                </motion.div>

                {/* Navigation Menu - always visible */}
                <div>
                    <ul className="flex gap-5 text-lg">
                        <li className="cursor-pointer hover:opacity-70 transition-opacity">
                            <Link onClick={(event) => handleScroll(event, "services")} href="/#services">Services</Link>
                        </li>
                        <li className="cursor-pointer hover:opacity-70 transition-opacity">
                            <Link href="/blogs">Blogs</Link>
                        </li>
                        <li className="cursor-pointer hover:opacity-70 transition-opacity">
                            <Link href="/about">About</Link>
                        </li>
                    </ul>
                </div>

                {/* Demo Button - slides in from right */}
                <motion.div
                    className="flex items-center gap-6"
                    initial={top_animation ? { x: 50, opacity: 0, scale: 0.8 } : { y: -10, opacity: 0, scale: 0.8 }}
                    animate={top_animation ?
                        {
                            x: isScrolled ? 0 : 50,
                            opacity: isScrolled ? 1 : 0,
                            scale: isScrolled ? 1 : 0.8
                        } :
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1
                        }
                    }
                    transition={{
                        duration: 0.5,
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                    }}
                >
                    <DemoButton type="1" onClick={() => window.open("https://cal.com/ami-contrails/", "_blank")} />
                </motion.div>
            </motion.div>
        </motion.nav>
    )
}

export default Navbar;