import { useState } from "react";
import {
  Activity,
  ShieldAlert,
  Cpu,
  Image as ImageIcon,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function SmartPoolVisualPreview({
  compact = false,
  screenshots = [],
}) {
  const [activeTab, setActiveTab] = useState(
    screenshots.length > 0 ? "screenshots" : "vision",
  );
  const [activeShot, setActiveShot] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imgErrors, setImgErrors] = useState({});

  const validShots = screenshots.filter((_, idx) => !imgErrors[idx]);

  const handleNext = () => {
    setActiveShot((prev) => (prev + 1) % screenshots.length);
  };

  const handlePrev = () => {
    setActiveShot(
      (prev) => (prev - 1 + screenshots.length) % screenshots.length,
    );
  };

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-[#FFC93C]/40 bg-[#1B1D20] text-[#D9DADC] shadow-xl">
        {/* Top Window Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D9DADC]/10 bg-[#141619] px-4 py-2.5 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="mr-1 flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#D9DADC]/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#D9DADC]/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFC93C]" />
            </span>
            <span className="font-bold tracking-wide text-[#FFC93C]">
              SMARTPOOL VISION OS
            </span>
          </div>

          {/* Interactive View Switcher */}
          <div className="flex flex-wrap items-center gap-1 rounded-lg bg-[#2B2D31] p-0.5 text-[11px]">
            {screenshots.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab("screenshots")}
                className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 font-bold transition ${
                  activeTab === "screenshots"
                    ? "bg-[#FFC93C] text-[#2B2D31]"
                    : "text-[#D9DADC]/75 hover:text-[#D9DADC]"
                }`}
              >
                <ImageIcon className="h-3 w-3" />
                <span>Real UI ({screenshots.length})</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setActiveTab("vision")}
              className={`rounded-md px-2.5 py-1 font-bold transition ${
                activeTab === "vision"
                  ? "bg-[#FFC93C] text-[#2B2D31]"
                  : "text-[#D9DADC]/75 hover:text-[#D9DADC]"
              }`}
            >
              AI Simulation
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("metrics")}
              className={`rounded-md px-2.5 py-1 font-bold transition ${
                activeTab === "metrics"
                  ? "bg-[#FFC93C] text-[#2B2D31]"
                  : "text-[#D9DADC]/75 hover:text-[#D9DADC]"
              }`}
            >
              Telemetry
            </button>
          </div>
        </div>

        {/* Tab 1: Real Project Screenshots Showcase */}
        {activeTab === "screenshots" && (
          <div className="p-3.5 sm:p-4">
            {validShots.length > 0 ? (
              <div>
                <div className="group relative overflow-hidden rounded-xl border border-[#D9DADC]/15 bg-[#0F172A]">
                  {/* Image Container with subtle bottom crop to keep UI clean */}
                  <div
                    className={`relative w-full overflow-hidden ${
                      compact ? "h-56 sm:h-64" : "h-64 sm:h-80"
                    }`}
                  >
                    <img
                      src={screenshots[activeShot]?.src}
                      alt={
                        screenshots[activeShot]?.caption || "Project Screenshot"
                      }
                      onError={() =>
                        setImgErrors((prev) => ({
                          ...prev,
                          [activeShot]: true,
                        }))
                      }
                      className="h-[108%] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>

                  {/* Prev / Next Arrows */}
                  {screenshots.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={handlePrev}
                        aria-label="Previous screenshot"
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 rounded-full bg-[#141619]/80 p-1.5 text-white opacity-0 backdrop-blur-sm transition hover:bg-[#FFC93C] hover:text-[#2B2D31] group-hover:opacity-100"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        aria-label="Next screenshot"
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full bg-[#141619]/80 p-1.5 text-white opacity-0 backdrop-blur-sm transition hover:bg-[#FFC93C] hover:text-[#2B2D31] group-hover:opacity-100"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </>
                  )}

                  {/* Fullscreen Expand Button */}
                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    title="Expand full image"
                    className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-lg bg-[#141619]/85 px-2.5 py-1 font-mono text-[10px] font-bold text-[#FFC93C] backdrop-blur-sm transition hover:bg-[#FFC93C] hover:text-[#2B2D31]"
                  >
                    <Maximize2 className="h-3 w-3" />
                    <span>Zoom</span>
                  </button>

                  {/* Caption Bar */}
                  {screenshots[activeShot]?.caption && (
                    <div className="border-t border-[#D9DADC]/10 bg-[#141619]/95 px-3 py-2 font-mono text-[11px] text-[#D9DADC]/90">
                      {screenshots[activeShot].caption}
                    </div>
                  )}
                </div>

                {/* Thumbnail Selector Pills */}
                {screenshots.length > 1 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {screenshots.map((shot, idx) => (
                      <button
                        key={shot.src}
                        type="button"
                        onClick={() => setActiveShot(idx)}
                        className={`rounded-md px-2.5 py-1 font-mono text-[11px] font-bold transition ${
                          activeShot === idx
                            ? "bg-[#FFC93C] text-[#2B2D31]"
                            : "bg-[#2B2D31] text-[#D9DADC]/75 hover:text-white"
                        }`}
                      >
                        0{idx + 1} · {shot.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-56 flex-col items-center justify-center rounded-xl border border-dashed border-[#D9DADC]/20 bg-[#232529] p-4 text-center">
                <ImageIcon className="h-6 w-6 text-[#FFC93C]" />
                <p className="mt-2 text-xs font-bold text-[#D9DADC]">
                  Put your 4 renamed images inside{" "}
                  <code className="text-[#FFC93C]">/public/projects/</code>
                </p>
                <p className="mt-1 text-[11px] text-[#D9DADC]/65">
                  smartpool-ai-detection.jpg, smartpool-dashboard.png,
                  smartpool-users.png, smartpool-login.png
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: AI Vision Architecture Simulation */}
        {activeTab === "vision" && (
          <div className="p-3.5 sm:p-4">
            <svg
              viewBox="0 0 600 245"
              className={`w-full rounded-xl border border-[#D9DADC]/12 bg-[#232529] ${
                compact ? "h-56 sm:h-64" : "h-64 sm:h-72"
              }`}
              role="img"
              aria-label="SMARTPOOL AI Computer Vision Swimming Pool Monitoring Interface"
            >
              <defs>
                <pattern
                  id="poolGrid"
                  width="30"
                  height="30"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 30 0 L 0 0 0 30"
                    fill="none"
                    stroke="#D9DADC"
                    strokeOpacity="0.06"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>

              <rect
                x="16"
                y="16"
                width="372"
                height="213"
                rx="12"
                fill="url(#poolGrid)"
                stroke="#D9DADC"
                strokeOpacity="0.18"
              />
              <rect
                x="16"
                y="16"
                width="372"
                height="28"
                rx="12"
                fill="#181A1D"
              />
              <circle cx="32" cy="30" r="4" fill="#FFC93C" />
              <text
                x="44"
                y="33"
                fill="#D9DADC"
                fontSize="10"
                fontWeight="bold"
                fontFamily="monospace"
              >
                CAM-01 · DEEP LEARNING BOUNDING BOXES
              </text>

              <line
                x1="28"
                y1="106"
                x2="376"
                y2="106"
                stroke="#D9DADC"
                strokeOpacity="0.14"
                strokeDasharray="6 6"
              />
              <line
                x1="28"
                y1="166"
                x2="376"
                y2="166"
                stroke="#D9DADC"
                strokeOpacity="0.14"
                strokeDasharray="6 6"
              />

              <g transform="translate(36, 56)">
                <text
                  x="0"
                  y="0"
                  fill="#D9DADC"
                  fontSize="9.5"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  ID #01 · NORMAL (98.4%)
                </text>
                <rect
                  x="0"
                  y="6"
                  width="135"
                  height="32"
                  rx="6"
                  fill="#D9DADC"
                  fillOpacity="0.06"
                  stroke="#D9DADC"
                  strokeWidth="1.5"
                />
                <circle cx="20" cy="22" r="5" fill="#D9DADC" />
                <line
                  x1="32"
                  y1="22"
                  x2="118"
                  y2="22"
                  stroke="#D9DADC"
                  strokeOpacity="0.4"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>

              <g transform="translate(215, 118)">
                <text
                  x="0"
                  y="0"
                  fill="#D9DADC"
                  fontSize="9.5"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  ID #02 · NORMAL (96.1%)
                </text>
                <rect
                  x="0"
                  y="6"
                  width="145"
                  height="32"
                  rx="6"
                  fill="#D9DADC"
                  fillOpacity="0.06"
                  stroke="#D9DADC"
                  strokeWidth="1.5"
                />
                <circle cx="20" cy="22" r="5" fill="#D9DADC" />
                <line
                  x1="32"
                  y1="22"
                  x2="125"
                  y2="22"
                  stroke="#D9DADC"
                  strokeOpacity="0.4"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>

              <g transform="translate(46, 176)">
                <text
                  x="0"
                  y="0"
                  fill="#FFC93C"
                  fontSize="9.5"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  ⚠ ID #03 · DROWNING DETECTED
                </text>
                <rect
                  x="0"
                  y="6"
                  width="175"
                  height="34"
                  rx="6"
                  fill="#FFC93C"
                  fillOpacity="0.18"
                  stroke="#FFC93C"
                  strokeWidth="2"
                />
                <circle cx="22" cy="23" r="6" fill="#FFC93C" />
                <text
                  x="36"
                  y="26"
                  fill="#FFC93C"
                  fontSize="9.5"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  DISPATCHING GUARD
                </text>
              </g>

              <rect
                x="402"
                y="16"
                width="182"
                height="213"
                rx="12"
                fill="#2B2D31"
                stroke="#D9DADC"
                strokeOpacity="0.18"
              />
              <text
                x="416"
                y="38"
                fill="#FFC93C"
                fontSize="10.5"
                fontWeight="bold"
                fontFamily="monospace"
              >
                LIVE TELEMETRY
              </text>

              <rect
                x="416"
                y="50"
                width="154"
                height="46"
                rx="8"
                fill="#1F2124"
              />
              <text
                x="426"
                y="67"
                fill="#D9DADC"
                fillOpacity="0.65"
                fontSize="8.5"
                fontFamily="monospace"
              >
                ACTIVE SWIMMERS
              </text>
              <text
                x="426"
                y="85"
                fill="#D9DADC"
                fontSize="12"
                fontWeight="bold"
                fontFamily="monospace"
              >
                03 TRACKED
              </text>

              <rect
                x="416"
                y="106"
                width="154"
                height="52"
                rx="8"
                fill="#FFC93C"
                fillOpacity="0.15"
                stroke="#FFC93C"
                strokeWidth="1.2"
              />
              <text
                x="426"
                y="124"
                fill="#FFC93C"
                fontSize="8.5"
                fontWeight="bold"
                fontFamily="monospace"
              >
                INCIDENT ALERT
              </text>
              <text
                x="426"
                y="143"
                fill="#FFC93C"
                fontSize="11"
                fontWeight="bold"
                fontFamily="monospace"
              >
                ZONE 3 · CRITICAL
              </text>

              <rect
                x="416"
                y="168"
                width="154"
                height="48"
                rx="8"
                fill="#1F2124"
              />
              <text
                x="426"
                y="185"
                fill="#D9DADC"
                fillOpacity="0.65"
                fontSize="8.5"
                fontFamily="monospace"
              >
                ALERT LATENCY
              </text>
              <text
                x="426"
                y="203"
                fill="#D9DADC"
                fontSize="11.5"
                fontWeight="bold"
                fontFamily="monospace"
              >
                &lt; 180 ms (REAL-TIME)
              </text>
            </svg>
          </div>
        )}

        {/* Tab 3: Engineering & Competition Metrics */}
        {activeTab === "metrics" && (
          <div className="grid gap-3 p-4 sm:grid-cols-3">
            <div className="rounded-xl border border-[#D9DADC]/15 bg-[#232529] p-3.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#FFC93C]">
                <Activity className="h-4 w-4" />
                <span>Real-Time Inference</span>
              </div>
              <p className="mt-2 text-lg font-extrabold text-[#D9DADC]">
                &lt; 180 ms
              </p>
              <p className="mt-1 text-xs text-[#D9DADC]/75">
                Instant frame analysis &amp; WebSocket alert push to lifeguard
                tablets.
              </p>
            </div>

            <div className="rounded-xl border border-[#D9DADC]/15 bg-[#232529] p-3.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#FFC93C]">
                <ShieldAlert className="h-4 w-4" />
                <span>Role-Based Security</span>
              </div>
              <p className="mt-2 text-lg font-extrabold text-[#D9DADC]">
                RBAC + Auth
              </p>
              <p className="mt-1 text-xs text-[#D9DADC]/75">
                Protected Next.js middleware separating Facility Admins &amp;
                Lifeguards.
              </p>
            </div>

            <div className="rounded-xl border border-[#D9DADC]/15 bg-[#232529] p-3.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#FFC93C]">
                <Cpu className="h-4 w-4" />
                <span>Incident Logging</span>
              </div>
              <p className="mt-2 text-lg font-extrabold text-[#D9DADC]">
                MongoDB Atlas
              </p>
              <p className="mt-1 text-xs text-[#D9DADC]/75">
                Time-stamped swimmer trajectories, zone heatmaps, and response
                logs.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal when user clicks "Zoom" */}
      {isLightboxOpen && validShots.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative max-w-4xl overflow-hidden rounded-2xl border border-[#FFC93C]/50 bg-[#141619] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#D9DADC]/15 px-4 py-3">
              <span className="font-mono text-xs font-bold text-[#FFC93C]">
                0{activeShot + 1} / 0{screenshots.length} ·{" "}
                {screenshots[activeShot]?.label}
              </span>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="rounded-lg bg-[#2B2D31] p-1.5 text-[#D9DADC] hover:bg-[#FFC93C] hover:text-[#2B2D31]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <img
              src={screenshots[activeShot]?.src}
              alt={screenshots[activeShot]?.caption}
              className="max-h-[78vh] w-full object-contain"
            />
            {screenshots[activeShot]?.caption && (
              <p className="border-t border-[#D9DADC]/15 bg-[#1B1D20] px-4 py-3 font-mono text-xs text-[#D9DADC]">
                {screenshots[activeShot].caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
