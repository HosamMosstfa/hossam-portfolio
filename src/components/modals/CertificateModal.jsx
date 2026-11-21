import { ExternalLink, X } from "lucide-react";

export default function CertificateModal({ cert, onClose }) {
  if (!cert) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B2D31]/85 p-4 backdrop-blur-sm no-print"
      onClick={onClose}
    >
      <div
        className="animate-modal-pop flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#FFC93C]/50 bg-[#2B2D31] text-[#D9DADC] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-[#D9DADC]/15 px-5 py-3.5">
          <div>
            <h3 className="text-base font-extrabold text-[#D9DADC] sm:text-lg">
              {cert.title}
            </h3>
            <p className="text-xs text-[#FFC93C]">
              {cert.issuer} · {cert.date}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={cert.driveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#FFC93C] px-3 py-1.5 text-xs font-extrabold text-[#2B2D31] hover:opacity-90"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Open in Drive</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close certificate preview"
              className="rounded-lg p-1.5 text-[#D9DADC] hover:bg-[#D9DADC]/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="h-[72vh] w-full bg-[#1F2124]">
          <iframe
            src={cert.previewUrl}
            title={cert.title}
            className="h-full w-full border-0"
            allow="autoplay"
          />
        </div>
      </div>
    </div>
  );
}
