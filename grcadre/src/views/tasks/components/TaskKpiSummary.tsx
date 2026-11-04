import React from 'react';
import { KpiData } from '../types';

interface TaskKpiSummaryProps {
  data: KpiData;
  onKpiClick?: (type: 'needReceive' | 'inProgress' | 'slaWarning') => void;
}

export const TaskKpiSummary: React.FC<TaskKpiSummaryProps> = ({
  data,
  onKpiClick,
}) => {
  return (
    <section className="grid grid-cols-3 gap-2">
      {/* KPI 1: Cần nhận */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => onKpiClick?.('needReceive')}
        onKeyDown={(e) => e.key === 'Enter' && onKpiClick?.('needReceive')}
        className="bg-surface-container-lowest !p-2.5 !rounded shadow-sm flex flex-col items-center text-center cursor-pointer hover:border-primary/30 border border-transparent transition-all active:scale-95"
      >
        <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
          Cần nhận
        </span>
        <span className="text-[26px] font-code-tabular font-bold text-primary leading-tight mt-1">
          {data.needReceive.toString().padStart(2, '0')}
        </span>
        <span className="text-[10px] font-label-sm text-on-surface-variant mt-0.5">
          Ca hiện tại
        </span>
      </div>

      {/* KPI 2: Đang xử lý */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => onKpiClick?.('inProgress')}
        onKeyDown={(e) => e.key === 'Enter' && onKpiClick?.('inProgress')}
        className="bg-surface-container-lowest !p-2.5 !rounded shadow-sm flex flex-col items-center text-center cursor-pointer hover:border-[#D97706]/30 border border-transparent transition-all active:scale-95"
      >
        <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
          Đang xử lý
        </span>
        <span className="text-[26px] font-code-tabular font-bold text-[#D97706] leading-tight mt-1">
          {data.inProgress.toString().padStart(2, '0')}
        </span>
        <span className="text-[10px] font-label-sm text-[#D97706] mt-0.5 font-medium">
          Hiện trường
        </span>
      </div>

      {/* KPI 3: Sắp chạm SLA */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => onKpiClick?.('slaWarning')}
        onKeyDown={(e) => e.key === 'Enter' && onKpiClick?.('slaWarning')}
        className="bg-surface-container-lowest !p-2.5 !rounded shadow-sm flex flex-col items-center text-center cursor-pointer hover:border-[#DC2626]/30 border border-transparent transition-all active:scale-95"
      >
        <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
          Sắp chạm SLA
        </span>
        <span className="text-[26px] font-code-tabular font-bold text-[#DC2626] leading-tight mt-1">
          {data.slaWarning.toString().padStart(2, '0')}
        </span>
        <span className="text-[10px] font-label-sm text-[#DC2626] mt-0.5 font-medium">
          &lt; 30 phút
        </span>
      </div>
    </section>
  );
};

export default TaskKpiSummary;
