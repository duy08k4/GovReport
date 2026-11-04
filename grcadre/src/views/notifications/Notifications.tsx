import React, { useState, useMemo } from 'react';
import { useIonRouter, IonToast } from '@ionic/react';
import { ROUTES } from '../../config/Routing';
import {
  NotificationCategory,
  AlertNotification,
  FilterChip,
} from './types';

const INITIAL_NOTIFICATIONS: AlertNotification[] = [
  {
    id: 'alert-1',
    category: 'urgent',
    isRead: false,
    timeAgo: '2 phút trước',
    badgeLabel: 'Khẩn cấp',
    title: 'SỰ CỐ KHẨN CẤP: ĐỨT DÂY ĐIỆN NGÕ 12 TRÀNG THI',
    description:
      'Dây điện trung thế võng sát mặt đường gây nguy cơ chập cháy sau mưa bão. Yêu cầu Đội Phản ứng nhanh số 1 tiếp cận hiện trường trong vòng 15 phút!',
    locationPreview: {
      distance: 'Cách vị trí của bạn 180m',
      coords: 'Tọa độ: 21.0285° N, 105.8542° E',
    },
    actionText: 'XEM VÀ TIẾP NHẬN NGAY',
    actionIcon: 'verified',
    targetRoute: ROUTES.MAP,
  },
  {
    id: 'alert-2',
    category: 'assignment',
    isRead: false,
    timeAgo: '15 phút trước',
    badgeLabel: 'Phân công nhiệm vụ',
    ticketCode: 'SC-2026-HN14',
    description:
      'Đội trưởng Trần Văn Hùng đã phân công bạn thụ lý hồ sơ SC-2026-HN14 (Ngập úng đường Đinh Tiên Hoàng).',
    dispatcher: {
      name: 'Trần Văn Hùng',
      initials: 'TH',
      role: 'Tổ trưởng Điều phối KV1',
      unit: 'Phòng Chỉ huy Tác chiến Đô thị',
    },
    actionText: 'Mở chi tiết hồ sơ',
    actionIcon: 'folder_open',
    targetRoute: ROUTES.RECORDS,
  },
  {
    id: 'alert-3',
    category: 'sla',
    isRead: false,
    timeAgo: '35 phút trước',
    badgeLabel: 'Sắp chạm hạn SLA',
    ticketCode: 'SC-2026-HN09',
    description:
      'Hồ sơ SC-2026-HN09 chỉ còn 30 phút để hoàn tất cập nhật biên bản nghiệm thu trước khi hệ thống báo vi phạm chỉ tiêu điều hành chính phủ điện tử.',
    sla: {
      remainingText: 'Còn 30 phút',
      elapsedPercent: 88,
    },
    actionText: 'Cập nhật biên bản ngay',
    actionIcon: 'edit_document',
    targetRoute: ROUTES.RECORDS,
  },
  {
    id: 'alert-4',
    category: 'system',
    isRead: true,
    timeAgo: '2 giờ trước',
    badgeLabel: 'Thông báo hệ thống',
    description:
      'Hệ thống bản đồ số vừa cập nhật ranh giới địa bàn theo Quyết định QĐ-88/2026/UBND. Vui lòng làm mới bản đồ tác chiến để hiển thị đúng khu vực phân vùng giám sát mới.',
    issuedBy: 'Đơn vị ban hành: Sở Tài nguyên và Môi trường TP. Hà Nội',
    actionText: 'Tải lại dữ liệu bản đồ',
    actionIcon: 'refresh',
    targetRoute: ROUTES.MAP,
  },
];

const FILTER_CHIPS: FilterChip[] = [
  { key: 'all', label: 'Tất cả (4)' },
  { key: 'urgent', label: 'Khẩn cấp (Urgent)', hasUrgentDot: true },
  { key: 'assignment', label: 'Phân công mới' },
  { key: 'sla', label: 'Nhắc hạn SLA' },
];

