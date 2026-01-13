import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { TaxResult } from "@/lib/tax-types"
import { formatCurrency, formatPercent } from "@/lib/utils"

interface TaxBreakdownProps {
  result: TaxResult | null
}

export function TaxBreakdown({ result }: TaxBreakdownProps) {
  if (!result || result.taxBandBreakdown.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tax Band Breakdown</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-2 text-sm font-medium text-muted-foreground pb-2 border-b">
            <span>Tax Band</span>

            <span className="text-right">Rate</span>

            <span className="text-right">Taxable</span>

            <span className="text-right">Tax</span>
          </div>

          {result.taxBandBreakdown.map((band, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-2 text-sm py-2 border-b border-dashed last:border-0"
            >
              <span className="text-muted-foreground">{band.band}</span>

              <span className="text-right">{formatPercent(band.rate)}</span>

              <span className="text-right">{formatCurrency(band.taxableAmount)}</span>

              <span className="text-right font-medium">{formatCurrency(band.taxAmount)}</span>
            </div>
          ))}

          <div className="grid grid-cols-4 gap-2 text-sm pt-2 font-medium">
            <span className="col-span-3 text-right">Total Tax:</span>

            <span className="text-right text-primary">{formatCurrency(result.annualTax)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
