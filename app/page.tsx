"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "Mood" | "Moment";

type SpotifyTrack = {
  id: string;
  title: string;
  artist: string;
  image: string | null;
  spotifyUrl: string;
};

type RecordData = {
  name: string;
  tagline: string;
  colors: string[];
};

const recordData: Record<string, RecordData> = {
  Happy: {
    name: "Happy",
    tagline: "Bright days, turned all the way up.",
    colors: ["#FDE047", "#FDBA74", "#FB7185", "#F9A8D4", "#86EFAC"],
  },
  Sad: {
    name: "Sad",
    tagline: "Soft edges, heavy feelings.",
    colors: ["#64748B", "#172554", "#A5B4FC", "#94A3B8", "#67E8F9"],
  },
  Energetic: {
    name: "Energetic",
    tagline: "Fast pulse, full color.",
    colors: ["#FF6B1A", "#EF233C", "#E9FF2A", "#FF2A8A", "#7C3AED"],
  },
  Calm: {
    name: "Calm",
    tagline: "Breathe out. Let everything soften.",
    colors: ["#A7F3D0", "#2DD4BF", "#BAE6FD", "#99F6E4", "#FEF3C7"],
  },
  Romantic: {
    name: "Romantic",
    tagline: "Warm light, close distance.",
    colors: ["#881337", "#FB7185", "#FECDD3", "#86198F", "#FFF7ED"],
  },
  Focused: {
    name: "Focused",
    tagline: "Clear mind, steady rhythm.",
    colors: ["#1E3A8A", "#0F766E", "#9CA3AF", "#C4B5FD", "#F8FAFC"],
  },
  Studying: {
    name: "Studying",
    tagline: "Quiet focus for the pages ahead.",
    colors: ["#78350F", "#FDE68A", "#FDBA74", "#FEF3C7", "#A16207"],
  },
  "Working Out": {
    name: "Working Out",
    tagline: "Move harder. Turn it louder.",
    colors: ["#EF4444", "#F97316", "#FDE047", "#EC4899", "#7C3AED"],
  },
  Celebrating: {
    name: "Celebrating",
    tagline: "Big energy for a moment worth keeping.",
    colors: ["#8B5CF6", "#FDE047", "#F472B6", "#67E8F9", "#FB923C"],
  },
  "Road Trip": {
    name: "Road Trip",
    tagline: "Windows down. Somewhere ahead.",
    colors: ["#7DD3FC", "#FDBA74", "#FDE047", "#FB7185", "#38BDF8"],
  },
  Heartbreak: {
    name: "Heartbreak",
    tagline: "For everything you haven't let go of yet.",
    colors: ["#7F1D1D", "#18181B", "#A78BFA", "#52525B", "#E4E4E7"],
  },
};

const moods = ["Happy", "Sad", "Energetic", "Calm", "Romantic", "Focused"];

const moments = [
  "Studying",
  "Working Out",
  "Celebrating",
  "Road Trip",
  "Heartbreak",
];

const wait = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

function AlbumLabel({ selection }: { selection: string }) {
  const colors = recordData[selection]?.colors ?? [
    "#27272A",
    "#52525B",
    "#71717A",
    "#A1A1AA",
  ];

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-full"
      style={{ backgroundColor: colors[0] }}
    >
      <div
        className="absolute -right-2 top-1 h-[70%] w-[70%] rounded-full"
        style={{ backgroundColor: colors[1] }}
      />
      <div
        className="absolute bottom-0 h-[25%] w-full"
        style={{ backgroundColor: colors[2] }}
      />
      <div
        className="absolute left-[15%] top-[25%] h-[32%] w-[32%] rounded-full"
        style={{ backgroundColor: colors[3] }}
      />
    </div>
  );
}

function RecordCard({
  name,
  onSelect,
}: {
  name: string;
  onSelect: () => void;
}) {
  const colors = recordData[name].colors;

  return (
    <button
      type="button"
      onClick={onSelect}
      className="group shrink-0 text-left"
    >
      <div className="relative h-32 w-36">
        <div className="absolute right-0 top-2 h-28 w-28 rounded-full border border-zinc-700 bg-zinc-950 transition-transform duration-300 group-hover:translate-x-3">
          <div
            className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: colors[0] }}
          />
        </div>

        <div
          className="absolute left-0 top-0 h-32 w-32 overflow-hidden rounded transition-transform duration-300 group-hover:-translate-y-2"
          style={{ backgroundColor: colors[0] }}
        >
          <div
            className="absolute -right-4 top-3 h-20 w-20 rounded-full"
            style={{ backgroundColor: colors[1] }}
          />
          <div
            className="absolute bottom-0 h-8 w-full"
            style={{ backgroundColor: colors[2] }}
          />
          <div
            className="absolute left-4 top-6 h-10 w-10 rounded-full"
            style={{ backgroundColor: colors[3] }}
          />
        </div>
      </div>

      <p className="mt-2 text-sm">{name}</p>
    </button>
  );
}

