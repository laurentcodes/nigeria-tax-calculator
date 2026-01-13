import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { TaxCalculatorForm } from '@/components/tax-calculator-form';
import { TaxResults } from '@/components/tax-results';
import { MonthlyBreakdown } from '@/components/monthly-breakdown';
import { TaxBreakdown } from '@/components/tax-breakdown';
import type { TaxResult } from '@/lib/tax-types';
import { Calculator, AlertCircle } from 'lucide-react';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  const [result, setResult] = useState<TaxResult | null>(null);

  return (
    <div className='min-h-screen bg-background'>
      {/* header */}
      <header className='border-b bg-card'>
        <div className='container mx-auto px-4 py-6'>
          <div className='flex items-center gap-3'>
            <div className='rounded-lg bg-primary/10 p-2'>
              <Calculator className='h-6 w-6 text-primary' />
            </div>

            <div>
              <h1 className='text-2xl font-bold'>
                Nigeria Personal PAYE Tax Calculator
              </h1>

              <p className='text-sm text-muted-foreground'>
                For Personal Income Tax - Nigeria Tax Act 2025 (Effective January 1, 2026)
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* main content */}
      <main className='container mx-auto px-4 py-8'>
        <div className='grid gap-8 lg:grid-cols-2'>
          {/* form column */}
          <div>
            <TaxCalculatorForm onCalculate={setResult} />
          </div>

          {/* results column */}
          <div className='space-y-6'>
            <TaxResults result={result} />

            <MonthlyBreakdown result={result} />

            <TaxBreakdown result={result} />
          </div>
        </div>

        {/* disclaimer */}
        <div className='mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4'>
          <div className='flex gap-3'>
            <AlertCircle className='h-5 w-5 flex-shrink-0 text-amber-600' />

            <div className='text-sm text-amber-800'>
              <p className='font-medium'>Disclaimer</p>

              <p className='mt-1'>
                This calculator provides estimates based on the Nigeria Tax Act
                2025. Actual tax liability may vary. Consult a tax professional
                for accurate tax advice. The calculator assumes standard
                employee pension contributions and does not account for all
                possible deductions or special circumstances.
              </p>
            </div>
          </div>
        </div>

        {/* tax bands info */}
        <div className='mt-8 rounded-lg border bg-card p-6'>
          <h2 className='text-lg font-semibold mb-4'>NTA 2025 Tax Bands</h2>

          <div className='grid gap-2 text-sm'>
            <div className='grid grid-cols-2 font-medium text-muted-foreground pb-2 border-b'>
              <span>Annual Taxable Income</span>

              <span>Tax Rate</span>
            </div>

            <div className='grid grid-cols-2 py-1'>
              <span>₦0 - ₦800,000</span>

              <span className='text-primary font-medium'>0% (Tax-free)</span>
            </div>

            <div className='grid grid-cols-2 py-1'>
              <span>₦800,001 - ₦3,000,000</span>

              <span>15%</span>
            </div>

            <div className='grid grid-cols-2 py-1'>
              <span>₦3,000,001 - ₦12,000,000</span>

              <span>18%</span>
            </div>

            <div className='grid grid-cols-2 py-1'>
              <span>₦12,000,001 - ₦25,000,000</span>

              <span>21%</span>
            </div>

            <div className='grid grid-cols-2 py-1'>
              <span>₦25,000,001 - ₦50,000,000</span>

              <span>23%</span>
            </div>

            <div className='grid grid-cols-2 py-1'>
              <span>Above ₦50,000,000</span>

              <span>25%</span>
            </div>
          </div>
        </div>
      </main>

      {/* footer */}
      <footer className='border-t bg-card mt-auto'>
        <div className='container mx-auto px-4 py-6 text-center text-sm text-muted-foreground'>
          <p>Nigeria Personal PAYE Tax Calculator - Based on Nigeria Tax Act 2025</p>

          <p className='mt-1 font-medium text-primary/80'>
            Personal Tax Calculator Only
          </p>

          <p className='mt-1'>
            Vibe Coded by{' '}
            <a
              href='https://laurentcodes.xyz'
              className='text-primary font-medium underline decoration-primary/50 underline-offset-4 transition-colors hover:text-primary/80 hover:decoration-primary'
              target='_blank'
              rel='noopener noreferrer'
            >
              Laurent
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
