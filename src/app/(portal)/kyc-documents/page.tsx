"use client";

import { useMemo, useState } from "react";
import type { AxiosError } from "axios";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileText,
  RefreshCw,
  Search,
  UploadCloud,
  X,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { kycDocumentApi } from "@/lib/features/kyc/kycDocumentApi";
import { useKycDocuments } from "@/lib/features/kyc/useKycDocuments";
import type {
  KycDocType,
  KycDocument,
  KycSubmissionStatus,
  KycVerificationStatus,
} from "@/types";

type Status = KycVerificationStatus | "NOT_SUBMITTED";

interface DocumentRow {
  docType: KycDocType;
  id?: string;
  label: string;
  title: string;
  isRequired: boolean;
  status: Status;
  rejectionReason: string | null;
  fileName?: string;
  size?: string;
  uploadedAt?: string;
}

const DOC_TYPE_LABELS: Partial<Record<KycDocType, string>> = {
  COMPANY_REGISTRATION: "Company Registration",
  GST_CERTIFICATE: "GST Certificate",
  PAN_CARD: "PAN Card",
  OFFICE_ADDRESS_PROOF: "Office Address Proof",
  RERA_CERTIFICATE: "RERA Certificate",
  AADHAAR_CARD: "Aadhaar Card",
  OTHER: "Other Document",
};

const statusStyles: Record<Status, string> = {
  VERIFIED: "bg-emerald-50 text-emerald-600",
  PENDING: "bg-amber-50 text-amber-600",
  REJECTED: "bg-rose-50 text-rose-600",
  NOT_SUBMITTED: "bg-slate-100 text-slate-500",
};

function getErrorMessage(error: unknown, fallback: string) {
  const axiosError = error as AxiosError<{ message?: string }>;
  return axiosError?.response?.data?.message || axiosError?.message || fallback;
}

function formatSize(size?: number) {
  if (typeof size !== "number") return undefined;
  if (size < 1024) return `${size} B`;
  return `${(size / 1024).toFixed(1)} KB`;
}

function buildRow(
  docType: KycDocType,
  label: string,
  isRequired: boolean,
  status: Status,
  rejectionReason: string | null,
  doc?: KycDocument
): DocumentRow {
  return {
    docType,
    id: doc?.id,
    label,
    title: doc?.title || label,
    isRequired,
    status: doc?.status ?? status,
    rejectionReason: doc?.rejectionReason ?? rejectionReason,
    fileName: doc?.fileName || doc?.originalName,
    size: formatSize(doc?.size ?? doc?.fileSize),
    uploadedAt: doc?.createdAt || doc?.uploadedAt,
  };
}

