import React from 'react';
import { TaskScope } from '../types';

interface TaskScopeTabsProps {
  activeScope: TaskScope;
  onScopeChange: (scope: TaskScope) => void;
  myTasksCount: number;
  teamTasksCount: number;
}

export const TaskScopeTabs: React.FC<TaskScopeTabsProps> = ({
  activeScope,
  onScopeChange,
  myTasksCount,
  teamTasksCount,
}) => {
  return (
    <section className="bg-surface-container-lowest !mt-space-xs !px-margin shadow-sm">
      <div className="flex items-center gap-space-lg" role="tablist">
        {/* Tab: Việc của tôi */}
        <button
          type="button"
          role="tab"
          id="tab-my-tasks"
          aria-selected={activeScope === 'my-tasks'}
          onClick={() => onScopeChange('my-tasks')}
          className={`relative !py-3 flex items-center gap-1.5 text-label-lg font-label-lg transition-colors cursor-pointer ${
            activeScope === 'my-tasks'
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          <span>Việc của tôi</span>
          <span
            className={`!px-1.5 !py-0.5 !rounded-full text-[10px] font-bold transition-colors ${
              activeScope === 'my-tasks'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-high text-on-surface-variant'
            }`}
          >
            {myTasksCount.toString().padStart(2, '0')}
          </span>
          <span
            className={`tab-indicator absolute bottom-0 inset-x-0 h-0.5 transition-all ${
              activeScope === 'my-tasks' ? 'bg-primary' : 'bg-transparent'
            }`}
          />
        </button>

        {/* Tab: Việc chung của Đội */}
        <button
          type="button"
          role="tab"
          id="tab-team-tasks"
          aria-selected={activeScope === 'team-tasks'}
          onClick={() => onScopeChange('team-tasks')}
          className={`relative !py-3 flex items-center gap-1.5 text-label-lg font-label-lg transition-colors cursor-pointer ${
            activeScope === 'team-tasks'
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          <span>Việc chung của Đội</span>
          <span
            className={`!px-1.5 !py-0.5 !rounded-full text-[10px] font-bold transition-colors ${
              activeScope === 'team-tasks'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-high text-on-surface-variant'
            }`}
          >
            {teamTasksCount.toString().padStart(2, '0')}
          </span>
          <span
            className={`tab-indicator absolute bottom-0 inset-x-0 h-0.5 transition-all ${
              activeScope === 'team-tasks' ? 'bg-primary' : 'bg-transparent'
            }`}
          />
        </button>
      </div>
    </section>
  );
};

export default TaskScopeTabs;
