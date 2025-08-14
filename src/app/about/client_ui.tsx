"use client"

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { WavyBackground } from "@/components/wavy-background"
import CTA_Section from '@/components/sections/CTA';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Heart, Lock, Users, Globe, CheckCircle, Star } from 'lucide-react';

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
                {/* Vision Section */}
                <motion.div variants={fadeInUp} className="space-y-8">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-16">
                        {/* Vision Content */}
                        <div className="flex-1 space-y-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-blue-100 rounded-full">
                                    <Eye className="w-8 h-8 text-blue-600" />
                                </div>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                                    Vision
                                </h2>
                            </div>

                            <p className="text-lg sm:text-xl leading-relaxed text-gray-700">
                                "To shape a world where trust is the foundation of every digital connection—where technology serves as a guardian of truth, safety, and human dignity. We envision a future in which every click, message, and interaction is secure, authentic, and built to protect the very best of humanity."
                            </p>
                        </div>

                        {/* Vision Illustration */}
                        <div className="flex-1 lg:flex-none lg:w-80">
                            <motion.div
                                className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="grid grid-cols-2 gap-4 items-center justify-center">
                                    <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
                                        <Shield className="w-10 h-10 text-green-600 mb-2" />
                                        <span className="text-sm font-medium text-gray-700">Security</span>
                                    </div>
                                    <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
                                        <Heart className="w-10 h-10 text-red-500 mb-2" />
                                        <span className="text-sm font-medium text-gray-700">Human Dignity</span>
                                    </div>
                                    <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
                                        <Globe className="w-10 h-10 text-blue-600 mb-2" />
                                        <span className="text-sm font-medium text-gray-700">Global Trust</span>
                                    </div>
                                    <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
                                        <CheckCircle className="w-10 h-10 text-emerald-600 mb-2" />
                                        <span className="text-sm font-medium text-gray-700">Authenticity</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Mission Section */}
                <motion.div variants={fadeInUp} className="space-y-8">
                    <div className="flex flex-col lg:flex-row-reverse items-start lg:items-center gap-6 lg:gap-16">
                        {/* Mission Content */}
                        <div className="flex-1 space-y-6">
                            <div className="flex items-center gap-4 mb-6 lg:justify-end">
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 lg:text-right">
                                    Mission
                                </h2>
                                <div className="p-3 bg-green-100 rounded-full">
                                    <Star className="w-8 h-8 text-green-600" />
                                </div>
                            </div>

                            <p className="text-lg sm:text-xl leading-relaxed text-gray-700 lg:text-right">
                                "We stand alongside organizations to harness the power of multimodal AI—anticipating dangers, disarming threats, and protecting the digital lives of people everywhere. Our mission is simple yet vital: to create online spaces where safety is a given, trust is unshakable, and communities can thrive without fear."
                            </p>
                        </div>

                        {/* Mission Illustration */}
                        <div className="flex-1 lg:flex-none lg:w-80">
                            <motion.div
                                className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                                        <Lock className="w-8 h-8 text-blue-600 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Anticipate Dangers</h3>
                                            <p className="text-sm text-gray-600">Proactive threat detection</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                                        <Shield className="w-8 h-8 text-red-500 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Disarm Threats</h3>
                                            <p className="text-sm text-gray-600">Real-time protection</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                                        <Users className="w-8 h-8 text-green-600 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Protect Communities</h3>
                                            <p className="text-sm text-gray-600">Safe digital spaces</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                <CTA_Section />
            </motion.div>

            <Footer />
        </div>
    );
};

export default About_Page_UI;
