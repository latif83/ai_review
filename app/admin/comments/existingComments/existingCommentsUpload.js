"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

export const ExistingCommentsUpload = ({
  setUploadExistingComments,
  classInfo,
}) => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjectsLoading, setSubjectsLoading] = useState(true);

  useEffect(() => {
    const getSubjects = async () => {
      setSubjectsLoading(true);
      try {
        const response = await fetch(`/api/subjects`);

        if (!response.ok) {
          toast.error("Unexpected error happened, please try again later!");
          return;
        }

        const responseData = await response.json();

        setSubjects(responseData.subjects);
      } catch (e) {
        console.log(e);
        toast.error("Internal server error!");
      } finally {
        setSubjectsLoading(false);
      }
    };

    if(classInfo.subjectBasedComments){
    getSubjects();
    }
    
  }, [classInfo]);

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
        academicYr: academicYr, // Adjust column names
        academicTerm: academicTerm,
        comment: row["ENGLISH TEACHER`S COMMENT "] || row["FRENCH TEACHER`S COMMENT "] || row["TEACHERS COMMENT"],
        studentId: row["STUDENT ID"]
      }));

      // console.log("Formatted Data:", formattedData);

      setExtractedData({ comments: formattedData, classId: classInfo.id });
    };
  };

  const [loading, setLoading] = useState(false);

  const sendToAPI = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await fetch(`/api/students/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...extractedData, subjectId: selectedSubject }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        toast.error(
          responseData.message ? responseData.message : responseData.error
        );
        return;
      }

      toast.success(responseData.message);
      setUploadExistingComments(false);
    } catch (error) {
      console.error("Error sending data:", error);
      toast.error("Internal server error!");
    } finally {
      setLoading(false);
    }
  };

  const [academicYr,setAcademicYr] = useState("");
  const [academicTerm,setAcademicTerm] = useState("");

  const [acdemicDataLoading,setAcademicDataLoading] = useState(true);
  const [academicData,setAcademicData] = useState();

  useEffect(()=>{

    const getAcademicData = async () => {
      setAcademicDataLoading(true);
      try {
        const response = await fetch(`/api/calendar`);

        const responseData = await response.json();

        if (!response.ok) {
          toast.error(responseData.message || "Unexpected error happened, please try again later!");
          return;
        }

        setAcademicData(responseData.academicYrs);

      } catch (e) {
        console.log(e);
        toast.error("Internal server error!");
      } finally {
        setAcademicDataLoading(false);
      }
    };

    getAcademicData();

  },[])

  return (
    <div className="fixed top-0 left-0 w-full h-svh bg-black/20 backdrop-blur-sm pt-10 z-40">
      <div className="max-w-xl transition duration-1000 bg-white h-full mx-auto rounded-t-xl p-3">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-medium">Existing Comments</h1>
            <p className="text-xs text-red-500 font-bold">
              for: {classInfo.className}
            </p>
          </div>
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

        <form onSubmit={sendToAPI} className="mt-8">
          <div className="mb-8">
            <p className="text-xs">
              Please select an academic calendar to upload this existing
              comments
            </p>

            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <label htmlFor="academicYr" className="text-sm block">
                  Academic Year
                </label>
                <select
                  id="academicYr"
                  name="academicYr"
                  className="p-2 border w-full rounded-md text-sm mt-3"
                  value={academicYr}
                  onChange={(e) => {
                    setAcademicYr(e.target.value);
                    setAcademicTerm("");
                  }}
                >
                  <option value="">Select Academic Year</option>
                  {acdemicDataLoading ? (
                    <option value="">Loading...</option>
                  ) : (
                    academicData.map((year) => (
                      <option key={year.id} value={year.year}>
                        {year.year}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label htmlFor="academicTerm" className="text-sm block">
                  Academic Term
                </label>
                <select
                  id="academicTerm"
                  name="academicTerm"
                  className="p-2 border w-full rounded-md text-sm mt-3"
                  value={academicTerm}
                  onChange={(e) => setAcademicTerm(e.target.value)}
                >
                  <option value="">Select Academic Term</option>
                  {acdemicDataLoading ? (
                    <option value="">Loading...</option>
                  ) : (
                    academicData.map((year) => {
                      if (year.year === academicYr) {
                        return year.terms.map((term) => (
                          <option key={term.id} value={term.term}>
                            {term.term}
                          </option>
                        ));
                      }
                    })
                  )}
                </select>
              </div>
            </div>
          </div>

          <div className="">
            <label htmlFor="existingFile" className="text-sm block">
              Please select an excel file to process the existing comments!
            </label>
            <input
              id="existingFile"
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="p-2 border rounded-md text-sm mt-3"
              required
            />
          </div>

          {classInfo.subjectBasedComments == true && (
            <div className="mt-5">
              <label htmlFor="existingFile" className="text-sm block">
                Please select a subject to process the existing comments!
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="text-sm mt-3 block w-full p-3 border rounded-md"
                required
              >
                <option value="">Select a subject</option>
                {subjectsLoading ? (
                  <option value="">Loading...</option>
                ) : (
                  subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))
                )}
              </select>
            </div>
          )}

          <button
            disabled={loading}
            type="submit"
            className="bg-black text-white hover:bg-gray-800 rounded-md flex items-center justify-center gap-2 mt-8 mx-auto px-8 py-3 transition duration-500 disabled:bg-gray-400"
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
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
                  />
                </svg>

                <span>Upload File</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
