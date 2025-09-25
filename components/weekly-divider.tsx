interface WeeklyDividerProps {
  weekNumber: number
  isComplete?: boolean
  hasSelectedLetter?: boolean
  hasFlamePassSelection?: boolean
}

export function WeeklyDivider({
  weekNumber,
  isComplete = false,
  hasSelectedLetter = false,
  hasFlamePassSelection = false,
}: WeeklyDividerProps) {
  return (
    <div className="relative py-6 sm:py-8">
      <div className="burned-scroll"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`bg-background px-3 sm:px-6 py-2 border rounded-lg flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3 ${
            isComplete ? "border-ember" : "border-accent"
          }`}
        >
          <h2
            className={`gothic-title text-xl sm:text-2xl text-center sm:text-left ${isComplete ? "text-ember ember-glow" : "text-primary rune-glow"}`}
          >
            Week {weekNumber}
          </h2>

          {isComplete && (
            <div className="flex items-center justify-center sm:justify-start space-x-1">
              {hasSelectedLetter ? (
                <div className="flex items-center space-x-1">
                  <span className="ember-glow text-base sm:text-lg">🔥</span>
                  {hasFlamePassSelection && <span className="text-xs text-ember font-medium">FP</span>}
                </div>
              ) : (
                <span className="text-muted-foreground text-xs sm:text-sm">(No selection)</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
