export type IncidentPriority = 'urgent' | 'in-progress' | 'pending';

export type IncidentCategory = 'all' | 'my-team' | '500m' | 'cay-xanh' | 'ho-ga' | 'thoat-nuoc';

export type MapLayerType = 'carto' | 'satellite';

export interface MapIncident {
  id: string;
  code: string;
  title: string;
  category: IncidentCategory;
  categoryName: string;
  team: 'my-team' | 'other';
  teamName: string;
  priority: IncidentPriority;
  priorityLabel: string;
  statusBadgeBg: string;
  statusBadgeColor: string;
  address: string;
  distance: string;
  distanceMeters: number;
  slaText: string;
  slaUrgent?: boolean;
  pinX: number; // Viewport X coordinate in px (standard 400px width)
  pinY: number; // Viewport Y coordinate in px (standard 520px height)
  pinLabel: string;
  icon: string;
  coords: {
    lat: number;
    lng: number;
  };
}

export interface MapViewportState {
  zoom: number;
  panX: number;
  panY: number;
}
