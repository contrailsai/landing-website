"use client";
import Navbar from "@/components/Navbar";
import Top_navbar_title from "@/components/Top_navbar_title";
import HeroPage from "@/components/sections/Hero_page";
import Services_section from "@/components/sections/Services_section";
import FeaturesSectionDemo from "@/components/sections/FeaturesSectionDemo";
import How_It_Works from "@/components/sections/How_it_Works";
import Trusted_By from "@/components/sections/Trusted_by";
import CTA_Section from "@/components/sections/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="">
      <Top_navbar_title />
      <Navbar top_animation={true} />

      {/* HERO PAGE */}
      <HeroPage />

      {/* Curved Divider */}
      <div className=" relative">
        <div className=" h-20 md:h-24 ">
          <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="h-48 w-full relative md:-top-20 -top-28">
            <path
              d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
              className="fill-secondary"
            ></path>
          </svg>
        </div>
      </div>

      {/* <div className=" h-0 relative  ">
        <div className="relative h-32 md:h-20 -top-32 md:-top-20 w-full bg-secondary"/>
      </div> */}


      <Services_section />

      <FeaturesSectionDemo />

      <How_It_Works />

      {/* Trusted By Section */}
      <Trusted_By />

      {/* CTA Section */}
      <CTA_Section />

      {/* FOOTER */}
      <Footer />

    </div>
  );
}
