import React, { useEffect } from "react";
import HeroSection from "./components/HeroSection";
import ComparisonSection from "./components/ComparisonSection";
import ArchitectureSection from "./components/ArchitectureSection";
import SecuritySection from "./components/SecuritySection";

const HomePage: React.FC = () => {
  useEffect(() => {
    // Functional minimalism status pulse check
    const logState = {
      status: "OPERATIONAL",
      crs: "EPSG:4326",
      timestamp: new Date().toISOString(),
    };
    console.info("[GovReport Architecture Initialized]", logState);
  }, []);

  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <ComparisonSection />
      <ArchitectureSection />
      <SecuritySection />
    </div>
  );
};

export default HomePage;