import React from 'react';
import { motion } from 'framer-motion';
import Image from "next/image";

const Verified_detailed_report = () => {
    const scores = [
        {
            title: "Frame Result",
            result: "Fake",
            score: "20.4%",
            type: "fake",
            confidence: 20.4,
            icon: "🎬"
        },
        {
            title: "Audio Result",
            result: "Real",
            score: "94.4%",
            type: "real",
            confidence: 94.4,
            icon: "🔊"
        },
        {
            title: "Image Result",
            result: "Fake",
            score: "10.5%",
            type: "fake",
            confidence: 10.5,
            icon: "🖼️"
        }
    ];

    const getScoreStyles = (type:any) => {
        if (type === "fake") {
            return {
                bg: "from-red-500/20 to-red-600/10",
                text: "text-red-400",
                scoreBg: "bg-red-500/20",
                border: "border-red-500/40",
                glow: "shadow-red-500/20"
            };
        }
        return {
            bg: "from-green-500/20 to-green-600/10",
            text: "text-green-400",
            scoreBg: "bg-green-500/20",
            border: "border-green-500/40",
            glow: "shadow-green-500/20"
        };
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const scoreVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div 
            className="w-full h-full space-y-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header Section with Overall Status */}
            <motion.div 
                className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-2 border border-white/20"
                variants={itemVariants}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-0.5">Detection Summary</h3>
                        <p className="text-gray-200 text-sm">Comprehensive multi-modal analysis results</p>
                    </div>
                    <div className="bg-gradient-to-r from-[#2530FF] to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Analysis Complete
                    </div>
                </div>
            </motion.div>

            {/* Scores Section - Enhanced Cards */}
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                variants={itemVariants}
            >
                {scores.map((score, index) => {
                    const styles = getScoreStyles(score.type);
                    return (
                        <motion.div
                            key={index}
                            className={`bg-gradient-to-br ${styles.bg} backdrop-blur-sm rounded-xl p-2 border ${styles.border} shadow-lg ${styles.glow} overflow-hidden hover:scale-105 transition-all duration-300`}
                            variants={scoreVariants}
                            whileHover={{ y: -5 }}
                        >
                            <div className='absolute h-full w-full bg-white/20 top-0 left-0 rounded-xl blur-4xl' />
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">{score.icon}</span>
                                    <span className="text-white font-medium text-sm">{score.title}</span>
                                </div>
                                <div className={`${styles.scoreBg} ${styles.text} px-2 py-1 rounded-full border text-xs font-bold`}>
                                    {score.result}
                                </div>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="mb-3">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs text-gray-200">Confidence</span>
                                    <span className={`text-xs font-bold ${styles.text}`}>{score.score}</span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                    <motion.div
                                        className={`h-full bg-gradient-to-r ${score.type === 'fake' ? 'from-red-500 to-red-600' : 'from-green-500 to-green-600'}`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${score.confidence}%` }}
                                        transition={{ duration: 1, delay: index * 0.2 }}
                                    />
                                </div>
                            </div>
                            
                            {/* Risk Level Indicator */}
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${score.type === 'fake' ? 'bg-red-500' : 'bg-green-500'} animate-pulse`}></div>
                                <span className="text-xs text-gray-200">
                                    {score.type === 'fake' ? 'High Risk' : 'Verified Authentic'}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Analysis Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* BBox Detection Section */}
                <motion.div 
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-2 border border-white/20"
                    variants={itemVariants}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 bg-[#2530FF] rounded-full animate-pulse"></div>
                        <h3 className="text-lg font-bold text-white">Face Detection</h3>
                        <div className="ml-auto border bg-blue-500/20 text-white text-xs px-2 py-1 rounded-full">
                            Localized
                        </div>
                    </div>
                    
                    <div className="relative group flex flex-col justify-center items-center">
                        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl z-10 pointer-events-none"></div> */}
                        <motion.div 
                            className="relative aspect-[4/3] rounded-xl overflow-hidden w-32"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image
                                className="object-cover filter brightness-110"
                                src="/features_2/bbox.png"
                                alt="Bounding box detections showing facial recognition analysis"
                                fill
                                // sizes="(max-width: 500px) 100vw, 50vw"
                            />
                            <div className="absolute top-1 left-3 bg-green-500/90 text-white text-xs font-bold px-2 py-1 rounded-full">
                                Face Detected
                            </div>
                        </motion.div>
                        <div className="mt-3 text-sm text-gray-200">
                            High-precision facial boundary detection with confidence mapping
                        </div>
                    </div>
                </motion.div>

                {/* Analysis Graphs Section */}
                <motion.div 
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-2 border border-white/20"
                    variants={itemVariants}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 bg-[#2530FF] rounded-full animate-pulse"></div>
                        <h3 className="text-lg font-bold text-white">Temporal Analysis</h3>
                        <div className="ml-auto border bg-purple-500/20 text-white text-xs px-2 py-1 rounded-full">
                            Time-series
                        </div>
                    </div>
                    
                    <div className="relative group">
                        <motion.div 
                            className="relative rounded-xl overflow-hidden"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10 pointer-events-none"></div>
                            <Image
                                className="object-contain bg-white/5 rounded-xl p-4"
                                src="/features_2/graph.png"
                                alt="Time-series analysis graphs showing detection confidence over time"
                                width={500}
                                height={300}
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            <div className="absolute top-6 right-6 bg-orange-500/90 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                <div className="w-1 h-1 bg-white rounded-full animate-ping"></div>
                                Processing
                            </div>
                        </motion.div>
                        <div className="mt-3 text-sm text-gray-200">
                            Frame-by-frame confidence analysis with anomaly detection patterns
                        </div>
                    </div>
                </motion.div>
            </div>

        </motion.div>
    );
};

export default Verified_detailed_report;