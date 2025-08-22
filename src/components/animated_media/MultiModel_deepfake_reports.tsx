import { ImageIcon, AudioLines, ClapperboardIcon } from "lucide-react"
import Image from "next/image";

const Multimodal_deepfake_report = () => {
    return (
        <div className=" h-[50vh] sm:h-full flex flex-col items-center mt-8">
            <div className="flex w-full justify-center items-end">
                {/* LEFT */}
                <div className="flex flex-col items-center">
                    <div className="bg-primary h-20 w-20 rounded-3xl p-3">
                        <ImageIcon className="h-full w-full stroke-white" />
                    </div>
                    <div className="w-0.5 h-10 bg-primary" />
                    <div className=" w-full h-10">
                        <div className=" w-[52%] h-[47%] relative left-[48%] border-b-3 border-l-3 border-primary rounded-bl-3xl" />
                    </div>
                </div>

                <div className="h-6 w-32 border-t-3 border-primary" />

                {/* CENTER */}
                <div className=" flex flex-col items-center">
                    <div className="bg-primary h-20 w-20 rounded-3xl p-3">
                        <AudioLines className="h-full w-full stroke-white" />
                    </div>
                    <div className="w-0.5 h-10 bg-primary" />

                    <div className=" w-full h-10 relative">
                        <div className=" w-[2%] h-[40%] relative left-[48%] border-l-3 border-primary " />
                        <div className="  w-full h-[2%] left-0 border-b-3 border-primary " />

                        <div className=" w-[2%] h-full relative left-[48%] border-l-3 border-primary " />
                    </div>
                </div>

                <div className="h-6 w-32 border-t-3 border-primary" />

                {/* RIGHT */}
                <div className=" flex flex-col items-center">
                    <div className="bg-primary h-20 w-20 rounded-3xl p-3">
                        <ClapperboardIcon className="h-full w-full stroke-white" />
                    </div>
                    <div className="w-0.5 h-10 bg-primary" />
                    <div className=" w-full h-10">
                        <div className=" w-[51%] h-[47%] relative border-b-3 border-r-3 border-primary rounded-br-3xl overflow-hidden" />
                    </div>
                </div>
            </div>

            <div className="h-3/5 w-[72%] rounded-3xl p-2 relative overflow-hidden bg-primary">
                <div className="h-full w-full rounded-2xl overflow-hidden">
                    <div className="relative h-full w-full">
                        <Image src={"/features_2/report.png"} fill alt="report" className=" object-contain" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Multimodal_deepfake_report;