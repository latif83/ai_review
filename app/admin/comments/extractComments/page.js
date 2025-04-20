"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SelectSubjectModal } from "./selectSubject";
import { useRouter } from "next/navigation";

export default function ExtractComments() {
  const [loading, setLoading] = useState(true);

  const [classes, setClasses] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const getClasses = async () => {
      try {
        const response = await fetch(`/api/classes`);
        const responseData = await response.json();

        if (!response.ok) {
          toast.error(responseData.message);
          return;
        }

        setClasses(responseData.classes);
      } catch (e) {
        console.log(e);
        toast.error("Internal server error!");
      } finally {
        setLoading(false);
      }
    };

    getClasses();
  }, []);

  const [selectSubject, setSelectSubject] = useState(false);
  const [classId, setClassId] = useState(null);

  return (
    <div className="px-5 py-5">
      {selectSubject && (
        <SelectSubjectModal
          setSelectSubject={setSelectSubject}
          classId={classId}
        />
      )}
      <div className="mb-5 flex justify-between items-center">
        <div>
        <button
            onClick={() => router.back()}
            type="button"
            className="flex items-center justify-center gap-1.5 p-2 rounded-md bg-red-200 hover:bg-red-700 hover:text-white transition duration-500 text-xs mt-1"
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

            <span>Back</span>
          </button>

          <p className="text-sm text-gray-600">
            Please select a class below to view / extract comments.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {loading
          ? [1, 2, 3, 4, 5, 6, 7, 8].map((num, index) => (
              <div
                key={index}
                className="bg-gray-200 rounded-md animate-pulse h-12"
              >
                {" "}
              </div>
            ))
          : classes.map((clas, index) => {
              if (clas.subjectBasedComments) {
                return (
                  <button
                    onClick={() => {
                      setClassId(clas.id);
                      setSelectSubject(true);
                    }}
                    type="button"
                    key={index}
                    className="p-3 border rounded-md shadow hover:bg-gray-200 transition duration-500"
                  >
                    <h1 className="font-medium text-sm">{clas.className}</h1>
                  </button>
                );
              } else {
                return (
                  <Link
                    href={`/admin/comments/extractComments/${clas.id}`}
                    key={index}
                    className="p-3 border rounded-md shadow hover:bg-gray-200 text-center transition duration-500"
                  >
                    <h1 className="font-medium text-sm">{clas.className}</h1>
                  </Link>
                );
              }
            })}
      </div>
    </div>
  );
}
// subjectBasedComments
