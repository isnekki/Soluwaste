"use client"
import { useEffect, useState } from "react";
import Image from 'next/image'

import Container from "@/components/Layout/Container";
import RegressionPlot from "@/utilities/RegressionPlot";
import { getRows } from "@/utilities/DatabaseManagement";
import type { RowsProps, WeightPerWeekJSONProps } from "../../utilities/DatabaseManagement";
import { LinearRegressionLine, PearsonsR } from "@/utilities/Computation";
import { calculateLength, getWeekNumber } from "@/utilities/WeekUtility";

import LogoIcon from '../../assets/svgs/logo_icon.svg'


export default function Summary() {
    const [rows, setRows] = useState<Readonly<RowsProps[]>>([])
    const [r, setR] = useState<number[]>([])
    const [regressionLine, setRegressionLine] = useState<number[]>([])

    useEffect(() => {
        (async () => {
            getRows({ weightPerWeek: true, levelOfEnforcement: true }).then(rows => {
                console.log(rows)
                setRows(rows)
            }).catch(console.error)
        })();
    }, [])

    useEffect(() => {
        if (rows.length === 0) return
        const weeklyMetrics = rows.map(row => {
            return { barangay: row.barangay, weightPerWeek: row.weightPerWeek || [], levelOfEnforcement: row.levelOfEnforcement }
        })

        const weeklyMetricsSegregatedByWeek = Array.from(Array(52).keys()).map(weekNumber => {
            return {
                weekNumber, 
                weekMetric: weeklyMetrics.map(metric => ({ weights: metric.weightPerWeek.filter(week => getWeekNumber(new Date(week.date)) - 1 === weekNumber), levelOfEnforcement: metric.levelOfEnforcement }))
            }   
        })

        const pearsonParameters = weeklyMetricsSegregatedByWeek.map(metric => metric.weekMetric.map(week => {
            if (week.weights.length <= 0) return
            return { levelsOfEnforcement: Array(week.weights.length).fill(week.levelOfEnforcement), weightsPerWeek: week.weights.map(entry => entry.weight) }
        })).map(parameter => parameter.filter(entry => entry !== undefined))

        const computedRs = pearsonParameters.map(week => {
            const levelsOfEnforcement: number[] = []
            const weightsPerWeek: number[] = []

            week.forEach(barangay => {
                levelsOfEnforcement.push(...barangay?.levelsOfEnforcement as number[])
                weightsPerWeek.push(...barangay?.weightsPerWeek as number[])
            })

            return PearsonsR(levelsOfEnforcement, weightsPerWeek) || 0
        })

        setR(computedRs)
        const lrl = LinearRegressionLine(Array.from({ length: computedRs.length }, (_, i) => i + 1), computedRs)
        setRegressionLine(lrl)
    }, [rows])

    return (
        <Container>
            <div id="logo-container" className="flex justify-end h-[5%] w-full">
                <Image 
                    src={LogoIcon} 
                    alt={"Logo Icon"}
                    width={50}               
                    height={50}
                />
            </div>
            <div id="top-container" className="flex flex-row bg-transparent h-[85%] p-4 rounded-xl justify-between items-center">
                <div id="barangay-summaries" className="flex flex-col overflow-y-scroll h-full w-1/3">
                    {
                        rows.map(row => {
                            if (row.weightPerWeek === undefined) return
                            return (
                                <div id={`${row.barangay}-container`} key={row.key} className="flex max-h-80 flex-col border border-blue-700 rounded-xl border-2 items-center py-4 mr-8 mb-4">
                                    <RegressionPlot 
                                        x={calculateLength(row.weightPerWeek) ?? []}
                                        y={row.weightPerWeek?.map(row => Number(row.weight))}
                                        regressionLineY={LinearRegressionLine(calculateLength(row.weightPerWeek) ?? [], row.weightPerWeek.map(row => Number(row.weight)))}
                                        title={row.barangay}
                                        showLegend={false}
                                        pointTitle="Weight per week"
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <div id="active-summary" className="h-full w-3/5 p-4 px-12 border border-black border-l-0 border-y-0 border-r-2">
                    {
                        <RegressionPlot 
                            x={Array.from({ length: r.length }, (_, i) => i + 1)}
                            y={r}
                            regressionLineY={regressionLine}
                            xTitle="Week"
                            yTitle="Pearson's R"
                            title={"Pearson's Comparison"}
                            showLegend={true}
                            pointTitle="Pearson's R"
                        />
                    }
                </div>
            </div>
            <div id="bottom-container" className="flex flex-row justify-between items-center h-[10%] p-4">
                <a href="/top-barangays" className="border border-2 border-black p-2 px-12 rounded-full ">
                    <span className="font-anton text-4xl">SEE: TOP PERFORMING BARANGAYS</span>
                </a>
                <span className="font-anton text-7xl">OVERALL SUMMARY</span>
            </div>
        </Container>
    )
}