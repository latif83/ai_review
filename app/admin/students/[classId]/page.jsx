"use client"
import { use, useEffect, useState } from "react";
import { NewStudent } from "./newStudent";
import { EditStudent } from "./editStudent";
import { toast } from "react-toastify";
import { DelStudent } from "./delStudent";
import { useRouter } from "next/navigation";

export default function Students({ params }) {

    const { classId } = use(params)

    const [addStudent, setAddStudent] = useState(false)
    const [editStudent, setEditStudent] = useState(false)

    const [studentData, setStudentData] = useState()

    const [students, setStudents] = useState([])
    const [loadingStudents, setLoadingStudents] = useState(false)

    const [fetchData, setFetchData] = useState(true)
    const [className, setClassName] = useState("")
    const router = useRouter()

    useEffect(() => {
        const fetchStudentsData = async () => {
            try {
                setLoadingStudents(true)
                const response = await fetch(`/api/students/data/${classId}`)
                if (!response.ok) {
                    return
                }

                const responseData = await response.json()

                setStudents(responseData.students)
                setClassName(responseData.classData.className)
            }
            catch (e) {
                console.log(e)
            }
            finally {
                setLoadingStudents(false)
            }
        }

        if (fetchData) {
            fetchStudentsData()
            setFetchData(false)
        }
    }, [fetchData])

    const [studentId, setStudentId] = useState()


    const [delStudent, setDelStudent] = useState(false)


    return (
        <div className="px-5 py-5">

            {addStudent && <NewStudent setAddStudent={setAddStudent} setFetchData={setFetchData} classId={classId} />}

            {editStudent && <EditStudent setEditStudent={setEditStudent} setFetchData={setFetchData} studentData={studentData} />}

            {delStudent && <DelStudent setDelStudent={setDelStudent} studentId={studentId} setFetchData={setFetchData} />}

            <div className="">
                <button type="button" onClick={() => router.back()} className="flex items-center justify-center gap-1.5 bg-red-300 hover:bg-red-600 hover:text-white transition duration-500 text-xs p-2 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>

                    <span>
                        Back
                    </span>
                </button>
            </div>

            <div className="flex justify-between items-center mb-5">
                <div className="
flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>

                    <h1 className="text-gray-900 text-xl font-semibold">{className}</h1>
                </div>

                <div>
                    <button onClick={() => setAddStudent(true)} type="button" className="bg-white p-3 px-5 flex items-center gap-2 border rounded-lg border-2 hover:bg-black transition duration-500 hover:text-white hover:border-black text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>

                        <span>New Student</span>
                    </button>
                </div>
            </div>




            {/* <div className="mb-2 w-1/2">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for students..." required />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
                </div>
            </div> */}


            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Student
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Student Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                className
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loadingStudents ? [1, 2, 3, 4, 5, 6, 7, 8].map((n, index) => (<tr key={index} className="odd:bg-white even:bg-gray-50 border-b border-gray-200 animate-pulse">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                <span className="bg-gray-200 rounded-lg h-[30px] w-full block">

                                </span>
                            </th>
                            <td className="px-6 py-4">
                                <span className="bg-gray-200 rounded-lg h-[30px] w-full block">

                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="bg-gray-200 rounded-lg h-[30px] w-full block">

                                </span>
                            </td>
                            <td className="px-6 py-4 flex items-center gap-2">
                                <span className="bg-gray-200 rounded-lg h-[30px] w-1/2 block">

                                </span>
                                <span className="bg-gray-200 rounded-lg h-[30px] w-1/2 block">

                                </span>
                            </td>
                        </tr>)) : students.length > 0 ? students.map((student, index) => (<tr key={index} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {`${student.fName} ${student.lName}`}
                            </th>
                            <td className="px-6 py-4">
                                {student.studentId}
                            </td>
                            <td className="px-6 py-4">
                                {`${student.class.className}`}
                            </td>
                            <td className="px-6 py-4">
                                <button type="button" onClick={() => {
                                    setEditStudent(true)
                                    setStudentData(student)
                                }} className="font-medium text-blue-600 hover:underline mr-2">Edit</button>
                                <button onClick={() => {
                                    setStudentId(student.id);
                                    setDelStudent(true)
                                }} type="button" className="font-medium text-red-600 hover:underline">Delete</button>
                            </td>
                        </tr>)) : <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                            <td colSpan={4} className="px-6 py-4">
                                No Students Found!
                            </td>
                        </tr>}
                    </tbody>
                </table>
            </div>

        </div>
    )
}