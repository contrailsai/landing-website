"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import { User, Heart, MessageCircle, Share2 } from "lucide-react";

// --- Type Definition ---
type Category = {
    id: number;
    name: string;
    percentage: number;
};

// --- Data for different analysis scenarios ---
const contentScenarios: Category[][] = [
    [
        { id: 1, name: "Drugs Abuse", percentage: 4 },
        { id: 2, name: "Hate Speech", percentage: 89 },
        { id: 3, name: "Violence", percentage: 92 },
        { id: 4, name: "Sectarianism", percentage: 12 },
        { id: 5, name: "Terrorism", percentage: 3 },
    ],
    [
        { id: 1, name: "Drugs Abuse", percentage: 95 },
        { id: 2, name: "Hate Speech", percentage: 78 },
        { id: 3, name: "Violence", percentage: 21 },
        { id: 4, name: "Sectarianism", percentage: 5 },
        { id: 5, name: "Terrorism", percentage: 8 },
    ],
    [
        { id: 1, name: "Drugs Abuse", percentage: 2 },
        { id: 2, name: "Hate Speech", percentage: 15 },
        { id: 3, name: "Violence", percentage: 7 },
        { id: 4, name: "Sectarianism", percentage: 91 },
        { id: 5, name: "Terrorism", percentage: 88 },
    ],
    [
        { id: 1, name: "Drugs Abuse", percentage: 1 },
        { id: 2, name: "Hate Speech", percentage: 3 },
        { id: 3, name: "Violence", percentage: 5 },
        { id: 4, name: "Sectarianism", percentage: 2 },
        { id: 5, "name": "Terrorism", percentage: 0 },
    ],
];

// --- Sub-Component: Social Post Card (Visually Updated) ---
function SocialPost() {
    return (
        <motion.div
            className="w-64 bg-white rounded-3xl shadow-md overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.03, boxShadow: "0px 8px 25px -5px rgba(0,0,0,0.1)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {/* Post Header */}
            <div className="flex items-center p-3 gap-3 border-b border-gray-100">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                    <div className="h-3 w-24 bg-gray-300 rounded-full mb-1.5" />
                    <div className="h-2 w-16 bg-gray-200 rounded-full" />
                </div>
            </div>

            {/* Post Content (Abstracted Image) - Updated background, removed animation */}
            <div className="w-full h-48 bg-indigo-100"></div>

            {/* Post Actions */}
            <div className="flex items-center justify-between p-3 text-gray-500">
                <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    <span className="text-sm font-medium text-gray-600">1.2k</span>
                </div>
                <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-medium text-gray-600">345</span>
                </div>
                <Share2 className="w-5 h-5" />
            </div>
        </motion.div>
    );
}

// --- Sub-Component: Animated Counter for percentages ---
// (No changes needed, this component is perfect)
function AnimatedCounter({ to }: { to: number }) {
    const nodeRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const node = nodeRef.current;
        if (!node) return;

        const controls = animate(0, to, {
            duration: 1,
            ease: "easeOut",
            onUpdate(value) {
                node.textContent = Math.round(value).toString();
            },
        });

        return () => controls.stop();
    }, [to]);

    return <span ref={nodeRef} />;
}


// --- Sub-Component: Analysis Results Display (Visually Rebuilt) ---
function AnalysisResults({ categories }: { categories: Category[] }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 15, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 },
        },
    };

    return (
        <motion.ul
            className="space-y-4 w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {categories.map((category) => (
                <motion.li key={category.id} variants={itemVariants} className="relative">
                    {/* Bar background and animated fill */}
                    <div className="w-full h-8 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-indigo-300"
                            initial={{ width: "0%" }}
                            animate={{ width: `${category.percentage}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        />
                    </div>
                    {/* Text Overlay - positioned absolutely over the bar */}
                    <div className="absolute inset-0 px-3 flex justify-between items-center">
                        <span className="text-sm font-medium text-white/95">{category.name}</span>
                        <span className="text-sm font-bold text-white">
                            <AnimatedCounter to={category.percentage} />%
                        </span>
                    </div>
                </motion.li>
            ))}
        </motion.ul>
    );
}

// --- Sub-Component: Skeleton Loader for processing state ---
// (No changes needed, this component is perfect)
function AnalysisLoader() {
    const SkeletonBar = () => <div className="w-full h-8 bg-white/10 rounded-full animate-pulse" />;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <h3 className="text-lg font-semibold text-white mb-2">Analyzing Content...</h3>
            <div className="w-full space-y-4">
                <SkeletonBar />
                <SkeletonBar />
                <SkeletonBar />
                <SkeletonBar />
                <SkeletonBar />
            </div>
        </div>
    );
}


// --- Main Component: Smart Content Filter (Corrected & Visually Improved) ---
export default function SmartContentFilter() {
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]); // Start with empty categories
    const [scenarioIndex, setScenarioIndex] = useState(0);

    // This useEffect hook manages the entire animation cycle and runs only once.
    useEffect(() => {
        const runCycle = (index: number) => {
            setIsLoading(true);
            setTimeout(() => {
                setCategories(contentScenarios[index]);
                setIsLoading(false);
            }, 2000); // 2-second loading time
        };

        runCycle(0); // Kick off the first cycle on mount

        const cycleInterval = setInterval(() => {
            setScenarioIndex(prevIndex => {
                const nextIndex = (prevIndex + 1) % contentScenarios.length;
                runCycle(nextIndex); // Trigger the next cycle
                return nextIndex; // Return new index to update state
            });
        }, 7000); // Total cycle time: 2s loading + 5s display

        return () => clearInterval(cycleInterval); // Cleanup on unmount
    }, []); // Empty dependency array ensures this effect runs only ONCE

    return (
        <div className="h-full flex flex-col md:flex-row items-center justify-center gap-6 p-4">
            <SocialPost />

            {/* Connector */}
            <div className="hidden md:block w-16 lg:w-24 h-1 bg-gray-200 rounded-full overflow-hidden relative">
                <AnimatePresence>
                    {isLoading && (
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-blue-600"
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            exit={{ x: "100%", opacity: 0 }}
                            transition={{
                                duration: 1.5,
                                ease: "easeInOut",
                                repeat: Infinity,
                                repeatType: "loop",
                            }}
                        />
                    )}
                </AnimatePresence>
                {!isLoading && <div className="w-full h-full bg-teal-400" />}
            </div>

            {/* Analysis Panel */}
            <div className="w-full sm:w-80 md:w-72 h-auto bg-blue-600 rounded-3xl p-6 flex flex-col justify-center text-white relative overflow-hidden">
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <AnalysisLoader />
                        </motion.div>
                    ) : (
                        <motion.div
                            key={scenarioIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <AnalysisResults categories={categories} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );

}