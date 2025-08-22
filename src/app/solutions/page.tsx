"use client"
import { WavyBackground } from "@/components/wavy-background"
import Footer from "@/components/Footer"
import { Search, PlaySquare, Shield, CheckCircle2, Filter, BadgeCheckIcon } from "lucide-react"
import Image from "next/image";
import Navbar from "@/components/Navbar";

const SolutionsPage = () => {

    return (
        <div className="relative min-h-screen bg-white">
            {/* Wavy Background */}
            <div className="absolute inset-0 z-0">
                <WavyBackground
                    className="z-0"
                    colors={["#0253E4", "#0253E4", "#ffffff", "#ffffff"]}
                    backgroundFill="transparent"
                    blur={10}
                />
            </div>

            <Navbar top_animation={false} />

            {/* Hero Section */}
            <div className="z-20 relative">
                <div className="bg-gradient-to-b from-primary via-white/40 to-white backdrop-blur-sm">
                    <div className="px-6 sm:px-12 lg:px-20 py-24">
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-black mb-4">
                            AI-Powered Trust & Safety Solutions
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-700 max-w-2xl">
                            Our AI-native defense solutions for proactive brand and user protection.
                        </p>
                    </div>
                </div>
            </div>

            {/* Solutions Section */}
            <div className="relative z-10 px-6 sm:px-12 lg:px-20 py-16 space-y-24">

                {/* Deepfake Detection */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="flex items-center gap-6">
                            <div className="relative w-fit flex-shrink-0">
                                <PlaySquare className="size-16 stroke-1 stroke-white fill-primary" />
                                <Search className="size-8 absolute top-1/3 left-3/5 fill-white/50" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
                                Deepfake Detection
                            </h2>
                        </div>

                        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                            AI-generated deepfakes, audio clones, and manipulated images are a growing threat to user trust and brand integrity. Our Deepfake Detection solution uses proprietary Deep Forensics AI to analyze visual and audio content for subtle, imperceptible signs of manipulation. We provide a confidence score and a detailed forensic report, so you don't just know if a deepfake exists—you know exactly how it was created.
                        </p>

                        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200">
                            <h3 className="font-semibold text-black mb-2">Ideal for:</h3>
                            <p className="text-gray-700 flex flex-wrap gap-2">
                                {"Social media platforms, video content hosts, newsrooms, call centers to verify the authenticity of media"
                                    .split(", ")
                                    .map((val, idx) => (
                                        <span key={idx} className="rounded-full border px-2 py-0.5 bg-white">
                                            {val}
                                        </span>
                                    ))
                                }
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-center lg:justify-end">
                        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 relative w-full aspect-video">
                            <Image
                                src="/solutions/deepfake_detection.gif"
                                fill
                                alt="Deepfake detection visualization"
                                className="rounded-2xl"
                            />
                        </div>
                    </div>
                </div>

                {/* Misinformation Guard */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="lg:order-2 space-y-6">
                        <div className="flex items-center gap-6">
                            <div className="relative w-fit flex-shrink-0">
                                <Shield className="size-16 stroke-1 stroke-white fill-primary" />
                                <CheckCircle2 className="size-8 absolute top-1/3 left-3/5 fill-emerald-300" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
                                Misinformation Guard
                            </h2>
                        </div>

                        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                            Disinformation campaigns and misleading content can spread virally, causing significant reputational damage in minutes. Our Misinformation Guard proactively scans and flags deceptive narratives, synthetic media, and fake news across a vast network of digital sources. It identifies key misinformation tactics, helping your team get ahead of false claims before they escalate.
                        </p>

                        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200">
                            <h3 className="font-semibold text-black mb-2">Ideal for:</h3>
                            <p className="text-gray-700 flex flex-wrap gap-2">
                                {"Media companies, brand reputation teams, public-facing platforms against viral deception"
                                    .split(", ")
                                    .map((val, idx) => (
                                        <span key={idx} className="rounded-full border px-2 py-0.5 bg-white">
                                            {val}
                                        </span>
                                    ))
                                }
                            </p>
                        </div>
                    </div>

                    <div className="lg:order-1 flex justify-center lg:justify-start">
                        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 w-full aspect-video relative">
                            <Image
                                src="/solutions/misinformation_guard.gif"
                                fill
                                alt="Misinformation guard report interface"
                                className="rounded-2xl"
                            />
                        </div>
                    </div>
                </div>

                {/* Smart Content Filter */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="flex items-center gap-6">
                            <div className="relative w-fit flex-shrink-0">
                                <Filter className="size-16 stroke-1 stroke-white fill-primary" />
                                <BadgeCheckIcon className="size-8 absolute top-1/3 left-1/2 fill-emerald-300" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
                                Smart Content Filter
                            </h2>
                        </div>

                        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                            Managing the immense volume of user-generated content (UGC) is a core challenge. Our Smart Content Filter is a comprehensive solution that automatically moderates and flags a wide range of policy violations. Using multi-modal analysis, it identifies harmful content, hate speech, illegal products, and scams, ensuring a safer and more compliant environment.
                        </p>

                        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200">
                            <h3 className="font-semibold text-black mb-2">Ideal for:</h3>
                            <p className="text-gray-700 flex flex-wrap gap-2">
                                {"Online marketplaces, social media communities, platforms with user-generated content for moderation"
                                    .split(", ")
                                    .map((val, idx) => (
                                        <span key={idx} className="rounded-full border px-2 py-0.5 bg-white">
                                            {val}
                                        </span>
                                    ))
                                }
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-center lg:justify-end">
                        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 w-full aspect-video relative">
                            <Image
                                src="/solutions/content_moderation.gif"
                                fill
                                alt="Smart content filter dashboard"
                                className="rounded-2xl"
                            />
                        </div>
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
};

export default SolutionsPage;