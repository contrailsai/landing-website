"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const Recognitions = () => {
    const recognitionData = [
        {
            id: 1,
            imageUrl: "/conferences_logos/trustcon.png",
            background_color: "#FFF",
            title: "-",
            description: "-"
        },
        {
            id: 2,
            imageUrl: "/conferences_logos/marketplace-risk.jpg",
            background_color: "#e64e42",
            title: "-",
            description: "-"
        },
        {
            id: 3,
            imageUrl: "/conferences_logos/ai-risk-summit.png",
            background_color: "#1b1731",
            title: "-",
            description: "-"
        },
        {
            id: 4,
            imageUrl: "/conferences_logos/RSAC_conference.png",
            background_color: "#FFF",
            title: "-",
            description: "-"
        },
        {
            id: 5,
            imageUrl: "/conferences_logos/FOSI-logo.png",
            background_color: "#FFF",
            title: "-",
            description: "-"
        }
        
    ]

    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [50, -50])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])

    return (
        <div ref={containerRef} className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20">

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-8 tracking-tight leading-tight">
                        Recognized Excellence in
                        <span className="block bg-gradient-to-r from-primary/60 to-primary bg-clip-text text-transparent">
                            Digital Safety
                        </span>
                    </h2>

                    <motion.p
                        className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Our commitment to a safer digital world is recognized on the global stage.
                        We set the industry benchmark for digital safety with our pioneering
                        <span className="font-semibold text-slate-700"> multimodal detection systems</span>,
                        validated for their exceptional accuracy.
                    </motion.p>
                </motion.div>

                {/* Recognition Cards */}
                <motion.div
                    style={{ y, opacity }}
                    className="relative"
                >
                    <div className="flex flex-wrap gap-8 items-center justify-center max-w-6xl mx-auto">
                        {recognitionData.map((recognition, index) => (
                            <motion.div
                                key={recognition.id}
                                className="group relative w-full max-w-[280px]"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <div className="relative w-full max-w-[280px] mx-auto aspect-video overflow-hidden rounded-2xl shadow-md bg-white border border-slate-200/50">
                                    <div className="relative grayscale-100 w-full h-full p-4 flex items-center justify-center" style={{backgroundColor: recognition.background_color}}>
                                        <Image
                                            src={recognition.imageUrl}
                                            fill
                                            alt={recognition.title}
                                            className="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                </div>

                                {/* Card info overlay */}
                                {/* <div className="absolute inset-x-0 -bottom-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3 mx-2">
                                        <h3 className="text-sm font-semibold text-slate-800">{recognition.title}</h3>
                                        <p className="text-xs text-slate-600 mt-1">{recognition.description}</p>
                                    </div>
                                </div> */}

                                {/* Card reflection */}
                                <div className="absolute -bottom-8 left-0 right-0 h-8 bg-gradient-to-t from-slate-200/30 to-transparent rounded-2xl blur-sm opacity-50"></div>
                            </motion.div>
                        ))}
                    </div>

                </motion.div>
            </div>
        </div>
    )
}

export default Recognitions;