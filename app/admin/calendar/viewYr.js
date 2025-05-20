import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { NewTerm } from "./newTerm";

export const ViewYr = ({ setViewYr, viewYrData,setF }) => {
  const [termsLoading, setTermsLoading] = useState(false);
  const [termsData, setTermsData] = useState([]);
  const [fetchData, setFetchData] = useState(true);

  const [addTerm, setAddTerm] = useState(false);

  useEffect(() => {
    const getTermsData = async () => {
      try {
        setTermsLoading(true);
        const response = await fetch(`/api/calendar/terms/${viewYrData.id}`);
        const data = await response.json();
        if (!response.ok) {
          toast.error(
            data.message ||
              "Unexpected error while fetching terms, please try again later!"
          );
          return;
        }
        setTermsData(data.terms);
      } catch (e) {
        console.log(e);
        toast.error("Internal Server Error!");
      } finally {
        setTermsLoading(false);
      }
    };

    if (fetchData) {
      getTermsData();
      setFetchData(false);
    }
  }, [fetchData]);

  return (
    <div className="fixed top-0 left-0 w-full h-svh bg-black/20 backdrop-blur-sm pt-10 z-40">
      {addTerm && <NewTerm setAddTerm={setAddTerm} setFetchData={setFetchData} yrId={viewYrData.id} setF={setF} />}
      <div className="max-w-2xl transition duration-1000 bg-white mx-auto rounded-xl p-3 py-6">
        <div className="flex justify-between items-center">
          <h1 className="font-medium">View Academic Year</h1>
          <button
            onClick={() => setViewYr(false)}
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

        <div className="text-center mt-5 border-b-2 border-gray-200 pb-5">
          <h1 className="text-gray-900 text-2xl font-semibold">
            {viewYrData.year}
          </h1>
          <p className="text-gray-500 text-sm">Academic Year</p>

          <div className="flex gap-4 justify-center items-center mt-3">
            <button
              type="button"
              className="bg-white p-2 px-4 flex items-center gap-2 border rounded-lg border-2 hover:bg-blue-600 transition duration-500 hover:text-blue-200 hover:border-blue-600 text-sm text-blue-600 border-blue-600"
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
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>

              <span>Edit Academic Year</span>
            </button>

            <button
              type="button"
              className="bg-white p-2 px-4 flex items-center gap-2 border border-red-300 rounded-lg border-2 hover:bg-red-600 transition duration-500 hover:text-red-200 hover:border-red-600 text-sm text-red-600"
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
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>

              <span>Delete Academic Year</span>
            </button>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex justify-between items-center">
            <h1 className="text-gray-900 font-semibold">Terms</h1>
            <button
              onClick={() => setAddTerm(true)}
              type="button"
              className="bg-white p-2 px-4 flex items-center gap-2 border rounded-lg border-2 hover:bg-black transition duration-500 hover:text-white hover:border-black text-sm"
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
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <span>New Term</span>
            </button>
          </div>
          <div className="grid md:grid-cols-3 md:gap-5 sm:grid-cols-2 gap-4 mt-5">
            {termsLoading ? (
              [1, 2, 3, 4, 5, 6].map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className="bg-white p-5 flex flex-col gap-2 border rounded-lg border-2 hover:bg-gray-600 transition duration-500 hover:text-white hover:border-gray-600 animate-pulse"
                >
                  <span className="block font-bold h-6 w-full rounded-md bg-gray-200"></span>
                  <hr />
                  <span className="flex gap-4 justify-center items-center mt-3">
                    <button
                      type="button"
                      className="bg-white p-2 px-4 flex items-center gap-2 border rounded-lg border-2 hover:bg-blue-600 transition duration-500 hover:text-blue-200 hover:border-blue-600 text-sm text-blue-600 border-blue-600"
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
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </button>

                    <button
                      type="button"
                      className="bg-white p-2 px-4 flex items-center gap-2 border border-red-300 rounded-lg border-2 hover:bg-red-600 transition duration-500 hover:text-red-200 hover:border-red-600 text-sm text-red-600"
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
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </span>
                </button>
              ))
            ) : termsData.length > 0 ? (
              termsData.map((term, index) => (
                <button
                  key={index}
                  type="button"
                  className="bg-white p-5 flex flex-col gap-2 border rounded-lg border-2 hover:bg-gray-600 transition duration-500 hover:text-white hover:border-gray-600"
                >
                  <span className="block font-bold">{term.term}</span>
                  <hr />
                  <span className="flex gap-4 justify-center items-center mt-3">
                    <span
                      className="bg-white p-2 px-4 flex items-center gap-2 border rounded-lg border-2 hover:bg-blue-600 transition duration-500 hover:text-blue-200 hover:border-blue-600 text-sm text-blue-600 border-blue-600"
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
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </span>

                    <span
                      className="bg-white p-2 px-4 flex items-center gap-2 border border-red-300 rounded-lg border-2 hover:bg-red-600 transition duration-500 hover:text-red-200 hover:border-red-600 text-sm text-red-600"
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
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </span>
                  </span>
                </button>
              ))
            ) : (
              <div className="md:col-span-3 sm:col-span-2 flex items-center justify-center">
                <h1 className="text-gray-500 text-sm">
                  No terms have been added for this academic year!
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
