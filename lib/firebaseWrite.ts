import { ref, set } from "firebase/database";
import { database } from "./firebase";
import { Letter } from "./types";
import { normalizeDate } from "./utils";

// Function to compute the current week number
const getWeekNumber = (date: Date) => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const diff = date.getTime() - startOfYear.getTime();
    return Math.ceil((diff / (1000 * 60 * 60 * 24) + startOfYear.getDay() + 1) / 7);
};

export const writeLetter = async (
    letter: Letter
) => {

    const today = normalizeDate(new Date());
    const dateKey = today.toISOString().split("T")[0]; // YYYY-MM-DD
    const weekNumber = getWeekNumber(today);

    const { content, sender: userId, isSelectedByAlyana, isSelectedByMaged, timestamp } = letter


    const newLetter: Letter = {
        week: weekNumber,
        content,
        timestamp,
        sender: userId,
        id: `${userId}-${dateKey}`, // optional unique ID
        isSelectedByAlyana,
        isSelectedByMaged
    };

    const letterRef = ref(database, `letters/${dateKey}/${userId}`);
    await set(letterRef, newLetter);
};
