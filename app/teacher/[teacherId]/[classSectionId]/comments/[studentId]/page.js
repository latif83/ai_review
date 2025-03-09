export default function StudentComment() {
 
    
    const studentComments = [
        {
          student: "James Anderson",
          academicYr: "2024/2025",
          academicTerm: "Term 1",
          comment: "James is highly engaged in Science and enjoys hands-on activities. However, he sometimes struggles with staying focused during theoretical lessons and needs to improve his attention to detail in written work.",
          by: "Mr. Johnson",
          approvedBy: "Mrs. Williams"
        },
        {
          student: "James Anderson",
          academicYr: "2024/2025",
          academicTerm: "Term 2",
          comment: "James is consistent with his assignments and has a great work ethic. However, he tends to rush through tasks, leading to avoidable mistakes. Encouraging him to review his work before submission would be beneficial.",
          by: "Ms. Carter",
          approvedBy: "Dr. Miller"
        },
        {
          student: "James Anderson",
          academicYr: "2024/2025",
          academicTerm: "Term 3",
          comment: "James collaborates well with peers and is always willing to help others. However, he sometimes hesitates to ask for help when he is struggling, particularly in Math. Building confidence in seeking clarification would improve his overall performance.",
          by: "Mr. Davis",
          approvedBy: "Mr. Thompson"
        },
        {
          student: "James Anderson",
          academicYr: "2024/2025",
          academicTerm: "Term 4",
          comment: "James has shown improvement in leadership skills and class participation. However, his time management could use some work, especially during group projects where he occasionally procrastinates. Encouraging better planning and organization will help him succeed.",
          by: "Mrs. Brown",
          approvedBy: "Mr. Lewis"
        }
      ];
      

  return (
    <div>
      <div className="py-5 px-12 text-gray-600 flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold">Welcome to the,</h1>
          <h2 className="text-2xl font-bold">Teacher's Dashboard</h2>
          <p className="bg-black p-2 rounded text-sm text-white text-center font-bold">
            Micheal Osei
          </p>
        </div>
        <div className="text-right">
          <button
            type="button"
            className="border-2 hover:bg-red-600 border-red-600 hover:text-white transition duration-500 inline-flex items-center justify-center gap-2 text-red-600 p-2 rounded-md text-sm"
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
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>

            <span>Log Out</span>
          </button>
          <p className="text-sm">
            Please select a student below to manage comments
          </p>
        </div>
      </div>

      <div className="px-12 pt-2 pb-8">
        <div className="flex gap-2 items-center mb-2">
          <button
            type="button"
            className="bg-red-200 text-gray-900 hover:bg-red-700 hover:text-gray-50 transition duration-500 p-2 rounded-md"
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
          </button>

          <p className="text-sm text-gray-400 font-medium">
            Primary 1 (A) / Emmanuel Asare
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Recent Comments</h2>

            <button
              type="button"
              className="p-2 border border-indigo-600 rounded-md flex items-center gap-2 hover:bg-indigo-600 hover:text-white text-sm"
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
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <span>New Comment</span>
            </button>
          </div>

          <div className="grid grid-cols-2 mt-5 gap-5">
            {studentComments.map((comment, index) => (
              <div
                key={index}
                className="bg-indigo-800 rounded-md border-indigo-600 p-3"
              >
                <div className="flex justify-between text-gray-100 text-sm">
                  <h2 className="font-bold">{comment.academicYr}</h2>

                  <h2 className="font-bold mb-5">{comment.academicTerm}</h2>
                </div>

                <div className="text-white text-sm mb-5 border-b pb-3">
                  <p>{comment.comment}</p>
                </div>

                <div className="flex justify-between text-gray-100 text-sm">
                  <div> By: {comment.by} </div>

                  <div> Approved By: {comment.approvedBy} </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
