"use client";

interface FlameIndicatorProps {
  isSelectedByMaged: boolean;
  isSelectedByAlyana: boolean;
  isFlamePassSelection?: boolean;
}

export default function FlameIndicator({
  isSelectedByMaged,
  isSelectedByAlyana,
  isFlamePassSelection = false,
}: FlameIndicatorProps) {
  if (!isSelectedByMaged && !isSelectedByAlyana) return null;

  return (
    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 flex space-x-1">
      {isSelectedByMaged && (
        <div
          className={`text-xl sm:text-2xl ember-glow ${
            isFlamePassSelection ? "animate-pulse" : ""
          }`}
        >
          🔥
        </div>
      )}
      {isSelectedByAlyana && (
        <div
          className={`text-xl sm:text-2xl purple-glow ${
            isFlamePassSelection ? "animate-pulse" : ""
          }`}
        >
          🔥
        </div>
      )}
    </div>
  );
}
