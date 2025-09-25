"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { writeLetter } from "@/lib/firebaseWrite";
import { ref, get } from "firebase/database";
import { database } from "@/lib/firebase";
import { Letter } from "@/lib/types";

interface LetterComposerProps {
  currentUser: "maged" | "alyana";
  canWriteToday: boolean;
  onSubmit?: (content: string) => void;
}

export function LetterComposer({
  currentUser,
  canWriteToday,
  onSubmit,
}: LetterComposerProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const recipient = currentUser === "maged" ? "alyana" : "maged";

  console.log(recipient);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !canWriteToday) return;

    setIsSubmitting(true);

    const todayKey = new Date().toISOString().split("T")[0];
    const letterRef = ref(database, `letters/${todayKey}/${currentUser}`);

    try {
      const snapshot = await get(letterRef);
      if (snapshot.exists()) {
        alert(
          "You have already written your letter for today. Return tomorrow to continue your correspondence."
        );
        setIsSubmitting(false);
        return;
      }

      const newLetter: Letter = {
        content,
        sender: currentUser.toLowerCase() as "maged" | "alyana",
        timestamp: Date.now(),
        id: `${currentUser.toLowerCase()}-${todayKey}`,
        isSelected: false,
        week: 0,
      };

      // Write the letter to Firebase
      await writeLetter(newLetter);

      setContent("");
      if (onSubmit) onSubmit(content.trim());
    } catch (error) {
      console.error("Error writing letter:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!canWriteToday) {
    return (
      <div className="parchment p-4 sm:p-6 mx-2 sm:mx-4 md:mx-8 text-center">
        <div className="wax-seal mx-auto mb-4 scale-75 sm:scale-100"></div>
        <h3 className="gothic-title text-lg sm:text-xl text-accent mb-2">
          Daily Letter Complete
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground/80">
          You have already written your letter for today. Return tomorrow to
          continue your correspondence.
        </p>
      </div>
    );
  }

  return (
    <div className="parchment torn-edges p-4 sm:p-6 md:p-8 mx-2 sm:mx-4 md:mx-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
        <div className="flex-1">
          <h3 className="gothic-title text-lg sm:text-xl text-accent mb-1">
            Compose Letter
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground/80">
            From: {currentUser} • To: {recipient}
          </p>
        </div>
        <div className="wax-seal scale-75 sm:scale-100 self-end sm:self-auto"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Let your thoughts flow like ink upon ancient parchment..."
          className="min-h-[150px] sm:min-h-[200px] handwritten text-base sm:text-lg bg-transparent border-accent/30 focus:border-accent resize-none"
          disabled={isSubmitting}
        />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-accent/30 gap-3">
          <p className="text-xs text-muted-foreground/60 italic order-2 sm:order-1">
            "Words written in flame, preserved for eternity"
          </p>
          <Button
            type="submit"
            disabled={!content.trim() || isSubmitting}
            className="bg-accent hover:bg-accent/80 text-accent-foreground gothic-title text-sm sm:text-base order-1 sm:order-2 self-end sm:self-auto"
          >
            {isSubmitting ? "Sealing..." : "Seal Letter"}
          </Button>
        </div>
      </form>
    </div>
  );
}
