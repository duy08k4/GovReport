import { isDesktopApp } from "../utils/platform";

/**
 * Cấu hình đường dẫn (Routing Configuration) toàn hệ thống GovReport.
 * Quản lý tập trung tất cả URL path để dễ dàng tái sử dụng và chỉnh sửa sau này.
 */
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  DOWNLOAD: "/download",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  // Main system routes (authenticated)
  MAIN: "/main",
  OVERVIEW: "/main",
  AGENCIES: "/main/agencies",
  GIS_BOUNDARIES: "/main/gis-boundaries",
  SLA: "/main/sla",
  ACCOUNTS: "/main/accounts",
  INCIDENTS: "/main/incidents",
  AUDIT_LOGS: "/main/audit-logs",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];

/**
 * Đường dẫn mặc định (Root path) theo từng nền tảng:
 * - Desktop App (Tauri): Root là "/login"
 * - Web Browser: Root là "/" (Home)
 */
export const getDefaultRoute = (): string => {
  return isDesktopApp() ? ROUTES.LOGIN : ROUTES.HOME;
};

export default ROUTES;
