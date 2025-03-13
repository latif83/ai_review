"use client"
import { useState } from "react";
import { ExistingCommentsUpload } from "./existingCommentsUpload";

export default function Comments() {

    const [uploadExistingComments,setUploadExistingComments] = useState(false)

  return (
    <div className="px-5 py-5">

      {uploadExistingComments && <ExistingCommentsUpload setUploadExistingComments={setUploadExistingComments} />}

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
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>

          <h1 className="text-gray-900 text-xl font-semibold">Comments</h1>
        </div>
      </div>

      <div className="">
        <p className="text-sm">Please select an action to perform!</p>

        <div className="mt-3">
          <button
          onClick={()=>setUploadExistingComments(true)}
            type="button"
            className="p-2 text-sm bg-indigo-600 hover:bg-indigo-800 text-white rounded-md flex items-center justify-center gap-2"
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
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>

            <span>Upload Existing Comments</span>
          </button>
        </div>
      </div>
    </div>
  );
}
