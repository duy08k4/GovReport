import React from 'react';
import { RecordScope } from '../types';

interface RecordScopeToggleProps {
  activeScope: RecordScope;
  onChangeScope: (scope: RecordScope) => void;
}

export const RecordScopeToggle: React.FC<RecordScopeToggleProps> = ({
  activeScope,
  onChangeScope,
}) => {
  return (
    <div className="!px-margin !pt-space-xs !pb-space-sm">
      <div className="!p-1 bg-surface-container rounded-lg flex items-center gap-1 border border-outline-variant/20">
        <button
          type="button"
          onClick={() => onChangeScope('agency')}
          className={`flex-1 !py-1.5 !px-2 text-center rounded-md font-label-md text-label-md transition-all cursor-pointer ${
            activeScope === 'agency'
              ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          Toàn cơ quan
        </button>

        <button
          type="button"
          onClick={() => onChangeScope('team')}
          className={`flex-1 !py-1.5 !px-2 text-center rounded-md font-label-md text-label-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeScope === 'team'
              ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
          <span>Chỉ hồ sơ Đội của tôi</span>
        </button>
      </div>
    </div>
  );
};

export default RecordScopeToggle;
