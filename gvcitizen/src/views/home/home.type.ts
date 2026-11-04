/**
 * Định nghĩa Type cho màn hình Trang chủ (Home Feed / Dashboard) của Citizen App.
 */

export interface IncidentCategory {
    id: string
    title: string
    icon: string
}

export type ProgressStep = 1 | 2 | 3 | 4

export interface RecentTicketProgress {
    id: string
    code: string
    timeAgo: string
    title: string
    statusText: string
    currentStep: ProgressStep
    teamName: string
    hasOfficerLocation: boolean
}

export interface UrbanAlert {
    id: string
    title: string
    time: string
    content: string
}

