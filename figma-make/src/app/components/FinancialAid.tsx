import React from "react";
import { Link, useNavigate } from "react-router";
import { DollarSign, FileText, Award, CreditCard, AlertTriangle, CheckCircle2 } from "lucide-react";

export function FinancialAid() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="mb-6">
        <nav className="text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Financial Aid</span>
        </nav>
        <h1>Financial Aid Portal</h1>
        <p className="text-muted-foreground mt-2">Manage your financial aid, scholarships, and student account</p>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm mb-1">
            <strong>Action Required:</strong> You have 2 outstanding verification documents.
          </p>
          <p className="text-sm text-muted-foreground">
            Submit by October 15, 2026 to avoid delays in your financial aid disbursement.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-card rounded shadow-sm p-6 border border-border">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-5 h-5 text-[#005587]" />
            <h3>Total Aid</h3>
          </div>
          <p className="text-2xl">$24,500</p>
          <p className="text-xs text-muted-foreground mt-1">2025-26 Academic Year</p>
        </div>

        <div className="bg-card rounded shadow-sm p-6 border border-border">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-[#2774AE]" />
            <h3>Disbursed</h3>
          </div>
          <p className="text-2xl">$12,250</p>
          <p className="text-xs text-muted-foreground mt-1">Fall semester</p>
        </div>

        <div className="bg-card rounded shadow-sm p-6 border border-border">
          <div className="flex items-center gap-3 mb-2">
            <CreditCard className="w-5 h-5 text-[#FFD100]" />
            <h3>Balance Due</h3>
          </div>
          <p className="text-2xl">$2,150</p>
          <p className="text-xs text-muted-foreground mt-1">Due: November 1, 2026</p>
        </div>

        <div className="bg-card rounded shadow-sm p-6 border border-border">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-5 h-5 text-[#8BB8E8]" />
            <h3>Documents</h3>
          </div>
          <p className="text-2xl">2 Pending</p>
          <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-card rounded shadow-sm p-8 border border-border">
          <h2 className="mb-4">Aid Award Summary</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Federal Pell Grant</span>
                <span className="text-sm">$6,895</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Accepted</p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">State University Grant</span>
                <span className="text-sm">$8,000</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Accepted</p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Federal Direct Subsidized Loan</span>
                <span className="text-sm">$3,500</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Accepted - Loan</p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Federal Direct Unsubsidized Loan</span>
                <span className="text-sm">$2,000</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{ width: '50%' }}></div>
              </div>
              <p className="text-xs text-orange-600 mt-1">Pending Acceptance</p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Federal Work-Study</span>
                <span className="text-sm">$4,105</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Accepted - Must apply for positions</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex justify-between text-sm mb-2">
              <span>Total Cost of Attendance:</span>
              <span>$32,450</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Total Financial Aid:</span>
              <span>$24,500</span>
            </div>
            <div className="flex justify-between">
              <span>Remaining Balance:</span>
              <span>$7,950</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded shadow-sm p-8 border border-border">
            <h2 className="mb-4">Required Documents</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm">FAFSA Confirmation</p>
                    <p className="text-xs text-muted-foreground">Submitted: September 15, 2026</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm">Parent Tax Return (2025)</p>
                    <p className="text-xs text-orange-600">Due: October 15, 2026</p>
                  </div>
                </div>
                <button className="text-sm text-primary hover:underline">Upload</button>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm">Verification Worksheet</p>
                    <p className="text-xs text-orange-600">Due: October 15, 2026</p>
                  </div>
                </div>
                <button className="text-sm text-primary hover:underline">Upload</button>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm">Enrollment Verification</p>
                    <p className="text-xs text-muted-foreground">Verified: August 20, 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded shadow-sm p-8 border border-border">
            <h2 className="mb-4">Scholarship Opportunities</h2>
            <div className="space-y-3">
              <div className="pb-3 border-b border-border">
                <p className="text-sm mb-1">Merit-Based Scholarship</p>
                <p className="text-xs text-muted-foreground mb-2">Application deadline: November 30, 2026</p>
                <a href="#" className="text-xs text-primary hover:underline">Apply Now</a>
              </div>
              <div className="pb-3 border-b border-border">
                <p className="text-sm mb-1">STEM Achievement Award</p>
                <p className="text-xs text-muted-foreground mb-2">For engineering and science majors</p>
                <a href="#" className="text-xs text-primary hover:underline">Learn More</a>
              </div>
              <div>
                <p className="text-sm mb-1">First Generation Scholarship</p>
                <p className="text-xs text-muted-foreground mb-2">For first-gen college students</p>
                <a href="#" className="text-xs text-primary hover:underline">Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded shadow-sm p-8 border border-border">
        <h2 className="mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            data-track="financial_aid_make_payment"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90"
            onClick={() => navigate("/payments")}
          >
            Make Payment
          </button>
          <button
            data-track="financial_aid_view_payment_plan"
            onClick={() => navigate("/payment-plan")}
            className="bg-card border border-border px-6 py-3 rounded-md hover:bg-muted"
          >
            View Payment Plan
          </button>
          <button
            data-track="financial_aid_accept_decline_aid"
            className="bg-card border border-border px-6 py-3 rounded-md hover:bg-muted"
          >
            Accept/Decline Aid
          </button>
          <button
            data-track="financial_aid_request_more_aid"
            className="bg-card border border-border px-6 py-3 rounded-md hover:bg-muted"
          >
            Request More Aid
          </button>
        </div>
      </div>
    </div>
  );
}
