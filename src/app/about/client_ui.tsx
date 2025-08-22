"use client"

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { WavyBackground } from "@/components/wavy-background"
import CTA_Section from '@/components/sections/CTA';

import React from 'react';
import { motion } from 'framer-motion';

import {
    Eye,
    Star,
    Shield,
    Heart,
    Globe,
    CheckCircle,
    Lock,
    Users,
    Zap,
    Target,
    Lightbulb,
    Handshake,
    Brain
} from 'lucide-react';

const About_Page_UI = () => {

    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: "easeOut" }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="relative min-h-screen">
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
            <div className="z-20 relative bg-gradient-to-b from-transparent to-white backdrop-blur-sm">
                <motion.div
                    className="px-4 sm:px-8 md:px-20 py-16 md:py-24"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-gray-900 text-center md:text-left mt-10 sm:mt-0">
                        About
                    </h1>
                    <motion.div
                        className="mt-4 h-1 bg-blue-600 mx-auto md:mx-0"
                        initial={{ width: 0 }}
                        animate={{ width: "120px" }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    />
                </motion.div>
            </div>
            {/* Content Container */}
            <motion.div
                className="px-4 sm:px-8 md:px-20 py-12 md:py-20 space-y-16 md:space-y-32 mb-20"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
            >
                {/* Who We Are Section */}
                <motion.div variants={fadeInUp} className="space-y-8">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-16">
                        {/* Content */}
                        <div className="flex-1 space-y-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-blue-100 rounded-full">
                                    <Shield className="w-8 h-8 text-blue-600" />
                                </div>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                                    Who We Are
                                </h2>
                            </div>

                            <p className="text-lg sm:text-xl leading-relaxed text-gray-700 mb-4">
                                <strong>Contrails.ai</strong> is an AI-native Trust & Safety company dedicated to making the internet safer. We build cutting-edge <strong>deepfake detection tools, misinformation defense systems, and smart content moderation solutions</strong> that empower platforms, enterprises, and governments to safeguard digital spaces at scale.
                            </p>

                            <p className="text-lg sm:text-xl leading-relaxed text-gray-700">
                                From protecting global newsrooms against disinformation to shielding Fortune 500 executives from synthetic impersonations, Contrails has become a trusted partner in <strong>AI-driven safety, compliance, and authenticity verification.</strong>
                            </p>
                        </div>

                        {/* Illustration */}
                        <div className="flex-1 lg:flex-none lg:w-80">
                            <motion.div
                                className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="grid grid-cols-2 gap-4 items-center justify-center">
                                    <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
                                        <Eye className="w-10 h-10 text-blue-600 mb-2" />
                                        <span className="text-sm font-medium text-gray-700">Detection</span>
                                    </div>
                                    <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
                                        <Shield className="w-10 h-10 text-green-600 mb-2" />
                                        <span className="text-sm font-medium text-gray-700">Protection</span>
                                    </div>
                                    <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
                                        <Globe className="w-10 h-10 text-purple-600 mb-2" />
                                        <span className="text-sm font-medium text-gray-700">Global Scale</span>
                                    </div>
                                    <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
                                        <CheckCircle className="w-10 h-10 text-emerald-600 mb-2" />
                                        <span className="text-sm font-medium text-gray-700">Verification</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Vision Section */}
                <motion.div variants={fadeInUp} className="space-y-8">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-16">
                        {/* Content */}
                        <div className="flex-1 space-y-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-purple-100 rounded-full">
                                    <Eye className="w-8 h-8 text-purple-600" />
                                </div>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                                    Vision
                                </h2>
                            </div>

                            <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-gray-700 text-balance">
                                A digital world where <strong>truth, safety, and trust are foundational</strong>—where enterprises, governments, and everyday users can thrive without the risks posed by AI-generated manipulation, fraud, or malicious content.
                            </p>
                        </div>

                        {/* Illustration */}
                        <div className="flex-1 lg:flex-none lg:w-80">
                            <motion.div
                                className="bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-2xl"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="grid grid-cols-2 gap-4 items-center justify-center">
                                    <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
                                        <CheckCircle className="w-10 h-10 text-green-600 mb-2" />
                                        <span className="text-sm font-medium text-gray-700">Truth</span>
                                    </div>
                                    <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
                                        <Shield className="w-10 h-10 text-blue-600 mb-2" />
                                        <span className="text-sm font-medium text-gray-700">Safety</span>
                                    </div>
                                    <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
                                        <Heart className="w-10 h-10 text-red-500 mb-2" />
                                        <span className="text-sm font-medium text-gray-700">Trust</span>
                                    </div>
                                    <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
                                        <Globe className="w-10 h-10 text-purple-600 mb-2" />
                                        <span className="text-sm font-medium text-gray-700">Global Impact</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Mission Section */}
                <motion.div variants={fadeInUp} className="space-y-8">
                    <div className="flex flex-col lg:flex-row-reverse items-start lg:items-center gap-6 lg:gap-16">
                        {/* Content */}
                        <div className="flex-1 space-y-6">
                            <div className="flex items-center gap-4 mb-6 lg:justify-end">
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 lg:text-right">
                                    Mission
                                </h2>
                                <div className="p-3 bg-green-100 rounded-full">
                                    <Target className="w-8 h-8 text-green-600" />
                                </div>
                            </div>

                            <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-gray-700 lg:text-right text-balance">
                                To create a safer, more trustworthy internet by equipping platforms and communities with <strong>next-generation detection technology</strong> that identifies harmful synthetic media, misinformation, and online threats in real-time.
                            </p>
                        </div>

                        {/* Illustration */}
                        <div className="flex-1 lg:flex-none lg:w-80">
                            <motion.div
                                className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                                        <Zap className="w-8 h-8 text-yellow-600 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Real-time Detection</h3>
                                            <p className="text-sm text-gray-600">Instant threat identification</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                                        <Brain className="w-8 h-8 text-purple-600 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold text-gray-900">AI-Powered Defense</h3>
                                            <p className="text-sm text-gray-600">Next-gen technology</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                                        <Users className="w-8 h-8 text-blue-600 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Community Safety</h3>
                                            <p className="text-sm text-gray-600">Protecting digital spaces</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>


                {/* Team & Values Section */}
                <motion.div variants={fadeInUp} className="space-y-12">
                    {/* Team */}
                    <div className="text-center space-y-6">
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <div className="p-3 bg-orange-100 rounded-full">
                                <Users className="w-8 h-8 text-orange-600" />
                            </div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                                Our Team & Values
                            </h2>
                        </div>

                        <p className="text-lg sm:text-xl leading-relaxed text-gray-700 max-w-4xl mx-auto text-balance">
                            Contrails is led by <strong>AI researchers, trust & safety experts, policy leaders, and human rights advocates</strong> with decades of experience in online safety. Our team has worked on some of the most pressing challenges of the internet age—from combating misinformation to pioneering <strong>safety-by-design frameworks</strong> adopted worldwide.
                        </p>

                        <div className="mt-8 text-lg sm:text-xl text-gray-700 max-w-4xl mx-auto text-balance">
                            At Contrails, we believe <strong>safety is not optional—it's by design.</strong> <br/> Our culture blends innovation with responsibility.
                        </div>
                    </div>

                    {/* Values Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                        <motion.div
                            className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-100 rounded-full flex-shrink-0">
                                    <Target className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Purpose-First Approach</h3>
                                    <p className="text-gray-700">Every feature we build addresses real-world safety challenges.</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-green-100 rounded-full flex-shrink-0">
                                    <Handshake className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Collaboration</h3>
                                    <p className="text-gray-700">We work with regulators, platforms, and civil society worldwide.</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-purple-100 rounded-full flex-shrink-0">
                                    <Heart className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Equity & Inclusion</h3>
                                    <p className="text-gray-700">Diversity of perspectives fuels stronger solutions.</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-2xl"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-orange-100 rounded-full flex-shrink-0">
                                    <Lightbulb className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation Mindset</h3>
                                    <p className="text-gray-700">Pushing boundaries in AI detection to stay ahead of emerging threats.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                <CTA_Section />

            </motion.div>
            <Footer />
        </div>
    );
};

export default About_Page_UI;
