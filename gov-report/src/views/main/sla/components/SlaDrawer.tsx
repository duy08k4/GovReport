import React, { useState, useEffect } from "react";
import { SlaCategory } from "./SlaTable";

interface SlaDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  category: SlaCategory | null; // null if adding new
  onSave: (data: {
    code: string;
    name: string;
    agency: string;
    responseHours: number;
    resolveHours: number;
    auditReason: string;
    isNew: boolean;
  }) => void;
}

const RESPONSE_OPTIONS = [1, 2, 4, 8];
const RESOLVE_OPTIONS = [6, 12, 24, 48];

const SlaDrawer: React.FC<SlaDrawerProps> = ({
  isOpen,
  onClose,
  category,
  onSave,
}) => {
  const isNew = category === null;

  const [code, setCode] = useState("DANH_MUC_MOI");
  const [name, setName] = useState("Thiết lập danh mục hạ tầng mới");
  const [agency, setAgency] = useState("Cty Thoát Nước Đô Thị");
  const [responseHours, setResponseHours] = useState(1);
  const [resolveHours, setResolveHours] = useState(6);
  const [auditReason, setAuditReason] = useState(
    "Theo Nghị quyết tăng cường an toàn giao thông mùa mưa bão năm 2025 của UBND Thành phố."
  );

  useEffect(() => {
    if (category) {
      setCode(category.code);
      setName(category.name);
      setAgency(category.agency);
      setResponseHours(category.responseHours);
      setResolveHours(category.resolveHours);
      setAuditReason(
        "Theo Nghị quyết tăng cường an toàn giao thông mùa mưa bão năm 2025 của UBND Thành phố."
      );
    } else {
      setCode("SU_CO_MOI");
      setName("Sự cố hạ tầng công ích mới");
      setAgency("Cty Môi Trường Đô Thị (URENCO)");
      setResponseHours(2);
      setResolveHours(12);
      setAuditReason("Bổ sung danh mục quản lý theo quyết định phân cấp mới.");
    }
  }, [category, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditReason.trim()) {
      alert("Vui lòng nhập căn cứ pháp lý & lý do can thiệp.");
      return;
    }

    onSave({
      code,
      name,
      agency,
      responseHours,
      resolveHours,
      auditReason: auditReason.trim(),
      isNew,
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Drawer */}
      <aside
        className={`fixed right-0 top-0 h-screen w-full max-w-xl bg-surface-container-lowest shadow-2xl z-50 flex flex-col justify-between transform transition-transform duration-300 ease-in-out border-l border-outline-variant/30 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        id="slaDrawer"
      >
        {/* Drawer Header */}
        <div className="px-space-lg py-space-md bg-surface-container-lowest flex items-center justify-between shrink-0 border-b border-outline-variant/30">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold tracking-wider">
              Cấu hình thời hạn SLA
            </span>
            <h2 className="font-headline-md text-xl sm:text-headline-md text-primary font-bold">
              {isNew ? "Thêm Mới Danh Mục & Cam Kết SLA" : `Điều Chỉnh Khung SLA: ${code}`}
            </h2>
          </div>
          <button
            className="p-2 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            onClick={onClose}
            type="button"
            aria-label="Đóng bảng cấu hình"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Drawer Body */}
        <form
          id="slaForm"
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-space-lg py-space-md space-y-space-md"
        >
          {/* Thông tin danh mục chọn */}
          <div className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-xs border border-outline-variant/20">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                Danh mục lựa chọn:
              </span>
              <span className="font-code-tabular text-code-tabular font-bold px-2 py-0.5 rounded bg-primary-container text-surface">
                {code}
              </span>
            </div>
            {isNew ? (
              <div className="space-y-2 mt-1">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface font-medium">
                    Mã danh mục (Viết hoa, gạch dưới):
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase().replace(/\s+/g, "_"))}
                    className="w-full h-8 px-2.5 mt-0.5 rounded bg-surface-container-lowest border border-outline-variant/40 font-code-tabular text-sm text-primary font-semibold"
                    required
                  />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface font-medium">
                    Tên hiển thị người dân:
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-8 px-2.5 mt-0.5 rounded bg-surface-container-lowest border border-outline-variant/40 font-body-sm text-sm text-on-surface"
                    required
                  />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface font-medium">
                    Đơn vị chịu trách nhiệm:
                  </label>
                  <input
                    type="text"
                    value={agency}
                    onChange={(e) => setAgency(e.target.value)}
                    className="w-full h-8 px-2.5 mt-0.5 rounded bg-surface-container-lowest border border-outline-variant/40 font-body-sm text-sm text-on-surface"
                    required
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  {name}
                </div>
                <div className="text-body-sm font-body-sm text-outline">
                  Đơn vị chịu trách nhiệm: {agency}
                </div>
              </>
            )}
          </div>

          {/* Form cấu hình cam kết SLA */}
          <div className="space-y-4">
            {/* Khung 1: Cam kết tiếp nhận */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface font-semibold flex items-center justify-between">
                <span>Thời gian tiếp nhận thông tin (Giờ)</span>
                {responseHours === 1 ? (
                  <span className="text-error font-body-sm text-body-sm font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">bolt</span>
                    Mức độ: Khẩn cấp (1h)
                  </span>
                ) : (
                  <span className="text-secondary font-body-sm text-body-sm font-medium">
                    Tiêu chuẩn thông thường
                  </span>
                )}
              </label>

              <div className="grid grid-cols-4 gap-2">
                {RESPONSE_OPTIONS.map((h) => {
                  const isSelected = responseHours === h;
                  return (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setResponseHours(h)}
                      className={`h-10 rounded font-code-tabular text-code-tabular font-bold transition-all flex items-center justify-center cursor-pointer ${
                        isSelected
                          ? "bg-secondary text-on-secondary shadow-sm"
                          : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                      }`}
                    >
                      {h} Giờ
                    </button>
                  );
                })}
              </div>
              <p className="font-body-sm text-body-sm text-outline">
                Cột mốc từ khi công dân gửi đơn đến khi Điều phối viên phân đơn sang đơn vị trực hiện trường.
              </p>
            </div>

            {/* Khung 2: Cam kết xử lý dứt điểm */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface font-semibold">
                Thời gian xử lý dứt điểm (Giờ)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {RESOLVE_OPTIONS.map((h) => {
                  const isSelected = resolveHours === h;
                  return (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setResolveHours(h)}
                      className={`h-10 rounded font-code-tabular text-code-tabular font-bold transition-all flex items-center justify-center cursor-pointer ${
                        isSelected
                          ? "bg-secondary text-on-secondary shadow-sm"
                          : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                      }`}
                    >
                      {h} Giờ
                    </button>
                  );
                })}
              </div>
              <p className="font-body-sm text-body-sm text-outline">
                Thời gian nghiệm thu hiện trường có ảnh chụp thực tế và xác nhận hoàn tất.
              </p>
            </div>

            {/* Khung 3: Lý do can thiệp (Bắt buộc cho Nhật ký kiểm toán) */}
            <div className="flex flex-col gap-1.5">
              <label
                className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1"
                htmlFor="auditReason"
              >
                <span>Căn cứ pháp lý &amp; Lý do can thiệp</span>
                <span className="text-error">*</span>
              </label>
              <textarea
                className="w-full p-space-sm rounded bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 transition-colors resize-none border border-outline-variant/30"
                id="auditReason"
                rows={3}
                placeholder="Nhập số văn bản, nghị quyết hoặc chỉ đạo của UBND tỉnh..."
                value={auditReason}
                onChange={(e) => setAuditReason(e.target.value)}
                required
              />
              <div className="flex items-center gap-1.5 text-on-tertiary-container font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[16px]">lock</span>
                <span>
                  Hệ thống tự động ghi nhật ký vào bảng{" "}
                  <code className="font-code-tabular font-semibold">system_audit_logs</code> với danh tính Root Admin.
                </span>
              </div>
            </div>

            {/* Khung 4: Ghi chú cảnh báo hiệu lực */}
            <div className="p-space-md rounded bg-surface-container text-on-surface-variant font-body-sm text-body-sm flex gap-3 items-start border border-outline-variant/20">
              <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">
                info
              </span>
              <div className="leading-relaxed">
                Khung giờ mới sẽ có hiệu lực tức thời đối với{" "}
                <strong className="text-on-surface">tất cả các vé sự cố phát sinh sau thời điểm lưu</strong>. Các vé đang trong chu trình xử lý trước đó vẫn áp dụng SLA cũ.
              </div>
            </div>
          </div>
        </form>

        {/* Drawer Footer */}
        <div className="px-space-lg py-space-md bg-surface-container-lowest flex items-center justify-end gap-space-sm shrink-0 border-t border-outline-variant/30">
          <button
            className="px-space-md h-9 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg transition-colors cursor-pointer font-medium"
            onClick={onClose}
            type="button"
          >
            Hủy thao tác
          </button>
          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 px-space-md h-9 rounded bg-secondary hover:bg-on-secondary-container text-on-secondary font-label-lg text-label-lg shadow-sm transition-colors cursor-pointer font-semibold"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Xác nhận &amp; Cập nhật SLA</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default SlaDrawer;
