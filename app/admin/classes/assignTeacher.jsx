"use client"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AssignTeacher = ({ setAssignTeacher, sectionData }) => {
    const [search, setSearch] = useState("");

    const [loadingTeachers, setLoadingTeachers] = useState(false)
    const [teachers, setTeachers] = useState([])
    const [teacherId, setTeacherId] = useState()
    const [loading, setLoading] = useState(false)

    // Filter teachers based on search input
    //  const filteredTeachers = teachers.filter((teacher) =>
    //     teacher.name.toLowerCase().includes(search.toLowerCase())
    // );

    const AssignTeacher = async (teacherId) => {
        try {
            setLoading(true)
            const response = await fetch(`/api/classes/assignTeacher`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ teacherId, sectionId: sectionData.sectionId }),
            });
            const responseData = await response.json();

            if (!response.ok) {
                toast.error(responseData.message)
                return
            }

            setAssignTeacher(false)
            toast.success(responseData.message)

        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

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

        fetchTeachersData()
    }, [])

    return (
        <div className="fixed top-0 left-0 w-full h-svh bg-black/20 backdrop-blur-sm pt-10 z-40">
            <div className="max-w-2xl transition duration-500 bg-white mx-auto rounded-t-xl p-5 py-6 w-full md:w-1/2 h-full overflow-y-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <span className="font-bold text-red-600 text-xs">{`${sectionData.className} (${sectionData.sectionName})`}</span>
                        <h1 className="font-medium text-sm">Assign Teacher</h1>
                    </div>
                    <button
                        type="button"
                        onClick={() => { setAssignTeacher(false) }}
                        className="bg-red-200 text-black p-2 rounded-full hover:bg-red-800 hover:text-white transition duration-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search for a teacher..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />

                {/* Teacher List */}
                <ul className="space-y-2">
                    {teachers.length > 0 ? (
                        teachers.map((teacher, index) => (
                            <li
                                key={index}
                                className="p-3 bg-gray-100 rounded-lg flex justify-between items-center hover:bg-indigo-100 cursor-pointer"
                            >
                                <span className="text-sm font-medium">{`${teacher.firstName} ${teacher.lastName}`}</span>
                                <button onClick={() => {
                                    AssignTeacher(teacher.id)
                                }} type="button" className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-800 transition">
                                    Assign
                                </button>
                            </li>
                        ))
                    ) : (
                        <li className="text-center text-gray-500">No teachers found</li>
                    )}
                </ul>
            </div>
        </div>
    );
};
