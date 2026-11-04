export interface CadreProfile {
  id: string;
  name: string;
  code: string;
  cadreType: string;
  position: string;
  roleBadge: string;
  roleBadgeCode: string;
  avatarUrl: string;
  isVerified: boolean;
  dutyStatus: 'on_duty' | 'off_duty' | 'standby';
  dutyStatusLabel: string;
  sessionDuration: string;
  agencyUnit: string;
  districtCity: string;
  teamName: string;
  teamCode: string;
  commanderName: string;
  commanderRole: string;
  hotlineFormatted: string;
  hotlineTel: string;
  certTitle: string;
  certIssuer: string;
  certStatus: string;
  certExpiry: string;
  certTokenType: string;
  vneidNumber: string;
  vneidLevel: string;
}

export interface CadreDutySettings {
  alertOutsideDuty: boolean;
  emergencySirenVolume: number; // 50 - 100
}

export interface ShiftHandoverForm {
  walkieTalkieOk: boolean;
  soundMeterOk: boolean;
  pkiTokenOk: boolean;
  vehicleOk: boolean;
  handoverNotes: string;
  receiverCadreName: string;
}

export interface ShiftSwapForm {
  reason: string;
  targetDate: string;
  targetShift: string;
  substituteCadreName: string;
}
