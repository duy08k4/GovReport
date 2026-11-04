/**
 * Profile data types and interfaces for GovReport Citizen app.
 */

export interface CitizenProfileData {
    fullName: string
    phoneNumber: string
    email: string
    avatarUrl: string
    avatarAlt: string
    vneidVerified: boolean
    vneidLevel: number
    cccdMasked: string
    address: string
}

export interface CivicImpactStats {
    level: number
    levelLabel: string
    honorBadgeTitle: string
    totalSubmitted: number
    totalResolved: number
    successRate: number
}

export interface ProfileSettingsState {
    pushNotifications: boolean
    defaultAnonymous: boolean
}

export interface EmergencyContactItem {
    id: string
    number: string
    name: string
    description: string
    icon: string
    colorClass: string
}

export interface SlaStandardItem {
    id: string
    category: string
    maxResponseHours: string
    resolutionTarget: string
    icon: string
}

