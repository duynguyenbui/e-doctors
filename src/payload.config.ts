// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { vi } from '@payloadcms/translations/languages/vi'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Conversations } from './collections/Converations/index'
import { Messages } from './collections/Messages'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'
import { plugins } from './plugins'
import { getServerSideURL } from './utilities/getURL'
import { defaultLexical } from './fields/defaultLexical'
import {Profiles} from './collections/Profiles'
import { Doctors } from './collections/Doctors'
import { MedicalRecord } from'./collections/MedicalRecord'

import type { EmailAdapter } from 'payload'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)


export default buildConfig({
  admin: {
    
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: './decorators/Logo/index',
        Icon: './decorators/Icon/index',
      },
    },
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  collections: [Users, Conversations, Messages, Media, Posts, Categories,Profiles,Doctors,MedicalRecord],
  editor: defaultLexical,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  cors: [getServerSideURL()].filter(Boolean),
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  i18n: {
    fallbackLanguage: 'vi', // default
    supportedLanguages: {vi},
  },
  graphQL: {
    disable: true,
  },
})
