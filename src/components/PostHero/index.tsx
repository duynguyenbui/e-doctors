import React from "react"
import type { Post } from "@/payload-types"
import { Media } from "@/components/Media"
import { formatAuthors } from "@/utilities/formatAuthors"
import { formatDateTime } from "@/utilities/formatDateTime"

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors = populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ""

  return (
    <div className="relative min-h-[80vh] flex items-center">
      <div className="absolute inset-0 w-full h-full">
        {heroImage && typeof heroImage !== "string" && (
          <Media fill priority imgClassName="object-cover" resource={heroImage} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 py-16 md:py-24 text-white">
        <div className="max-w-4xl mx-auto">
          {categories && categories.length > 0 && (
            <div className="mb-6 md:mb-8">
              <div className="inline-flex items-center text-sm uppercase tracking-wider font-medium">
                {categories.map((category, index) => {
                  if (typeof category === "object" && category !== null) {
                    const { title: categoryTitle } = category
                    const titleToUse = categoryTitle || "Untitled category"
                    const isLast = index === categories.length - 1

                    return (
                      <React.Fragment key={index}>
                        {titleToUse}
                        {!isLast && <span className="mx-2">•</span>}
                      </React.Fragment>
                    )
                  }
                  return null
                })}
              </div>
            </div>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-8 md:mb-12">
            {title}
          </h1>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 text-white/90">
            {hasAuthors && (
              <div className="flex items-center gap-3">
                <div className="text-sm uppercase tracking-wider font-medium">Author</div>
                <div className="text-base md:text-lg">{formatAuthors(populatedAuthors)}</div>
              </div>
            )}

            {publishedAt && (
              <div className="flex items-center gap-3">
                <div className="text-sm uppercase tracking-wider font-medium">Date Published</div>
                <time dateTime={publishedAt} className="text-base md:text-lg">
                  {formatDateTime(publishedAt)}
                </time>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

