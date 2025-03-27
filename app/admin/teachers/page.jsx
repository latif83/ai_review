"use client"
import { useEffect, useState } from "react";
import { NewTeacher } from "./newTeacher";
import { EditTeacher } from "./editTeacher";
import { DelTeacher } from "./delTeacher";
// import { NewStudent } from "./newStudent";

export default function Teachers() {

    const [addTeacher, setAddTeacher] = useState(false)

    const [teachers, setTeachers] = useState([])
    const [loadingTeachers, setLoadingTeachers] = useState(false)

    const [fetchData, setFetchData] = useState(true)

    useEffect(() => {
        const fetchTeachersData = async () => {
            try {
                setLoadingTeachers(true)
                const response = await fetch(`/api/teachers`)
                if (!response.ok) {
                    return
                }

                const responseData = await response.json()

                setTeachers(responseData.teachers)
            }
            catch (e) {
                console.log(e)
            }
            finally {
                setLoadingTeachers(false)
            }
        }

        if (fetchData) {
            fetchTeachersData()
            setFetchData(false)
        }
    }, [fetchData])

    const [editTeacher, setEditTeacher] = useState(false)

    const [teacherData, setTeacherData] = useState()

    const [delTeacher, setDelTeacher] = useState(false)
    const [teacherId, setTeacherId] = useState()

    return (
        <div className="px-5 py-5">

            {addTeacher && <NewTeacher setAddTeacher={setAddTeacher} setFetchData={setFetchData} />}

            {editTeacher && <EditTeacher setEditTeacher={setEditTeacher} teacherData={teacherData} setFetchData={setFetchData} />}

            {delTeacher && <DelTeacher setDelTeacher={setDelTeacher} teacherId={teacherId} setFetchData={setFetchData} />}

            <div className="mb-5 flex justify-between items-center">
                <div className="
flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                    </svg>

                    <h1 className="text-gray-900 text-xl font-semibold">Teachers</h1>
                </div>

                <div>
                    <button onClick={() => setAddTeacher(true)} type="button" className="bg-white p-3 px-5 flex items-center gap-2 border rounded-lg border-2 hover:bg-black transition duration-500 hover:text-white hover:border-black">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>

                        <span>New Teacher</span>
                    </button>
                </div>
            </div>


            <div className="mb-2 w-1/2">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for teachers..." required />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
                </div>
            </div>


            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Teacher
                            </th>
                            <th scope="col" className="px-6 py-3">
                                email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Classes Assigned
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>



                        {loadingTeachers ? [1, 2, 3, 4, 5, 6, 7, 8].map((n, index) => (
                            <tr key={index} className="odd:bg-white even:bg-gray-50 border-b border-gray-200 animate-pulse">
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
                            </tr>)) : teachers.length > 0 ? teachers.map((teacher, index) => (<tr key={index} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {`${teacher.firstName} ${teacher.lastName}`}
                                </th>
                                <td className="px-6 py-4">
                                    {teacher.email}
                                </td>
                                <td className="px-6 py-4">
                                    4
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => {
                                        setTeacherData(teacher)
                                        setEditTeacher(true)
                                    }} type="button" className="font-medium text-blue-600 hover:underline mr-2">Edit</button>
                                    <button type="button" onClick={() => {
                                        setTeacherId(teacher.id)
                                        setDelTeacher(true)
                                    }} className="font-medium text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>)) : <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                            <td colSpan={4} className="px-6 py-4">
                                No Teachers Found!
                            </td>
                        </tr>}
                    </tbody>
                </table>
            </div>

        </div>
    )
}