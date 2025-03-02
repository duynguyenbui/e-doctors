import type { CollectionConfig } from 'payload'

export const Patients: CollectionConfig = {
  slug: 'patients',
  labels: {
    singular: 'Patient',
    plural: 'Patients',
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'dateOfBirth',
      type: 'date',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'medicalHistory',
      type: 'textarea',
    },
  ],
}

export default Patients
