import type { TaxInput, TaxResult, TaxBandItem, Deductions } from "./tax-types"
import {
  NTA_2025_TAX_BANDS,
  NHF_RATE,
  NHIS_RATE,
  RENT_RELIEF_RATE,
  RENT_RELIEF_MAX,
} from "./tax-constants"

export function calculatePension(
  basicSalary: number,
  housingAllowance: number,
  transportAllowance: number,
  pensionRate: number
): number {
  const pensionBase = basicSalary + housingAllowance + transportAllowance
  return pensionBase * (pensionRate / 100) * 12
}

export function calculateNHF(basicSalary: number, isParticipating: boolean): number {
  if (!isParticipating) return 0
  return basicSalary * NHF_RATE * 12
}

export function calculateNHIS(basicSalary: number, isParticipating: boolean): number {
  if (!isParticipating) return 0
  return basicSalary * NHIS_RATE * 12
}

export function calculateRentRelief(annualRent: number): number {
  return Math.min(annualRent * RENT_RELIEF_RATE, RENT_RELIEF_MAX)
}

export function calculateDeductions(input: TaxInput): Deductions {
  const pension = calculatePension(
    input.basicSalary,
    input.housingAllowance,
    input.transportAllowance,
    input.pensionRate
  )
  const nhf = calculateNHF(input.basicSalary, input.nhfParticipation)
  const nhis = calculateNHIS(input.basicSalary, input.nhisParticipation)
  const rentRelief = calculateRentRelief(input.annualRent)
  const lifeInsurance = input.lifeInsurancePremium

  return {
    pension,
    nhf,
    nhis,
    rentRelief,
    lifeInsurance,
    total: pension + nhf + nhis + rentRelief + lifeInsurance,
  }
}

export function calculateTaxWithBreakdown(taxableIncome: number): {
  totalTax: number
  breakdown: TaxBandItem[]
} {
  const breakdown: TaxBandItem[] = []
  let totalTax = 0
  let remaining = taxableIncome

  for (const band of NTA_2025_TAX_BANDS) {
    if (remaining <= 0) break

    const bandWidth = band.max - band.min
    const taxableInBand = Math.min(remaining, bandWidth)
    const taxInBand = taxableInBand * band.rate

    breakdown.push({
      band: band.label,
      rate: band.rate,
      taxableAmount: taxableInBand,
      taxAmount: taxInBand,
    })

    totalTax += taxInBand
    remaining -= taxableInBand
  }

  return { totalTax, breakdown }
}

export function calculateTax(input: TaxInput): TaxResult {
  // calculate monthly and annual gross income
  const monthlyGross =
    input.basicSalary +
    input.housingAllowance +
    input.transportAllowance +
    input.otherAllowances

  const grossAnnualIncome = monthlyGross * 12

  // calculate deductions
  const deductions = calculateDeductions(input)

  // calculate taxable income
  const taxableIncome = Math.max(0, grossAnnualIncome - deductions.total)

  // calculate tax with breakdown
  const { totalTax, breakdown } = calculateTaxWithBreakdown(taxableIncome)

  // calculate monthly PAYE
  const monthlyPAYE = totalTax / 12

  // calculate net monthly income
  const monthlyDeductions = deductions.total / 12
  const netMonthlyIncome = monthlyGross - monthlyPAYE - monthlyDeductions

  // calculate effective tax rate
  const effectiveRate = grossAnnualIncome > 0 ? totalTax / grossAnnualIncome : 0

  return {
    monthlyGross,
    grossAnnualIncome,
    deductions,
    taxableIncome,
    annualTax: totalTax,
    monthlyPAYE,
    netMonthlyIncome,
    effectiveRate,
    taxBandBreakdown: breakdown,
  }
}
