import React from "react";

const AuthFooter: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-lowest py-3 sm:py-space-md border-t border-outline-variant/60 shadow-[0_-1px_6px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-space-sm text-center sm:text-left">
        <div className="flex items-center gap-1.5 sm:gap-space-xs">
          <span className="material-symbols-outlined text-secondary text-[16px]">
            verified_user
          </span>
          <p className="font-label-md text-xs sm:text-label-md text-on-surface-variant">
            © 2026 GovReport. Hệ thống xác thực bảo mật chuẩn Cấp độ 3
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-space-md text-on-surface-variant font-label-md text-xs sm:text-label-md">
          <span>
            <span className="text-outline">Hỗ trợ kỹ thuật:</span>{" "}
            <strong className="font-code-tabular text-primary font-semibold">
              1900 xxxx
            </strong>
          </span>
          <span className="hidden md:inline text-outline-variant">|</span>
          <span className="hidden md:inline text-outline">
            Thời gian vận hành 24/7
          </span>
        </div>
      </div>
    </footer>
  );
};

export default AuthFooter;
