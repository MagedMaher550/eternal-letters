"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { LetterComposer } from "@/components/letter-composer";
import { WeeklySection } from "@/components/weekly-section";
import { AuthGuard } from "@/components/auth-guard";
import { useAuth } from "@/contexts/auth-context";
import { subscribeLetters } from "@/lib/firebaseListeners";
import { writeLetter } from "@/lib/firebaseWrite";
import { Letter } from "@/lib/types";
import BonfireLoader from "@/components/glowingFlameLoader";
import { normalizeDate } from "@/lib/utils";

/**
 * HomePage component
 * ------------------
 * Main page for the Eternal Letters app.
 * Displays the LetterComposer, weekly letters, and navigation.
 */
export default function HomePage() {
  const { currentUser } = useAuth();

  // -------------------------
  // Loading & letters state
  // -------------------------
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * lettersByDate: Stores letters structured by date and user.
   * {
   *   '2025-09-25': { maged?: Letter, alyana?: Letter }
   * }
   */
  const [lettersByDate, setLettersByDate] = useState<
    Record<string, Record<string, Letter>>
  >({});

  // -------------------------
  // Subscribe to Firebase letters
  // -------------------------
  useEffect(() => {
    subscribeLetters((data) => {
      setLettersByDate(data);
      setLoading(false); // letters loaded, can compute canWriteToday
    });
  }, []);

  // -------------------------
  // Determine if current user can write today
  // -------------------------
  // Normalize the user key
  const userKey = currentUser?.toLowerCase() as "maged" | "alyana";

  // Compute "today" in the user's local time (browser time)
  const todayKey = normalizeDate(new Date()).toLocaleDateString("en-CA"); // YYYY-MM-DD

  // Determine if the user can write today
  const canWriteToday = !loading && !lettersByDate[todayKey]?.[userKey];

  // -------------------------
  // Flatten letters for weekly view (newest first)
  // -------------------------
  const lettersArray: Letter[] = Object.values(lettersByDate)
    .flatMap((dayObj) => Object.values(dayObj))
    .sort((a, b) => b.timestamp - a.timestamp); // 👈 changed

  // -------------------------
  // Compute all weeks and current week (newest first)
  // -------------------------
  const weeks = [
    ...new Set(lettersArray.map((letter) => letter.week).filter(Boolean)),
  ].sort((a, b) => b - a);

  const currentWeek = Math.max(...weeks, 1);

  // -------------------------
  // Selected letters & completed weeks state
  // -------------------------
  const [selectedLetters, setSelectedLetters] = useState<
    Record<string, Record<number, string>>
  >({
    Maged: {},
    Alyana: {},
  });

  const [completedWeeks, setCompletedWeeks] = useState<
    Record<string, Set<number>>
  >({
    Maged: new Set(),
    Alyana: new Set(),
  });

  // -------------------------
  // Handle new letter submission
  // -------------------------
  const handleLetterSubmit = async (content: string) => {
    if (!currentUser) return;

    const newLetter: Letter = {
      content,
      sender: currentUser.toLowerCase() as "maged" | "alyana",
      timestamp: Date.now(),
      week: currentWeek,
      id: `${currentUser.toLowerCase()}-${todayKey}`,
      isSelectedByAlyana: false,
      isSelectedByMaged: false,
    };

    try {
      await writeLetter(newLetter);
      console.log(`New letter submitted by ${currentUser}:`, content);
    } catch (err) {
      console.error("Error writing letter:", err);
    }
  };

  // -------------------------
  // Handle letter selection per week
  // -------------------------
  const handleLetterSelect = (weekNumber: number) => (letterId: string) => {
    setSelectedLetters((prev) => ({
      ...prev,
      [currentUser!]: {
        ...prev[currentUser!],
        [weekNumber]:
          prev[currentUser!]?.[weekNumber] === letterId ? "" : letterId,
      },
    }));
  };

  // -------------------------
  // Render HomePage
  // -------------------------
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Navigation flamePasses={[]} />

        {!loading ? (
          <main className="container mx-auto px-2 sm:px-4 py-6 sm:py-8 max-w-4xl">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="gothic-title text-3xl sm:text-4xl md:text-6xl text-primary mb-2 sm:mb-4">
                Eternal Letters
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg">
                Where souls commune through ancient scrolls
              </p>
            </div>

            {/* Letter Composer */}
            <div className="mb-8 sm:mb-12">
              <LetterComposer
                currentUser={currentUser!}
                onSubmit={handleLetterSubmit}
                canWriteToday={canWriteToday}
              />
            </div>

            {/* Weekly Letters */}
            <div className="space-y-6 sm:space-y-8">
              {weeks.map((week) => {
                const now = Date.now();

                const weekLetters = lettersArray.filter(
                  (letter) => letter.week === week
                );

                const isCurrentWeek = week === currentWeek;
                const isCompleted =
                  completedWeeks[currentUser!]?.has(week) || false;
                const canSelectLetters = isCurrentWeek || !isCompleted;

                const magedSelectedLetter = weekLetters.find(
                  (letter) => letter.isSelectedByMaged
                );
                const alyanaSelectedLetter = weekLetters.find(
                  (letter) => letter.isSelectedByAlyana
                );

                return week ? (
                  <WeeklySection
                    key={`${week}#${now}`}
                    weekNumber={week}
                    letters={weekLetters}
                    isCurrentWeek={isCurrentWeek}
                    canSelectLetters={canSelectLetters}
                    magedSelectedLetter={magedSelectedLetter}
                    alyanaSelectedLetter={alyanaSelectedLetter}
                    onLetterSelect={handleLetterSelect(week)}
                    hasFlamePassSelection={false} // Integrate flame pass logic later
                    canUseFlamePass={false}
                    onUseFlamePass={() => {}}
                    currentUser={currentUser!}
                  />
                ) : (
                  <></>
                );
              })}
            </div>
          </main>
        ) : (
          <BonfireLoader />
        )}
      </div>
    </AuthGuard>
  );
}
