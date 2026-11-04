import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../config/Routing";

interface SlaItem {
  rank: number;
  name: string;
  delayPercent: string;
  violations: string;
  avgTime: string;
  barWidth: string;
  barColor: string;
  badgeBg: string;
  badgeText: string;
}

const SLA_ITEMS: SlaItem[] = [
  {
    rank: 1,
    name: "UBND Quận 1 (TP.HCM)",
    delayPercent: "4.2% trễ",
    violations: "12 vụ",
    avgTime: "4.8 giờ",
    barWidth: "84%",
    barColor: "bg-[#DC2626]",
    badgeBg: "bg-[#FEF2F2]",
    badgeText: "text-[#DC2626]",
  },
  {
    rank: 2,
    name: "Sở GTVT Hà Nội",
    delayPercent: "3.8% trễ",
    violations: "09 vụ",
    avgTime: "3.9 giờ",
    barWidth: "76%",
    barColor: "bg-[#DC2626]",
    badgeBg: "bg-[#FEF2F2]",
    badgeText: "text-[#DC2626]",
  },
  {
    rank: 3,
    name: "Cty Thoát Nước Đô Thị",
    delayPercent: "3.1% trễ",
    violations: "07 vụ",
    avgTime: "3.2 giờ",
    barWidth: "62%",
    barColor: "bg-[#D97706]",
    badgeBg: "bg-[#FFFBEB]",
    badgeText: "text-[#D97706]",
  },
  {
    rank: 4,
    name: "UBND Quận Ba Đình (Hà Nội)",
    delayPercent: "2.5% trễ",
    violations: "05 vụ",
    avgTime: "2.6 giờ",
    barWidth: "50%",
    barColor: "bg-[#D97706]",
    badgeBg: "bg-[#FFFBEB]",
    badgeText: "text-[#D97706]",
  },
  {
    rank: 5,
    name: "Cty Chiếu Sáng Công Cộng",
    delayPercent: "2.1% trễ",
    violations: "04 vụ",
    avgTime: "2.2 giờ",
    barWidth: "42%",
    barColor: "bg-secondary",
    badgeBg: "bg-[#FFFBEB]",
    badgeText: "text-[#D97706]",
  },
];

const SlaRankingSection: React.FC = () => {
  return (
    <div className="bg-surface-container-lowest shadow-sm flex flex-col border border-outline-variant/30">
      {/* Header */}
      <div className="px-space-md py-3 bg-surface-container-low flex items-center justify-between border-b border-outline-variant/30">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-[#D97706] text-[18px]">
            warning
          </span>
          <span className="font-label-lg text-label-lg text-on-surface uppercase tracking-wide font-bold">
            Top 5 Đơn Vị Vi Phạm SLA
          </span>
        </div>
        <span className="font-label-sm text-label-sm px-1.5 py-0.5 bg-[#FFFBEB] text-[#D97706] font-code-tabular font-medium">
          Tuần này
        </span>
      </div>

      {/* List Items */}
      <div className="flex flex-col divide-y divide-outline-variant/20">
        {SLA_ITEMS.map((item) => (
          <div
            key={item.rank}
            className="p-space-md hover:bg-surface-container-low transition-colors flex flex-col gap-1.5 bg-surface-container-lowest"
          >
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                {item.rank}. {item.name}
              </span>
              <span
                className={`px-1.5 py-0.5 ${item.badgeBg} ${item.badgeText} font-code-tabular text-[11px] font-bold`}
              >
                {item.delayPercent}
              </span>
            </div>
            <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
              <span>
                Sự cố vi phạm:{" "}
                <strong className="text-on-surface font-code-tabular">
                  {item.violations}
                </strong>
              </span>
              <span>
                Xử lý TB:{" "}
                <strong className="text-on-surface font-code-tabular">
                  {item.avgTime}
                </strong>
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-surface-container h-1 mt-1 overflow-hidden">
              <div
                className={`${item.barColor} h-full transition-all duration-300`}
                style={{ width: item.barWidth }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer Link */}
      <div className="p-2.5 bg-surface-container-low text-center border-t border-outline-variant/30">
        <Link
          to={ROUTES.SLA}
          className="font-label-sm text-label-sm text-secondary hover:underline inline-flex items-center gap-1 font-semibold"
        >
          <span>Xem phân tích chi tiết SLA các đơn vị</span>
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
};

export default SlaRankingSection;
