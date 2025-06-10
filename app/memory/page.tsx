"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, ArrowLeft, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function MemoryPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handlePlay = () => setIsPlaying(true)
      const handlePause = () => setIsPlaying(false)

      video.addEventListener("play", handlePlay)
      video.addEventListener("pause", handlePause)

      return () => {
        video.removeEventListener("play", handlePlay)
        video.removeEventListener("pause", handlePause)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-50 to-rose-50 relative overflow-hidden">
      {/* Background Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-peach-200 opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 8 + 3,
              height: Math.random() * 8 + 3,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header - Mobile Responsive */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 p-4 sm:p-6"
      >
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Link href="/">
            <Button
              variant="outline"
              className="bg-white/80 backdrop-blur-sm border-peach-200 hover:bg-peach-50 text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Birthday Site</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>

          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="text-peach-500"
          >
            <Heart className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" />
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content - Mobile Responsive */}
      <main className="relative z-10 px-4 sm:px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-peach-600 to-rose-600 bg-clip-text text-transparent mb-4 leading-tight">
              Our Epic Trekking Adventure
            </h1>
            <p className="text-lg sm:text-xl text-gray-700">The perfect disaster that became our perfect memory 🏔️</p>
          </motion.div>

          {/* Video Section - Mobile Responsive */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-peach-100 mb-6 sm:mb-8"
          >
            <div className="relative">
              <video
                ref={videoRef}
                className="w-full h-48 sm:h-64 md:h-96 object-cover"
                poster="/placeholder.svg?height=400&width=800&text=Rainy+Trekking+Adventure"
                loop
                controls
              >
                <source src="/videos/trekking-adventure.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Video Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

              {/* Play Button Overlay */}
              {!isPlaying && (
                <motion.button
                  onClick={toggleVideo}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 sm:p-4 shadow-lg">
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 text-peach-600 ml-1" />
                  </div>
                </motion.button>
              )}

              {/* Floating Elements */}
              <motion.div
                className="absolute top-4 left-4 sm:top-6 sm:left-6 text-white pointer-events-none"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <Heart className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" />
              </motion.div>
            </div>
          </motion.div>

          {/* Story Section - Mobile Responsive */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl border border-peach-100"
          >
            <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-2xl sm:text-3xl font-bold text-peach-600 mb-4 sm:mb-6 text-center"
              >
                The Day Everything Went Beautifully Wrong 🌧️
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="text-gray-800 leading-relaxed space-y-4 sm:space-y-6"
              >
                <p className="text-lg sm:text-xl font-medium text-center italic text-peach-700 mb-6 sm:mb-8">
                  "Sometimes the best adventures are the ones that don't go according to plan..."
                </p>

                <p className="text-sm sm:text-base">
                  Remember our epic trekking plan that turned into the most beautiful disaster ever? We had it all
                  mapped out - the perfect route, perfect weather, perfect timing. We spent weeks researching trails,
                  checking weather forecasts, and packing our bags with military precision. We were going to be those
                  cool, prepared adventurers who had everything under control.
                </p>

                <p className="text-sm sm:text-base">
                  But then the universe had other plans! That sudden stormy rain caught us completely off guard, and
                  there we were, two soaked adventurers on a bike, laughing hysterically as we rode through puddles that
                  looked like small lakes. Your hair was a complete mess, my shoes were squelching with every step, and
                  we couldn't stop giggling about how our 'perfect' plan had gone so wonderfully wrong.
                </p>

                <p className="text-sm sm:text-base">
                  I still remember the moment we looked at each other - completely drenched, makeup running, clothes
                  sticking to us - and instead of being upset, we just burst into uncontrollable laughter. That's when I
                  knew our friendship was something truly special. Not everyone can turn a disaster into pure joy like
                  that.
                </p>

                <p className="text-sm sm:text-base">
                  But you know what? That chaotic, stormy, absolutely imperfect day became our most perfect memory. We
                  discovered that the best adventures aren't the ones that go according to plan - they're the ones where
                  you're with the right person who can turn any disaster into pure magic.
                </p>

                <p className="text-sm sm:text-base">
                  That day taught us that we could weather any storm together, literally and figuratively! Every time it
                  rains now, I think of us on that bike, singing at the top of our lungs, completely soaked but
                  completely happy. It's become our thing - finding joy in the chaos, laughing through the storms, and
                  making the best of whatever life throws our way.
                </p>

                <div className="bg-gradient-to-r from-peach-100 to-rose-100 rounded-2xl p-4 sm:p-6 my-6 sm:my-8">
                  <p className="text-center font-semibold text-peach-700 text-base sm:text-lg">
                    "The best memories aren't made in perfect moments - they're made with perfect people who can laugh
                    through the imperfect ones." 💕
                  </p>
                </div>

                <p className="text-center text-gray-700 font-medium text-sm sm:text-base">
                  Here's to many more beautiful disasters and perfect imperfections together! 🚴‍♀️⛈️✨
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer Message - Mobile Responsive */}
      <motion.footer
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="relative z-10 text-center pb-8"
      >
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mx-4 sm:mx-6 max-w-2xl mx-auto border border-peach-100">
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Every storm we've weathered together has only made our friendship stronger. Thank you for being the person
            who can find sunshine in any rain cloud, Pigeon! 🌈💕
          </p>
        </div>
      </motion.footer>
    </div>
  )
}
