import GeneratedArtwork from "./GeneratedArtwork";
import type {
  GeneratedVisual,
  Mode,
  RecordData,
  SpotifyTrack,
} from "../data/moodData";

type ResultsModalProps = {
  selectedMood: string;
  selectedData: RecordData;
  selectedType: Mode;
  generatedVisual: GeneratedVisual;
  tracks: SpotifyTrack[];
  resultsVisible: boolean;
  onClose: () => void;
  onRemix: () => void;
  onShare: () => void;
  onMakeAnother: () => void;
};

export default function ResultsModal({
  selectedMood,
  selectedData,
  selectedType,
  generatedVisual,
  tracks,
  resultsVisible,
  onClose,
  onRemix,
  onShare,
  onMakeAnother,
}: ResultsModalProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md transition-opacity duration-500 md:p-7 ${
        resultsVisible ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={`${selectedMood} Moodwave results`}
    >
      <div
        className={`relative max-h-[94vh] w-full max-w-[1500px] overflow-y-auto rounded-[30px] border border-zinc-800 bg-[#090909] shadow-2xl transition-all duration-500 ease-out ${
          resultsVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-5 scale-[0.98] opacity-0"
        }`}
      >
        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-zinc-900 bg-[#090909]/95 px-6 py-5 backdrop-blur-md md:px-10">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
          >
            <span aria-hidden="true">←</span>
            Back to records
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Moodwave results"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-xl text-zinc-400 transition hover:border-zinc-600 hover:bg-zinc-900 hover:text-white"
          >
            ×
          </button>
        </div>

        <div className="grid gap-12 px-6 py-9 md:px-10 md:py-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 xl:px-14">
          <section>
            <p className="text-xs font-bold tracking-[0.28em] text-yellow-300">
              YOUR WAVELENGTH
            </p>

            <h2 className="mt-4 break-words text-5xl font-semibold tracking-tight md:text-7xl xl:text-8xl">
              {selectedMood}
            </h2>

            <p className="mt-3 text-lg text-zinc-400">
              {selectedData.tagline}
            </p>

            <div className="mt-9 aspect-square max-w-[580px]">
              <GeneratedArtwork visual={generatedVisual} />
            </div>

            <div className="mt-5 max-w-[580px]">
              <div className="flex gap-2">
                {generatedVisual.colors.map((color, index) => (
                  <div
                    key={`${color}-${index}`}
                    className="h-2 flex-1 rounded-full"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>

              <div className="mt-3 flex justify-between">
                {generatedVisual.colors.map((color, index) => (
                  <span
                    key={`${color}-${index}`}
                    className="hidden text-[9px] uppercase tracking-wide text-zinc-600 sm:block"
                  >
                    {color}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={onRemix}
                  className="rounded-full border border-zinc-700 px-4 py-2 text-xs font-medium text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-900 hover:text-white"
                >
                  ↻ Remix visual
                </button>
              </div>
            </div>
          </section>

          <section className="min-w-0 lg:pt-1">
            <div className="flex items-end justify-between gap-5 border-b border-zinc-800 pb-6">
              <div>
                <p className="text-xs font-medium tracking-[0.25em] text-zinc-500">
                  {selectedType === "Mood" ? "MOOD MIX" : "MOMENT MIX"}
                </p>

                <h3 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                  For your ears
                </h3>
              </div>

              <p className="shrink-0 text-xs text-zinc-500">
                {tracks.length} tracks
              </p>
            </div>

            <div>
              {tracks.map((track, index) => (
                <div
                  key={track.id}
                  className="grid grid-cols-[28px_64px_minmax(0,1fr)] items-center gap-4 border-b border-zinc-800 py-5 md:grid-cols-[28px_64px_minmax(0,1fr)_auto]"
                >
                  <span className="text-xs text-zinc-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {track.image ? (
                    <img
                      src={track.image}
                      alt=""
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                  ) : (
                    <div
                      className="h-16 w-16 rounded-lg"
                      style={{
                        backgroundColor:
                          generatedVisual.colors[
                            index % generatedVisual.colors.length
                          ],
                      }}
                    />
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white md:text-base">
                      {track.title}
                    </p>

                    <p className="mt-1 truncate text-sm text-zinc-500">
                      {track.artist}
                    </p>
                  </div>

                  <a
                    href={track.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="col-start-3 mt-2 w-fit rounded-full bg-[#1DB954] px-5 py-2.5 text-xs font-semibold text-black transition hover:scale-[1.03] hover:bg-[#1ed760] md:col-auto md:mt-0"
                  >
                    Open in Spotify ↗
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={onShare}
                className="rounded-full bg-[#F4EFE4] px-6 py-4 text-sm font-semibold text-black transition hover:scale-[1.01] hover:bg-white"
              >
                Share your Moodwave
              </button>

              <button
                type="button"
                onClick={onMakeAnother}
                className="rounded-full border border-zinc-700 px-6 py-4 text-sm font-semibold text-white transition hover:border-zinc-500 hover:bg-zinc-900"
              >
                ↻ Make another Moodwave
              </button>
            </div>

            <p className="mt-4 text-xs leading-5 text-zinc-600">
              Music data provided through Spotify.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}