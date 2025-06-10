"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, useAnimation, useScroll, useTransform } from "framer-motion"
import { Heart, Music, Sparkles, Gift, Star, Cake, Coffee, Camera, Plane } from "lucide-react"
import VinylPlayer from "./components/vinyl-player"
import MemoryCard from "./components/memory-card"
import ParallaxText from "./components/parallax-text"
import Particles from "./components/particles"

const memories = [
  {
    year: "2012",
    title: "The Beginning",
    description: "Two souls met and instantly clicked. Little did we know this was the start of something beautiful.",
    image: "/images/2012-beginning.jpg",
    icon: <Heart className="w-6 h-6 sm:w-8 sm:h-8" />,
  },
  {
    year: "2014",
    title: "Adventures Begin",
    description:
      "Our first big adventure together. Laughing until our stomachs hurt and creating memories that would last forever.",
    image: "/images/2025-forever-always.jpg",
    icon: <Camera className="w-6 h-6 sm:w-8 sm:h-8" />,
  },
  {
    year: "2016",
    title: "Through Thick & Thin",
    description:
      "The year we proved that true friendship can weather any storm. Supporting each other through ups and downs.",
    image: "/images/2018-growing-together.jpg",
    icon: <Coffee className="w-6 h-6 sm:w-8 sm:h-8" />,
  },
  {
    year: "2018",
    title: "Growing Together",
    description: "Celebrating milestones, sharing dreams, and growing into the amazing women we are today.",
    image: "/images/2016-coffee-moments.jpg",
    icon: <Star className="w-6 h-6 sm:w-8 sm:h-8" />,
  },
  {
    year: "2020",
    title: "Unbreakable Bond",
    description: "Even through a global pandemic, our friendship only grew stronger. Distance couldn't separate us.",
    image: "/images/2020-unbreakable-bond.jpg",
    icon: <Cake className="w-6 h-6 sm:w-8 sm:h-8" />,
  },
  {
    year: "2022",
    title: "New Horizons",
    description: "Exploring new paths together, supporting each other's dreams and ambitions.",
    image: "/images/2014-adventures.jpg",
    icon: <Plane className="w-6 h-6 sm:w-8 sm:h-8" />,
  },
  {
    year: "2025",
    title: "Forever & Always",
    description:
      "Looking ahead to our future adventures. Thirteen incredible years of friendship and many more to come.",
    image: "/images/2022-new-horizons.jpg",
    icon: <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />,
  },
]

