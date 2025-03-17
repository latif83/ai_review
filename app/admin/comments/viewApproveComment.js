"use client";
import { useEffect, useState } from "react";

export const ViewApproveComment = ({setViewComments}) => {
  const [classes, setClasses] = useState([]);

  const [classesLoading, setClassesLoading] = useState(false);

  const [sectionActions, setSectionActions] = useState(false);
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
            Please select a class by selecting a class section below to view
            comments.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-5">
            {classes.map((clas, index) => (
              <div key={index} className="p-3 border rounded shadow-lg">
                <h1 className="font-bold">{clas.className}</h1>

                <div className="mt-4">
                  <div className="border-b pb-2 flex justify-between">
                    <p className="text-sm font-medium">Sections</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2 text-sm">
                    {clas.ClassSections.length > 0 ? (
                      clas.ClassSections.map((section, index) => (
                        <span
                          key={index}
                          onClick={() => {
                            setSectionActions(true);
                            setSectionData({
                              classId: clas.id,
                              className: clas.className,
                              sectionId: section.id,
                              sectionName: section.sectionName,
                            });
                          }}
                          className="bg-indigo-700 text-white p-2 px-3.5 rounded-full cursor-pointer hover:bg-red-700 transition duration-500"
                        >
                          {section.sectionName}
                        </span>
                      ))
                    ) : (
                      <span className="text-red-600">No Sections Added!</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
