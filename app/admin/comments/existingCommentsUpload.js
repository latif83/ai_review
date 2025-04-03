"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

export const ExistingCommentsUpload = ({ setUploadExistingComments }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      processExcelFile(uploadedFile);
    }
  };

  const [extractedData, setExtractedData] = useState();

  const processExcelFile = async (file) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      // Assume the first sheet contains the comments
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert sheet data to JSON
      const rawData = XLSX.utils.sheet_to_json(sheet);

      const formattedData = rawData.map((row) => ({
        academicYr: row["ACA YEAR"], // Adjust column names
        academicTerm: row["TERM"],
        comment: row["TEACHERS COMMENT"],
        studentId: row["STUDENT ID"],
      }));

        console.log("Formatted Data:", formattedData);

      setExtractedData({ comments: formattedData });
    };
  };

  const [loading, setLoading] = useState(false);

  const sendToAPI = async () => {
    try {
      setLoading(true);

      const response = await fetch(`/api/students/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(extractedData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        toast.error(
          responseData.message ? responseData.message : responseData.error
        );
        return;
      }

      toast.success(responseData.message);
    } catch (error) {
      console.error("Error sending data:", error);
      toast.error("Internal server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-svh bg-black/20 backdrop-blur-sm pt-10 z-40">
      <div className="max-w-4xl transition duration-1000 bg-white h-full mx-auto rounded-t-xl p-3">
        <div className="flex justify-between items-center">
          <h1 className="font-medium">Existing Comments</h1>
          <button
            type="button"
            className="bg-red-200 text-black p-2 rounded-full hover:bg-red-800 hover:text-white transition duration-500"
            onClick={() => setUploadExistingComments(false)}
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

        <div className="flex justify-center mt-8 flex-col gap-2 items-center">
          <label htmlFor="existingFile" className="text-sm block">
            Please select an excel file to process the existing comments!
          </label>
          <input
            id="existingFile"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="p-2 border rounded-md text-sm"
          />
          {/* <p>{JSON.stringify(extractedData)}</p> */}
          <button
            onClick={sendToAPI}
            disabled={loading}
            type="button"
            className="bg-black text-white hover:bg-gray-800 p-2 rounded-md flex items-center justify-center gap-2 transition duration-500 disabled:bg-gray-400"
          >
            {loading ? (
              <>
                <svg
                  className="w-5 h-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                  ></path>
                </svg>
                Processing…
              </>
            ) : (
              <span>Upload File</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
