export interface TaxInput {
  basicSalary: number
  housingAllowance: number
  transportAllowance: number
  otherAllowances: number
  annualRent: number
  nhfParticipation: boolean
  nhisParticipation: boolean
  lifeInsurancePremium: number
  pensionRate: number
}

export interface Deductions {
  pension: number
  nhf: number
  nhis: number
  rentRelief: number
  lifeInsurance: number
  total: number
}

export interface TaxBandItem {
  band: string
  rate: number
  taxableAmount: number
  taxAmount: number
}

export interface TaxResult {
  monthlyGross: number
  grossAnnualIncome: number
  deductions: Deductions
  taxableIncome: number
  annualTax: number
  monthlyPAYE: number
  netMonthlyIncome: number
  effectiveRate: number
  taxBandBreakdown: TaxBandItem[]
}

export const defaultTaxInput: TaxInput = {
  basicSalary: 0,
  housingAllowance: 0,
  transportAllowance: 0,
  otherAllowances: 0,
  annualRent: 0,
  nhfParticipation: false,
  nhisParticipation: false,
  lifeInsurancePremium: 0,
  pensionRate: 8,
}
