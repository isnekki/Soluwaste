"use client"
import { useState, useEffect } from "react"

import Container from "@/components/Layout/Container";
import { getRows } from "@/utilities/DatabaseManagement";
import type { RowsProps } from "@/utilities/DatabaseManagement";

export default function Input() {
    const [rows, setRows] = useState<RowsProps[]>([])

    useEffect(() => {
        (async() => {
            getRows({ weightPerWeek: true }).then(rows => setRows(rows)).catch(console.error)
        })();
    }, [])

    return (
        <Container>
            <div id="title-container" className="flex flex-col items-center justify-around h-full w-full">
                <span className="font-anton text-6xl">INPUT DATA</span>
                <div id="table-container" className="py-8 bg-white rounded-lg border border-gray-200 w-2/3">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="bg-gray-500 p-4 px-8 text-white">BARANGAY</th>
                                <th className="bg-red-500 p-4 px-8 text-white">WEIGHT (PER TON)</th>
                                <th className="bg-gray-500 p-4 px-8 text-white">LEVEL OF ENFORCEMENT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                rows.map(row => (
                                    <tr key={row.key}>
                                        <td className="bg-gray-200 border-gray-300 border-b-2 p-2">{row.barangay}</td>
                                        <td className="bg-red-100 border-red-200 border-b-2 p-2">
                                            <input type="number" className="w-full p-2 bg-red-100 focus:outline focus:outline-red-400 focus:outline-2 rounded-md text-center" />
                                        </td>
                                        <td className="bg-gray-200 border-gray-300 border-b-2 p-2">
                                            <input type="number" className="w-full p-2 bg-gray-200 focus:outline focus:outline-gray-400 focus:outline-2 rounded-md text-center" />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div id="analyze-container" className="flex w-full justify-center items-center">
                    <a href="/summary" className="bg-blue-500 p-4 w-1/2 text-center border border-black rounded-full text-white">
                        <button>ANALYZE</button>
                    </a>
                </div>
            </div>
        </Container>
    )
}