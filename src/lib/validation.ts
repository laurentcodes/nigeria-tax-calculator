import { z } from "zod"

export const taxInputSchema = z.object({
  basicSalary: z.number().min(0, "Basic salary must be 0 or greater"),
  housingAllowance: z.number().min(0, "Housing allowance must be 0 or greater"),
  transportAllowance: z.number().min(0, "Transport allowance must be 0 or greater"),
  otherAllowances: z.number().min(0, "Other allowances must be 0 or greater"),
  annualRent: z.number().min(0, "Annual rent must be 0 or greater"),
  nhfParticipation: z.boolean(),
  nhisParticipation: z.boolean(),
  lifeInsurancePremium: z.number().min(0, "Life insurance premium must be 0 or greater"),
  pensionRate: z.number().min(0).max(100, "Pension rate must be between 0 and 100"),
})

export type TaxInputSchema = z.infer<typeof taxInputSchema>
