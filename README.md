# Moodwave

Moodwave is an interactive music discovery experience that turns a mood or moment into a combination of music and color.

Users choose how they are feeling or what they are doing, select a vinyl from the collection, and drop the needle on a virtual record player. Moodwave then uses the Spotify Web API to discover matching tracks and pairs the selection with a generated color palette and visual composition.

## Live Demo

[View Moodwave](https://moodwave-9jn7yu6qy-evelyn-9c5a.vercel.app/)

## Intended Audience

Moodwave is designed for people who use music to match or shape how they feel. It is especially aimed at listeners who want a more visual and playful way to discover music instead of searching by artist, album, or genre.

## Problem / Opportunity

Music discovery platforms often organize music around artists, genres, playlists, or listening history. Moodwave explores a different starting point: **how someone feels or what they are doing right now.**

The goal was to make music discovery feel more expressive by combining sound, color, and interaction into one experience.

## Primary User Flow

1. Choose between **Mood** or **Moment**.
2. Select a vinyl from the collection.
3. Drop the needle using the button or the record player's tonearm.
4. Moodwave searches Spotify for music related to the selected mood or moment.
5. View a generated Moodwave containing:
   - Four Spotify tracks
   - A five-color palette
   - A generated abstract visual
6. Remix the visual while keeping the same music.
7. Share the Moodwave by optionally adding a personal note and downloading it as a PNG.
8. Return to the record collection and create another Moodwave.

## Tech Stack

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Spotify Web API**
- **html-to-image**
- **Vercel**
- **Git & GitHub**

## Spotify API

Moodwave uses the **Spotify Web API** to retrieve real music data.

When a user selects a mood or moment, Moodwave maps that selection to a set of relevant search terms and sends requests to Spotify. The returned track data is used to display:

- Track title
- Artist
- Album artwork
- Link to the track on Spotify

Spotify authentication is handled server-side through a Next.js API route using environment variables, so the Spotify client secret is not exposed in the browser.

## Project Structure

```text
app/
├── api/
│   └── spotify/
│       └── route.ts
├── components/
│   ├── GeneratedArtwork.tsx
│   ├── RecordCard.tsx
│   ├── ResultsModal.tsx
│   └── ShareModal.tsx
├── data/
│   └── moodData.ts
├── globals.css
├── layout.tsx
└── page.tsx
```

The interface is divided into reusable components for the vinyl collection, generated artwork, results experience, and sharing experience. Mood and visual-generation data are kept separately from the main page component.

## Running Moodwave Locally

### 1. Clone the repository

```bash
git clone https://github.com/project1-designtk590/moodwave.git
cd moodwave
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add Spotify credentials

Create a `.env.local` file in the root of the project:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

Spotify credentials should never be committed to GitHub.

### 4. Start the development server

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

### 5. Create a production build

```bash
npm run build
```

## Known Limitations

- Moodwave does not stream music directly. Tracks open externally in Spotify.
- Music matching is based on Spotify catalog searches associated with each mood or moment rather than analysis of a track's audio characteristics.
- Mood and moment options are currently predefined.
- Generated Moodwaves are not saved between sessions.
- There are no user accounts or persistent personal libraries.

## Future Improvements

With more time, I would explore:

- More moods and moments
- Saving previous Moodwaves
- More visual composition styles
- More control over music discovery
- Additional sharing options
- Improved mobile interactions and responsive layouts
- Accessibility testing and improvements

## AI Use

I used AI tools to assist with code generation, debugging, code explanation, and refactoring throughout development. I reviewed and tested the code as I built the project to make sure I understood how it worked. The concept, brainstorming, design decisions, user flows, and iterations for Moodwave were my own.

## Author

**Evelyn Li**

Project 1
