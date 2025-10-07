"use client";

import { Letter } from "@/lib/types";

interface SelectionConfirmationProps {
  showModal: boolean;
  selectedLetter: Letter | null;
  setShowModal: (value: boolean) => void;
  isSelected: boolean;
  isFlamePassUsage: boolean;
  confirmAction: () => void;
}

export default function SelectionConfirmation({
  showModal,
  selectedLetter,
  setShowModal,
  isSelected,
  isFlamePassUsage,
  confirmAction,
}: SelectionConfirmationProps) {
  if (!showModal || !selectedLetter) return <></>;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      {/* Scroll background */}
      <div className="bg-yellow-100/95 border-2 border-amber-800 rounded-xl shadow-lg max-w-sm w-full relative overflow-hidden">
        {/* Burned edges effect */}
        <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-black/60 to-transparent"></div>

        <div className="p-6 text-center">
          <h2 className="text-2xl font-black text-amber-800 mb-3 tracking-widest">
            Confirm{" "}
            {!isFlamePassUsage
              ? isSelected
                ? "Deselection"
                : "Selection"
              : "flame pass usage"}
          </h2>
          <p className="mb-6 text-sm text-gray-800 italic">
            {!isFlamePassUsage ? (
              <>
                Do you wish to {!isSelected ? "claim" : "abandon"}
                this letter for the week?
              </>
            ) : (
              <>
                Do you wish to use a <strong>Flame Pass</strong> to claim this
                letter? <br />
                This action is <strong>irreversible</strong>. <br />
                Once you use your flame pass, it'll be gone forever
              </>
            )}
          </p>

          <div className="flex justify-center gap-4">
            <button
              className="px-4 py-2 bg-gray-800 text-yellow-100 font-semibold rounded hover:bg-gray-700 transition"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-amber-800 text-yellow-50 font-bold rounded hover:bg-amber-700 transition"
              onClick={async () => {
                confirmAction();
                setShowModal(false);
              }}
            >
              Confirm
            </button>
          </div>
        </div>

        {/* Optional subtle parchment texture overlay */}
        <div className="absolute inset-0 bg-[url('/textures/parchment.png')] bg-cover opacity-10 pointer-events-none"></div>
      </div>
    </div>
  );
}
