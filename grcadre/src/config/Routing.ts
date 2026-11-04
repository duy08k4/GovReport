/**
 * Cấu hình đường dẫn (Routing Configuration) toàn hệ thống GovReport Cadre.
 * Quản lý tập trung tất cả URL path cho ứng dụng di động cán bộ hiện trường.
 */
export const ROUTES = {
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  REGISTER: '/register',
  REGISTER_CADRE: '/register',
  MAIN: '/main',
  HOME: '/main/tasks',
  TASKS: '/main/tasks',
  TASK_DETAIL: '/main/tasks/:id',
  INCIDENTS: '/main/incidents',
  INCIDENT_DETAIL: '/main/incidents/:id',
  MAP: '/main/map',
  RECORDS: '/main/records',
  PROFILE: '/main/profile',
  NOTIFICATIONS: '/main/notifications',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];

export const DEFAULT_ROUTE = ROUTES.LOGIN;

export default ROUTES;
