"use client";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ViewComment } from "../viewComment";

export default function ViewStudentComment({ params }) {
  const router = useRouter();

  const { studentId,subjectId } = use(params);

  const [fetchData, setFetchData] = useState(true);

  const [studentName, setStudentName] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStudentRecentComments = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/students/${studentId}/comments/${subjectId}`);

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

  const [aLoading, setALoading] = useState(false);
  const [commentId, setCommentId] = useState();

  const [viewComment,setViewComment] = useState(false)
  const [commentData,setCommentData] = useState()

  return (
    <div className="px-5 py-5">

      {viewComment && <ViewComment setViewComment={setViewComment} comment={commentData} studentId={studentId} setFetchData={setFetchData} />}
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
        <div className="grid sm:grid-cols-2 gap-5">
          {loading ? [1,2,3,4].map((num,index)=>(
            <div
            key={index}
            className="bg-indigo-800 animate-pulse cursor-pointer transition duration-500 rounded-md border-indigo-600 p-3"
          >
            <div className="flex justify-between text-gray-100 text-sm">
              <h2 className="font-bold bg-gray-300 h-6 w-16 rounded-md"></h2>

              <h2 className="font-bold mb-5 bg-gray-300 h-6 w-16 rounded-md">
             
              </h2>
            </div>

            <div className="text-white text-sm mb-5 pb-3 border-b">
              <p className={`overflow-hidden line-clamp-2 bg-gray-300 h-10 w-full rounded-md`}>
                
              </p>
            </div>

            <div className="flex justify-between text-gray-100 text-sm">
              <div className="bg-gray-300 h-6 w-24 rounded-md">  </div>

              <div className="bg-gray-300 h-6 w-24 rounded-md">
              </div>
            </div>

      
          </div>
          )) : comments.length > 0 ? comments.map((comment, index) => (
            <div
              key={index}
              className="bg-indigo-800 hover:bg-cyan-800 cursor-pointer transition duration-500 rounded-md border-indigo-600 p-3"
              onClick={()=>{
                setCommentData(comment)
                setViewComment(true)
              }}
            >
              <div className="flex justify-between text-gray-100 text-sm">
                <h2 className="font-bold">{comment.academicYr}</h2>

                <h2 className="font-bold mb-5">
                  {comment.academicTerm == "1st"
                    ? `${comment.academicTerm} Term`
                    : comment.academicTerm}
                </h2>
              </div>

              <div className="text-white text-sm mb-5 pb-3 border-b">
                <p className={`overflow-hidden line-clamp-2`}>
                  {comment.comment}
                </p>
              </div>

              <div className="flex justify-between text-gray-100 text-sm">
                <div> By: {comment.by ? comment.by : "N/A"} </div>

                <div>
                  {" "}
                  Approved By: {comment.ApprovedBy
                    ? comment.ApprovedBy
                    : "N/A"}{" "}
                </div>
              </div>

        
            </div>
          )) : <div className="sm:col-span-2 text-center font-semibold text-sm mt-5"> <p>No comments found for this student.</p> </div> }
        </div>
      </div>
    </div>
  );
}
