import { useState } from "react";
import {
  Mail,
  Phone,
  Check,
  Copy,
  ExternalLink,
  MapPin,
  Sparkles,
} from "lucide-react";
import RevealSection from "../common/RevealSection";
import SpotlightCard from "../common/SpotlightCard";
import { PERSONAL_INFO } from "../../data/portfolioData";

async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

export default function ContactSection({ region }) {
  const [copiedField, setCopiedField] = useState("");

  const handleCopy = async (text, fieldName) => {
    try {
      await copyToClipboard(text);
      setCopiedField(fieldName);
      setTimeout(() => {
        setCopiedField((prev) => (prev === fieldName ? "" : prev));
      }, 2000);
    } catch {
      setCopiedField("");
    }
  };

  const whatsappUrl = region.whatsapp
    ? `https://wa.me/${region.whatsapp.replace(/\D/g, "")}`
    : null;

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-14">
      <RevealSection>
        <SpotlightCard className="rounded-2xl border border-[#FFC93C]/40 bg-[#2B2D31] p-6 text-[#D9DADC] shadow-xl dark:border-[#FFC93C]/35 dark:bg-[#D9DADC] dark:text-[#2B2D31] sm:p-8">
          {/* Top Header & Primary Actions */}
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="min-w-0">
              <div className="mb-2.5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFC93C] px-3 py-1 font-mono text-[11px] font-extrabold text-[#2B2D31]">
                  <Sparkles aria-hidden="true" className="h-3 w-3" />
                  <span>Direct Channels</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-[#D9DADC]/20 bg-[#D9DADC]/10 px-3 py-1 font-mono text-[11px] font-semibold text-[#D9DADC]/90 dark:border-[#2B2D31]/20 dark:bg-[#2B2D31]/10 dark:text-[#2B2D31]/85">
                  <MapPin
                    aria-hidden="true"
                    className="h-3 w-3 text-[#FFC93C] dark:text-[#2B2D31]"
                  />
                  <span>{region.location}</span>
                </span>
              </div>

              <h2
                id="contact-heading"
                className="text-2xl font-extrabold tracking-tight sm:text-3xl"
              >
                Get in Touch
              </h2>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed opacity-90">
                Open to Full Stack .NET, Back-End .NET, and Front-End
                engineering roles in{" "}
                <strong className="font-extrabold">{region.location}</strong>.
                Switch KSA / Egypt in the top bar for regional contact numbers.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-2 rounded-xl bg-[#FFC93C] px-4 py-2.5 text-sm font-extrabold text-[#2B2D31] shadow-sm transition hover:-translate-y-0.5 hover:opacity-95"
              >
                <Mail aria-hidden="true" className="h-4 w-4 shrink-0" />
                <span>Send Email</span>
              </a>

              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#D9DADC]/30 bg-[#D9DADC]/10 px-4 py-2.5 text-sm font-bold text-[#D9DADC] transition hover:-translate-y-0.5 hover:border-[#FFC93C] hover:text-[#FFC93C] dark:border-[#2B2D31]/30 dark:bg-[#2B2D31] dark:text-[#D9DADC] dark:hover:bg-[#FFC93C] dark:hover:text-[#2B2D31]"
                >
                  <Phone aria-hidden="true" className="h-4 w-4 shrink-0" />
                  <span>WhatsApp ({region.label})</span>
                </a>
              )}
            </div>
          </div>

          {/* Live status announcement for screen readers */}
          <span className="sr-only" aria-live="polite">
            {copiedField ? `${copiedField} copied to clipboard` : ""}
          </span>

          {/* Quick Copy & Profile Cards */}
          <div className="mt-6 grid gap-3 border-t border-[#D9DADC]/15 pt-6 dark:border-[#2B2D31]/15 sm:grid-cols-2 lg:grid-cols-4">
            <button
              type="button"
              onClick={() => handleCopy(PERSONAL_INFO.email, "email")}
              aria-label="Copy email address"
              className="flex min-w-0 items-center justify-between gap-2 rounded-xl border border-[#D9DADC]/20 bg-[#D9DADC]/10 px-3.5 py-2.5 text-left text-xs transition hover:-translate-y-0.5 hover:border-[#FFC93C] dark:border-[#2B2D31]/20 dark:bg-[#2B2D31] dark:text-[#D9DADC]"
            >
              <div className="min-w-0">
                <span className="block font-mono text-[11px] font-bold text-[#FFC93C]">
                  {copiedField === "email" ? "Email Copied" : "Email"}
                </span>
                <span className="block truncate font-mono font-semibold">
                  {PERSONAL_INFO.email}
                </span>
              </div>
              {copiedField === "email" ? (
                <Check
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-[#FFC93C]"
                />
              ) : (
                <Copy
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-[#FFC93C]"
                />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleCopy(region.phone, "phone")}
              aria-label={`Copy phone number for ${region.label}`}
              className="flex min-w-0 items-center justify-between gap-2 rounded-xl border border-[#D9DADC]/20 bg-[#D9DADC]/10 px-3.5 py-2.5 text-left text-xs transition hover:-translate-y-0.5 hover:border-[#FFC93C] dark:border-[#2B2D31]/20 dark:bg-[#2B2D31] dark:text-[#D9DADC]"
            >
              <div className="min-w-0">
                <span className="block font-mono text-[11px] font-bold text-[#FFC93C]">
                  {copiedField === "phone"
                    ? "Phone Copied"
                    : `Phone (${region.label})`}
                </span>
                <span className="block truncate font-mono font-semibold">
                  {region.phone}
                </span>
              </div>
              {copiedField === "phone" ? (
                <Check
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-[#FFC93C]"
                />
              ) : (
                <Copy
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-[#FFC93C]"
                />
              )}
            </button>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-0 items-center justify-between gap-2 rounded-xl border border-[#D9DADC]/20 bg-[#D9DADC]/10 px-3.5 py-2.5 text-xs transition hover:-translate-y-0.5 hover:border-[#FFC93C] dark:border-[#2B2D31]/20 dark:bg-[#2B2D31] dark:text-[#D9DADC]"
            >
              <div className="min-w-0">
                <span className="block font-mono text-[11px] font-bold text-[#FFC93C]">
                  LinkedIn
                </span>
                <span className="block truncate font-mono font-semibold">
                  in/hosammostfa
                </span>
              </div>
              <ExternalLink
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-[#FFC93C]"
              />
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-0 items-center justify-between gap-2 rounded-xl border border-[#D9DADC]/20 bg-[#D9DADC]/10 px-3.5 py-2.5 text-xs transition hover:-translate-y-0.5 hover:border-[#FFC93C] dark:border-[#2B2D31]/20 dark:bg-[#2B2D31] dark:text-[#D9DADC]"
            >
              <div className="min-w-0">
                <span className="block font-mono text-[11px] font-bold text-[#FFC93C]">
                  GitHub
                </span>
                <span className="block truncate font-mono font-semibold">
                  github.com/HosamMosstfa
                </span>
              </div>
              <ExternalLink
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-[#FFC93C]"
              />
            </a>
          </div>
        </SpotlightCard>
      </RevealSection>
    </section>
  );
}
