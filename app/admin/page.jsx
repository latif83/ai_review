export default function Dashboard() {
    return (
        <div className="px-5 py-5">
            <h1 className="text-gray-900 text-2xl font-bold mb-5">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Registered Users */}
                <div className="bg-white p-4 border rounded-lg shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-700">Students</h3>
                        {/* <FontAwesomeIcon icon={faUsers} width={30} height={30} className="text-indigo-600 text-3xl" /> */}


                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>




                    </div>
                    <p className="text-2xl font-bold text-gray-800">20</p>
                    {/* {loading ? <span className="w-32 h-6 animate-pulse bg-gray-300 block mt-3 rounded-md"></span> : <p className="text-2xl font-bold text-gray-800">{applicationCounts}</p>} */}
                </div>

                <div className="bg-white p-4 border rounded-lg shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-700">Teachers</h3>
                        {/* <FontAwesomeIcon icon={faUsers} width={30} height={30} className="text-indigo-600 text-3xl" /> */}

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                        </svg>





                    </div>
                    <p className="text-2xl font-bold text-gray-800">5</p>
                    {/* {loading ? <span className="w-32 h-6 animate-pulse bg-gray-300 block mt-3 rounded-md"></span> : <p className="text-2xl font-bold text-gray-800">{applicationCounts}</p>} */}
                </div>

                <div className="bg-white p-4 border rounded-lg shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-700">Classes</h3>
                        {/* <FontAwesomeIcon icon={faUsers} width={30} height={30} className="text-indigo-600 text-3xl" /> */}


                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                        </svg>






                    </div>
                    <p className="text-2xl font-bold text-gray-800">5</p>
                    {/* {loading ? <span className="w-32 h-6 animate-pulse bg-gray-300 block mt-3 rounded-md"></span> : <p className="text-2xl font-bold text-gray-800">{applicationCounts}</p>} */}
                </div>


            </div>

            <div className="text-center absolute bottom-0 w-full left-0 text-sm pb-2">
                <p className="font-bold text-sm">
                    &copy; 2025 École Ronsard. Tous droits réservés.
                </p>
            </div>

        </div>
    )
}