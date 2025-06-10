"use client"

import { motion } from "framer-motion"

export default function SpotifyPlayer() {
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-6 left-6 z-40">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-peach-200">
        <iframe
          src="https://open.spotify.com/embed/track/2Fxmhks0bxGSBdJ92vM42m?utm_source=generator&theme=0"
          width="300"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-xl"
        />
      </div>
    </motion.div>
  )
}
