"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ExtractComments() {
  const [loading, setLoading] = useState(true);

  const [classes, setClasses] = useState([]);

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

  return (
    <div className="px-5 py-5">
      <div className="mb-5 flex justify-between items-center">
        <div>
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
                d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
              />
            </svg>

            <h1 className="text-gray-900 text-xl font-semibold">Classes</h1>
          </div>

          <p className="text-sm text-gray-600">
            Please select a class below to view / extract comments.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {classes.map((clas, index) => (
          <Link href={`/admin/comments/extractComments/${clas.id}`} key={index} className="p-3 border rounded-md shadow hover:bg-gray-200 transition duration-500">
            <h1 className="font-medium text-sm">{clas.className}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
}
