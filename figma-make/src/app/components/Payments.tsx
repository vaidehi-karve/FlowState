import React from "react";
import { Link, useNavigate } from "react-router";

type Step = "details" | "method" | "confirm" | "receipt";

function formatUsd(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function Payments() {
  const navigate = useNavigate();
  const [step, setStep] = React.useState<Step>("details");
  const [term, setTerm] = React.useState("Fall 2026");
  const [amount, setAmount] = React.useState("2150");
  const [paymentType, setPaymentType] = React.useState("Tuition & Fees");
  const [method, setMethod] = React.useState<"card" | "bank">("card");
  const [nameOnCard, setNameOnCard] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [expiry, setExpiry] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [routing, setRouting] = React.useState("");
  const [account, setAccount] = React.useState("");
  const [confirmChecked, setConfirmChecked] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const amountNum = Number(amount);
  const validAmount = Number.isFinite(amountNum) && amountNum > 0 && amountNum <= 10_000;

  const validateStep = () => {
    if (step === "details") {
      if (!term) return "Select a term.";
      if (!paymentType) return "Select a payment type.";
      if (!validAmount) return "Enter a valid amount (1–10,000).";
    }
    if (step === "method") {
      if (method === "card") {
        if (!nameOnCard.trim()) return "Enter name on card.";
        if (cardNumber.replace(/\s/g, "").length < 12) return "Enter a valid card number.";
        if (!expiry.trim()) return "Enter expiration date.";
        if (zip.trim().length < 5) return "Enter billing ZIP.";
      } else {
        if (routing.trim().length < 8) return "Enter routing number.";
        if (account.trim().length < 6) return "Enter account number.";
      }
    }
    if (step === "confirm") {
      if (!confirmChecked) return "Confirm you authorize this payment.";
    }
    return null;
  };

  const next = () => {
    const msg = validateStep();
    setError(msg);
    if (msg) return;
    setError(null);
    setStep((s) => (s === "details" ? "method" : s === "method" ? "confirm" : s === "confirm" ? "receipt" : s));
  };

  const back = () => {
    setError(null);
    setStep((s) => (s === "method" ? "details" : s === "confirm" ? "method" : s === "receipt" ? "confirm" : s));
  };

  return (
    <div data-section-id="payments_root">
      <div className="mb-6">
        <nav className="text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground" data-track="payments_breadcrumb_home">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/financial-aid" className="hover:text-foreground" data-track="payments_breadcrumb_financial_aid">
            Financial Aid
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Make Payment</span>
        </nav>
        <h1>Make a Tuition Payment</h1>
        <p className="text-muted-foreground mt-2">
          Complete a payment in a few steps. This is a beta-test flow intended to generate realistic interaction data.
        </p>
      </div>

      <div className="bg-card rounded shadow-sm p-6 border border-border mb-6" data-section-id="payments_stepper">
        <div className="flex items-center justify-between gap-2 text-sm">
          <div className={`flex-1 p-3 rounded border ${step === "details" ? "bg-muted/40" : ""}`}>1) Details</div>
          <div className={`flex-1 p-3 rounded border ${step === "method" ? "bg-muted/40" : ""}`}>2) Method</div>
          <div className={`flex-1 p-3 rounded border ${step === "confirm" ? "bg-muted/40" : ""}`}>3) Confirm</div>
          <div className={`flex-1 p-3 rounded border ${step === "receipt" ? "bg-muted/40" : ""}`}>4) Receipt</div>
        </div>
      </div>

      {error ? (
        <div className="mb-6 bg-red-50 border border-red-200 rounded p-4 text-sm text-red-700" data-track="payments_error_banner">
          {error}
        </div>
      ) : null}

      {step === "details" ? (
        <div className="bg-card rounded shadow-sm p-8 border border-border" data-section-id="payments_details">
          <h2 className="mb-4">Payment details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm mb-2">Term</label>
              <select
                className="w-full px-3 py-2 border border-border rounded-md bg-input-background"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                data-track="payments_term_select"
              >
                <option>Fall 2026</option>
                <option>Winter 2026</option>
                <option>Spring 2027</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Payment type</label>
              <select
                className="w-full px-3 py-2 border border-border rounded-md bg-input-background"
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                data-track="payments_type_select"
              >
                <option>Tuition & Fees</option>
                <option>Housing</option>
                <option>Library Fine</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Amount</label>
              <input
                className="w-full px-3 py-2 border border-border rounded-md bg-input-background"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
                placeholder="2150"
                inputMode="decimal"
                data-track="payments_amount_input"
              />
              <div className="text-xs text-muted-foreground mt-1">Max $10,000 per transaction.</div>
            </div>
            <div>
              <label className="block text-sm mb-2">Memo (optional)</label>
              <input
                className="w-full px-3 py-2 border border-border rounded-md bg-input-background"
                placeholder="e.g., tuition installment"
                data-track="payments_memo_input"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              className="px-4 py-2 rounded border hover:bg-muted"
              onClick={() => navigate("/financial-aid")}
              data-track="payments_cancel"
            >
              Cancel
            </button>
            <button className="px-5 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90" onClick={next} data-track="payments_next_details">
              Continue
            </button>
          </div>
        </div>
      ) : null}

      {step === "method" ? (
        <div className="bg-card rounded shadow-sm p-8 border border-border" data-section-id="payments_method">
          <h2 className="mb-4">Choose payment method</h2>

          <div className="flex gap-3 mb-6">
            <button
              className={`px-4 py-2 rounded border ${method === "card" ? "bg-muted/40" : "hover:bg-muted"}`}
              onClick={() => setMethod("card")}
              data-track="payments_method_card"
            >
              Credit/Debit Card
            </button>
            <button
              className={`px-4 py-2 rounded border ${method === "bank" ? "bg-muted/40" : "hover:bg-muted"}`}
              onClick={() => setMethod("bank")}
              data-track="payments_method_bank"
            >
              Bank Transfer (ACH)
            </button>
          </div>

          {method === "card" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm mb-2">Name on card</label>
                <input
                  className="w-full px-3 py-2 border border-border rounded-md bg-input-background"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  data-track="payments_card_name"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Card number</label>
                <input
                  className="w-full px-3 py-2 border border-border rounded-md bg-input-background"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  data-track="payments_card_number"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Expiration</label>
                <input
                  className="w-full px-3 py-2 border border-border rounded-md bg-input-background"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                  data-track="payments_card_expiry"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Billing ZIP</label>
                <input
                  className="w-full px-3 py-2 border border-border rounded-md bg-input-background"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="90024"
                  data-track="payments_billing_zip"
                />
              </div>
              <div className="text-xs text-muted-foreground flex items-end">
                Card payments include a small convenience fee (simulated).
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm mb-2">Routing number</label>
                <input
                  className="w-full px-3 py-2 border border-border rounded-md bg-input-background"
                  value={routing}
                  onChange={(e) => setRouting(e.target.value)}
                  data-track="payments_ach_routing"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Account number</label>
                <input
                  className="w-full px-3 py-2 border border-border rounded-md bg-input-background"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  data-track="payments_ach_account"
                />
              </div>
              <div className="md:col-span-2 text-xs text-muted-foreground">
                ACH transfers take 1–3 business days (simulated) and can be reversed if information is incorrect.
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <button className="px-4 py-2 rounded border hover:bg-muted" onClick={back} data-track="payments_back_method">
              Back
            </button>
            <button className="px-5 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90" onClick={next} data-track="payments_next_method">
              Review payment
            </button>
          </div>
        </div>
      ) : null}

      {step === "confirm" ? (
        <div className="bg-card rounded shadow-sm p-8 border border-border" data-section-id="payments_confirm">
          <h2 className="mb-4">Confirm</h2>
          <div className="rounded border p-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Term</span>
              <span className="font-medium">{term}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Type</span>
              <span className="font-medium">{paymentType}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Method</span>
              <span className="font-medium">{method === "card" ? "Card" : "ACH"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Amount</span>
              <span className="font-medium">{validAmount ? formatUsd(amountNum) : "—"}</span>
            </div>
          </div>

          <label className="mt-5 flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={confirmChecked}
              onChange={(e) => setConfirmChecked(e.target.checked)}
              data-track="payments_authorize_checkbox"
            />
            <span>
              I authorize State University to process this payment. I understand payments are non-refundable (simulated).
            </span>
          </label>

          <div className="mt-6 flex items-center justify-between">
            <button className="px-4 py-2 rounded border hover:bg-muted" onClick={back} data-track="payments_back_confirm">
              Back
            </button>
            <button className="px-5 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90" onClick={next} data-track="payments_submit">
              Submit payment
            </button>
          </div>
        </div>
      ) : null}

      {step === "receipt" ? (
        <div className="bg-card rounded shadow-sm p-8 border border-border" data-section-id="payments_receipt">
          <h2 className="mb-2">Receipt</h2>
          <p className="text-sm text-muted-foreground">Payment submitted successfully (simulated).</p>
          <div className="mt-5 rounded border p-4 text-sm">
            <div className="flex justify-between mb-2">
              <span>Confirmation</span>
              <span className="font-mono">CNF-{Math.random().toString(16).slice(2, 10).toUpperCase()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Amount</span>
              <span className="font-medium">{validAmount ? formatUsd(amountNum) : "—"}</span>
            </div>
            <div className="flex justify-between">
              <span>Method</span>
              <span className="font-medium">{method === "card" ? "Card" : "ACH"}</span>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              className="px-4 py-2 rounded border hover:bg-muted"
              onClick={() => navigate("/financial-aid")}
              data-track="payments_done_back_to_financial_aid"
            >
              Back to Financial Aid
            </button>
            <button
              className="px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => navigate("/payment-plan")}
              data-track="payments_view_plan"
            >
              View payment plan
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

