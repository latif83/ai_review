"use client"
import { useSidebar } from "@/providers/sidebarProvider"

export const AdminHeader = () => {

    const { setOpenSidebar } = useSidebar()

    return (
        <div className="bg-black py-5 sm:px-8 px-3 flex justify-between items-center text-gray-50 sticky top-0">
            <div className="flex gap-3 items-center sm:w-auto w-2/4">
                <button type="button" onClick={() => setOpenSidebar((prev) => !prev)} className="bg-gray-50 p-2 text-gray-800 rounded border">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>

                </button>

                <p>
                    Admin Dashboard </p>
            </div>


            <button className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="sm:w-6 sm:h-6 w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>

                <span className="sm:block hidden">
                    Administrator
                </span>

            </button>




        </div>
    )
}