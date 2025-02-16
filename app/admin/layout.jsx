import { AdminHeader } from "@/components/adminHeader";
import { AdminSidebar } from "@/components/adminSidebar";
import { SidebarProvider } from "@/providers/sidebarProvider";

export default function RootLayout ({children}){
    return (
        <SidebarProvider>
        {/* <Auth> */}
        <div className="flex h-svh gap-1.5 w-full relative overflow-hidden">

            <AdminSidebar />

            <div className="sm:flex-1 w-full shrink-0 relative flex flex-col h-svh">
                <AdminHeader />
                <div className="overflow-y-auto flex-1">
                    {children}
                </div>
            </div>

        </div>
        {/* </Auth> */}
    </SidebarProvider>
    )
}