/**
 * Cấu hình đường dẫn (Routing Configuration) toàn hệ thống GovReport Citizen.
 * Quản lý tập trung tất cả URL path cho ứng dụng di động công dân.
 */
export const ROUTES = {
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
    VNEID_AUTH: "/vneid-auth",
    ANONYMOUS_REPORT: "/report/anonymous",
    MAIN: "/main",
    HOME: "/home",
    FEED: "/home",
    MAP: "/map",
    REPORT_NEW: "/report/new",
    REPORTS: "/reports",
    REPORT_DETAIL: "/reports/:id",
    NOTIFICATIONS: "/notifications",
    PROFILE: "/profile",
} as const

export type RouteKey = keyof typeof ROUTES
export type RoutePath = (typeof ROUTES)[RouteKey]

export const DEFAULT_ROUTE = ROUTES.LOGIN

export default ROUTES

