import React, { useState, useEffect } from "react";
import { IncidentItem, AuditStep } from "../types";

interface IncidentDetailDrawerProps {
  incident: IncidentItem;
  onClose?: () => void;
  onRefreshData?: () => void;
  onOverrideSuccess?: (incidentId: string, targetAgency: string, reason: string) => void;
}

const DEFAULT_REASON =
  "Tuyến đường thuộc quản lý liên quận của Sở GTVT, không thuộc thẩm quyền phường. Cần đội chuyên dụng xử lý nắp hố ga kích thước phi tiêu chuẩn để ngăn tai nạn chết người.";

const IncidentDetailDrawer: React.FC<IncidentDetailDrawerProps> = ({
  incident,
  onClose,
  onRefreshData,
  onOverrideSuccess,
}) => {
  const [targetAgency, setTargetAgency] = useState(
    "Sở Giao Thông Vận Tải TP Hà Nội (Đội 3 Duy Tu Đường Bộ)"
  );
  const [reason, setReason] = useState(DEFAULT_REASON);
  const [escalateSla, setEscalateSla] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAuditNotice, setShowAuditNotice] = useState(false);
  const [auditHistory, setAuditHistory] = useState<AuditStep[]>(incident.auditTrail);
  const [isMapMode, setIsMapMode] = useState<"satellite" | "gis">("satellite");

  // Sync audit history when selected incident changes
  useEffect(() => {
    setAuditHistory(incident.auditTrail);
    setIsSubmitted(false);
    setShowAuditNotice(false);
  }, [incident]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim() || isSubmitting) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setShowAuditNotice(true);

      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

      const newAuditStep: AuditStep = {
        id: `aud-${Date.now()}`,
        title: "Root Admin Can Thiệp Điều Phối (Override)",
        time: timeStr,
        description: `Đã can thiệp hành chính chuyển sang "${targetAgency}". Lý do: ${reason}. ${
          escalateSla ? "Khóa hạn định SLA Khẩn: 30 phút." : ""
        } (Mã GD: #AUD-8829-POSTGIS)`,
        icon: "verified",
        type: "override",
      };

      setAuditHistory((prev) => [...prev, newAuditStep]);

      if (onOverrideSuccess) {
        onOverrideSuccess(incident.id, targetAgency, reason);
      }
    }, 450);
  };

  const handleReset = () => {
    setReason(DEFAULT_REASON);
    setTargetAgency("Sở Giao Thông Vận Tải TP Hà Nội (Đội 3 Duy Tu Đường Bộ)");
    setEscalateSla(true);
    setIsSubmitted(false);
    setShowAuditNotice(false);
  };

  return (
    <div className="flex flex-col gap-space-md">
      <div className="bg-surface-container-lowest shadow-sm flex flex-col border border-outline-variant/30">
        {/* Drawer Header */}
        <div className="p-space-md bg-primary-container text-surface flex items-center justify-between">
          <div className="flex items-center gap-space-xs min-w-0">
            <span className="material-symbols-outlined text-secondary-fixed text-[22px] shrink-0">
              admin_panel_settings
            </span>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-headline-sm text-base sm:text-headline-sm text-surface tracking-tight truncate font-bold">
                  Hồ Sơ: {incident.code}
                </span>
                <span
                  className={`px-1.5 py-0.5 text-on-error font-label-sm text-[11px] font-bold ${
                    incident.priority === "urgent"
                      ? "bg-error"
                      : incident.priority === "high"
                      ? "bg-error/80"
                      : "bg-surface-container text-on-surface"
                  }`}
                >
                  {incident.priorityLabel}
                </span>
              </div>
              <span className="font-body-sm text-xs sm:text-body-sm text-on-primary-container truncate">
                Tiêu điểm can thiệp điều phối khẩn tuyến giáp ranh
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={onRefreshData}
              aria-label="Làm mới dữ liệu vé"
              className="text-on-primary-container hover:text-surface transition-colors p-1 cursor-pointer"
              type="button"
              title="Làm mới thông tin sự cố"
            >
              <span className="material-symbols-outlined text-[20px]">refresh</span>
            </button>
            {onClose && (
              <button
                onClick={onClose}
                aria-label="Đóng hồ sơ"
                className="text-on-primary-container hover:text-surface transition-colors p-1 cursor-pointer hover:bg-surface/10 rounded"
                type="button"
                title="Đóng hồ sơ chi tiết"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            )}
          </div>
        </div>

        <div className="p-space-md flex flex-col gap-space-md">
          {/* Incident Metadata Box */}
          <div className="flex flex-col gap-space-xs">
            <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
              Thông Tin Người Dân Khai Báo
            </span>
            <h2 className="font-headline-sm text-base sm:text-lg text-on-surface font-bold">
              {incident.title} trước số {incident.address}
            </h2>
            <p className="font-body-md text-body-md text-on-surface bg-surface-container-low p-space-sm leading-relaxed border-l-2 border-secondary font-normal italic">
              {incident.citizenQuote}
            </p>
          </div>

          {/* Dual Field Evidence: Photos + Map Visualizer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
            {/* Scene Photo */}
            <div className="flex flex-col gap-1">
              <span className="font-label-sm text-xs text-on-surface-variant flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-[15px]">photo_camera</span>
                Ảnh chụp hiện trường
              </span>
              <div className="relative w-full h-44 bg-surface-container overflow-hidden group border border-outline-variant/30">
                <img
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  alt={`Hiện trường ${incident.title}`}
                  src={incident.photoUrl}
                  onError={(e) => {
                    // Fallback to a high quality urban emergency placeholder if remote fails
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-primary/80 text-surface font-code-tabular text-[11px]">
                  {incident.photoName}
                </div>
                <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-error/90 text-on-error font-label-sm text-[10px] font-bold uppercase tracking-wider">
                  Trực địa VNeID
                </div>
              </div>
            </div>

            {/* Spatial GPS Location Box */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-xs text-on-surface-variant flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[15px]">map</span>
                  Vị trí PostGIS thực địa
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      setIsMapMode(isMapMode === "satellite" ? "gis" : "satellite")
                    }
                    className="font-label-sm text-[10px] text-secondary hover:underline cursor-pointer font-medium"
                  >
                    {isMapMode === "satellite" ? "Xem GIS Lưới" : "Xem Ảnh Phệ Tinh"}
                  </button>
                </div>
              </div>

              <div
                className="w-full h-44 bg-surface-container bg-cover bg-center relative border border-outline-variant/30 overflow-hidden"
                style={{
                  backgroundImage:
                    isMapMode === "satellite"
                      ? "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAPQ7A8OnYM5nTA3zMJklGr-vfQ6NtyY29euNWXAS1vjSj918reL9eC9zYr3hyfcaaef_dercFTYCorWr0LhFcWD6xpzv_SQCoYcm1HF3zTfNj9O4u1bl2rEjM3TY-QDkrSAFGHHp-wb-Roe0D17ViuSF5T7lHvcplLm8QCcysGc3Sq5C-RSfscMnklDc236n-J-beUus7RRbRbBeWTU12AUXVUo7nSzbTIjq-laNsSFsYi7dralTk')"
                      : "radial-gradient(circle at 50% 50%, #102a43 15%, #00152a 80%)",
                }}
              >
                {/* Visual marker overlay */}
                <div className="absolute inset-0 bg-primary/20 flex flex-col justify-between p-2 pointer-events-none">
                  <div className="self-end px-1.5 py-0.5 bg-surface-container-lowest text-on-surface font-code-tabular text-[11px] shadow-sm font-semibold">
                    EPSG:4326 (WGS84)
                  </div>

                  {/* Pulsing center target pin */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative flex items-center justify-center">
                      <span className="w-8 h-8 rounded-full bg-error/30 animate-ping absolute" />
                      <span className="w-4 h-4 rounded-full bg-error ring-2 ring-surface flex items-center justify-center shadow-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-surface" />
                      </span>
                    </div>
                  </div>

                  <div className="bg-surface-container-lowest/95 p-1.5 text-on-surface font-code-tabular text-[11px] shadow-sm flex items-center justify-between">
                    <span className="font-medium">
                      {incident.lat}° N, {incident.lng}° E
                    </span>
                    <span className="text-error font-bold">Bán kính 2.4m</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chronological Dispatch Flow (report_histories) */}
          <div className="flex flex-col gap-space-xs">
            <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
              Tiến Trình Xử Lý &amp; Lịch Sử Hệ Thống (Audit Trail)
            </span>
            <div className="bg-surface-container-low p-space-sm flex flex-col gap-space-sm font-body-sm text-body-sm border border-outline-variant/30">
              {auditHistory.map((step, idx) => {
                let badgeClass = "bg-surface-container-high text-on-surface";
                if (step.type === "postgis") {
                  badgeClass = "bg-secondary-fixed text-on-secondary-fixed-variant";
                } else if (step.type === "warning") {
                  badgeClass = "bg-error-container text-error";
                } else if (step.type === "override") {
                  badgeClass = "bg-tertiary-container text-tertiary-fixed";
                }

                const isLast = idx === auditHistory.length - 1;

                return (
                  <div
                    key={step.id}
                    className={`flex items-start gap-space-xs relative ${
                      !isLast ? "pb-space-xs border-b border-surface-container" : ""
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${badgeClass}`}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {step.icon}
                      </span>
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`font-label-md text-label-md font-semibold truncate ${
                            step.type === "warning"
                              ? "text-error"
                              : step.type === "override"
                              ? "text-on-tertiary-container"
                              : step.type === "postgis"
                              ? "text-secondary"
                              : "text-on-surface"
                          }`}
                        >
                          {step.title}
                        </span>
                        <span className="font-code-tabular text-code-tabular text-on-surface-variant text-xs shrink-0 font-medium">
                          {step.time}
                        </span>
                      </div>
                      <span className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant leading-relaxed">
                        {step.description}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* OVERRIDE ROUTING COMMAND BLOCK (CRITICAL OPERATIONAL INTERVENTION) */}
          <form
            className="bg-primary-container p-space-md text-surface flex flex-col gap-space-sm shadow-sm"
            id="override-form"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center gap-space-xs text-secondary-fixed">
              <span className="material-symbols-outlined text-[20px]">
                transfer_within_a_station
              </span>
              <span className="font-label-lg text-label-lg uppercase tracking-wider font-bold">
                Khối Can Thiệp Điều Phối (Override Routing)
              </span>
            </div>

            {/* Caution Banner */}
            <div className="bg-surface/10 p-space-xs flex items-center gap-space-xs text-on-primary-container text-body-sm">
              <span className="material-symbols-outlined text-secondary-fixed text-[18px] shrink-0">
                info
              </span>
              <span className="leading-tight">
                Can thiệp chuyển tiếp sự cố sang cơ quan khác do lỗi vùng giáp ranh hoặc quá
                thẩm quyền xử lý.
              </span>
            </div>

            {/* Target Agency Dropdown */}
            <div className="flex flex-col gap-1 mt-1">
              <label
                className="font-label-sm text-label-sm text-surface font-semibold"
                htmlFor="override-target-tenant"
              >
                Chọn cơ quan tiếp nhận mới <span className="text-error">*</span>
              </label>
              <div className="relative">
                <select
                  className="w-full h-10 px-3 pr-8 bg-surface text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary-fixed cursor-pointer appearance-none"
                  id="override-target-tenant"
                  required
                  value={targetAgency}
                  onChange={(e) => setTargetAgency(e.target.value)}
                >
                  <option value="Sở Giao Thông Vận Tải TP Hà Nội (Đội 3 Duy Tu Đường Bộ)">
                    Sở Giao Thông Vận Tải TP Hà Nội (Đội 3 Duy Tu Đường Bộ)
                  </option>
                  <option value="Công Ty TNHH MTV Thoát Nước Hà Nội (Xí nghiệp 1)">
                    Công Ty TNHH MTV Thoát Nước Hà Nội (Xí nghiệp 1)
                  </option>
                  <option value="Tổng Công ty Điện lực TP Hà Nội (EVN HANOI)">
                    Tổng Công ty Điện lực TP Hà Nội (EVN HANOI)
                  </option>
                  <option value="UBND Quận Hoàn Kiếm (Cấp Trưởng Phòng QLĐT)">
                    UBND Quận Hoàn Kiếm (Cấp Trưởng Phòng QLĐT)
                  </option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-2.5 pointer-events-none text-on-surface text-[18px]">
                  expand_more
                </span>
              </div>
            </div>

            {/* Intervention Reason Required Textarea */}
            <div className="flex flex-col gap-1">
              <label
                className="font-label-sm text-label-sm text-surface font-semibold"
                htmlFor="override-reason"
              >
                Nhập lý do can thiệp hành chính (Bắt buộc) <span className="text-error">*</span>
              </label>
              <textarea
                className="w-full p-2.5 bg-surface text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary-fixed"
                id="override-reason"
                placeholder="Nêu rõ căn cứ quy chế điều phối hoặc hiện trạng vượt thẩm quyền cấp phường..."
                required
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <div className="flex items-center justify-between font-label-sm text-label-sm text-on-primary-container">
                <span>Ghi nhận thời gian thực vào Audit Log</span>
                <span id="char-count" className="font-code-tabular font-medium">
                  {reason.length} ký tự
                </span>
              </div>
            </div>

            {/* Emergency Priority Escalation Switch */}
            <div className="flex items-center justify-between p-space-xs bg-surface/5">
              <div className="flex items-center gap-2">
                <input
                  checked={escalateSla}
                  onChange={(e) => setEscalateSla(e.target.checked)}
                  className="w-4 h-4 accent-secondary-fixed cursor-pointer"
                  id="escalate-sla"
                  type="checkbox"
                />
                <label
                  className="font-label-sm text-label-sm text-surface cursor-pointer select-none font-medium"
                  htmlFor="escalate-sla"
                >
                  Khóa hạn định SLA Khẩn (Giảm hạn còn 30 phút)
                </label>
              </div>
              <span className="font-code-tabular text-code-tabular text-tertiary-fixed font-bold">
                SLA: 30m
              </span>
            </div>

            {/* Submit Command Button */}
            <div className="pt-space-xs flex items-center gap-space-sm">
              <button
                disabled={isSubmitting}
                className={`flex-1 h-11 font-label-lg text-label-lg uppercase tracking-wider flex items-center justify-center gap-space-xs transition-colors shadow-sm cursor-pointer font-bold ${
                  isSubmitted
                    ? "bg-tertiary-container text-tertiary-fixed"
                    : "bg-secondary hover:bg-secondary-container hover:text-on-secondary-container text-on-secondary"
                } disabled:opacity-70`}
                id="btn-submit-override"
                type="submit"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">
                      refresh
                    </span>
                    <span>Đang đồng bộ PostGIS &amp; ghi log...</span>
                  </>
                ) : isSubmitted ? (
                  <>
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                    <span>Đã Chuyển Sang Sở GTVT</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">bolt</span>
                    <span>Xác Nhận Điều Phối Lại (Override)</span>
                  </>
                )}
              </button>

              <button
                className="h-11 px-4 bg-surface/10 hover:bg-surface/20 text-surface font-label-md text-label-md transition-colors cursor-pointer font-semibold"
                onClick={handleReset}
                type="button"
              >
                Hủy
              </button>
            </div>
          </form>

          {/* Audit Log Immediate Output Banner */}
          {showAuditNotice && (
            <div
              className="p-space-sm bg-tertiary-container text-tertiary-fixed font-body-sm text-body-sm flex items-start gap-space-xs shadow-sm border border-tertiary-fixed/30 animate-fadeIn"
              id="audit-notification"
            >
              <span className="material-symbols-outlined text-tertiary-fixed text-[18px] shrink-0 mt-0.5">
                verified
              </span>
              <div className="flex flex-col">
                <span className="font-semibold text-surface">
                  Can thiệp thành công! Mã giao dịch kiểm toán: #AUD-8829-POSTGIS
                </span>
                <span className="text-tertiary-fixed/90 text-[12px] leading-relaxed">
                  Hệ thống đã tự động bắn WebSocket cảnh báo tới Giám đốc Sở GTVT Hà Nội &amp;
                  cập nhật SLA còn 30 phút.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncidentDetailDrawer;
