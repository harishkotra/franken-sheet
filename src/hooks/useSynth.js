import { useRef, useEffect } from 'react'
import * as Tone from 'tone'

const NOTES = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']

export const useSynth = () => {
  const polySynthRef = useRef(null)
  const membraneSynthRef = useRef(null)
  const distortionRef = useRef(null)

  useEffect(() => {
    // Summoning the synthesizers from the void...
    distortionRef.current = new Tone.Distortion(0.8).toDestination()
    
    polySynthRef.current = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle' },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.3,
        release: 0.5,
      },
    }).toDestination()

    membraneSynthRef.current = new Tone.MembraneSynth({
      pitchDecay: 0.05,
      octaves: 4,
      oscillator: { type: 'sine' },
      envelope: {
        attack: 0.001,
        decay: 0.4,
        sustain: 0.01,
        release: 1.4,
      },
    }).toDestination()

    return () => {
      // Banishing the spirits...
      polySynthRef.current?.dispose()
      membraneSynthRef.current?.dispose()
      distortionRef.current?.dispose()
    }
  }, [])

  const startContext = async () => {
    // Awaken the audio context on user interaction
    await Tone.start()
  }

  const playColumn = (colIndex, gridData) => {
    const now = Tone.now()
    
    gridData.forEach((row, rowIndex) => {
      const cellValue = row[colIndex]
      if (cellValue && cellValue.trim() !== '') {
        const note = NOTES[rowIndex]
        
        // Smart audio mapping...
        const isNumber = !isNaN(parseFloat(cellValue))
        const velocity = isNumber ? parseFloat(cellValue) : 1.0
        const hasDistortion = !isNumber && (
          cellValue.toLowerCase().includes('drop') ||
          cellValue.toLowerCase().includes('die') ||
          cellValue.toLowerCase().includes('run') ||
          cellValue.toLowerCase().includes('x')
        )
        
        // Trigger the haunted note...
        if (cellValue.toLowerCase().includes('k') || rowIndex === 0) {
          // Kick drum on membrane synth
          membraneSynthRef.current?.triggerAttackRelease('C1', '8n', now, velocity)
        } else {
          // Melodic note on poly synth
          if (hasDistortion) {
            // Temporarily connect to distortion
            polySynthRef.current?.disconnect()
            polySynthRef.current?.connect(distortionRef.current)
            polySynthRef.current?.triggerAttackRelease(note, '8n', now, velocity)
            // Reconnect after note
            setTimeout(() => {
              polySynthRef.current?.disconnect()
              polySynthRef.current?.toDestination()
            }, 200)
          } else {
            polySynthRef.current?.triggerAttackRelease(note, '8n', now, velocity)
          }
        }
      }
    })
  }

  return { playColumn, startContext }
}
