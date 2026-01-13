import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import type { TaxResult } from "../lib/tax-types"

interface MonthlyBreakdownProps {
  result: TaxResult | null
}

export function MonthlyBreakdown({ result }: MonthlyBreakdownProps) {
  if (!result || result.grossAnnualIncome === 0) {
    return null
  }

  // calculate monthly deductions
  const monthlyDeductions = {
    pension: result.deductions.pension / 12,
    nhf: result.deductions.nhf / 12,
    nhis: result.deductions.nhis / 12,
    rentRelief: result.deductions.rentRelief / 12,
    lifeInsurance: result.deductions.lifeInsurance / 12,
  }

  const totalMonthlyDeductions = Object.values(monthlyDeductions).reduce(
    (sum, val) => sum + val,
    0
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* starting point */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Monthly Gross Income</span>
            <span className="text-primary">{formatCurrency(result.monthlyGross)}</span>
          </div>
        </div>

        {/* deductions section */}
        {totalMonthlyDeductions > 0 && (
          <div className="space-y-2 pl-4 border-l-2 border-border">
            <div className="text-sm font-medium text-muted-foreground">Less: Monthly Deductions</div>

            {monthlyDeductions.pension > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span>Pension Contribution</span>
                <span className="text-destructive">
                  -{formatCurrency(monthlyDeductions.pension)}
                </span>
              </div>
            )}

            {monthlyDeductions.nhf > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span>National Housing Fund (NHF)</span>
                <span className="text-destructive">
                  -{formatCurrency(monthlyDeductions.nhf)}
                </span>
              </div>
            )}

            {monthlyDeductions.nhis > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span>Health Insurance (NHIS)</span>
                <span className="text-destructive">
                  -{formatCurrency(monthlyDeductions.nhis)}
                </span>
              </div>
            )}

            {monthlyDeductions.rentRelief > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span>Rent Relief</span>
                <span className="text-destructive">
                  -{formatCurrency(monthlyDeductions.rentRelief)}
                </span>
              </div>
            )}

            {monthlyDeductions.lifeInsurance > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span>Life Insurance Premium</span>
                <span className="text-destructive">
                  -{formatCurrency(monthlyDeductions.lifeInsurance)}
                </span>
              </div>
            )}
          </div>
        )}

        {/* paye tax */}
        <div className="space-y-2 pl-4 border-l-2 border-border">
          <div className="flex justify-between items-center">
            <span className="font-medium">Less: Monthly PAYE Tax</span>
            <span className="text-destructive font-medium">
              -{formatCurrency(result.monthlyPAYE)}
            </span>
          </div>
        </div>

        {/* separator line */}
        <div className="border-t border-border pt-4">
          <div className="flex justify-between items-center text-xl font-bold">
            <span>Net Monthly Income</span>
            <span className="text-primary">{formatCurrency(result.netMonthlyIncome)}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            This is your take-home pay after all deductions and taxes
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
