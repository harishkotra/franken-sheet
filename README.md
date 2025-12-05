# 👻 Franken-Sheet: Haunted Spreadsheet Synthesizer

A dark, spooky spreadsheet-based music sequencer powered by Tone.js and AI. Create haunting melodies by filling an 8x8 grid with notes, velocities, and effects. Summon an AI ghost to analyze your composition and suggest BPM, scale, and mood.

## Features

- **Spreadsheet UI**: Google Sheets-inspired dark mode interface with column (A-H) and row (1-8) headers
- **8x8 Music Grid**: Each row represents a note in the C Major scale (C4-C5), each column a time step
- **Smart Audio Mapping**:
  - Numbers (0-1): Control note velocity (loudness)
  - Text (e.g., "DROP", "DIE"): Trigger distortion effects
  - Empty cells: Silence
- **AI Integration**: Click the Σ (Summon) button to invoke an AI ghost that analyzes your grid and suggests BPM, scale, and mood
- **Clipboard Paste**: Copy data from Excel/Sheets and paste directly into the grid
- **Demo Presets**: Load pre-built drum patterns and melodies from the File menu
- **Glitch Effects**: Visual feedback when the AI responds (screen shake, formula bar updates)

## Getting Started

### Local Development

```bash
npm install
npm run dev
```

The app runs on `http://localhost:5173`

### Usage

1. **Fill the Grid**:
   - Click any cell to select it
   - Type a note name (C4, D4, etc.), a number (0-1 for velocity), or text (DROP, DIE, RUN)
   - Press Enter or click another cell to confirm

2. **Play Your Composition**:
   - Click the **▶ Play** button to start the sequencer
   - The sequencer loops through columns, triggering notes in real-time
   - Click **⏹ Stop** to halt playback

3. **Summon the AI Ghost**:
   - Click the **Σ** button to invoke the AI
   - The ghost analyzes your grid and suggests a new BPM, scale, and mood
   - The formula bar glitches and displays the AI's thoughts
   - Playback auto-starts after summoning

4. **Load Demo Data**:
   - Click **File** → **Load Demo Data** to populate the grid with a pre-built pattern
   - Includes kick drum, snare, and melody rows

5. **Paste from Excel**:
   - Copy data from Excel/Google Sheets (tab or comma-separated)
   - Click the grid and paste (Cmd+V / Ctrl+V)
   - Data fills starting from the active cell

## Grid Layout

```
     A    B    C    D    E    F    G    H
1   [C4] [D4] [E4] [F4] [G4] [A4] [B4] [C5]
2   [C4] [D4] [E4] [F4] [G4] [A4] [B4] [C5]
3   [C4] [D4] [E4] [F4] [G4] [A4] [B4] [C5]
4   [C4] [D4] [E4] [F4] [G4] [A4] [B4] [C5]
5   [C4] [D4] [E4] [F4] [G4] [A4] [B4] [C5]
6   [C4] [D4] [E4] [F4] [G4] [A4] [B4] [C5]
7   [C4] [D4] [E4] [F4] [G4] [A4] [B4] [C5]
8   [C4] [D4] [E4] [F4] [G4] [A4] [B4] [C5]
```

Each row plays a different pitch. Each column is a time step in the sequencer.

## Audio Mapping Examples

| Cell Content | Result |
|---|---|
| `1` | Play note at full velocity |
| `0.5` | Play note at 50% volume |
| `DROP` | Play note with distortion effect |
| `DIE` | Play note with distortion effect |
| `RUN` | Play note with distortion effect |
| (empty) | Silence |

## AI Integration

The app connects to an OpenAI-compatible API endpoint. By default, it tries `http://localhost:8080/v1/chat/completions` (for local development).

**For Vercel Deployment**:
Set the `VITE_API_ENDPOINT` environment variable in your Vercel project settings to your API endpoint (e.g., `https://your-api.com/v1`).

**Request Format**:
```json
{
  "model": "llama-3.2-3b-instruct",
  "messages": [
    {
      "role": "system",
      "content": "You are a music engine. Return JSON: { bpm: number, scale: string, mood: string }"
    },
    {
      "role": "user",
      "content": "Analyze this data: [[...grid data...]]"
    }
  ]
}
```

**Fallback**: If the API is unavailable, the app uses a mock ghost that returns `{ bpm: 140, scale: "C Phrygian", mood: "Demonic" }` after 2 seconds. This ensures the demo always works.

## Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Audio**: Tone.js
- **Icons**: Lucide React
- **Font**: Inter (UI) + Courier New (cells)

## Keyboard Shortcuts

- **Cmd/Ctrl + V**: Paste from clipboard
- **Enter**: Confirm cell edit
- **Arrow Keys**: Navigate grid (coming soon)

## Architecture

- `src/App.jsx`: Main layout and state management
- `src/components/Grid.jsx`: Spreadsheet grid with paste handler
- `src/components/Controls.jsx`: Menu bar and toolbar
- `src/components/FormulaBar.jsx`: Cell address and content display
- `src/hooks/useSynth.js`: Tone.js audio engine with velocity and distortion
- `src/hooks/useGhost.js`: AI integration with fallback mock ghost

## Spooky Features

- Dark gray background (#1f1f1f) with green accents
- Glitch animation when AI responds
- Formula bar pulses when playing
- "Summoning..." spinner on AI button
- Haunted status bar with playback indicator

## Future Enhancements

- [ ] Undo/Redo
- [ ] Save/Load compositions
- [ ] MIDI export
- [ ] Custom scales
- [ ] Recording and playback
- [ ] More distortion effects
- [ ] Reverb and delay
