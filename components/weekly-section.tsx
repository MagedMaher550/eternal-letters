"use client";

import { useState } from "react";
import { LetterDisplay } from "./letter-display";
import { WeeklyDivider } from "./weekly-divider";
import { Button } from "@/components/ui/button";
import { FlamePass, Letter } from "@/lib/types";
import { getCurrentWeekNumber } from "@/lib/utils";

interface WeeklySectionProps {
  weekNumber: number;
  letters: Letter[];
  isCurrentWeek?: boolean;
  canSelectLetters?: boolean;
  alyanaSelectedLetter?: Letter | undefined;
  magedSelectedLetter?: Letter | undefined;
  onLetterSelect?: (letterId: string) => void;
  currentUser: string;
  flamePasses: FlamePass[];
}

export function WeeklySection({
  weekNumber,
  letters,
  isCurrentWeek = false,
  canSelectLetters = false,
  magedSelectedLetter,
  alyanaSelectedLetter,
  onLetterSelect,
  currentUser,
  flamePasses,
}: WeeklySectionProps) {
  const [isExpanded, setIsExpanded] = useState(isCurrentWeek);

  const currentWeekNumber = getCurrentWeekNumber();

  const isWeekLocked =
    weekNumber < currentWeekNumber || // past weeks are locked
    letters.some(
      (
        l // user can only select one letter a week
      ) =>
        currentUser === "maged" ? l.isSelectedByMaged : l.isSelectedByAlyana
    );

  const hasFlamePassSelection = flamePasses.some(
    (fp) =>
      fp.for === currentUser && fp.used && fp.weekNumber === currentWeekNumber
  );

  const weeklyFlamePass = flamePasses.find(
    (fp) => fp.for === currentUser && !fp.used
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="relative">
        <WeeklyDivider
          weekNumber={weekNumber}
          isComplete={!isCurrentWeek}
          hasSelectedLetter={!!alyanaSelectedLetter || !!magedSelectedLetter}
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
              return (
                <LetterDisplay
                  key={letter.id}
                  letter={letter}
                  canSelect={canSelectLetters}
                  onSelect={onLetterSelect}
                  currentUser={currentUser}
                  isSelectionLocked={isWeekLocked}
                  weekNumber={weekNumber}
                  weeklyFlamePass={weeklyFlamePass}
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
                  {magedSelectedLetter || alyanaSelectedLetter ? (
                    <>
                      {/* Letters selection info */}
                      <span className="text-xs sm:text-sm text-ember font-medium">
                        {magedSelectedLetter || alyanaSelectedLetter
                          ? `Letter${
                              magedSelectedLetter && alyanaSelectedLetter
                                ? "s"
                                : ""
                            } selected for discussion`
                          : "No letters selected"}
                      </span>

                      {/* Flame Pass usage info */}
                      {hasFlamePassSelection && (
                        <span className="text-xs sm:text-sm text-amber-500 font-medium">
                          Flame Pass used for selection
                        </span>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        No letter selected
                      </span>
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
