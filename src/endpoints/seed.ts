/* eslint-disable @typescript-eslint/no-explicit-any */

import type { CollectionSlug, Payload, PayloadRequest, File } from 'payload'
import path from 'path'
import fs from 'fs/promises'

import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { imageHero1 } from './image-hero-1'
import { post4 } from './post-4'
import { post5 } from './post-5'
import { post6 } from './post-6'

const collections: CollectionSlug[] = ['categories', 'media', 'posts']

// const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export const seed = async ({ payload, req }: { payload: Payload; req: PayloadRequest }) => {
  payload.logger.info(`— Clearing collections and globals...`)
  // clear the database

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Seeding demo author and user...`)

  await Promise.all([
    await payload.delete({
      collection: 'users',
      depth: 0,
      where: {
        email: {
          equals: 'demo@edoctors.com',
        },
      },
    }),
    await payload.delete({
      collection: 'users',
      depth: 0,
      where: {
        email: {
          equals: 'doctor@edoctors.com',
        },
      },
    }),
    await payload.delete({
      collection: 'users',
      depth: 0,
      where: {
        email: {
          equals: 'demo@edoctors.com',
        },
      },
    }),
  ])

  payload.logger.info(`— Seeding demo images...`)

  const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] = await Promise.all([
    fetchFileByDisk('D:/Projects/PayloadCMS/e-doctors/src/endpoints', 'image-post1.webp'),
    fetchFileByDisk('D:/Projects/PayloadCMS/e-doctors/src/endpoints', 'image-post2.webp'),
    fetchFileByDisk('D:/Projects/PayloadCMS/e-doctors/src/endpoints', 'image-post3.webp'),
    fetchFileByDisk('D:/Projects/PayloadCMS/e-doctors/src/endpoints', 'image-hero1.webp'),
  ])

  const [_, doctor, demo] = await Promise.all([
    payload.create({
      collection: 'users',
      data: {
        name: 'User',
        email: 'user@edoctors.com',
        password: 'user',
        roles: ['user'],
      },
    }),
    payload.create({
      collection: 'users',
      data: {
        name: 'Doctor',
        email: 'doctor@edoctors.com',
        password: 'doctor',
        roles: ['user'],
      },
    }),
    payload.create({
      collection: 'users',
      data: {
        name: 'Demo',
        email: 'demo@ewardrobe.com',
        password: 'demo',
        roles: ['user'],
      },
    }),
  ])

  const [] = await Promise.all([
    payload.update({
      collection: 'users',
      id: doctor.id,
      data: {
        roles: ['user', 'doctor'],
      },
    }),
    payload.update({
      collection: 'users',
      id: demo.id,
      data: {
        roles: ['user', 'doctor'],
      },
    }),
  ])

  payload.logger.info(`— Seeding demo images...`)

  const [image1Doc, image2Doc, image3Doc] = await Promise.all([
    // MEDIA
    payload.create({
      collection: 'media',
      data: image1,
      file: image1Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image2Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image3Buffer,
    }),
    payload.create({
      collection: 'media',
      data: imageHero1,
      file: hero1Buffer,
    }),
  ])

  payload.logger.info(`— Seeding demo categories...`)

  const [menCategory, womenCategory, kidsCategory, accessoriesCategory, footwearCategory, outerwearCategory] = await Promise.all([
    // CATEGORIES
    payload.create({
      collection: 'categories',
      data: {
        title: 'Men',
        breadcrumbs: [
          {
            label: 'Men',
            url: '/men',
          },
        ],
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'Women',
        breadcrumbs: [
          {
            label: 'Women',
            url: '/women',
          },
        ],
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'Kids',
        breadcrumbs: [
          {
            label: 'Kids',
            url: '/kids',
          },
        ],
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'Accessories',
        breadcrumbs: [
          {
            label: 'Accessories',
            url: '/accessories',
          },
        ],
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'Footwear',
        breadcrumbs: [
          {
            label: 'Footwear',
            url: '/footwear',
          },
        ],
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'Outerwear',
        breadcrumbs: [
          {
            label: 'Outerwear',
            url: '/outerwear',
          },
        ],
      },
    }),
  ])

  let demoAuthorID: number | string = demo.id

  let image1ID: number | string = image1Doc.id
  let image2ID: number | string = image2Doc.id
  let image3ID: number | string = image3Doc.id

  if (payload.db.defaultIDType === 'text') {
    image1ID = `"${image1Doc.id}"`
    image2ID = `"${image2Doc.id}"`
    image3ID = `"${image3Doc.id}"`
    demoAuthorID = `"${demoAuthorID}"`
  }

  payload.logger.info(`— Seeding posts...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order

  const post1Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: JSON.parse(
      JSON.stringify({ ...post1, categories: [menCategory.id] })
        .replace(/"\{\{IMAGE_1\}\}"/g, String(image1ID))
        .replace(/"\{\{IMAGE_2\}\}"/g, String(image2ID))
        .replace(/"\{\{AUTHOR\}\}"/g, String(demoAuthorID)),
    ),
  })

  const post2Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: JSON.parse(
      JSON.stringify({ ...post2, categories: [womenCategory.id] })
        .replace(/"\{\{IMAGE_1\}\}"/g, String(image2ID))
        .replace(/"\{\{IMAGE_2\}\}"/g, String(image3ID))
        .replace(/"\{\{AUTHOR\}\}"/g, String(demoAuthorID)),
    ),
  })

  const post3Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: JSON.parse(
      JSON.stringify({ ...post3, categories: [kidsCategory.id] })
        .replace(/"\{\{IMAGE_1\}\}"/g, String(image3ID))
        .replace(/"\{\{IMAGE_2\}\}"/g, String(image1ID))
        .replace(/"\{\{AUTHOR\}\}"/g, String(demoAuthorID)),
    ),
  })

  const post4Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: JSON.parse(
      JSON.stringify({ ...post4, categories: [accessoriesCategory.id] })
        .replace(/"\{\{IMAGE_1\}\}"/g, String(image1ID))
        .replace(/"\{\{IMAGE_2\}\}"/g, String(image2ID))
        .replace(/"\{\{AUTHOR\}\}"/g, String(demoAuthorID)),
    ),
  })

  const post5Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: JSON.parse(
      JSON.stringify({ ...post5, categories: [footwearCategory.id] })
        .replace(/"\{\{IMAGE_1\}\}"/g, String(image2ID))
        .replace(/"\{\{IMAGE_2\}\}"/g, String(image3ID))
        .replace(/"\{\{AUTHOR\}\}"/g, String(demoAuthorID)),
    ),
  })

  const post6Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: JSON.parse(
      JSON.stringify({ ...post6, categories: [outerwearCategory.id] })
        .replace(/"\{\{IMAGE_1\}\}"/g, String(image3ID))
        .replace(/"\{\{IMAGE_2\}\}"/g, String(image1ID))
        .replace(/"\{\{AUTHOR\}\}"/g, String(demoAuthorID)),
    ),
  })

  // update each post with related posts
  await payload.update({
    id: post1Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post2Doc.id, post3Doc.id],
    },
  })

  await payload.update({
    id: post2Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post3Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post2Doc.id],
    },
  })

  await payload.update({
    id: post4Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post5Doc.id, post6Doc.id],
    },
  })

  await payload.update({
    id: post5Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post2Doc.id, post4Doc.id, post6Doc.id],
    },
  })

  await payload.update({
    id: post6Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post4Doc.id, post5Doc.id],
    },
  })
}

const fetchFileByDisk = async (folder: string, url: string): Promise<File> => {
  const filePath = path.join(folder, url)
  const data = await fs.readFile(filePath)

  return {
    name: path.basename(filePath),
    data: Buffer.from(data),
    mimetype: `image/${path.extname(filePath).slice(1)}`,
    size: data.byteLength,
  }
}
