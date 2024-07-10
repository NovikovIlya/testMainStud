import { ReactNode } from "react";

export interface NavLink {
    id: string,
    icon: ReactNode,
    name: string,
}

export interface ILeftMenu {
    navList: NavLink[]
}