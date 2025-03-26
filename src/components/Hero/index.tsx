"use client"

import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import Image from "next/image"
import { cn } from "@/lib/utils"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-emerald-200/[0.7]", // Changed to emerald color
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.6]",
            "shadow-[0_8px_40px_0_rgba(209,250,229,0.5)]", // Green tinted shadow
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(209,250,229,0.7),transparent_70%)]", // Green tinted glow
          )}
        />
      </motion.div>
    </motion.div>
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
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-green-50 via-emerald-50 to-teal-100">
      {" "}
      {/* Green gradient background */}
      {/* Colorful background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/[0.4] via-transparent to-teal-300/[0.4] blur-3xl" />
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-emerald-300/[0.6]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-teal-300/[0.6]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-green-300/[0.6]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-lime-300/[0.6]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-cyan-300/[0.6]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>
      {/* Add colorful light sources */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.5] border border-emerald-200/[0.6] mb-8 md:mb-12"
          >
            <Image src="/hero-logo.svg" alt="Kokonut UI" width={20} height={20} />
            <span className="text-sm text-black tracking-wide font-medium">{badge}</span>
          </motion.div>

          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="text-black">{title1}</span>
              <br />
              <span className={cn("text-black", pacifico.className)}>{title2}</span>
            </h1>
          </motion.div>

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="text-base sm:text-lg md:text-xl text-black mb-8 leading-relaxed font-medium tracking-wide max-w-xl mx-auto px-4">
              eDoctors là nền tảng cho phép bạn trò chuyện trực tuyến với bác sĩ.
            </p>
          </motion.div>

          {/* Updated buttons for green theme */}
          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex gap-4 justify-center"
          >
            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-300 text-white font-medium shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all">
              Bắt đầu ngay
            </button>
            <button className="px-6 py-3 rounded-full bg-white/60 backdrop-blur-sm text-black font-medium border border-black/10 shadow-lg hover:bg-white/80 transition-all">
              Tìm hiểu thêm
            </button>
          </motion.div>
        </div>
      </div>
      {/* Light gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-teal-100/80 via-transparent to-green-50/80 pointer-events-none" />
    </div>
  )
}

