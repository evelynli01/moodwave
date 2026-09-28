import type { RefObject } from "react";
import GeneratedArtwork from "./GeneratedArtwork";
import type {
  GeneratedVisual,
  Mode,
} from "../data/moodData";

type ShareModalProps = {
  selectedMood: string;
  selectedType: Mode;
  generatedVisual: GeneratedVisual;
  shareDate: string;
  showNoteInput: boolean;
  shareNote: string;
  isDownloading: boolean;
  shareCardRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onShowNoteInput: () => void;
  onRemoveNote: () => void;
  onNoteChange: (value: string) => void;
  onDownload: () => void;
};

export default function ShareModal({
  selectedMood,
  selectedType,
  generatedVisual,
  shareDate,
  showNoteInput,
  shareNote,
  isDownloading,
  shareCardRef,
  onClose,
  onShowNoteInput,
  onRemoveNote,
  onNoteChange,
  onDownload,
}: ShareModalProps) {
  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Share your Moodwave"
    >
      <div className="my-auto w-full max-w-[660px] rounded-[28px] border border-zinc-700 bg-[#10100e] p-5 shadow-2xl sm:p-7">
        <div className="mb-6 flex items-start justify-between gap-6">
          <div>
            <h3 className="text-3xl font-semibold tracking-tight">
              Share your Moodwave
            </h3>

            <p className="mt-2 text-zinc-400">
              Save a snapshot of how today feels.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close share modal"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-2xl text-zinc-500 transition hover:bg-zinc-900 hover:text-white"
          >
            ×
          </button>
        </div>

        <div
          ref={shareCardRef}
          className="relative aspect-square w-full overflow-hidden rounded-[22px] bg-black text-white"
        >
          <div className="absolute inset-0">
            <GeneratedArtwork
              visual={generatedVisual}
              rounded={false}
            />
          </div>

          <div className="absolute inset-0 bg-black/20" />

          <div className="relative z-10 flex h-full flex-col p-8 sm:p-10">
            <div className="flex items-start justify-between gap-5">
              <p className="text-sm font-bold tracking-[0.24em] sm:text-base">
                MOODWAVE
              </p>

              <p className="text-right text-xs font-semibold tracking-[0.18em] sm:text-sm">
                {shareDate}
              </p>
            </div>

            <div className="my-auto">
              <p className="text-lg font-medium drop-shadow-md sm:text-xl">
                My {selectedType.toLowerCase()} is
              </p>

              <h4 className="mt-3 break-words text-5xl font-medium leading-none tracking-[-0.04em] drop-shadow-lg sm:text-7xl">
                {selectedMood}
              </h4>

              {showNoteInput && shareNote.trim() && (
                <p className="mt-5 max-w-[90%] text-lg font-medium leading-relaxed drop-shadow-md sm:text-xl">
                  {shareNote}
                </p>
              )}
            </div>

            <div>
              <div className="flex gap-3">
                {generatedVisual.colors.map((color, index) => (
                  <div
                    key={`${color}-${index}`}
                    className="h-1.5 flex-1 rounded-full border border-white/20"
                    style={{
                      backgroundColor: color,
                    }}
                  />
                ))}
              </div>

              <div className="mt-5 flex items-end justify-between gap-4">
                <p className="text-xs font-semibold tracking-[0.16em] drop-shadow">
                  SOUND + COLOR
                </p>

                <p className="text-xs font-medium drop-shadow">
                  made with moodwave
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-zinc-800 bg-black/30 p-4">
          {!showNoteInput ? (
            <div className="flex items-center justify-between gap-5">
              <div>
                <p className="text-sm font-medium text-white">
                  Personalize your Moodwave
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Add a note about what made you feel this way today.
                </p>
              </div>

              <button
                type="button"
                onClick={onShowNoteInput}
                className="shrink-0 rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-white transition hover:border-zinc-500 hover:bg-zinc-900"
              >
                + Add a note
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="share-note"
                  className="text-sm font-medium text-white"
                >
                  Add a note
                </label>

                <button
                  type="button"
                  onClick={onRemoveNote}
                  className="text-xs text-zinc-500 transition hover:text-white"
                >
                  Remove note
                </button>
              </div>

              <input
                id="share-note"
                type="text"
                value={shareNote}
                maxLength={80}
                autoFocus
                onChange={(event) =>
                  onNoteChange(event.target.value)
                }
                placeholder="What made you feel this way today?"
                className="mt-3 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-500"
              />

              <div className="mt-2 flex justify-end">
                <span className="text-xs text-zinc-600">
                  {shareNote.length} / 80
                </span>
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onDownload}
          disabled={isDownloading}
          className="mt-4 flex w-full items-center justify-center gap-3 rounded-full bg-[#F4EFE4] px-6 py-4 font-semibold text-black transition hover:bg-white disabled:cursor-wait disabled:opacity-60"
        >
          <span aria-hidden="true">↓</span>

          {isDownloading
            ? "Creating image..."
            : "Download Moodwave"}
        </button>

        <p className="mt-3 text-center text-xs text-zinc-600">
          Downloads as a PNG you can save or share anywhere.
        </p>
      </div>
    </div>
  );
}