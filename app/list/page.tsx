"use client"
import { useEffect, useState } from "react";
import Image from "next/image"
import Modal from 'react-modal'

import Container from "@/components/Layout/Container";

import { getRows } from "@/utilities/DatabaseManagement";
import type { RowsProps } from "@/utilities/DatabaseManagement";

import Logo from '../../assets/images/logo.png'

export default function List() {
    const [rows, setRows] = useState<RowsProps[]>([])
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

    useEffect(() => {
        getRows({ dateModified: true, population: true, policy: true }).then(rows => setRows(rows)).catch(console.error)
    }, [])

    function openModal() {
        setModalIsOpen(true)
    }

    function closeModal() {
        setModalIsOpen(false)
    }

    return (
        <Container>
            <Modal
                isOpen={modalIsOpen}
                contentLabel="Add Entry Modal"
                style={{
                    content: {
                        backgroundColor: "red"
                    },
                    overlay: {
                        backgroundColor: "green"
                    }
                }}
            >
                <button onClick={closeModal}>close modal</button>
                <span>Hello world!</span>
            </Modal>
            <div id="container" className="h-full">
                <div id="logo-container" className="h-[20%]">
                    <Image 
                        src={Logo}
                        alt="Soluwaste Logo"
                        width={407}
                        height={123}
                    />
                </div>
                <div className=" border border-gray-200 flex flex-col py-8 h-[65%] rounded-lg">

                    <div id="table-container" className="max-h-full bg-white w-full overflow-y-scroll">
                        <table className="w-full">
                            <thead className="sticky top-0 border-y border-gray-200">
                                <tr>
                                    <th className="font-sans text-left bg-gray-200 px-8 py-5 text-gray-600">DATE MODIFIED</th>
                                    <th className="font-sans text-left bg-gray-300 px-8 py-5 text-gray-600">BARANGAY</th>
                                    <th className="font-sans text-left bg-red-400 px-8 py-5 text-gray-600">POPULATION</th>
                                    <th className="font-sans text-left bg-yellow-200 px-8 py-5 text-gray-600">POLICY</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    rows.map(({ key, dateModified, barangay, population, policy }) => (
                                        <tr key={key} className="border-t-transparent hover:opacity-75 transition duration-100 ease-out hover:ease-in">
                                            <td className="text-left bg-gray-100 w-2/12 px-8 py-5 border-b border-gray-200">{dateModified}</td>
                                            <td className="text-left bg-gray-200 w-4/12 px-8 py-5 border-b border-gray-300">{barangay}</td>
                                            <td className="text-left bg-red-200 w-1/12 px-8 py-5 border-b border-red-300">{population}</td>
                                            <td className="text-left bg-yellow-100 w-4/12 px-8 py-5 border-b border-yellow-200">{policy}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                
                </div>
                <div className="h-[15%] flex items-center justify-center">
                    <a href="/input" className="text-center bg-blue-500 w-2/3 rounded-full py-4 text-white border border-black">INPUT DATA</a>
                </div>
            </div>
        </Container>
    )
}