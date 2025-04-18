import type { Metadata } from 'next/types'

import { PostArchive } from '@/components/PostArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Search } from '@/search/Component'
import { CardPostData } from '@/components/PostCard'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 3,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },

    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  })

  return (
    <div className="pt-16 pb-16 container max-w-5xl mx-auto ">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <h1 className="mb-8 lg:mb-16">Tìm kiếm</h1>

          <div className="max-w-[50rem] mx-auto">
            <Search route="search" />
          </div>
        </div>
      </div>

      {posts.totalDocs > 0 ? (
        <PostArchive posts={posts.docs as CardPostData[]} />
      ) : (
        <div className="container">Không tìm thấy kết quả.</div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `eDoctors - Tìm kiếm`,
  }
}
