"use client";

import { motion } from "framer-motion"
import DemoButton from "@/components/demo_button";
import Image from "next/image"
import { useState, useEffect } from "react"
import Link from "next/link";

interface NavbarProps {
    show_links: boolean
}

const Top_navbar_title = ({ show_links }: NavbarProps) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 600);
        };

        // Initial check
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    if (isMobile) {
        return (
            <></>
        )
    }

    // Navigation
    return (

        <motion.nav
            className="py-2 px-20 flex justify-between items-center relative"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >

            <motion.div
                className="flex items-center gap-2"
                initial={{ scale: 0.8, opacity: 0, rotate: 0 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
            >
                <div className=" h-8 w-8 relative">
                    <Image alt="logo" src={"/logo.png"} fill />
                </div>
                <span
                    className="font-outfit text-3xl font-bold text-primary"
                >
                    Contrails AI
                </span>
            </motion.div>

            {
                show_links ?
                    <div>
                        <ul className="flex gap-4 text-lg">
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
                    :
                    <></>
            }

            <motion.div
                className="flex items-center gap-6"
                initial={{ scale: 0.8, opacity: 0, rotate: 0 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
            >
                <DemoButton onClick={() => window.open("https://cal.com/ami-contrails/", "_blank")} />
            </motion.div>
        </motion.nav>
    )
}

export default Top_navbar_title;