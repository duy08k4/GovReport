import React, { useState } from "react";

interface AuditEvent {
  id: string;
  code: string;
  time: string;
  dotColor: string;
  isUrgentCode?: boolean;
  content: React.ReactNode;
  metadata: string;
}

const AUDIT_EVENTS: AuditEvent[] = [
  {
    id: "evt-1",
    code: "SC-2026-HN09",
    time: "14:25:31",
    dotColor: "bg-secondary",
    content: (
      <>
        Chuyển trạng thái:{" "}
        <span className="px-1 py-0.5 bg-surface-container text-on-surface font-medium text-[11px]">
          Đã tiếp nhận
        </span>{" "}
        →{" "}
        <span className="px-1 py-0.5 bg-[#FFFBEB] text-[#D97706] font-medium text-[11px]">
          Đang xử lý
        </span>
      </>
    ),
    metadata: "Thực hiện: Cán bộ Trần Văn Hưng (Tổ phản ứng nhanh Q.Ba Đình)",
  },
  {
    id: "evt-2",
    code: "SC-2026-SG44",
    time: "14:23:18",
    dotColor: "bg-error",
    content: (
      <>
        Can thiệp điều phối: Chuyển quyền xử lý từ{" "}
        <strong className="font-semibold text-on-surface">UBND Q.1</strong> sang{" "}
        <strong className="font-semibold text-secondary">
          Đội Công Viên Cây Xanh 2
        </strong>
      </>
    ),
    metadata: "Lý do: Cần xe cẩu nâng chuyên dụng",
  },
  {
    id: "evt-3",
    code: "SC-2026-DN12",
    time: "14:21:05",
    dotColor: "bg-on-tertiary-container",
    content: (
      <>
        Nghiệm thu hiện trường: Đóng vé sự cố{" "}
        <span className="px-1 py-0.5 bg-[#F0FDF4] text-[#16A34A] font-medium text-[11px]">
          Đã giải quyết
        </span>
      </>
    ),
    metadata: "Kiểm chứng: Hình ảnh Geotag đối chiếu thành công",
  },
  {
    id: "evt-4",
    code: "SC-2026-HN02",
    time: "14:18:49",
    dotColor: "bg-secondary",
    content: (
      <>
        Thuật toán PostGIS ST_Contains tự động gán địa bàn:{" "}
        <strong className="font-semibold text-on-surface">Phường Cống Vị</strong>
      </>
    ),
    metadata: "Thời gian trễ phân loại: 0.08 giây",
  },
  {
    id: "evt-5",
    code: "SC-2026-SG77",
    time: "14:15:10",
    dotColor: "bg-error",
    isUrgentCode: true,
    content: (
      <>
        Kích hoạt phân loại:{" "}
        <span className="px-1 py-0.5 bg-[#FEF2F2] text-[#DC2626] font-bold text-[11px]">
          KHẨN CẤP
        </span>{" "}
        (Chập cháy cáp viễn thông)
      </>
    ),
    metadata: "Cảnh báo gửi trực tiếp đến CS PCCC & CNCH TP.HCM",
  },
];

const LiveAuditFeed: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="bg-surface-container-lowest shadow-sm flex flex-col border border-outline-variant/30">
      {/* Header */}
      <div className="px-space-md py-3 bg-surface-container-low flex items-center justify-between border-b border-outline-variant/30">
        <div className="flex items-center gap-space-xs">
          <span className="w-2 h-2 rounded-full bg-tertiary-fixed animate-ping" />
          <span className="font-label-lg text-label-lg text-on-surface uppercase tracking-wide font-bold">
            Nhật Ký Tác Chiến Trực Tiếp
          </span>
        </div>
        <span className="font-code-tabular text-[11px] text-on-surface-variant font-medium">
          report_histories
        </span>
      </div>

      {/* Timeline Stream */}
      <div
        className={`p-space-md flex flex-col gap-space-md ${
          isFullscreen ? "max-h-[500px] overflow-y-auto" : ""
        }`}
      >
        {AUDIT_EVENTS.map((event) => (
          <div key={event.id} className="flex items-start gap-space-sm relative">
            <div
              className={`w-2 h-2 rounded-full ${event.dotColor} mt-1.5 shrink-0`}
            />
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span
                  className={`font-code-tabular text-[12px] font-bold ${
                    event.isUrgentCode ? "text-error" : "text-on-surface"
                  }`}
                >
                  {event.code}
                </span>
                <span className="font-code-tabular text-[11px] text-outline">
                  {event.time}
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface mt-0.5 leading-snug">
                {event.content}
              </p>
              <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5 text-[11px]">
                {event.metadata}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Bar */}
      <div className="p-2.5 bg-surface-container-low border-t border-outline-variant/30 flex items-center justify-between">
        <span className="font-code-tabular text-[12px] text-on-surface-variant">
          Bộ đệm sự kiện: 5/1,420
        </span>
        <button
          onClick={() => setIsFullscreen((prev) => !prev)}
          className="font-label-sm text-label-sm text-secondary hover:text-on-surface font-semibold flex items-center gap-0.5 transition-colors"
          type="button"
        >
          <span>
            {isFullscreen ? "Thu nhỏ bộ đệm" : "Mở console toàn màn hình"}
          </span>
          <span className="material-symbols-outlined text-[14px]">
            {isFullscreen ? "close_fullscreen" : "open_in_new"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default LiveAuditFeed;
