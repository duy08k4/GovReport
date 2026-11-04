import React from 'react';
import { IonHeader, IonToolbar, IonButtons } from '@ionic/react';

interface TaskHeaderProps {
  unreadNotificationCount?: number;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
}

export const TaskHeader: React.FC<TaskHeaderProps> = ({
  unreadNotificationCount = 1,
  onNotificationClick,
  onProfileClick,
}) => {
  return (
    <IonHeader className="ion-no-border fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl !pt-safe border-b border-outline-variant/20 shadow-xs">
      <IonToolbar className="max-w-md mx-auto !px-margin [--background:transparent] [--border-width:0]">
        <div className="flex items-center justify-between w-full h-14">
          {/* Left: Organization & Screen Title */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-space-xs">
              <span className="text-label-md font-label-md text-primary font-bold tracking-tight">
                UBND P. Hàng Trống
              </span>
              <span className="!px-1.5 !py-0.5 !rounded text-[10px] font-label-sm font-semibold bg-surface-container-high text-on-surface-variant uppercase tracking-wider">
                Phản ứng nhanh 1
              </span>
            </div>
            <span className="text-body-sm font-body-sm text-on-surface-variant">
              Danh Sách Tác Vụ
            </span>
          </div>

          {/* Right: Notification Bell & Cadre Profile Avatar */}
          <IonButtons slot="end" className="flex items-center gap-space-sm m-0">
            <button
              type="button"
              aria-label="Cảnh báo khẩn cấp và thông báo"
              onClick={onNotificationClick}
              className="relative w-11 h-11 flex items-center justify-center text-on-surface hover:text-primary active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              {unreadNotificationCount > 0 && (
                <span className="absolute top-2.5 right-2.5 w-2 h-2 !rounded-full bg-error ring-2 ring-surface animate-pulse" />
              )}
            </button>

            <button
              type="button"
              aria-label="Hồ sơ cán bộ"
              onClick={onProfileClick}
              className="w-8 h-8 !rounded-full bg-primary flex items-center justify-center text-on-primary hover:bg-[#1E3A5F] active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>
          </IonButtons>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default TaskHeader;
