import { useState } from 'react'
import Grid from './components/Grid'
import Controls from './components/Controls'
import FormulaBar from './components/FormulaBar'
import { useSynth } from './hooks/useSynth'
import { useGhost } from './hooks/useGhost'

const App = () => {
  const [gridData, setGridData] = useState(Array(8).fill(null).map(() => Array(8).fill('')))
  const [isPlaying, setIsPlaying] = useState(false)
  const [bpm, setBpm] = useState(120)
  const [activeCell, setActiveCell] = useState(null)
  const [formulaBarValue, setFormulaBarValue] = useState('')
  const [ghostThought, setGhostThought] = useState('')
  const [isGlitching, setIsGlitching] = useState(false)
  
  const { playColumn, startContext } = useSynth()
  const { summonGhost, loading } = useGhost()

  // Summoning the sequencer loop...
  const startSequencer = () => {
    let currentCol = 0
    const interval = (60 / bpm) * 1000 / 2 // Convert BPM to ms per step
    
    const loop = setInterval(() => {
      playColumn(currentCol, gridData)
      currentCol = (currentCol + 1) % 8
    }, interval)
    
    return loop
  }

  const handlePlay = async () => {
    await startContext() // Awaken Tone.js context
    setIsPlaying(true)
    const loop = startSequencer()
    // Store loop ID for cleanup
    window.frankensheetLoop = loop
  }

  const handleStop = () => {
    setIsPlaying(false)
    if (window.frankensheetLoop) {
      clearInterval(window.frankensheetLoop)
      window.frankensheetLoop = null
    }
  }

  // The Resurrection ritual...
  const handleResurrect = async () => {
    const ghostData = await summonGhost(gridData)
    if (ghostData?.bpm) {
      setBpm(ghostData.bpm)
    }
    
    // Trigger glitch effect
    setIsGlitching(true)
    setGhostThought(`AI MOOD: ${ghostData.mood?.toUpperCase() || 'UNKNOWN'} | BPM: ${ghostData.bpm} | SCALE: ${ghostData.scale || 'N/A'}`)
    
    setTimeout(() => {
      setIsGlitching(false)
      setGhostThought('')
    }, 3000)
    
    // Auto-start after resurrection
    setTimeout(() => handlePlay(), 500)
  }

  const handleLoadDemo = () => {
    const demoData = Array(8).fill(null).map(() => Array(8).fill(''))
    // Row 1 (Kick)
    demoData[0] = ['1', '', '1', '', '1', '', '1', '']
    // Row 3 (Snare)
    demoData[2] = ['', '', '1', '', '', '', '1', '']
    // Row 5 (Melody)
    demoData[4] = ['C4', 'Eb4', 'G4', 'C5', 'DIE', 'RUN', '', '']
    
    setGridData(demoData)
  }

  const handleCellFocus = (value) => {
    setFormulaBarValue(value)
  }

  return (
    <div className={`h-screen flex flex-col bg-[#1f1f1f] ${isGlitching ? 'animate-glitch' : ''}`}>
      {/* Header */}
      <div className="bg-[#2d2e30] px-4 py-3 border-b border-[#3c4043] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-[#e8eaed]">
            👻 Franken-Sheet
          </h1>
          <span className="text-xs text-[#9aa0a6] bg-[#3c4043] px-2 py-1 rounded">
            BPM: {bpm}
          </span>
        </div>
        <div className="text-xs text-[#9aa0a6]">
          Haunted Spreadsheet Synthesizer
        </div>
      </div>

      {/* Controls (Menu + Toolbar) */}
      <Controls 
        isPlaying={isPlaying}
        loading={loading}
        onPlay={handlePlay}
        onStop={handleStop}
        onResurrect={handleResurrect}
        onLoadDemo={handleLoadDemo}
      />

      {/* Formula Bar */}
      <FormulaBar 
        activeCell={activeCell}
        cellValue={formulaBarValue}
        isPlaying={isPlaying}
        ghostThought={ghostThought}
      />

      {/* Grid */}
      <div className="flex-1 overflow-hidden">
        <Grid 
          gridData={gridData} 
          setGridData={setGridData}
          activeCell={activeCell}
          setActiveCell={setActiveCell}
          onCellFocus={handleCellFocus}
        />
      </div>

      {/* Status Bar */}
      <div className="bg-[#2d2e30] px-4 py-2 border-t border-[#3c4043] flex items-center justify-between text-xs text-[#9aa0a6]">
        <div>8x8 Grid • C Major Scale</div>
        <div className={isPlaying ? 'text-[#00ff00] animate-pulse' : ''}>
          {isPlaying ? '▶ Playing' : '⏸ Ready'}
        </div>
      </div>
    </div>
  )
}

export default App
