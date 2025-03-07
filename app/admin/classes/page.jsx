"use client"
import { useEffect, useState } from "react";
import { NewClass } from "./newClass";
import { toast } from "react-toastify";
import { NewClassSection } from "./newClassSection";
import { ClassSectionActions } from "./classSectionActions";

export default function Classes() {

    const [addClass, setAddClass] = useState(false)
    const [addClassSection,setAddClassSection] = useState(false)
    const [classData,setClassData] = useState()

    const [classes, setClasses] = useState([])

    const [classesLoading, setClassesLoading] = useState(false)

    const [sectionActions,setSectionActions] = useState(false)
    const [sectionData,setSectionData] = useState()

    const [fetchData,setFetchData] = useState(true)

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

        if(fetchData){
        getClasses()
        setFetchData(false)
        }

    }, [fetchData])

    return (
        <div className="px-5 py-5">

            {addClass && <NewClass setAddClass={setAddClass} setFetchData={setFetchData} />}
            {addClassSection && <NewClassSection setAddClassSection={setAddClassSection} classData={classData} setFetchData={setFetchData} />}

            {sectionActions && <ClassSectionActions setSectionActions={setSectionActions} sectionData={sectionData} />}

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

            <div className="grid grid-cols-4 gap-4">

                {classes.map((clas,index) => (<div key={index} className="p-3 border rounded shadow-lg">
                    <h1 className="font-bold">{clas.className}</h1>

                    <div className="mt-4">

                        <div className="border-b pb-2 flex justify-between">
                            <p className="text-sm font-medium">Sections</p>
                            <button onClick={()=>{
                                setAddClassSection(true)
                                setClassData({
                                    className : clas.className,
                                    classId : clas.id
                                })
                            }} type="button" className="hover:text-indigo-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>

                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-2 text-sm">
                            {clas.ClassSections.length > 0 ? clas.ClassSections.map((section,index)=>(<span key={index} onClick={()=>{setSectionActions(true); setSectionData({
                                classId : clas.id,
                                className : clas.className,
                                sectionId : section.id,
                                sectionName : section.sectionName
                            })}} className="bg-indigo-700 text-white p-2 px-3.5 rounded-full cursor-pointer hover:bg-red-700 transition duration-500">
                                {section.sectionName}
                            </span>)) : <span className="text-red-600">No Sections Added!</span>}
                        </div>
                    </div>
                </div>))}


            </div>
        </div>
    )
}