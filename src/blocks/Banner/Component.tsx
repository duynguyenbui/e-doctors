import type { BannerBlock as BannerBlockProps } from 'src/payload-types'

import { cn } from '@/lib/utils'
import React from 'react'
import RichText from '@/components/RichText'

type Props = {
  className?: string
} & BannerBlockProps

export const BannerBlock: React.FC<Props> = ({ className, content, style }) => {
  return (
    <div className={cn('mx-auto my-8 w-full', className)}>
      <div
        className={cn('border py-3 px-6 flex items-center rounded', {
          'border-primary bg-blue-100 text-blue-700 dark:border-primary dark:bg-blue-950 dark:text-blue-200': style === 'info',
          'border-red-500 bg-red-100 text-red-700 dark:border-red-500 dark:bg-red-950 dark:text-red-200': style === 'error',
          'border-green-500 bg-green-100 text-green-700 dark:border-green-500 dark:bg-green-950 dark:text-green-200': style === 'success',
          'border-amber-500 bg-amber-100 text-amber-800 dark:border-amber-500 dark:bg-amber-950 dark:text-amber-200': style === 'warning',
        })}
      >
        <RichText data={content} enableGutter={false} enableProse={false} />
      </div>
    </div>
  )
}
