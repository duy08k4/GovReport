import React, { useState } from "react";

interface CreateAgencyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (agencyData: {
    code: string;
    name: string;
    parentName: string;
    level: string;
    category: string;
    hotline: string;
    isActive: boolean;
  }) => void;
}

const CreateAgencyDrawer: React.FC<CreateAgencyDrawerProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [parentName, setParentName] = useState("UBND-HN - Ủy ban Nhân dân Thành phố Hà Nội");
  const [level, setLevel] = useState("Quận / Huyện");
  const [category, setCategory] = useState("Hành chính công");
  const [hotline, setHotline] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !name.trim()) {
      alert("Vui lòng nhập đầy đủ Mã cơ quan và Tên cơ quan.");
      return;
    }

    onSave({
      code: code.trim().toUpperCase(),
      name: name.trim(),
      parentName,
      level,
      category,
      hotline: hotline.trim(),
      isActive,
    });

    // Reset form
    setCode("");
    setName("");
    setHotline("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-on-background/40 z-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-lg bg-surface-container-lowest shadow-2xl z-50 transition-transform duration-200 flex flex-col justify-between">
        {/* Drawer Header */}
        <div className="p-space-md bg-surface-container-high flex items-center justify-between border-b border-outline-variant/30">
          <div className="flex items-center gap-space-xs">
            <div className="w-8 h-8 rounded bg-primary-container text-surface flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">add_business</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-base sm:text-headline-sm text-on-surface font-semibold">
                Khởi Tạo Đơn Vị Tác Chiến
              </span>
              <span className="font-code-tabular text-[11px] text-on-surface-variant">
                Đăng ký Tenant vào mạng lưới hạ tầng quốc gia
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
            type="button"
            aria-label="Đóng"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Drawer Form Body */}
        <form onSubmit={handleSubmit} className="p-space-lg flex-1 overflow-y-auto flex flex-col gap-space-md font-body-sm text-body-sm">
          <div className="p-space-sm rounded bg-surface-container-low flex items-start gap-2 text-on-surface-variant text-[12px] border border-outline-variant/30">
            <span className="material-symbols-outlined text-secondary text-[18px] shrink-0">info</span>
            <span>
              Mã Tenant (tenant_code) là khóa định danh cố định không thể chỉnh sửa sau khi khởi tạo. Đảm bảo đúng chuẩn định danh hành chính của Bộ Nội vụ.
            </span>
          </div>

          {/* Form Field: Mã cơ quan */}
          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm font-semibold text-on-surface">
              Mã cơ quan (tenant_code) <span className="text-error">*</span>
            </label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              required
              className="h-9 px-3 rounded bg-surface-container-low font-code-tabular text-code-tabular text-on-surface uppercase focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/40"
              placeholder="VD: UBND-BD, SXD-DN, CX-HP"
              type="text"
            />
            <span className="font-label-sm text-[11px] text-outline">
              Ký tự viết hoa, dấu gạch nối, không chứa dấu cách tiếng Việt.
            </span>
          </div>

          {/* Form Field: Tên đơn vị */}
          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm font-semibold text-on-surface">
              Tên cơ quan đầy đủ <span className="text-error">*</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-9 px-3 rounded bg-surface-container-low text-on-surface focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/40"
              placeholder="VD: Ủy ban Nhân dân Huyện Đông Anh"
              type="text"
            />
          </div>

          {/* Form Field: Cấp trên trực tiếp */}
          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm font-semibold text-on-surface">
              Thuộc cơ quan cấp trên (parent_tenant_id)
            </label>
            <div className="relative">
              <select
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-full h-9 px-3 pr-8 rounded bg-surface-container-low text-on-surface appearance-none focus:outline-none border border-outline-variant/40"
              >
                <option value="Tối cao">-- Là cơ quan điều phối tối cao (Không có cấp trên) --</option>
                <option value="UBND-HN">UBND-HN - Ủy ban Nhân dân Thành phố Hà Nội</option>
                <option value="UBND-HCM">UBND-HCM - Ủy ban Nhân dân Thành phố Hồ Chí Minh</option>
                <option value="UBND-DN">UBND-DN - Ủy ban Nhân dân Thành phố Đà Nẵng</option>
                <option value="SXD-HN">SXD-HN - Sở Xây Dựng TP. Hà Nội</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-[16px] pointer-events-none text-on-surface-variant">
                expand_more
              </span>
            </div>
          </div>

          {/* Form Row: Cấp hành chính & Phân loại */}
          <div className="grid grid-cols-2 gap-space-sm">
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm font-semibold text-on-surface">
                Cấp hành chính
              </label>
              <div className="relative">
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full h-9 px-3 pr-8 rounded bg-surface-container-low text-on-surface appearance-none focus:outline-none border border-outline-variant/40"
                >
                  <option value="Tỉnh / Thành phố">Tỉnh / Thành phố</option>
                  <option value="Quận / Huyện">Quận / Huyện</option>
                  <option value="Xã / Phường">Xã / Phường</option>
                  <option value="DN Công ích">DN Công ích</option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-[16px] pointer-events-none text-on-surface-variant">
                  expand_more
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm font-semibold text-on-surface">
                Phân loại ngành
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-9 px-3 pr-8 rounded bg-surface-container-low text-on-surface appearance-none focus:outline-none border border-outline-variant/40"
                >
                  <option value="Hành chính công">Hành chính công</option>
                  <option value="Giao thông & Cầu đường">Giao thông &amp; Cầu đường</option>
                  <option value="Cấp thoát nước">Cấp thoát nước</option>
                  <option value="Cây xanh & Chiếu sáng">Cây xanh &amp; Chiếu sáng</option>
                  <option value="Môi trường đô thị">Môi trường đô thị</option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-[16px] pointer-events-none text-on-surface-variant">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          {/* Form Field: Hotline */}
          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm font-semibold text-on-surface">
              Đường dây nóng trực ban 24/7
            </label>
            <input
              value={hotline}
              onChange={(e) => setHotline(e.target.value)}
              className="h-9 px-3 rounded bg-surface-container-low text-on-surface focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/40"
              placeholder="VD: 024.3825.xxxx / 1022 nhánh 3"
              type="text"
            />
          </div>

          {/* Status Toggle Checkbox */}
          <div className="p-space-sm rounded bg-surface-container-low flex items-center justify-between border border-outline-variant/30">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm font-semibold text-on-surface">
                Kích hoạt điều phối ngay (active)
              </span>
              <span className="text-[11px] text-on-surface-variant">
                Cho phép nhận phiếu sự cố tự động theo ranh giới GIS
              </span>
            </div>
            <input
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 rounded text-secondary focus:ring-0 cursor-pointer"
              type="checkbox"
            />
          </div>
        </form>

        {/* Drawer Footer Actions */}
        <div className="p-space-md bg-surface-container-high flex items-center justify-end gap-space-sm border-t border-outline-variant/30">
          <button
            onClick={onClose}
            className="h-9 px-space-md rounded bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors border border-outline-variant/40"
            type="button"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleSubmit}
            className="h-9 px-space-md rounded bg-primary-container text-surface font-label-md text-label-md hover:bg-primary transition-colors flex items-center gap-1.5 shadow-sm font-semibold"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">save</span>
            <span>Xác nhận tạo cơ quan</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateAgencyDrawer;
