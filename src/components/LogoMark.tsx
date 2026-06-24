import type { SVGProps } from 'react';

type LogoMarkProps = SVGProps<SVGSVGElement>;

export default function LogoMark({ className, ...props }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <defs>
        <linearGradient id="logo-mark-blue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>

      <circle cx="50" cy="50" r="46" stroke="url(#logo-mark-blue)" strokeWidth="2.5" opacity="0.35" />
      <circle cx="50" cy="50" r="38" stroke="url(#logo-mark-blue)" strokeWidth="3" />

      <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.45">
        <line x1="50" y1="14" x2="50" y2="24" />
        <line x1="50" y1="76" x2="50" y2="86" />
        <line x1="14" y1="50" x2="24" y2="50" />
        <line x1="76" y1="50" x2="86" y2="50" />
        <line x1="24.5" y1="24.5" x2="31.5" y2="31.5" />
        <line x1="68.5" y1="68.5" x2="75.5" y2="75.5" />
        <line x1="24.5" y1="75.5" x2="31.5" y2="68.5" />
        <line x1="68.5" y1="31.5" x2="75.5" y2="24.5" />
      </g>

      <path
        d="M34 30 V58 H42 V42 H52 C58 42 62 46 62 52 C62 58 58 62 52 62 H34 V70 H54 C64 70 70 62 70 52 C70 42 64 34 54 34 H34 Z"
        fill="currentColor"
        className="text-white"
      />
      <path
        d="M66 30 H58 V70 H74 C80 70 84 66 84 60 C84 54 80 50 74 50 H66 V30 Z M66 38 V46 H72 C74 46 76 48 76 50 C76 52 74 54 72 54 H66 V38 Z"
        fill="url(#logo-mark-blue)"
      />

      <circle cx="38" cy="38" r="4" fill="currentColor" className="text-white" opacity="0.2" />
    </svg>
  );
}
