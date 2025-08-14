import { WavyBackground } from "@/components/wavy-background"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar";

export default function Privacy_policy() {
    return (
        <div className="relative min-h-screen">
            {/* Wavy Background */}
            <div className="absolute inset-0 z-0">
                <WavyBackground
                    className=" z-0"
                    colors={["#0253E4", "#0253E4", "#ffffff", "#ffffff"]}
                    backgroundFill="transparent"
                    blur={10}
                />
            </div>

            <Navbar top_animation={false} />

            <div className="z-20 relative bg-gradient-to-b from-transparent to-white backdrop-blur-sm h-56">
                <h1 className="text-8xl font-semibold h-full px-20 flex justify-between items-center w-fit">Privacy Policy</h1>
            </div>

            <div className="px-20 min-h-screen">
                Have all the privacy u want bro
            </div>

            <Footer />
        </div>
    )
}