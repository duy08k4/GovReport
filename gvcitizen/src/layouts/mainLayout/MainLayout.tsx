import type React from "react"
import { Outlet, useLocation } from "react-router-dom"
import { IonPage, IonContent, useIonRouter } from "@ionic/react"

// Config
import { ROUTES } from "../../config/Routing"
import { CITIZEN_NAV_ITEMS, getAutoCitizenTabFromPath } from "../../config/NavigationConfig"
import type { CitizenNavTab } from "../../config/NavigationConfig"

interface MainLayoutProps {
    children?: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = () => {
    const router = useIonRouter()
    const location = useLocation()

    const activeTab = getAutoCitizenTabFromPath(location.pathname)

    const handleTabClick = (tabKey: CitizenNavTab) => {
        switch (tabKey) {
            case "home":
                router.push(ROUTES.HOME, "root", "replace")
                break
            case "map":
                router.push(ROUTES.MAP, "forward", "push")
                break
            case "reports":
                router.push(ROUTES.REPORTS, "forward", "push")
                break
            case "profile":
                router.push(ROUTES.PROFILE, "forward", "push")
                break
        }
    }

    const handleNotificationClick = () => {
        router.push(ROUTES.NOTIFICATIONS, "forward", "push")
    }

    const handleProfileClick = () => {
        router.push(ROUTES.PROFILE, "forward", "push")
    }

    return (
        <IonPage className="bg-surface font-body-md text-on-surface">
            {/* 1. Fixed Header chuẩn Safe Area */}
            <header className="fixed top-0 w-full z-50 pt-safe bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/20">
                <div className="h-14 !px-margin flex items-center justify-between max-w-md mx-auto">
                    {/* Location Badge */}
                    <div className="flex items-center !gap-space-xs">
                        <span className="material-symbols-outlined text-secondary text-[20px]">location_on</span>
                        <div className="flex flex-col text-left">
                            <span className="font-label-sm text-label-sm text-on-surface-variant leading-none">
                                Vị trí hiện tại
                            </span>
                            <span className="font-label-md text-label-md text-on-surface font-semibold tracking-tight">
                                P. Hàng Trống, Hoàn Kiếm
                            </span>
                        </div>
                    </div>

                    {/* Quick Access Icons */}
                    <div className="flex items-center !gap-space-sm">
                        <button
                            type="button"
                            aria-label="Trung tâm thông báo đô thị"
                            className="relative w-11 h-11 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer bg-transparent border-none p-0"
                            data-path="trung-tam-thong-bao-do-thi"
                            onClick={handleNotificationClick}
                        >
                            <span className="material-symbols-outlined text-[22px]">notifications</span>
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 !rounded-full bg-secondary ring-2 ring-surface"></span>
                        </button>

                        <button
                            type="button"
                            aria-label="Hồ sơ công dân"
                            className="w-8 h-8 !rounded-full bg-primary flex items-center justify-center cursor-pointer border-none p-0"
                            onClick={handleProfileClick}
                        >
                            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* 2. Nội dung cuộn chính */}
            <IonContent fullscreen className="ion-no-padding">
                <main className="flex-1 flex flex-col relative w-full !pt-14 !pb-20 bg-surface">
                    <Outlet />
                </main>
            </IonContent>

            {/* 3. Fixed Bottom Navigation Bar chuẩn Safe Area */}
            <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface/80 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.04)] border-t border-outline-variant/20">
                <div className="flex justify-around items-center h-16 !px-space-xs max-w-md mx-auto">
                    {CITIZEN_NAV_ITEMS.map(item => {
                        const isActive = activeTab === item.key

                        return (
                            <button
                                key={item.key}
                                type="button"
                                data-path={item.dataPath}
                                onClick={() => handleTabClick(item.key)}
                                className={`flex flex-col items-center justify-center min-w-[64px] min-h-[44px] transition-colors relative !py-1 cursor-pointer bg-transparent border-none ${
                                    isActive
                                        ? "text-primary font-semibold"
                                        : "text-on-surface-variant hover:text-on-surface"
                                }`}
                            >
                                <span
                                    className={`material-symbols-outlined text-[22px] ${
                                        isActive ? "text-primary" : "text-on-surface-variant"
                                    }`}
                                >
                                    {item.icon}
                                </span>
                                <span className="font-label-sm text-label-sm !mt-0.5">
                                    {item.label}
                                </span>
                                <span
                                    className={`nav-indicator absolute bottom-0.5 w-1 h-1 !rounded-full bg-secondary transition-opacity ${
                                        isActive ? "opacity-100" : "opacity-0"
                                    }`}
                                />
                            </button>
                        )
                    })}
                </div>
            </nav>
        </IonPage>
    )
}

export default MainLayout

