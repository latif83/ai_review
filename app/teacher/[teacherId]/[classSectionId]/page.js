"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ClassSection({ params }) {
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);

  const { classSectionId, teacherId } = use(params);

  const [userIdentity, setUserIdentity] = useState("");

  const router = useRouter();

  const [className, setClassName] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("identity")) {
      toast.error("Please login to access this page!");
      router.replace("/");
      return;
    }

    setUserIdentity(localStorage.getItem("userIdentity"));

    const getStudents = async () => {
      try {
        const response = await fetch(`/api/classes/sections/${classSectionId}`);
        const responseData = await response.json();
        if (!response.ok) {
          toast.error(responseData.message);
          return;
        }

        setClassName(
          `${responseData.classSections.class.className} (${responseData.classSections.sectionName})`
        );

        localStorage.setItem(
          "className",
          `${responseData.classSections.class.className} (${responseData.classSections.sectionName})`
        );

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
    <div>
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
            Please select a student below to manage comments
          </p>
        </div>
      </div>

      <div className="px-12 pt-1">
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

          <p className="text-sm font-medium text-gray-400">{className} /</p>
        </div>

        <h1 className="font-bold mb-2">List of students</h1>
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
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
                  href={`/teacher/${teacherId}/${classSectionId}/comments/${stud.id}`}
                  key={index}
                  className="p-3 py-5 border border-indigo-600 hover:bg-indigo-600 hover:text-white flex items-center cursor-pointer gap-3 rounded-md"
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
                  <span>
                    {stud.fName} {stud.lName}
                  </span>
                </Link>
              )) : <div className="w-full text-center"> <p className="text-gray-600">No Students found.</p> <p className="text-sm">Please Contact your Administrator if there is any unexpected issue.</p> </div>}
        </div>
      </div>
    </div>
  );
}
