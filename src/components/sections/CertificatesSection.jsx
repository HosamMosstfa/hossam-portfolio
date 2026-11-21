import { useState } from "react";
import { Award, Eye, ExternalLink } from "lucide-react";
import RevealSection from "../common/RevealSection";
import SpotlightCard from "../common/SpotlightCard";
import { CERTIFICATES } from "../../data/portfolioData";

function CertificateCard({ cert, onOpen }) {
  const [imgError, setImgError] = useState(false);

  return (
    <SpotlightCard className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#2B2D31]/20 bg-[#2B2D31] text-[#D9DADC] shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#FFC93C] dark:border-[#D9DADC]/20 dark:bg-[#D9DADC] dark:text-[#2B2D31]">
      <button
        type="button"
        onClick={() => onOpen(cert)}
        className="relative block aspect-[16/10] w-full overflow-hidden border-b border-[#D9DADC]/15 bg-[#1F2124] text-left dark:border-[#2B2D31]/15"
      >
        {!imgError ? (
          <img
            src={cert.thumbnailUrl}
            alt={`${cert.title} Certificate`}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-[#2B2D31] p-6 text-center text-[#D9DADC]">
            <Award className="h-10 w-10 text-[#FFC93C]" />
            <p className="mt-2 font-bold">{cert.title}</p>
            <p className="mt-1 text-xs opacity-75">{cert.issuer}</p>
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-[#2B2D31]/70 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-lg bg-[#FFC93C] px-4 py-2 text-xs font-extrabold text-[#2B2D31] shadow-lg">
            <Eye className="h-4 w-4" />
            <span>View Full Certificate</span>
          </span>
        </div>
      </button>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="rounded bg-[#FFC93C] px-2 py-0.5 font-mono text-[11px] font-extrabold text-[#2B2D31]">
              Verified Credential
            </span>
            <span className="font-mono text-xs opacity-75">{cert.date}</span>
          </div>
          <h3 className="mt-2.5 text-base font-extrabold">{cert.title}</h3>
          <p className="mt-1 text-xs font-semibold opacity-85">{cert.issuer}</p>
          <p className="mt-2 text-xs opacity-75">{cert.highlights}</p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#D9DADC]/15 pt-3.5 dark:border-[#2B2D31]/15">
          <button
            type="button"
            onClick={() => onOpen(cert)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#FFC93C] px-3 py-1.5 text-xs font-extrabold text-[#2B2D31] transition hover:opacity-90"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Preview Certificate</span>
          </button>

          <a
            href={cert.driveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold opacity-85 transition hover:opacity-100 hover:underline hover:decoration-[#FFC93C] hover:decoration-2"
          >
            <span>Google Drive</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </SpotlightCard>
  );
}

export default function CertificatesSection({ onSelectCert }) {
  return (
    <section
      id="certificates"
      className="border-b border-[#2B2D31]/15 py-14 dark:border-[#D9DADC]/15"
    >
      <RevealSection>
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFC93C] text-[#2B2D31]">
            <Award className="h-4 w-4" />
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-[#2B2D31] dark:text-[#D9DADC] sm:text-3xl">
            Verified Certificates
          </h2>
        </div>
        <p className="mt-1.5 text-sm text-[#2B2D31]/80 dark:text-[#D9DADC]/80">
          Click any certificate preview to inspect the full credential document.
        </p>
      </RevealSection>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {CERTIFICATES.map((cert, idx) => (
          <RevealSection key={cert.id} delay={idx * 90}>
            <CertificateCard cert={cert} onOpen={onSelectCert} />
          </RevealSection>
        ))}
      </div>
    </section>
  );
}
