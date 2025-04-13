"use client";
import { LogOut } from "@/components/logout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function TeachersDashboard({ params }) {
  const router = useRouter();

  const [userIdentity, setUserIdentity] = useState("");

  const { teacherId } = use(params);

  const [loading, setLoading] = useState(true);

  const [sections, setSections] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("identity")) {
      toast.error("Please login to access this page!");
      router.replace("/");
      return;
    }

    setUserIdentity(localStorage.getItem("userIdentity"));

    const getAssignedClassSections = async () => {
      try {
        const teacherId = localStorage.getItem("identity");

        const response = await fetch(
          `/api/teachers/${teacherId}/assignedClasses`
        );

        const responseData = await response.json();

        if (!response.ok) {
          toast.error(responseData.message);
          return;
        }

        setSections(responseData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getAssignedClassSections();
  }, []);

  const [logout,setLogout] = useState(false)

  return (
    <div>
      {logout && <LogOut setLogout={setLogout} />}
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
          onClick={()=>setLogout(true)}
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
          <p className="text-sm">Please select a class below to manage.</p>
        </div>
      </div>

      <div className="px-12 pt-2">
        <h1 className="font-bold mb-2">Assigned Classes</h1>
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
              placeholder="Search for a class..."
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

        <div className="grid grid-cols-4 gap-6 mt-8">
          {loading ? (
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-indigo-600 p-2 py-5 rounded-md text-gray-800 hover:bg-indigo-600 hover:text-white transition duration-500 cursor-pointer text-center animate-pulse"
              >
                <span className="text-sm font-medium w-2/3 bg-gray-200 py-3 rounded-md block mx-auto"></span>
              </div>
            ))
          ) : sections.length > 0 ? (
            sections.map((section, index) => (
              <Link
                key={index}
                href={`/teacher/${teacherId}/${section.id}`}
                className="bg-gray-50 border border-indigo-600 p-2 py-5 rounded-md text-gray-800 hover:bg-indigo-600 hover:text-white transition duration-500 cursor-pointer text-center"
              >
                <span className="text-sm font-medium">{`${section.className}`}</span>
              </Link>
            ))
          ) : (
            <div className="col-span-4 flex flex-col items-center justify-center gap-2">
              <p className="text-gray-600 text-sm">No Classes Assigned</p>

              <p className="font-bold">Please contact your Administrator.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
