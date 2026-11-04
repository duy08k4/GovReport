import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../config/Routing";
import GovReportLogo from "../../../assets/govReport.png";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  name: string;
  path: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    name: "Tổng quan hệ thống",
    path: ROUTES.OVERVIEW,
    icon: "space_dashboard",
  },
  {
    name: "Quản lý cơ quan",
    path: ROUTES.AGENCIES,
    icon: "corporate_fare",
  },
  {
    name: "Ranh giới GIS",
    path: ROUTES.GIS_BOUNDARIES,
    icon: "map",
  },
  {
    name: "Danh mục & SLA",
    path: ROUTES.SLA,
    icon: "category",
  },
  {
    name: "Tài khoản & Phân công",
    path: ROUTES.ACCOUNTS,
    icon: "manage_accounts",
  },
  {
    name: "Giám sát sự cố",
    path: ROUTES.INCIDENTS,
    icon: "warning",
  },
  {
    name: "Nhật ký kiểm toán",
    path: ROUTES.AUDIT_LOGS,
    icon: "history_edu",
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen w-64 bg-primary-container z-50 flex flex-col justify-between border-r border-outline/20 transition-transform duration-200 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="px-space-md py-space-lg border-b border-outline/20 flex flex-col gap-space-xs">
          <div className="flex items-center justify-between">
            <Link
              to={ROUTES.MAIN}
              onClick={onClose}
              className="flex items-center gap-space-sm group"
            >
              <div className="w-9 h-9 rounded-lg bg-surface-container-lowest/10 p-1 flex items-center justify-center shrink-0 border border-outline/20 group-hover:border-secondary transition-colors">
                <img
                  src={GovReportLogo}
                  alt="GovReport"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-headline-sm text-headline-sm text-surface tracking-tight truncate font-bold">
                  GovReport
                </span>
                <span className="font-label-sm text-label-sm text-secondary-fixed tracking-wider uppercase truncate">
                  Hạ Tầng Đô Thị
                </span>
              </div>
            </Link>

            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded text-on-primary-container hover:text-surface hover:bg-surface/10 md:hidden transition-colors"
              aria-label="Đóng bảng điều hướng"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="mt-space-xs inline-flex items-center px-space-xs py-0.5 rounded bg-surface/10 border border-secondary/40 text-secondary-fixed font-label-sm text-label-sm leading-tight truncate self-start">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed mr-1 shrink-0 animate-pulse" />
            QUẢN TRỊ TỐI CAO
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col py-space-sm px-space-xs space-y-1 overflow-y-auto max-h-[calc(100vh-220px)]">
          {NAV_ITEMS.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path === ROUTES.OVERVIEW &&
                (location.pathname === "/main" ||
                  location.pathname === "/main/" ||
                  location.pathname === "/main/overview"));

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={onClose}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-space-sm px-space-md py-2.5 rounded transition-colors ${
                  isActive
                    ? "bg-secondary/20 text-secondary-fixed border-l-2 border-secondary font-label-lg"
                    : "text-on-primary-container font-label-lg text-label-lg hover:bg-surface/5 hover:text-surface transition-colors border-l-2 border-transparent"
                }`}
              >
                <span className="material-symbols-outlined text-[20px] shrink-0">
                  {item.icon}
                </span>
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / System Version & Logout */}
      <div className="p-space-md border-t border-outline/20 flex flex-col gap-space-xs bg-primary-container/80 backdrop-blur-sm">
        <div className="flex items-center justify-between text-on-primary-container font-code-tabular text-code-tabular">
          <span className="truncate">v2.6-GIS Production</span>
          <span className="w-2 h-2 rounded-full bg-tertiary-fixed shrink-0" />
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-space-xs w-full py-2 px-space-sm rounded bg-surface/5 hover:bg-error/20 text-on-primary-container hover:text-error transition-colors font-label-sm text-label-sm border border-outline/20"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">logout</span>
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
