import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { TaxResult } from "@/lib/tax-types"
import { formatCurrency, formatPercent } from "@/lib/utils"
import { Calculator, Wallet, TrendingDown, Percent } from "lucide-react"

interface TaxResultsProps {
  result: TaxResult | null
}

export function TaxResults({ result }: TaxResultsProps) {
  if (!result || result.grossAnnualIncome === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tax Summary</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Calculator className="h-12 w-12 mb-4" />

            <p className="text-center">
              Enter your income details to see your PAYE tax calculation
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tax Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* main highlight */}
        <div className="rounded-lg bg-primary/10 p-6 text-center">
          <p className="text-sm text-muted-foreground mb-1">Monthly PAYE Tax</p>

          <p className="text-4xl font-bold text-primary">
            {formatCurrency(result.monthlyPAYE)}
          </p>
        </div>

        {/* summary stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Wallet className="h-4 w-4" />

              <span className="text-sm">Annual Tax</span>
            </div>

            <p className="text-xl font-semibold">{formatCurrency(result.annualTax)}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Percent className="h-4 w-4" />

              <span className="text-sm">Effective Rate</span>
            </div>

            <p className="text-xl font-semibold">{formatPercent(result.effectiveRate)}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingDown className="h-4 w-4" />

              <span className="text-sm">Net Monthly</span>
            </div>

            <p className="text-xl font-semibold">{formatCurrency(result.netMonthlyIncome)}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calculator className="h-4 w-4" />

              <span className="text-sm">Gross Monthly</span>
            </div>

            <p className="text-xl font-semibold">{formatCurrency(result.monthlyGross)}</p>
          </div>
        </div>

        <Separator />

        {/* income breakdown */}
        <div className="space-y-3">
          <h4 className="font-medium">Income</h4>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Gross Annual Income</span>

              <span>{formatCurrency(result.grossAnnualIncome)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Deductions</span>

              <span className="text-destructive">-{formatCurrency(result.deductions.total)}</span>
            </div>

            <div className="flex justify-between font-medium">
              <span>Taxable Income</span>

              <span>{formatCurrency(result.taxableIncome)}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* deductions breakdown */}
        <div className="space-y-3">
          <h4 className="font-medium">Deductions Breakdown (Annual)</h4>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pension (8%)</span>

              <span>{formatCurrency(result.deductions.pension)}</span>
            </div>

            {result.deductions.nhf > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">NHF (2.5%)</span>

                <span>{formatCurrency(result.deductions.nhf)}</span>
              </div>
            )}

            {result.deductions.nhis > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">NHIS (5%)</span>

                <span>{formatCurrency(result.deductions.nhis)}</span>
              </div>
            )}

            {result.deductions.rentRelief > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rent Relief</span>

                <span>{formatCurrency(result.deductions.rentRelief)}</span>
              </div>
            )}

            {result.deductions.lifeInsurance > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Life Insurance</span>

                <span>{formatCurrency(result.deductions.lifeInsurance)}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
