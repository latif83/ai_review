import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const SelectSubjectModal = ({ setSelectSubject, classId }) => {
    const [selectedSubject, setSelectedSubject] = useState('');


    const [subjectsLoading, setSubjectsLoading] = useState(true)
    const [subjects, setSubjects] = useState([])

    useEffect(() => {
        const getSubjects = async () => {
            try {
                setSubjectsLoading(true)
                const res = await fetch(`/api/subjects`)
                const data = await res.json()
                if (!res.ok) {
                    toast.error(data.message)
                    return
                }

                setSubjects(data.subjects)
            } catch (e) {
                console.log(e)
            } finally {
                setSubjectsLoading(false)
            }
        }
        getSubjects()
    }, [])

    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const coninueToComments = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            if (!selectedSubject) {
                toast.error("Please select a subject")
                return
            }

            router.push(`/admin/comments/extractComments/${classId}/${selectedSubject}`)

        } catch (e) {
            console.log(e)
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className="fixed top-0 left-0 w-full h-svh bg-black/20 backdrop-blur-sm pt-10 z-40">
            <div className="max-w-xl overflow-auto transition duration-1000 bg-white mx-auto rounded-md p-3 py-8">
                <form onSubmit={coninueToComments}>
                    <div className="mb-4">
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                            Please select a subject to continue:
                        </label>
                        <select
                            id="subject"
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            required
                        >
                            <option value="" disabled>
                                -- Select a Subject --
                            </option>
                            {subjectsLoading ? (
                                <option value="" disabled>
                                    Loading subjects...
                                </option>
                            ) : (
                                subjects.map((subject) => (
                                    <option key={subject.id} value={subject.id}>
                                        {subject.name}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>
                    <div className="flex justify-between mt-5">
                        <button
                            onClick={() => setSelectSubject(false)}
                            type="button"
                            className="px-4 py-2 bg-gray-500 text-sm text-white rounded-md hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2 disabled:bg-blue-300"
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
                                <>
                                    <span>Continue</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                </>

                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

