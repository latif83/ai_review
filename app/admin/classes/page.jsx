"use client"
import { useState } from "react";
import { NewClass } from "./newClass";

export default function Classes() {

    const [addClass,setAddClass] = useState(false)

    return (
        <div className="px-5 py-5">

            {addClass && <NewClass setAddClass={setAddClass} />}

            <div className="mb-5 flex justify-between items-center">
                <div className="
flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                    </svg>

                    <h1 className="text-gray-900 text-xl font-semibold">Classes</h1>
                </div>

                <div>
                    <button type="button" className="bg-white p-3 px-5 flex items-center gap-2 border rounded-lg border-2 hover:bg-black transition duration-500 hover:text-white hover:border-black" onClick={()=>setAddClass(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>

                        <span>New Class</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
                <div className="p-3 border rounded shadow-lg">
                    <h1 className="font-bold">Primary 1</h1>

                    <div className="mt-4">

                        <div className="border-b pb-2 flex justify-between">
                            <p className="text-sm font-medium">Sections</p>
                            <button type="button" className="hover:text-indigo-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>

                            </button>
                        </div>

                        <div className="flex gap-2 mt-2">
                            <span className="bg-indigo-700 text-white py-2 px-4 rounded-full">
                                A
                            </span>
                            <span className="bg-indigo-700 text-white py-2 px-4 rounded-full">
                                B
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}