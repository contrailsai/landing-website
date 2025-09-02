"use client";
import { ContainerTextFlip } from "../container-text-flip";
import { motion } from "framer-motion";
import DemoButton from "../demo_button";
import { ContentGlobe } from "@/components/content-globe"

const HeroPage = () => {

    const words = [
        "Content Safety",
        "User Protection",
        "Digital Wellness",
        "Safer Interactions",
        "Responsible Content"
    ];

    return (
        <section id="home" className=" overflow-hidden h-[110vh] px-5 md:px-20 py-10 flex flex-col md:flex-row items-center justify-between relative">

            <div className=" text-center md:text-left  md:min-w-xl top-24 md:-top-32 relative z-30">
                <h1 className=" text-2xl md:text-3xl font-bold">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Reimagining AI for online
                    </motion.span>
                    <br />
                    <ContainerTextFlip textClassName="text-primary text-3xl lg:text-5xl font-bold -ml-6" className=" mt-5 " words={words} />
                </h1>

                <motion.div
                    className=" text-sm md:text-lg md:px-0 my-6 text-gray-700 font-outfit max-w-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    Detect deepfakes, misinformation, fraud, and harmful content at enterprise scale.
                </motion.div>

                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="w-full flex items-center justify-center md:justify-start "
                >
                    <DemoButton onClick={() => window.open("https://cal.com/ami-contrails/", "_blank")} />
                </motion.span>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className=" top-64 lg:top-0  absolute h-full w-full "
            >
                <ContentGlobe />
            </motion.div>
        </section >
    )
}

export default HeroPage;