/**
 * Định nghĩa Type cho màn hình Bản đồ cảnh báo đô thị (GIS Map) của Citizen App.
 */

export type MapFilterType = "all" | "flood" | "drain" | "construction" | "completed"
export type MapLayerMode = "carto" | "satellite"

export interface MapIncidentPin {
    id: string
    code: string
    title: string
    type: "urgent" | "construction" | "completed" | "flood"
    statusBadge: string
    statusColor: string
    statusBg: string
    timeAgo: string
    address: string
    dispatchStatus: string
    coords: {
        lat: number
        lng: number
    }
    icon: string
    pinColor: string
}

export interface MapFilterOption {
    key: MapFilterType
    label: string
    icon?: string
    dotColor?: string
}
