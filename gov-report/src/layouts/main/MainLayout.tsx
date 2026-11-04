import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainHeader from "./components/MainHeader";

const MainLayout: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col">
      {/* Mobile Drawer Overlay Backdrop */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 bg-primary/60 backdrop-blur-xs z-40 md:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Persistent Left Sidebar */}
      <Sidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Content wrapper with responsive desktop margin */}
      <div className="md:pl-64 flex flex-col min-h-screen w-full transition-all duration-200">
        {/* Persistent Top Navigation Bar */}
        <MainHeader
          onToggleSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
        />

        {/* Dynamic Nested Route Content */}
        <main className="relative w-full min-h-screen bg-surface-container-low px-3 sm:px-space-md lg:px-space-lg pt-[80px] sm:pt-[88px] pb-space-md sm:pb-space-lg flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
