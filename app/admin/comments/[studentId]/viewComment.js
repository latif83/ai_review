import { useEffect, useState } from "react";
import { ApproveComments } from "./approveComment";
import { EditComment } from "./editComment";
import { toast } from "react-toastify";
import { DeleteComments } from "./delComment";

export const ViewComment = ({
  setViewComment,
  comment,
  studentId,
  setFetchData,
}) => {
  const [approveComment, setApproveComment] = useState(false);

  const [editComment, setEditComment] = useState(false);

  const [comm, setComment] = useState(comment.comment);

  const [fC, setFC] = useState(false);

  const getCommentData = async () => {
    try {
      const response = await fetch(
        `/api/students/comments/${comment.commentId}`
      );

      const responseData = await response.json();

      if (!response.ok) {
        toast.error(responseData.message);
        return;
      }

      setComment(responseData.comment.comment);
    } catch (e) {
      console.log(e);
    } finally {
      //   setLoading(false);
    }
  };

  useEffect(() => {
    if (fC) {
      getCommentData();
      setFC(false);
    }
  }, [fC]);

  const [delComment, setDelComment] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full h-svh bg-black/20 backdrop-blur-sm pt-10 z-40">
      {approveComment && (
        <ApproveComments
          setApproveComment={setApproveComment}
          commentId={comment.commentId}
          studentId={studentId}
          setViewComment={setViewComment}
          setFetchData={setFetchData}
        />
      )}

      {editComment && (
        <EditComment
          setEditComment={setEditComment}
          comment={{ id: comment.commentId, comment: comm }}
          studentId={studentId}
          setFC={setFC}
        />
      )}

      {delComment && (
        <DeleteComments
          setDelComment={setDelComment}
          commentId={comment.commentId}
          setFetchData={setFetchData}
          setViewComment={setViewComment}
        />
      )}

      <div className="max-w-4xl relative transition duration-1000 bg-white h-full mx-auto rounded-t-xl p-3">
        <div className="flex justify-between items-center">
          <h1 className="font-medium">View Comment</h1>
          <button
            onClick={() => setViewComment(false)}
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

        <div className="mt-6">
          <div className="flex justify-between text-gray-600 text-sm">
            <h2 className="font-bold">{comment.academicYr}</h2>

            <h2 className="font-bold mb-5">
              {comment.academicTerm == "1st"
                ? `${comment.academicTerm} Term`
                : comment.academicTerm}
            </h2>
          </div>

          <p className="text-sm border-b pb-5">{comm}</p>

          <div className="flex justify-between mt-5 pb-5 border-b">
            <p className="text-sm">
              <span className="font-bold">Comment By:</span>{" "}
              <span>{comment.by ? comment.by : "N/A"}</span>
            </p>

            <p className="text-sm">
              <span className="font-bold">Approved By:</span>{" "}
              <span>{comment.ApprovedBy ? comment.ApprovedBy : "N/A"}</span>
            </p>
          </div>

          <div className="mt-3">
            <h3>Actions</h3>

            <div className="flex gap-2">
              {!comment.ApprovedBy && (
                <>
                  <button
                    onClick={() => setApproveComment(true)}
                    type="button"
                    className="bg-lime-600 hover:bg-lime-800 text-white p-2 rounded-md flex gap-1.5 items-center text-sm"
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
                        d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                      />
                    </svg>

                    <span>Approve</span>
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => setEditComment(true)}
                className="bg-cyan-600 hover:bg-cyan-800 text-white p-2 rounded-md flex gap-1.5 items-center text-sm"
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
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>

                <span>Edit</span>
              </button>

              <button
                onClick={() => setDelComment(true)}
                type="button"
                className="bg-red-600 hover:bg-red-800 text-white p-2 rounded-md flex gap-1.5 items-center text-sm"
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
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>

                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>

        {/* ✅ Approved Sticker */}
        {comment.ApprovedBy && (
          <div className="absolute bottom-3 -right-12 bg-white text-green-600 text-xs font-semibold px-6 py-4 rounded-full shadow-md flex flex-col justify-center items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
              />
            </svg>
            <span>Approved</span>
          </div>
        )}
      </div>
    </div>
  );
};
