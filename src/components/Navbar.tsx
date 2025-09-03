"use client";

import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useEffect } from "react"
import DemoButton from "@/components/demo_button";
import Image from "next/image"
import Link from "next/link";

import { MenuIcon } from "lucide-react"

interface NavbarProps {
    top_animation: boolean
}

const Navbar = ({ top_animation }: NavbarProps) => {
    const [scrollY, setScrollY] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [toggle_drawer, set_toggle_drawer] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollY(currentScrollY);
            setIsScrolled(currentScrollY > 75);
        };

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
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

                <div className=" relative w-full flex justify-between items-center rounded-full px-4 py-3 backdrop-blur bg-white/60 border-primary/10 border">
                    <div className="flex items-center gap-2">
                        <Image alt="logo" src={"/logo.png"} height={28} width={28} />
                        <div className=" text-xl font-bold text-[#2530FF] "> Contrails AI </div>
                    </div>
                    <div className="p-2 rounded-full cursor-pointer">
                        <MenuIcon onClick={() => { set_toggle_drawer(!toggle_drawer) }} className=" size-5" />
                    </div>
                </div>

                <div className={` fixed top-0 left-0 ${toggle_drawer ? "h-screen w-[98vw]" : "h-0 w-0"}  `} onClick={() => { set_toggle_drawer(!toggle_drawer) }} >

                </div>

                {/* DRAWER FOR MENU  */}
                <div className={`fixed flex flex-col items-center justify-between p-5 h-[50vh] w-[98vw] bg-white/70 backdrop-blur border-primary/30 border left-0 ${toggle_drawer ? "bottom-0 opacity-100" : " opacity-0 -bottom-full"} rounded-t-4xl transition-all duration-300 `}>

                    {/* GRAB ELEMENT TO C */}
                    <div onClick={() => { set_toggle_drawer(!toggle_drawer) }} className=" w-full flex items-center justify-center group cursor-pointer">
                        <div className=" bg-primary/50 group-hover:bg-primary h-2 w-20 rounded-full " />
                    </div>

                    {/* Navigation Menu */}
                    <div className="w-full">
                        <ul className="flex flex-col gap-2 text-lg space-y-2 divide-y divide-primary/30">
                            <li className="cursor-pointer hover:opacity-70 transition-opacity p-1">
                                <Link href="/">Home</Link>
                            </li>
                            <li className="cursor-pointer hover:opacity-70 transition-opacity p-1">
                                <Link href="/solutions">Solutions</Link>
                            </li>
                            <li className="cursor-pointer hover:opacity-70 transition-opacity p-1">
                                <Link href="/blogs">Blogs</Link>
                            </li>
                            <li className="cursor-pointer hover:opacity-70 transition-opacity p-1">
                                <Link href="/about">About</Link>
                            </li>
                        </ul>
                    </div>

                    <div className=" p-5">
                        <DemoButton onClick={() => window.open("https://cal.com/ami-contrails/", "_blank")} />
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
                className={`absolute flex justify-center items-center gap-10 ${(!top_animation || isScrolled) ? " lg:min-w-[530px] backdrop-blur bg-white/30 " : " backdrop-blur-none lg:min-w-[530px] xl:min-w-[530px] bg-transparent"}  rounded-full px-5 py-1 transition-all`}
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
                    <Link className="z-20 h-10 w-10 " href="/" onClick={(event) => handleScroll(event, "home")}>
                        <Image alt="logo" src={"/logo.png"} height={40} width={40} />
                    </Link>
                    <div className="h-9 w-9 absolute bg-white blur-md rounded-full " />
                </motion.div>

                {/* Navigation Menu - always visible */}
                <div>
                    <ul className="flex gap-4 md:text-sm lg:text-base xl:text-lg  ">
                        <li className="cursor-pointer hover:opacity-70 transition-opacity">
                            <Link href="/solutions">Solutions</Link>
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
                    className="flex items-center gap-6 overflow-hidden"
                    initial={top_animation ? { x: 50, opacity: 0, scale: 0.8, maxWidth: 80, width: 80 } : { y: -10, opacity: 0, scale: 0.8 }}
                    animate={top_animation ?
                        {
                            x: isScrolled ? 0 : 50,
                            opacity: isScrolled ? 1 : 0,
                            scale: isScrolled ? 1 : 0.8,
                            maxWidth: 175,
                            width: 175
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
                    <div className="w-[175px] h-12">
                        <DemoButton type="1" onClick={() => window.open("https://cal.com/ami-contrails/", "_blank")} />
                    </div>
                </motion.div>
            </motion.div>
        </motion.nav>
    )
}

export default Navbar;