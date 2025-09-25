"use client";

import { useState } from "react";
import { LetterDisplay } from "./letter-display";
import { WeeklyDivider } from "./weekly-divider";
import { Button } from "@/components/ui/button";
import { Letter } from "@/lib/types";

interface WeeklySectionProps {
  weekNumber: number;
  letters: Letter[];
  isCurrentWeek?: boolean;
  canSelectLetters?: boolean;
  selectedLetter?: Letter | undefined;
  onLetterSelect?: (letterId: string) => void;
  onWeekComplete?: (weekNumber: number, selectedLetter?: string) => void;
  hasFlamePassSelection?: boolean;
  canUseFlamePass?: boolean;
  onUseFlamePass?: () => void;
  currentUser: string;
}

export function WeeklySection({
  weekNumber,
  letters,
  isCurrentWeek = false,
  canSelectLetters = false,
  selectedLetter,
  onLetterSelect,
  onWeekComplete,
  hasFlamePassSelection = false,
  canUseFlamePass = false,
  onUseFlamePass,
  currentUser,
}: WeeklySectionProps) {
  const [isExpanded, setIsExpanded] = useState(isCurrentWeek);

  const isWeekLocked = letters.some(
    (l) => l.week === weekNumber && l.isSelected
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="relative">
        <WeeklyDivider
          weekNumber={weekNumber}
          isComplete={!isCurrentWeek}
          hasSelectedLetter={!!selectedLetter}
          hasFlamePassSelection={hasFlamePassSelection}
        />

        {/* Week Status Indicator */}
        <div className="absolute top-0 right-2 sm:right-4 flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
          {isCurrentWeek && (
            <span className="ember-glow text-xs sm:text-sm font-medium">
              Current Week
            </span>
          )}
          {hasFlamePassSelection && (
            <span className="text-xs sm:text-sm text-ember font-medium">
              Flame Pass Used
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-muted-foreground hover:text-foreground text-xs sm:text-sm"
          >
            {isExpanded ? "Collapse" : "Expand"}
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-4 sm:space-y-6">
          {/* Letters */}
          <div className="space-y-4 sm:space-y-6">
            {letters.map((letter) => {
              const canDeselect = (letter: Letter) => {
                const letterWeek = letter.week;
                const currentWeek = weekNumber; // implement a function to get week number
                return (
                  selectedLetter?.id === letter.id && currentWeek === letterWeek
                );
              };

              return (
                <LetterDisplay
                  key={letter.id}
                  letter={letter}
                  canSelect={canSelectLetters}
                  isSelected={letter.isSelected}
                  onSelect={onLetterSelect}
                  isFlamePassSelection={
                    hasFlamePassSelection && selectedLetter?.id === letter.id
                  }
                  currentUser={currentUser}
                  isSelectionLocked={isWeekLocked}
                  canDeselect={canDeselect(letter)}
                  weekNumber={weekNumber}
                />
              );
            })}
          </div>

          {/* Week Summary */}
          <div className="parchment p-3 sm:p-4 mx-2 sm:mx-4 md:mx-8 bg-accent/5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h4 className="gothic-title text-base sm:text-lg text-accent mb-1">
                  Week {weekNumber} Summary
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {letters.length} letters exchanged
                </p>
              </div>

              {canSelectLetters && (
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                  {selectedLetter ? (
                    <span className="text-xs sm:text-sm text-ember font-medium">
                      {hasFlamePassSelection
                        ? "Flame Pass selection"
                        : "Letter selected for discussion"}
                    </span>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        No letter selected
                      </span>
                      {canUseFlamePass && (
                        <Button
                          onClick={onUseFlamePass}
                          size="sm"
                          variant="outline"
                          className="border-ember text-ember hover:bg-ember/10 gothic-title bg-transparent text-xs sm:text-sm"
                        >
                          Use Flame Pass
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
