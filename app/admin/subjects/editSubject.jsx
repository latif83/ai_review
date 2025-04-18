import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export const EditSubject = ({ setEditSubject, setFetchData,subjectInfo }) => {

    const [formData, setFormData] = useState({
        id : subjectInfo.id,
        subjectId: subjectInfo.subjectId,
        name: subjectInfo.name
    })

    const [loading, setLoading] = useState(false)

    const submitSubject = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch(`/api/subjects`, {
                method: 'PUT',
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
            setEditSubject(false)

        }
        catch (e) {
            console.log(e)
            toast.error("Internal Server Error!")
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed top-0 left-0 w-full h-svh bg-black/20 backdrop-blur-sm pt-10 z-40">
            <div className="max-w-lg transition duration-1000 bg-white h-full mx-auto rounded-t-xl p-3">
                <div className="flex justify-between items-center">
                    <h1 className="font-medium">
                        Edit Subject
                    </h1>
                    <button onClick={() => setEditSubject(false)} type="button" className="bg-red-200 text-black p-2 rounded-full hover:bg-red-800 hover:text-white transition duration-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                    </button>
                </div>

                <form onSubmit={submitSubject} className="mt-5 space-y-5">
                    <div>
                        <label htmlFor="subject_id" className="block mb-2 text-sm font-medium text-gray-900">Subject Id</label>
                        <input type="text" id="subject_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter subject id" required value={formData.subjectId} onChange={(e) => setFormData((prevData) => ({ ...prevData, subjectId: e.target.value }))} />
                    </div>
                    <div>
                        <label htmlFor="subject_name" className="block mb-2 text-sm font-medium text-gray-900">Subject Name</label>
                        <input type="text" id="subject_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter subject name" required value={formData.name} onChange={(e) => setFormData((prevData) => ({ ...prevData, name: e.target.value }))} />
                    </div>

                    <div className="col-span-2 mt-8">
                        <button
                            type="submit"
                            className="bg-indigo-600 disabled:bg-indigo-300 hover:bg-indigo-900 transition duration-500 text-white p-3 rounded-lg w-full flex items-center justify-center gap-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="w-5 h-5 animate-spin text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                                        ></path>
                                    </svg>
                                    Processing…
                                </>
                            ) : (
                                <span>Save Changes</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}