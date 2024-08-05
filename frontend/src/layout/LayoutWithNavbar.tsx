import { NavBar } from "@/components/ui/NavBar";
import React from "react";
import { Outlet } from "react-router-dom";

export const LayoutWithNavbar: React.FC = () => {
    return <div>
        <NavBar />
        <Outlet />
    </div>
}