import Image from 'next/image';
export default function Deepfake_Detection_Media() {
    return (
        <div className=" flex flex-col md:flex-row md:items-center justify-center md:justify-start gap-5 p-10 my-16 w-full h-full lg:max-w-3xl">

            <Image
                src="/features/face_scan.gif"
                alt="Deepfake Detection Animation"
                className=" w-full max-w-72 min-w-32 md:w-64 aspect-auto rounded-2xl shadow-lg relative md:-top-20 "
                width={256}
                height={256}
            />

            <div className=" w-full max-w-72 min-w-32 md:w-64 aspect-auto relative md:top-20 rounded-3xl shadow-lg bg-slate-100 overflow-hidden">
                <div className="absolute bg-gradient-to-r from-white/10 via-transparent to-white/10 h-full w-full "/>
                <div className="absolute bg-gradient-to-b from-primary/50 via-transparent to-white h-full w-full "/>
                <Image
                    src="/features/audio_waveform.gif"
                    alt="Deepfake Detection Animation"
                    className="w-full max-w-lg  "
                    width={256}
                    height={256}
                />
            </div>

        </div>
    );
}