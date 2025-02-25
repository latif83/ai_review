"use client"
import { useSidebar } from "@/providers/sidebarProvider"
// import { faChartLine, faClockRotateLeft, faDashboard, faPlusCircle, faUsers } from "@fortawesome/free-solid-svg-icons"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
// import { Logout } from "./logout"
import { useState } from "react"

export const AdminSidebar = () => {

    const pathname = usePathname()

    const { mobileScreen, openSidebar, setOpenSidebar } = useSidebar()

    const [logout, setLogout] = useState(false)

    return (
        <>
            {/* {logout && <Logout setLogout={setLogout} />} */}
            {openSidebar && <div className="bg-black w-[230px] shrink-0 sticky top-0 h-svh transition duration-1000">
                <div className="p-3 flex gap-2 justify-center items-center border-b-2 border-dotted" >
                    <Image src={'/logo.png'} width={500} height={500} className="w-[50px] h-auto" alt="logo" />
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-50">
                        école
                        </span>
                        <span className="text-gray-50 font-bold">
                            RONSARD
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-4 pl-5 py-5 mt-5 text-sm">
                    <Link onClick={() => { mobileScreen && setOpenSidebar(false) }} className={`w-full ${pathname == "/admin" ? "bg-white text-gray-800" : "text-gray-50"} rounded-l sm:p-2 p-2 py-4 flex gap-1.5 items-center hover:font-bold`} href={'/admin'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                        </svg>

                        <span>Dashboard</span>
                    </Link>
                    <Link onClick={() => { mobileScreen && setOpenSidebar(false) }} className={`w-full ${pathname.includes("/admin/students") ? "bg-white text-gray-800" : "text-gray-50"} rounded-l sm:p-2 p-2 py-4 flex gap-1.5 items-center hover:font-bold`} href={'/admin/students'}>


                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>



                        <span>Students</span>
                    </Link>

                    <Link onClick={() => { mobileScreen && setOpenSidebar(false) }} className={`w-full ${pathname.includes("/admin/dashboard/ebooks") ? "bg-[#f2f2f2] text-gray-800" : "text-gray-50"} rounded-l sm:p-2 p-2 py-4 flex gap-1.5 items-center hover:font-bold`} href={'/admin/dashboard/ebooks'}>


                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                        </svg>


                        <span>Teachers</span>
                    </Link>

                    <Link onClick={() => { mobileScreen && setOpenSidebar(false) }} className={`w-full ${pathname.includes("/admin/dashboard/ebooks") ? "bg-[#f2f2f2] text-gray-800" : "text-gray-50"} rounded-l sm:p-2 p-2 py-4 flex gap-1.5 items-center hover:font-bold`} href={'/admin/dashboard/ebooks'}>


                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                        </svg>

                        <span>Classes</span>
                    </Link>

                    <Link onClick={() => { mobileScreen && setOpenSidebar(false) }} className={`w-full ${pathname.includes("/admin/dashboard/ebooks") ? "bg-[#f2f2f2] text-gray-800" : "text-gray-50"} rounded-l sm:p-2 p-2 py-4 flex gap-1.5 items-center hover:font-bold`} href={'/admin/dashboard/ebooks'}>


                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                        </svg>


                        <span>Comments</span>
                    </Link>
                </div>

                <div className="px-5 absolute bottom-2 w-full left-0">
                    <button type="button" onClick={() => setLogout(true)} className="bg-red-200 hover:bg-red-600 hover:text-white transition duration-500 rounded p-2 py-4 w-full text-sm flex items-center justify-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                        </svg>

                        <span>
                            Log Out
                        </span>
                    </button>
                </div>
            </div>}
        </>
    )
}