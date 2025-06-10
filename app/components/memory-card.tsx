"use client"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface Memory {
  year: string
  title: string
  description: string
  image: string
  icon: ReactNode
}

interface MemoryCardProps {
  memory: Memory
  index: number
  isActive: boolean
  setActive: () => void
}

export default function MemoryCard({ memory, index, isActive, setActive }: MemoryCardProps) {
  const isEven = index % 2 === 0

  return (
    <div
      className={cn(
        "flex justify-center w-full",
        // Mobile: all cards centered, Desktop: alternating sides
        "sm:justify-center md:justify-center",
        isEven ? "lg:justify-end" : "lg:justify-start",
      )}
    >
      <motion.div
        className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg"
        initial="initial"
        whileHover="hover"
        animate={isActive ? "active" : "initial"}
      >
        {/* Year Marker - Mobile Responsive */}
        <motion.div
          className="absolute -top-6 sm:-top-8 left-4 sm:left-1/2 sm:transform sm:-translate-x-1/2 z-20"
          variants={{
            initial: { scale: 1 },
            hover: { scale: 1.1 },
            active: { scale: 1.2 },
          }}
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-peach-500 to-rose-500 flex items-center justify-center text-white font-bold shadow-lg text-sm sm:text-base">
            {memory.year}
          </div>
        </motion.div>

        {/* Memory Card - Mobile Responsive */}
        <motion.div
          className="w-full cursor-pointer"
          onClick={setActive}
          variants={{
            initial: { scale: 1 },
            hover: { scale: 1.02 },
            active: { scale: 1.05 },
          }}
        >
          <Card
            className={cn(
              "bg-white/70 backdrop-blur-sm border-peach-100 shadow-lg overflow-hidden transition-all duration-300",
              isActive && "shadow-xl",
            )}
          >
            <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden rounded-t-2xl">
              <Image
                src={memory.image || "/placeholder.svg"}
                alt={memory.title}
                width={400}
                height={300}
                className="w-full h-full object-contain bg-gradient-to-br from-peach-50 to-rose-50 transition-all duration-500"
                style={{
                  transform: isActive ? "scale(1.05)" : "scale(1)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="flex items-center gap-2">
                  <div className="text-peach-200">{memory.icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold">{memory.title}</h3>
                </div>
              </div>
            </div>
            <CardContent className="p-4 sm:p-6">
              <motion.p
                className="text-gray-700 leading-relaxed text-sm sm:text-base"
                variants={{
                  initial: { height: "3.5rem", overflow: "hidden" },
                  active: { height: "auto", overflow: "visible" },
                }}
              >
                {memory.description}
              </motion.p>
              {!isActive && (
                <motion.div
                  className="text-peach-500 font-medium mt-2 text-xs sm:text-sm"
                  variants={{
                    initial: { opacity: 1 },
                    active: { opacity: 0 },
                  }}
                >
                  Tap to expand...
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Connection Line to Timeline - Mobile Responsive */}
        <motion.div
          className="absolute -top-6 sm:-top-8 left-8 sm:left-1/2 w-px h-6 sm:h-8 bg-peach-300 hidden sm:block"
          style={{ transformOrigin: "top" }}
          variants={{
            initial: { scaleY: 1 },
            hover: { scaleY: 1.2 },
            active: { scaleY: 1.5 },
          }}
        />
      </motion.div>
    </div>
  )
}
