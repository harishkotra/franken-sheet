import { useState } from 'react'

const NOTES = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']
const COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

const Grid = ({ gridData, setGridData, activeCell, setActiveCell, onCellFocus }) => {
  const handleCellChange = (rowIndex, colIndex, value) => {
    const newGrid = gridData.map((row, rIdx) =>
      rIdx === rowIndex
        ? row.map((cell, cIdx) => (cIdx === colIndex ? value : cell))
        : row
    )
    setGridData(newGrid)
  }

  const handleCellClick = (rowIndex, colIndex) => {
    setActiveCell({ row: rowIndex, col: colIndex })
    onCellFocus(gridData[rowIndex][colIndex])
  }

  // Haunted clipboard paste handler...
  const handlePaste = (e) => {
    e.preventDefault()
    const pastedText = e.clipboardData.getData('text')
    
    // Parse CSV/TSV data from Excel
    const rows = pastedText.split('\n').map(row => 
      row.split(/[\t,]/).map(cell => cell.trim())
    )
    
    const startRow = activeCell?.row || 0
    const startCol = activeCell?.col || 0
    
    const newGrid = [...gridData]
    rows.forEach((row, rIdx) => {
      const targetRow = startRow + rIdx
      if (targetRow < 8) {
        row.forEach((cell, cIdx) => {
          const targetCol = startCol + cIdx
          if (targetCol < 8) {
            newGrid[targetRow][targetCol] = cell.substring(0, 3) // Max 3 chars
          }
        })
      }
    })
    
    setGridData(newGrid)
  }

  return (
    <div 
      className="overflow-auto bg-[#1f1f1f] border-t border-[#3c4043]"
      onPaste={handlePaste}
      tabIndex={0}
    >
      <table className="border-collapse">
        <thead>
          <tr>
            {/* Empty corner cell */}
            <th className="sticky left-0 top-0 z-20 bg-[#2d2e30] border-r border-b border-[#3c4043] w-12 h-8 text-xs text-[#9aa0a6]"></th>
            {/* Column headers */}
            {COLUMNS.map((col, idx) => (
              <th 
                key={col}
                className="sticky top-0 z-10 bg-[#2d2e30] border-r border-b border-[#3c4043] min-w-[100px] h-8 text-xs font-medium text-[#9aa0a6] px-2"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {gridData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {/* Row header */}
              <td className="sticky left-0 z-10 bg-[#2d2e30] border-r border-b border-[#3c4043] w-12 h-8 text-xs text-[#9aa0a6] text-center font-medium">
                {rowIndex + 1}
                <span className="ml-1 text-[#00ff00] text-[10px]">{NOTES[rowIndex]}</span>
              </td>
              {/* Data cells */}
              {row.map((cell, colIndex) => {
                const isActive = activeCell?.row === rowIndex && activeCell?.col === colIndex
                return (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    className={`border-r border-b border-[#3c4043] h-8 p-0 bg-[#0a0a0a] hover:bg-[#1a1a1a] transition-colors ${
                      isActive ? 'ring-2 ring-[#00ff00] ring-inset' : ''
                    }`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                      onFocus={() => handleCellClick(rowIndex, colIndex)}
                      className="w-full h-full px-2 bg-transparent text-[#e8eaed] text-sm font-mono outline-none"
                      maxLength={3}
                    />
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Grid
