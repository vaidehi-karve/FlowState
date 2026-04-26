import React from "react";
import { Link, useNavigate } from "react-router";
import { FileText, CheckCircle2, Clock, AlertCircle, ChevronRight } from "lucide-react";

export function Admissions() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="mb-6">
        <nav className="text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Admissions Portal</span>
        </nav>
        <h1>Admissions Portal</h1>
        <p className="text-muted-foreground mt-2">Manage your application and review admission requirements</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-card rounded shadow-sm p-6 border border-border">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-[#FFD100]" />
            <h3>Application Status</h3>
          </div>
          <p className="text-2xl mb-1">In Progress</p>
          <p className="text-sm text-muted-foreground">Last updated: March 15, 2026</p>
        </div>

        <div className="bg-card rounded shadow-sm p-6 border border-border">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-5 h-5 text-[#2774AE]" />
            <h3>Documents</h3>
          </div>
          <p className="text-2xl mb-1">3 of 5</p>
          <p className="text-sm text-muted-foreground">Documents submitted</p>
        </div>

        <div className="bg-card rounded shadow-sm p-6 border border-border">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <h3>Action Required</h3>
          </div>
          <p className="text-2xl mb-1">2 Items</p>
          <p className="text-sm text-muted-foreground">Requires your attention</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded shadow-sm p-8 border border-border">
          <h2 className="mb-4">Required Documents</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm">High School Transcript</span>
              </div>
              <span className="text-xs text-muted-foreground">Received</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm">SAT/ACT Scores</span>
              </div>
              <span className="text-xs text-muted-foreground">Received</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm">Personal Statement</span>
              </div>
              <span className="text-xs text-muted-foreground">Received</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <span className="text-sm">Letter of Recommendation (1)</span>
              </div>
              <span className="text-xs text-orange-600">Pending</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <span className="text-sm">Letter of Recommendation (2)</span>
              </div>
              <span className="text-xs text-orange-600">Pending</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded shadow-sm p-8 border border-border">
            <h2 className="mb-4">Application Checklist</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked readOnly className="w-4 h-4" />
                <span className="text-sm">Submit online application</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked readOnly className="w-4 h-4" />
                <span className="text-sm">Pay application fee ($75)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked readOnly className="w-4 h-4" />
                <span className="text-sm">Request transcripts</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Submit test scores</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Complete FAFSA (if applying for aid)</span>
              </label>
            </div>
          </div>

          <div className="bg-[#FFF8DC] border-l-4 border-[#FFD100] rounded p-6">
            <h3 className="mb-2">Important Deadlines</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Early Action:</span>
                <span>November 1, 2026</span>
              </div>
              <div className="flex justify-between">
                <span>Regular Decision:</span>
                <span>January 15, 2027</span>
              </div>
              <div className="flex justify-between">
                <span>Financial Aid Priority:</span>
                <span>March 2, 2027</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 flex items-center justify-between"
            onClick={() => navigate("/documents/upload")}
            data-track="admissions_quick_upload_documents"
          >
            <span>Upload Documents</span>
            <ChevronRight className="w-5 h-5" />
          </button>
          <button className="bg-card border border-border px-6 py-3 rounded-md hover:bg-muted flex items-center justify-between">
            <span>Check Application Status</span>
            <ChevronRight className="w-5 h-5" />
          </button>
          <button className="bg-card border border-border px-6 py-3 rounded-md hover:bg-muted flex items-center justify-between">
            <span>Schedule Campus Tour</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
