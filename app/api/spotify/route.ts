import { NextRequest, NextResponse } from "next/server";

type SpotifyTrack = {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    images: { url: string }[];
  };
  external_urls: {
    spotify: string;
  };
};

const searchStrategies: Record<string, string[]> = {
  Happy: [
    "genre:pop upbeat",
    "genre:dance pop",
    "genre:funk",
  ],

  Sad: [
    "genre:acoustic",
    "genre:indie",
    "genre:singer-songwriter",
  ],

  Energetic: [
    "genre:dance",
    "genre:electronic",
    "genre:hip-hop",
  ],

  Calm: [
    "genre:acoustic chill",
    "genre:ambient relaxing",
    "genre:classical piano",
  ],

  Romantic: [
    "genre:r-n-b",
    "genre:soul",
    "genre:romance",
  ],

  Focused: [
    "genre:ambient",
    "genre:classical",
    "genre:electronic",
  ],

  Studying: [
    "genre:ambient",
    "genre:classical",
    "study instrumental",
  ],

  "Working Out": [
    "genre:dance",
    "genre:hip-hop",
    "genre:electronic",
  ],

  Celebrating: [
    "genre:pop",
    "genre:dance",
    "party pop",
  ],

  "Road Trip": [
    "genre:indie",
    "genre:rock",
    "genre:pop",
  ],

  Heartbreak: [
    "genre:r-n-b",
    "genre:acoustic",
    "genre:singer-songwriter",
  ],
};

async function getSpotifyToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Spotify credentials are missing.");
  }

  const credentials = Buffer.from(
    `${clientId}:${clientSecret}`
  ).toString("base64");

  const response = await fetch(
    "https://accounts.spotify.com/api/token",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to authenticate with Spotify.");
  }

  const data = await response.json();

  return data.access_token;
}

async function searchSpotify(
  token: string,
  query: string,
  offset: number
): Promise<SpotifyTrack[]> {
  const params = new URLSearchParams({
    q: query,
    type: "track",
    limit: "5",
    offset: offset.toString(),
    market: "US",
  });

  const response = await fetch(
    `https://api.spotify.com/v1/search?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`Spotify search failed for: ${query}`);
  }

  const data = await response.json();

  return data.tracks?.items ?? [];
}

function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [
      shuffled[j],
      shuffled[i],
    ];
  }

  return shuffled;
}

export async function GET(request: NextRequest) {
  try {
    const selection = request.nextUrl.searchParams.get("selection");

    if (!selection || !searchStrategies[selection]) {
      return NextResponse.json(
        { error: "Invalid mood or moment." },
        { status: 400 }
      );
    }

    const token = await getSpotifyToken();

    // Change the search order each time Moodwave generates a mix.
    const queries = shuffle(searchStrategies[selection]);

    // Stay close to Spotify's strongest results while still
    // giving repeated generations some variation.
    const searchResults = await Promise.all(
      queries.map((query) => {
        const offset = Math.floor(Math.random() * 6);

        return searchSpotify(token, query, offset);
      })
    );

    // Combine the different search result pools.
    const allTracks = shuffle(searchResults.flat());

    const usedTrackIds = new Set<string>();
    const usedArtists = new Set<string>();

    const uniqueTracks: SpotifyTrack[] = [];

    // First pass:
    // favor different songs AND different primary artists.
    for (const track of allTracks) {
      if (uniqueTracks.length >= 4) {
        break;
      }

      const primaryArtist = track.artists[0]?.name;

      if (!primaryArtist) {
        continue;
      }

      if (usedTrackIds.has(track.id)) {
        continue;
      }

      if (usedArtists.has(primaryArtist)) {
        continue;
      }

      usedTrackIds.add(track.id);
      usedArtists.add(primaryArtist);
      uniqueTracks.push(track);
    }

    // Second pass:
    // if artist filtering leaves fewer than four tracks,
    // allow repeated artists but never duplicate songs.
    if (uniqueTracks.length < 4) {
      for (const track of allTracks) {
        if (uniqueTracks.length >= 4) {
          break;
        }

        if (usedTrackIds.has(track.id)) {
          continue;
        }

        usedTrackIds.add(track.id);
        uniqueTracks.push(track);
      }
    }

    const tracks = uniqueTracks.map((track) => ({
      id: track.id,
      title: track.name,
      artist: track.artists
        .map((artist) => artist.name)
        .join(", "),
      image: track.album.images[0]?.url ?? null,
      spotifyUrl: track.external_urls.spotify,
    }));

    return NextResponse.json({
      selection,
      tracks,
    });
  } catch (error) {
    console.error("Spotify API error:", error);

    return NextResponse.json(
      {
        error:
          "Something went wrong while getting music from Spotify.",
      },
      { status: 500 }
    );
  }
}