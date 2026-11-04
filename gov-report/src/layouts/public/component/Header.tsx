import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ROUTES } from "../../../config/Routing";

// Image
import GovReportLogo from "../../../assets/govReport.png";

const Header: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-surface-container-lowest border-b border-outline-variant h-[64px] sm:h-[72px]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
                {/* Brand / Logo */}
                <Link to={ROUTES.HOME} className="flex items-center gap-space-xs sm:gap-space-sm group shrink-0">
                    <img
                        alt="Logo GovReport"
                        className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-105"
                        src={GovReportLogo}
                    />
                    <div className="flex flex-col">
                        <span className="font-headline-sm text-base sm:text-headline-sm text-primary-container leading-none font-bold">
                            GovReport
                        </span>
                        <span className="hidden sm:block font-label-sm text-[11px] sm:text-label-sm text-on-surface-variant mt-0.5 tracking-tight truncate max-w-[200px] md:max-w-none">
                            Hệ thống Phản ánh &amp; Điều phối Hạ tầng Đô thị
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-space-md lg:gap-space-lg h-full">
                    <NavLink
                        to={ROUTES.HOME}
                        end
                        className={({ isActive }) =>
                            `h-full flex items-center px-space-xs font-label-lg text-label-lg transition-colors ${
                                isActive
                                    ? "text-secondary border-b-2 border-secondary font-semibold"
                                    : "text-on-surface-variant hover:text-on-surface"
                            }`
                        }
                    >
                        Trang chủ
                    </NavLink>
                    <NavLink
                        to={ROUTES.ABOUT}
                        className={({ isActive }) =>
                            `h-full flex items-center px-space-xs font-label-lg text-label-lg transition-colors ${
                                isActive
                                    ? "text-secondary border-b-2 border-secondary font-semibold"
                                    : "text-on-surface-variant hover:text-on-surface"
                            }`
                        }
                    >
                        Về chúng tôi
                    </NavLink>
                    <NavLink
                        to={ROUTES.DOWNLOAD}
                        className={({ isActive }) =>
                            `h-full flex items-center px-space-xs font-label-lg text-label-lg transition-colors ${
                                isActive
                                    ? "text-secondary border-b-2 border-secondary font-semibold"
                                    : "text-on-surface-variant hover:text-on-surface"
                            }`
                        }
                    >
                        Tải xuống
                    </NavLink>
                </nav>

                {/* Right Actions & Mobile Hamburger */}
                <div className="flex items-center gap-2 sm:gap-space-md">
                    <Link
                        to={ROUTES.LOGIN}
                        className="inline-flex items-center gap-1 sm:gap-space-xs bg-primary-container text-on-primary rounded-lg px-3 sm:px-5 py-1.5 sm:py-2.5 font-label-lg text-xs sm:text-label-lg hover:bg-primary transition-colors cursor-pointer"
                    >
                        <span className="material-symbols-outlined text-[16px] sm:text-[18px]">key</span>
                        <span className="hidden xs:inline sm:inline">Truy cập hệ thống</span>
                        <span className="xs:hidden sm:hidden">Đăng nhập</span>
                    </Link>

                    <div
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary flex items-center justify-center text-on-primary"
                        title="Tài khoản"
                    >
                        <span className="material-symbols-outlined text-[16px] sm:text-[18px]">person</span>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors ml-1"
                        aria-label="Toggle navigation menu"
                    >
                        <span className="material-symbols-outlined text-[22px]">
                            {mobileMenuOpen ? "close" : "menu"}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Drawer Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-surface-container-lowest border-b border-outline-variant shadow-lg px-4 py-3 flex flex-col gap-1 animate-fadeIn">
                    <NavLink
                        to={ROUTES.HOME}
                        end
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                            `px-3 py-2.5 rounded-lg font-label-lg text-sm transition-colors ${
                                isActive
                                    ? "bg-secondary-container/40 text-secondary font-semibold"
                                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                            }`
                        }
                    >
                        Trang chủ
                    </NavLink>
                    <NavLink
                        to={ROUTES.ABOUT}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                            `px-3 py-2.5 rounded-lg font-label-lg text-sm transition-colors ${
                                isActive
                                    ? "bg-secondary-container/40 text-secondary font-semibold"
                                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                            }`
                        }
                    >
                        Về chúng tôi
                    </NavLink>
                    <NavLink
                        to={ROUTES.DOWNLOAD}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                            `px-3 py-2.5 rounded-lg font-label-lg text-sm transition-colors ${
                                isActive
                                    ? "bg-secondary-container/40 text-secondary font-semibold"
                                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                            }`
                        }
                    >
                        Tải xuống
                    </NavLink>
                </div>
            )}
        </header>
    );
};

export default Header;
