"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Heart, Star, ArrowLeft, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const affirmations = [
  {
    text: "You have this incredible ability to make everyone around you feel seen and valued. Your presence alone brightens any room you walk into.",
    image: "/images/affirmations/elegant-evening.jpg",
    color: "from-orange-400 to-pink-400",
  },
  {
    text: "Your laugh is contagious and your smile could literally cure anyone's bad day. You bring so much joy to this world just by being yourself.",
    image: "/images/affirmations/bow-sweetness.jpg",
    color: "from-pink-400 to-rose-400",
  },
  {
    text: "You're stronger than you realize and braver than you believe. Every challenge you've faced has only made you more resilient and amazing.",
    image: "/images/affirmations/night-confidence.jpg",
    color: "from-blue-400 to-teal-400",
  },
  {
    text: "Your kindness creates ripples of positivity that touch more lives than you'll ever know. You make the world a better place simply by existing.",
    image: "/images/affirmations/cafe-moments.jpg",
    color: "from-green-400 to-emerald-400",
  },
  {
    text: "You have this beautiful way of finding magic in ordinary moments. Your perspective on life inspires everyone lucky enough to know you.",
    image: "/images/affirmations/fairy-lights-magic.jpg",
    color: "from-purple-400 to-indigo-400",
  },
  {
    text: "Your authenticity is refreshing in a world full of pretense. Never change who you are - you're absolutely perfect just as you are.",
    image: "/images/affirmations/traditional-beauty.jpg",
    color: "from-yellow-400 to-orange-400",
  },
  {
    text: "You have this amazing gift of making people feel comfortable being themselves around you. That's a rare and beautiful quality.",
    image: "/images/affirmations/dreamy-hearts.jpg",
    color: "from-cyan-400 to-blue-400",
  },
  {
    text: "Your dreams are valid and achievable. You have everything within you to create the life you've always imagined. Keep believing in yourself.",
    image: "/images/affirmations/professional-dreams.jpg",
    color: "from-slate-400 to-gray-400",
  },
]

export default function AffirmationsPage() {
  const [currentAffirmation, setCurrentAffirmation] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Set a random affirmation on page load
    setCurrentAffirmation(Math.floor(Math.random() * affirmations.length))
  }, [])

  const getNewAffirmation = () => {
    setIsVisible(false)
    setTimeout(() => {
      let newIndex
      do {
        newIndex = Math.floor(Math.random() * affirmations.length)
      } while (newIndex === currentAffirmation && affirmations.length > 1)

      setCurrentAffirmation(newIndex)
      setIsVisible(true)
    }, 300)
  }

  const current = affirmations[currentAffirmation]

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-50 to-rose-50 relative overflow-hidden">
      {/* Background Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-peach-200 opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
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
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="text-peach-500"
          >
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
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
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-peach-600 to-rose-600 bg-clip-text text-transparent mb-4">
              Daily Affirmations
            </h1>
            <p className="text-lg sm:text-xl text-gray-700">For the most amazing person I know ✨</p>
          </motion.div>

          {/* Affirmation Card - Mobile Responsive */}
          <AnimatePresence mode="wait">
            {isVisible && (
              <motion.div
                key={currentAffirmation}
                initial={{ scale: 0.8, opacity: 0, rotateY: -20 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotateY: 20 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-peach-100"
              >
                {/* Image Section */}
                <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
                  <Image
                    src={current.image || "/placeholder.svg"}
                    alt="Beautiful moment"
                    width={600}
                    height={400}
                    className="w-full h-full object-contain bg-gradient-to-br from-peach-50 to-rose-50"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${current.color} opacity-40`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                  {/* Floating Elements */}
                  <motion.div
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Heart className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" />
                  </motion.div>

                  <motion.div
                    className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Star className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" />
                  </motion.div>
                </div>

                {/* Text Section */}
                <div className="p-6 sm:p-8 md:p-12">
                  <motion.blockquote
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-800 font-medium italic text-center mb-6 sm:mb-8"
                  >
                    "{current.text}"
                  </motion.blockquote>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center gap-2 text-peach-600 font-semibold mb-6">
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" />
                      <span className="text-sm sm:text-base">With love, your best friend</span>
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Button - Mobile Responsive */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center mt-8 sm:mt-12"
          >
            <Button
              onClick={getNewAffirmation}
              className="bg-gradient-to-r from-peach-500 to-rose-500 hover:from-peach-600 hover:to-rose-600 text-white px-6 sm:px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
            >
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              New Affirmation
            </Button>
          </motion.div>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-6 sm:mt-8"
          >
            <p className="text-xs sm:text-sm text-gray-500">
              Affirmation {currentAffirmation + 1} of {affirmations.length}
            </p>
          </motion.div>
        </div>
      </main>

      {/* Footer Message - Mobile Responsive */}
      <motion.footer
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 text-center pb-8"
      >
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mx-4 sm:mx-6 max-w-2xl mx-auto border border-peach-100">
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Remember, Pigeon: You are loved, you are valued, and you are absolutely incredible. These aren't just words
            - they're truths that everyone who knows you can see. Happy Birthday, beautiful soul! 🎉💕
          </p>
        </div>
      </motion.footer>
    </div>
  )
}
