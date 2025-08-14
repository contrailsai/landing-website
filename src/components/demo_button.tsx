
import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import {
    motion,
    Variants,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface DamnGoodButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    variant?: "primary" | "secondary";
    type?: "1" | "2";
}

const DemoButton: React.FC<DamnGoodButtonProps> = ({
    onClick,
    variant = "primary",
    type = "2",
    className = "",
}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);


    const buttonVariants: Variants = {
        rest: {
            scale: 1,
            // boxShadow: "0px 5px 15px rgba(2, 83, 228, 0.2)",
            transition: { duration: 0.3, ease: "circOut" }
        },
        tap: {
            scale: 0.95,
            transition: { duration: 0.1 }
        }
    };

    const arrowVariants: Variants = {
        rest: { x: 0, opacity: 0.8 },
        hover: {
            x: 8,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 15 }
        }
    };

    return (
        <div className={` w-fit ${ type === "1" ? " " : (variant === "primary" ? "bg-white border-primary shadow-primary/70" : "bg-primary border-white shadow-white/70 ") + " border-2"} shadow-inner rounded-full py-1 px-1 `}>
            <motion.button
                variants={buttonVariants}
                initial="rest"
                animate={isHovered ? "hover" : "rest"}
                whileTap="tap"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                onClick={onClick}
                className={` ${ variant === "primary" ? "bg-primary text-white shadow-primary/70" : "bg-white text-primary shadow-white/70"  }  rounded-full py-1 px-3 text-lg relative overflow-hidden  shadow outline-none focus:outline-none ${className}`}
            >
                {/* Shine Effect */}
                <motion.div
                    className={`absolute inset-0 w-full h-full ${ variant === "primary" ? "bg-gradient-to-r from-transparent via-white/30 to-transparent" : "bg-gradient-to-r from-transparent via-primary/30 to-transparent" }`}   
                    initial={{ x: "-150%" }}
                    animate={{ x: isHovered ? "150%" : "-150%" }}
                    transition={{ duration: 0.7, ease: isHovered ? "easeOut" : [0.25, 1, 0.5, 1] }}
                    style={{ pointerEvents: 'none' }}
                />

                {/* Content */}
                <motion.span
                    className="relative z-10 flex items-center justify-center font-outfit cursor-pointer"
                >
                    Book a Demo
                    <motion.span variants={arrowVariants} className="ml-2 flex items-center">
                        <ArrowRight className="h-5 w-5" />
                    </motion.span>
                </motion.span>
            </motion.button>
        </div >

    );
};

export default DemoButton;
