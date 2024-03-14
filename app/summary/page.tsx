"use client"
import { useEffect, useState } from "react";
import Image from 'next/image'

import Container from "@/components/Layout/Container";
import RegressionPlot from "@/utilities/RegressionPlot";
import { getRows } from "@/utilities/DatabaseManagement";
import type { RowsProps, WeightPerWeekJSONProps } from "../../utilities/DatabaseManagement";
import { LinearRegressionLine, PearsonsR } from "@/utilities/Computation";
import { calculateLength } from "@/utilities/WeekUtility";

import LogoIcon from '../../assets/svgs/logo_icon.svg'


export default function Summary() {
    const [rows, setRows] = useState<Readonly<RowsProps[]>>([])
    const [r, setR] = useState<number[]>([])

    useEffect(() => {
        (async () => {
            getRows({ weightPerWeek: true }).then(rows => {
                setRows(rows)
            }).catch(console.error)
        })();
    }, [])

    useEffect(() => {
        if (rows.length === 0) return
        const weeklyMetrics = rows.map(row => {
            if (row.weightPerWeek === undefined) return
            return row.weightPerWeek
        })     

        const filteredWeeklyMetrics = weeklyMetrics.filter(metric => metric !== undefined) as WeightPerWeekJSONProps[][]

        const minimumWeekCount = filteredWeeklyMetrics.reduce((previous, next) => previous.length > next.length ? next : previous).length

        // const weeklyObjects = Array.from(Array(minimumWeekCount).keys()).map(weekNumber => weeklyMetrics.map(barangay => barangay[weekNumber]))

        
        // const computedRs = weeklyObjects.map(barangayWeek => PearsonsR(, barangayWeek.map(bw => bw.weight)))        
        // setR(computedRs)
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
                        rows.map(row => (
                            <div id={`${row.barangay}-container`} key={row.key} className="flex max-h-80 flex-col border border-blue-700 rounded-xl border-2 items-center py-4 mr-8 mb-4">
                                {/* <RegressionPlot 
                                    x={calculateLength(row.weightPerWeek) ?? []}
                                    y={row.weightPerWeek?.map(row => Number(row.weight)) ?? []}
                                    regressionLineY={LinearRegressionLine(calculateLength(row.weightPerWeek) ?? [], row.weightPerWeek?.map(row => Number(row.weight)) ?? [])}
                                    title={row.barangay}
                                    showLegend={false}
                                    pointTitle="Weight per week"
                                /> */}
                            </div>
                        ))
                    }
                </div>
                <div id="active-summary" className="h-full w-3/5 p-4 px-12 border border-black border-l-0 border-y-0 border-r-2">
                    {
                        // <RegressionPlot 
                        //     x={[1,2,3,4,5,6,7,8,9,10]}
                        //     y={r}
                        //     xTitle="Week"
                        //     yTitle="Pearson's R"
                        //     title={"Pearson's Comparison"}
                        //     showLegend={true}
                        //     pointTitle="Pearson's R"
                        // />
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