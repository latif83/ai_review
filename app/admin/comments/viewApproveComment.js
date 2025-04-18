"use client";
import { useEffect, useState } from "react";
import { Students } from "./students";
import { toast } from "react-toastify";

export const ViewApproveComment = ({ setViewComments }) => {
  const [classes, setClasses] = useState([]);

  const [classesLoading, setClassesLoading] = useState(false);

  const [viewStudents, setViewStudents] = useState(false);
  const [sectionData, setSectionData] = useState();

  const [fetchData, setFetchData] = useState(true);

  useEffect(() => {
    const getClasses = async () => {
      setClassesLoading(true);
      try {
        const response = await fetch(`/api/classes/classandsections`);

        if (!response.ok) {
          toast.error("Unexpected error happened, please try again later!");
          return;
        }

        const responseData = await response.json();

        setClasses(responseData.classes);
      } catch (e) {
        console.log(e);
        toast.error("Internal server error!");
      } finally {
        setClassesLoading(false);
      }
    };

    if (fetchData) {
      getClasses();
      setFetchData(false);
    }
  }, [fetchData]);

  return (
    <div className="fixed top-0 left-0 w-full h-svh bg-black/20 backdrop-blur-sm pt-10 z-40">
      {viewStudents && (
        <Students setViewStudents={setViewStudents} sectionData={sectionData} />
      )}
      <div className="max-w-4xl overflow-auto transition duration-1000 bg-white h-full mx-auto rounded-t-xl p-3">
        <div className="flex justify-between items-center">
          <h1 className="font-medium">View / Approve Comments</h1>
          <button
            type="button"
            className="bg-red-200 text-black p-2 rounded-full hover:bg-red-800 hover:text-white transition duration-500"
            onClick={() => setViewComments(false)}
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
            Please select a class to view students available.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-5">
            {classesLoading
              ? [1, 2, 3, 4, 5, 6].map((num, index) => (
                  <p key={index} className="h-8 rounded-md bg-gray-200"></p>
                ))
              : classes.map((clas, index) => (
                  <button
                    onClick={() => {
                      setViewStudents(true);
                      setSectionData({
                        classId: clas.id,
                        className: clas.className,
                      });
                    }}
                    type="button"
                    key={index}
                    className="p-3 border rounded hover:bg-gray-200 transition duration-500 shadow"
                  >
                    <h1 className="font-medium">{clas.className}</h1>
                  </button>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};
