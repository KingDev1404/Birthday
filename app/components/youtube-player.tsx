"use client"
import { motion } from "framer-motion"
import { Play, Pause, Volume2 } from "lucide-react"

interface YouTubePlayerProps {
  videoId: string
  isPlaying: boolean
  onToggle: () => void
}

export default function YouTubePlayer({ videoId, isPlaying, onToggle }: YouTubePlayerProps) {
  return (
    <div className="fixed bottom-6 left-6 z-40">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-peach-200"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onToggle}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-peach-500 to-rose-500 flex items-center justify-center text-white hover:shadow-lg transition-all"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
          </button>

          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-peach-600" />
            <div className="text-sm">
              <div className="font-semibold text-gray-800">Perfect</div>
              <div className="text-gray-600">Ed Sheeran</div>
            </div>
          </div>
        </div>

        {/* Hidden YouTube iframe */}
        <iframe
          className="hidden"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&loop=1&playlist=${videoId}`}
          allow="autoplay"
        />
      </motion.div>
    </div>
  )
}
