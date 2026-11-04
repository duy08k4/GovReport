/**
 * Types and interfaces for Create Field Report ("Tạo Phản Ánh Hiện Trường").
 */

export interface IncidentCategoryOption {
    value: string
    label: string
    group: string
}

export interface IncidentFormState {
    images: string[]
    activeImageIndex: number
    lat: number
    lng: number
    accuracyMeters: number
    timestamp: string
    address: string
    adminUnit: string
    category: string
    description: string
    isUrgent: boolean
    isAnonymous: boolean
    isSubmitting: boolean
    isSubmitted: boolean
    ticketCode: string
    isManualLocation?: boolean
}
