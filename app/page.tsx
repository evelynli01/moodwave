"use client";

import { useRef, useState } from "react";

function AlbumLabel({ selection }: { selection: string }) {
  if (selection === "Happy") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-full bg-yellow-300">
        <div className="absolute -right-2 top-1 h-[70%] w-[70%] rounded-full bg-orange-400" />
        <div className="absolute bottom-0 h-[25%] w-full bg-emerald-200" />
        <div className="absolute left-[15%] top-[25%] h-[32%] w-[32%] rounded-full bg-pink-400" />
      </div>
    );
  }

  if (selection === "Sad") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-full bg-slate-800">
        <div className="absolute -left-2 top-1 h-[70%] w-[70%] rounded-full bg-indigo-400" />
        <div className="absolute bottom-[25%] h-[6%] w-full bg-slate-300" />
        <div className="absolute bottom-[15%] h-[6%] w-full bg-blue-300" />
      </div>
    );
  }

  if (selection === "Energetic") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-full bg-lime-300">
        <div className="absolute -right-2 -top-2 h-[65%] w-[65%] rotate-45 bg-orange-500" />
        <div className="absolute bottom-[8%] left-[12%] h-[38%] w-[38%] rounded-full bg-fuchsia-500" />
        <div className="absolute right-[5%] top-[45%] h-[14%] w-[55%] rotate-12 bg-red-500" />
      </div>
    );
  }

  if (selection === "Calm") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-full bg-stone-100">
        <div className="absolute -left-3 top-1 h-[75%] w-[75%] rounded-full bg-sky-300" />
        <div className="absolute -right-3 bottom-1 h-[65%] w-[65%] rounded-full bg-teal-500" />
        <div className="absolute bottom-0 h-[20%] w-full bg-emerald-200" />
      </div>
    );
  }

  if (selection === "Romantic") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-full bg-rose-200">
        <div className="absolute -right-3 top-1 h-[75%] w-[75%] rounded-full bg-rose-500" />
        <div className="absolute bottom-[5%] left-[8%] h-[45%] w-[45%] rounded-full bg-red-900" />
        <div className="absolute left-[30%] top-[10%] h-[25%] w-[25%] rounded-full bg-pink-100" />
      </div>
    );
  }

  if (selection === "Focused") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-full bg-blue-950">
        <div className="absolute left-[15%] top-[15%] h-[60%] w-[60%] border-4 border-teal-400" />
        <div className="absolute left-[35%] top-[35%] h-[60%] w-[60%] border-4 border-violet-300" />
      </div>
    );
  }

  if (selection === "Studying") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-full bg-amber-100">
        <div className="absolute left-[15%] top-[15%] h-[65%] w-[45%] bg-amber-700" />
        <div className="absolute left-[25%] top-[25%] h-[45%] w-[25%] bg-amber-100" />
        <div className="absolute -right-2 bottom-0 h-[55%] w-[55%] rounded-full bg-orange-300" />
      </div>
    );
  }

  if (selection === "Working Out") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-full bg-red-500">
        <div className="absolute -left-3 top-2 h-[60%] w-[60%] rotate-45 bg-orange-400" />
        <div className="absolute right-[15%] top-[10%] h-[75%] w-[12%] -rotate-12 bg-yellow-300" />
        <div className="absolute bottom-[10%] left-[20%] h-[25%] w-[50%] bg-pink-500" />
      </div>
    );
  }

  if (selection === "Celebrating") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-full bg-violet-500">
        <div className="absolute left-[10%] top-[10%] h-[35%] w-[35%] rounded-full bg-yellow-300" />
        <div className="absolute right-[5%] top-[30%] h-[45%] w-[45%] rounded-full bg-pink-400" />
        <div className="absolute bottom-0 h-[20%] w-full bg-cyan-300" />
      </div>
    );
  }

  if (selection === "Road Trip") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-full bg-sky-300">
        <div className="absolute bottom-0 h-[40%] w-full bg-orange-300" />
        <div className="absolute bottom-[25%] left-0 h-[6%] w-full rotate-6 bg-yellow-100" />
        <div className="absolute right-[10%] top-[10%] h-[30%] w-[30%] rounded-full bg-yellow-300" />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-full bg-zinc-800">
      <div className="absolute left-[15%] top-[10%] h-[65%] w-[65%] rounded-full bg-red-900" />
      <div className="absolute left-[52%] top-0 h-full w-[5%] rotate-[25deg] bg-black" />
      <div className="absolute bottom-0 h-[20%] w-full bg-violet-300" />
    </div>
  );
}

