import { ROUTES } from '../Routing';

/**
 * Cấu hình hệ thống điều hướng chính (Bottom Navigation & Header Titles).
 * Phục vụ thanh điều hướng cố định và tiêu đề chuẩn Safe Area trên di động.
 */

export type MainNavTab = 'tasks' | 'map' | 'records' | 'profile';

export interface NavItemConfig {
  key: MainNavTab;
  label: string;
  icon: string;
  dataPath: string;
  route: string;
}

export const MAIN_NAV_ITEMS: NavItemConfig[] = [
  {
    key: 'tasks',
    label: 'Tác vụ',
    icon: 'assignment_turned_in',
    dataPath: 'danh-sach-tac-vu',
    route: ROUTES.TASKS,
  },
  {
    key: 'map',
    label: 'Bản đồ',
    icon: 'map',
    dataPath: 'ban-do-tac-chien',
    route: ROUTES.MAP,
  },
  {
    key: 'records',
    label: 'Hồ sơ',
    icon: 'folder_open',
    dataPath: 'ho-so-hien-truong',
    route: ROUTES.RECORDS,
  },
  {
    key: 'profile',
    label: 'Cán bộ',
    icon: 'account_circle',
    dataPath: 'thong-tin-can-bo',
    route: ROUTES.PROFILE,
  },
];

export const PAGE_TITLES: Record<MainNavTab, string> = {
  tasks: 'Danh Sách Tác Vụ',
  map: 'Bản Đồ Tác Chiến',
  records: 'Hồ Sơ Hiện Trường',
  profile: 'Thông Tin Cán Bộ',
};

export const isStackRoute = (pathname: string): boolean => {
  return (
    pathname.includes('/notifications') ||
    pathname.includes('/canh-bao-khan-cap') ||
    pathname.match(/\/tasks\/[^\/]+/) !== null ||
    pathname.match(/\/incidents\/[^\/]+/) !== null
  );
};

export const getAutoTabFromPath = (pathname: string): MainNavTab => {
  if (pathname.includes('/map')) return 'map';
  if (pathname.includes('/records') || pathname.includes('/incidents')) return 'records';
  if (pathname.includes('/profile')) return 'profile';
  return 'tasks';
};

export const getAutoPageTitle = (pathnameOrTab: string): string => {
  if (pathnameOrTab.includes('/notifications') || pathnameOrTab.includes('/canh-bao-khan-cap')) {
    return 'Cảnh Báo Khẩn Cấp';
  }
  if (
    pathnameOrTab.match(/\/tasks\/[^\/]+/) !== null ||
    pathnameOrTab.match(/\/incidents\/[^\/]+/) !== null
  ) {
    return 'Chi Tiết Tác Vụ';
  }
  return PAGE_TITLES[pathnameOrTab as MainNavTab] || PAGE_TITLES.tasks;
};

export default MAIN_NAV_ITEMS;
