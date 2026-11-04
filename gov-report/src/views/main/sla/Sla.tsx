import React, { useState, useEffect, useMemo } from "react";
import SlaHeader from "./components/SlaHeader";
import SlaKpiCards from "./components/SlaKpiCards";
import SlaFilterBar from "./components/SlaFilterBar";
import SlaTable, {
  SlaCategory,
  INITIAL_SLA_CATEGORIES,
} from "./components/SlaTable";
import SlaFieldPhotos from "./components/SlaFieldPhotos";
import SlaDrawer from "./components/SlaDrawer";
import SlaHistoryModal from "./components/SlaHistoryModal";

const Sla: React.FC = () => {
  const [categories, setCategories] = useState<SlaCategory[]>(
    INITIAL_SLA_CATEGORIES
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<SlaCategory | null>(
    null
  );

  // History modal state
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historyCode, setHistoryCode] = useState("HO_GA");

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  // Lọc danh mục sự cố
  const filteredCategories = useMemo(() => {
    return categories.filter((item) => {
      // Tìm kiếm từ khóa
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase().trim();
        const matchesCode = item.code.toLowerCase().includes(term);
        const matchesName = item.name.toLowerCase().includes(term);
        const matchesAgency = item.agency.toLowerCase().includes(term);
        const matchesSub = item.subDescription.toLowerCase().includes(term);
        if (!matchesCode && !matchesName && !matchesAgency && !matchesSub) {
          return false;
        }
      }

      // Bộ lọc trạng thái
      if (statusFilter === "active" && !item.isActive) return false;
      if (statusFilter === "paused" && item.isActive) return false;

      return true;
    });
  }, [categories, searchTerm, statusFilter]);

  // Bật/tắt trạng thái tiếp nhận
  const handleToggleActive = (code: string) => {
    setCategories((prev) =>
      prev.map((item) => {
        if (item.code === code) {
          const nextActive = !item.isActive;
          showToast(
            nextActive
              ? "Đã kích hoạt trạng thái tiếp nhận trực tuyến."
              : "Đã tạm ngưng tiếp nhận danh mục sự cố này."
          );
          return { ...item, isActive: nextActive };
        }
        return item;
      })
    );
  };

  // Mở drawer thêm mới
  const handleOpenNewDrawer = () => {
    setEditingCategory(null);
    setIsDrawerOpen(true);
  };

  // Mở drawer chỉnh sửa
  const handleOpenEditDrawer = (category: SlaCategory) => {
    setEditingCategory(category);
    setIsDrawerOpen(true);
  };

  // Mở modal lịch sử
  const handleShowHistory = (code: string) => {
    setHistoryCode(code);
    setIsHistoryOpen(true);
  };

  // Lưu cấu hình từ drawer
  const handleSaveSla = (data: {
    code: string;
    name: string;
    agency: string;
    responseHours: number;
    resolveHours: number;
    auditReason: string;
    isNew: boolean;
  }) => {
    if (data.isNew) {
      const newCategory: SlaCategory = {
        code: data.code,
        dotColor: "bg-secondary",
        name: data.name,
        subDescription: "Danh mục phân bổ mới",
        responseHours: data.responseHours,
        responseLabel:
          data.responseHours === 1
            ? "1 giờ (Khẩn)"
            : `${data.responseHours} giờ`,
        isUrgent: data.responseHours === 1,
        resolveHours: data.resolveHours,
        resolveLabel: `${data.resolveHours} giờ`,
        isActive: true,
        agency: data.agency,
      };
      setCategories((prev) => [newCategory, ...prev]);
    } else {
      setCategories((prev) =>
        prev.map((item) => {
          if (item.code === data.code) {
            return {
              ...item,
              name: data.name || item.name,
              agency: data.agency || item.agency,
              responseHours: data.responseHours,
              responseLabel:
                data.responseHours === 1
                  ? "1 giờ (Khẩn)"
                  : `${data.responseHours} giờ`,
              isUrgent: data.responseHours === 1,
              resolveHours: data.resolveHours,
              resolveLabel: `${data.resolveHours} giờ`,
            };
          }
          return item;
        })
      );
    }

    setIsDrawerOpen(false);
    showToast("Đã lưu cấu hình SLA và ghi vết thành công vào system_audit_logs.");
  };

  const handleExport = () => {
    showToast("Đã xuất khung chỉ tiêu SLA (Định dạng Excel / JSON) thành công.");
  };

  const handleRefresh = () => {
    showToast("Đã làm mới dữ liệu và đồng bộ lại với máy chủ điều phối IOC.");
  };

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Toast Notification */}
      <div
        className={`fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-space-md py-space-sm rounded shadow-lg flex items-center gap-3 transition-all duration-300 ${
          toastMessage
            ? "translate-y-0 opacity-100"
            : "translate-y-24 opacity-0 pointer-events-none"
        }`}
        id="toastNotification"
      >
        <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">
          check_circle
        </span>
        <div className="flex flex-col">
          <span className="font-label-md text-label-md font-semibold">
            Thông báo hệ thống
          </span>
          <span
            className="font-body-sm text-body-sm text-on-primary-container"
            id="toastMessage"
          >
            {toastMessage}
          </span>
        </div>
      </div>

      {/* Header */}
      <SlaHeader
        onOpenNewDrawer={handleOpenNewDrawer}
        onExport={handleExport}
      />

      {/* Thẻ tóm tắt quy chuẩn SLA toàn quốc (3 thẻ bento) */}
      <SlaKpiCards />

      {/* Thanh bộ lọc thao tác phẳng */}
      <SlaFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        filteredCount={filteredCategories.length}
        totalCount={categories.length}
        onRefresh={handleRefresh}
      />

      {/* Bảng Dữ Liệu Danh Mục & SLA Chuẩn Quốc Gia */}
      <SlaTable
        categories={filteredCategories}
        onToggleActive={handleToggleActive}
        onOpenEditDrawer={handleOpenEditDrawer}
        onShowHistory={handleShowHistory}
      />

      {/* Phần bối cảnh hình ảnh thực địa hạ tầng */}
      <SlaFieldPhotos />

      {/* SLIDE-OVER DRAWER */}
      <SlaDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        category={editingCategory}
        onSave={handleSaveSla}
      />

      {/* MODAL LỊCH SỬ ĐIỀU CHỈNH */}
      <SlaHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        categoryCode={historyCode}
      />
    </div>
  );
};

export default Sla;
