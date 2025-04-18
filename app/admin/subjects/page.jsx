"use client"
import { useRouter } from "next/navigation"
import { NewSubject } from "./newSubject"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { EditSubject } from "./editSubject"
import { DelSubject } from "./deleteSubject"

export default function Subjects() {

    const router = useRouter()

    const [newSubject, setNewSubject] = useState(false)

    const [loading, setLoading] = useState(true)
    const [fetchData, setFetchData] = useState(true)
    const [subjects, setSubjects] = useState([])

    const [editSubject,setEditSubject] = useState(false)
    const [subjectInfo,setSubjectInfo] = useState({})

    const [delSubject,setDelSubject] = useState(false)
    const [subjectId,setSubjectId] = useState("")

    useEffect(() => {

        const getSubjects = async () => {
            try {
                setLoading(true)
                const res = await fetch(`/api/subjects`)
                const data = await res.json()
                if (!res.ok) {
                    toast.error(data.message)
                    return
                }
                setSubjects(data.subjects)
            }
            catch (e) {
                console.log(e)
                toast.error("Internal server error!")
            } finally {
                setLoading(false)
            }
        }

        if (fetchData) {
            getSubjects()
            setFetchData(false)
        }

    }, [fetchData])

    return (
        <div className="px-5 py-5">

            {newSubject && <NewSubject setNewSubject={setNewSubject} setFetchData={setFetchData} />}

            {editSubject && <EditSubject setEditSubject={setEditSubject} setFetchData={setFetchData} subjectInfo={subjectInfo} />}

            {delSubject && <DelSubject setDelSubject={setDelSubject} subjectId={subjectId} setFetchData={setFetchData} />}

            <div className="flex justify-between items-center mb-5">
                <div className="
flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>


                    <h1 className="text-gray-900 text-xl font-semibold">Subjects</h1>
                </div>

                <div>
                    <button onClick={() => setNewSubject(true)} type="button" className="bg-white p-3 px-5 flex items-center gap-2 border rounded-lg border-2 hover:bg-black transition duration-500 hover:text-white hover:border-black text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>

                        <span>New Subject</span>
                    </button>
                </div>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Subject Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Subject Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {loading ? [1, 2, 3, 4, 5, 6, 7, 8].map((n, index) => (<tr key={index} className="odd:bg-white even:bg-gray-50 border-b border-gray-200 animate-pulse">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                <span className="bg-gray-200 rounded-lg h-[30px] w-full block">

                                </span>
                            </th>
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
                        </tr>)) : subjects.length > 0 ? subjects.map((subject, index) => (<tr key={index} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {`${subject.subjectId}`}
                            </th>
                            <td className="px-6 py-4">
                                {subject.name}
                            </td>
                            <td className="px-6 py-4">
                                <button onClick={()=>{
                                    setSubjectInfo(subject);
                                    setEditSubject(true);
                                }} type="button" className="font-medium text-blue-600 hover:underline mr-2">Edit</button>
                                <button onClick={()=>{
                                    setSubjectId(subject.id);
                                    setDelSubject(true);
                                }} type="button" className="font-medium text-red-600 hover:underline">Delete</button>
                            </td>
                        </tr>)) : <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                            <td colSpan={3} className="px-6 py-4">
                                No Subjects Found!
                            </td>
                        </tr>}
                    </tbody>
                </table>
            </div>

        </div>
    )
}