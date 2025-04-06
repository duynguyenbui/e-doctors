import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'
import { Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { stripePlugin } from '@payloadcms/plugin-stripe'
import Stripe from 'stripe'
// import Stripe from 'stripe'

const generateTitle: GenerateTitle<Post> = ({ doc }) => {
  return doc?.title ? `${doc.title} | eDoctors` : 'eDoctors'
}

const generateURL: GenerateURL<Post> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['posts'],
    overrides: {
      labels: {
        singular: {
          vi: 'Chuyển hướng',
        },
        plural: {
          vi: 'Chuyển hướng',
        },
      },
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      labels: {
        singular: {
          vi: 'Tìm kiếm chỉ mục',
        },
        plural: {
          vi: 'Tìm kiếm chỉ mục',
        },
      },
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  payloadCloudPlugin(),
  stripePlugin({
    stripeSecretKey: process.env.STRIPE_SECRET_KEY!,
    stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOKS_ENDPOINT_SECRET,
    webhooks: {
      'checkout.session.completed': async ({ event, req }) => {
        const { payload } = req
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session?.metadata?.userId

        if (!userId) {
          return
        }

        const { docs: paymentSubscriptions } = await payload.find({
          collection: 'paymentSubscriptions',
          where: {
            'accountDetails.user.id': {
              equals: userId,
            },
          },
          pagination: false,
          depth: 1,
          limit: 1,
        })

        const paymentSubscription = paymentSubscriptions[0]

        if (!paymentSubscription) {
          return
        }

        const currentDate = new Date()

        payload.update({
          collection: 'paymentSubscriptions',
          id: paymentSubscription.id,
          data: {
            subscription: [
              ...(paymentSubscription.subscription || []),
              {
                startDate: currentDate.toISOString(),
                endDate: new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
              }
            ]
          }
        })
      },
    },
  }),
]
