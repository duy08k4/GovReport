import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  useIonRouter,
} from '@ionic/react';
import { ROUTES } from '../../config/Routing';
import { APP_CONFIG } from '../../config/static/AppConfig';
import {
  MAIN_NAV_ITEMS,
  MainNavTab,
  getAutoPageTitle,
  getAutoTabFromPath,
  isStackRoute,
} from '../../config/static/NavigationConfig';

export type { MainNavTab };

interface MainLayoutProps {
  children?: React.ReactNode;
  activeTab?: MainNavTab;
  pageTitle?: string;
  unitName?: string;
  teamName?: string;
  unreadCount?: number;
  isStackView?: boolean;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
  onBackClick?: () => void;
  onRefreshClick?: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  activeTab: activeTabProp,
  pageTitle: pageTitleProp,
  unitName = APP_CONFIG.UNIT_SHORT,
  teamName = APP_CONFIG.TEAM_SHORT,
  unreadCount = 3,
  isStackView,
  onNotificationClick,
  onProfileClick,
  onBackClick,
  onRefreshClick,
}) => {
  const router = useIonRouter();
  const location = useLocation();

  // Nhận diện chế độ Stack View (như trang Thông báo khẩn cấp) so với Tab View chính
  const isStack = isStackView ?? isStackRoute(location.pathname);

  // Tự động nhận diện tab hiện tại và tiêu đề dựa trên URL path từ NavigationConfig
  const activeTab = activeTabProp || getAutoTabFromPath(location.pathname);
  const pageTitle =
    pageTitleProp ||
    (isStack ? getAutoPageTitle(location.pathname) : getAutoPageTitle(activeTab));

  const handleTabClick = (tab: MainNavTab) => {
    switch (tab) {
      case 'tasks':
        router.push(ROUTES.TASKS, 'root', 'replace');
        break;
      case 'map':
        router.push(ROUTES.MAP, 'forward', 'push');
        break;
      case 'records':
        router.push(ROUTES.RECORDS, 'forward', 'push');
        break;
      case 'profile':
        router.push(ROUTES.PROFILE, 'forward', 'push');
        break;
    }
  };

  const navItems = MAIN_NAV_ITEMS;

  return (
    <IonPage className="bg-surface">
      {/* 1. Header cố định trên cùng chuẩn Safe Area */}
      <IonHeader className="ion-no-border fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl pt-safe shadow-xs border-b border-outline-variant/20">
        <IonToolbar className="max-w-md mx-auto [--background:transparent] [--border-width:0] [--padding-start:0] [--padding-end:0] [--min-height:3.5rem]">
          {isStack ? (
            /* Header dạng Stack/Sub-page (Dành cho trang Thông báo khẩn cấp): Có nút Back, Title, nút Sync & Avatar */
            <div className="h-14 !px-margin flex items-center justify-between gap-space-sm w-full">
              <div className="flex items-center gap-space-xs min-w-0">
                <button
                  type="button"
                  aria-label="Quay lại"
                  onClick={
                    onBackClick ||
                    (() =>
                      router.canGoBack()
                        ? router.goBack()
                        : router.push(ROUTES.TASKS, 'back', 'pop'))
                  }
                  className="w-11 h-11 -ml-2 flex items-center justify-center text-on-surface hover:text-primary active:scale-95 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[22px]">arrow_back</span>
                </button>
                <h1 className="text-headline-sm font-headline-sm text-on-surface truncate">
                  {pageTitle}
                </h1>
              </div>

              <div className="flex items-center gap-space-xs">
                <button
                  type="button"
                  aria-label="Đồng bộ cảnh báo"
                  onClick={onRefreshClick || (() => window.location.reload())}
                  className="w-11 h-11 flex items-center justify-center text-on-surface-variant hover:text-primary active:scale-95 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">sync</span>
                </button>
                <button
                  type="button"
                  aria-label="Thông tin cán bộ"
                  onClick={onProfileClick || (() => router.push(ROUTES.PROFILE, 'forward', 'push'))}
                  className="w-8 h-8 !rounded-full bg-primary flex items-center justify-center text-on-primary hover:bg-[#1E3A5F] active:scale-95 transition-all shadow-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">person</span>
                </button>
              </div>
            </div>
          ) : (
            /* Header chuẩn 4 Tab chính: Tên đơn vị, kíp trực, chuông thông báo & avatar */
            <div className="h-14 !px-margin flex items-center justify-between w-full">
              {/* Left: Tên cơ quan & Tên màn hình tác vụ */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-space-xs">
                  <span className="text-label-md font-label-md text-primary font-bold tracking-tight">
                    {unitName}
                  </span>
                  <span className="!px-1.5 !py-0.5 !rounded text-[10px] font-label-sm font-semibold bg-surface-container-high text-on-surface-variant uppercase tracking-wider">
                    {teamName}
                  </span>
                </div>
                <span className="text-body-sm font-body-sm text-on-surface-variant">
                  {pageTitle}
                </span>
              </div>

              {/* Right: Chuông cảnh báo & Avatar cán bộ */}
              <div className="flex items-center gap-space-sm">
                <button
                  type="button"
                  aria-label="Cảnh báo khẩn cấp"
                  onClick={
                    onNotificationClick ||
                    (() => router.push(ROUTES.NOTIFICATIONS, 'forward', 'push'))
                  }
                  className="relative w-11 h-11 flex items-center justify-center text-on-surface hover:text-primary active:scale-95 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[22px]">notifications</span>
                  {unreadCount > 0 && (
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 !rounded-full bg-error ring-2 ring-surface animate-pulse" />
                  )}
                </button>

                <button
                  type="button"
                  aria-label="Thông tin cán bộ"
                  onClick={
                    onProfileClick || (() => router.push(ROUTES.PROFILE, 'forward', 'push'))
                  }
                  className="w-8 h-8 !rounded-full bg-primary flex items-center justify-center text-on-primary hover:bg-[#1E3A5F] active:scale-95 transition-all shadow-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">person</span>
                </button>
              </div>
            </div>
          )}
        </IonToolbar>
      </IonHeader>

      {/* 2. Content cuộn toàn màn hình của Ionic */}
      <IonContent fullscreen className="ion-no-padding">
        <div className="w-full min-h-screen bg-surface flex flex-col items-center">
          <main
            className={`w-full max-w-md min-h-screen flex flex-col bg-surface relative !pt-14 ${
              isStack ? '!pb-safe' : '!pb-20'
            }`}
          >
            {children || <Outlet />}
          </main>
        </div>
      </IonContent>

      {/* 3. Bottom Navigation cố định đáy - Chỉ hiển thị ở 4 tab chính, ẩn hoàn toàn khi ở Stack View */}
      {!isStack && (
        <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/90 backdrop-blur-xl border-t border-outline-variant/20 shadow-[0_-1px_6px_rgba(0,0,0,0.03)]">
          <div className="max-w-md mx-auto flex items-center justify-around h-16 !px-space-xs">
            {navItems.map((item) => {
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  data-path={item.dataPath}
                  onClick={() => handleTabClick(item.key)}
                  className={`group flex flex-col items-center justify-center w-16 h-14 transition-colors cursor-pointer active:scale-95 ${
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[22px] transition-transform"
                    style={
                      isActive
                        ? { fontVariationSettings: "'FILL' 1, 'wght' 600" }
                        : undefined
                    }
                  >
                    {item.icon}
                  </span>
                  <span className="text-[11px] font-label-sm mt-0.5 tracking-tight font-medium">
                    {item.label}
                  </span>
                  <span
                    className={`nav-pip w-1 h-1 !rounded-full bg-secondary mt-0.5 transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </IonPage>
  );
};

export default MainLayout;
