'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { ArrowUpDown } from 'lucide-react'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type MedicalRecordDataTableType = {
  id: string
  physicianName: string
  patientName: string
  visitDate: string
  symptoms: string
  note: string
}

export const columns: ColumnDef<MedicalRecordDataTableType>[] = [
  {
    accessorKey: 'physicianName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Bác sĩ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'patientName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Bệnh nhân
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'visitDate',
    header: 'Ngày khám',
  },
  {
    accessorKey: 'symptoms',
    header: 'Triệu chứng',
  },
  {
    accessorKey: 'note',
    header: 'Ghi chú',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const medicalRecord = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(medicalRecord.id)}>
              Sao chép hồ sơ bệnh án định danh
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href={`/medical-records/${medicalRecord.id}`}>
              <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
