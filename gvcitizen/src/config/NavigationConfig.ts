// Config
import { ROUTES } from "./Routing"

/**
 * Cấu hình hệ thống điều hướng chính (Bottom Navigation & Tabs) cho Citizen App.
 * Quản lý 4 tab tác vụ chính và đường dẫn liên kết.
 */

export type CitizenNavTab = "home" | "map" | "reports" | "profile"

export interface CitizenNavItem {
    key: CitizenNavTab
    label: string
    icon: string
    dataPath: string
    route: string
}

export const CITIZEN_NAV_ITEMS: CitizenNavItem[] = [
    {
        key: "home",
        label: "Trang chủ",
        icon: "home",
        dataPath: "trang-chu-&-bao-cao-nhanh",
        route: ROUTES.HOME,
    },
    {
        key: "map",
        label: "Bản đồ",
        icon: "map",
        dataPath: "ban-do-canh-bao-do-thi",
        route: ROUTES.MAP,
    },
    {
        key: "reports",
        label: "Phản ánh",
        icon: "description",
        dataPath: "quan-ly-phan-anh-&-tra-cuu-ticket",
        route: ROUTES.REPORTS,
    },
    {
        key: "profile",
        label: "Cá nhân",
        icon: "person",
        dataPath: "ho-so-cong-dan-&-cai-dat",
        route: ROUTES.PROFILE,
    },
]

export const getAutoCitizenTabFromPath = (pathname: string): CitizenNavTab => {
    if (pathname.includes("/map")) return "map"
    if (pathname.includes("/reports")) return "reports"
    if (pathname.includes("/profile")) return "profile"
    return "home"
}

export default CITIZEN_NAV_ITEMS

