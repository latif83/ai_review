export default function TeachersDashboard () {
    return (
        <div>
            
            <div className="py-8 px-12 text-gray-600 flex justify-between items-center">
<div>
<h1 className="text-lg font-bold">
    Welcome to the,
</h1>
<h2 className="text-2xl font-bold">Teacher's Dashboard</h2>
</div>
<div className="text-right">
    <button type="button" className="border-2 hover:bg-red-600 border-red-600 hover:text-white transition duration-500 inline-flex items-center justify-center gap-2 text-red-600 p-2 rounded-md text-sm">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
</svg>

<span>
    Log Out
</span>
    </button>
    <p className="text-sm">
        Please select a class below to manage.
    </p>
</div>
            </div>

            <div className="px-12 pt-2">

<h1 className="font-bold mb-2">
    Assigned Classes
</h1>
            <div className="mb-2 w-1/2">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Search for a class..." required />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-6 mt-8">
<div className="bg-gray-50 border border-indigo-600 p-2 py-5 rounded-md text-gray-800 hover:bg-indigo-600 hover:text-white transition duration-500 cursor-pointer text-center">
    <span className="text-sm font-medium">
        Primary 1 (A)
    </span>
</div>

<div className="bg-gray-50 border border-indigo-600 p-2 py-5 rounded-md text-gray-800 hover:bg-indigo-600 hover:text-white transition duration-500 cursor-pointer text-center">
    <span className="text-sm font-medium">
        Primary 2 (C)
    </span>
</div>

<div className="bg-gray-50 border border-indigo-600 p-2 py-5 rounded-md text-gray-800 hover:bg-indigo-600 hover:text-white transition duration-500 cursor-pointer text-center">
    <span className="text-sm font-medium">
        Primary 5 (A)
    </span>
</div>

<div className="bg-gray-50 border border-indigo-600 p-2 py-5 rounded-md text-gray-800 hover:bg-indigo-600 hover:text-white transition duration-500 cursor-pointer text-center">
    <span className="text-sm font-medium">
        Primary 4 (B)
    </span>
</div>

<div className="bg-gray-50 border border-indigo-600 p-2 py-5 rounded-md text-gray-800 hover:bg-indigo-600 hover:text-white transition duration-500 cursor-pointer text-center">
    <span className="text-sm font-medium">
        Primary 6 (C)
    </span>
</div>
            </div>

            </div>

        </div>
    )
}