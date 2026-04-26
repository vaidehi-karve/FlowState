import React from "react";
import { Link, useNavigate } from "react-router";

type Doc = {
  id: string;
  title: string;
  due: string;
  status: "required" | "uploaded" | "rejected";
};

const initialDocs: Doc[] = [
  { id: "tax_return", title: "Parent Tax Return (2025)", due: "Oct 15, 2026", status: "required" },
  { id: "verification_worksheet", title: "Verification Worksheet", due: "Oct 15, 2026", status: "required" },
];

export function DocumentUpload() {
  const navigate = useNavigate();
  const [docs, setDocs] = React.useState<Doc[]>(initialDocs);
  const [selected, setSelected] = React.useState<string>(initialDocs[0].id);
  const [note, setNote] = React.useState("");
  const [uploadState, setUploadState] = React.useState<"idle" | "uploading" | "done">("idle");

  const selectedDoc = docs.find((d) => d.id === selected)!;

  const onUpload = async () => {
    setUploadState("uploading");
    await new Promise((r) => setTimeout(r, 800));
    setDocs((prev) => prev.map((d) => (d.id === selected ? { ...d, status: "uploaded" } : d)));
    setUploadState("done");
    setTimeout(() => setUploadState("idle"), 1000);
  };

  return (
    <div data-section-id="documents_upload_root">
      <div className="mb-6">
        <nav className="text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground" data-track="documents_breadcrumb_home">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/financial-aid" className="hover:text-foreground" data-track="documents_breadcrumb_financial_aid">
            Financial Aid
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Upload Documents</span>
        </nav>
        <h1>Upload Financial Aid Documents</h1>
        <p className="text-muted-foreground mt-2">Upload required documents to complete verification (simulated).</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-section-id="documents_upload_layout">
        <div className="bg-card rounded shadow-sm p-6 border border-border" data-section-id="documents_upload_list">
          <h2 className="mb-4">Required documents</h2>
          <div className="space-y-2">
            {docs.map((d) => (
              <button
                key={d.id}
                className={`w-full text-left rounded border px-3 py-2 hover:bg-muted ${
                  selected === d.id ? "bg-muted/40" : ""
                }`}
                onClick={() => setSelected(d.id)}
                data-track={`documents_select_${d.id}`}
              >
                <div className="text-sm font-medium">{d.title}</div>
                <div className="text-xs text-muted-foreground">
                  Due {d.due} • Status: {d.status}
                </div>
              </button>
            ))}
          </div>
          <div className="mt-5 text-xs text-muted-foreground">
            Tip: users often get stuck here—watch for repeated clicks and long hover times.
          </div>
        </div>

        <div className="bg-card rounded shadow-sm p-8 border border-border lg:col-span-2" data-section-id="documents_upload_form">
          <h2 className="mb-2">Upload</h2>
          <p className="text-sm text-muted-foreground mb-5">Selected: {selectedDoc.title}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm mb-2">File</label>
              <input type="file" className="w-full" data-track="documents_file_input" />
              <div className="text-xs text-muted-foreground mt-1">PDF or image up to 10MB (simulated).</div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-2">Note (optional)</label>
              <textarea
                className="w-full px-3 py-2 border border-border rounded-md bg-input-background min-h-[110px]"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note for the financial aid office…"
                data-track="documents_note_textarea"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button className="px-4 py-2 rounded border hover:bg-muted" onClick={() => navigate("/financial-aid")} data-track="documents_cancel">
              Cancel
            </button>
            <button
              className="px-5 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
              onClick={onUpload}
              disabled={uploadState === "uploading"}
              data-track="documents_upload_submit"
            >
              {uploadState === "uploading" ? "Uploading…" : "Upload"}
            </button>
          </div>

          {uploadState === "done" ? (
            <div className="mt-5 rounded border border-green-200 bg-green-50 p-4 text-sm text-green-800" data-track="documents_upload_done">
              Uploaded successfully (simulated).
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

