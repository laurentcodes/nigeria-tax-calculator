export const NTA_2025_TAX_BANDS = [
  { min: 0, max: 800000, rate: 0.0, label: "₦0 - ₦800,000" },
  { min: 800000, max: 3000000, rate: 0.15, label: "₦800,001 - ₦3,000,000" },
  { min: 3000000, max: 12000000, rate: 0.18, label: "₦3,000,001 - ₦12,000,000" },
  { min: 12000000, max: 25000000, rate: 0.21, label: "₦12,000,001 - ₦25,000,000" },
  { min: 25000000, max: 50000000, rate: 0.23, label: "₦25,000,001 - ₦50,000,000" },
  { min: 50000000, max: Infinity, rate: 0.25, label: "Above ₦50,000,000" },
] as const

export const PENSION_RATE_DEFAULT = 0.08
export const NHF_RATE = 0.025
export const NHIS_RATE = 0.05
export const RENT_RELIEF_RATE = 0.2
export const RENT_RELIEF_MAX = 500000

export const TAX_FREE_THRESHOLD = 800000
