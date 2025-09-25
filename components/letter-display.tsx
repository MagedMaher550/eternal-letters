"use client";

import { Button } from "@/components/ui/button";
import { Letter } from "@/lib/types";
import { useState } from "react";
import SelectionConfirmation from "./confirmSelection";
import {
  deselectLetterFirebase,
  selectLetterFirebase,
} from "@/lib/firebaseUpdate";

interface LetterDisplayProps {
  letter: Letter;
  canSelect?: boolean;
  isSelected?: boolean;
  onSelect?: (letterId: string) => void;
  isFlamePassSelection?: boolean;
  currentUser: string;
  isSelectionLocked: boolean;
  canDeselect: boolean;
  weekNumber: number;
}

export function LetterDisplay({
  letter,
  canSelect = false,
  isSelected = false,
  onSelect,
  isFlamePassSelection = false,
  currentUser,
  isSelectionLocked,
  canDeselect,
  weekNumber,
}: LetterDisplayProps) {
  const [showModal, setShowModal] = useState<boolean>(false);

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
      deselectLetterFirebase(letter.id, currentUser, weekNumber)
        .then(() => onSelect?.(letter.id))
        .catch((err) => console.error(err));
    } else {
      selectLetterFirebase(letter.id, currentUser, weekNumber)
        .then(() => onSelect?.(letter.id))
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="relative">
      <div
        className={`parchment torn-edges p-4 sm:p-6 md:p-8 mx-2 sm:mx-4 md:mx-8 relative transition-all duration-300 ${
          isSelected ? "ring-2 ring-ember shadow-lg shadow-ember/20" : ""
        } ${isFlamePassSelection ? "bg-ember/5" : ""}`}
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
              <Button
                disabled={!canDeselect && !isSelected && isSelectionLocked}
                onClick={() => setShowModal(true)}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                className={`gothic-title text-xs sm:text-sm w-full sm:w-auto ${
                  isSelected
                    ? "bg-ember hover:bg-ember/80 text-white"
                    : "border-accent text-accent hover:bg-accent/10"
                }`}
              >
                {isSelected ? "Selected" : "Select"}
              </Button>
            </div>
          )}
        </div>

        <div className="prose prose-sm sm:prose-lg max-w-none mb-6 sm:mb-0">
          <p className="handwritten text-base sm:text-lg leading-relaxed text-balance break-words">
            {letter.content}
          </p>
        </div>

        {isFlamePassSelection && (
          <div className="mt-4 pt-4 border-t border-accent/30">
            <span className="text-xs text-ember font-medium">
              Flame Pass Selection
            </span>
          </div>
        )}

        {isSelected && (
          <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2">
            <div
              className={`text-xl sm:text-2xl ${
                isFlamePassSelection ? "ember-glow animate-pulse" : "ember-glow"
              }`}
            >
              🔥
            </div>
          </div>
        )}
      </div>

      <SelectionConfirmation
        selectedLetter={letter}
        setShowModal={setShowModal}
        showModal={showModal}
        isSelected={isSelected}
        confirmAction={selectLetterHandler}
      />
    </div>
  );
}
