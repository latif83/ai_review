"use client";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UploadExcel } from "../uploadExcel";

export default function StudentsClassCommentDetails({ params }) {
  const [loading, setLoading] = useState(true);
  const { classId,subjectId } = use(params);

  const [commentData, setCommentData] = useState([]);

  const [className, setClassName] = useState("");

  const [fileUploaded, setFileUploaded] = useState(false);

  const router = useRouter();

  const [upload, setUpload] = useState(false);

  const [subjectName,setSubjectName] = useState("")

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/classes/getComments/${classId}/${subjectId}`);
        const responseData = await response.json();

        if (!response.ok) {
          toast.error(responseData.message);
          return;
        }

        setCommentData(responseData.students);
        setClassName(responseData.className);
        setSubjectName(responseData.subjectName);
        setFileUploaded(responseData.fileUploaded);
      } catch (e) {
        console.log(e);
        toast.error("Internal server error!");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div className="px-5 py-5">
      {upload && (
        <UploadExcel
          setUpload={setUpload}
          studentsComments={commentData}
          className={className}
        />
      )}

      <div className="flex justify-between items-center gap-2">
        <div>
          <h1 className="font-medium text-sm text-gray-600">
            {loading ? (
              <span className="w-32 block mb-1 h-5 rounded-md bg-gray-100 animate-pulse p-2"></span>
            ) : (
              `${className} / ${subjectName}`
            )}
          </h1>
          <p className="text-xs">View / Extract comments</p>
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
        </div>

        <div className="flex gap-2">

          <div>
            <button
              onClick={() => setUpload(true)}
              type="button"
              className="p-2 rounded-md bg-lime-700 text-white flex items-center justify-center hover:bg-green-700 transition duration-500 text-sm gap-1.5"
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
                  d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m-6 3.75 3 3m0 0 3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
                />
              </svg>

              <span>Extract Comment</span>
            </button>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-7">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Student
              </th>
              <th scope="col" className="px-6 py-3">
                Comment
              </th>
              <th scope="col" className="px-6 py-3">
                status
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [1, 2, 3, 4, 5, 6, 7, 8].map((n, index) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-50 border-b border-gray-200 animate-pulse"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <span className="bg-gray-200 rounded-lg h-[30px] w-full block"></span>
                  </th>
                  <td className="px-6 py-4">
                    <span className="bg-gray-200 rounded-lg h-[30px] w-full block"></span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-200 rounded-lg h-[30px] w-full block"></span>
                  </td>
                </tr>
              ))
            ) : commentData.length > 0 ? (
              commentData.map((data, index) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {`${data.fName} ${data.lName}`}
                  </th>
                  <td className="px-6 py-4">
                    {data.comment ? data.comment : "N/A"}
                  </td>
                  <td className="px-6 py-4">{data.ApprovedBy ? <span className="text-lime-700 font-medium"> Approved</span> : <span className="text-red-700 font-medium"> Not Approved</span>}</td>
                </tr>
              ))
            ) : (
              <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                <td colSpan={4} className="px-6 py-4">
                  No Students Found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
