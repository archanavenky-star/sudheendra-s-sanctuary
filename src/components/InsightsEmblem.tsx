const InsightsEmblem = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 64 64"
    aria-hidden="true"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="32" cy="32" r="4" fill="currentColor" />
    <circle cx="32" cy="32" r="13" stroke="currentColor" strokeWidth="1.5" strokeDasharray="1 5" strokeLinecap="round" />
    <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="1.5" strokeDasharray="1 6" strokeLinecap="round" />
    <circle cx="32" cy="32" r="29" stroke="currentColor" strokeWidth="1" strokeDasharray="1 8" strokeLinecap="round" opacity="0.55" />
  </svg>
);

export default InsightsEmblem;