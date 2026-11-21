import { useState } from "react";
import { Award, Eye, ExternalLink, ShieldCheck } from "lucide-react";
import RevealSection from "../common/RevealSection";
import SpotlightCard from "../common/SpotlightCard";
import { CERTIFICATES } from "../../data/portfolioData";

function CertificateCard({ cert, onOpen }) {
  const [imgError, setImgError] = useState(false);

  return (
    <SpotlightCard className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[#2B2D31]/20 bg-[#2B2D31] text-[#D9DADC] shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#FFC93C] dark:border-[#D9DADC]/20 dark:bg-[#D9DADC] dark:text-[#2B2D31]">
      {/* Thumbnail Preview Button */}
      <button
        type="button"
        onClick={() => onOpen(cert)}
        aria-label={`View full ${cert.title} certificate`}
        className="relative block aspect-[16/10] w-full overflow-hidden border-b border-[#D9DADC]/15 bg-[#181A1E] text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#FFC93C] dark:border-[#2B2D31]/15"
      >
        {!imgError && cert.thumbnailUrl ? (
          <img
            src={cert.thumbnailUrl}
            alt={`${cert.title} Certificate`}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-[#181A1E] p-6 text-center text-[#D9DADC]">
            <Award aria-hidden="true" className="h-10 w-10 text-[#FFC93C]" />
            <p className="mt-2 font-bold text-white">{cert.title}</p>
            <p className="mt-1 text-xs text-[#D9DADC]/75">{cert.issuer}</p>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#141619]/75 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-xl bg-[#FFC93C] px-4 py-2 text-xs font-extrabold text-[#2B2D31] shadow-lg">
            <Eye aria-hidden="true" className="h-4 w-4" />
            <span>View Full Certificate</span>
          </span>
        </div>
      </button>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-[#FFC93C] px-2 py-0.5 font-mono text-[11px] font-extrabold text-[#2B2D31]">
              <ShieldCheck aria-hidden="true" className="h-3 w-3" />
              <span>Verified Credential</span>
            </span>
            {cert.date && (
              <span className="font-mono text-xs font-semibold text-[#D9DADC]/75 dark:text-[#2B2D31]/75">
                {cert.date}
              </span>
            )}
          </div>

          <h3 className="mt-2.5 text-base font-extrabold leading-snug text-white dark:text-[#2B2D31]">
            {cert.title}
          </h3>

          {cert.issuer && (
            <p className="mt-1 text-xs font-bold text-[#FFC93C] dark:text-[#9A6700]">
              {cert.issuer}
            </p>
          )}

          {cert.highlights && (
            <p className="mt-2 text-xs leading-relaxed text-[#D9DADC]/80 dark:text-[#2B2D31]/80">
              {cert.highlights}
            </p>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#D9DADC]/15 pt-3.5 dark:border-[#2B2D31]/15">
          <button
            type="button"
            onClick={() => onOpen(cert)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#FFC93C] px-3 py-1.5 text-xs font-extrabold text-[#2B2D31] shadow-2xs transition hover:-translate-y-0.5 hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFC93C]"
          >
            <Eye aria-hidden="true" className="h-3.5 w-3.5" />
            <span>Preview Certificate</span>
          </button>

          {cert.driveUrl && (
            <a
              href={cert.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-[#D9DADC]/85 transition hover:text-[#FFC93C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFC93C] dark:text-[#2B2D31]/85 dark:hover:text-[#9A6700]"
            >
              <span>Google Drive</span>
              <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}

export default function CertificatesSection({ onSelectCert }) {
  return (
    <section
      id="certificates"
      aria-labelledby="certificates-heading"
      className="border-b border-[#2B2D31]/15 py-14 dark:border-[#D9DADC]/15"
    >
      <RevealSection>
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFC93C] text-[#2B2D31] shadow-sm ring-1 ring-[#2B2D31]/15"
          >
            <Award className="h-4 w-4" />
          </span>
          <h2
            id="certificates-heading"
            className="text-2xl font-extrabold tracking-tight text-[#2B2D31] dark:text-[#D9DADC] sm:text-3xl"
          >
            Verified Certificates
          </h2>
        </div>
        <p className="mt-1.5 text-sm text-[#2B2D31]/80 dark:text-[#D9DADC]/80">
          Click any certificate preview to inspect the full credential document.
        </p>
      </RevealSection>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {CERTIFICATES.map((cert, idx) => (
          <RevealSection key={cert.id ?? cert.title} delay={idx * 90}>
            <CertificateCard cert={cert} onOpen={onSelectCert} />
          </RevealSection>
        ))}
      </div>
    </section>
  );
}
