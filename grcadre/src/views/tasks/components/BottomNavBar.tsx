import React from 'react';

export type BottomNavTab = 'tasks' | 'map' | 'records' | 'profile';

interface BottomNavBarProps {
  activeTab: BottomNavTab;
  onTabSelect: (tab: BottomNavTab) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabSelect,
}) => {
  const navItems = [
    {
      key: 'tasks' as BottomNavTab,
      label: 'Tác vụ',
      icon: 'assignment_turned_in',
      dataPath: 'danh-sach-tac-vu',
    },
    {
      key: 'map' as BottomNavTab,
      label: 'Bản đồ',
      icon: 'map',
      dataPath: 'ban-do-tac-chien',
    },
    {
      key: 'records' as BottomNavTab,
      label: 'Hồ sơ',
      icon: 'folder_open',
      dataPath: 'ho-so-hien-truong',
    },
    {
      key: 'profile' as BottomNavTab,
      label: 'Cán bộ',
      icon: 'account_circle',
      dataPath: 'thong-tin-can-bo',
    },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 !pb-safe bg-surface/90 backdrop-blur-xl border-t border-outline-variant/20 shadow-[0_-1px_6px_rgba(0,0,0,0.03)]">
      <div className="max-w-md mx-auto flex items-center justify-around h-16 !px-space-xs">
        {navItems.map((item) => {
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              type="button"
              data-path={item.dataPath}
              onClick={() => onTabSelect(item.key)}
              className={`group flex flex-col items-center justify-center w-16 h-14 transition-colors cursor-pointer active:scale-95 ${
                isActive ? 'text-primary font-semibold' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px] transition-transform"
                style={
                  isActive
                    ? { fontVariationSettings: "'FILL' 1, 'wght' 600" }
                    : undefined
                }
              >
                {item.icon}
              </span>
              <span className="text-[11px] font-label-sm mt-0.5 tracking-tight font-medium">
                {item.label}
              </span>
              <span
                className={`nav-pip w-1 h-1 !rounded-full bg-secondary mt-0.5 transition-opacity ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavBar;
