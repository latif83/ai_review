import { useEffect, useState } from "react";
import { AssignTeacher } from "./assignTeacher";

export const ViewAssignment = ({ setViewAssignment, classData }) => {
  const [assignTeacher, setAssignTeacher] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch teachers assigned to the class
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/classes/${classData.classId}/assignedTeachers`);
        const data = await res.json();
        setTeachers(data);
      } catch (err) {
        console.error("Failed to fetch teachers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, [classData]);

  // Handler for removing teacher (stub function)
  const handleRemoveTeacher = async (teacherId) => {
    const confirm = window.confirm("Are you sure you want to remove this teacher?");
    if (!confirm) return;

    try {
      const res = await fetch(`/api/classes/teachers/remove`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ classId: classData.id, teacherId }),
      });

      const result = await res.json();

      if (res.ok) {
        setTeachers((prev) => prev.filter((t) => t.id !== teacherId));
      } else {
        alert(result.message || "Error removing teacher");
      }
    } catch (error) {
      console.error("Error removing teacher:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-svh bg-black/20 backdrop-blur-sm pt-10 z-40">
      {assignTeacher && <AssignTeacher setAssignTeacher={setAssignTeacher} classData={classData} />}

      <div className="max-w-2xl transition duration-1000 bg-white mx-auto rounded-xl p-3 py-6">
        <div className="flex justify-between items-center">
          <div>
            <span className="font-bold text-red-600 text-xs">{classData.className}</span>
            <h1 className="font-medium text-sm">Assigned Teachers</h1>
          </div>
          <button
            onClick={() => setViewAssignment(false)}
            type="button"
            className="bg-red-200 text-black p-2 rounded-full hover:bg-red-800 hover:text-white transition duration-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-5">
          <div className="flex justify-end">
            <button
              onClick={() => setAssignTeacher(true)}
              type="button"
              className="p-2 rounded-lg flex items-center justify-center gap-2 text-xs bg-lime-200 hover:bg-lime-600 hover:text-white transition duration-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <span>Assign a New Teacher</span>
            </button>
          </div>

          <div className="p-3 mt-3 flex flex-col gap-4">
            {loading ? (
              <p className="text-center text-sm text-gray-500">Loading...</p>
            ) : teachers.length === 0 ? (
              <p className="text-center text-sm text-gray-500">No Teachers Assigned!</p>
            ) : (
              teachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="border rounded p-3 flex justify-between items-center text-sm shadow-sm hover:bg-gray-50"
                >
                  <div>
                    <p className="font-semibold">{teacher.firstName} {teacher.lastName}</p>
                    <p className="text-xs text-gray-500">{teacher.email}</p>
                  </div>

                  <div className="flex gap-2">
                    {/* You can add more buttons like edit here */}
                    <button
                      onClick={() => handleRemoveTeacher(teacher.id)}
                      className="text-red-600 hover:text-white hover:bg-red-600 border border-red-600 rounded px-2 py-1 text-xs transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
