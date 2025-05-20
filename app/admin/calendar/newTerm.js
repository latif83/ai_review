import { useState } from "react";
import { toast } from "react-toastify";

export const NewTerm = ({ setAddTerm, setFetchData, yrId, setF }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    term: "",
    academicYearId: yrId,
  });

  const submitAcademicTerm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await fetch(`/api/calendar/terms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        toast.error(
          responseData.message ||
            "Unexpected error while adding academic year, please try again later!"
        );
        return;
      }

      toast.success(responseData.message);
      setF(true);
      setFetchData(true);
      setAddTerm(false);
    } catch (e) {
      console.log(e);
      toast.error("Internal Server Error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-svh bg-black/20 backdrop-blur-sm pt-10 z-40">
      <div className="max-w-2xl transition duration-1000 bg-white mx-auto rounded-xl p-3 py-6">
        <div className="flex justify-between items-center">
          <h1 className="font-medium">New Academic Term</h1>
          <button
            onClick={() => setAddTerm(false)}
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

        <form onSubmit={submitAcademicTerm} className="mt-5">
          <div>
            <label
              htmlFor="studentId"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Academic Term
            </label>
            <input
              type="text"
              id="studentId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g Term 1, Term 2, etc."
              required
              value={formData.term}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  term: e.target.value,
                }))
              }
            />
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="bg-indigo-600 disabled:bg-indigo-300 hover:bg-indigo-900 transition duration-500 text-white p-3 rounded-lg flex items-center justify-center gap-2"
              disabled={loading}
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
                <span>Add Academic Term</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
