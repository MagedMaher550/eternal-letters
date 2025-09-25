// /lib/letters.ts
import { ref, update } from "firebase/database";
import { database } from "./firebase";

const getDatePart = (letterId: string) => letterId.split("-").slice(1).join("-");

export const selectLetterFirebase = async (
    letterId: string,
    sender: string,
    week: number
) => {
    const datePart = getDatePart(letterId);
    const letterRef = ref(database, `letters/${datePart}/${sender}`);
    await update(letterRef, { isSelected: true });
};

export const deselectLetterFirebase = async (
    letterId: string,
    sender: string,
    week: number
) => {
    const datePart = getDatePart(letterId);
    const letterRef = ref(database, `letters/${datePart}/${sender}`);
    await update(letterRef, { isSelected: false });
};
