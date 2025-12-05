const FormulaBar = ({ activeCell, cellValue, isPlaying, ghostThought }) => {
  const getCellAddress = () => {
    if (!activeCell) return ''
    const col = String.fromCharCode(65 + activeCell.col) // A, B, C...
    const row = activeCell.row + 1
    return `${col}${row}`
  }

  return (
    <div className="bg-[#2d2e30] border-b border-[#3c4043] px-4 py-2 flex items-center gap-3">
      <div className="text-sm font-medium text-[#9aa0a6] min-w-[60px]">
        {getCellAddress()}
      </div>
      <div className="flex-1 bg-[#0a0a0a] border border-[#3c4043] rounded px-3 py-1.5">
        <span 
          className={`text-sm font-mono ${
            ghostThought 
              ? 'text-purple-400 animate-pulse' 
              : isPlaying 
                ? 'text-[#00ff00] animate-pulse' 
                : 'text-[#e8eaed]'
          }`}
        >
          {ghostThought || cellValue || ''}
        </span>
      </div>
    </div>
  )
}

export default FormulaBar
