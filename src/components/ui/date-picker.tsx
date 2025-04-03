"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { vi, enUS } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DatePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  className?: string
  placeholder?: string
  locale?: "vi" | "en"
  showMonthYearDropdowns?: boolean
  disabled?: (date: Date) => boolean
  minYear?: number
  maxYear?: number
}

export function DatePicker({
  date,
  setDate,
  className,
  placeholder = "Chọn ngày",
  locale = "vi",
  showMonthYearDropdowns = false,
  disabled,
  minYear = 1900,
  maxYear = new Date().getFullYear(),
}: DatePickerProps) {
  const [month, setMonth] = React.useState<number>(date ? date.getMonth() : new Date().getMonth())
  const [year, setYear] = React.useState<number>(date ? date.getFullYear() : new Date().getFullYear())

  const localeMap = {
    vi: vi,
    en: enUS,
  }

  const monthNames = React.useMemo(() => {
    const months = []
    for (let i = 0; i < 12; i++) {
      const date = new Date(2000, i, 1)
      months.push({
        value: i.toString(),
        label: format(date, "MMMM", { locale: localeMap[locale] }),
      })
    }
    return months
  }, [locale])

  const years = React.useMemo(() => {
    const years = []
    for (let i = minYear; i <= maxYear; i++) {
      years.push({
        value: i.toString(),
        label: i.toString(),
      })
    }
    return years
  }, [minYear, maxYear])

  const handleMonthChange = (value: string) => {
    setMonth(Number.parseInt(value))
  }

  const handleYearChange = (value: string) => {
    setYear(Number.parseInt(value))
  }

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      setMonth(selectedDate.getMonth())
      setYear(selectedDate.getFullYear())
    }
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP", { locale: localeMap[locale] }) : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {showMonthYearDropdowns && (
            <div className="flex justify-between p-3 space-x-2">
              <Select value={month.toString()} onValueChange={handleMonthChange}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Tháng" />
                </SelectTrigger>
                <SelectContent>
                  {monthNames.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={year.toString()} onValueChange={handleYearChange}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Năm" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year.value} value={year.value}>
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            disabled={disabled}
            month={new Date(year, month)}
            onMonthChange={(date) => {
              setMonth(date.getMonth())
              setYear(date.getFullYear())
            }}
            locale={localeMap[locale]}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

