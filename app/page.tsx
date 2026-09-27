"use client";

import { useState } from "react";

/*
 * Creates the miniature artwork that appears
 * in the center of the selected vinyl.
 */
function AlbumLabel({ mood }: { mood: string }) {
  if (mood === "Happy") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-full bg-yellow-300">
        <div className="absolute -right-2 top-1 h-[70%] w-[70%] rounded-full bg-orange-400" />
        <div className="absolute bottom-0 h-[25%] w-full bg-emerald-200" />
        <div className="absolute left-[15%] top-[25%] h-[32%] w-[32%] rounded-full bg-pink-400" />
      </div>
    );
  }

  if (mood === "Sad") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-full bg-slate-800">
        <div className="absolute -left-2 top-1 h-[70%] w-[70%] rounded-full bg-indigo-400" />
        <div className="absolute bottom-[25%] h-[6%] w-full bg-slate-300" />
        <div className="absolute bottom-[15%] h-[6%] w-full bg-blue-300" />
      </div>
    );
  }

  if (mood === "Energetic") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-full bg-lime-300">
        <div className="absolute -right-2 -top-2 h-[65%] w-[65%] rotate-45 bg-orange-500" />
        <div className="absolute bottom-[8%] left-[12%] h-[38%] w-[38%] rounded-full bg-fuchsia-500" />
        <div className="absolute right-[5%] top-[45%] h-[14%] w-[55%] rotate-12 bg-red-500" />
      </div>
    );
  }

  if (mood === "Calm") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-full bg-stone-100">
        <div className="absolute -left-3 top-1 h-[75%] w-[75%] rounded-full bg-sky-300" />
        <div className="absolute -right-3 bottom-1 h-[65%] w-[65%] rounded-full bg-teal-500" />
        <div className="absolute bottom-0 h-[20%] w-full bg-emerald-200" />
      </div>
    );
  }

  if (mood === "Romantic") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-full bg-rose-200">
        <div className="absolute -right-3 top-1 h-[75%] w-[75%] rounded-full bg-rose-500" />
        <div className="absolute bottom-[5%] left-[8%] h-[45%] w-[45%] rounded-full bg-red-900" />
        <div className="absolute left-[30%] top-[10%] h-[25%] w-[25%] rounded-full bg-pink-100" />
      </div>
    );
  }

  // Focused
  return (
    <div className="relative h-full w-full overflow-hidden rounded-full bg-blue-950">
      <div className="absolute left-[15%] top-[15%] h-[60%] w-[60%] border-4 border-teal-400" />
      <div className="absolute left-[35%] top-[35%] h-[60%] w-[60%] border-4 border-violet-300" />
    </div>
  );
}

export default function Home() {
  // Keeps track of which mood the user selected.
  // null means no record has been selected yet.
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-8">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 rounded-full border-4 border-yellow-300" />
          <span className="text-xl font-semibold">moodwave</span>
        </div>

        <p className="text-sm text-zinc-400">
          Soundtrack your state of mind.
        </p>
      </header>

      {/* Main content */}
      <section className="grid min-h-[80vh] grid-cols-1 items-center gap-16 px-10 lg:grid-cols-2">
        {/* Left side */}
        <div className="min-w-0">
          <p className="mb-4 text-xs font-bold tracking-[0.2em] text-yellow-300">
            YOUR MOOD, IN SOUND + COLOR
          </p>

          <h1 className="max-w-2xl text-6xl font-bold tracking-tight md:text-7xl lg:text-8xl">
            What&apos;s your mood?
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-7 text-zinc-400">
            Flip through the crate and pull a record for how you feel, or what
            you&apos;re doing.
          </p>

          {/* Mood / Moment toggle */}
          <div className="mt-8 inline-flex rounded-full border border-zinc-700 p-1">
            <button className="rounded-full bg-white px-5 py-2 text-sm text-black">
              Mood
            </button>

            <button className="rounded-full px-5 py-2 text-sm text-zinc-400">
              Moment
            </button>
          </div>

          {/* Record collection */}
          <div className="mt-8 flex gap-5 overflow-x-auto pb-5 pt-2">
            {/* Happy */}
            <button
              onClick={() => setSelectedMood("Happy")}
              className="group shrink-0 text-left"
            >
              <div className="relative h-32 w-36">
                {/* Vinyl */}
                <div className="absolute right-0 top-2 h-28 w-28 rounded-full border border-zinc-700 bg-zinc-950 transition-transform duration-300 group-hover:translate-x-3">
                  <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-300" />
                </div>

                {/* Sleeve */}
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
              onClick={() => setSelectedMood("Sad")}
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
              onClick={() => setSelectedMood("Energetic")}
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
              onClick={() => setSelectedMood("Calm")}
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
              onClick={() => setSelectedMood("Romantic")}
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
              onClick={() => setSelectedMood("Focused")}
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
          </div>

          {/* Generate button */}
          <button
            disabled={!selectedMood}
            className={`mt-6 flex flex-col rounded-full px-8 py-3 text-left transition ${
              selectedMood
                ? "bg-white text-black hover:bg-zinc-200"
                : "cursor-not-allowed bg-zinc-800 text-zinc-500"
            }`}
          >
            <span className="font-semibold">Drop the Needle</span>
            <span className="text-xs">Generate my Moodwave</span>
          </button>
        </div>

        {/* Right side - Turntable */}
        <div className="flex flex-col items-center">
          <div className="relative aspect-[1.15] w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-900">
            {/* Platter */}
            <div className="absolute left-[8%] top-[12%] aspect-square w-[68%] rounded-full border-2 border-zinc-700 bg-black">
              {/* Selected vinyl */}
              {selectedMood && (
                <div className="absolute inset-[6%] rounded-full border border-zinc-800 bg-zinc-950">
                  {/* Matching album artwork */}
                  <div className="absolute left-1/2 top-1/2 h-[32%] w-[32%] -translate-x-1/2 -translate-y-1/2 rounded-full">
                    <AlbumLabel mood={selectedMood} />
                  </div>

                  {/* Hole in the middle of the record */}
                  <div className="absolute left-1/2 top-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
                </div>
              )}

              {/* Empty platter spindle */}
              {!selectedMood && (
                <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-500" />
              )}
            </div>

            {/* Tonearm */}
            <div className="absolute right-[15%] top-[15%] h-[58%] w-2 -rotate-12 rounded-full bg-zinc-500" />
          </div>

          {/* Turntable message */}
          <p className="mt-6 text-center text-sm text-zinc-500">
            {selectedMood
              ? `${selectedMood} is on the platter.`
              : "Pick a record from the crate to place it on the turntable."}
          </p>
        </div>
      </section>
    </main>
  );
}
