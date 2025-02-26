import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export const NewStudent = ({ setAddStudent, setFetchData }) => {

    const [formData, setFormData] = useState({
        fName: "",
        lName: "",
        studentId: "",
        classId: "",
        classSectionsId: ""
    })

    const [loading, setLoading] = useState(false)

    const [classes, setClasses] = useState([])
    const [classesLoading, setClassesLoading] = useState(false)

    const [classSections, setClassSections] = useState([])
    const [classSectionsLoading, setClassSectionsLoading] = useState(false)

    const [filteredClassSections, setFilteredClassSections] = useState([])

    useEffect(() => {
        const getClasses = async () => {
            setClassesLoading(true)
            try {
                const response = await fetch(`/api/classes`)

                if (!response.ok) {
                    // Error here
                    return
                }

                const responseData = await response.json()

                setClasses(responseData.classes)



            } catch (e) {
                console.log(e)
            } finally {
                setClassesLoading(false)
            }
        }

        const getClassSections = async () => {
            setClassSectionsLoading(true)
            try {
                const response = await fetch(`/api/classes/sections`)

                if (!response.ok) {
                    // Error here
                    return
                }

                const responseData = await response.json()

                setClassSections(responseData.classSections)



            } catch (e) {
                console.log(e)
            } finally {
                setClassSectionsLoading(false)
            }
        }

        getClasses()
        getClassSections()
    }, [])

    const submitStudentData = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch(`/api/students`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                toast.error(responseData.message)
                return
            }

            const responseData = await response.json()

            // success here

            toast.success(responseData.message)
            setFetchData(true)
            setAddStudent(false)

        }
        catch (e) {
            console.log(e)
            toast.error("Internal Server Error!")
        }
        finally {
            setLoading(false)
        }
    }

    const handleClassSectionsFilter = () => {
        setFilteredClassSections(classSections.filter((section) => (section.classId == formData.classId)))
    }

    useEffect(() => {
        formData.classId && handleClassSectionsFilter()
    }, [formData])

    return (
        <div className="fixed top-0 left-0 w-full h-svh bg-black/20 backdrop-blur-sm pt-10 z-40">
            <div className="max-w-4xl transition duration-1000 bg-white h-full mx-auto rounded-t-xl p-3">
                <div className="flex justify-between items-center">
                    <h1 className="font-medium">
                        New Student
                    </h1>
                    <button onClick={() => setAddStudent(false)} type="button" className="bg-red-200 text-black p-2 rounded-full hover:bg-red-800 hover:text-white transition duration-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                    </button>
                </div>

                <form onSubmit={submitStudentData} className="mt-5 grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="studentId" className="block mb-2 text-sm font-medium text-gray-900">Student Id</label>
                        <input type="text" id="studentId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Please enter matching student Id from existing system" required value={formData.studentId} onChange={(e) => setFormData((prevData) => ({ ...prevData, studentId: e.target.value }))} />
                    </div>
                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                        <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="New student first name" required value={formData.fName} onChange={(e) => setFormData((prevData) => ({ ...prevData, fName: e.target.value }))} />
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                        <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="New student last name" required value={formData.lName} onChange={(e) => setFormData((prevData) => ({ ...prevData, lName: e.target.value }))} />
                    </div>

                    <div className="col-span-2 mt-5">
                        <h1 className="text-sm font-bold text-gray-600">Assign to className</h1>
                        <div className="grid grid-cols-2 gap-4 mt-5">
                            <div>
                                <label htmlFor="className" className="block mb-2 text-sm font-medium text-gray-900">Select a class for student</label>
                                <select id="className" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={formData.classId} onChange={(e) => setFormData((prevData) => ({ ...prevData, classId: e.target.value }))}>
                                    <option>Choose a className</option>
                                    {classes.map((clas, index) => (<option key={index} value={clas.id}>{clas.className}</option>))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="classSection" className="block mb-2 text-sm font-medium text-gray-900">Select a className Session</label>
                                <select id="classSection" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={formData.classSectionsId} onChange={(e) => setFormData((prevData) => ({ ...prevData, classSectionsId: e.target.value }))}>
                                    <option>Choose a class section</option>
                                    {filteredClassSections.length > 0 ? filteredClassSections.map((section,index) => (<option key={index} value={section.id}>{section.sectionName}</option>)) : <option>Select a class to fetch sections</option>}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2 mt-8">
                        <button type="submit" className="bg-indigo-600 hover:bg-indigo-900 transition duration-500 text-white p-3 rounded-lg w-full block">
                            <span>Add Student</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}