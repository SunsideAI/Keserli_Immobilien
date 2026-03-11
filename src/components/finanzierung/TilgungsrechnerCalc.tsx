"use client";

import { useState, useMemo } from "react";

function fmt(v: number): string {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);
}

interface YearRow {
  year: number;
  interest: number;
  repayment: number;
  extraRepayment: number;
  balance: number;
}

export default function TilgungsrechnerCalc() {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [interestRate, setInterestRate] = useState(3.5);
  const [repaymentRate, setRepaymentRate] = useState(2.0);
  const [extraRepayment, setExtraRepayment] = useState(5000);
  const [showFullPlan, setShowFullPlan] = useState(false);

  const result = useMemo(() => {
    const annualRate = loanAmount * (interestRate + repaymentRate) / 100;
    const monthlyRate = annualRate / 12;
    const rows: YearRow[] = [];
    let balance = loanAmount;
    let totalInterest = 0;
    let totalYears = 0;

    for (let year = 1; year <= 50 && balance > 0; year++) {
      let yearInterest = 0;
      let yearRepayment = 0;

      for (let month = 0; month < 12 && balance > 0; month++) {
        const monthInterest = balance * (interestRate / 100) / 12;
        const monthRepayment = Math.min(monthlyRate - monthInterest, balance);
        yearInterest += monthInterest;
        yearRepayment += monthRepayment;
        balance -= monthRepayment;
      }

      const extra = Math.min(extraRepayment, balance);
      balance -= extra;
      totalInterest += yearInterest;

      rows.push({
        year,
        interest: Math.round(yearInterest),
        repayment: Math.round(yearRepayment),
        extraRepayment: Math.round(extra),
        balance: Math.round(Math.max(0, balance)),
      });

      if (balance <= 0) { totalYears = year; break; }
      totalYears = year;
    }

    return { rows, totalInterest: Math.round(totalInterest), totalYears, monthlyRate: Math.round(monthlyRate) };
  }, [loanAmount, interestRate, repaymentRate, extraRepayment]);

  const displayRows = showFullPlan ? result.rows : result.rows.slice(0, 10);

  return (
    <div className="space-y-8">
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
          </div>

          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Sollzinssatz (p.a.)</span>
              <span className="text-primary font-bold">{interestRate.toFixed(2)} %</span>
            </label>
            <input type="range" min={0.5} max={8} step={0.05} value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
          </div>

          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Anfängliche Tilgung (p.a.)</span>
              <span className="text-primary font-bold">{repaymentRate.toFixed(1)} %</span>
            </label>
            <input type="range" min={1} max={10} step={0.1} value={repaymentRate}
              onChange={(e) => setRepaymentRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
          </div>

          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Jährliche Sondertilgung</span>
              <span className="text-primary font-bold">{fmt(extraRepayment)}</span>
            </label>
            <input type="range" min={0} max={50000} step={1000} value={extraRepayment}
              onChange={(e) => setExtraRepayment(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0 €</span><span>50.000 €</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4">Ergebnis</h3>

          <div className="bg-gradient-to-br from-primary to-teal-dark rounded-2xl p-6 text-white mb-6">
            <p className="text-sm text-white/70 mb-1">Laufzeit bis zur Volltilgung</p>
            <p className="text-4xl font-extrabold mb-4">{result.totalYears} Jahre</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-white/60">Monatliche Rate</p>
                <p className="font-bold text-lg">{fmt(result.monthlyRate)}</p>
              </div>
              <div>
                <p className="text-white/60">Zinsen gesamt</p>
                <p className="font-bold text-lg">{fmt(result.totalInterest)}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-5">
            <h4 className="font-semibold text-slate-800 text-sm mb-3">Zusammenfassung</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Darlehenssumme</span>
                <span className="font-medium">{fmt(loanAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gezahlte Zinsen</span>
                <span className="font-medium text-red-600">{fmt(result.totalInterest)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sondertilgungen gesamt</span>
                <span className="font-medium text-green-600">{fmt(extraRepayment * result.totalYears)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Gesamtkosten</span>
                <span className="text-primary">{fmt(loanAmount + result.totalInterest)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tilgungsplan Table */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-4">Tilgungsplan</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-primary/20">
                <th className="text-left py-3 px-2 font-semibold text-slate-800">Jahr</th>
                <th className="text-right py-3 px-2 font-semibold text-slate-800">Zinsen</th>
                <th className="text-right py-3 px-2 font-semibold text-slate-800">Tilgung</th>
                <th className="text-right py-3 px-2 font-semibold text-slate-800">Sondertilgung</th>
                <th className="text-right py-3 px-2 font-semibold text-slate-800">Restschuld</th>
              </tr>
            </thead>
            <tbody>
              {displayRows.map((row) => (
                <tr key={row.year} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2.5 px-2 font-medium">{row.year}</td>
                  <td className="py-2.5 px-2 text-right text-red-600">{fmt(row.interest)}</td>
                  <td className="py-2.5 px-2 text-right text-green-600">{fmt(row.repayment)}</td>
                  <td className="py-2.5 px-2 text-right text-blue-600">{fmt(row.extraRepayment)}</td>
                  <td className="py-2.5 px-2 text-right font-medium">{fmt(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {result.rows.length > 10 && (
          <button
            onClick={() => setShowFullPlan(!showFullPlan)}
            className="mt-3 text-primary font-semibold text-sm hover:underline"
          >
            {showFullPlan ? "Weniger anzeigen" : `Kompletten Plan anzeigen (${result.rows.length} Jahre)`}
          </button>
        )}
      </div>

      <p className="text-xs text-gray-400">
        * Unverbindliche Berechnung. Annuitätendarlehen mit gleichbleibender Rate zzgl. jährlicher Sondertilgung.
      </p>
    </div>
  );
}
