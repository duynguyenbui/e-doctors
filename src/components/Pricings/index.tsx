'use client'

import type React from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export const Pricings = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 md:px-8">
        <div className="mb-12 space-y-3">
          <h2 className="text-center text-3xl font-semibold leading-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
            Nạp tiền vào ví
          </h2>
          <p className="text-center text-base text-gray-600 md:text-lg">
            Nạp tiền vào ví để thực hiện chat với bác sĩ.
          </p>
        </div>

        <div className="flex items-center justify-center">
          <PriceCard
            tier="300,000 VND / 1 tháng"
            price="300,000 VND"
            bestFor="Tốt nhất cho 1-5 người dùng"
            CTA={<GhostButton className="w-full">Nạp 300,000 VND</GhostButton>}
            benefits={[
              { text: 'Được chat trong vòng 1 tháng', checked: true },
              { text: 'Không giới hạn số lượng tin nhắn', checked: true },
              { text: 'Thoải mái chat với bác sĩ', checked: true },
              { text: 'Hỗ trợ ưu tiên', checked: false },
              { text: 'SSO', checked: false },
            ]}
          />
        </div>
      </div>
    </section>
  )
}

const PriceCard = ({ tier, price, bestFor, CTA, benefits }: PriceCardProps) => {
  return (
    <Card>
      <div className="flex flex-col items-center border-b pb-6">
        <span className="mb-6 inline-block">{tier}</span>
        <span className="mb-3 inline-block text-4xl font-medium ">{price}</span>
        <span className="bg-gradient-to-brbg-clip-text text-center text-transparent">
          {bestFor}
        </span>
      </div>

      <div className="space-y-4 py-9">
        {benefits.map((b, i) => (
          <Benefit {...b} key={i} />
        ))}
      </div>

      {CTA}
    </Card>
  )
}

const Benefit = ({ text, checked }: BenefitType) => {
  return (
    <div className="flex items-center gap-3">
      {checked ? (
        <span className="grid size-5 place-content-center rounded-full bg-blue-600 text-sm text-white">
          <Check className="h-3 w-3" />
        </span>
      ) : (
        <span className="grid size-5 place-content-center rounded-full bg-gray-300 text-sm text-gray-600">
          <X className="h-3 w-3" />
        </span>
      )}
      <span className="text-sm text-gray-600">{text}</span>
    </div>
  )
}

const Card = ({ className, children, style = {} }: CardProps) => {
  return (
    <motion.div
      initial={{
        filter: 'blur(2px)',
      }}
      whileInView={{
        filter: 'blur(0px)',
      }}
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
        delay: 0.25,
      }}
      style={style}
      className={cn(
        'relative h-full w-full overflow-hidden rounded-2xl border p-6',
        className,
      )}
    >
      {children}
    </motion.div>
  )
}

const GhostButton = ({ children, className, ...rest }: GhostButtonProps) => {
  return (
    <button
      className={cn(
        'rounded-md px-4 py-2 text-lg text-black transition-all hover:scale-[1.02] hover:bg-gray-300 hover:text-black active:scale-[0.98]',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

type PriceCardProps = {
  tier: string
  price: string
  bestFor: string
  CTA: ReactNode
  benefits: BenefitType[]
}

type CardProps = {
  className?: string
  children?: ReactNode
  style?: CSSProperties
}

type BenefitType = {
  text: string
  checked: boolean
}

type GhostButtonProps = {
  children: ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>
