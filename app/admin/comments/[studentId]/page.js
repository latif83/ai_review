"use client";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ViewStudentComment({ params }) {
  const router = useRouter();

  const { studentId } = use(params);

  const [fetchData, setFetchData] = useState(true);

  const [studentName, setStudentName] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStudentRecentComments = async () => {
      try {
        const response = await fetch(`/api/students/${studentId}/comments`);

        const responseData = await response.json();

        if (!response.ok) {
          toast.error(responseData.message);
          return;
        }

        setStudentName(
          `${responseData.student.fName} ${responseData.student.lName}`
        );

        setComments(responseData.comments);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    if (fetchData) {
      getStudentRecentComments();
      setFetchData(false);
    }
  }, [fetchData]);

  return (
    <div className="px-5 py-5">
      <div className="mb-5 flex justify-between items-center">
        <div
          className="
        flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>

          <h1 className="text-gray-900 text-xl font-semibold">Comments</h1>
        </div>

        <button
          onClick={() => router.back()}
          type="button"
          className="bg-red-200 hover:bg-red-600 hover:text-white p-2 rounded-md flex items-center justify-center gap-2 text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>

          <span>Back</span>
        </button>
      </div>

      <div className="mt-5">
        <div className="text-sm p-3 mb-2 text-gray-700 rounded-md bg-gray-200">
          <p>View Comments for Student:</p>
          <p className="font-bold">{studentName}</p>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="bg-indigo-800 rounded-md border-indigo-600 p-3"
            >
              <div className="flex justify-between text-gray-100 text-sm">
                <h2 className="font-bold">{comment.academicYr}</h2>

                <h2 className="font-bold mb-5">
                  {comment.academicTerm == "1st"
                    ? `${comment.academicTerm} Term`
                    : comment.academicTerm}
                </h2>
              </div>

              <div className="text-white text-sm mb-5 border-b pb-3">
                <p>{comment.comment}</p>
              </div>

              <div className="flex justify-between text-gray-100 text-sm">
                <div> By: {comment.by ? comment.by : "N/A"} </div>

                <div>
                  {" "}
                  Approved By: {comment.approvedBy
                    ? comment.approvedBy
                    : "N/A"}{" "}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
