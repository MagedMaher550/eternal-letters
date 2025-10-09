export function ScrollEdge() {
  return (
    <>
      {/* Top torn edge */}
      <div className="absolute -top-px left-0 right-0 h-4 overflow-hidden">
        <svg
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 1200 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 12C20 8 40 16 60 12C80 8 100 16 120 12C140 8 160 16 180 12C200 8 220 16 240 12C260 8 280 16 300 12C320 8 340 16 360 12C380 8 400 16 420 12C440 8 460 16 480 12C500 8 520 16 540 12C560 8 580 16 600 12C620 8 640 16 660 12C680 8 700 16 720 12C740 8 760 16 780 12C800 8 820 16 840 12C860 8 880 16 900 12C920 8 940 16 960 12C980 8 1000 16 1020 12C1040 8 1060 16 1080 12C1100 8 1120 16 1140 12C1160 8 1180 16 1200 12V24H0V12Z"
            fill="#f5deb3"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Bottom torn edge */}
      <div className="absolute -bottom-px left-0 right-0 h-4 overflow-hidden">
        <svg
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 1200 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 12C20 16 40 8 60 12C80 16 100 8 120 12C140 16 160 8 180 12C200 16 220 8 240 12C260 16 280 8 300 12C320 16 340 8 360 12C380 16 400 8 420 12C440 16 460 8 480 12C500 16 520 8 540 12C560 16 580 8 600 12C620 16 640 8 660 12C680 16 700 8 720 12C740 16 760 8 780 12C800 16 820 8 840 12C860 16 880 8 900 12C920 16 940 8 960 12C980 16 1000 8 1020 12C1040 16 1060 8 1080 12C1100 16 1120 8 1140 12C1160 16 1180 8 1200 12V0H0V12Z"
            fill="#f5deb3"
            opacity="0.3"
          />
        </svg>
      </div>
    </>
  );
}
