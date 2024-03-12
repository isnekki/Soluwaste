"use server"
import * as fs from 'node:fs/promises'

interface RowInclusionsProps {
    dateModified?: boolean,
    population?: boolean,
    policy?: boolean,
    weightPerWeek?: boolean,
    all?: boolean
}

export interface WeightPerWeekJSONProps {
    weight: number,
    levelOfEnforcement: number
}

export interface RowsProps {
    key: number,
    dateModified?: number,
    barangay: string,
    population?: number,
    policy?: string,
    weightPerWeek?: WeightPerWeekJSONProps[],
}

export async function getRows(inclusions: RowInclusionsProps) {
    const db = await fs.readFile("./database/db.json", "utf8")
    const json = JSON.parse(db)
    const year = new Date().getFullYear().toString()

    const collection = json[year]

    const keysAndValues: [string, RowsProps][] = Object.entries(collection)
    const rows: RowsProps[] = keysAndValues.map(row => {
        if (inclusions.all) {
            const entireRow: RowsProps = {
                key: Number(row[0]),
                dateModified: row[1].dateModified,
                barangay: row[1].barangay,
                population: row[1].population,
                policy: row[1].policy,
                weightPerWeek: row[1].weightPerWeek
            }
            return entireRow
        }

        const defaultRow: RowsProps = {
            key: Number(row[0]),
            barangay: row[1].barangay
        }

        if (inclusions.dateModified) defaultRow.dateModified = row[1].dateModified
        if (inclusions.population) defaultRow.population = row[1].population
        if (inclusions.policy) defaultRow.policy = row[1].policy
        if (inclusions.weightPerWeek) defaultRow.weightPerWeek = row[1].weightPerWeek

        return defaultRow
    })

    return rows
}



