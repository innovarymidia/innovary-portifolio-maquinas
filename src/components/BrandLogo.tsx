import type { CompanyConfig } from '../config/company';

interface BrandLogoProps {
  company: CompanyConfig;
  inverted?: boolean;
}

export function BrandLogo({ company, inverted = false }: BrandLogoProps) {
  if (company.logoSrc) {
    return (
      <a
        href="#topo"
        className={`inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[10px] ${
          inverted ? 'bg-white px-3 py-2' : ''
        }`}
        aria-label={`${company.brandName}: ir para o topo`}
      >
        <img
          src={company.logoSrc}
          alt={company.logoAlt ?? `${company.brandName} ${company.brandSubtitle}`}
          className={inverted ? 'h-11 w-auto object-contain' : 'h-10 sm:h-14 w-auto object-contain'}
        />
      </a>
    );
  }

  return (
    <a
      href="#topo"
      className="inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
      aria-label={`${company.brandName}: ir para o topo`}
    >
      <span
        className={`w-10 h-10 rounded-[10px] flex items-center justify-center border transition-colors ${
          inverted
            ? 'bg-accent border-accent text-dark'
            : 'bg-dark border-dark text-accent group-hover:bg-accent group-hover:text-dark'
        }`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
          <path
            d="M4 18h14v2.5H4V18Zm1.5-2 3.2-6.5h5.1l1.7 3.3h2.8l-1.4 3.2H5.5Z"
            fill="currentColor"
          />
          <path
            d="M14.5 9.5 18 4.5l2.5 1.8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-2xl font-extrabold tracking-tight uppercase ${
            inverted ? 'text-white' : 'text-dark'
          }`}
        >
          {company.brandName}
        </span>
        <span
          className={`text-[10px] font-semibold tracking-[0.16em] uppercase mt-0.5 ${
            inverted ? 'text-line' : 'text-muted'
          }`}
        >
          {company.brandSubtitle}
        </span>
      </span>
    </a>
  );
}
