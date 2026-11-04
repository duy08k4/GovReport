/**
 * Định nghĩa Type cho màn hình Phản ánh & Tra cứu hồ sơ (Citizen Reports) của Citizen App.
 */

export type ReportFilterStatus = "all" | "pending" | "in_progress" | "completed"

export interface CitizenReportItem {
    id: string
    code: string
    createdAt: string
    status: "pending" | "in_progress" | "completed"
    statusLabel: string
    title: string
    address: string
    imageUrl: string
    imageAlt: string
    statusNote: string
    unitAssigned?: string
    handlingDuration?: string
    progressPercent?: number
    autoRoutingNote?: string
}

export interface ReportFilterTab {
    key: ReportFilterStatus
    label: string
    count: number
}