export default function Home() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [mode, setMode] = useState<"Mood" | "Moment">("Mood");

  const [needleDropping, setNeedleDropping] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const needleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const generationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const playerBusy = needleDropping || isSpinning || isGenerating;

  function clearPlayerTimers() {
    if (needleTimer.current) {
      clearTimeout(needleTimer.current);
      needleTimer.current = null;
    }

    if (generationTimer.current) {
      clearTimeout(generationTimer.current);
      generationTimer.current = null;
    }
  }

  function selectRecord(selection: string) {
    if (playerBusy) return;

    setSelectedMood(selection);
    setIsReady(false);
  }

  function dropNeedle() {
    if (!selectedMood || playerBusy) return;

    clearPlayerTimers();

    setNeedleDropping(true);
    setIsReady(false);

    // First, move the tonearm onto the vinyl.
    needleTimer.current = setTimeout(() => {
      setNeedleDropping(false);
      setIsSpinning(true);
      setIsGenerating(true);

      // Temporary fake loading state.
      // Later, the Spotify API request will replace this.
      generationTimer.current = setTimeout(() => {
        setIsGenerating(false);
        setIsSpinning(false);
        setIsReady(true);
      }, 2500);
    }, 900);
  }

  function stopRecord() {
    clearPlayerTimers();

    setNeedleDropping(false);
    setIsSpinning(false);
    setIsGenerating(false);
    setIsReady(false);
  }

  function togglePlayback() {
    if (!selectedMood) return;

    if (playerBusy) {
      stopRecord();
    } else {
      dropNeedle();
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
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
        {/* LEFT SIDE */}
        <div className="min-w-0">
          <p className="mb-4 text-xs font-bold tracking-[0.2em] text-yellow-300">
            YOUR MOOD, IN SOUND + COLOR
          </p>

          <h1 className="max-w-2xl text-6xl font-bold tracking-tight md:text-7xl lg:text-8xl">
            {mode === "Mood" ? "What's your mood?" : "What's the moment?"}
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-7 text-zinc-400">
            Flip through the crate and pull a record for how you feel, or what
            you&apos;re doing.
          </p>

          {/* Mood / Moment toggle */}
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

          {/* Record collection */}
          <div
            className={`mt-8 flex gap-5 overflow-x-auto pb-5 pt-2 transition ${
              playerBusy ? "pointer-events-none opacity-50" : ""
            }`}
          >
            {mode === "Mood" ? (
              <>
                {/* Happy */}
                <button
                  type="button"
                  onClick={() => selectRecord("Happy")}
                  className="group shrink-0 text-left"
                >
                  <div className="relative h-32 w-36">
                    <div className="absolute right-0 top-2 h-28 w-28 rounded-full border border-zinc-700 bg-zinc-950 transition-transform duration-300 group-hover:translate-x-3">
                      <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-300" />
                    </div>

                    <div className="absolute left-0 top-0 h-32 w-32 overflow-hidden rounded bg-yellow-300 transition-transform duration-300 group-hover:-translate-y-2">
                      <div className="absolute -right-4 top-3 h-20 w-20 rounded-full bg-orange-400" />
                      <div className="absolute bottom-0 h-8 w-full bg-emerald-200" />
                      <div className="absolute left-4 top-6 h-10 w-10 rounded-full bg-pink-400" />
                    </div>
                  </div>

                  <p className="mt-2 text-sm">Happy</p>
                </button>

                {/* Sad */}
                <button
                  type="button"
                  onClick={() => selectRecord("Sad")}
                  className="group shrink-0 text-left"
                >
                  <div className="relative h-32 w-36">
                    <div className="absolute right-0 top-2 h-28 w-28 rounded-full border border-zinc-700 bg-zinc-950 transition-transform duration-300 group-hover:translate-x-3">
                      <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-300" />
                    </div>

                    <div className="absolute left-0 top-0 h-32 w-32 overflow-hidden rounded bg-slate-800 transition-transform duration-300 group-hover:-translate-y-2">
                      <div className="absolute -left-4 top-4 h-20 w-20 rounded-full bg-indigo-400" />
                      <div className="absolute bottom-5 left-0 h-1 w-full bg-slate-300" />
                      <div className="absolute bottom-9 left-0 h-1 w-full bg-blue-300" />
                    </div>
                  </div>

                  <p className="mt-2 text-sm">Sad</p>
                </button>

                {/* Energetic */}
                <button
                  type="button"
                  onClick={() => selectRecord("Energetic")}
                  className="group shrink-0 text-left"
                >
                  <div className="relative h-32 w-36">
                    <div className="absolute right-0 top-2 h-28 w-28 rounded-full border border-zinc-700 bg-zinc-950 transition-transform duration-300 group-hover:translate-x-3">
                      <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500" />
                    </div>

                    <div className="absolute left-0 top-0 h-32 w-32 overflow-hidden rounded bg-lime-300 transition-transform duration-300 group-hover:-translate-y-2">
                      <div className="absolute -right-4 -top-4 h-20 w-20 rotate-45 bg-orange-500" />
                      <div className="absolute bottom-3 left-5 h-12 w-12 rounded-full bg-fuchsia-500" />
                      <div className="absolute right-4 top-12 h-5 w-16 rotate-12 bg-red-500" />
                    </div>
                  </div>

                  <p className="mt-2 text-sm">Energetic</p>
                </button>

                {/* Calm */}
                <button
                  type="button"
                  onClick={() => selectRecord("Calm")}
                  className="group shrink-0 text-left"
                >
                  <div className="relative h-32 w-36">
                    <div className="absolute right-0 top-2 h-28 w-28 rounded-full border border-zinc-700 bg-zinc-950 transition-transform duration-300 group-hover:translate-x-3">
                      <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-300" />
                    </div>

                    <div className="absolute left-0 top-0 h-32 w-32 overflow-hidden rounded bg-stone-100 transition-transform duration-300 group-hover:-translate-y-2">
                      <div className="absolute -left-5 top-3 h-24 w-24 rounded-full bg-sky-300" />
                      <div className="absolute -right-5 bottom-3 h-20 w-20 rounded-full bg-teal-500" />
                      <div className="absolute bottom-0 h-7 w-full bg-emerald-200" />
                    </div>
                  </div>

                  <p className="mt-2 text-sm">Calm</p>
                </button>

                {/* Romantic */}
                <button
                  type="button"
                  onClick={() => selectRecord("Romantic")}
                  className="group shrink-0 text-left"
                >
                  <div className="relative h-32 w-36">
                    <div className="absolute right-0 top-2 h-28 w-28 rounded-full border border-zinc-700 bg-zinc-950 transition-transform duration-300 group-hover:translate-x-3">
                      <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-300" />
                    </div>

                    <div className="absolute left-0 top-0 h-32 w-32 overflow-hidden rounded bg-rose-200 transition-transform duration-300 group-hover:-translate-y-2">
                      <div className="absolute -right-6 top-2 h-24 w-24 rounded-full bg-rose-500" />
                      <div className="absolute bottom-3 left-3 h-14 w-14 rounded-full bg-red-900" />
                      <div className="absolute left-8 top-4 h-8 w-8 rounded-full bg-pink-100" />
                    </div>
                  </div>

                  <p className="mt-2 text-sm">Romantic</p>
                </button>

                {/* Focused */}
                <button
                  type="button"
                  onClick={() => selectRecord("Focused")}
                  className="group shrink-0 text-left"
                >
                  <div className="relative h-32 w-36">
                    <div className="absolute right-0 top-2 h-28 w-28 rounded-full border border-zinc-700 bg-zinc-950 transition-transform duration-300 group-hover:translate-x-3">
                      <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300" />
                    </div>

                    <div className="absolute left-0 top-0 h-32 w-32 overflow-hidden rounded bg-blue-950 transition-transform duration-300 group-hover:-translate-y-2">
                      <div className="absolute left-5 top-5 h-20 w-20 border-4 border-teal-400" />
                      <div className="absolute left-10 top-10 h-20 w-20 border-4 border-violet-300" />
                    </div>
                  </div>

                  <p className="mt-2 text-sm">Focused</p>
                </button>
              </>
            ) : (
              <>
                {/* Studying */}
                <button
                  type="button"
                  onClick={() => selectRecord("Studying")}
                  className="group shrink-0 text-left"
                >
                  <div className="relative h-32 w-36">
                    <div className="absolute right-0 top-2 h-28 w-28 rounded-full border border-zinc-700 bg-zinc-950 transition-transform duration-300 group-hover:translate-x-3">
                      <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200" />
                    </div>

                    <div className="absolute left-0 top-0 h-32 w-32 overflow-hidden rounded bg-amber-100 transition-transform duration-300 group-hover:-translate-y-2">
                      <div className="absolute left-5 top-5 h-20 w-16 bg-amber-700" />
                      <div className="absolute left-8 top-8 h-14 w-10 bg-amber-100" />
                      <div className="absolute -right-5 bottom-0 h-20 w-20 rounded-full bg-orange-300" />
                    </div>
                  </div>

                  <p className="mt-2 text-sm">Studying</p>
                </button>

                {/* Working Out */}
                <button
                  type="button"
                  onClick={() => selectRecord("Working Out")}
                  className="group shrink-0 text-left"
                >
                  <div className="relative h-32 w-36">
                    <div className="absolute right-0 top-2 h-28 w-28 rounded-full border border-zinc-700 bg-zinc-950 transition-transform duration-300 group-hover:translate-x-3">
                      <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500" />
                    </div>

                    <div className="absolute left-0 top-0 h-32 w-32 overflow-hidden rounded bg-red-500 transition-transform duration-300 group-hover:-translate-y-2">
                      <div className="absolute -left-5 top-4 h-20 w-20 rotate-45 bg-orange-400" />
                      <div className="absolute right-3 top-5 h-24 w-5 -rotate-12 bg-yellow-300" />
                      <div className="absolute bottom-3 left-6 h-10 w-16 bg-pink-500" />
                    </div>
                  </div>

                  <p className="mt-2 text-sm">Working Out</p>
                </button>

                {/* Celebrating */}
                <button
                  type="button"
                  onClick={() => selectRecord("Celebrating")}
                  className="group shrink-0 text-left"
                >
                  <div className="relative h-32 w-36">
                    <div className="absolute right-0 top-2 h-28 w-28 rounded-full border border-zinc-700 bg-zinc-950 transition-transform duration-300 group-hover:translate-x-3">
                      <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400" />
                    </div>

                    <div className="absolute left-0 top-0 h-32 w-32 overflow-hidden rounded bg-violet-500 transition-transform duration-300 group-hover:-translate-y-2">
                      <div className="absolute left-3 top-3 h-10 w-10 rounded-full bg-yellow-300" />
                      <div className="absolute right-3 top-8 h-14 w-14 rounded-full bg-pink-400" />
                      <div className="absolute bottom-0 h-8 w-full bg-cyan-300" />
                    </div>
                  </div>

                  <p className="mt-2 text-sm">Celebrating</p>
                </button>

                {/* Road Trip */}
                <button
                  type="button"
                  onClick={() => selectRecord("Road Trip")}
                  className="group shrink-0 text-left"
                >
                  <div className="relative h-32 w-36">
                    <div className="absolute right-0 top-2 h-28 w-28 rounded-full border border-zinc-700 bg-zinc-950 transition-transform duration-300 group-hover:translate-x-3">
                      <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400" />
                    </div>

                    <div className="absolute left-0 top-0 h-32 w-32 overflow-hidden rounded bg-sky-300 transition-transform duration-300 group-hover:-translate-y-2">
                      <div className="absolute bottom-0 h-12 w-full bg-orange-300" />
                      <div className="absolute bottom-4 left-0 h-2 w-full rotate-6 bg-yellow-100" />
                      <div className="absolute right-4 top-4 h-10 w-10 rounded-full bg-yellow-300" />
                    </div>
                  </div>

                  <p className="mt-2 text-sm">Road Trip</p>
                </button>

                {/* Heartbreak */}
                <button
                  type="button"
                  onClick={() => selectRecord("Heartbreak")}
                  className="group shrink-0 text-left"
                >
                  <div className="relative h-32 w-36">
                    <div className="absolute right-0 top-2 h-28 w-28 rounded-full border border-zinc-700 bg-zinc-950 transition-transform duration-300 group-hover:translate-x-3">
                      <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-900" />
                    </div>

                    <div className="absolute left-0 top-0 h-32 w-32 overflow-hidden rounded bg-zinc-800 transition-transform duration-300 group-hover:-translate-y-2">
                      <div className="absolute left-5 top-4 h-20 w-20 rounded-full bg-red-900" />
                      <div className="absolute left-[62px] top-3 h-28 w-1 rotate-[25deg] bg-black" />
                      <div className="absolute bottom-0 h-7 w-full bg-violet-300" />
                    </div>
                  </div>

                  <p className="mt-2 text-sm">Heartbreak</p>
                </button>
              </>
            )}
          </div>

          {/* Main button — accessible/obvious way to control player */}
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

        {/* RIGHT SIDE — TURNTABLE */}
        <div className="flex flex-col items-center">
          <div
            className="relative aspect-square w-full max-w-[560px] rounded-[32px] border border-zinc-700 bg-zinc-900"
            style={{
              boxShadow:
                "0 28px 50px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -8px 18px rgba(0,0,0,0.35)",
            }}
          >
            {/* Top highlight */}
            <div className="pointer-events-none absolute inset-[2px] rounded-[30px] border-t border-white/5" />

            {/* Platter shadow */}
            <div className="absolute left-[5%] top-[8.5%] aspect-square w-[82%] rounded-full bg-black opacity-80 blur-[1px]" />

            {/* Platter */}
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
                      if (playerBusy) {
                        stopRecord();
                      }
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
                    {/* Vinyl grooves */}
                    <div className="absolute inset-[5%] rounded-full border border-zinc-800/80" />
                    <div className="absolute inset-[10%] rounded-full border border-zinc-800/60" />
                    <div className="absolute inset-[15%] rounded-full border border-zinc-800/70" />
                    <div className="absolute inset-[20%] rounded-full border border-zinc-900" />
                    <div className="absolute inset-[25%] rounded-full border border-zinc-800/60" />
                    <div className="absolute inset-[30%] rounded-full border border-zinc-900" />

                    {/* Vinyl reflection */}
                    <div className="absolute left-[13%] top-[8%] h-[38%] w-[16%] rotate-[35deg] rounded-full bg-white/[0.025]" />

                    {/* Center artwork */}
                    <div className="absolute left-1/2 top-1/2 h-[45%] w-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg">
                      <AlbumLabel selection={selectedMood} />
                    </div>

                    {/* Spindle */}
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
                    {/* Empty platter */}
                    <div className="absolute inset-[5%] rounded-full border border-zinc-800/60" />
                    <div className="absolute inset-[15%] rounded-full border border-zinc-800/40" />
                    <div className="absolute inset-[25%] rounded-full border border-zinc-800/30" />

                    <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-300" />
                  </>
                )}
              </div>
            </div>

            {/* Tonearm base */}
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

            {/* INTERACTIVE TONEARM */}
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
                selectedMood
                  ? "cursor-pointer"
                  : "cursor-default"
              } focus-visible:ring-2 focus-visible:ring-yellow-300`}
            >
              {/* Visible metal arm */}
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

              {/* Cartridge */}
              <div
                className={`absolute -bottom-2 left-1/2 h-8 w-5 -translate-x-1/2 rounded-sm bg-zinc-300 shadow-lg transition ${
                  selectedMood ? "group-hover:bg-white" : ""
                }`}
              >
                <div className="absolute bottom-0 left-1/2 h-2 w-1 -translate-x-1/2 translate-y-1 bg-zinc-500" />
              </div>
            </button>

            {/* Power/activity indicator */}
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

            {/* Speed */}
            <div className="absolute bottom-[8%] right-[7%] text-right">
              <p className="text-[9px] tracking-[0.2em] text-zinc-600">
                SPEED
              </p>
              <p className="mt-1 text-[10px] text-zinc-400">33⅓ RPM</p>
            </div>
          </div>

          {/* PLAYER STATUS */}
          <div className="mt-6 min-h-[52px] text-center">
            {!selectedMood ? (
              <>
                <p className="text-sm font-medium text-white">
                  Select a vinyl to get started.
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Choose a mood or moment from the crate.
                </p>
              </>
            ) : needleDropping ? (
              <>
                <p className="text-sm font-medium text-white">
                  Dropping the needle...
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Click the tonearm or Stop Record to cancel.
                </p>
              </>
            ) : isGenerating ? (
              <>
                <p className="text-sm font-medium text-white">
                  Finding your sound...
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Click the vinyl or lift the tonearm to stop.
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
    </main>
  );
}
