import { ref, set } from "firebase/database";
import { database } from "./firebase";
import { Letter } from "./types";

// Function to compute the current week number
const getWeekNumber = (date: Date) => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const diff = date.getTime() - startOfYear.getTime();
    return Math.ceil((diff / (1000 * 60 * 60 * 24) + startOfYear.getDay() + 1) / 7);
};

export const writeLetter = async (
    letter: Letter
) => {

    const today = new Date();
    const dateKey = today.toISOString().split("T")[0]; // YYYY-MM-DD
    const weekNumber = getWeekNumber(today);

    const { content, sender: userId, isSelected, timestamp } = letter

    const newLetter: Letter = {
        week: weekNumber,
        content,
        timestamp,
        sender: userId,
        id: `${userId}-${dateKey}`, // optional unique ID
        isSelected
    };

    const letterRef = ref(database, `letters/${dateKey}/${userId}`);
    await set(letterRef, newLetter);
};
