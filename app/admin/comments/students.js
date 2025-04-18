"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const Students = ({ setViewStudents, sectionData }) => {
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [subjectBasedComments, setSubjectBasedComments] = useState(false);

  const [subjectsLoading, setSubjectsLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);

  const [selectedSubject, setSelectedSubject] = useState("");

  const router = useRouter();

  useEffect(() => {
    const getSubjects = async () => {
      try {
        setSubjectsLoading(true);
        const res = await fetch(`/api/subjects`);
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.message);
          return;
        }

        setSubjects(data.subjects);
      } catch (e) {
        console.log(e);
      } finally {
        setSubjectsLoading(false);
      }
    };
    if (subjectBasedComments) {
      getSubjects();
    }
  }, [subjectBasedComments]);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await fetch(
          `/api/classes/sections/${sectionData.classId}`
        );
        const responseData = await response.json();
        if (!response.ok) {
          toast.error(responseData.message);
          return;
        }

        setStudents(responseData.students);
        setSubjectBasedComments(responseData.subjectBasedComments);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    getStudents();
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-svh bg-black/20 backdrop-blur-sm pt-10 z-40">
      <div className="max-w-5xl overflow-auto transition duration-1000 bg-white h-full mx-auto rounded-t-xl p-3">
        <div className="flex justify-between items-center">
          <h1 className="font-medium">View / Approve Comments</h1>
          <button
            type="button"
            className="bg-red-200 text-black p-2 rounded-full hover:bg-red-800 hover:text-white transition duration-500"
            onClick={() => setViewStudents(false)}
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
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="pt-6">
          <p className="text-sm text-gray-600">
            Please select a student below to view comments / teachers feedback.
          </p>

          <h1 className="font-bold my-4">
            List of students:{" "}
            <span className="text-red-600">{`${sectionData.className}`}</span>
          </h1>
          {subjectBasedComments && (
            <div className="mb-2 w-1/2">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                id="subject"
                className="text-sm p-2 px-5 border border-gray-300 rounded-md w-full"
              >
                <option>Select Subject</option>
                {subjectsLoading ? (
                  <option>Loading subjects...</option>
                ) : subjects.length > 0 ? (
                  subjects.map((subject, index) => (
                    <option key={index} value={subject.id}>
                      {subject.name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled selected>
                    No Subjects found
                  </option>
                )}
              </select>
            </div>
          )}

          <div className="mt-8 flex flex-wrap grid-cols-3 gap-5">
            {loading ? (
              [1, 2, 3, 4, 5, 6, 7, 8].map((num, index) => (
                <div
                  key={index}
                  className="p-3 py-5 border border-indigo-600 hover:bg-indigo-600 hover:text-white flex items-center cursor-pointer gap-3 rounded-md animate-pulse"
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
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  <span className="bg-gray-200 w-[150px] h-[30px] rounded-md"></span>
                </div>
              ))
            ) : students.length > 0 ? (
              students.map((stud, index) => {
                if (subjectBasedComments) {
                  return (<button
                    type="button"
                    key={index}
                    onClick={() => {
                      if (!selectedSubject) {
                        toast.error("Kindly select a subject to proceed!");
                        return;
                      }

                      router.push(
                        `/admin/comments/${stud.id}/${selectedSubject}`
                      );
                    }}
                    className="p-3 py-5 border border-indigo-600 hover:bg-indigo-600 hover:text-white flex items-center cursor-pointer gap-3 rounded-md text-sm"
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
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    <span>
                      {stud.fName} {stud.lName}
                    </span>
                  </button>)
                } else {
                  return (<Link
                    href={`/admin/comments/${stud.id}`}
                    key={index}
                    className="p-3 py-5 border border-indigo-600 hover:bg-indigo-600 hover:text-white flex items-center cursor-pointer gap-3 rounded-md text-sm"
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
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    <span>
                      {stud.fName} {stud.lName}
                    </span>
                  </Link>)
                }
              })
            ) : (
              <div className="w-full text-center">
                <p className="text-gray-600">No Students found.</p>{" "}
                <p className="text-sm">
                  Please Contact your Administrator if there is any unexpected
                  issue.
                </p>{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
