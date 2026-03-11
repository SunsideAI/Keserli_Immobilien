"use client";

import { useState, useMemo } from "react";

function fmt(v: number): string {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);
}

export default function ZinsrechnerCalc() {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [interestRate, setInterestRate] = useState(3.5);
  const [repaymentRate, setRepaymentRate] = useState(2.0);
  const [fixedPeriod, setFixedPeriod] = useState(10);

  const result = useMemo(() => {
    const annualPayment = loanAmount * (interestRate + repaymentRate) / 100;
    const monthlyPayment = annualPayment / 12;
    const interestCostFixedPeriod = (() => {
      let balance = loanAmount;
      let totalInterest = 0;
      let totalRepaid = 0;
      for (let month = 0; month < fixedPeriod * 12; month++) {
        const monthlyInterest = balance * (interestRate / 100) / 12;
        const monthlyRepayment = monthlyPayment - monthlyInterest;
        totalInterest += monthlyInterest;
        totalRepaid += monthlyRepayment;
        balance -= monthlyRepayment;
        if (balance <= 0) break;
      }
      return { totalInterest: Math.round(totalInterest), remainingDebt: Math.round(Math.max(0, balance)), totalRepaid: Math.round(totalRepaid) };
    })();

    return {
      monthlyPayment: Math.round(monthlyPayment),
      annualPayment: Math.round(annualPayment),
      ...interestCostFixedPeriod,
    };
  }, [loanAmount, interestRate, repaymentRate, fixedPeriod]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-slate-800">Ihre Angaben</h3>

        <div>
          <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
            <span>Darlehensbetrag</span>
            <span className="text-primary font-bold">{fmt(loanAmount)}</span>
          </label>
          <input type="range" min={50000} max={1000000} step={10000} value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>50.000 €</span><span>1.000.000 €</span>
          </div>
        </div>

        <div>
          <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
            <span>Sollzinssatz (p.a.)</span>
            <span className="text-primary font-bold">{interestRate.toFixed(2)} %</span>
          </label>
          <input type="range" min={0.5} max={8} step={0.05} value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0,50 %</span><span>8,00 %</span>
          </div>
        </div>

        <div>
          <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
            <span>Anfängliche Tilgung (p.a.)</span>
            <span className="text-primary font-bold">{repaymentRate.toFixed(1)} %</span>
          </label>
          <input type="range" min={1} max={10} step={0.1} value={repaymentRate}
            onChange={(e) => setRepaymentRate(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>1,0 %</span><span>10,0 %</span>
          </div>
        </div>

        <div>
          <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
            <span>Sollzinsbindung</span>
            <span className="text-primary font-bold">{fixedPeriod} Jahre</span>
          </label>
          <input type="range" min={5} max={30} step={1} value={fixedPeriod}
            onChange={(e) => setFixedPeriod(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>5 Jahre</span><span>30 Jahre</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-4">Ihre monatliche Rate</h3>

        <div className="bg-gradient-to-br from-primary to-teal-dark rounded-2xl p-6 text-white mb-6">
          <p className="text-sm text-white/70 mb-1">Monatliche Rate</p>
          <p className="text-4xl font-extrabold mb-4">{fmt(result.monthlyPayment)}</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-white/60">Jährliche Belastung</p>
              <p className="font-bold text-lg">{fmt(result.annualPayment)}</p>
            </div>
            <div>
              <p className="text-white/60">Zinsbindung</p>
              <p className="font-bold text-lg">{fixedPeriod} Jahre</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-5 space-y-3">
          <h4 className="font-semibold text-slate-800 text-sm">Nach {fixedPeriod} Jahren Zinsbindung</h4>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Gezahlte Zinsen</span>
            <span className="font-medium text-red-600">{fmt(result.totalInterest)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Getilgter Betrag</span>
            <span className="font-medium text-green-600">{fmt(result.totalRepaid)}</span>
          </div>
          <div className="border-t pt-3 flex justify-between text-sm font-bold">
            <span>Restschuld</span>
            <span className="text-primary">{fmt(result.remainingDebt)}</span>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          * Unverbindliche Berechnung. Annuitätendarlehen mit gleichbleibender Monatsrate. Tatsächliche Konditionen können abweichen.
        </p>
      </div>
    </div>
  );
}
