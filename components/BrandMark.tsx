import Link from 'next/link';

type BrandMarkProps = {
  href?: string;
  tone?: 'light' | 'dark' | 'lime';
  size?: 'sm' | 'md' | 'lg';
  showDfw?: boolean;
  className?: string;
  onClick?: () => void;
};

const sizeMap = {
  sm: 'text-lg sm:text-xl',
  md: 'text-xl sm:text-2xl',
  lg: 'text-2xl sm:text-3xl',
};

export function BrandMark({
  href = '/',
  tone = 'dark',
  size = 'md',
  showDfw = true,
  className = '',
  onClick,
}: BrandMarkProps) {
  const tones = {
    light: 'text-white',
    dark: 'text-ink',
    lime: 'text-ink',
  };

  const content = (
    <span className={`inline-flex items-baseline gap-1.5 font-display font-black tracking-tight ${sizeMap[size]} ${tones[tone]} ${className}`}>
      <span>
        Clean
        <span className={tone === 'light' ? 'text-lime' : 'text-ink'}>Freaks</span>
      </span>
      {showDfw && (
        <span
          className={`translate-y-[-2px] rounded-[2px] px-1.5 py-0.5 text-[0.55em] font-extrabold uppercase tracking-[0.14em] ${
            tone === 'light'
              ? 'bg-lime text-ink'
              : tone === 'lime'
                ? 'bg-ink text-lime'
                : 'bg-ink text-lime'
          }`}
        >
          DFW
        </span>
      )}
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} onClick={onClick} className="inline-flex items-center">
      {content}
    </Link>
  );
}
