import { useState } from "react";
import { toast } from "react-toastify";

export const EditComment = ({ setEditComment, comment, studentId,setFC }) => {
  
  const [formData, setFormData] = useState({
    id: comment.id,
    comment: comment.comment,
  });

  const [loading, setLoading] = useState(false);

  const updateComment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `/api/students/${studentId}/comments/editComment`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        toast.error(responseData.message);
        return;
      }

      const responseData = await response.json();

      // success here

      toast.success(responseData.message);
      setFC(true)
      setEditComment(false);
    } catch (e) {
      console.log(e);
      toast.error("Internal Server Error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-svh bg-black/20 backdrop-blur-sm pt-10 z-40">
      <div className="max-w-2xl relative transition duration-1000 bg-white h-full mx-auto rounded-t-xl p-3">
        <div className="flex justify-between items-center">
          <h1 className="font-medium">Edit Comment</h1>
          <button
            onClick={() => setEditComment(false)}
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

        <form onSubmit={updateComment} className="mt-6">
          <div className="text-sm">
            <label>Comment:</label>
            <textarea
              value={formData.comment}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  comment: e.target.value,
                }))
              }
              rows={6}
              className="block p-2 rounded-md border w-full mt-2"
            ></textarea>
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
                <span>Save Changes</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
