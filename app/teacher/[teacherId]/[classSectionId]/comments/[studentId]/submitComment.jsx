import { useState } from "react"

export const SubmitComment = ({ generatedComment, setSubmitComment }) => {

    const [sLoading, setSLoading] = useState(false)

    //  const submitComments = async () => {
    //         try {

    //             setSLoading(true)
    //             const response = await fetch(`/api/students/${studentId}/comments`, {
    //                 method: 'POST',
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({ studentId, comment: generatedComment, by: teacherName }),
    //             })

    //             const responseData = await response.json()
    //             if (!response.ok) {
    //                 toast.error(responseData.message)
    //                 return
    //             }

    //             toast.success(responseData.message)
    //             setFetchData(true)
    //             setNewComment(false)
    //         }
    //         catch (e) {
    //             console.log(e)
    //         } finally {
    //             setSLoading(false)
    //         }
    //     }

    return (
        <div className="fixed top-0 left-0 w-full h-svh bg-black/20 backdrop-blur-sm pt-10 z-40">
            <div className="max-w-4xl transition duration-1000 bg-white h-full overflow-y-auto mx-auto rounded-t-xl p-3">
                <div className="flex justify-between items-center">
                    <h1 className="font-medium">
                        Submit New Comment
                    </h1>
                    <button onClick={() => setSubmitComment(false)} type="button" className="bg-red-200 text-black p-2 rounded-full hover:bg-red-800 hover:text-white transition duration-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                    </button>
                </div>

                <div className="mb-2">
                    <p className="text-xs">
                        Please select an academic calendar for this new comment
                    </p>

                    <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                            <label htmlFor="academicYr" className="text-sm block">
                                Academic Year
                            </label>
                            <select
                                id="academicYr"
                                name="academicYr"
                                className="p-2 border w-full rounded-md text-sm mt-1"
                            //   value={academicYr}
                            //   onChange={(e) => {
                            //     setAcademicYr(e.target.value);
                            //     setAcademicTerm("");
                            //   }}
                            >
                                <option value="">Select Academic Year</option>
                                {/* {acdemicDataLoading ? (
                    <option value="">Loading...</option>
                  ) : (
                    academicData.map((year) => (
                      <option key={year.id} value={year.year}>
                        {year.year}
                      </option>
                    ))
                  )} */}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="academicTerm" className="text-sm block">
                                Academic Term
                            </label>
                            <select
                                id="academicTerm"
                                name="academicTerm"
                                className="p-2 border w-full rounded-md text-sm mt-1"
                            //   value={academicTerm}
                            //   onChange={(e) => setAcademicTerm(e.target.value)}
                            >
                                <option value="">Select Academic Term</option>
                                {/* {acdemicDataLoading ? (
                    <option value="">Loading...</option>
                  ) : (
                    academicData.map((year) => {
                      if (year.year === academicYr) {
                        return year.terms.map((term) => (
                          <option key={term.id} value={term.term}>
                            {term.term}
                          </option>
                        ));
                      }
                    })
                  )} */}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="my-4 p-3 bg-gray-100 rounded-md">
                    <h3 className="font-medium">Generated Comment:</h3>
                    <p className="text-gray-700 text-sm">{generatedComment}</p>

                    <button onClick={() => submitComments()} type="button" className="flex items-center justify-center gap-2 bg-black disabled:bg-gray-700 text-white p-2 rounded-md mt-2 text-xs">
                        {sLoading ? (
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
                                Processing...
                            </>
                        ) : (
                            <span>Submit Generated Comment for Approval!</span>
                        )}
                    </button>
                </div>


            </div>
        </div>
    )
}