export default function BirthdayMemoryWebsite() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showCelebration, setShowCelebration] = useState(true)
  const [activeMemory, setActiveMemory] = useState<number | null>(null)
  const [audioLoaded, setAudioLoaded] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const playPromiseRef = useRef<Promise<void> | null>(null)
  const { scrollYProgress } = useScroll()
  const timelineProgress = useTransform(scrollYProgress, [0.2, 0.9], [0, 1])
  const controls = useAnimation()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCelebration(false)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 })
  }, [controls])

  // Track user interaction for autoplay policy
  useEffect(() => {
    const handleUserInteraction = () => {
      setUserInteracted(true)
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("touchstart", handleUserInteraction)
    }

    document.addEventListener("click", handleUserInteraction)
    document.addEventListener("touchstart", handleUserInteraction)

    return () => {
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("touchstart", handleUserInteraction)
    }
  }, [])

  const toggleMusic = useCallback(async () => {
    if (!audioRef.current || !audioLoaded) {
      return
    }

    const audio = audioRef.current

    try {
      // Wait for any pending play promise to resolve
      if (playPromiseRef.current) {
        await playPromiseRef.current
        playPromiseRef.current = null
      }

      if (isPlaying) {
        // Pause the audio
        audio.pause()
        setIsPlaying(false)
      } else {
        // Only try to play if user has interacted
        if (!userInteracted) {
          alert("Please click anywhere on the page first to enable music playback.")
          return
        }

        // Reset audio if it ended
        if (audio.ended) {
          audio.currentTime = 0
        }

        // Start playing
        playPromiseRef.current = audio.play()
        await playPromiseRef.current
        playPromiseRef.current = null
        setIsPlaying(true)
      }
    } catch (error: any) {
      console.error("Audio playback failed:", error)
      setIsPlaying(false)
      playPromiseRef.current = null

      // Handle specific error types
      if (error.name === "AbortError") {
        // Don't show error for abort - this is normal when rapidly clicking
        return
      } else if (error.name === "NotAllowedError") {
        alert("Please interact with the page first to enable music playback.")
      } else {
        console.warn("Audio error:", error.message)
      }
    }
  }, [audioLoaded, isPlaying, userInteracted])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleCanPlayThrough = () => {
      setAudioLoaded(true)
      console.log("Audio loaded successfully")
    }

    const handlePlay = () => {
      setIsPlaying(true)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      playPromiseRef.current = null
    }

    const handleError = (e: Event) => {
      setIsPlaying(false)
      setAudioLoaded(false)
      playPromiseRef.current = null
      console.error("Audio loading error:", e)
    }

    const handleLoadStart = () => {
      console.log("Audio loading started")
    }

    const handleLoadedData = () => {
      setAudioLoaded(true)
      console.log("Audio data loaded")
    }

    const handleWaiting = () => {
      console.log("Audio waiting for data")
    }

    const handleStalled = () => {
      console.log("Audio stalled")
    }

    // Add all event listeners
    audio.addEventListener("canplaythrough", handleCanPlayThrough)
    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)
    audio.addEventListener("loadstart", handleLoadStart)
    audio.addEventListener("loadeddata", handleLoadedData)
    audio.addEventListener("waiting", handleWaiting)
    audio.addEventListener("stalled", handleStalled)

    // Set audio properties
    audio.preload = "auto"
    audio.loop = true

    // Load the audio
    audio.load()

    return () => {
      // Clean up event listeners
      audio.removeEventListener("canplaythrough", handleCanPlayThrough)
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
      audio.removeEventListener("loadstart", handleLoadStart)
      audio.removeEventListener("loadeddata", handleLoadedData)
      audio.removeEventListener("waiting", handleWaiting)
      audio.removeEventListener("stalled", handleStalled)
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (playPromiseRef.current) {
        playPromiseRef.current.catch(() => {
          // Ignore errors on cleanup
        })
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-50 to-rose-50 relative overflow-hidden">
      {/* Background Audio */}
      <audio ref={audioRef} preload="auto" playsInline crossOrigin="anonymous">
        <source src="/Perfect-(Mr-Jat.in).mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Vinyl Player - Mobile Responsive */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-40">
        <VinylPlayer isPlaying={isPlaying} togglePlay={toggleMusic} />
      </div>

      {/* User Interaction Prompt */}
      {!userInteracted && (
        <div className="fixed top-20 right-4 bg-peach-100 border border-peach-400 text-peach-700 px-4 py-3 rounded z-50 max-w-sm text-sm">
          <strong>🎵 Music Ready!</strong> Click anywhere to enable audio playback.
        </div>
      )}

      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <Particles />
      </div>

      {/* Celebration Animation */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-r from-peach-400 via-rose-400 to-pink-400 px-4"
          >
            <div className="text-center text-white max-w-sm sm:max-w-md">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="mb-6 sm:mb-8"
              >
                <Gift className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4" />
                <h1 className="text-4xl sm:text-6xl font-bold mb-4">Happy Birthday</h1>
                <h2 className="text-2xl sm:text-4xl font-light">Pigeon! 🕊️</h2>
              </motion.div>

              {/* Confetti Animation - Responsive */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-3 h-3 sm:w-4 sm:h-4 ${
                    i % 5 === 0
                      ? "bg-yellow-300"
                      : i % 4 === 0
                        ? "bg-pink-300"
                        : i % 3 === 0
                          ? "bg-blue-300"
                          : i % 2 === 0
                            ? "bg-green-300"
                            : "bg-purple-300"
                  } rounded-full`}
                  initial={{
                    x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 400),
                    y: -20,
                    rotate: 0,
                  }}
                  animate={{
                    y: (typeof window !== "undefined" ? window.innerHeight : 800) + 20,
                    rotate: 360,
                  }}
                  transition={{
                    duration: 3,
                    delay: Math.random() * 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4 }} className="relative z-10">
        {/* Hero Section - Mobile Responsive */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto w-full">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 4.5 }}
              className="mb-6 sm:mb-8"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 text-peach-500" />
              </motion.div>
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-peach-600 to-rose-600 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
                13 Years of Magic
              </h1>
              <div className="hidden sm:block">
                <ParallaxText baseVelocity={-2}>
                  A beautiful journey of friendship, laughter, and unconditional love
                </ParallaxText>
              </div>
              <div className="block sm:hidden text-lg text-peach-600 font-medium">
                A beautiful journey of friendship, laughter, and unconditional love
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 5 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-peach-100 mx-4 sm:mx-0"
            >
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed italic">
                "In you, I found not just a friend, but a confidant, and a piece of my soul. Through thirteen incredible
                years, we've laughed until we cried, supported each other through storms, and celebrated every victory
                together. You are the melody to my chaos, the sunshine after my rain, and the constant reminder that
                true friendship is life's greatest gift. Happy Birthday, my dearest Pigeon. Here's to forever and
                always. 💕"
              </p>
            </motion.div>
          </div>

          {/* Floating Hearts - Mobile Optimized */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-peach-300 hidden sm:block"
              initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 400),
                y: typeof window !== "undefined" ? window.innerHeight : 800,
              }}
              animate={{
                y: -100,
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 400),
              }}
              transition={{
                duration: 8,
                delay: 5 + Math.random() * 3,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <Heart className="w-4 h-4 sm:w-6 sm:h-6" fill="currentColor" />
            </motion.div>
          ))}

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 5.5, duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-6 h-10 sm:w-8 sm:h-12 rounded-full border-2 border-peach-400 flex justify-center">
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-peach-400 mt-2"
              />
            </div>
          </motion.div>
        </section>

        {/* Memory Timeline - Mobile Responsive */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 bg-gradient-to-r from-peach-600 to-rose-600 bg-clip-text text-transparent px-4"
            >
              Our Beautiful Journey
            </motion.h2>

            {/* Timeline Line - Mobile Responsive */}
            <div className="absolute left-8 sm:left-1/2 sm:transform sm:-translate-x-1/2 h-full top-0 w-0.5 sm:w-1 bg-gradient-to-b from-peach-200 via-rose-300 to-peach-200 rounded-full" />
            <motion.div
              className="absolute left-8 sm:left-1/2 sm:transform sm:-translate-x-1/2 w-0.5 sm:w-1 bg-peach-500 rounded-full origin-top"
              style={{ height: timelineProgress, top: "8rem" }}
            />

            <div className="space-y-16 sm:space-y-32 relative pl-16 sm:pl-0">
              {memories.map((memory, index) => (
                <motion.div
                  key={memory.year}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <MemoryCard
                    memory={memory}
                    index={index}
                    isActive={activeMemory === index}
                    setActive={() => setActiveMemory(activeMemory === index ? null : index)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Memory Capsule Section - Mobile Responsive */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-peach-100/50 to-rose-100/50">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 bg-gradient-to-r from-peach-600 to-rose-600 bg-clip-text text-transparent"
            >
              Memory Capsule
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <motion.div
                whileHover={{ scale: 1.02, rotateY: 5 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-peach-100 cursor-pointer relative overflow-hidden"
                onClick={() => {
                  window.open("/affirmations", "_blank")
                }}
              >
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-peach-200 to-rose-200 flex items-center justify-center text-peach-600 mx-auto mb-4">
                    <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Daily Affirmation</h3>
                  <p className="text-gray-600 text-sm">A little reminder of how amazing you are</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, rotateY: 5 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-peach-100 cursor-pointer relative overflow-hidden"
                onClick={() => {
                  window.open("/memory", "_blank")
                }}
              >
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-peach-200 to-rose-200 flex items-center justify-center text-peach-600 mx-auto mb-4">
                    <Heart className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Random Memory</h3>
                  <p className="text-gray-600 text-sm">A surprise memory from our adventures</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, rotateY: 5 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-peach-100 cursor-pointer relative overflow-hidden sm:col-span-2 md:col-span-1"
                onClick={() => {
                  window.open("/future", "_blank")
                }}
              >
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-peach-200 to-rose-200 flex items-center justify-center text-peach-600 mx-auto mb-4">
                    <Star className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Future Prediction</h3>
                  <p className="text-gray-600 text-sm">What the stars have in store for you</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final Message - Mobile Responsive */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-peach-500 to-rose-500 rounded-3xl p-8 sm:p-12 text-white shadow-2xl"
            >
              <Music className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-6" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">"Perfect" by Ed Sheeran</h2>
              <p className="text-lg sm:text-xl leading-relaxed mb-8">
                Just like this song, our friendship is perfect in every imperfect way. Through all the years, all the
                changes, all the growth - we remain perfectly us.
              </p>
              <div className="text-xl sm:text-2xl font-bold">Happy Birthday, Pigeon! 🎉</div>
              <div className="text-base sm:text-lg mt-4 opacity-90">
                Here's to 13 more years of beautiful chaos together! 💕
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final Paragraph - Mobile Responsive */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white/30 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-base sm:prose-lg mx-auto"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-peach-600">
                A Letter To My Best Friend
              </h2>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-peach-100">
                <p className="text-gray-800 leading-relaxed mb-4">Dear Pigeon,</p>
                <p className="text-gray-800 leading-relaxed mb-4">
                  As I sit here reflecting on our 13 years of friendship, I'm overwhelmed with gratitude for having you
                  in my life. From our awkward teenage years to navigating adulthood together, you've been my constant,
                  my rock, my person.
                </p>
                <p className="text-gray-800 leading-relaxed mb-4">
                  Remember when we stayed up all night talking about our dreams? Or when we cried together over
                  heartbreaks? Or those spontaneous road trips where we sang at the top of our lungs? Each memory is
                  etched in my heart forever.
                </p>
                <p className="text-gray-800 leading-relaxed mb-4">
                  You've seen me at my worst and still chose to love me. You've celebrated my highest highs and helped
                  me through my lowest lows. Our friendship isn't just about the good times—it's about being there for
                  each other through everything life throws our way.
                </p>
                <p className="text-gray-800 leading-relaxed mb-4">
                  They say friends are the family we choose, and I couldn't have chosen a better friend than you. Your
                  kindness, your humor, your wisdom, and even your quirks (yes, even those!) make you the incredible
                  person you are.
                </p>
                <p className="text-gray-800 leading-relaxed mb-4">
                  On your birthday, I want you to know how deeply loved and appreciated you are. You make this world a
                  brighter place just by being in it. I'm so proud of the person you've become and excited for all that
                  lies ahead for you.
                </p>
                <p className="text-gray-800 leading-relaxed mb-4">
                  Here's to another year of adventures, late-night talks, inside jokes, and creating memories that we'll
                  laugh about when we're old and gray. May this year bring you all the happiness, success, and love that
                  you so richly deserve.
                </p>
                <p className="text-gray-800 font-bold mt-6 sm:mt-8">With all my love,</p>
                <p className="text-gray-800 font-bold">Your best friend forever ❤️</p>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </div>
  )
}
