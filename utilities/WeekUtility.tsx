import { WeightPerWeekJSONProps } from "./DatabaseManagement"

export function GetWeekNumbersFromMonth(month: string): number[] {
    const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
    const WEEKS_PER_MONTH = 4.35
    
    const monthIndex = MONTHS.findIndex(m => m.toLowerCase() === month.toLowerCase())
    const lastWeekNumber = Math.floor((monthIndex + 1) / WEEKS_PER_MONTH)
    return [lastWeekNumber-3, lastWeekNumber-2, lastWeekNumber-1, lastWeekNumber]
}

export function calculateLength(weightPerWeek: WeightPerWeekJSONProps[] | undefined) {
    if (weightPerWeek === undefined) return
    return Array.from(Object.keys(weightPerWeek)).map(week => Number(week) + 1)
}

export function getCurrentWeekNumber(d: Date) {
    const date = new Date(d.valueOf())
    const januaryFirst = new Date(date.getFullYear(), 0, 1)

    const days = Math.floor((date.getMilliseconds() - januaryFirst.getMilliseconds()) / (24 * 60 * 60 * 1000))

    const weekNumber = Math.ceil((date.getDay() + 1 + days) / 7)
    return weekNumber
}