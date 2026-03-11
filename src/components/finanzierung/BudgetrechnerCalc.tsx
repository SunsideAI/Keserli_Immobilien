"use client";

import { useState, useMemo } from "react";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
}

export default function BudgetrechnerCalc() {
  const [monthlyIncome, setMonthlyIncome] = useState(4000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(1500);
  const [equity, setEquity] = useState(50000);
  const [interestRate, setInterestRate] = useState(3.5);
  const [repaymentRate, setRepaymentRate] = useState(2.0);
  const result = useMemo(() => {
    const availableMonthly = monthlyIncome - monthlyExpenses;
    const maxMonthlyRate = availableMonthly * 0.35;
    const annualRate = (interestRate + repaymentRate) / 100;
    const monthlyRate = annualRate / 12;
    const maxLoan = monthlyRate > 0 ? maxMonthlyRate / monthlyRate : 0;
    const purchasePrice = maxLoan + equity;
    const notaryFees = purchasePrice * 0.02;
    const transferTax = purchasePrice * 0.065;
    const brokerFee = purchasePrice * 0.0357;
    const additionalCosts = notaryFees + transferTax + brokerFee;
    const effectiveBudget = purchasePrice - additionalCosts;

    return {
      availableMonthly,
      maxMonthlyRate,
      maxLoan: Math.round(maxLoan),
      purchasePrice: Math.round(purchasePrice),
      additionalCosts: Math.round(additionalCosts),
      effectiveBudget: Math.round(effectiveBudget),
      notaryFees: Math.round(notaryFees),
      transferTax: Math.round(transferTax),
      brokerFee: Math.round(brokerFee),
    };
  }, [monthlyIncome, monthlyExpenses, equity, interestRate, repaymentRate]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-slate-800">Ihre Angaben</h3>

        <div>
          <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
            <span>Monatliches Nettoeinkommen</span>
            <span className="text-primary font-bold">{formatCurrency(monthlyIncome)}</span>
          </label>
          <input type="range" min={1000} max={15000} step={100} value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>1.000 €</span><span>15.000 €</span>
          </div>
        </div>

        <div>
          <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
            <span>Monatliche Ausgaben</span>
            <span className="text-primary font-bold">{formatCurrency(monthlyExpenses)}</span>
          </label>
          <input type="range" min={500} max={10000} step={100} value={monthlyExpenses}
            onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>500 €</span><span>10.000 €</span>
          </div>
        </div>

        <div>
          <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
            <span>Eigenkapital</span>
            <span className="text-primary font-bold">{formatCurrency(equity)}</span>
          </label>
          <input type="range" min={0} max={500000} step={5000} value={equity}
            onChange={(e) => setEquity(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0 €</span><span>500.000 €</span>
          </div>
        </div>

        <div>
          <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
            <span>Sollzins (p.a.)</span>
            <span className="text-primary font-bold">{interestRate.toFixed(1)} %</span>
          </label>
          <input type="range" min={1} max={8} step={0.1} value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>1,0 %</span><span>8,0 %</span>
          </div>
        </div>

        <div>
          <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
            <span>Anfängliche Tilgung (p.a.)</span>
            <span className="text-primary font-bold">{repaymentRate.toFixed(1)} %</span>
          </label>
          <input type="range" min={1} max={5} step={0.1} value={repaymentRate}
            onChange={(e) => setRepaymentRate(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>1,0 %</span><span>5,0 %</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-4">Ihr Budget</h3>

        <div className="bg-gradient-to-br from-primary to-teal-dark rounded-2xl p-6 text-white mb-6">
          <p className="text-sm text-white/70 mb-1">Maximaler Kaufpreis</p>
          <p className="text-4xl font-extrabold mb-4">{formatCurrency(result.effectiveBudget)}</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-white/60">Max. Darlehen</p>
              <p className="font-bold text-lg">{formatCurrency(result.maxLoan)}</p>
            </div>
            <div>
              <p className="text-white/60">Monatliche Rate</p>
              <p className="font-bold text-lg">{formatCurrency(Math.round(result.maxMonthlyRate))}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-5 space-y-3">
          <h4 className="font-semibold text-slate-800 text-sm">Kaufnebenkosten (NRW)</h4>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Grunderwerbsteuer (6,5 %)</span>
            <span className="font-medium">{formatCurrency(result.transferTax)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Notar & Grundbuch (ca. 2 %)</span>
            <span className="font-medium">{formatCurrency(result.notaryFees)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Maklerprovision (3,57 %)</span>
            <span className="font-medium">{formatCurrency(result.brokerFee)}</span>
          </div>
          <div className="border-t pt-3 flex justify-between text-sm font-bold">
            <span>Nebenkosten gesamt</span>
            <span className="text-primary">{formatCurrency(result.additionalCosts)}</span>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          * Unverbindliche Berechnung. Faustregel: Max. 35 % des verfügbaren Einkommens für die Kreditrate. Die tatsächlichen Konditionen hängen von Ihrer individuellen Situation ab.
        </p>
      </div>
    </div>
  );
}
