
export function BrandLogo({ className = "h-9 w-9" }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer Chamfered Architectural Badge */}
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="12"
        fill="#181A1E"
        stroke="#FFC93C"
        strokeWidth="2"
      />

      {/* Subtle Inner Technical Frame */}
      <rect
        x="6"
        y="6"
        width="36"
        height="36"
        rx="8.5"
        stroke="#D9DADC"
        strokeOpacity="0.14"
        strokeWidth="1"
      />

      {/* Left Pillar of 'H' (Clean Silver) */}
      <path
        d="M14.5 14V34"
        stroke="#D9DADC"
        strokeWidth="3.6"
        strokeLinecap="round"
      />

      {/* Right Pillar of 'H' (Signature Gold) */}
      <path
        d="M33.5 14V34"
        stroke="#FFC93C"
        strokeWidth="3.6"
        strokeLinecap="round"
      />

      {/* Crossbar + 'F' Top Bar Accent (Full-Stack Bridge) */}
      <path
        d="M14.5 24H33.5"
        stroke="#FFC93C"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M25.5 14H33.5"
        stroke="#FFC93C"
        strokeWidth="3.4"
        strokeLinecap="round"
      />

      {/* Precision Terminal Node Dot */}
      <circle cx="20" cy="14" r="2.2" fill="#FFC93C" />
    </svg>
  );
}

export const GithubIcon = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export const LinkedinIcon = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
  </svg>
);
