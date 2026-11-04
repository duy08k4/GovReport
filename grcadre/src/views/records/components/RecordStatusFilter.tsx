import React from 'react';
import { RecordStatus } from '../types';
import { RECORD_FILTER_TABS } from '../../../config/static/ReportStateTag';

interface RecordStatusFilterProps {
  activeStatus: RecordStatus;
  onChangeStatus: (status: RecordStatus) => void;
  counts: Record<string, number>;
}

export const RecordStatusFilter: React.FC<RecordStatusFilterProps> = ({
  activeStatus,
  onChangeStatus,
  counts,
}) => {
  const tabs = RECORD_FILTER_TABS.map((tab) => ({
    key: tab.key as RecordStatus,
    label: tab.label,
    count: counts[tab.key] || 0,
  }));

  return (
    <div className="w-full overflow-x-auto no-scrollbar !px-margin !pb-space-sm">
      <div className="flex items-center gap-space-xs min-w-max">
        {tabs.map((tab) => {
          const isActive = activeStatus === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onChangeStatus(tab.key)}
              className={`status-tab !px-3 !py-1.5 rounded-lg font-label-md text-label-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                isActive
                  ? 'bg-primary-container text-on-primary shadow-sm font-semibold'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container border border-outline-variant/30'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`!px-1.5 !py-0.5 rounded-full text-[10px] font-code-tabular transition-colors ${
                  isActive
                    ? 'bg-surface/20 text-on-primary'
                    : 'bg-surface-container-high text-on-surface'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RecordStatusFilter;
