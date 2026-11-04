/**
 * Types and interfaces for Urban Notification Center ("Trung Tâm Thông Báo Đô Thị").
 */

export type NotificationCategory = "all" | "dossier" | "alert" | "system"

export interface NotificationFilterOption {
    key: NotificationCategory
    label: string
    dotColor?: string
    count?: number
}

export interface NotificationItem {
    id: string
    category: "dossier" | "alert" | "system"
    categoryLabel: string
    categoryBadgeClass: string
    ticketCode?: string
    timeAgo: string
    isUnread: boolean
    title: string
    description: string
    icon: string
    iconFill?: boolean
    iconColorClass: string
    iconBgClass: string
    // Dossier with Before/After inspection photos
    beforeImg?: string
    beforeAlt?: string
    afterImg?: string
    afterAlt?: string
    signatureLabel?: string
    actionButtonText?: string
    // Officer field dispatch meta
    officerName?: string
    officerRole?: string
    officerStatus?: string
    hasOfficerLocation?: boolean
    // Scheduled alert meta
    scheduleTime?: string
    alternateRoute?: string
    // VNeID / System identity meta
    verificationCode?: string
    statusBadgeText?: string
}