function PaletteArtwork({ colors }: { colors: string[] }) {
  return (
    <div
      className="relative aspect-square w-full overflow-hidden rounded-[26px]"
      style={{ backgroundColor: colors[3] }}
    >
      <div
        className="absolute -bottom-[12%] -left-[15%] h-[76%] w-[76%] rounded-full"
        style={{ backgroundColor: colors[0] }}
      />
      <div
        className="absolute -right-[17%] -top-[10%] h-[67%] w-[67%] rounded-full"
        style={{ backgroundColor: colors[1] }}
      />
      <div
        className="absolute bottom-[3%] right-[4%] h-[36%] w-[36%] rounded-full"
        style={{ backgroundColor: colors[2] }}
      />
      <div
        className="absolute left-[43%] top-[41%] h-[18%] w-[18%] rounded-full"
        style={{ backgroundColor: colors[3] }}
      />
      <div
        className="absolute right-[2%] top-[46%] h-[7%] w-[25%] rounded-full opacity-90"
        style={{ backgroundColor: colors[4] }}
      />
    </div>
  );
}

export default function Home() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("Mood");

  const [needleDropping, setNeedleDropping] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);

  const [showResults, setShowResults] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false);

  const needleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestId = useRef(0);

  const playerBusy = needleDropping || isSpinning || isGenerating;
  const selectedData = selectedMood ? recordData[selectedMood] : null;

  useEffect(() => {
    if (!showResults) {
      setResultsVisible(false);
      return;
    }

    const frame = requestAnimationFrame(() => {
      setResultsVisible(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [showResults]);

  useEffect(() => {
    return () => {
      if (needleTimer.current) {
        clearTimeout(needleTimer.current);
      }
    };
  }, []);

  function clearNeedleTimer() {
    if (needleTimer.current) {
      clearTimeout(needleTimer.current);
      needleTimer.current = null;
    }
  }

  function selectRecord(selection: string) {
    if (playerBusy) return;

    setSelectedMood(selection);
    setTracks([]);
    setApiError(null);
    setIsReady(false);
  }

  async function generateMoodwave(selection: string, currentRequest: number) {
    try {
      const minimumSpin = wait(2500);

      const spotifyRequest = fetch(
        `/api/spotify?selection=${encodeURIComponent(selection)}`
      ).then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Spotify couldn't find music for this Moodwave."
          );
        }

        return data;
      });

      const [spotifyData] = await Promise.all([
        spotifyRequest,
        minimumSpin,
      ]);

      if (requestId.current !== currentRequest) {
        return;
      }

      const newTracks: SpotifyTrack[] = spotifyData.tracks ?? [];

      setIsGenerating(false);
      setIsSpinning(false);

      if (newTracks.length === 0) {
        setTracks([]);
        setIsReady(false);
        setApiError(
          "We couldn't find any tracks for this Moodwave. Try dropping the needle again."
        );
        return;
      }

      setTracks(newTracks);
      setApiError(null);
      setIsReady(true);
      setShowResults(true);
    } catch (error) {
      if (requestId.current !== currentRequest) {
        return;
      }

      console.error("Moodwave generation error:", error);

      setIsGenerating(false);
      setIsSpinning(false);
      setIsReady(false);
      setTracks([]);
      setApiError(
        "We couldn't find your sound. Try dropping the needle again."
      );
    }
  }

  function dropNeedle() {
    if (!selectedMood || playerBusy) return;

    clearNeedleTimer();

    const selection = selectedMood;
    const currentRequest = requestId.current + 1;
    requestId.current = currentRequest;

    setApiError(null);
    setTracks([]);
    setNeedleDropping(true);
    setIsReady(false);

    needleTimer.current = setTimeout(() => {
      if (requestId.current !== currentRequest) {
        return;
      }

      setNeedleDropping(false);
      setIsSpinning(true);
      setIsGenerating(true);

      generateMoodwave(selection, currentRequest);
    }, 900);
  }

  function stopRecord() {
    requestId.current += 1;
    clearNeedleTimer();

    setNeedleDropping(false);
    setIsSpinning(false);
    setIsGenerating(false);
    setIsReady(false);
    setApiError(null);
  }

  function togglePlayback() {
    if (!selectedMood) return;

    if (playerBusy) {
      stopRecord();
    } else {
      dropNeedle();
    }
  }

  function closeResults() {
    setResultsVisible(false);

    setTimeout(() => {
      setShowResults(false);
    }, 350);
  }

  function makeAnother() {
    requestId.current += 1;
    clearNeedleTimer();

    setResultsVisible(false);

    setTimeout(() => {
      setShowResults(false);
      setSelectedMood(null);
      setTracks([]);
      setApiError(null);
      setNeedleDropping(false);
      setIsSpinning(false);
      setIsGenerating(false);
      setIsReady(false);
    }, 350);
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <header className="flex items-center justify-between px-10 py-8">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 rounded-full border-4 border-yellow-300" />
          <span className="text-xl font-semibold">moodwave</span>
        </div>

        <p className="text-sm text-zinc-400">
          Soundtrack your state of mind.
        </p>
      </header>

      <section className="grid min-h-[80vh] grid-cols-1 items-center gap-16 px-10 lg:grid-cols-2">
        {/* LEFT */}
        <div className="min-w-0">
          <p className="mb-4 text-xs font-bold tracking-[0.2em] text-yellow-300">
            YOUR MOOD, IN SOUND + COLOR
          </p>

          <h1 className="max-w-2xl text-6xl font-bold tracking-tight md:text-7xl lg:text-8xl">
            {mode === "Mood" ? "What's your mood?" : "What's the moment?"}
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-7 text-zinc-400">
            Flip through the collection and pull a record for how you feel, or
            what you&apos;re doing.
          </p>

          {/* MODE */}
          <div
            className={`mt-8 inline-flex rounded-full border border-zinc-700 p-1 transition ${
              playerBusy ? "pointer-events-none opacity-50" : ""
            }`}
          >
            <button
              type="button"
              onClick={() => setMode("Mood")}
              className={`rounded-full px-5 py-2 text-sm transition ${
                mode === "Mood"
                  ? "bg-white text-black"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Mood
            </button>

            <button
              type="button"
              onClick={() => setMode("Moment")}
              className={`rounded-full px-5 py-2 text-sm transition ${
                mode === "Moment"
                  ? "bg-white text-black"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Moment
            </button>
          </div>

          {/* RECORDS */}
          <div
            className={`mt-8 flex gap-5 overflow-x-auto pb-5 pt-2 transition ${
              playerBusy ? "pointer-events-none opacity-50" : ""
            }`}
          >
            {(mode === "Mood" ? moods : moments).map((name) => (
              <RecordCard
                key={name}
                name={name}
                onSelect={() => selectRecord(name)}
              />
            ))}
          </div>

          {/* MAIN CONTROL */}
          <button
            type="button"
            onClick={togglePlayback}
            disabled={!selectedMood}
            className={`mt-6 flex flex-col rounded-full px-8 py-3 text-left transition ${
              playerBusy
                ? "bg-zinc-800 text-white hover:bg-zinc-700"
                : selectedMood
                  ? "bg-white text-black hover:bg-zinc-200"
                  : "cursor-not-allowed bg-zinc-800 text-zinc-500"
            }`}
          >
            <span className="font-semibold">
              {playerBusy
                ? "Stop Record"
                : isReady
                  ? "Play it again"
                  : "Drop the Needle"}
            </span>

            <span className="text-xs">
              {playerBusy
                ? "Lift the needle"
                : selectedMood
                  ? isReady
                    ? "Generate another Moodwave"
                    : "Generate my Moodwave"
                  : "Select a vinyl first"}
            </span>
          </button>
        </div>

        {/* TURNTABLE */}
        <div className="flex flex-col items-center">
          <div
            className="relative aspect-square w-full max-w-[560px] rounded-[32px] border border-zinc-700 bg-zinc-900"
            style={{
              boxShadow:
                "0 28px 50px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -8px 18px rgba(0,0,0,0.35)",
            }}
          >
            <div className="pointer-events-none absolute inset-[2px] rounded-[30px] border-t border-white/5" />

            <div className="absolute left-[5%] top-[8.5%] aspect-square w-[82%] rounded-full bg-black opacity-80 blur-[1px]" />

            <div
              className="absolute left-[5%] top-[6%] aspect-square w-[82%] rounded-full border border-zinc-500 bg-zinc-800"
              style={{
                boxShadow:
                  "0 10px 12px rgba(0,0,0,0.65), inset 0 3px 4px rgba(255,255,255,0.12), inset 0 -5px 8px rgba(0,0,0,0.65)",
              }}
            >
              <div className="absolute inset-[2%] rounded-full border border-zinc-700 bg-zinc-950">
                {selectedMood ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (playerBusy) stopRecord();
                    }}
                    aria-label={
                      playerBusy
                        ? "Stop the record and lift the needle"
                        : `${selectedMood} vinyl record`
                    }
                    className={`absolute inset-[2%] rounded-full border border-zinc-800 bg-black text-left outline-none transition-shadow ${
                      playerBusy
                        ? "cursor-pointer hover:ring-2 hover:ring-yellow-300/40 focus-visible:ring-2 focus-visible:ring-yellow-300"
                        : "cursor-default"
                    } ${isSpinning ? "animate-spin" : ""}`}
                    style={{
                      animationDuration: isSpinning ? "1.8s" : undefined,
                      boxShadow:
                        "inset 8px 8px 18px rgba(255,255,255,0.025), inset -10px -10px 20px rgba(0,0,0,0.8), 0 3px 5px rgba(0,0,0,0.8)",
                    }}
                  >
                    <div className="absolute inset-[5%] rounded-full border border-zinc-800/80" />
                    <div className="absolute inset-[10%] rounded-full border border-zinc-800/60" />
                    <div className="absolute inset-[15%] rounded-full border border-zinc-800/70" />
                    <div className="absolute inset-[20%] rounded-full border border-zinc-900" />
                    <div className="absolute inset-[25%] rounded-full border border-zinc-800/60" />
                    <div className="absolute inset-[30%] rounded-full border border-zinc-900" />

                    <div className="absolute left-[13%] top-[8%] h-[38%] w-[16%] rotate-[35deg] rounded-full bg-white/[0.025]" />

                    <div className="absolute left-1/2 top-1/2 h-[45%] w-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg">
                      <AlbumLabel selection={selectedMood} />
                    </div>

                    <div
                      className="absolute left-1/2 top-1/2 z-20 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-300"
                      style={{
                        boxShadow:
                          "inset 1px 1px 2px rgba(255,255,255,0.8), 0 1px 2px rgba(0,0,0,0.9)",
                      }}
                    >
                      <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-700" />
                    </div>
                  </button>
                ) : (
                  <>
                    <div className="absolute inset-[5%] rounded-full border border-zinc-800/60" />
                    <div className="absolute inset-[15%] rounded-full border border-zinc-800/40" />
                    <div className="absolute inset-[25%] rounded-full border border-zinc-800/30" />
                    <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-300" />
                  </>
                )}
              </div>
            </div>

            {/* TONEARM BASE */}
            <div
              className="absolute right-[4%] top-[7%] h-16 w-16 rounded-full border border-zinc-500 bg-zinc-800"
              style={{
                boxShadow:
                  "0 7px 10px rgba(0,0,0,0.7), inset 0 2px 3px rgba(255,255,255,0.12), inset 0 -4px 5px rgba(0,0,0,0.5)",
              }}
            >
              <div className="absolute inset-[18%] rounded-full border border-zinc-600 bg-zinc-900" />
              <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-400" />
            </div>

            {/* TONEARM */}
            <button
              type="button"
              onClick={togglePlayback}
              disabled={!selectedMood}
              aria-label={
                !selectedMood
                  ? "Select a vinyl before using the tonearm"
                  : playerBusy
                    ? "Lift the needle and stop the record"
                    : "Drop the needle and generate your Moodwave"
              }
              className={`group absolute right-[9.5%] top-[14%] z-30 h-[57%] w-[28px] origin-top bg-transparent outline-none transition-transform duration-[900ms] ease-in-out ${
                playerBusy || isReady ? "rotate-[18deg]" : "-rotate-12"
              } ${
                selectedMood ? "cursor-pointer" : "cursor-default"
              } focus-visible:ring-2 focus-visible:ring-yellow-300`}
            >
              <div
                className={`absolute left-1/2 top-0 h-full w-[9px] -translate-x-1/2 rounded-full transition duration-200 ${
                  selectedMood ? "group-hover:brightness-150" : ""
                }`}
                style={{
                  background:
                    "linear-gradient(90deg, #52525b 0%, #d4d4d8 45%, #71717a 100%)",
                  boxShadow: "3px 4px 5px rgba(0,0,0,0.65)",
                }}
              />

              <div
                className={`absolute -bottom-2 left-1/2 h-8 w-5 -translate-x-1/2 rounded-sm bg-zinc-300 shadow-lg transition ${
                  selectedMood ? "group-hover:bg-white" : ""
                }`}
              >
                <div className="absolute bottom-0 left-1/2 h-2 w-1 -translate-x-1/2 translate-y-1 bg-zinc-500" />
              </div>
            </button>

            {/* ACTIVITY LIGHT */}
            <div
              className="absolute bottom-[7%] left-[7%] flex h-11 w-11 items-center justify-center rounded-full border border-zinc-600 bg-zinc-950"
              style={{
                boxShadow:
                  "0 4px 7px rgba(0,0,0,0.7), inset 0 1px 2px rgba(255,255,255,0.1)",
              }}
            >
              <div
                className={`h-2.5 w-2.5 rounded-full transition ${
                  playerBusy ? "bg-yellow-300" : "bg-yellow-300/40"
                }`}
              />
            </div>

            <div className="absolute bottom-[8%] right-[7%] text-right">
              <p className="text-[9px] tracking-[0.2em] text-zinc-600">
                SPEED
              </p>
              <p className="mt-1 text-[10px] text-zinc-400">33⅓ RPM</p>
            </div>
          </div>

          {/* STATUS */}
          <div className="mt-6 min-h-[58px] text-center">
            {apiError ? (
              <>
                <p className="text-sm font-medium text-red-300">
                  We couldn&apos;t find your sound.
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  Try dropping the needle again.
                </p>
              </>
            ) : !selectedMood ? (
              <>
                <p className="text-sm font-medium text-white">
                  Select a vinyl to get started.
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  Choose a mood or moment from the vinyl collection.
                </p>
              </>
            ) : needleDropping ? (
              <>
                <p className="text-sm font-medium text-white">
                  Dropping the needle...
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  Getting your Moodwave started.
                </p>
              </>
            ) : isGenerating ? (
              <>
                <p className="text-sm font-medium text-white">
                  Finding your sound...
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  Matching {selectedMood.toLowerCase()} with music + color.
                </p>
              </>
            ) : isReady ? (
              <>
                <p className="text-sm font-medium text-yellow-300">
                  Your Moodwave is ready.
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  {selectedMood} has been translated into sound + color.
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-white">
                  {selectedMood} is on the platter.
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  Drop the needle or click the tonearm to begin.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* RESULTS OVERLAY */}
      {showResults && selectedMood && selectedData && (
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
            {/* OVERLAY HEADER */}
            <div className="sticky top-0 z-30 flex items-center justify-between border-b border-zinc-900 bg-[#090909]/95 px-6 py-5 backdrop-blur-md md:px-10">
              <button
                type="button"
                onClick={closeResults}
                className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
              >
                <span aria-hidden="true">←</span>
                Back to records
              </button>

              <button
                type="button"
                onClick={closeResults}
                aria-label="Close Moodwave results"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-xl text-zinc-400 transition hover:border-zinc-600 hover:bg-zinc-900 hover:text-white"
              >
                ×
              </button>
            </div>

            {/* RESULTS */}
            <div className="grid gap-12 px-6 py-9 md:px-10 md:py-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 xl:px-14">
              {/* WAVELENGTH */}
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

                <div className="mt-9 max-w-[580px]">
                  <PaletteArtwork colors={selectedData.colors} />
                </div>

                <div className="mt-5 flex max-w-[580px] gap-2">
                  {selectedData.colors.map((color) => (
                    <div
                      key={color}
                      className="h-2 flex-1 rounded-full"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>

                <div className="mt-3 flex max-w-[580px] justify-between">
                  {selectedData.colors.map((color) => (
                    <span
                      key={color}
                      className="hidden text-[9px] uppercase tracking-wide text-zinc-600 sm:block"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </section>

              {/* MUSIC */}
              <section className="min-w-0 lg:pt-1">
                <div className="flex items-end justify-between gap-5 border-b border-zinc-800 pb-6">
                  <div>
                    <p className="text-xs font-medium tracking-[0.25em] text-zinc-500">
                      {mode === "Mood" ? "MOOD MIX" : "MOMENT MIX"}
                    </p>

                    <h3 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                      For your ears
                    </h3>
                  </div>

                  <p className="shrink-0 text-xs text-zinc-500">
                    {tracks.length} tracks
                  </p>
                </div>

                {/* REAL SPOTIFY TRACKS */}
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
                              selectedData.colors[
                                index % selectedData.colors.length
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

                {/* ACTIONS */}
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    disabled
                    title="Sharing will be added later"
                    className="cursor-not-allowed rounded-full bg-[#F4EFE4] px-6 py-4 text-sm font-semibold text-black opacity-45"
                  >
                    Share your Moodwave
                  </button>

                  <button
                    type="button"
                    onClick={makeAnother}
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
      )}
    </main>
  );
}
