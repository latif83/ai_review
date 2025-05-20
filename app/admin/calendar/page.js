"use client";
import { useEffect, useState } from "react";
import { NewYr } from "./newYr";
import { toast } from "react-toastify";
import { ViewYr } from "./viewYr";

export default function AcademicCalendar() {
  const [addYr, setAddYr] = useState(false);
  const [loading, setLoading] = useState(true);

  const [viewYr, setViewYr] = useState(false);
  const [viewYrData, setViewYrData] = useState(null);

  const [academicYrs, setAcademicYrs] = useState([]);
  const [fetchData, setFetchData] = useState(true);

  useEffect(() => {
    const fetchAcademicYrs = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/calendar/year");

        const data = await response.json();

        if (!response.ok) {
          toast.error(
            data.message ||
              "Unexpected error while fetching academic years, please try again later!"
          );
          return;
        }

        setAcademicYrs(data.academicYrs);
      } catch (error) {
        console.error("Error fetching academic years:", error);
        toast.error("Internal Server Error!");
      } finally {
        setLoading(false);
      }
    };

    if (fetchData) {
      fetchAcademicYrs();
      setFetchData(false);
    }
  }, [fetchData]);

  return (
    <div className="px-5 py-5">
      {addYr && <NewYr setAddYr={setAddYr} setFetchData={setFetchData} />}
      {viewYr && <ViewYr setViewYr={setViewYr} viewYrData={viewYrData} setF={setFetchData} />}
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
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
            />
          </svg>

          <h1 className="text-gray-900 text-xl font-semibold">
            Academic Calendar
          </h1>
        </div>

        <div>
          <button
            onClick={() => setAddYr(true)}
            type="button"
            className="bg-white p-3 px-5 flex items-center gap-2 border rounded-lg border-2 hover:bg-black transition duration-500 hover:text-white hover:border-black"
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
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            </svg>

            <span>Add New</span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 md:gap-5 sm:grid-cols-2 gap-4">
        {loading ? (
          [1, 2, 3, 4, 5, 6].map((_, index) => (
            <button
              key={index}
              type="button"
              className="bg-white p-5 flex flex-col gap-2 border rounded-lg border-2 hover:bg-gray-600 transition duration-500 hover:text-white hover:border-gray-600 animate-pulse"
            >
              <span className="block font-bold h-4 w-full bg-gray-200 rounded-md"></span>
              <hr />
              <span className="block mx-auto rounded-md text-sm text-gray-500 h-4 w-32 bg-gray-200"></span>
            </button>
          ))
        ) : academicYrs.length > 0 ? (
          academicYrs.map((yr, index) => (
            <button
              onClick={() => {
                setViewYrData(yr);
                setViewYr(true);
              }}
              key={index}
              type="button"
              className="bg-white p-5 flex flex-col gap-2 border rounded-lg border-2 hover:bg-gray-600 transition duration-500 hover:text-white hover:border-gray-600"
            >
              <span className="block font-bold">{yr.year}</span>
              <hr />
              <span className="block text-sm text-gray-500">{`${yr.termCount} ${
                yr.termCount > 1 ? "Terms" : "Term"
              }`}</span>
            </button>
          ))
        ) : (
          <div className="md:col-span-3 sm:col-span-2 flex items-center justify-center">
            <h1 className="text-gray-500 text-lg font-semibold">
              No academic years found!
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
