import React from "react";
import { Outlet } from "react-router-dom";
import AuthHeader from "./components/AuthHeader";
import AuthFooter from "./components/AuthFooter";

const AuthLayout: React.FC = () => {
  return (
    <div className="bg-surface font-body-md text-on-surface flex flex-col min-h-screen">
      <AuthHeader />

      <main className="flex-1 w-full pt-20 pb-10 bg-surface flex flex-col justify-center items-center px-4 relative overflow-hidden">
        {/* Dynamic Map Grid Pattern Backdrop */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035] [background-image:linear-gradient(to_right,#00152a_1px,transparent_1px),linear-gradient(to_bottom,#00152a_1px,transparent_1px)] [background-size:32px_32px]" />

        {/* Dynamic Nested View (Login / Register / ForgotPassword) */}
        <Outlet />

        {/* Operational Status Bar Footer Component */}
        <div className="mt-6 text-center z-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-outline font-label-md text-xs sm:text-label-md">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[15px] text-on-tertiary-container">
              hub
            </span>
            <span>
              Trung tâm Điều phối:{" "}
              <strong className="text-on-surface font-semibold">
                Trực tuyến (99.98%)
              </strong>
            </span>
          </span>
          <span className="opacity-40 hidden xs:inline">•</span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[15px] text-secondary">
              explore
            </span>
            <span>
              Hệ quy chiếu:{" "}
              <strong className="text-on-surface font-semibold font-code-tabular">
                VN-2000 / WGS84
              </strong>
            </span>
          </span>
        </div>
      </main>

      <AuthFooter />
    </div>
  );
};

export default AuthLayout;
