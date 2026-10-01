type EmblemProps = { className?: string };

export const BodhiLeafEmblem = ({ className = "" }: EmblemProps) => (
  <svg viewBox="0 0 120 148" aria-hidden="true" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M60 3C60 25 43 34 27 51C10 69 1 91 8 111C15 132 34 142 60 144C86 142 105 132 112 111C119 91 110 69 93 51C77 34 60 25 60 3Z" fill="currentColor" />
    <path d="M60 18V145M60 60L38 42M60 82L27 63M60 103L18 86M60 60L82 42M60 82L93 63M60 103L102 86" stroke="hsl(var(--background))" strokeWidth="1.6" strokeLinecap="round" opacity="0.78" />
    <path d="M60 144C61 137 65 131 70 127" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const LotusEmblem = ({ className = "" }: EmblemProps) => (
  <svg viewBox="0 0 180 112" aria-hidden="true" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M90 91C70 72 68 39 90 8C112 39 110 72 90 91Z" fill="currentColor" />
    <path d="M82 93C56 83 38 57 42 25C70 39 84 65 82 93Z" fill="currentColor" opacity="0.92" />
    <path d="M98 93C124 83 142 57 138 25C110 39 96 65 98 93Z" fill="currentColor" opacity="0.92" />
    <path d="M72 99C43 99 18 83 8 57C38 56 63 71 72 99Z" fill="currentColor" opacity="0.84" />
    <path d="M108 99C137 99 162 83 172 57C142 56 117 71 108 99Z" fill="currentColor" opacity="0.84" />
    <path d="M90 100C61 111 31 108 12 94C39 89 64 92 90 100ZM90 100C119 111 149 108 168 94C141 89 116 92 90 100Z" fill="currentColor" opacity="0.7" />
  </svg>
);