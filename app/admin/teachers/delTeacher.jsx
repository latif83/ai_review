import { useState } from "react";
import { toast } from "react-toastify";

export const DelTeacher = ({ setDelTeacher,teacherId,setFetchData }) => {

    const [loading,setLoading] = useState(false)

    const delTeacher = async () => {
            try {
                setLoading(true)
              const response = await fetch("/api/teachers", {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ teacherId }),
              });
          
              const data = await response.json();
          
              if (response.ok) {
                toast.success("Teacher deleted successfully!");
                setFetchData(true)
                setDelTeacher(false)
              } else {
                toast.error("Error:", data.message);
              }
            } catch (error) {
              console.error("Request failed:", error);
            } finally{
                setLoading(false)
            }
          };

    return (
        <div className="fixed top-0 left-0 w-full h-svh bg-black/20 backdrop-blur-sm pt-10 z-40">
            <div className="max-w-xl transition duration-1000 bg-white mx-auto rounded-xl p-3">
                <div className="flex justify-between items-center">
                    <h1 className="font-medium">
                        Delete Teacher
                    </h1>
                    <button onClick={() => setDelTeacher(false)} type="button" className="bg-red-200 text-black p-2 rounded-full hover:bg-red-800 hover:text-white transition duration-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                    </button>
                </div>

                <div className="mt-5">
                    <p className="text-sm">
                        Are you sure you want to delete this teacher?
                    </p>

                    <div className="mt-5 flex justify-between">
                        <button onClick={()=>setDelTeacher(false)} className="p-2 bg-red-600 hover:bg-red-800 text-white transition duration-500 rounded-md" type="button">
                            Cancel
                        </button>
                        <button onClick={delTeacher} className="p-2 bg-green-600 hover:bg-green-800 text-white transition duration-500 rounded-md flex gap-1.5 items-center disabled:bg-green-300 disabled:text-black" type="button">
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
                                <span>Confirm</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}