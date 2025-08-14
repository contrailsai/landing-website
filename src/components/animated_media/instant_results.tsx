import React from 'react';
import { motion } from 'framer-motion';

const Instant_results = () => {
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2
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

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
                delay: 0.2,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="h-full flex items-center justify-center p-4">
            <motion.div
                className="max-w-2xl w-full flex flex-col gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Frame Results Section */}
                <motion.div
                    className=""
                    variants={itemVariants}
                >
                    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 group">
                        <div className="flex items-center gap-3 pr-4 py-1">
                            <div className="w-2 h-2 bg-[#2530FF] rounded-full animate-pulse"></div>
                            <h3 className=" w-44 font-bold text-xl text-white group-hover:text-[#2530FF] transition-colors duration-300">
                                Frame Results
                            </h3>

                            <div className=" text-gray-300 text-sm text-right w-full">
                                Live video frame analysis with confidence scoring
                            </div>
                        </div>
                        <motion.div
                            className="relative overflow-hidden rounded-xl"
                            variants={imageVariants}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none"></div>
                            <img
                                src="/features_2/video_results.png"
                                alt="Frame analysis results showing detection confidence scores"
                                className="w-full rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                            />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Audio Results Section */}
                <motion.div
                    variants={itemVariants}
                >
                    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 group">
                        <div className="flex items-center gap-3 pr-4 py-1">
                            <div className="w-2 h-2 bg-[#2530FF] rounded-full animate-pulse"></div>
                            <h3 className=" w-44 font-bold text-xl text-white group-hover:text-[#2530FF] transition-colors duration-300">
                                Audio Results
                            </h3>

                            <div className=" text-gray-300 text-sm text-right w-full">
                                Real-time audio waveform and frequency analysis
                            </div>
                        </div>
                        <motion.div
                            className="relative overflow-hidden rounded-xl"
                            variants={imageVariants}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none"></div>
                            <img
                                src="/features_2/audio_results.png"
                                alt="Audio waveform analysis with frequency distribution"
                                className="w-full rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                            />
                        </motion.div>
                    </div>
                </motion.div>

            </motion.div>
        </div>
    );
};

export default Instant_results;