function StatusBadge({ status }: { status: Status }) {
  const Icon =
    status === "VERIFIED"
      ? CheckCircle2
      : status === "REJECTED"
        ? XCircle
        : status === "PENDING"
          ? Clock
          : AlertCircle;

  const label =
    status === "NOT_SUBMITTED"
      ? "Not uploaded"
      : status.charAt(0) + status.slice(1).toLowerCase();

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold ${statusStyles[status]}`}
    >
      <Icon size={11} />
      {label}
    </span>
  );
}

export default function ManageDocuments() {
  const { data, isLoading, isFetching, isError, error, refetch, upload } =
    useKycDocuments();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | Status>("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [docType, setDocType] = useState<KycDocType>("PAN_CARD");
  const [title, setTitle] = useState("PAN Card");
  const [file, setFile] = useState<File | null>(null);

  const typeOptions = useMemo(() => {
    const statuses = data?.submissionStatus ?? [];
    if (statuses.length) {
      return statuses.map((item: KycSubmissionStatus) => ({
        value: item.docType,
        label: item.displayLabel,
      }));
    }
    return (Object.keys(DOC_TYPE_LABELS) as KycDocType[]).map((value) => ({
      value,
      label: DOC_TYPE_LABELS[value] ?? value,
    }));
  }, [data]);

  const documents = useMemo(() => {
    const statuses = [...(data?.submissionStatus ?? [])].sort(
      (a, b) => a.displayOrder - b.displayOrder
    );
    const uploaded = data?.documents ?? [];

    const rows = statuses.map((item) => {
      const doc = uploaded.find((entry) => entry.docType === item.docType);
      const status: Status =
        doc?.status ?? item.status ?? (item.submitted ? "PENDING" : "NOT_SUBMITTED");
      return buildRow(
        item.docType,
        item.displayLabel,
        item.isRequired,
        status,
        item.rejectionReason,
        doc
      );
    });

    const knownTypes = new Set(statuses.map((item) => item.docType));
    uploaded
      .filter((doc) => !knownTypes.has(doc.docType))
      .forEach((doc) => {
        rows.push(
          buildRow(
            doc.docType,
            doc.title,
            false,
            doc.status ?? "PENDING",
            doc.rejectionReason ?? null,
            doc
          )
        );
      });

    return rows;
  }, [data]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return documents.filter((doc) => {
      const matchesStatus = statusFilter === "ALL" || doc.status === statusFilter;
      const matchesSearch =
        !query ||
        doc.label.toLowerCase().includes(query) ||
        doc.title.toLowerCase().includes(query) ||
        doc.fileName?.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [documents, search, statusFilter]);

  const counts = {
    total: documents.length,
    verified: documents.filter((doc) => doc.status === "VERIFIED").length,
    pending: documents.filter((doc) => doc.status === "PENDING").length,
    rejected: documents.filter((doc) => doc.status === "REJECTED").length,
    missing: documents.filter((doc) => doc.status === "NOT_SUBMITTED").length,
  };

  const cards = [
    { label: "Total documents", value: counts.total },
    { label: "Verified", value: counts.verified },
    { label: "Pending review", value: counts.pending },
    { label: "Not uploaded", value: counts.missing },
  ];

  const handleFileChange = (selected: File | null) => {
    if (!selected) return;

    if (!["application/pdf", "image/png", "image/jpeg"].includes(selected.type)) {
      toast.error("Only PDF, PNG and JPG files are allowed.");
      return;
    }
    if (selected.size > 10 * 1024 * 1024) {
      toast.error("File size must be 10 MB or less.");
      return;
    }
    setFile(selected);
  };

  const handleDocTypeChange = (value: KycDocType) => {
    setDocType(value);
    setTitle(typeOptions.find((item) => item.value === value)?.label ?? String(value));
  };

  const handleUpload = () => {
    if (!file) {
      toast.error("Please choose a file.");
      return;
    }

    upload.mutate(
      { document: file, docType, title: title.trim() || String(docType) },
      {
        onSuccess: (response) => {
          toast.success(response?.message || "Document uploaded successfully.");
          setFile(null);
          setModalOpen(false);
        },
        onError: (uploadError) => {
          toast.error(getErrorMessage(uploadError, "Could not upload document."));
        },
      }
    );
  };

  const handleView = async (row: DocumentRow) => {
    if (!row.id) {
      toast.error("No uploaded file is available for this document.");
      return;
    }

    try {
      const blob = await kycDocumentApi.getDocumentFile(row.id);
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank", "noopener,noreferrer");
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch (viewError) {
      toast.error(getErrorMessage(viewError, "Could not open document."));
    }
  };

  const handleDownload = async (row: DocumentRow) => {
    if (!row.id) {
      toast.error("No uploaded file is available for this document.");
      return;
    }

    try {
      const blob = await kycDocumentApi.getDocumentFile(row.id);
      const url = URL.createObjectURL(blob);
      const link = window.document.createElement("a");
      link.href = url;
      link.download = row.fileName || row.title || `${row.docType}.pdf`;
      window.document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
    } catch (downloadError) {
      toast.error(getErrorMessage(downloadError, "Could not download document."));
    }
  };

  return (
    <div className="space-y-6 font-jakarta">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0B132B]">Manage Documents</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage organization KYC documents, like PAN card.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => refetch()}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            <RefreshCw size={14} className={isFetching ? "animate-spin" : ""} />
            Refresh
          </button>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#1865F2] px-4 text-xs font-bold text-white hover:bg-blue-700 cursor-pointer"
          >
            <UploadCloud size={15} />
            Upload
          </button>
        </div>
      </div>

      {isError && (
        <p className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700">
          <AlertCircle size={14} />
          {error?.message || "Could not load KYC documents."}
        </p>
      )}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs"
          >
            <p className="text-xl font-bold text-[#0B132B]">{card.value}</p>
            <p className="mt-0.5 text-[11px] text-slate-500">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-2xs">
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 p-4">
          <div className="relative flex-1 sm:max-w-xs">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search documents..."
              className="h-9 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-xs outline-none focus:border-[#1865F2]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as "ALL" | Status)}
            className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-600"
          >
            <option value="ALL">All statuses</option>
            <option value="VERIFIED">Verified</option>
            <option value="PENDING">Pending</option>
            <option value="REJECTED">Rejected</option>
            <option value="NOT_SUBMITTED">Not uploaded</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-600">
              <tr>
                <th className="px-4 py-3">Document</th>
                <th className="px-4 py-3">Requirement</th>
                <th className="px-4 py-3">File</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-slate-400">
                    Loading documents...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center">
                    <FileText size={28} className="mx-auto mb-2 text-slate-300" />
                    <p className="text-sm font-bold text-slate-700">No documents found</p>
                  </td>
                </tr>
              ) : (
                filtered.map((doc) => (
                  <tr key={`${doc.docType}-${doc.id ?? "new"}`} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <p className="font-bold text-[#0B132B]">{doc.label}</p>
                      <p className="text-[10px] text-slate-400">{doc.title}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {doc.isRequired ? "Required" : "Optional"}
                    </td>
                    <td className="px-4 py-3">
                      {doc.fileName ? (
                        <div>
                          <p className="font-semibold text-slate-700">{doc.fileName}</p>
                          <p className="text-[10px] text-slate-400">{doc.size}</p>
                        </div>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={doc.status} />
                      {doc.status === "REJECTED" && doc.rejectionReason && (
                        <p className="mt-1 text-[10px] text-rose-500">
                          {doc.rejectionReason}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleView(doc)}
                          disabled={!doc.id}
                          title="View"
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                        >
                          <Eye size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDownload(doc)}
                          disabled={!doc.id}
                          title="Download"
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                        >
                          <Download size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#0B132B]">Upload document</h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-700">
                  Document type
                </label>
                <select
                  value={docType}
                  onChange={(event) =>
                    handleDocTypeChange(event.target.value as KycDocType)
                  }
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-xs"
                >
                  {typeOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-700">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-[#1865F2]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-700">File</label>
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(event) => handleFileChange(event.target.files?.[0] ?? null)}
                  className="w-full text-xs text-slate-600"
                />
                <p className="mt-1 text-[10px] text-slate-400">PDF, PNG or JPG · Max 10 MB</p>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={upload.isPending}
                  className="rounded-lg bg-[#1865F2] px-5 py-2 text-xs font-bold text-white hover:bg-blue-700 disabled:opacity-60 cursor-pointer"
                >
                  {upload.isPending ? "Uploading..." : "Upload"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
