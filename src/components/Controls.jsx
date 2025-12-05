import { Play, Square, Sigma, FileText, Edit3, Eye, Menu, Loader2 } from 'lucide-react'

const Controls = ({ isPlaying, loading, onPlay, onStop, onResurrect, onLoadDemo }) => {
  return (
    <div className="bg-[#2d2e30] border-b border-[#3c4043]">
      {/* Menu Bar */}
      <div className="flex items-center gap-4 px-4 py-2 text-sm text-[#e8eaed] border-b border-[#3c4043]">
        <div className="relative group">
          <button className="hover:bg-[#3c4043] px-2 py-1 rounded">File</button>
          <div className="hidden group-hover:block absolute top-full left-0 mt-1 bg-[#2d2e30] border border-[#3c4043] rounded shadow-lg min-w-[150px] z-50">
            <button 
              onClick={onLoadDemo}
              className="w-full text-left px-4 py-2 hover:bg-[#3c4043] text-sm"
            >
              Load Demo Data
            </button>
          </div>
        </div>
        <button className="hover:bg-[#3c4043] px-2 py-1 rounded">Edit</button>
        <button className="hover:bg-[#3c4043] px-2 py-1 rounded">View</button>
        <button className="hover:bg-[#3c4043] px-2 py-1 rounded text-purple-400">Summon</button>
      </div>
      
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2">
        <button
          onClick={onPlay}
          disabled={isPlaying}
          className="p-2 hover:bg-[#3c4043] rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Play"
        >
          <Play size={18} className="text-[#00ff00]" />
        </button>
        
        <button
          onClick={onStop}
          disabled={!isPlaying}
          className="p-2 hover:bg-[#3c4043] rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Stop"
        >
          <Square size={18} className="text-red-500" />
        </button>
        
        <div className="w-px h-6 bg-[#3c4043] mx-1"></div>
        
        <button
          onClick={onResurrect}
          disabled={loading || isPlaying}
          className="p-2 hover:bg-[#3c4043] rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors relative"
          title="Summon Ghost (AI)"
        >
          {loading ? (
            <Loader2 size={18} className="text-purple-500 animate-spin" />
          ) : (
            <Sigma size={18} className="text-purple-500" />
          )}
        </button>
        
        <div className="w-px h-6 bg-[#3c4043] mx-1"></div>
        
        <button className="p-2 hover:bg-[#3c4043] rounded opacity-50" title="Format">
          <Edit3 size={18} className="text-[#9aa0a6]" />
        </button>
        
        <button className="p-2 hover:bg-[#3c4043] rounded opacity-50" title="Insert">
          <FileText size={18} className="text-[#9aa0a6]" />
        </button>
      </div>
    </div>
  )
}

export default Controls
