export function BrandLogo({
  light = false,
  className = '',
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 ${className}`}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="bestcrm-logo-grad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#4C1D95" />
          </linearGradient>
        </defs>
        <rect width="36" height="36" rx="10" fill="url(#bestcrm-logo-grad)" />
        <path
          d="M12.5 9.5V26.5M12.5 18.2C13.6 16.5 15.6 15.4 18 15.4C21.5 15.4 24 18 24 21.1C24 24.3 21.4 26.8 17.8 26.8C15.5 26.8 13.6 25.8 12.5 24.2"
          stroke="#FFFFFF"
          strokeWidth="3.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="11.2" r="2.2" fill="#DDD6FE" />
      </svg>
      <span
        className={`text-xl font-extrabold tracking-tight font-[var(--font-display)] ${
          light ? 'text-white' : 'text-[#1E1B4B]'
        }`}
      >
        best<span className={light ? 'text-[#DDD6FE]' : 'text-[#7C3AED]'}>CRM</span>
      </span>
    </span>
  );
}
