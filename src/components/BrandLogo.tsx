import { companyConfig } from '../config/company';

interface BrandLogoProps {
  inverted?: boolean;
}

export function BrandLogo({ inverted = false }: BrandLogoProps) {
  return (
    <a
      href="#topo"
      className="inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F3B51B] rounded-lg"
      aria-label={`${companyConfig.brandName}: ir para o topo`}
    >
      <span
        className={`w-10 h-10 rounded-[10px] flex items-center justify-center border transition-colors ${
          inverted
            ? 'bg-[#F3B51B] border-[#F3B51B] text-[#25272B]'
            : 'bg-[#25272B] border-[#25272B] text-[#F3B51B] group-hover:bg-[#F3B51B] group-hover:text-[#25272B]'
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
            inverted ? 'text-white' : 'text-[#25272B]'
          }`}
        >
          {companyConfig.brandName}
        </span>
        <span
          className={`text-[10px] font-semibold tracking-[0.16em] uppercase mt-0.5 ${
            inverted ? 'text-[#D6D9DE]' : 'text-[#656B73]'
          }`}
        >
          {companyConfig.brandSubtitle}
        </span>
      </span>
    </a>
  );
}

