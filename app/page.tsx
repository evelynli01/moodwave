"use client";

import { useState } from "react";

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

          <div className="mt-8 inline-flex rounded-full border border-zinc-700 p-1">
            <button
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

          <div className="mt-8 flex gap-5 overflow-x-auto pb-5 pt-2">
            {mode === "Mood" ? (
              <>
                <button
                  onClick={() => setSelectedMood("Happy")}
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
              </>
            ) : (
              <>
                <button
                  onClick={() => setSelectedMood("Studying")}
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

                <button
                  onClick={() => setSelectedMood("Working Out")}
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

                <button
                  onClick={() => setSelectedMood("Celebrating")}
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

                <button
                  onClick={() => setSelectedMood("Road Trip")}
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

                <button
                  onClick={() => setSelectedMood("Heartbreak")}
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

        {/* Turntable */}
        <div className="flex flex-col items-center">
          <div className="relative aspect-square w-full max-w-[560px] rounded-3xl border border-zinc-800 bg-zinc-900">
            {/* Platter */}
            <div className="absolute left-[5%] top-[7%] aspect-square w-[82%] rounded-full border-2 border-zinc-700 bg-zinc-950">
              {selectedMood ? (
                <div className="absolute inset-[2%] rounded-full border border-zinc-800 bg-black shadow-2xl">
                  {/* Vinyl grooves */}
                  <div className="absolute inset-[7%] rounded-full border border-zinc-800" />
                  <div className="absolute inset-[14%] rounded-full border border-zinc-900" />
                  <div className="absolute inset-[21%] rounded-full border border-zinc-800" />

                  {/* Larger record label artwork */}
                  <div className="absolute left-1/2 top-1/2 h-[45%] w-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full">
                    <AlbumLabel selection={selectedMood} />
                  </div>

                  {/* Spindle */}
                  <div className="absolute left-1/2 top-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
                </div>
              ) : (
                <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-500" />
              )}
            </div>

            {/* Tonearm base */}
            <div className="absolute right-[5%] top-[8%] h-14 w-14 rounded-full border border-zinc-600 bg-zinc-800" />

            {/* Tonearm */}
            <div className="absolute right-[10%] top-[15%] h-[55%] w-2 -rotate-12 origin-top rounded-full bg-zinc-500" />

            {/* Needle */}
            <div className="absolute bottom-[27%] right-[18%] h-5 w-3 -rotate-12 rounded-sm bg-zinc-300" />
          </div>

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
