import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { taxInputSchema } from "@/lib/validation"
import type { TaxInput, TaxResult } from "@/lib/tax-types"
import { calculateTax } from "@/lib/tax-calculator"
import { parseNumericInput, formatNumber } from "@/lib/utils"

type NumericFieldName = "basicSalary" | "housingAllowance" | "transportAllowance" | "otherAllowances" | "annualRent" | "lifeInsurancePremium"

const defaultValues: TaxInput = {
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

interface TaxCalculatorFormProps {
  onCalculate: (result: TaxResult) => void
}

export function TaxCalculatorForm({ onCalculate }: TaxCalculatorFormProps) {
  // Track raw input strings to allow decimal entry (e.g., "3." while typing "3.12")
  const [rawInputs, setRawInputs] = useState<Record<NumericFieldName, string>>({
    basicSalary: "",
    housingAllowance: "",
    transportAllowance: "",
    otherAllowances: "",
    annualRent: "",
    lifeInsurancePremium: "",
  })

  const form = useForm({
    defaultValues,
    validatorAdapter: zodValidator(),
    validators: {
      onChange: taxInputSchema,
    },
    onSubmit: async ({ value }) => {
      const result = calculateTax(value)
      onCalculate(result)
    },
  })

  const handleNumericChange = (
    fieldName: NumericFieldName,
    value: string,
    onChange: (val: number) => void
  ) => {
    // Store the raw input to preserve decimal points while typing
    setRawInputs((prev) => ({ ...prev, [fieldName]: value }))

    const numericValue = parseNumericInput(value)
    onChange(numericValue)

    // auto-calculate on change
    const currentValues = form.state.values
    const updatedValues = { ...currentValues, [fieldName]: numericValue }
    const result = calculateTax(updatedValues)
    onCalculate(result)
  }

  const handleNumericBlur = (
    fieldName: NumericFieldName,
    value: number
  ) => {
    // On blur, format the value and clear raw input
    setRawInputs((prev) => ({ ...prev, [fieldName]: "" }))
  }

  const getDisplayValue = (fieldName: NumericFieldName, numericValue: number): string => {
    // If there's a raw input (user is typing), show that
    if (rawInputs[fieldName]) {
      return rawInputs[fieldName]
    }
    // Otherwise show formatted value
    return numericValue ? formatNumber(numericValue) : ""
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income Details</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="space-y-6"
        >
          {/* salary section */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Monthly Salary</h3>

            <form.Field name="basicSalary">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Basic Salary (₦)</Label>

                  <Input
                    id={field.name}
                    type="text"
                    inputMode="decimal"
                    placeholder="0"
                    value={getDisplayValue("basicSalary", field.state.value)}
                    onChange={(e) =>
                      handleNumericChange("basicSalary", e.target.value, field.handleChange)
                    }
                    onBlur={() => {
                      handleNumericBlur("basicSalary", field.state.value)
                      field.handleBlur()
                    }}
                  />

                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="housingAllowance">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Housing Allowance (₦)</Label>

                  <Input
                    id={field.name}
                    type="text"
                    inputMode="decimal"
                    placeholder="0"
                    value={getDisplayValue("housingAllowance", field.state.value)}
                    onChange={(e) =>
                      handleNumericChange("housingAllowance", e.target.value, field.handleChange)
                    }
                    onBlur={() => {
                      handleNumericBlur("housingAllowance", field.state.value)
                      field.handleBlur()
                    }}
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="transportAllowance">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Transport Allowance (₦)</Label>

                  <Input
                    id={field.name}
                    type="text"
                    inputMode="decimal"
                    placeholder="0"
                    value={getDisplayValue("transportAllowance", field.state.value)}
                    onChange={(e) =>
                      handleNumericChange("transportAllowance", e.target.value, field.handleChange)
                    }
                    onBlur={() => {
                      handleNumericBlur("transportAllowance", field.state.value)
                      field.handleBlur()
                    }}
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="otherAllowances">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Other Allowances (₦)</Label>

                  <Input
                    id={field.name}
                    type="text"
                    inputMode="decimal"
                    placeholder="0"
                    value={getDisplayValue("otherAllowances", field.state.value)}
                    onChange={(e) =>
                      handleNumericChange("otherAllowances", e.target.value, field.handleChange)
                    }
                    onBlur={() => {
                      handleNumericBlur("otherAllowances", field.state.value)
                      field.handleBlur()
                    }}
                  />
                </div>
              )}
            </form.Field>
          </div>

          {/* deductions section */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Deductions & Benefits</h3>

            <form.Field name="annualRent">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Annual Rent Paid (₦)</Label>

                  <p className="text-xs text-muted-foreground">
                    Rent relief: 20% of annual rent, max ₦500,000
                  </p>

                  <Input
                    id={field.name}
                    type="text"
                    inputMode="decimal"
                    placeholder="0"
                    value={getDisplayValue("annualRent", field.state.value)}
                    onChange={(e) =>
                      handleNumericChange("annualRent", e.target.value, field.handleChange)
                    }
                    onBlur={() => {
                      handleNumericBlur("annualRent", field.state.value)
                      field.handleBlur()
                    }}
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="lifeInsurancePremium">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Annual Life Insurance Premium (₦)</Label>

                  <Input
                    id={field.name}
                    type="text"
                    inputMode="decimal"
                    placeholder="0"
                    value={getDisplayValue("lifeInsurancePremium", field.state.value)}
                    onChange={(e) =>
                      handleNumericChange("lifeInsurancePremium", e.target.value, field.handleChange)
                    }
                    onBlur={() => {
                      handleNumericBlur("lifeInsurancePremium", field.state.value)
                      field.handleBlur()
                    }}
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="pensionRate">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Pension Contribution Rate (%)</Label>

                  <Input
                    id={field.name}
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={field.state.value}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 0
                      field.handleChange(val)
                      const currentValues = form.state.values
                      const updatedValues = { ...currentValues, pensionRate: val }
                      const result = calculateTax(updatedValues)
                      onCalculate(result)
                    }}
                    onBlur={field.handleBlur}
                  />
                </div>
              )}
            </form.Field>
          </div>

          {/* participation switches */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Scheme Participation</h3>

            <form.Field name="nhfParticipation">
              {(field) => (
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor={field.name}>National Housing Fund (NHF)</Label>

                    <p className="text-xs text-muted-foreground">
                      2.5% of basic salary (voluntary for private sector)
                    </p>
                  </div>

                  <Switch
                    id={field.name}
                    checked={field.state.value}
                    onCheckedChange={(checked) => {
                      field.handleChange(checked)
                      const currentValues = form.state.values
                      const updatedValues = { ...currentValues, nhfParticipation: checked }
                      const result = calculateTax(updatedValues)
                      onCalculate(result)
                    }}
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="nhisParticipation">
              {(field) => (
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor={field.name}>National Health Insurance (NHIS)</Label>

                    <p className="text-xs text-muted-foreground">
                      5% of basic salary (employee portion)
                    </p>
                  </div>

                  <Switch
                    id={field.name}
                    checked={field.state.value}
                    onCheckedChange={(checked) => {
                      field.handleChange(checked)
                      const currentValues = form.state.values
                      const updatedValues = { ...currentValues, nhisParticipation: checked }
                      const result = calculateTax(updatedValues)
                      onCalculate(result)
                    }}
                  />
                </div>
              )}
            </form.Field>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
