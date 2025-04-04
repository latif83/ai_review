import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export const DownloadExcel = async (fileUrl, studentComments) => {
  try {
    // Step 1: Fetch the Excel file from Firebase Storage
    const response = await fetch(fileUrl,{ mode: "no-cors" });
    const blob = await response.blob();

    // Step 2: Read the file as an ArrayBuffer
    const arrayBuffer = await blob.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });

    // Step 3: Select the first worksheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON
    const sheetData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

    // Step 4: Update the "Teacher's Comment" column based on studentId
    const updatedSheetData = sheetData.map((row) => {
      // Find the student by matching studentId
      const student = studentComments.find((s) => s.studentId === row["STUDENT ID"]); // Adjust column name if necessary

      if (student) {
        row["TEACHERS COMMENT"] = student.comment || ""; // Assign the comment if found
      }
      return row;
    });

    // Step 5: Convert JSON back to Excel format
    const newWorksheet = XLSX.utils.json_to_sheet(updatedSheetData);
    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, sheetName);

    // Step 6: Generate a new Excel file and trigger download
    const excelBuffer = XLSX.write(newWorkbook, { bookType: "xlsx", type: "array" });
    const updatedBlob = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(updatedBlob, "Updated_Students.xlsx");

  } catch (error) {
    console.error("Error downloading and processing Excel file:", error);
  }
};