export const Notifications: React.FC = () => {
  const router = useIonRouter();
  const [notifications, setNotifications] = useState<AlertNotification[]>(INITIAL_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState<NotificationCategory>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Unread count
  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  const isAllRead = unreadCount === 0;

  // Filtered list
  const filteredNotifications = useMemo(() => {
    if (activeFilter === 'all') return notifications;
    return notifications.filter((n) => n.category === activeFilter);
  }, [notifications, activeFilter]);

  // Mark all as read
  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
    setToastMessage('Đã đánh dấu tất cả cảnh báo là đã đọc');
  };

  // Mark single item read and navigate
  const handleActionClick = (notification: AlertNotification) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === notification.id ? { ...item, isRead: true } : item))
    );

    if (notification.targetRoute) {
      router.push(notification.targetRoute, 'forward', 'push');
    } else {
      setToastMessage(`Đã xử lý thông báo: ${notification.badgeLabel}`);
    }
  };

  return (
    <div className="flex flex-col w-full !pb-margin bg-surface">
      {/* 1. Status Counter & Bulk Actions */}
      <div className="!px-margin !pt-space-md !pb-space-sm flex items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-xs">
          {!isAllRead && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full !rounded-full bg-error opacity-75" />
              <span className="relative inline-flex !rounded-full h-2 w-2 bg-error" />
            </span>
          )}
          <span className="font-label-md text-label-md text-on-surface font-semibold tracking-tight">
            {unreadCount > 0
              ? `${String(unreadCount).padStart(2, '0')} cảnh báo mới chưa đọc`
              : '00 cảnh báo chưa đọc'}
          </span>
        </div>

        <button
          type="button"
          disabled={isAllRead}
          onClick={handleMarkAllRead}
          className={`font-label-md text-label-md font-semibold transition-colors focus:outline-none !py-1 !px-space-xs !rounded cursor-pointer ${
            isAllRead
              ? 'text-on-surface-variant opacity-60 cursor-not-allowed'
              : 'text-secondary hover:text-on-secondary-container'
          }`}
        >
          {isAllRead ? 'Đã đọc toàn bộ' : 'Đánh dấu tất cả đã đọc'}
        </button>
      </div>

      {/* 2. Operational Filter Chips */}
      <div className="!px-margin !py-space-xs overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-space-xs min-w-max !pb-1">
          {FILTER_CHIPS.map((chip) => {
            const isActive = activeFilter === chip.key;
            return (
              <button
                key={chip.key}
                type="button"
                onClick={() => setActiveFilter(chip.key)}
                className={`filter-chip !px-space-md !py-1.5 !rounded font-label-md text-label-md transition-all flex items-center gap-1 cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-sm font-semibold'
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'
                }`}
              >
                {chip.hasUrgentDot && (
                  <span className="w-1.5 h-1.5 !rounded-full bg-error" />
                )}
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Live Alert Feed */}
      <div className="!px-margin flex flex-col gap-space-md !mt-space-sm">
        {filteredNotifications.length === 0 ? (
          <div className="bg-surface-container-lowest !rounded-lg !p-space-xl text-center shadow-xs border border-outline-variant/30 flex flex-col items-center gap-2">
            <span className="material-symbols-outlined text-[36px] text-outline">notifications_off</span>
            <p className="font-body-md text-body-md text-on-surface-variant">Không có cảnh báo nào trong danh mục này</p>
          </div>
        ) : (
          filteredNotifications.map((alert) => {
            // Card 1: Urgent Critical Alert
            if (alert.category === 'urgent') {
              return (
                <div
                  key={alert.id}
                  className="alert-card alert-urgent relative bg-error-container text-on-error-container !rounded-lg !p-space-md shadow-sm overflow-hidden"
                  data-category="urgent"
                  data-read={alert.isRead}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-error" />
                  <div className="flex items-start justify-between gap-space-xs !pl-space-xs">
                    <div className="flex items-center gap-space-xs">
                      <span
                        className="material-symbols-outlined text-error text-[20px] animate-pulse"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        warning
                      </span>
                      <span className="bg-error text-on-error !px-1.5 !py-0.5 !rounded font-label-sm text-label-sm uppercase tracking-wide font-bold">
                        {alert.badgeLabel}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-on-surface-variant font-code-tabular text-code-tabular">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      <span>{alert.timeAgo}</span>
                    </div>
                  </div>

                  <div className="!mt-space-sm !pl-space-xs">
                    <h2 className="font-headline-sm text-headline-sm text-error font-bold leading-tight uppercase">
                      {alert.title}
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface !mt-space-xs leading-normal">
                      {alert.description}
                    </p>

                    {/* Location Context Preview */}
                    {alert.locationPreview && (
                      <div className="!mt-space-sm flex items-center gap-space-xs !py-1.5 !px-space-sm bg-surface-container-lowest/80 !rounded flex-wrap">
                        <span className="material-symbols-outlined text-error text-[18px]">near_me</span>
                        <span className="font-label-md text-label-md text-on-surface font-medium">
                          {alert.locationPreview.distance}
                        </span>
                        <span className="text-on-surface-variant text-[12px]">•</span>
                        <span className="font-label-md text-label-md text-secondary font-semibold">
                          {alert.locationPreview.coords}
                        </span>
                      </div>
                    )}

                    <div className="!mt-space-md flex gap-space-sm">
                      <button
                        type="button"
                        onClick={() => handleActionClick(alert)}
                        className="w-full h-10 bg-error hover:bg-error/90 active:bg-error text-on-error !rounded font-label-lg text-label-lg uppercase tracking-wider flex items-center justify-center gap-space-xs shadow-sm transition-all focus:outline-none cursor-pointer font-bold active:scale-[0.99]"
                      >
                        <span className="material-symbols-outlined text-[18px]">verified</span>
                        <span>{alert.actionText}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            // Card 2: Assignment Alert
            if (alert.category === 'assignment') {
              return (
                <div
                  key={alert.id}
                  className="alert-card alert-assignment relative bg-surface-container-lowest !rounded-lg !p-space-md shadow-sm overflow-hidden border border-outline-variant/30"
                  data-category="assignment"
                  data-read={alert.isRead}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary-container" />
                  <div className="flex items-start justify-between gap-space-xs !pl-space-xs">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-primary-container text-[20px]">
                        assignment_ind
                      </span>
                      <span className="bg-surface-container text-on-primary-fixed-variant !px-1.5 !py-0.5 !rounded font-label-sm text-label-sm uppercase tracking-wide font-semibold">
                        {alert.badgeLabel}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-on-surface-variant font-code-tabular text-code-tabular">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      <span>{alert.timeAgo}</span>
                    </div>
                  </div>

                  <div className="!mt-space-sm !pl-space-xs">
                    {alert.ticketCode && (
                      <div className="flex items-center gap-space-xs text-on-surface-variant font-code-tabular text-code-tabular !mb-1">
                        <span className="font-semibold text-primary">Mã hồ sơ:</span> {alert.ticketCode}
                      </div>
                    )}
                    <p className="font-body-md text-body-md text-on-surface leading-snug">
                      Đội trưởng <strong className="font-semibold text-primary">Trần Văn Hùng</strong> đã phân công bạn thụ lý hồ sơ{' '}
                      <span className="font-medium text-secondary">{alert.ticketCode}</span> (Ngập úng đường Đinh Tiên Hoàng).
                    </p>

                    {/* Dispatcher & Context details */}
                    {alert.dispatcher && (
                      <div className="!mt-space-sm !p-space-sm bg-surface-container-low !rounded flex items-center justify-between">
                        <div className="flex items-center gap-space-xs">
                          <div className="w-7 h-7 !rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-[11px]">
                            {alert.dispatcher.initials}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                              {alert.dispatcher.role}
                            </span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">
                              {alert.dispatcher.unit}
                            </span>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-secondary text-[20px]">map</span>
                      </div>
                    )}

                    <div className="!mt-space-md flex gap-space-sm">
                      <button
                        type="button"
                        onClick={() => handleActionClick(alert)}
                        className="w-full h-9 bg-surface-container hover:bg-surface-container-high active:bg-surface-variant text-on-surface !rounded font-label-md text-label-md font-semibold flex items-center justify-center gap-space-xs transition-colors focus:outline-none cursor-pointer active:scale-[0.99]"
                      >
                        <span className="material-symbols-outlined text-[18px]">folder_open</span>
                        <span>{alert.actionText}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            // Card 3: SLA Warning Alert
            if (alert.category === 'sla') {
              return (
                <div
                  key={alert.id}
                  className="alert-card alert-sla relative bg-surface-container-lowest !rounded-lg !p-space-md shadow-sm overflow-hidden border border-outline-variant/30"
                  data-category="sla"
                  data-read={alert.isRead}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary" />
                  <div className="flex items-start justify-between gap-space-xs !pl-space-xs">
                    <div className="flex items-center gap-space-xs">
                      <span
                        className="material-symbols-outlined text-secondary text-[20px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        hourglass_top
                      </span>
                      <span className="bg-secondary-fixed text-on-secondary-fixed !px-1.5 !py-0.5 !rounded font-label-sm text-label-sm uppercase tracking-wide font-semibold">
                        {alert.badgeLabel}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-on-surface-variant font-code-tabular text-code-tabular">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      <span>{alert.timeAgo}</span>
                    </div>
                  </div>

                  <div className="!mt-space-sm !pl-space-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-code-tabular text-code-tabular font-semibold text-secondary">
                        Hồ sơ {alert.ticketCode}
                      </span>
                      {alert.sla && (
                        <span className="bg-error-container text-error !px-2 !py-0.5 !rounded font-label-sm text-label-sm font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">alarm</span>{' '}
                          {alert.sla.remainingText}
                        </span>
                      )}
                    </div>
                    <p className="font-body-md text-body-md text-on-surface !mt-space-xs leading-snug">
                      Hồ sơ {alert.ticketCode} chỉ còn{' '}
                      <span className="font-semibold text-error">
                        {alert.sla?.remainingText || '30 phút'}
                      </span>{' '}
                      để hoàn tất cập nhật biên bản nghiệm thu trước khi hệ thống báo vi phạm chỉ tiêu điều hành chính phủ điện tử.
                    </p>

                    {/* Progress bar indication of elapsed SLA */}
                    {alert.sla && (
                      <div className="!mt-space-sm">
                        <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant !mb-1">
                          <span>Thời hạn SLA cam kết</span>
                          <span className="font-semibold text-error">
                            {alert.sla.elapsedPercent}% đã trôi qua
                          </span>
                        </div>
                        <div className="w-full h-2 bg-surface-container !rounded-full overflow-hidden">
                          <div
                            className="h-full bg-error !rounded-full transition-all duration-300"
                            style={{ width: `${alert.sla.elapsedPercent}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="!mt-space-md flex gap-space-sm">
                      <button
                        type="button"
                        onClick={() => handleActionClick(alert)}
                        className="w-full h-9 bg-primary hover:bg-primary-container text-on-primary !rounded font-label-md text-label-md font-semibold flex items-center justify-center gap-space-xs transition-colors focus:outline-none cursor-pointer active:scale-[0.99]"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit_document</span>
                        <span>{alert.actionText}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            // Card 4: System Operational Notice
            return (
              <div
                key={alert.id}
                className="alert-card alert-system relative bg-surface-container-low !rounded-lg !p-space-md shadow-sm overflow-hidden border border-outline-variant/30"
                data-category="system"
                data-read={alert.isRead}
              >
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-outline-variant" />
                <div className="flex items-start justify-between gap-space-xs !pl-space-xs">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                      layers
                    </span>
                    <span className="bg-surface-container-high text-on-surface-variant !px-1.5 !py-0.5 !rounded font-label-sm text-label-sm uppercase tracking-wide font-semibold">
                      {alert.badgeLabel}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-on-surface-variant font-code-tabular text-code-tabular">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    <span>{alert.timeAgo}</span>
                  </div>
                </div>

                <div className="!mt-space-sm !pl-space-xs">
                  <p className="font-body-md text-body-md text-on-surface leading-snug">
                    Hệ thống bản đồ số vừa cập nhật ranh giới địa bàn theo{' '}
                    <strong className="font-semibold text-primary">Quyết định QĐ-88/2026/UBND</strong>. Vui
                    lòng làm mới bản đồ tác chiến để hiển thị đúng khu vực phân vùng giám sát mới.
                  </p>
                  {alert.issuedBy && (
                    <div className="!mt-space-sm flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
                      <span className="material-symbols-outlined text-[16px]">info</span>
                      <span>{alert.issuedBy}</span>
                    </div>
                  )}

                  <div className="!mt-space-md flex gap-space-sm">
                    <button
                      type="button"
                      onClick={() => handleActionClick(alert)}
                      className="h-9 !px-space-md bg-surface-container hover:bg-surface-container-high text-on-surface !rounded font-label-md text-label-md font-medium flex items-center gap-space-xs transition-colors focus:outline-none cursor-pointer active:scale-[0.99]"
                    >
                      <span className="material-symbols-outlined text-[16px]">refresh</span>
                      <span>{alert.actionText}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 4. Operational Footer Metrics */}
      <div className="!px-margin !mt-space-lg">
        <div className="bg-surface-container-lowest !p-space-md !rounded-lg flex items-center justify-between border border-outline-variant/30 shadow-xs">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-on-tertiary-container text-[24px]">
              satellite_alt
            </span>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                Tín hiệu trạm điều hành
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Đồng bộ trực tuyến • Độ trễ &lt;1.2s
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-surface-container !px-2.5 !py-1 !rounded">
            <span className="h-2 w-2 !rounded-full bg-tertiary-fixed-dim animate-pulse" />
            <span className="font-code-tabular text-code-tabular text-on-surface font-medium text-[11px]">
              GIS LIVE
            </span>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <IonToast
        isOpen={Boolean(toastMessage)}
        message={toastMessage || ''}
        duration={2000}
        onDidDismiss={() => setToastMessage(null)}
        position="bottom"
      />
    </div>
  );
};

export default Notifications;
