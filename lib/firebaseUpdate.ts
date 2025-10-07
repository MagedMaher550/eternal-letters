// /lib/letters.ts
import { ref, update } from "firebase/database";
import { database } from "./firebase";

const getDatePart = (letterId: string) => letterId.split("-").slice(1).join("-");

export const selectLetterFirebase = async (
    letterId: string,
    sender: string,
    currentUser: string,
    week: number
) => {


    const updatedObject = currentUser === 'maged' ? { isSelectedByMaged: true } : { isSelectedByAlyana: true }
    const datePart = getDatePart(letterId);
    const letterRef = ref(database, `letters/${datePart}/${sender}`);


    console.log(`letters/${datePart}/${sender}`)


    await update(letterRef, updatedObject);
};

export const deselectLetterFirebase = async (
    letterId: string,
    sender: string,
    currentUser: string,
    week: number,
) => {

    const updatedObject = currentUser === 'maged' ? { isSelectedByMaged: false } : { isSelectedByAlyana: false }
    const datePart = getDatePart(letterId);
    const letterRef = ref(database, `letters/${datePart}/${sender}`);
    await update(letterRef, updatedObject);
};
