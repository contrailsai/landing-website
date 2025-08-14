import React from "react";
// import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import Image from "next/image";

import { motion } from "framer-motion"
// import { motion } from "motion/react";
import { Video, AudioLines, ImageIcon } from "lucide-react";
// import { InfiniteMovingCards } from "@/components/infinte_moving_cards";
import { div } from "framer-motion/client";
import ScalabilitySection from "@/components/animated_media/card_scalability"
import FastDetection from "@/components/animated_media/fast_detection"
import Support247 from "../animated_media/Support_247";

export default function FeaturesSectionDemo() {
    const features = [
        {
            title: "Instant AI-Powered Deepfake Reports",
            description:
                "Upload any media file and receive an in-depth AI analysis in moments — complete with confidence scores and forensic insights.",
            skeleton: <ReportDemo />,
            className:
                "col-span-1 lg:col-span-4 border-b lg:border-r border-primary/20",
        },
        {
            title: "Lightning Fast Detection",
            description:
                "No more waiting hours. Our cutting-edge system delivers verified results in just minutes, even for high-resolution files.",
            skeleton: <FastDetection />,
            className:
                "border-b col-span-1 lg:col-span-2 border-primary/20",
        },
        {
            title: "Expert Support",
            description:
                "24/7 support for smooth and efficient operations",
            skeleton: <Support247 />,
            className:
                "col-span-1 lg:col-span-2 lg:border-r border-primary/20",
        },
        {
            title: "Scalability and Performance",
            description:
                "Platform scales to meet growing demands, ensuring peak performance.",
            skeleton: <ScalabilitySection />,
            className:
                "col-span-1 lg:col-span-4 ",
        }
    ];

    return (
        <div className="  rounded-3xl text-black">

            <div className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto font-outfit">
                <div className="px-8">
                    <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-semibold text-black">
                        Packed with All the features you need
                    </h4>

                    <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal">
                        From Image checks to video checks, Every media form AI can generate has a check for it.
                    </p>
                </div>

                <div className="relative ">
                    <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-3xl border-primary/20">
                        {features.map((feature) => (
                            <FeatureCard key={feature.title} className={feature.className}>
                                <FeatureTitle>{feature.title}</FeatureTitle>
                                <FeatureDescription>{feature.description}</FeatureDescription>
                                <div className=" h-full w-full">{feature.skeleton}</div>
                            </FeatureCard>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

const FeatureCard = ({
    children,
    className,
}: {
    children?: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={`p-4 sm:p-8 relative overflow-hidden ${className}`}>
            {children}
        </div>
    );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
    return (
        <p className=" max-w-5xl mx-auto text-left tracking-tight text-black text-xl md:text-2xl md:leading-snug">
            {children}
        </p>
    );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
    return (
        <p
            className={`text-sm md:text-base text-left
                text-neutral-500 font-normal
                max-w-lg mx-0 my-2`}
        >
            {children}
        </p>
    );
};

export const ReportDemo = () => {
    return (
        <div className="relative flex py-8 px-2 gap-10  md:h-[650px]">
            <div className="w-full rounded-xl  p-5 bg-white shadow-2xl shadow-primary/20 group h-full">
                <div className="flex flex-1 w-full h-full flex-col space-y-2  ">
                    <Image
                        src="/features_2/report.png"
                        alt="header"
                        width={800}
                        height={500}
                        className="h-full w-full aspect-square object-contain object-left-top rounded-sm"
                    />
                </div>
            </div>
        </div>
    );
};

