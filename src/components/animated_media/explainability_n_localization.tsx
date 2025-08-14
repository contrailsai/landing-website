import React from 'react';
import { motion } from 'framer-motion';
import Image from "next/image";

const Explainability_n_locallization = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.15
            }
        }
    };

    const imageContainerVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                delay: 0.3
            }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6,
                delay: 0.4
            }
        }
    };

    return (
        <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2530FF]/5 via-transparent to-purple-500/5"></div>
            
            {/* Animated Background Elements */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-[#2530FF]/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-500"></div>

            <motion.div 
                className="relative h-full w-full max-w-6xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Main Image Container */}
                <motion.div 
                    className="relative h-full w-full"
                    variants={imageContainerVariants}
                >
                    {/* Subtle border overlay - no blur */}
                    <motion.div 
                        className="absolute inset-0 rounded-3xl border border-white/20 shadow-2xl z-10 pointer-events-none"
                        variants={overlayVariants}
                    ></motion.div>
                    
                    {/* Enhanced Image Container */}
                    <div className="relative h-full w-full rounded-3xl overflow-hidden">
                        <Image 
                            src="/features_2/deepfake_check.png" 
                            alt="AI explainability visualization showing deepfake detection heatmaps and localization on facial analysis" 
                            layout="fill" 
                            objectFit="contain"
                            className="filter drop-shadow-2xl"
                        />
                        
                        {/* Animated Corner Indicators */}
                        {/* <motion.div 
                            className="absolute top-4 right-4 z-20"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                        >
                            <div className="bg-gradient-to-r from-[#2530FF] to-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2">
                                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                                AI Analysis
                            </div>
                        </motion.div> */}

                        {/* Bottom Status Bar */}
                        <motion.div 
                            className="absolute bottom-4 left-4 right-4 z-20"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                        >
                            <div className="bg-black/20 backdrop-blur-md rounded-xl p-3 border border-white/20">
                                <div className="flex items-center justify-between text-white">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                            <span className="text-sm font-medium">Real-time Detection</span>
                                        </div>
                                        <div className="w-px h-4 bg-white/30"></div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse delay-200"></div>
                                            <span className="text-sm font-medium">Heatmap Analysis</span>
                                        </div>
                                        <div className="w-px h-4 bg-white/30"></div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse delay-400"></div>
                                            <span className="text-sm font-medium">Localization</span>
                                        </div>
                                    </div>
                                    <div className="text-xs bg-[#2530FF]/20 text-white px-2 py-1 rounded-md border border-[#2530FF]/30">
                                        Multi-Modal
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating Labels */}
                        {/* <motion.div 
                            className="absolute top-1/4 left-8 z-20"
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                        >
                            <div className="bg-gradient-to-r from-green-500/90 to-emerald-600/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg">
                                Authentic Regions
                            </div>
                        </motion.div> */}

                        {/* <motion.div 
                            className="absolute top-2/3 right-8 z-20"
                            initial={{ x: 30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1.4, duration: 0.5 }}
                        >
                            <div className="bg-gradient-to-r from-red-500/90 to-pink-600/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg">
                                Suspicious Areas
                            </div>
                        </motion.div> */}

                        {/* Scanning Line Effect - finite animation */}
                        {/* <motion.div 
                            className="absolute inset-0 z-15 pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.3, 0] }}
                            transition={{ 
                                duration: 3, 
                                delay: 2,
                                ease: "easeInOut"
                            }}
                        >
                            <motion.div 
                                className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#2530FF] to-transparent"
                                animate={{ y: [0, 400] }}
                                transition={{ 
                                    duration: 3, 
                                    delay: 2,
                                    ease: "easeInOut"
                                }}
                            />
                        </motion.div> */}
                    </div>
                </motion.div>

                {/* Floating Technical Info */}
                <motion.div 
                    className="absolute top-6 left-6 z-30"
                    variants={titleVariants}
                >
                    <div className="bg-black/30 backdrop-blur-md rounded-lg p-3 border border-white/20 text-white">
                        <div className="text-sm font-bold text-[#2530FF] mb-1">Deep Learning Analysis</div>
                        <div className="text-xs opacity-80">Neural Network Visualization</div>
                    </div>
                </motion.div>

                {/* Processing Indicator - stops after analysis complete */}
                <motion.div 
                    className="absolute bottom-6 right-6 z-30"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1, 1, 0] }}
                    transition={{ 
                        delay: 1.6, 
                        duration: 0.3,
                        times: [0, 0.1, 0.8, 1],
                        ease: "easeInOut"
                    }}
                >
                    <div className="bg-gradient-to-r from-[#2530FF] to-purple-600 rounded-full p-3 shadow-lg">
                        <motion.div 
                            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ 
                                duration: 1, 
                                repeat: 3, 
                                ease: "linear",
                                delay: 1.6
                            }}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Explainability_n_locallization;