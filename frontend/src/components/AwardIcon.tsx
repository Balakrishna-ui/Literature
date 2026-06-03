type AwardIconProps = {
  awardId: string;
};

export default function AwardIcon({ awardId }: AwardIconProps) {
  const props = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (awardId) {
    case 'booker':
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
      );
    case 'jnanpith':
      return (
        <svg {...props}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    case 'padma':
      return (
        <svg {...props}>
          <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <path d="M8 21h8M12 17v4M7 4h10c1.1 0 2 .9 2 2v2c0 2.8-2.2 5-5 5H10c-2.8 0-5-2.2-5-5V6c0-1.1.9-2 2-2z" />
        </svg>
      );
  }
}
