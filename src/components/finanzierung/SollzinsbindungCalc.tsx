"use client";

import { useState, useMemo } from "react";

function fmt(v: number): string {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);
}

const PERIODS = [5, 10, 15, 20, 25, 30];
const RATE_OFFSETS: Record<number, number> = { 5: -0.6, 10: 0, 15: 0.3, 20: 0.5, 25: 0.7, 30: 0.9 };

export default function SollzinsbindungCalc() {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [baseRate, setBaseRate] = useState(3.5);
  const [repaymentRate, setRepaymentRate] = useState(2.0);

  const comparisons = useMemo(() => {
    return PERIODS.map((years) => {
      const rate = Math.max(0.5, baseRate + (RATE_OFFSETS[years] || 0));
      const annualPayment = loanAmount * (rate + repaymentRate) / 100;
      const monthlyPayment = annualPayment / 12;

      let balance = loanAmount;
      let totalInterest = 0;
      for (let month = 0; month < years * 12 && balance > 0; month++) {
        const monthInterest = balance * (rate / 100) / 12;
        const monthRepayment = monthlyPayment - monthInterest;
        totalInterest += monthInterest;
        balance -= monthRepayment;
      }

      return {
        years,
        rate: rate.toFixed(2),
        monthlyPayment: Math.round(monthlyPayment),
        totalInterest: Math.round(totalInterest),
        remainingDebt: Math.round(Math.max(0, balance)),
        repaidPercent: Math.round(((loanAmount - Math.max(0, balance)) / loanAmount) * 100),
      };
    });
  }, [loanAmount, baseRate, repaymentRate]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
            <span>Darlehensbetrag</span>
            <span className="text-primary font-bold">{fmt(loanAmount)}</span>
          </label>
          <input type="range" min={50000} max={1000000} step={10000} value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
        </div>

        <div>
          <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
            <span>Basiszins (10 J.)</span>
            <span className="text-primary font-bold">{baseRate.toFixed(2)} %</span>
          </label>
          <input type="range" min={0.5} max={8} step={0.05} value={baseRate}
            onChange={(e) => setBaseRate(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
        </div>

        <div>
          <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
            <span>Anfängliche Tilgung</span>
            <span className="text-primary font-bold">{repaymentRate.toFixed(1)} %</span>
          </label>
          <input type="range" min={1} max={10} step={0.1} value={repaymentRate}
            onChange={(e) => setRepaymentRate(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
        </div>
      </div>

      {/* Comparison Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {comparisons.map((c) => (
          <div
            key={c.years}
            className={`rounded-xl border-2 p-5 transition-all ${
              c.years === 10
                ? "border-primary bg-primary-50 shadow-lg"
                : "border-gray-200 bg-white hover:border-primary/30"
            }`}
          >
            {c.years === 10 && (
              <span className="inline-block text-xs font-bold text-primary bg-primary-100 px-2 py-0.5 rounded-full mb-2">
                BELIEBTESTE WAHL
              </span>
            )}
            <h4 className="text-2xl font-extrabold text-slate-800 mb-1">{c.years} Jahre</h4>
            <p className="text-sm text-gray-500 mb-4">Sollzins: {c.rate} % p.a.</p>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Monatliche Rate</span>
                <span className="font-bold">{fmt(c.monthlyPayment)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gezahlte Zinsen</span>
                <span className="font-medium text-red-600">{fmt(c.totalInterest)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Restschuld</span>
                <span className="font-medium">{fmt(c.remainingDebt)}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Getilgt</span>
                  <span className="font-bold text-green-600">{c.repaidPercent} %</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2 transition-all"
                    style={{ width: `${c.repaidPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-mint-light rounded-xl p-5 text-sm text-slate-700">
        <strong>Tipp:</strong> Eine längere Zinsbindung kostet zwar einen Zinsaufschlag, gibt Ihnen aber Planungssicherheit.
        Bei niedrigem Zinsniveau lohnt sich oft eine Bindung von 15–20 Jahren. Bei hohen Zinsen kann eine kürzere
        Bindung sinnvoll sein, wenn Sie auf sinkende Zinsen setzen.
      </div>

      <p className="text-xs text-gray-400">
        * Unverbindliche Berechnung. Die Zinsaufschläge je Bindungsdauer sind Richtwerte und können je nach Bank variieren.
      </p>
    </div>
  );
}
