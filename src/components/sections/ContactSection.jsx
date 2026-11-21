import { useState } from "react";
import { Mail, Phone, Check, Copy, ExternalLink } from "lucide-react";
import RevealSection from "../common/RevealSection";
import SpotlightCard from "../common/SpotlightCard";
import { PERSONAL_INFO } from "../../data/portfolioData";

export default function ContactSection({ region }) {
  const [copiedField, setCopiedField] = useState("");

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(""), 2000);
  };

  return (
    <section id="contact" className="py-14">
      <RevealSection>
        <SpotlightCard className="rounded-2xl border border-[#FFC93C]/40 bg-[#2B2D31] p-6 text-[#D9DADC] shadow-xl dark:bg-[#D9DADC] dark:text-[#2B2D31] sm:p-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-2xl font-extrabold">Get in Touch</h2>
              <p className="mt-1.5 max-w-xl text-sm opacity-90">
                Open to Full Stack .NET, Back-End .NET, and Front-End
                engineering roles in{" "}
                <strong className="font-extrabold">{region.location}</strong>.
                Switch KSA / Egypt in the top bar for regional contact numbers.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-2 rounded-lg bg-[#FFC93C] px-4 py-2.5 text-sm font-extrabold text-[#2B2D31] shadow-sm transition hover:-translate-y-0.5 hover:opacity-95"
              >
                <Mail className="h-4 w-4" />
                <span>Send Email</span>
              </a>
              <a
                href={`https://wa.me/${region.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#D9DADC]/30 bg-[#D9DADC]/10 px-4 py-2.5 text-sm font-bold text-[#D9DADC] transition hover:-translate-y-0.5 hover:border-[#FFC93C] hover:text-[#FFC93C] dark:border-[#2B2D31]/30 dark:bg-[#2B2D31] dark:text-[#D9DADC] dark:hover:bg-[#FFC93C] dark:hover:text-[#2B2D31]"
              >
                <Phone className="h-4 w-4" />
                <span>WhatsApp ({region.label})</span>
              </a>
            </div>
          </div>

          <div className="mt-6 grid gap-3 border-t border-[#D9DADC]/15 pt-6 dark:border-[#2B2D31]/15 sm:grid-cols-2 lg:grid-cols-4">
            <button
              type="button"
              onClick={() => handleCopy(PERSONAL_INFO.email, "email")}
              className="flex items-center justify-between rounded-xl border border-[#D9DADC]/20 bg-[#D9DADC]/10 px-3.5 py-2.5 text-left text-xs transition hover:border-[#FFC93C] dark:border-[#2B2D31]/20 dark:bg-[#2B2D31] dark:text-[#D9DADC]"
            >
              <div className="truncate pr-2">
                <span className="block text-[#FFC93C]">Email</span>
                <span className="font-mono font-semibold">
                  {PERSONAL_INFO.email}
                </span>
              </div>
              {copiedField === "email" ? (
                <Check className="h-4 w-4 shrink-0 text-[#FFC93C]" />
              ) : (
                <Copy className="h-4 w-4 shrink-0 text-[#FFC93C]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleCopy(region.phone, "phone")}
              className="flex items-center justify-between rounded-xl border border-[#D9DADC]/20 bg-[#D9DADC]/10 px-3.5 py-2.5 text-left text-xs transition hover:border-[#FFC93C] dark:border-[#2B2D31]/20 dark:bg-[#2B2D31] dark:text-[#D9DADC]"
            >
              <div>
                <span className="block text-[#FFC93C]">
                  Phone ({region.label})
                </span>
                <span className="font-mono font-semibold">{region.phone}</span>
              </div>
              {copiedField === "phone" ? (
                <Check className="h-4 w-4 shrink-0 text-[#FFC93C]" />
              ) : (
                <Copy className="h-4 w-4 shrink-0 text-[#FFC93C]" />
              )}
            </button>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-xl border border-[#D9DADC]/20 bg-[#D9DADC]/10 px-3.5 py-2.5 text-xs transition hover:border-[#FFC93C] dark:border-[#2B2D31]/20 dark:bg-[#2B2D31] dark:text-[#D9DADC]"
            >
              <div>
                <span className="block text-[#FFC93C]">LinkedIn</span>
                <span className="font-mono font-semibold">in/hosammostfa</span>
              </div>
              <ExternalLink className="h-4 w-4 text-[#FFC93C]" />
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-xl border border-[#D9DADC]/20 bg-[#D9DADC]/10 px-3.5 py-2.5 text-xs transition hover:border-[#FFC93C] dark:border-[#2B2D31]/20 dark:bg-[#2B2D31] dark:text-[#D9DADC]"
            >
              <div>
                <span className="block text-[#FFC93C]">GitHub</span>
                <span className="font-mono font-semibold">
                  github.com/HosamMosstfa
                </span>
              </div>
              <ExternalLink className="h-4 w-4 text-[#FFC93C]" />
            </a>
          </div>
        </SpotlightCard>
      </RevealSection>
    </section>
  );
}
