export const dynamic = 'force-static'
export const revalidate = 600

import { getPayload } from 'payload'
import configPromise from '../../../payload.config'
import React from 'react'
import { PageRange } from '@/components/PageRange'
import { PostArchive } from '@/components/PostArchive'
import { Pagination } from '@/components/Pagination'
import { Metadata } from 'next'

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 3,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div className="pt-16 pb-16 container max-w-5xl mx-auto ">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold">Bài viết</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange collection="posts" currentPage={posts.page} limit={12} totalDocs={posts.totalDocs} />
      </div>

      <PostArchive posts={posts.docs} />

      <div className="container mt-12">
        {posts.totalPages > 1 && posts.page && <Pagination page={posts.page} totalPages={posts.totalPages} />}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `eDoctors - Bài viết`,
    description: 'Xem các bài viết và thông tin từ eDoctors',
  }
}
