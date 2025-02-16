"use client";
import React, { createContext, useState, useEffect, useContext } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {

    const [openSidebar, setOpenSidebar] = useState(true)
    const [mobileScreen,setMobileScreen] = useState(false)

    useEffect(() => {
        const width = window.innerWidth
        if (width < 768) {
            setOpenSidebar(false)
            setMobileScreen(true)
        } else {
            setOpenSidebar(true)
        }
    }, [])

    return (
        <SidebarContext.Provider value={{ openSidebar, setOpenSidebar, mobileScreen }}>
            {children}
        </SidebarContext.Provider>
    )

}

export const useSidebar = () => useContext(SidebarContext);