import React from "react";
import { Link } from "react-router";

type Plan = {
  id: string;
  name: string;
  downPayment: number;
  installments: number;
  installmentAmount: number;
  fee: number;
};

const plans: Plan[] = [
  { id: "p1", name: "2 payments", downPayment: 500, installments: 2, installmentAmount: 825, fee: 25 },
  { id: "p2", name: "4 payments", downPayment: 250, installments: 4, installmentAmount: 475, fee: 35 },
  { id: "p3", name: "Monthly (6)", downPayment: 150, installments: 6, installmentAmount: 335, fee: 45 },
];

function formatUsd(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function PaymentPlan() {
  const [term, setTerm] = React.useState("Fall 2026");
  const [selected, setSelected] = React.useState<string>("p2");
  const [agreed, setAgreed] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "enrolled">("idle");

  const plan = plans.find((p) => p.id === selected)!;

  return (
    <div data-section-id="payment_plan_root">
      <div className="mb-6">
        <nav className="text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground" data-track="payment_plan_breadcrumb_home">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/financial-aid" className="hover:text-foreground" data-track="payment_plan_breadcrumb_financial_aid">
            Financial Aid
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Payment Plan</span>
        </nav>
        <h1>Payment Plan Options</h1>
        <p className="text-muted-foreground mt-2">Compare installment plans and enroll (simulated).</p>
      </div>

      <div className="bg-card rounded shadow-sm p-8 border border-border mb-6" data-section-id="payment_plan_controls">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
          <div>
            <label className="block text-sm mb-2">Term</label>
            <select
              className="w-full px-3 py-2 border border-border rounded-md bg-input-background"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              data-track="payment_plan_term_select"
            >
              <option>Fall 2026</option>
              <option>Winter 2026</option>
              <option>Spring 2027</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <div className="text-sm mb-2">Balance due (simulated)</div>
            <div className="text-2xl font-semibold">{formatUsd(2150)}</div>
            <div className="text-xs text-muted-foreground mt-1">Due date: Nov 1, 2026</div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded shadow-sm border border-border overflow-hidden mb-6" data-section-id="payment_plan_table">
        <div className="p-6 border-b border-border">
          <h2>Available plans</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-sm">Select</th>
                <th className="px-6 py-3 text-left text-sm">Plan</th>
                <th className="px-6 py-3 text-left text-sm">Down payment</th>
                <th className="px-6 py-3 text-left text-sm">Installments</th>
                <th className="px-6 py-3 text-left text-sm">Fee</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((p) => (
                <tr key={p.id} className="border-b border-border hover:bg-muted/30">
                  <td className="px-6 py-4 text-sm">
                    <input
                      type="radio"
                      name="plan"
                      checked={selected === p.id}
                      onChange={() => setSelected(p.id)}
                      data-track={`payment_plan_select_${p.id}`}
                    />
                  </td>
                  <td className="px-6 py-4 text-sm">{p.name}</td>
                  <td className="px-6 py-4 text-sm">{formatUsd(p.downPayment)}</td>
                  <td className="px-6 py-4 text-sm">
                    {p.installments} × {formatUsd(p.installmentAmount)}
                  </td>
                  <td className="px-6 py-4 text-sm">{formatUsd(p.fee)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-card rounded shadow-sm p-8 border border-border" data-section-id="payment_plan_enroll">
        <h2 className="mb-4">Review & enroll</h2>
        <div className="rounded border p-4 text-sm">
          <div className="flex justify-between mb-2">
            <span>Term</span>
            <span className="font-medium">{term}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Selected plan</span>
            <span className="font-medium">{plan.name}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Down payment</span>
            <span className="font-medium">{formatUsd(plan.downPayment)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Installments</span>
            <span className="font-medium">
              {plan.installments} × {formatUsd(plan.installmentAmount)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Plan fee</span>
            <span className="font-medium">{formatUsd(plan.fee)}</span>
          </div>
        </div>

        <label className="mt-5 flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            data-track="payment_plan_agree_terms"
          />
          <span>I agree to the payment plan terms (simulated).</span>
        </label>

        <div className="mt-6 flex gap-3">
          <button
            className="px-4 py-2 rounded border hover:bg-muted"
            onClick={() => setStatus("idle")}
            data-track="payment_plan_reset"
          >
            Reset
          </button>
          <button
            className="px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
            disabled={!agreed}
            onClick={() => setStatus("enrolled")}
            data-track="payment_plan_enroll"
          >
            Enroll
          </button>
        </div>

        {status === "enrolled" ? (
          <div className="mt-5 rounded border border-green-200 bg-green-50 p-4 text-sm text-green-800" data-track="payment_plan_enrolled_banner">
            Enrolled successfully (simulated). Your first installment will process on the next business day.
          </div>
        ) : null}
      </div>
    </div>
  );
}

