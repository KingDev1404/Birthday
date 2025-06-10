"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Music, Play, Pause, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VinylPlayerProps {
  isPlaying: boolean
  togglePlay: () => void
}

export default function VinylPlayer({ isPlaying, togglePlay }: VinylPlayerProps) {
  const [rotation, setRotation] = useState(0)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    let animationFrame: number

    const rotateVinyl = () => {
      if (isPlaying) {
        setRotation((prev) => (prev + 1) % 360)
        animationFrame = requestAnimationFrame(rotateVinyl)
      }
    }

    if (isPlaying) {
      animationFrame = requestAnimationFrame(rotateVinyl)
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isPlaying])

  return (
    <div className="relative">
      <motion.div
        className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center shadow-xl"
        animate={{ rotate: isPlaying ? rotation : 0 }}
        transition={{ type: "tween", ease: "linear" }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className="absolute w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-peach-400 to-rose-400 opacity-80" />
        <div className="absolute w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-white" />
        <div className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-900" />
        <div className="absolute inset-0 rounded-full border-2 sm:border-4 border-t-white border-opacity-10 border-t-opacity-40" />
      </motion.div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute -top-10 right-0 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 text-xs shadow-md">
          {isPlaying ? "Pause" : "Play"} "Perfect" by Ed Sheeran
        </div>
      )}

      <motion.div
        className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 z-20"
        animate={isPlaying ? { x: [-1, 1, -1], rotate: [0, 1, 0] } : {}}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.5 }}
      >
        <Button
          onClick={togglePlay}
          variant="outline"
          size="icon"
          className="bg-white/90 backdrop-blur-sm border-peach-200 hover:bg-peach-50 shadow-md w-8 h-8 sm:w-10 sm:h-10"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? <Pause className="w-3 h-3 sm:w-4 sm:h-4" /> : <Play className="w-3 h-3 sm:w-4 sm:h-4" />}
        </Button>
      </motion.div>

      <motion.div
        className="absolute -bottom-1.5 -left-1.5 sm:-bottom-2 sm:-left-2 z-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-peach-200 to-rose-200 flex items-center justify-center shadow-lg"
        animate={isPlaying ? { scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] } : {}}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-peach-600" />
        ) : (
          <Music className="w-4 h-4 sm:w-5 sm:h-5 text-peach-600" />
        )}
      </motion.div>
    </div>
  )
}
