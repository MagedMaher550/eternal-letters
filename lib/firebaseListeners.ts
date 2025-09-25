// /lib/firebaseListeners.ts
import { ref, onValue } from "firebase/database";
import { database } from "./firebase"; // import your firebase instance

// Subscribe to all letters
export const subscribeLetters = (callback: (data: any) => void) => {
    const lettersRef = ref(database, "letters"); // listen to all letters
    onValue(lettersRef, (snapshot) => {
        const data = snapshot.val() || [];

        callback(data);
    });
};
