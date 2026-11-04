import React, { useState } from "react";

interface AssignCadreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (data: {
    cadreId: string;
    cadreName: string;
    agencyKey: string;
    agencyName: string;
    tenantRole: string;
    cadreCode: string;
    title: string;
    decreeCode: string;
    syncGis: boolean;
  }) => void;
}

const CADRES = [
  { id: "1", name: "Nguyễn Minh Tuấn", uid: "USR-VN-002104", phone: "0978.***.552" },
  { id: "2", name: "Lê Hoàng Nam", uid: "USR-VN-003810", phone: "0934.***.119" },
  { id: "3", name: "Trần Thu Mai", uid: "USR-VN-000491", phone: "0912.***.341" },
  { id: "4", name: "Phạm Đức Toàn", uid: "USR-VN-005128", phone: "0945.***.672" },
];

const AGENCIES: Record<string, string> = {
  ubnd_badinh: "UBND Quận Ba Đình",
  ubnd_hoankiem: "UBND Quận Hoàn Kiếm",
  cayxanh: "Công ty TNHH MTV Cây Xanh Hà Nội",
  thoatnuoc: "Công ty TNHH MTV Thoát Nước Hà Nội",
  sgtvt: "Sở Giao Thông Vận Tải TP Hà Nội",
};

const AssignCadreModal: React.FC<AssignCadreModalProps> = ({
  isOpen,
  onClose,
  onAssign,
}) => {
  const [cadreId, setCadreId] = useState("1");
  const [agencyKey, setAgencyKey] = useState("ubnd_badinh");
  const [tenantRole, setTenantRole] = useState("dispatcher");
  const [cadreCode, setCadreCode] = useState("CV-0128");
  const [title, setTitle] = useState("Chuyên viên Quản lý Đô thị");
  const [decreeCode, setDecreeCode] = useState("412/QĐ-UBND ban hành ngày 15/01/2023");
  const [syncGis, setSyncGis] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCadre = CADRES.find((c) => c.id === cadreId);

    onAssign({
      cadreId,
      cadreName: selectedCadre ? selectedCadre.name : "Cán bộ công quyền",
      agencyKey,
      agencyName: AGENCIES[agencyKey] || "UBND Quận Ba Đình",
      tenantRole,
      cadreCode: cadreCode.trim(),
      title: title.trim(),
      decreeCode: decreeCode.trim(),
      syncGis,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-surface-container-lowest shadow-2xl flex flex-col overflow-hidden border border-outline-variant/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-space-lg py-space-md bg-primary-container text-surface-container-lowest flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary-fixed text-[22px]">
              assignment_ind
            </span>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm leading-tight font-bold">
                Phân Công Cán Bộ Vào Cơ Quan (Tenant Membership)
              </span>
              <span className="font-label-sm text-label-sm text-on-primary-container">
                Thiết lập thẩm quyền xử lý phản ánh đô thị theo đơn vị hành chính
              </span>
            </div>
          </div>
          <button
            className="text-on-primary-container hover:text-surface-container-lowest transition-colors cursor-pointer"
            onClick={onClose}
            type="button"
            aria-label="Đóng cửa sổ phân công"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Form Body */}
        <form
          className="p-space-lg flex flex-col gap-space-md max-h-[80vh] overflow-y-auto"
          id="form-assign-cadre"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            {/* Chọn cán bộ */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                Chọn cán bộ từ hệ thống danh tính *
              </label>
              <div className="relative">
                <select
                  className="w-full h-10 px-3 pr-8 bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none border border-outline-variant/30 cursor-pointer appearance-none"
                  value={cadreId}
                  onChange={(e) => setCadreId(e.target.value)}
                  required
                >
                  {CADRES.map((cadre) => (
                    <option key={cadre.id} value={cadre.id}>
                      {cadre.name} (UID: {cadre.uid} - {cadre.phone})
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-2.5 pointer-events-none text-on-surface-variant text-[18px]">
                  expand_more
                </span>
              </div>
            </div>

            {/* Cơ quan tiếp nhận */}
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                Cơ quan thụ lý chính *
              </label>
              <div className="relative">
                <select
                  className="w-full h-10 px-3 pr-8 bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none border border-outline-variant/30 cursor-pointer appearance-none"
                  value={agencyKey}
                  onChange={(e) => setAgencyKey(e.target.value)}
                  required
                >
                  <option value="ubnd_badinh">UBND Quận Ba Đình</option>
                  <option value="ubnd_hoankiem">UBND Quận Hoàn Kiếm</option>
                  <option value="cayxanh">Công ty TNHH MTV Cây Xanh Hà Nội</option>
                  <option value="thoatnuoc">Công ty TNHH MTV Thoát Nước Hà Nội</option>
                  <option value="sgtvt">Sở Giao Thông Vận Tải TP Hà Nội</option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-2.5 pointer-events-none text-on-surface-variant text-[18px]">
                  expand_more
                </span>
              </div>
            </div>

            {/* Quyền hạn trong cơ quan */}
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                Vai trò cơ sở (Tenant Role) *
              </label>
              <div className="relative">
                <select
                  className="w-full h-10 px-3 pr-8 bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none border border-outline-variant/30 cursor-pointer appearance-none"
                  value={tenantRole}
                  onChange={(e) => setTenantRole(e.target.value)}
                  required
                >
                  <option value="dispatcher">Dispatcher (Điều phối viên chính)</option>
                  <option value="field_worker">Field Worker (Cán bộ xử lý hiện trường)</option>
                  <option value="tenant_viewer">Viewer (Thanh tra / Theo dõi số liệu)</option>
                  <option value="agency_leader">Lãnh đạo phê duyệt báo cáo</option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-2.5 pointer-events-none text-on-surface-variant text-[18px]">
                  expand_more
                </span>
              </div>
            </div>

            {/* Mã ngạch công chức */}
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                Mã ngạch công chức / viên chức *
              </label>
              <input
                className="w-full h-10 px-3 bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none uppercase border border-outline-variant/30 font-code-tabular font-bold"
                placeholder="Ví dụ: CV-0128 hoặc KS-0941"
                required
                type="text"
                value={cadreCode}
                onChange={(e) => setCadreCode(e.target.value)}
              />
            </div>

            {/* Chức vụ công tác */}
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                Chức vụ cụ thể *
              </label>
              <input
                className="w-full h-10 px-3 bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none border border-outline-variant/30"
                placeholder="Ví dụ: Chuyên viên Quản lý Đô thị"
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Số quyết định điều động */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                Số Quyết định bổ nhiệm / điều động *
              </label>
              <input
                className="w-full h-10 px-3 bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none border border-outline-variant/30 font-medium"
                placeholder="Ví dụ: 412/QĐ-UBND ban hành ngày 15/01/2023"
                required
                type="text"
                value={decreeCode}
                onChange={(e) => setDecreeCode(e.target.value)}
              />
            </div>
          </div>

          <div className="p-space-sm bg-surface-container-low flex items-center gap-2 border border-outline-variant/20">
            <input
              checked={syncGis}
              onChange={(e) => setSyncGis(e.target.checked)}
              className="accent-primary cursor-pointer w-4 h-4"
              id="chk-sync-gis"
              type="checkbox"
            />
            <label
              className="font-body-sm text-body-sm text-on-surface cursor-pointer select-none"
              htmlFor="chk-sync-gis"
            >
              Tự động gán ranh giới GIS quản lý của cơ quan này vào ứng dụng hiện trường của cán bộ
            </label>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-space-sm pt-space-sm bg-surface-container-lowest border-t border-outline-variant/20">
            <button
              className="px-4 h-9 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors cursor-pointer font-medium"
              onClick={onClose}
              type="button"
            >
              Hủy thao tác
            </button>
            <button
              className="px-5 h-9 bg-primary-container text-surface-container-lowest font-label-md text-label-md hover:bg-primary transition-colors flex items-center gap-1.5 cursor-pointer font-semibold shadow-sm"
              type="submit"
            >
              <span className="material-symbols-outlined text-[16px] text-secondary-fixed">
                save
              </span>
              <span>Xác nhận phân công</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignCadreModal;
