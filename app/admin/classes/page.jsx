"use client"
import { useEffect, useState } from "react";
import { NewClass } from "./newClass";
import { toast } from "react-toastify";
import { NewClassSection } from "./newClassSection";
import { ClassSectionActions } from "./classSectionActions";
import { ViewAssignment } from "./viewAssignment";
import { EditClass } from "./editClass";
import { DelClass } from "./delClass";

export default function Classes() {

    const [addClass, setAddClass] = useState(false)
    const [addClassSection, setAddClassSection] = useState(false)
    const [classData, setClassData] = useState()

    const [classes, setClasses] = useState([])

    const [classesLoading, setClassesLoading] = useState(true)

    const [sectionActions, setSectionActions] = useState(false)
    const [sectionData, setSectionData] = useState()

    const [fetchData, setFetchData] = useState(true)

    const [viewAssignment, setViewAssignment] = useState(false)

    useEffect(() => {

        const getClasses = async () => {
            setClassesLoading(true)
            try {

                const response = await fetch(`/api/classes/classandsections`)

                if (!response.ok) {
                    toast.error("Unexpected error happened, please try again later!")
                    return
                }

                const responseData = await response.json()

                setClasses(responseData.classes)

            } catch (e) {
                console.log(e)
                toast.error("Internal server error!")
            } finally {
                setClassesLoading(false)
            }
        }

        if (fetchData) {
            getClasses()
            setFetchData(false)
        }

    }, [fetchData])

    const [editClass, setEditClass] = useState(false)
    const [classInfo, setClassInfo] = useState({})

    const [delClass, setDelClass] = useState(false)
    const [classId, setClassId] = useState()

    return (
        <div className="px-5 py-5">

            {addClass && <NewClass setAddClass={setAddClass} setFetchData={setFetchData} />}
            {addClassSection && <NewClassSection setAddClassSection={setAddClassSection} classData={classData} setFetchData={setFetchData} />}

            {sectionActions && <ClassSectionActions setSectionActions={setSectionActions} sectionData={sectionData} />}

            {viewAssignment && <ViewAssignment setViewAssignment={setViewAssignment} classData={classData} />}

            {editClass && <EditClass setEditClass={setEditClass} setFetchData={setFetchData} classInfo={classInfo} />}

            {delClass && <DelClass setDelClass={setDelClass} classId={classId} setFetchData={setFetchData} />}

            <div className="mb-5 flex justify-between items-center">
                <div className="
flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                    </svg>

                    <h1 className="text-gray-900 text-xl font-semibold">Classes</h1>
                </div>

                <div>
                    <button type="button" className="bg-white p-3 px-5 flex items-center gap-2 border rounded-lg border-2 hover:bg-black transition duration-500 hover:text-white hover:border-black" onClick={() => setAddClass(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>

                        <span>New Class</span>
                    </button>
                </div>
            </div>

            <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-4">

                {classesLoading ? [1, 2, 3, 4, 5, 6, 7, 8].map((num, index) => (<div key={index} className="p-3 border rounded shadow-lg animate-pulse">
                    <h1 className="font-bold h-5 w-32 bg-gray-200 animate-pulse rounded-md"></h1>

                    <div className="mt-4 flex items-center gap-2">

                        <button type="button" className="p-2 rounded-md bg-blue-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>

                        </button>

                        <button type="button" className="p-2 rounded-md bg-red-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>


                        </button>

                        <button type="button" className="p-2 rounded-md bg-lime-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                            </svg>



                        </button>


                    </div>
                </div>)) : classes.map((clas, index) => (
                    <div key={index} className="p-3 border rounded shadow-lg">
                        <h1 className="font-bold">{clas.className}</h1>

                        <div className="mt-4 flex items-center gap-2">

                            {/* Edit button */}
                            <button onClick={() => {
                                setClassInfo(clas)
                                setEditClass(true)
                            }} type="button" className="p-2 rounded-md bg-blue-200 hover:bg-blue-600 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>

                            </button>

                            {/* Delete button */}
                            <button onClick={()=>{
                                setClassId(clas.id)
                                setDelClass(true)
                            }} type="button" className="p-2 rounded-md bg-red-200 hover:bg-red-600 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>


                            </button>

                            {/* Assign Teachers Button */}
                            <button type="button" onClick={() => {
                                setViewAssignment(true); setClassData({
                                    className: clas.className,
                                    classId: clas.id
                                });
                            }} className="p-2 rounded-md bg-lime-200 hover:bg-lime-600 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                                </svg>



                            </button>

                        </div>
                    </div>))}


            </div>
        </div>
    )
}