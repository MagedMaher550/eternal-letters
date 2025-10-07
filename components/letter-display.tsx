"use client";

import { Button } from "@/components/ui/button";
import { FlamePass, Letter } from "@/lib/types";
import { useState } from "react";
import SelectionConfirmation from "./confirmSelection";
import {
  deselectLetterFirebase,
  selectLetterFirebase,
} from "@/lib/firebaseUpdate";
import FlameIndicator from "./flameIndicator";
import { useFlamePassFirebase } from "@/lib/firebaseFlamePasses";

interface LetterDisplayProps {
  letter: Letter;
  canSelect?: boolean;
  onSelect?: (letterId: string) => void;
  currentUser: string;
  isSelectionLocked: boolean;
  weeklyFlamePass: FlamePass | undefined;
  weekNumber: number;
}

export function LetterDisplay({
  letter,
  canSelect = false,
  onSelect,
  currentUser,
  isSelectionLocked,
  weeklyFlamePass,
  weekNumber,
}: LetterDisplayProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isFlamePassUsage, setIsFlamePassUsage] = useState<boolean>(false);

  const isSelected =
    currentUser === "maged"
      ? letter.isSelectedByMaged
      : letter.isSelectedByAlyana;

  // Only allow deselect if this user is the one who selected
  const canDeselect = isSelected;

  // Disable select button if:
  // - user is trying to select a different letter while week is locked
  // - or trying to deselect another user’s letter (blocked by canDeselect)
  const disableButton = !canDeselect && !isSelected && isSelectionLocked;

  const getFormattedDate = (timestamp: any): string => {
    // Normalize Firestore Timestamp or plain string/Date
    const date =
      typeof timestamp === "object" && timestamp && "toDate" in timestamp
        ? timestamp.toDate()
        : new Date(timestamp);

    if (isNaN(date.getTime())) return "Invalid date";

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const capitalizeSenderName = (name: string) =>
    `From ${letter.sender.charAt(0).toUpperCase()}${letter.sender.slice(1)}`;

  const selectLetterHandler = () => {
    if (isSelected) {
      deselectLetterFirebase(letter.id, letter.sender, currentUser, weekNumber)
        .then(() => onSelect?.(letter.id))
        .catch((err) => console.error(err));
    } else {
      selectLetterFirebase(letter.id, letter.sender, currentUser, weekNumber)
        .then(() => onSelect?.(letter.id))
        .catch((err) => console.error(err));
    }
  };

  const flamePassUsageHandler = async () => {
    try {
      // Select the letter
      await selectLetterFirebase(
        letter.id,
        letter.sender,
        currentUser,
        weekNumber
      );
      onSelect?.(letter.id);

      // Mark the flame pass as used if it exists
      if (weeklyFlamePass) {
        await useFlamePassFirebase(weeklyFlamePass.id);
        console.log(`Flame pass ${weeklyFlamePass.id} used successfully`);
      }
    } catch (err) {
      console.error("Error during flame pass usage:", err);
    }
  };

  return (
    <div className="relative">
      <div
        className={`parchment torn-edges p-4 sm:p-6 md:p-8 mx-2 sm:mx-4 md:mx-8 relative transition-all duration-300 ${
          isSelected ? "ring-2 ring-ember shadow-lg shadow-ember/20" : ""
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2 sm:gap-3">
          <div className="flex-1">
            <h3 className="gothic-title text-lg sm:text-xl text-accent mb-1 break-words">
              {capitalizeSenderName(letter.sender)}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground/80">
              {getFormattedDate(letter.timestamp)}
            </p>
          </div>
          {canSelect && (
            <div className="flex-shrink-0 mt-2 sm:mt-0">
              {!disableButton ? (
                <Button
                  onClick={() => setShowModal(true)}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  className={`gothic-title text-xs sm:text-sm w-full sm:w-auto ${
                    isSelected
                      ? "bg-ember hover:bg-ember/80 text-white"
                      : "border-accent text-accent hover:bg-accent/10"
                  }`}
                >
                  {isSelected ? "Deselect" : "Select"}
                </Button>
              ) : weeklyFlamePass ? (
                <Button
                  onClick={() => {
                    setShowModal(true);
                    setIsFlamePassUsage(true);
                  }}
                  disabled={false}
                  variant="outline"
                  size="sm"
                  className="gothic-title text-xs sm:text-sm w-full sm:w-auto border-accent text-accent hover:bg-accent/10"
                >
                  Use Flame Pass
                </Button>
              ) : (
                <Button
                  onClick={() => setShowModal(true)}
                  disabled
                  variant="outline"
                  size="sm"
                  className="gothic-title text-xs sm:text-sm w-full sm:w-auto border-accent text-accent/50"
                >
                  Select
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="prose prose-sm sm:prose-lg max-w-none mb-6 sm:mb-0">
          <p className="handwritten text-base sm:text-lg leading-relaxed text-balance break-words">
            {letter.content}
          </p>
        </div>

        {/* {isFlamePassSelection && (
          <div className="mt-4 pt-4 border-t border-accent/30">
            <span className="text-xs text-ember font-medium">
              Flame Pass Selection
            </span>
          </div>
        )} */}

        <FlameIndicator
          isSelectedByAlyana={letter.isSelectedByAlyana}
          isSelectedByMaged={letter.isSelectedByMaged}
        />
      </div>

      <SelectionConfirmation
        selectedLetter={letter}
        setShowModal={setShowModal}
        showModal={showModal}
        isSelected={isSelected}
        confirmAction={
          isFlamePassUsage ? flamePassUsageHandler : selectLetterHandler
        }
        isFlamePassUsage={isFlamePassUsage}
      />
    </div>
  );
}
