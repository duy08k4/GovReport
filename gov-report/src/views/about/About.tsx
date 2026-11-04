import React, { useEffect } from "react";
import NoticeTicker from "./components/NoticeTicker";
import AboutHeroSection from "./components/AboutHeroSection";
import MetricCountersSection from "./components/MetricCountersSection";
import WorkflowSection from "./components/WorkflowSection";
import ServiceGridSection from "./components/ServiceGridSection";

const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col w-full pb-6 sm:pb-space-xl">
      <NoticeTicker />
      <AboutHeroSection />
      <MetricCountersSection />
      <WorkflowSection />
      <ServiceGridSection />
    </div>
  );
};

export default AboutPage;