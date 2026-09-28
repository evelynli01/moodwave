export type Mode = "Mood" | "Moment";

export type VisualStyle = "flow" | "gradient" | "waves" | "orbit";

export type SpotifyTrack = {
  id: string;
  title: string;
  artist: string;
  image: string | null;
  spotifyUrl: string;
};

export type RecordData = {
  name: string;
  tagline: string;
  colorFamily: string[];
};

export type GeneratedVisual = {
  colors: string[];
  style: VisualStyle;
};

export const recordData: Record<string, RecordData> = {
  Happy: {
    name: "Happy",
    tagline: "Bright days, turned all the way up.",
    colorFamily: [
      "#FDE047",
      "#FACC15",
      "#FDBA74",
      "#FB923C",
      "#FB7185",
      "#F9A8D4",
      "#86EFAC",
      "#67E8F9",
      "#FDE68A",
    ],
  },

  Sad: {
    name: "Sad",
    tagline: "Soft edges, heavy feelings.",
    colorFamily: [
      "#64748B",
      "#475569",
      "#172554",
      "#1E3A8A",
      "#A5B4FC",
      "#818CF8",
      "#94A3B8",
      "#67E8F9",
      "#CBD5E1",
    ],
  },

  Energetic: {
    name: "Energetic",
    tagline: "Fast pulse, full color.",
    colorFamily: [
      "#FF6B1A",
      "#F97316",
      "#EF233C",
      "#E11D48",
      "#E9FF2A",
      "#FDE047",
      "#FF2A8A",
      "#EC4899",
      "#7C3AED",
      "#8B5CF6",
    ],
  },

  Calm: {
    name: "Calm",
    tagline: "Breathe out. Let everything soften.",
    colorFamily: [
      "#A7F3D0",
      "#6EE7B7",
      "#2DD4BF",
      "#5EEAD4",
      "#BAE6FD",
      "#7DD3FC",
      "#99F6E4",
      "#FEF3C7",
      "#E0F2FE",
    ],
  },

  Romantic: {
    name: "Romantic",
    tagline: "Warm light, close distance.",
    colorFamily: [
      "#881337",
      "#9F1239",
      "#FB7185",
      "#FDA4AF",
      "#FECDD3",
      "#F9A8D4",
      "#86198F",
      "#C026D3",
      "#FFF7ED",
    ],
  },

  Focused: {
    name: "Focused",
    tagline: "Clear mind, steady rhythm.",
    colorFamily: [
      "#1E3A8A",
      "#1D4ED8",
      "#0F766E",
      "#0D9488",
      "#9CA3AF",
      "#64748B",
      "#C4B5FD",
      "#A78BFA",
      "#F8FAFC",
    ],
  },

  Studying: {
    name: "Studying",
    tagline: "Quiet focus for the pages ahead.",
    colorFamily: [
      "#78350F",
      "#92400E",
      "#A16207",
      "#CA8A04",
      "#FDE68A",
      "#FCD34D",
      "#FDBA74",
      "#FEF3C7",
      "#D6D3D1",
    ],
  },

  "Working Out": {
    name: "Working Out",
    tagline: "Move harder. Turn it louder.",
    colorFamily: [
      "#EF4444",
      "#DC2626",
      "#F97316",
      "#EA580C",
      "#FDE047",
      "#EC4899",
      "#DB2777",
      "#7C3AED",
      "#8B5CF6",
    ],
  },

  Celebrating: {
    name: "Celebrating",
    tagline: "Big energy for a moment worth keeping.",
    colorFamily: [
      "#8B5CF6",
      "#A855F7",
      "#FDE047",
      "#FACC15",
      "#F472B6",
      "#EC4899",
      "#67E8F9",
      "#22D3EE",
      "#FB923C",
    ],
  },

  "Road Trip": {
    name: "Road Trip",
    tagline: "Windows down. Somewhere ahead.",
    colorFamily: [
      "#7DD3FC",
      "#38BDF8",
      "#0EA5E9",
      "#FDBA74",
      "#FB923C",
      "#FDE047",
      "#FB7185",
      "#FDA4AF",
      "#BAE6FD",
    ],
  },

  Heartbreak: {
    name: "Heartbreak",
    tagline: "For everything you haven't let go of yet.",
    colorFamily: [
      "#7F1D1D",
      "#991B1B",
      "#18181B",
      "#27272A",
      "#A78BFA",
      "#8B5CF6",
      "#52525B",
      "#71717A",
      "#E4E4E7",
    ],
  },
};

export const moods = [
  "Happy",
  "Sad",
  "Energetic",
  "Calm",
  "Romantic",
  "Focused",
];

export const moments = [
  "Studying",
  "Working Out",
  "Celebrating",
  "Road Trip",
  "Heartbreak",
];

const visualStyles: VisualStyle[] = [
  "flow",
  "gradient",
  "waves",
  "orbit",
];

function shuffle<T>(items: T[]) {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

export function generateVisual(selection: string): GeneratedVisual {
  const family = recordData[selection].colorFamily;

  return {
    colors: shuffle(family).slice(0, 5),
    style: visualStyles[Math.floor(Math.random() * visualStyles.length)],
  };
}