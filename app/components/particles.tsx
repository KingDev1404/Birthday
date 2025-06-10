"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  duration: number
  delay: number
}

export default function Particles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const colors = ["#f6c097", "#f19e6b", "#ed8249", "#fdeee0"]
    const newParticles: Particle[] = []

    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      })
    }

    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: 0.3,
          }}
          animate={{
            y: ["0%", "100%", "0%"],
            x: [`${particle.x}%`, `${particle.x + (Math.random() * 10 - 5)}%`, `${particle.x}%`],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
