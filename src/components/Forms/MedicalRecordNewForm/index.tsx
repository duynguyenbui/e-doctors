'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, Plus, Trash2 } from 'lucide-react'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useRef, useEffect } from 'react'
import { PayloadMedicalRecordValidator, TPayloadMedicalRecordValidator } from '@/validations'

export function MedicalRecordForm({
  onSubmit,
  patientId,
  doctorId,
}: {
  onSubmit: (values: TPayloadMedicalRecordValidator) => void
  patientId: string
  doctorId: string
}) {
  const form = useForm<TPayloadMedicalRecordValidator>({
    resolver: zodResolver(PayloadMedicalRecordValidator),
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'prescriptions',
  })

  const handleSubmit = (values: TPayloadMedicalRecordValidator) => {
    onSubmit(values)
  }

  const prescriptionContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prescriptionContainerRef.current) {
      const container = prescriptionContainerRef.current
      container.scrollTop = container.scrollHeight
    }
  }, [fields.length])

  useEffect(() => {
    form.setValue('patientId', patientId)
    form.setValue('doctorId', doctorId)
  }, [patientId, doctorId])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
        <div className="grid grid-cols-3 gap-3">
          {/* Visit Date */}
          <FormField
            control={form.control}
            name="visitDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Ngày khám</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full h-8 pl-3 text-left font-normal text-sm',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? format(field.value, 'dd/MM/yyyy') : <span>Chọn ngày</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Symptoms */}
          <FormField
            control={form.control}
            name="symptoms"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Triệu chứng</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Mô tả triệu chứng"
                    className="resize-none h-20 text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* Diagnosis */}
          <FormField
            control={form.control}
            name="diagnosis"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Chẩn đoán</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Nhập chẩn đoán"
                    className="resize-none h-20 text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Treatment */}
          <FormField
            control={form.control}
            name="treatment"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Phương pháp điều trị</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Mô tả phương pháp điều trị"
                    className="resize-none h-20 text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* Note (Optional) */}
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Ghi chú (tùy chọn)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Thêm ghi chú nếu cần"
                    className="resize-none h-20 text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        {/* Prescription */}
        <div className="space-y-2 border rounded-md p-3">
          <div className="flex items-center justify-between">
            <FormLabel className="text-xs">Đơn thuốc</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-7 text-xs"
              onClick={() => append({ medication: '', dosage: '', instructions: '' })}
            >
              <Plus className="h-3 w-3 mr-1" />
              Thêm thuốc
            </Button>
          </div>

          <div
            ref={prescriptionContainerRef}
            className="space-y-2 max-h-40 overflow-y-auto pr-1 scroll-smooth"
          >
            {fields.map((field, index) => (
              <div key={field.id} className="border rounded-md p-2 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-xs">Thuốc #{index + 1}</h4>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {/* Medication Name */}
                  <FormField
                    control={form.control}
                    name={`prescriptions.${index}.medication`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Tên thuốc</FormLabel>
                        <FormControl>
                          <Input className="h-7 text-sm" placeholder="Tên thuốc" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Dosage */}
                  <FormField
                    control={form.control}
                    name={`prescriptions.${index}.dosage`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Liều lượng</FormLabel>
                        <FormControl>
                          <Input className="h-7 text-sm" placeholder="1 viên/ngày" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Instructions */}
                  <FormField
                    control={form.control}
                    name={`prescriptions.${index}.instructions`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Hướng dẫn</FormLabel>
                        <FormControl>
                          <Input className="h-7 text-sm" placeholder="Sau bữa ăn" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full h-8 text-sm">
          Lưu hồ sơ
        </Button>
      </form>
    </Form>
  )
}
