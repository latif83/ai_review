"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function ViewClasses() {

    const [loading, setLoading] = useState(true)

    const [classes, setClasses] = useState()

    useEffect(() => {
        const getClasses = async () => {
            try {
                const response = await fetch(`/api/classes`)
                const responseData = await response.json()
                if (!response.ok) {
                    toast.error(responseData.message)
                    return
                }

                setClasses(responseData.classes)
            } catch (e) {
                console.log(e)
                toast.error("Internal server error!")
            } finally {
                setLoading(false)
            }
        }

        getClasses()
    }, [])

    return (
        <div className="px-5 py-5">
            <p className="text-sm">
                Please select a class to view students.
            </p>

            <div className="grid grid-cols-4 gap-4 mt-10">
                {loading ? [1, 2, 3, 4, 5, 6, 7, 8].map((num, index) => (<div key={index} className="animate-pulse p-2 border rounded-md"><p className="bg-gray-200 h-6 rounded"></p></div>)) : classes.length > 0 ? classes.map((clas, index) => (<Link href={`/admin/students/${clas.id}`} key={index} className="p-3 border rounded-md hover:bg-gray-100"><p className="text-center text-sm font-medium">{clas.className}</p></Link>)) : <div className="col-span-4 text-center"> <p>No Classes found.</p> </div>}
            </div>
        </div>
    )
}