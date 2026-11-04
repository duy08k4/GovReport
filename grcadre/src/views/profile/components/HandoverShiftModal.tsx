import React, { useState } from 'react';
import { CadreProfile } from '../types';
import { CADRE_HANDOVER_EQUIPMENT } from '../../../config/static/CadreConfig';

interface HandoverShiftModalProps {
  isOpen: boolean;
  profile: CadreProfile;
  onClose: () => void;
  onConfirm: (notes: string) => void;
}

export const HandoverShiftModal: React.FC<HandoverShiftModalProps> = ({
  isOpen,
  profile,
  onClose,
  onConfirm,
}) => {
  const [equipmentChecked, setEquipmentChecked] = useState<Record<string, boolean>>(() =>
    CADRE_HANDOVER_EQUIPMENT.reduce((acc, item) => ({ ...acc, [item.id]: item.defaultChecked }), {})
  );
  const [notes, setNotes] = useState('');
  const [receiver, setReceiver] = useState('Đ/c Lê Hoàng Nam - Kíp trưởng Kíp 2');

  const toggleEquipment = (id: string) => {
    setEquipmentChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(notes);
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
            <span className="material-symbols-outlined text-[22px]">published_with_changes</span>
            <span className="font-headline-sm text-[16px] font-bold">
              Bàn Giao Ca Trực &amp; Biên Bản Số
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
          {/* Shift info summary */}
          <div className="!p-3 bg-surface-container-low !rounded-lg border border-outline-variant/15 text-body-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="text-on-surface-variant text-[11px] font-label-sm">Cán bộ bàn giao:</span>
              <span className="text-primary font-bold">{profile.name} ({profile.code})</span>
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-on-surface-variant text-[11px] font-label-sm">Thời gian trong ca:</span>
              <span className="text-secondary font-semibold font-code-tabular">{profile.sessionDuration}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-on-surface-variant text-[11px] font-label-sm">Địa bàn chốt trực:</span>
              <span className="text-on-surface font-medium">{profile.agencyUnit}</span>
            </div>
          </div>

          {/* Receiver Cadre */}
          <div>
            <label className="block text-label-sm font-label-sm text-on-surface-variant mb-1 font-semibold uppercase">
              Cán bộ nhận bàn giao ca tiếp theo
            </label>
            <select
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              className="w-full !p-2.5 bg-surface !rounded-lg border border-outline-variant/30 text-body-md text-on-surface focus:outline-none focus:border-secondary font-medium"
            >
              <option value="Đ/c Lê Hoàng Nam - Kíp trưởng Kíp 2">Đ/c Lê Hoàng Nam - Kíp trưởng Kíp 2</option>
              <option value="Đ/c Vũ Thị Mai - Chuyên viên Giám sát Kíp 2">Đ/c Vũ Thị Mai - Chuyên viên Kíp 2</option>
              <option value="Đ/c Phạm Quốc Tuấn - Cán bộ Tuần tra Kíp 2">Đ/c Phạm Quốc Tuấn - Cán bộ Kíp 2</option>
            </select>
          </div>

          {/* Inventory checklist */}
          <div>
            <label className="block text-label-sm font-label-sm text-on-surface-variant mb-1.5 font-semibold uppercase">
              Kiểm đếm trang thiết bị tác chiến
            </label>
            <div className="space-y-2">
              {CADRE_HANDOVER_EQUIPMENT.map((item) => (
                <label key={item.id} className="flex items-center gap-2.5 !p-2 bg-surface !rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(equipmentChecked[item.id])}
                    onChange={() => toggleEquipment(item.id)}
                    className="!rounded text-secondary w-4 h-4 accent-secondary"
                  />
                  <span className="text-body-sm font-medium text-on-surface">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-label-sm font-label-sm text-on-surface-variant mb-1 font-semibold uppercase">
              Ghi chú hiện trường bàn giao
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Nhập ghi chú tình hình trật tự địa bàn bàn giao..."
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
              className="flex-1 !py-2.5 !px-3 !rounded-lg bg-primary text-on-primary font-semibold text-label-md flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#1E3A5F] transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">draw</span>
              <span>Ký số &amp; Bàn giao</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HandoverShiftModal;
