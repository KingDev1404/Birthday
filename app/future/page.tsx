"use client"
import { motion } from "framer-motion"
import { Star, ArrowLeft, Sparkles, Heart, Infinity } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function FuturePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-peach-50 relative overflow-hidden">
      {/* Background Stars */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 1, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          >
            <Star className="w-2 h-2 sm:w-3 sm:h-3" fill="currentColor" />
          </motion.div>
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
              className="bg-white/80 backdrop-blur-sm border-purple-200 hover:bg-purple-50 text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Birthday Site</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>

          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="text-purple-500"
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
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-peach-600 bg-clip-text text-transparent mb-4 leading-tight">
              Future Predictions
            </h1>
            <p className="text-lg sm:text-xl text-gray-700">What the stars have written for us ✨</p>
          </motion.div>

          {/* Prediction Card - Mobile Responsive */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, rotateY: -10 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-purple-100"
          >
            {/* Image Section */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <Image
                src="/images/future-friendship.jpg"
                alt="Eternal friendship - two best friends together"
                width={800}
                height={400}
                className="w-full h-full object-contain bg-gradient-to-br from-purple-50 to-pink-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/60 via-pink-500/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              {/* Floating Elements */}
              <motion.div
                className="absolute top-6 right-6 text-white"
                animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              >
                <Infinity className="w-8 h-8" />
              </motion.div>

              <motion.div
                className="absolute bottom-6 left-6 text-white"
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <Heart className="w-6 h-6" fill="currentColor" />
              </motion.div>

              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Star className="w-12 h-12" fill="currentColor" />
              </motion.div>

              {/* Constellation Effect */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    left: `${20 + i * 10}%`,
                    top: `${30 + (i % 3) * 15}%`,
                  }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>

            {/* Text Section */}
            <div className="p-8 md:p-12">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center mb-8"
              >
                <div className="inline-flex items-center gap-2 text-purple-600 font-semibold mb-4">
                  <Star className="w-5 h-5" fill="currentColor" />
                  <span>The Universe Has Spoken</span>
                  <Star className="w-5 h-5" fill="currentColor" />
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-6"
              >
                <p className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
                  "It will always be us together till eternity and beyond!" ∞
                </p>

                <p>
                  The stars have spoken, and they're absolutely certain about this: Through every season of life, every
                  adventure (planned or chaotic), every storm we'll weather, and every rainbow that follows - we're
                  destined to be each other's constant. Our friendship transcends everything, proving that the most
                  beautiful bonds are built on trust, laughter, and unconditional support.
                </p>

                <p>
                  The universe conspired to bring us together 13 years ago, and it's not done with our story yet. I see
                  countless more years of spontaneous adventures, inside jokes that make no sense to anyone else,
                  late-night conversations that solve the world's problems, and yes, probably more 'perfect' plans that
                  turn into beautiful disasters. We'll be each other's biggest cheerleaders and most trusted confidants.
                </p>

                <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-peach-100 rounded-2xl p-6 my-8">
                  <p className="text-center font-semibold text-purple-700 text-lg">
                    "We're going to be those two best friends who still laugh about that time we got caught in the rain
                    during our trekking adventure, still making memories, still being absolutely ridiculous together, no
                    matter where life takes us." 🌟👫
                  </p>
                </div>

                <p>
                  Some friendships are for a season, some for a reason, but ours? Ours is for a lifetime and whatever
                  comes after. The cosmic forces that brought us together are the same ones that will keep us connected
                  through every chapter of our lives. Whether we're celebrating successes or navigating challenges,
                  we'll always have each other's backs.
                </p>

                <p>
                  I predict we'll celebrate your 30th birthday together, your 40th, your 50th, and beyond. We'll be
                  there for each other's major life moments - graduations, career achievements, relationships, and all
                  the milestones in between. We'll be travel companions on adventures around the world, and the constant
                  source of laughter and support in each other's lives.
                </p>

                <p>
                  Through career changes, new cities, new relationships, and all of life's beautiful chaos - we'll
                  remain each other's anchor. Distance might separate us physically sometimes, but our bond is
                  unbreakable. We'll always find our way back to each other, just like we always have.
                </p>

                <div className="text-center mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                  <p className="text-xl font-bold text-purple-700 mb-4">
                    Forever and always, through every storm and every sunshine!
                  </p>
                  <div className="flex justify-center items-center gap-2 text-pink-600">
                    <Heart className="w-6 h-6" fill="currentColor" />
                    <Infinity className="w-8 h-8" />
                    <Heart className="w-6 h-6" fill="currentColor" />
                  </div>
                </div>
              </motion.div>
            </div>
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
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mx-6 max-w-2xl mx-auto border border-purple-100">
          <p className="text-gray-700 leading-relaxed">
            The stars don't lie, Pigeon. Our friendship is written in the cosmos, destined to shine bright for eternity.
            Here's to forever and always! 🌟💫
          </p>
        </div>
      </motion.footer>
    </div>
  )
}
