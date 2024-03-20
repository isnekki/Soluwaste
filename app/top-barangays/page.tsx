"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'

import { LinearRegressionLine, PearsonsR } from "@/utilities/Computation";

import Container from "@/components/Layout/Container";
import { getRows } from '@/utilities/DatabaseManagement';
import type { RowsProps, WeightPerWeekJSONProps } from '@/utilities/DatabaseManagement';
import RegressionPlot from '@/utilities/RegressionPlot';
import { calculateLength } from '@/utilities/WeekUtility';

import Add from '../../assets/svgs/add.svg'
import Minus from '../../assets/svgs/minus.svg'

interface TopRowsProps extends RowsProps {
    weightReduction: number
}

export default function TopBarangays() {
    const [rows, setRows] = useState<RowsProps[]>([])
    const [topRows, setTopRows] = useState<TopRowsProps[]>([])
    const [monthlyWeights, setMonthlyWeights] = useState<{ barangay: string, monthlyRecords: { monthNumber: number, monthAverageWeight: number }[]}[]>([])
    const [month, setMonth] = useState<number>(new Date().getMonth())

    function getAverageWeightOfMonth(monthNumber: number, weightPerWeek: WeightPerWeekJSONProps[] | undefined): number {
        if (month <= 0) return 0 // Throw Error Toast
        if (weightPerWeek === undefined) return 0
        const weightForSelectedMonth = weightPerWeek.filter(week => new Date(week.date).getMonth() === monthNumber).map(weightObject => weightObject.weight)

        if (weightForSelectedMonth.length === 0) return 0

        const averageWeightForSelectedMonth = weightForSelectedMonth.reduce((previous, current) => previous + current) / weightForSelectedMonth.length
        return averageWeightForSelectedMonth
    }

    function getWeightReduction(weightPerWeek: WeightPerWeekJSONProps[]): number {
        const averageWeightThisMonth = getAverageWeightOfMonth(month, weightPerWeek)
        const averageWeightPreviousMonth = getAverageWeightOfMonth(month - 1, weightPerWeek)
        return (averageWeightThisMonth / averageWeightPreviousMonth) * 100
    }

    function getTopThreeBarangays(rows: RowsProps[]) {
        console.log(rows)
        const rowsWithWeightReduction = rows.map(row => {
            if (row.weightPerWeek === undefined) return { ...row, weightReduction: 0 }
            const weightReduction = getWeightReduction(row.weightPerWeek)
            return { ...row, weightReduction }
        }).sort((a, b) => (b.weightReduction - a.weightReduction))

        setTopRows([rowsWithWeightReduction[0], rowsWithWeightReduction[1], rowsWithWeightReduction[2]])
    }

    function increaseWeek() {
        if (month >= 11) return
        setMonth(month + 1)
    }

    function decreaseWeek() {
        if (month <= 0) return
        setMonth(month - 1)
    }

    useEffect(() => {
        (async () => {
            getRows({ weightPerWeek: true }).then(rows => setRows(rows)).catch(console.error)
        })();
    }, [])

    useEffect(() => {
        if (rows.length === 0) return

        getTopThreeBarangays(rows)
    }, [month, rows])

    useEffect(() => {
        const monthlyWeights = topRows.map(topRow => {
            const monthNumbers = [1,2,3,4,5,6,7,8,9,10,11,12]
            return {
                barangay: topRow.barangay,
                monthlyRecords: monthNumbers.map(monthNumber => ({ 
                    monthNumber, 
                    monthAverageWeight: getAverageWeightOfMonth(monthNumber, topRow.weightPerWeek) 
                })).sort((a, b) => a.monthNumber - b.monthNumber)
            }
        })

        setMonthlyWeights(monthlyWeights)
    }, [topRows])

    return (
        <Container>
            <div id="container" className="flex flex-row w-full h-[95%]">
                <div id="left-container" className="grow h-full w-3/6">
                    <div id="top-barangays-container" className="flex flex-col justify-center h-full p-4">
                        <h1 className="font-anton text-6xl my-4">TOP PERFORMING BARANGAYS</h1>
                        <div id="table-container">
                            <table className="bg-emerald-400 w-full">
                                <thead>
                                    <tr>
                                        <th className="bg-gray-600 text-white px-8 py-5">BARANGAY</th>
                                        <th className="bg-red-600 text-white px-8 py-5">WEIGHT REDUCTION (PERCENT)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        topRows.map(({ key, barangay, weightReduction }) => (
                                            <tr key={key}>
                                                <td className="bg-gray-200 px-8 py-5 border-b border-gray-400 text-center w-1/3">{barangay}</td>
                                                <td className="bg-white px-8 py-5 border-b border-gray-200 text-center w-2/3">{weightReduction.toFixed(2)}%</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div id="middle-container" className="h-full w-2/6">
                    {
                        topRows.map((row, i) => (
                            <div key={i} id="graph-container" className="w-full h-1/3">
                                <RegressionPlot 
                                    x={[1,2,3,4,5,6,7,8,9,10,11,12]} 
                                    y={monthlyWeights.find(record => record.barangay === row.barangay)?.monthlyRecords.map(weightRecord => weightRecord.monthAverageWeight) ?? []} 
                                    regressionLineY={LinearRegressionLine([1,2,3,4,5,6,7,8,9,10,11,12], monthlyWeights.find(record => record.barangay === row.barangay)?.monthlyRecords.map(weightRecord => weightRecord.monthAverageWeight) ?? [])} 
                                    xTitle='Month'
                                    yTitle='Weight'
                                    title={row.barangay}    
                                    showLegend={false}                        
                                />
                            </div>
                        ))
                    }
                </div>
                <div id="right-container" className="flex flex-col items-center justify-center h-full w-1/6 px-4">
                    <span className="flex justify-center border border-black rounded-full w-full py-4 my-4">INTERPRETATION</span>
                    <div className="flex flex-col items-center justify-center bg-yellow-500 rounded-2xl px-2 h-2/3 border border-black">
                        <p className="text-white text-center">
                            “comprehensive waste segregation act of 2023” of new lucban is the most effective in bringing down the residual waste production by 400.312%  
                        </p>
                        <a href="" className="bg-red-600 text-white rounded-full py-2 px-4 border border-black text-xs my-4">READ THE POLICY HERE</a>
                    </div>

                </div>
            </div>
            <div className="flex w-full h-[5%] px-4">
                <div id="week-selector" className="flex items-center justify-between bg-yellow-500 border border-black rounded-full py-2 w-1/6">
                    <button className="flex mr-4 mx-2 h-full" onClick={decreaseWeek}>
                        <div className="bg-white rounded-full p-2 flex items-center justify-center h-full w-full">
                            <Image 
                                src={Minus} 
                                alt={''}    
                                height={10}
                                width={10}                    
                            />
                        </div>
                    </button>
                    <span className="text-white">{new Date(new Date().getFullYear(), month, 1).toLocaleString('default', { year: 'numeric', month: 'long' })}</span>
                    <button className="flex ml-4 mx-2 h-full" onClick={increaseWeek}>
                        <div className="bg-white rounded-full p-2 flex items-center justify-center h-full w-full">
                            <Image 
                                src={Add} 
                                alt={''}    
                                height={10}
                                width={10}                    
                            />
                        </div>
                    </button>
                </div>
            </div>
        </Container>
    )
}