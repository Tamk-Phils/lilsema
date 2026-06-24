import LogoMark from './LogoMark';

type LogoProps = {
  className?: string;
  textClassName?: string;
  showText?: boolean;
};

export default function Logo({
  className = 'w-6 h-6 md:w-10 md:h-10',
  textClassName = 'text-sm md:text-xl',
  showText = true,
}: LogoProps) {
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <LogoMark className={`shrink-0 ${className}`} />
      {showText && (
        <span className={`font-black tracking-tighter uppercase whitespace-nowrap ${textClassName}`}>
          Lil Sema<span className="text-blue-500">&apos;</span>s
        </span>
      )}
    </div>
  );
}
