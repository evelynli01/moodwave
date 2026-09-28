"use client";

import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";

import RecordCard, { AlbumLabel } from "./components/RecordCard";
import ResultsModal from "./components/ResultsModal";
import ShareModal from "./components/ShareModal";

import {
  generateVisual,
  moments,
  moods,
  recordData,
  type GeneratedVisual,
  type Mode,
  type SpotifyTrack,
} from "./data/moodData";

const wait = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export default function Home() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("Mood");

  const [needleDropping, setNeedleDropping] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);

  const [generatedVisual, setGeneratedVisual] =
    useState<GeneratedVisual | null>(null);

  const [showResults, setShowResults] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false);

  const [showShare, setShowShare] = useState(false);
  const [shareDate, setShareDate] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [shareNote, setShareNote] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  const needleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestId = useRef(0);
  const shareCardRef = useRef<HTMLDivElement | null>(null);

  const playerBusy = needleDropping || isSpinning || isGenerating;
  const selectedData = selectedMood ? recordData[selectedMood] : null;

  const selectedType: Mode =
    selectedMood && moments.includes(selectedMood) ? "Moment" : "Mood";

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
    setGeneratedVisual(null);
    setApiError(null);
    setIsReady(false);
  }

  async function generateMoodwave(
    selection: string,
    currentRequest: number
  ) {
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

      if (requestId.current !== currentRequest) return;

      const newTracks: SpotifyTrack[] = spotifyData.tracks ?? [];

      setIsGenerating(false);
      setIsSpinning(false);

      if (newTracks.length === 0) {
        setTracks([]);
        setGeneratedVisual(null);
        setIsReady(false);
        setApiError(
          "We couldn't find any tracks for this Moodwave. Try dropping the needle again."
        );
        return;
      }

      const newVisual = generateVisual(selection);

      setGeneratedVisual(newVisual);
      setTracks(newTracks);
      setApiError(null);
      setIsReady(true);
      setShowResults(true);
    } catch (error) {
      if (requestId.current !== currentRequest) return;

      console.error("Moodwave generation error:", error);

      setIsGenerating(false);
      setIsSpinning(false);
      setIsReady(false);
      setTracks([]);
      setGeneratedVisual(null);
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
    setGeneratedVisual(null);
    setNeedleDropping(true);
    setIsReady(false);

    needleTimer.current = setTimeout(() => {
      if (requestId.current !== currentRequest) return;

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
    setShowShare(false);
    setResultsVisible(false);

    setTimeout(() => {
      setShowResults(false);
    }, 350);
  }

  function makeAnother() {
    requestId.current += 1;
    clearNeedleTimer();

    setShowShare(false);
    setShowNoteInput(false);
    setShareNote("");
    setResultsVisible(false);

    setTimeout(() => {
      setShowResults(false);
      setSelectedMood(null);
      setTracks([]);
      setGeneratedVisual(null);
      setApiError(null);
      setNeedleDropping(false);
      setIsSpinning(false);
      setIsGenerating(false);
      setIsReady(false);
    }, 350);
  }

  function openShare() {
    const today = new Date();

    const formattedDate = today
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      .toUpperCase();

    setShareDate(formattedDate);
    setShowNoteInput(false);
    setShareNote("");
    setShowShare(true);
  }

  function removeNote() {
    setShareNote("");
    setShowNoteInput(false);
  }

  function remixVisual() {
    if (!selectedMood) return;

    setGeneratedVisual(generateVisual(selectedMood));
  }

  async function downloadShareCard() {
    if (!shareCardRef.current || !selectedMood) return;

    try {
      setIsDownloading(true);

      const dataUrl = await toPng(shareCardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });

      const link = document.createElement("a");

      link.download = `moodwave-${selectedMood
        .toLowerCase()
        .replace(/\s+/g, "-")}.png`;

      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Could not download Moodwave:", error);
    } finally {
      setIsDownloading(false);
    }
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
        <div className="min-w-0">
          <p className="mb-4 text-xs font-bold tracking-[0.2em] text-yellow-300">
            YOUR MOOD, IN SOUND + COLOR
          </p>

          <h1 className="max-w-2xl text-6xl font-bold tracking-tight md:text-7xl lg:text-8xl">
            {mode === "Mood"
              ? "What's your mood?"
              : "What's the moment?"}
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-7 text-zinc-400">
            Flip through the collection and pull a record for how you feel, or
            what you&apos;re doing.
          </p>

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

      {showResults &&
        selectedMood &&
        selectedData &&
        generatedVisual && (
          <ResultsModal
            selectedMood={selectedMood}
            selectedData={selectedData}
            selectedType={selectedType}
            generatedVisual={generatedVisual}
            tracks={tracks}
            resultsVisible={resultsVisible}
            onClose={closeResults}
            onRemix={remixVisual}
            onShare={openShare}
            onMakeAnother={makeAnother}
          />
        )}

      {showShare && selectedMood && generatedVisual && (
        <ShareModal
          selectedMood={selectedMood}
          selectedType={selectedType}
          generatedVisual={generatedVisual}
          shareDate={shareDate}
          showNoteInput={showNoteInput}
          shareNote={shareNote}
          isDownloading={isDownloading}
          shareCardRef={shareCardRef}
          onClose={() => setShowShare(false)}
          onShowNoteInput={() => setShowNoteInput(true)}
          onRemoveNote={removeNote}
          onNoteChange={setShareNote}
          onDownload={downloadShareCard}
        />
      )}
    </main>
  );
}
