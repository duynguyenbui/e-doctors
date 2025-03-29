"use client"

import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

// Floating Particles Effect
function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/70 rounded-full"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, repeatType: "mirror" }}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  )
}

export default function Hero({
  badge = "eDoctors",
  title1 = "Nâng Cao",
  title2 = "Sức Khỏe Tinh Thần",
}: {
  badge?: string
  title1?: string
  title2?: string
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-green-50 via-emerald-50 to-teal-100">
      <FloatingParticles />
      {/* Light gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-emerald-300/[0.4] via-transparent to-teal-300/[0.4] blur-3xl"
        animate={{ x: mousePos.x * 0.01, y: mousePos.y * 0.01 }}
      />

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.5] border border-emerald-200/[0.6] mb-8"
        >
          <Image src="/hero-logo.svg" alt="eDoctors" width={20} height={20} />
          <span className="text-sm text-black tracking-wide font-medium">{badge}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight"
        >
          <span className="text-black">{title1}</span>
          <br />
          <motion.span
            className={cn("text-black", pacifico.className)}
            whileHover={{ scale: 1.05, rotate: 1 }}
          >
            {title2}
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg text-black mb-8 leading-relaxed max-w-xl mx-auto"
        >
          eDoctors là nền tảng cho phép bạn trò chuyện trực tuyến với bác sĩ.
        </motion.p>

        <div className="flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.1, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-300 text-white font-medium shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all"
          >
            Bắt đầu ngay
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full bg-white/60 backdrop-blur-sm text-black font-medium border border-black/10 shadow-lg hover:bg-white/80 transition-all"
          >
            Tìm hiểu thêm
          </motion.button>
        </div>
      </div>
    </div>
  )
}
