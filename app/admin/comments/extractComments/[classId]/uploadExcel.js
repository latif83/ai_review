import { imageDb } from "@/Firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import * as XLSX from "xlsx";

export const UploadExcel = ({ setUpload,studentsComments,className }) => {
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const processExcelFile = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file.");
      return;
    }

    setLoading(true);

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Get the first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        let excelData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

        // Update Excel with teacher comments
        excelData = excelData.map((row) => {
          const student = studentsComments.find(
            (s) => s.studentId === row["STUDENT ID"]
          );

          if (student) {
            return { ...row, "TEACHERS COMMENT": student.comment || "" };
          }

          return row;
        });

        // Convert updated data back to worksheet
        const updatedSheet = XLSX.utils.json_to_sheet(excelData);
        const updatedWorkbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(updatedWorkbook, updatedSheet, sheetName);

        // Download updated Excel file
        const excelBuffer = XLSX.write(updatedWorkbook, {
          bookType: "xlsx",
          type: "array",
        });

        const blob = new Blob([excelBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${className}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        toast.success("Excel file updated and downloaded!");
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error processing Excel file:", error);
      toast.error("Failed to process the Excel file.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full h-svh bg-black/20 backdrop-blur-sm pt-10 z-40">
      <div className="max-w-2xl relative transition duration-1000 bg-white h-full mx-auto rounded-t-xl p-3">
        <div className="flex justify-between items-center">
          <h1 className="font-medium">Upload & Process Extract</h1>
          <button
            onClick={() => setUpload(false)}
            type="button"
            className="bg-red-200 text-black p-2 rounded-full hover:bg-red-800 hover:text-white transition duration-500"
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

        <form onSubmit={processExcelFile} className="mt-6">
          <div className="text-sm">
            <label>Select File:</label>
            <input
              type="file"
              className="block p-2 text-sm rounded-md border w-full mt-2"
              accept=".xlsx, .xls"
              required
              onChange={handleFileChange}
            />
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={loading}
              className="p-2 bg-blue-600 text-white rounded-md text-sm flex items-center justify-center gap-1.5 disabled:bg-blue-300 hover:bg-blue-800"
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
                <span>Extract Comments</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
