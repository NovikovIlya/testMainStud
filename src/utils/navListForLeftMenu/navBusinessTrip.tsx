import {NewBusinessTripSvg} from "../../assets/svg/NewBusinessTripSvg";
import {CurrentBusinessTrip} from "../../assets/svg/CurrentBusinessTrip";
import {ForRevisionSvg} from "../../assets/svg/ForRevisionSvg";
import {Archive} from "../../assets/svg/Archive";
import React, {ReactNode} from "react";

export interface NavLink {
    id: string,
    icon: ReactNode,
    name: string,
}


export const navListBusinessTrip = [
    {
        id: '/services/businessTrip/newBusinessTrip',
        icon: <NewBusinessTripSvg/>,
        name: 'Новая Командировки'
    },
    {
        id: '/services/businessTrip/currentBusinessTrip',
        icon: <CurrentBusinessTrip/>,
        name: 'Текущие Командировки'
    },
    {
        id: '/services/businessTrip/forRevision',
        icon: <ForRevisionSvg/>,
        name: 'На доработку'
    },
    {
        id: '/services/businessTrip/archive',
        icon: <Archive/>,
        name: 'Архив'
    },
]
