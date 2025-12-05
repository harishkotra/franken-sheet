# App Architecture

## File Structure
- /src/components/Grid.jsx: A 8x8 grid of input fields.
- /src/components/Controls.jsx: Play/Stop/Resurrect buttons.
- /src/hooks/useSynth.js: Manages Tone.js logic.
- /src/hooks/useGhost.js: Manages API calls to Gaia Node.
- /src/App.jsx: Main layout.

## Functional Requirements

1. **The Grid (Grid.jsx)**
   - Render 64 cells (8 rows x 8 cols).
   - Rows = Musical Pitch (C Scale).
   - Cols = Time Steps.
   - Styling: Green borders, black background, "Courier New" font.

2. **The Audio (useSynth.js)**
   - Initialize `Tone.PolySynth` and `Tone.MembraneSynth`.
   - Function `playColumn(colIndex)`: Trigger notes for non-empty cells in that column.

3. **The Brain (useGhost.js)**
   - Function `askGhost(gridData)`:
     - POST to `http://localhost:8080/v1/chat/completions`.
     - Header: `Content-Type: application/json`.
     - Body: `{ messages: [{ role: "system", content: "Output JSON: { bpm: number, distortion: float }" }, { role: "user", content: gridData }] }`.
     - Return the JSON data to update app state.

4. **The "Resurrection" (App.jsx)**
   - Button "Resurrect": Calls `askGhost`, then starts the sequencer loop.