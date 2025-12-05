import { useState } from 'react'

export const useGhost = () => {
  const [loading, setLoading] = useState(false)

  // Mock Ghost that simulates AI response
  const mockGhost = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          bpm: 140,
          scale: 'C Phrygian',
          mood: 'Demonic'
        })
      }, 2000)
    })
  }

  const summonGhost = async (gridData) => {
    setLoading(true)
    
    try {
      // Channeling the AI spirit...
      const gridString = JSON.stringify(gridData)
      
      const response = await fetch('http://localhost:8080/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.2-3b-instruct',
          messages: [
            {
              role: 'system',
              content: 'You are a music engine. Return JSON: { bpm: number, scale: string, mood: string }',
            },
            {
              role: 'user',
              content: `Analyze this data: ${gridString}`,
            },
          ],
        }),
      })

      if (!response.ok) {
        throw new Error('The ghost did not respond...')
      }

      const data = await response.json()
      
      // Extract the ghost's wisdom from the response
      const ghostMessage = data.choices?.[0]?.message?.content
      
      if (ghostMessage) {
        try {
          const parsed = JSON.parse(ghostMessage)
          setLoading(false)
          return parsed
        } catch {
          // Fallback to mock ghost
          const result = await mockGhost()
          setLoading(false)
          return result
        }
      }
      
      const result = await mockGhost()
      setLoading(false)
      return result
    } catch (error) {
      // Silence... Ghost summoning failed, using mock ghost
      // CRITICAL FAILSAFE: Mock Ghost simulation
      const result = await mockGhost()
      setLoading(false)
      return result
    }
  }

  return { summonGhost, loading }
}
