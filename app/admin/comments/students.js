"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const Students = ({setViewStudents,sectionData})=>{

    const [students, setStudents] = useState([]);
    
      const [loading, setLoading] = useState(true);


      useEffect(() => {
    
        const getStudents = async () => {
          try {
            const response = await fetch(`/api/classes/sections/${sectionData.sectionId}`);
            const responseData = await response.json();
            if (!response.ok) {
              toast.error(responseData.message);
              return;
            }
    
            setStudents(responseData.classSections.students);
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

            <h1 className="font-bold my-4">List of students: <span className="text-red-600">{`${sectionData.className} (${sectionData.sectionName})`}</span></h1>
        <div className="mb-2 w-1/2">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for a student..."
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Search
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap grid-cols-3 gap-5">
          {loading
            ? [1, 2, 3, 4, 5, 6, 7, 8].map((num, index) => (
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
            : students.length > 0 ? students.map((stud, index) => (
                <Link
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
                </Link>
              )) : <div className="w-full text-center"> <p className="text-gray-600">No Students found.</p> <p className="text-sm">Please Contact your Administrator if there is any unexpected issue.</p> </div>}
        </div>

            </div>
            </div>
            </div>
    )
}