"use client"
import { motion } from "framer-motion"
import { Star, ArrowLeft, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
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
      <motion.header initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative z-10 p-4 sm:p-6">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Link href="/">
            <Button variant="outline" className="bg-white/80 backdrop-blur-sm border-purple-200 hover:bg-purple-50 text-sm sm:text-base">
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
            className="bg-\
