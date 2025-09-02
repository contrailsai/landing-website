"use client";

import { useState, useEffect } from "react";
import { Upload, Loader2, FileBarChart2, FileVideoIcon, FileImageIcon, FileVolume } from "lucide-react";

const FastDetection = () => {
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        // toggle hover state every 1s
        const interval = setInterval(() => {
            setIsHovered((prev) => !prev);
        }, 1000); // 1000ms = 1s

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className={`flex flex-col items-center gap-16 py-6 overflow-hidden relative group ${isHovered ? "hovering" : ""
                }`}
        >
            {/* --- Animated Line --- */}
            <div
                className={`absolute w-2 h-[90%] bg-gradient-to-b from-transparent to-primary animate-flow-line z-10 transition-all duration-500 -top-full ${isHovered ? "translate-y-full" : ""}`}
            />

            {/* Upload */}
            <div className="h-32 w-32 rounded-3xl bg-primary p-4 z-10 text-white relative">
                <div className="relative z-10 rounded-3xl border-4 border-dotted border-slate-300 bg-white/30 h-full w-full p-3 flex items-center justify-center">
                    <Upload className="size-8 text-white transition-all" />
                </div>
                <div className="z-0 overflow-hidden -top-16 font-bold text-lg w-20 -right-32 transition-all relative text-black">
                    Upload
                </div>
                <div
                    className={`z-0 text-gray-50 overflow-hidden -top-32 font-bold text-lg transition-all relative duration-300 ${isHovered ? "w-0 left-0" : "  w-20 -left-20 "}`}
                >
                    <FileVideoIcon className="size-10 p-2 rounded-full bg-cyan-400 " />
                </div>
                <div
                    className={`z-0 overflow-hidden -top-28 font-bold text-lg transition-all relative text-gray-50  duration-200 ${isHovered ? "w-0 left-0" : "-left-24  w-20 "}`}
                >
                    <FileVolume className="size-10 p-2 rounded-full bg-rose-400 " />
                </div>
                <div
                    className={`z-0 overflow-hidden -top-[185px] font-bold text-lg transition-all relative text-gray-50 duration-500 ${isHovered ? "w-0 left-0" : "-left-32 w-20"}`}
                >
                    <FileImageIcon className="size-10 p-2 rounded-full bg-emerald-400 " />
                </div>
            </div>

            {/* Process */}
            <div className="h-32 w-32 rounded-3xl bg-primary p-4 z-10">
                <div className="rounded-3xl h-full w-full p-3 flex items-center justify-center">
                    <Loader2 className={`size-10 text-white ${isHovered ? "animate-spin" : ""}`} />
                </div>
                <div className="z-0 overflow-hidden -top-16 font-bold text-lg w-20 -right-32 transition-all relative text-black">
                    Process
                </div>
            </div>

            {/* Results */}
            <div className="h-32 w-32 rounded-3xl bg-primary p-4 z-20">
                <div className="rounded-3xl h-full w-full p-3 flex items-center justify-center">
                    <FileBarChart2 className={`size-10 text-white ${isHovered ? "animate-pulse" : ""}`} />
                </div>
                <div className="z-0 overflow-hidden -top-16 font-bold text-lg w-20 -right-32 transition-all relative text-black">
                    Results
                </div>
            </div>

            {/* Done */}
            <div
                className={`top-[75%] transition-all duration-700 absolute rounded-bl-4xl rounded-t-3xl bg-green-400 text-white font-bold text-2xl p-3 ${isHovered ? "right-[270px] md:right-64" : "right-36"}`}
            >
                <div className="z-10 relative">Done</div>
                <div
                    className={`z-0 absolute bg-green-400 h-full w-full top-0 left-0 rounded-full ${isHovered ? "animate-pulse" : ""}`}
                />
            </div>
        </div>
    );
};

export default FastDetection;
