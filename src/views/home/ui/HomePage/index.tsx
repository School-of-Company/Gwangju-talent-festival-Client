"use client";

import dynamic from "next/dynamic";
import IntroFirstSection from "@/widgets/main/IntroFirstSection";
import SloganSecondSection from "@/widgets/main/SloganSecondSection";
import LazySection from "@/shared/ui/LazySection";

const PreliminaryFourthSection = dynamic(() => import("@/widgets/main/PreliminaryFourthSection"), {
  loading: () => <SectionPlaceholder />,
  ssr: false,
});

const ReservationFifthSection = dynamic(() => import("@/widgets/main/ReservationFifthSection"), {
  loading: () => <SectionPlaceholder />,
  ssr: false,
});

const FinalsSixthSection = dynamic(() => import("@/widgets/main/FinalsSixthSection"), {
  loading: () => <SectionPlaceholder />,
  ssr: false,
});

// const SeventhSection = dynamic(() => import("@/widgets/main/SevenSection"), {
//   loading: () => <SectionPlaceholder />,
//   ssr: false,
// });

// const Footer = dynamic(() => import("@/entities/home/ui/Footer"), {
//   loading: () => <SectionPlaceholder />,
//   ssr: false,
// });

const SectionPlaceholder = ({ height = "400px" }: { height?: string }) => (
  <div
    className="w-full bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center"
    style={{ height }}
  >
    <div className="text-center text-gray-400">
      <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center mx-auto mb-3">
        <div className="w-8 h-8 border-t-2 border-gray-400 rounded-full animate-pulse" />
      </div>
    </div>
  </div>
);

const HomePage = () => {
  return (
    <>
      <IntroFirstSection />
      <SloganSecondSection />

      <LazySection fallback={<SectionPlaceholder height="600px" />} rootMargin="100px">
        <PreliminaryFourthSection />
      </LazySection>

      <LazySection fallback={<SectionPlaceholder height="500px" />} rootMargin="150px">
        <ReservationFifthSection />
      </LazySection>

      <LazySection fallback={<SectionPlaceholder height="500px" />} rootMargin="200px">
        <FinalsSixthSection />
      </LazySection>

      {/* <LazySection fallback={<SectionPlaceholder height="500px" />} rootMargin="200px">
        <SeventhSection />
      </LazySection>
      <LazySection fallback={<SectionPlaceholder height="500px" />} rootMargin="200px">
        <Footer />
      </LazySection> */}
    </>
  );
};

export default HomePage;
