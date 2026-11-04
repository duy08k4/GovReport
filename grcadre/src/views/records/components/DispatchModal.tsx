import React, { useState } from 'react';
import { IncidentRecord } from '../types';

interface DispatchModalProps {
  isOpen: boolean;
  incident: IncidentRecord | null;
  onClose: () => void;
  onConfirm: (
    incidentId: string,
    source: 'self_claimed' | 'tenant_dispatched',
    note?: string
  ) => void;
}

export const DispatchModal: React.FC<DispatchModalProps> = ({
  isOpen,
  incident,
  onClose,
  onConfirm,
}) => {
  const [fieldNote, setFieldNote] = useState<string>('');

  if (!isOpen || !incident) {
    return null;
  }

  // Xác định Case dựa trên trạng thái hồ sơ:
  // - Nếu status === 'received' hoặc có directive -> Case 2: Đội được Cơ quan địa phương (Tenant) giao việc xuống
  // - Nếu status === 'submitted' (mới gửi, chưa ai nhận) -> Case 1: Đội chủ động tự nhận việc
  const isTenantDispatched =
    incident.status === 'received' || incident.assignmentSource === 'tenant_dispatched';

  const handleConfirmAction = () => {
    if (isTenantDispatched) {
      onConfirm(
        incident.id,
        'tenant_dispatched',
        fieldNote || incident.tenantDirective || 'Đội đã tiếp nhận lệnh điều động từ Cơ quan'
      );
    } else {
      onConfirm(
        incident.id,
        'self_claimed',
        fieldNote || 'Đội Phản ứng nhanh số 1 chủ động phát hiện và tiếp nhận tại hiện trường'
      );
    }
    setFieldNote('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-xs flex items-end justify-center transition-opacity select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-surface-container-lowest !rounded-t-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden transform transition-transform border-t border-outline-variant/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sheet Handle & Header */}
        <div className="!p-4 !pb-3 flex flex-col gap-1 border-b border-surface-container-high/60">
          <div className="w-10 h-1 bg-surface-container-highest !rounded-full self-center mb-1" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-9 h-9 !rounded-lg flex items-center justify-center ${
                  isTenantDispatched
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-[#0084A3]/10 text-[#0084A3]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isTenantDispatched ? 'corporate_fare' : 'how_to_reg'}
                </span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Nhận việc
                </h3>
                <span
                  className={`text-[11px] font-label-sm font-semibold uppercase tracking-wide ${
                    isTenantDispatched ? 'text-purple-700' : 'text-[#0084A3]'
                  }`}
                >
                  {isTenantDispatched ? 'Được giao' : 'Tự nhận'}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 !rounded-full bg-surface-container flex items-center justify-center text-outline hover:text-on-surface cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="!p-4 overflow-y-auto flex flex-col gap-3">
          {/* Thông tin sự cố */}
          <div className="!p-3 bg-surface-container-low !rounded-xl border border-outline-variant/20 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-code-tabular text-code-tabular text-primary font-bold">
                {incident.code}
              </span>
              <span className="text-[11px] font-label-sm font-semibold !px-2 !py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                {incident.timeText}
              </span>
            </div>
            <h4 className="font-label-lg text-label-lg font-bold text-on-surface leading-snug">
              {incident.title}
            </h4>
            <p className="text-[12px] text-on-surface-variant flex items-center gap-1 truncate mt-0.5">
              <span className="material-symbols-outlined text-[15px] text-secondary shrink-0">
                location_on
              </span>
              <span className="truncate">{incident.address}</span>
            </p>
          </div>

          {/* Case 2: Thông tin Chỉ đạo từ Cơ quan địa phương (Tenant) */}
          {isTenantDispatched && (
            <div className="!p-3 bg-purple-500/10 !rounded-xl border border-purple-500/25 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-purple-900 uppercase tracking-wide flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">campaign</span>
                  Chỉ đạo từ Cơ quan địa phương (Tenant / UBND):
                </span>
                <span className="text-[11px] font-code-tabular text-purple-800 font-bold">
                  {incident.slaRemainingText || 'SLA: 2.0h'}
                </span>
              </div>
              <p className="text-body-sm text-on-surface font-medium leading-relaxed bg-white/70 !p-2 !rounded-lg border border-purple-200/50">
                "{incident.tenantDirective || 'UBND Phường yêu cầu Đội cử lực lượng kiểm tra, xử lý khẩn cấp và báo cáo tiến độ.'}"
              </p>
            </div>
          )}

          {/* Thông tin Đội tiếp nhận & Trưởng team đại diện */}
          <div className="!p-3 bg-surface-container-low !rounded-xl border border-outline-variant/20 flex flex-col gap-2">
            <span className="text-[11px] font-label-sm font-bold uppercase text-outline tracking-wide">
              Đơn vị tiếp nhận nhiệm vụ
            </span>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-10 h-10 !rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-label-lg shrink-0 shadow-xs">
                  B
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-label-lg text-label-lg text-on-surface font-bold">
                      Đội Phản ứng nhanh số 1
                    </span>
                    <span className="text-[10px] font-bold !px-1.5 !py-0.2 rounded bg-primary/10 text-primary uppercase">
                      Đội của bạn
                    </span>
                  </div>
                  <span className="text-body-sm text-primary font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">badge</span>
                    <span>Đội trưởng đại diện: Đ/c Nguyễn Văn Bình</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-on-surface-variant bg-surface-container !p-2 !rounded-lg border border-outline-variant/15 flex items-start gap-1.5 leading-relaxed">
              <span className="material-symbols-outlined text-[16px] text-secondary shrink-0 mt-0.5">
                info
              </span>
              <span>
                Theo phân cấp công vụ, <strong>Trưởng team</strong> đại diện tiếp nhận nhiệm vụ cho toàn đội tác chiến. Không phân công lẻ cho từng cá nhân.
              </span>
            </div>
          </div>

          {/* Ghi chú phản hồi thực địa tùy chọn */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-sm text-label-sm font-semibold text-on-surface-variant uppercase">
              Ghi chú tiếp nhận (Tùy chọn)
            </label>
            <input
              type="text"
              value={fieldNote}
              onChange={(e) => setFieldNote(e.target.value)}
              placeholder={
                isTenantDispatched
                  ? 'Ví dụ: Đã nhận lệnh, kíp trực xuất phát lúc 15:45...'
                  : 'Ví dụ: Đội tuần tra phát hiện tại số nhà 24...'
              }
              className="w-full !p-2.5 bg-surface-container-low !rounded-lg border border-outline-variant/40 text-body-sm text-on-surface focus:outline-none focus:border-primary font-medium"
            />
          </div>
        </div>

        {/* Action Footer */}
        <div className="!p-4 bg-surface-container border-t border-outline-variant/20 flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-11 !rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md font-semibold transition-colors cursor-pointer"
          >
            Hủy bỏ
          </button>

          <button
            type="button"
            onClick={handleConfirmAction}
            className={`flex-2 h-11 !rounded-xl text-white font-label-md text-label-md font-bold flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-98 cursor-pointer ${
              isTenantDispatched
                ? 'bg-purple-700 hover:bg-purple-800'
                : 'bg-[#0084A3] hover:bg-[#006e87]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isTenantDispatched ? 'assignment_turned_in' : 'check_circle'}
            </span>
            <span>Nhận việc</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DispatchModal;
