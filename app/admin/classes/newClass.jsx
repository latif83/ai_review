import { useState } from "react"
import { toast } from "react-toastify"

export const NewClass = ({ setAddClass, setFetchData }) => {

    const [formData, setFormData] = useState({
        className: "",
        subjectBasedComments: false
    })

    const [loading, setLoading] = useState(false)

    const submitClass = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch(`/api/classes`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                toast.error("Unexpected error while adding class, please try again later!")
                return
            }

            const responseData = await response.json()

            toast.success(responseData.message)
            setFetchData(true)
            setAddClass(false)

        } catch (e) {
            console.log(e)
            toast.error("Internal Server Error!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed top-0 left-0 w-full h-svh bg-black/20 backdrop-blur-sm pt-10 z-40">
            <div className="max-w-2xl transition duration-1000 bg-white mx-auto rounded-xl p-3 py-6">
                <div className="flex justify-between items-center">
                    <h1 className="font-medium">
                        New Class
                    </h1>
                    <button onClick={() => setAddClass(false)} type="button" className="bg-red-200 text-black p-2 rounded-full hover:bg-red-800 hover:text-white transition duration-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                    </button>
                </div>

                <form onSubmit={submitClass} className="mt-5">

                    <div>
                        <label htmlFor="studentId" className="block mb-2 text-sm font-medium text-gray-900">Class Name</label>
                        <input type="text" id="studentId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter a name for this class...." required value={formData.className} onChange={(e) => setFormData((prevData) => ({ ...prevData, className: e.target.value }))} />
                    </div>

                    <div className="mt-4">
                        <label className="inline-flex items-center gap-2">
                            <input
                                type="checkbox"
                                className="form-checkbox rounded"
                                checked={formData.subjectBasedComments}
                                onChange={(e) =>
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        subjectBasedComments: e.target.checked,
                                    }))
                                }
                            />
                            <span className="text-sm text-gray-700">Enable subject-based comments for this class</span>
                        </label>
                    </div>


                    <div className="flex justify-end mt-8">
                        <button
                            type="submit"
                            className="bg-indigo-600 disabled:bg-indigo-300 hover:bg-indigo-900 transition duration-500 text-white p-3 rounded-lg flex items-center justify-center gap-2"
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
                                <span>Add Class</span>
                            )}
                        </button>
                    </div>

                </form>

            </div>
        </div>
    )
}