"use client";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { NewComment } from "./newComment";

export default function StudentComment({ params }) {
  const router = useRouter();

  const { studentId } = use(params);

  const [className, setClassName] = useState("");

  const [studentName, setStudentName] = useState("");

  const [loading, setLoading] = useState(true);

  const [userIdentity, setUserIdentity] = useState("");

  const [comments, setComments] = useState([]);

  const [newComment, setNewComment] = useState(false);

  const [previousComments, setPreviousComments] = useState("");

  const [fetchData, setFetchData] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("identity")) {
      toast.error("Please login to access this page!");
      router.replace("/");
      return;
    }

    setUserIdentity(localStorage.getItem("userIdentity"));

    setClassName(localStorage.getItem("className"));

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

        setPreviousComments(
          Array.isArray(responseData.comments)
            ? responseData.comments.map((comment) => comment.comment).join(", ")
            : ""
        );
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    if (fetchData) {
      getStudentRecentComments();
      setFetchData(false)
    }

  }, [fetchData]);

  return (
    <div>
      {newComment && (
        <NewComment
          previousComments={previousComments}
          studentName={studentName}
          setNewComment={setNewComment}
          studentId={studentId}
          teacherName={userIdentity}
          setFetchData={setFetchData}
        />
      )}
      <div className="py-5 px-12 text-gray-600 flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold">Welcome to the,</h1>
          <h2 className="text-2xl font-bold">Teacher's Dashboard</h2>
          <p
            className={`bg-black p-2 rounded text-sm text-white text-center font-bold ${
              !userIdentity && "animate-pulse py-4"
            }`}
          >
            {userIdentity}
          </p>
        </div>
        <div className="text-right">
          <button
          onClick={()=>router.replace('/')}
            type="button"
            className="border-2 hover:bg-red-600 border-red-600 hover:text-white transition duration-500 inline-flex items-center justify-center gap-2 text-red-600 p-2 rounded-md text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>

            <span>Log Out</span>
          </button>
          <p className="text-sm">
            Please view and generate new comments.
          </p>
        </div>
      </div>

      <div className="px-12 pt-2 pb-8">
        <div className="flex gap-2 items-center mb-2">
          <button
            onClick={() => router.back()}
            type="button"
            className="bg-red-200 text-gray-900 hover:bg-red-700 hover:text-gray-50 transition duration-500 p-2 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
          </button>

          <p className="text-sm text-gray-400 font-medium">
            {className} / {studentName}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Recent Comments</h2>

            <button
              onClick={() => setNewComment(true)}
              type="button"
              className="p-2 border border-indigo-600 rounded-md flex items-center gap-2 hover:bg-indigo-600 hover:text-white text-sm"
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
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <span>New Comment</span>
            </button>
          </div>

          <div className="grid grid-cols-2 mt-5 gap-5">
            {loading ? [1,2,3,4,5,6,7,8].map((num,index)=>(<div
                key={index}
                className="animate-pulse bg-gray-50 rounded-md border-indigo-600 p-3"
              >
                <div className="flex justify-between text-gray-100 text-sm">
                  <h2 className="font-bold h-5 w-16 bg-gray-200 rounded"></h2>

                  <h2 className="font-bold mb-5 h-5 w-16 bg-gray-200 rounded">
                    
                  </h2>
                </div>

                <div className="text-white text-sm mb-5 border-b pb-3">
                  <p className="h-10 bg-gray-200 rounded"></p>
                </div>

                <div className="flex justify-between text-gray-100 text-sm">
                  <div className="h-5 w-16 bg-gray-200 rounded">  </div>

                  <div className="h-5 w-16 bg-gray-200 rounded">
                  </div>
                </div>
              </div>)) : comments.length > 0 ? comments.map((comment, index) => (
              <div
                key={index}
                className="bg-indigo-800 rounded-md border-indigo-600 p-3"
              >
                <div className="flex justify-between text-gray-100 text-sm">
                  <h2 className="font-bold">{comment.academicYr}</h2>

                  <h2 className="font-bold mb-5">
                    {comment.academicTerm == "1st" ? `${comment.academicTerm} Term` : comment.academicTerm }
                  </h2>
                </div>

                <div className="text-white text-sm mb-5 border-b pb-3">
                  <p>{comment.comment}</p>
                </div>

                <div className="flex justify-between text-gray-100 text-sm">
                  <div> By: {comment.by ? comment.by : "N/A"} </div>

                  <div>
                    {" "}
                    Approved By:{" "}
                    {comment.ApprovedBy ? comment.ApprovedBy : "N/A"}{" "}
                  </div>
                </div>
              </div>
            )) : <div className="sm:col-span-2 text-center font-semibold"> <p> No Comments found for this student. </p> </div>}
          </div>
        </div>
      </div>
    </div>
  );
}
