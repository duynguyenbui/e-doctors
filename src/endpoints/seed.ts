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

const collections: CollectionSlug[] = ['categories', 'media', 'posts']

// const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export const seed = async ({ payload, req }: { payload: Payload; req: PayloadRequest }) => {
  payload.logger.info(`Clearing collections and globals...`)
  // clear the database

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  Promise.all([
    payload.delete({
      collection: 'categories',
      where: {
        id: {
          exists: true,
        },
      },
    }),
    payload.delete({
      collection: 'messages',
      where: {
        id: {
          exists: true,
        },
      },
    }),
    payload.delete({
      collection: 'conversations',
      where: {
        id: {
          exists: true,
        },
      },
    }),
    payload.delete({
      collection: 'media',
      where: {
        id: {
          exists: true,
        },
      },
    }),
    payload.delete({
      collection: 'physicianProfiles',
      where: {
        id: {
          exists: true,
        },
      },
    }),
    payload.delete({  
      collection: 'paymentSubscriptions',
      where: {
        id: {
          exists: true,
        },
      },
    }),
    payload.delete({
      collection: 'posts',
      where: {
        id: {
          exists: true,
        },
      },
    }),
  ])

  await Promise.all([
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
          equals: 'user@edoctors.com',
        },
      },
    }),
  ])

  payload.logger.info(`Seeding demo author and user...`)

  const [doctor, user] = await Promise.all([
    payload.create({
      collection: 'users',
      data: {
        name: 'Bác sĩ',
        email: 'doctor@edoctors.com',
        password: 'doctor',
        gender: 'female',
        dob: '2000-01-01',
        phone: '0909090909',
        address: '456 Elm St, Anytown, USA',
        roles: ['doctor', 'user'],
      },
    }),
    payload.create({
      collection: 'users',
      data: {
        name: 'Người dùng',
        email: 'user@edoctors.com',
        password: 'user',
        gender: 'male',
        dob: '1990-01-01',
        phone: '0909090909',
        address: '456 Elm St, Anytown, USA',
        roles: ['user'],
      },
    }),
  ])

  payload.logger.info(`Seeding demo images...`)

  const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] = await Promise.all([
    fetchFileByDisk('D:/PayloadCMS/e-doctors/src/endpoints', 'image-post1.webp'),
    fetchFileByDisk('D:/PayloadCMS/e-doctors/src/endpoints', 'image-post2.webp'),
    fetchFileByDisk('D:/PayloadCMS/e-doctors/src/endpoints', 'image-post3.webp'),
    fetchFileByDisk('D:/PayloadCMS/e-doctors/src/endpoints', 'image-hero1.webp'),
  ])

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

  payload.logger.info(`Seeding demo categories...`)

  const [
    cardiologyCategory,
    neurologyCategory,
    pediatricsCategory,
    dermatologyCategory,
  ] = await Promise.all([
    // CATEGORIES
    payload.create({
      collection: 'categories',
      data: {
        title: 'Tim mạch',
        breadcrumbs: [
          {
            label: 'Tim mạch',
            url: '/tim-mach',
          },
        ],
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'Thần kinh',
        breadcrumbs: [
          {
            label: 'Thần kinh',
            url: '/than-kinh',
          },
        ],
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'Nhi khoa',
        breadcrumbs: [
          {
            label: 'Nhi khoa',
            url: '/nhi-khoa',
          },
        ],
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'Da liễu',
        breadcrumbs: [
          {
            label: 'Da liễu',
            url: '/da-lieu',
          },
        ],
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'Chỉnh hình',
        breadcrumbs: [
          {
            label: 'Chỉnh hình',
            url: '/chinh-hinh',
          },
        ],
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'Chẩn đoán hình ảnh',
        breadcrumbs: [
          {
            label: 'Chẩn đoán hình ảnh',
            url: '/chan-doan-hinh-anh',
          },
        ],
      },
    }),
  ])

  let demoAuthorID: number | string = user.id

  let image1ID: number | string = image1Doc.id
  let image2ID: number | string = image2Doc.id
  let image3ID: number | string = image3Doc.id

  if (payload.db.defaultIDType === 'text') {
    image1ID = `"${image1Doc.id}"`
    image2ID = `"${image2Doc.id}"`
    image3ID = `"${image3Doc.id}"`
    demoAuthorID = `"${demoAuthorID}"`
  }

  payload.logger.info(`Seeding posts...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order

  const post1Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: JSON.parse(
      JSON.stringify({ ...post1, categories: [cardiologyCategory.id] })
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
      JSON.stringify({ ...post2, categories: [neurologyCategory.id] })
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
      JSON.stringify({ ...post3, categories: [pediatricsCategory.id] })
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
      JSON.stringify({ ...post4, categories: [dermatologyCategory.id] })
        .replace(/"\{\{IMAGE_1\}\}"/g, String(image1ID))
        .replace(/"\{\{IMAGE_2\}\}"/g, String(image2ID))
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
      relatedPosts: [post1Doc.id, post2Doc.id, post3Doc.id],
    },
  })

  payload.logger.info(`Seeding demo physician profiles...`)

  const [{docs: physicianProfiles1}] = await Promise.all([
    payload.find({
      collection: 'physicianProfiles',
      where: {
        'accountDetails.user.id': {
          equals: doctor.id,
        },
      },
    }),
  ])

  const physicianProfile1 = physicianProfiles1[0]

  if (physicianProfile1) {
    await payload.update({
      collection: 'physicianProfiles',
      id: physicianProfile1.id,
      data: {
        academicRank: 'doctor', 
        experience: 15,
        specialty: 'Tim mạch và các bệnh tim mạch',
        awards: 'Nhận giải thưởng Xuất sắc Quốc gia về Tim mạch, 2018',
        education: 'Đại học Y Hà Nội, Khóa 2005',
      }
    })
  }
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
