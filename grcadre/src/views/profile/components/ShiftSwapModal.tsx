import React, { useState } from 'react';
import { CadreProfile } from '../types';

interface ShiftSwapModalProps {
  isOpen: boolean;
  profile: CadreProfile;
  onClose: () => void;
  onConfirm: (data: { reason: string; date: string; substitute: string }) => void;
}

export const ShiftSwapModal: React.FC<ShiftSwapModalProps> = ({
  isOpen,
  profile,
  onClose,
  onConfirm,
}) => {
  const [reasonType, setReasonType] = useState('Nghỉ phép chế độ thường niên');
  const [targetDate, setTargetDate] = useState('2026-10-26');
  const [substitute, setSubstitute] = useState('Đ/c Lê Hoàng Nam (Kíp 2)');
  const [customReason, setCustomReason] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      reason: `${reasonType}: ${customReason || 'Theo kế hoạch'}`,
      date: targetDate,
      substitute,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center !p-0 sm:!p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="w-full max-w-md bg-surface-container-lowest !rounded-t-2xl sm:!rounded-2xl shadow-xl flex flex-col max-h-[90vh] overflow-hidden border border-outline-variant/20 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="!p-4 bg-primary text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px]">event_busy</span>
            <span className="font-headline-sm text-[16px] font-bold">
              Đăng Ký Nghỉ Phép / Đổi Ca
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 !rounded-full hover:bg-white/10 flex items-center justify-center text-on-primary cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="!p-4 space-y-3.5 overflow-y-auto">
          {/* Reason Type */}
          <div>
            <label className="block text-label-sm font-label-sm text-on-surface-variant mb-1 font-semibold uppercase">
              Hình thức đăng ký
            </label>
            <select
              value={reasonType}
              onChange={(e) => setReasonType(e.target.value)}
              className="w-full !p-2.5 bg-surface !rounded-lg border border-outline-variant/30 text-body-md text-on-surface focus:outline-none focus:border-secondary font-medium"
            >
              <option value="Nghỉ phép chế độ thường niên">Nghỉ phép chế độ thường niên</option>
              <option value="Việc gia đình đột xuất">Việc gia đình đột xuất</option>
              <option value="Đi tập huấn / học tập nghiệp vụ">Đi tập huấn / học tập nghiệp vụ</option>
              <option value="Đổi ca trực tương ứng với đồng đội">Đổi ca trực tương ứng với đồng đội</option>
            </select>
          </div>

          {/* Date & Shift */}
          <div className="grid grid-cols-2 gap-space-sm">
            <div>
              <label className="block text-label-sm font-label-sm text-on-surface-variant mb-1 font-semibold uppercase">
                Ngày đề xuất
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full !p-2.5 bg-surface !rounded-lg border border-outline-variant/30 text-body-sm text-on-surface focus:outline-none focus:border-secondary font-medium"
              />
            </div>
            <div>
              <label className="block text-label-sm font-label-sm text-on-surface-variant mb-1 font-semibold uppercase">
                Kíp trực
              </label>
              <select className="w-full !p-2.5 bg-surface !rounded-lg border border-outline-variant/30 text-body-sm text-on-surface focus:outline-none focus:border-secondary font-medium">
                <option value="1">Ca ngày (06:00 - 14:00)</option>
                <option value="2">Ca chiều (14:00 - 22:00)</option>
                <option value="3">Ca đêm (22:00 - 06:00)</option>
              </select>
            </div>
          </div>

          {/* Substitute Cadre */}
          <div>
            <label className="block text-label-sm font-label-sm text-on-surface-variant mb-1 font-semibold uppercase">
              Cán bộ trực thay / Đổi ca
            </label>
            <select
              value={substitute}
              onChange={(e) => setSubstitute(e.target.value)}
              className="w-full !p-2.5 bg-surface !rounded-lg border border-outline-variant/30 text-body-md text-on-surface focus:outline-none focus:border-secondary font-medium"
            >
              <option value="Đ/c Lê Hoàng Nam (Kíp 2)">Đ/c Lê Hoàng Nam (Kíp 2)</option>
              <option value="Đ/c Vũ Thị Mai (Kíp 2)">Đ/c Vũ Thị Mai (Kíp 2)</option>
              <option value="Đ/c Trần Quốc Tuấn (Kíp 3)">Đ/c Trần Quốc Tuấn (Kíp 3)</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-label-sm font-label-sm text-on-surface-variant mb-1 font-semibold uppercase">
              Lý do chi tiết
            </label>
            <textarea
              rows={2}
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              placeholder="Nhập lý do gửi Chỉ huy kíp phê duyệt..."
              className="w-full !p-2.5 bg-surface !rounded-lg border border-outline-variant/30 text-body-md text-on-surface focus:outline-none focus:border-secondary resize-none placeholder:text-outline"
            />
          </div>

          {/* Actions */}
          <div className="!pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 !py-2.5 !px-3 !rounded-lg bg-surface-container-high text-on-surface font-semibold text-label-md cursor-pointer hover:bg-surface-container-highest transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 !py-2.5 !px-3 !rounded-lg bg-secondary text-on-secondary font-semibold text-label-md flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#005469] transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">send</span>
              <span>Gửi Chỉ Huy Kíp</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShiftSwapModal;
