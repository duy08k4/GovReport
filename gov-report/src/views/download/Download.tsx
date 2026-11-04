import React, { useEffect } from "react";
import DownloadBreadcrumb from "./components/DownloadBreadcrumb";
import DownloadHeroSection from "./components/DownloadHeroSection";
import DualViewSection from "./components/DualViewSection";
import DirectChannelsSection from "./components/DirectChannelsSection";
import HardwareRequirementsSection from "./components/HardwareRequirementsSection";
import MdmSupportBanner from "./components/MdmSupportBanner";

const DownloadPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col w-full pb-6 sm:pb-space-xl">
      <DownloadBreadcrumb />
      <DownloadHeroSection />
      <DualViewSection />
      <DirectChannelsSection />
      <HardwareRequirementsSection />
      <MdmSupportBanner />
    </div>
  );
};

export default DownloadPage;
