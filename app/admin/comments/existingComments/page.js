"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ExistingCommentsUpload } from "./existingCommentsUpload";

export default function ExistingComments() {
  const router = useRouter();

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("/api/classes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setClasses(data.classes);
          return;
        } else {
          toast.error(data.message || "Failed to fetch classes.");
          return;
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
        toast.error("An error occurred while fetching classes.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchClasses();
  }, []);

  const [uploadExistingComments, setUploadExistingComments] = useState(false);
  const [classInfo, setClassInfo] = useState({});

  return (
    <div className="px-5 py-5">
        {uploadExistingComments && <ExistingCommentsUpload setUploadExistingComments={setUploadExistingComments} classInfo={classInfo} />}
      <div>
        <button
          type="button"
          className="bg-red-200 hover:text-white hover:bg-red-600 px-4 py-2 rounded-md flex items-center justify-center gap-1.5 text-sm"
          onClick={() => router.back()}
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
        <h1 className="font-bold">Existing Comments</h1>
        <p className="text-gray-500 text-sm">
          Please select a class below to upload existing comments.
        </p>

        <div className="mt-5 grid grid-cols-4 gap-4">
          {loading ? (
            [1,2,3,4,5,6,7,8].map((item) => (
              <div key={item} className="animate-pulse bg-gray-200 h-10 rounded-md"></div>
            ))
          ) : classes.length > 0 ? (
            classes.map((classItem, index) => (
              <div key={index}>
                <button
                  type="button"
                  className="bg-blue-200 hover:text-white hover:bg-blue-600 px-4 py-2 rounded-md flex items-center justify-center gap-1.5 text-sm font-medium w-full"
                  onClick={() => {
                    setUploadExistingComments(true);
                    setClassInfo(classItem);
                  }}
                >
                  {classItem.className}
                </button>
              </div>
            ))
          ) : (
            <p>No classes available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
