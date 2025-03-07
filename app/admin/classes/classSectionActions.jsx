import { useState } from "react"
import { AssignTeacher } from "./assignTeacher"

export const ClassSectionActions = ({ setSectionActions, sectionData }) => {

    const [assignTeacher, setAssignTeacher] = useState(false)

    return (
        <div className="fixed top-0 left-0 w-full h-svh bg-black/20 backdrop-blur-sm pt-10 z-40">
            {assignTeacher && <AssignTeacher setAssignTeacher={setAssignTeacher} sectionData={sectionData} />}

            <div className="max-w-2xl transition duration-1000 bg-white mx-auto rounded-xl p-3 py-6">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="font-bold text-red-600 text-xs">{`${sectionData.className} (${sectionData.sectionName})`}</span>
                        <h1 className="font-medium text-sm">
                            Class Section
                        </h1>
                    </div>
                    <button onClick={() => setSectionActions(false)} type="button" className="bg-red-200 text-black p-2 rounded-full hover:bg-red-800 hover:text-white transition duration-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                    </button>
                </div>


                <div className="mt-5">

                    <div className="border-b pb-1.5 border-red-300">
                        <p className="text-sm font-semibold">
                            Actions
                        </p>
                    </div>

                    <div className="mt-2 flex gap-2">
                        <button type="button" className="p-2 rounded-lg flex items-center justify-center gap-2 text-xs bg-indigo-600 hover:bg-indigo-800 transition duration-500 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>

                            <span>
                                Edit Section Name
                            </span>
                        </button>

                        <button type="button" className="p-2 rounded-lg flex items-center justify-center gap-2 text-xs bg-red-600 hover:bg-red-800 transition duration-500 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                            </svg>


                            <span>
                                Remove Section
                            </span>
                        </button>
                    </div>

                    <div className="border-b pb-1.5 border-lime-300 mt-5">
                        <p className="text-sm font-semibold">
                            Assigned Teacher
                        </p>
                    </div>

                    <div className="p-3 flex items-center justify-center flex-col gap-2">
                        <p className="text-xs text-center font-medium">
                            No Teacher Assigned!
                        </p>

                        <button onClick={() => setAssignTeacher(true)} type="button" className="p-2 rounded-lg flex items-center justify-center gap-2 text-xs bg-lime-600 hover:bg-lime-800 transition duration-500 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>


                            <span>
                                Assign a New Teacher
                            </span>
                        </button>

                    </div>

                </div>

            </div>
        </div>
    )
}