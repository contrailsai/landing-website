"use client";
import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, UserCircle, Shield, ExternalLink, Clock, Eye, TrendingUp, Database, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MisinformationGuard: React.FC = () => {
    const [currentCard, setCurrentCard] = useState(0);
    const [analysisStage, setAnalysisStage] = useState<'analyzing' | 'complete' | 'idle'>('idle');
    const [redCount, setRedCount] = useState(3179);
    const [greenCount, setGreenCount] = useState(7342);
    const [progress, setProgress] = useState(0);
    const [currentStage, setCurrentStage] = useState(0);

    const analysisStages = [
        "Scanning content patterns...",
        "Cross-referencing sources...",
        "Analyzing sentiment & context...",
        "Verifying claims..."
    ];

    const analysisResults = [
        {
            isSafe: true,
            confidence: 94,
            flags: [],
            sources: [],
            reasoning: "Content verified against trusted sources. No misleading claims detected."
        },
        {
            isSafe: false,
            confidence: 87,
            flags: ["Unverified claim", "Misleading statistics"],
            sources: [
                { name: "Reuters Fact Check", url: "#", status: "contradicts" },
                { name: "AP News Verification", url: "#", status: "debunked" },
                { name: "Snopes Analysis", url: "#", status: "false" }
            ],
            reasoning: "Multiple fact-checking sources contradict the main claims. Statistics appear manipulated."
        },
        {
            isSafe: true,
            confidence: 96,
            flags: [],
            sources: [
                { name: "Scientific Journal", url: "#", status: "supports" },
                { name: "WHO Guidelines", url: "#", status: "aligns" }
            ],
            reasoning: "Information aligns with peer-reviewed research and official health guidelines."
        },
        {
            isSafe: true,
            confidence: 91,
            flags: [],
            sources: [],
            reasoning: "Content appears authentic. No contradictory evidence found in fact-check databases."
        }
    ];

    useEffect(() => {
        let progressInterval: NodeJS.Timeout;
        let stageInterval: NodeJS.Timeout;
        let completeTimeout: NodeJS.Timeout;

        const startAnalysis = () => {
            setAnalysisStage('analyzing');
            setProgress(0);
            setCurrentStage(0);

            // Stage progression
            stageInterval = setInterval(() => {
                setCurrentStage(prev => (prev + 1) % 4);
            }, 400);

            // Progress animation
            progressInterval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(progressInterval);
                        return 100;
                    }
                    return prev + 1.25;
                });
            }, 20);

            // Complete analysis
            completeTimeout = setTimeout(() => {
                setAnalysisStage('complete');
                clearInterval(stageInterval);
                
                // Update counters
                if (analysisResults[currentCard].isSafe) {
                    setGreenCount(prev => prev + 1);
                } else {
                    setRedCount(prev => prev + 1);
                }

                // Move to next card
                setTimeout(() => {
                    setCurrentCard(prev => (prev + 1) % 4);
                    setAnalysisStage('idle');
                }, 2000);
            }, 1600);
        };

        startAnalysis();
        const mainInterval = setInterval(startAnalysis, 5000);

        return () => {
            clearInterval(progressInterval);
            clearInterval(stageInterval);
            clearInterval(mainInterval);
            clearTimeout(completeTimeout);
        };
    }, [currentCard]);

    const currentResult = analysisResults[currentCard];

    return (
        <div className="w-full max-w-7xl mx-auto sm:p-6">
            {/* Mobile Layout (stacked vertically) */}
            <div className="block lg:hidden space-y-4">
                {/* Stats Dashboard - Top on mobile */}
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 p-4 sm:p-6">
                    <div className="text-center mb-4 sm:mb-6">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">Real-time Protection</h3>
                        <p className="text-xs sm:text-sm text-gray-500">Content moderation statistics</p>
                    </div>

                    <div className="flex justify-center gap-8 sm:gap-12">
                        {/* Safe Content */}
                        <div className="text-center">
                            <div className="relative inline-block mb-3">
                                <motion.div 
                                    className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-300 rounded-full flex items-center justify-center shadow-lg relative z-10"
                                    animate={{ 
                                        boxShadow: (analysisStage === 'complete' && currentResult.isSafe) 
                                            ? "0 0 25px rgba(110, 231, 183, 0.6)" 
                                            : "0 4px 15px rgba(0, 0, 0, 0.1)" 
                                    }}
                                >
                                    <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-800" />
                                </motion.div>
                                
                                <AnimatePresence>
                                    {analysisStage === 'complete' && currentResult.isSafe && (
                                        <motion.div
                                            className="absolute inset-0 bg-emerald-300 rounded-full"
                                            initial={{ scale: 1, opacity: 0.6 }}
                                            animate={{ scale: 1.6, opacity: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                        />
                                    )}
                                </AnimatePresence>
                            </div>

                            <motion.div 
                                className="text-xl sm:text-2xl font-bold text-emerald-600 mb-1"
                                key={`green-${greenCount}`}
                                initial={{ scale: 1.1, color: '#10b981' }}
                                animate={{ scale: 1, color: '#059669' }}
                                transition={{ type: "spring", stiffness: 200 }}
                            >
                                {greenCount.toLocaleString()}
                            </motion.div>
                            <div className="text-xs sm:text-sm text-gray-600 font-medium px-2 sm:px-3 py-1 bg-emerald-50 rounded-full">
                                Safe Content
                            </div>
                        </div>

                        {/* Flagged Content */}
                        <div className="text-center">
                            <div className="relative inline-block mb-3">
                                <motion.div 
                                    className="w-14 h-14 sm:w-16 sm:h-16 bg-rose-300 rounded-full flex items-center justify-center shadow-lg relative z-10"
                                    animate={{ 
                                        boxShadow: (analysisStage === 'complete' && !currentResult.isSafe) 
                                            ? "0 0 25px rgba(251, 113, 133, 0.6)" 
                                            : "0 4px 15px rgba(0, 0, 0, 0.1)" 
                                    }}
                                >
                                    <AlertTriangle className="w-7 h-7 sm:w-8 sm:h-8 text-rose-800" />
                                </motion.div>
                                
                                <AnimatePresence>
                                    {analysisStage === 'complete' && !currentResult.isSafe && (
                                        <motion.div
                                            className="absolute inset-0 bg-rose-300 rounded-full"
                                            initial={{ scale: 1, opacity: 0.6 }}
                                            animate={{ scale: 1.6, opacity: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                        />
                                    )}
                                </AnimatePresence>
                            </div>

                            <motion.div 
                                className="text-xl sm:text-2xl font-bold text-rose-600 mb-1"
                                key={`red-${redCount}`}
                                initial={{ scale: 1.1, color: '#f43f5e' }}
                                animate={{ scale: 1, color: '#e11d48' }}
                                transition={{ type: "spring", stiffness: 200 }}
                            >
                                {redCount.toLocaleString()}
                            </motion.div>
                            <div className="text-xs sm:text-sm text-gray-600 font-medium px-2 sm:px-3 py-1 bg-rose-50 rounded-full">
                                Flagged Content
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Analysis Panel - Bottom on mobile */}
                <div className="space-y-4">
                    <motion.div 
                        className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
                        layout
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        {/* Progress Header */}
                        <div className="p-4 sm:p-6 pb-2">
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#2530FF]" />
                                    <span className="text-sm sm:text-base font-semibold text-gray-800">Content Analysis</span>
                                </div>
                                <span className="text-xs sm:text-sm text-gray-500">#{String(currentCard + 1).padStart(4, 'X')}</span>
                            </div>
                            
                            {/* Progress line */}
                            <div className="w-full h-0.5 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-[#2530FF] rounded-full"
                                    style={{ width: `${progress}%` }}
                                    transition={{ ease: "linear" }}
                                />
                            </div>
                        </div>

                        {/* Content Preview */}
                        <div className="px-4 sm:px-6 pb-4">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentCard}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 relative"
                                >
                                    {/* Post skeleton */}
                                    <div className="flex items-start gap-2 sm:gap-3 mb-3">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                            <UserCircle className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 sm:h-2.5 bg-gray-300 rounded-full w-16 sm:w-20"></div>
                                                <div className="h-2 sm:h-2.5 bg-gray-200 rounded-full w-10 sm:w-12"></div>
                                            </div>
                                            <div className="space-y-1.5 sm:space-y-2">
                                                <div className="h-1.5 sm:h-2 bg-gray-300 rounded-full w-full"></div>
                                                <div className="h-1.5 sm:h-2 bg-gray-300 rounded-full w-3/4"></div>
                                                <div className="h-1.5 sm:h-2 bg-gray-200 rounded-full w-1/2"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Analysis overlay */}
                                    {analysisStage === 'analyzing' && (
                                        <motion.div 
                                            className="absolute inset-0 bg-[#2530FF]/5 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <div className="text-center">
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                    className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-[#2530FF] border-t-transparent rounded-full mx-auto mb-2"
                                                />
                                                <motion.p 
                                                    key={currentStage}
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-[#2530FF] text-xs sm:text-sm font-medium"
                                                >
                                                    {analysisStages[currentStage]}
                                                </motion.p>
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* Analysis Results */}
                    <AnimatePresence>
                        {analysisStage === 'complete' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginTop: 0 }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
                            >
                                <div className="p-4 sm:p-6">
                                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                                        <h3 className="text-sm sm:text-base font-semibold text-gray-800">Analysis Results</h3>
                                        <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                                            currentResult.isSafe 
                                                ? 'bg-emerald-100 text-emerald-700' 
                                                : 'bg-rose-100 text-rose-700'
                                        }`}>
                                            {currentResult.confidence}% confidence
                                        </div>
                                    </div>

                                    {/* Reasoning */}
                                    <div className="mb-3 sm:mb-4">
                                        <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                                            {currentResult.reasoning}
                                        </p>
                                    </div>

                                    {/* Flags (if any) */}
                                    {currentResult.flags.length > 0 && (
                                        <div className="mb-3 sm:mb-4">
                                            <h4 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Issues Detected:</h4>
                                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                                {currentResult.flags.map((flag, idx) => (
                                                    <span key={idx} className="px-2 py-1 bg-rose-100 text-rose-700 text-xs rounded-full">
                                                        {flag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Sources */}
                                    {currentResult.sources.length > 0 && (
                                        <div>
                                            <h4 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Verification Sources:</h4>
                                            <div className="space-y-2">
                                                {currentResult.sources.map((source, idx) => (
                                                    <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                                                        <div className="flex items-center gap-2">
                                                            <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                                                            <span className="text-xs text-gray-700">{source.name}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1 sm:gap-2">
                                                            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                                                                source.status === 'contradicts' || source.status === 'debunked' || source.status === 'false'
                                                                    ? 'bg-rose-100 text-rose-600'
                                                                    : 'bg-emerald-100 text-emerald-600'
                                                            }`}>
                                                                {source.status}
                                                            </span>
                                                            <ExternalLink className="w-3 h-3 text-gray-400" />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Desktop Layout (side by side) */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-6 items-start">
                
                {/* Content Analysis Panel - Left Side */}
                <div className="col-span-7 space-y-4">
                    {/* Main Content Card */}
                    <motion.div 
                        className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
                        layout
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        {/* Progress Header */}
                        <div className="p-6 pb-2">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <Shield className="w-5 h-5 text-[#2530FF]" />
                                    <span className="font-semibold text-gray-800">Content Analysis</span>
                                </div>
                                <span className="text-sm text-gray-500">#{String(currentCard + 1).padStart(4, 'X')}</span>
                            </div>
                            
                            {/* Ultra-thin progress line */}
                            <div className="w-full h-0.5 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-[#2530FF] rounded-full"
                                    style={{ width: `${progress}%` }}
                                    transition={{ ease: "linear" }}
                                />
                            </div>
                        </div>

                        {/* Content Preview */}
                        <div className="px-6 pb-4">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentCard}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-gray-50 rounded-2xl p-4 relative"
                                >
                                    {/* Post skeleton */}
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                            <UserCircle className="w-6 h-6 text-gray-500" />
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2.5 bg-gray-300 rounded-full w-20"></div>
                                                <div className="h-2.5 bg-gray-200 rounded-full w-12"></div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-2 bg-gray-300 rounded-full w-full"></div>
                                                <div className="h-2 bg-gray-300 rounded-full w-3/4"></div>
                                                <div className="h-2 bg-gray-200 rounded-full w-1/2"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Analysis overlay */}
                                    {analysisStage === 'analyzing' && (
                                        <motion.div 
                                            className="absolute inset-0 bg-[#2530FF]/5 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <div className="text-center">
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                    className="w-8 h-8 border-2 border-[#2530FF] border-t-transparent rounded-full mx-auto mb-2"
                                                />
                                                <motion.p 
                                                    key={currentStage}
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-[#2530FF] text-sm font-medium"
                                                >
                                                    {analysisStages[currentStage]}
                                                </motion.p>
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* Analysis Results */}
                    <AnimatePresence>
                        {analysisStage === 'complete' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-semibold text-gray-800">Analysis Results</h3>
                                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            currentResult.isSafe 
                                                ? 'bg-emerald-100 text-emerald-700' 
                                                : 'bg-rose-100 text-rose-700'
                                        }`}>
                                            {currentResult.confidence}% confidence
                                        </div>
                                    </div>

                                    {/* Reasoning */}
                                    <div className="mb-2">
                                        <p className="text-gray-700 text-sm leading-relaxed">
                                            {currentResult.reasoning}
                                        </p>
                                    </div>

                                    {/* Flags (if any) */}
                                    {currentResult.flags.length > 0 && (
                                        <div className="mb-4">
                                            <h4 className="text-sm font-medium text-gray-600 mb-2">Issues Detected:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {currentResult.flags.map((flag, idx) => (
                                                    <span key={idx} className="px-1 py-0.5 bg-rose-100 text-rose-700 text-xs rounded-full">
                                                        {flag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Sources */}
                                    {currentResult.sources.length > 0 && (
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-600 mb-2">Verification Sources:</h4>
                                            <div className="space-y-2">
                                                {currentResult.sources.map((source, idx) => (
                                                    <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-xl">
                                                        <div className="flex items-center gap-2">
                                                            <Globe className="w-4 h-4 text-gray-400" />
                                                            <span className="text-xs text-gray-700">{source.name}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className={`text-xs px-1 py-0.5 rounded-full ${
                                                                source.status === 'contradicts' || source.status === 'debunked' || source.status === 'false'
                                                                    ? 'bg-rose-100 text-rose-600'
                                                                    : 'bg-emerald-100 text-emerald-600'
                                                            }`}>
                                                                {source.status}
                                                            </span>
                                                            <ExternalLink className="w-3 h-3 text-gray-400" />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Stats Dashboard - Right Side */}
                <div className="col-span-5">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                        <div className="text-center mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">Real-time Protection</h3>
                            <p className="text-sm text-gray-500">Content moderation statistics</p>
                        </div>

                        <div className="space-y-8">
                            {/* Safe Content */}
                            <div className="text-center">
                                <div className="relative inline-block mb-4">
                                    <motion.div 
                                        className="w-20 h-20 bg-emerald-300 rounded-full flex items-center justify-center shadow-lg relative z-10"
                                        animate={{ 
                                            boxShadow: (analysisStage === 'complete' && currentResult.isSafe) 
                                                ? "0 0 30px rgba(110, 231, 183, 0.6)" 
                                                : "0 4px 15px rgba(0, 0, 0, 0.1)" 
                                        }}
                                    >
                                        <CheckCircle className="w-10 h-10 text-emerald-800" />
                                    </motion.div>
                                    
                                    <AnimatePresence>
                                        {analysisStage === 'complete' && currentResult.isSafe && (
                                            <motion.div
                                                className="absolute inset-0 bg-emerald-300 rounded-full"
                                                initial={{ scale: 1, opacity: 0.6 }}
                                                animate={{ scale: 1.8, opacity: 0 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                            />
                                        )}
                                    </AnimatePresence>
                                </div>

                                <motion.div 
                                    className="text-3xl font-bold text-emerald-600 mb-1"
                                    key={`green-${greenCount}`}
                                    initial={{ scale: 1.1, color: '#10b981' }}
                                    animate={{ scale: 1, color: '#059669' }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                >
                                    {greenCount.toLocaleString()}
                                </motion.div>
                                <div className="text-sm text-gray-600 font-medium px-4 py-2 bg-emerald-50 rounded-full inline-block">
                                    Safe Content
                                </div>
                            </div>

                            {/* Flagged Content */}
                            <div className="text-center">
                                <div className="relative inline-block mb-4">
                                    <motion.div 
                                        className="w-20 h-20 bg-rose-300 rounded-full flex items-center justify-center shadow-lg relative z-10"
                                        animate={{ 
                                            boxShadow: (analysisStage === 'complete' && !currentResult.isSafe) 
                                                ? "0 0 30px rgba(251, 113, 133, 0.6)" 
                                                : "0 4px 15px rgba(0, 0, 0, 0.1)" 
                                        }}
                                    >
                                        <AlertTriangle className="w-10 h-10 text-rose-800" />
                                    </motion.div>
                                    
                                    <AnimatePresence>
                                        {analysisStage === 'complete' && !currentResult.isSafe && (
                                            <motion.div
                                                className="absolute inset-0 bg-rose-300 rounded-full"
                                                initial={{ scale: 1, opacity: 0.6 }}
                                                animate={{ scale: 1.8, opacity: 0 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                            />
                                        )}
                                    </AnimatePresence>
                                </div>

                                <motion.div 
                                    className="text-3xl font-bold text-rose-600 mb-1"
                                    key={`red-${redCount}`}
                                    initial={{ scale: 1.1, color: '#f43f5e' }}
                                    animate={{ scale: 1, color: '#e11d48' }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                >
                                    {redCount.toLocaleString()}
                                </motion.div>
                                <div className="text-sm text-gray-600 font-medium px-4 py-2 bg-rose-50 rounded-full inline-block">
                                    Flagged Content
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MisinformationGuard;