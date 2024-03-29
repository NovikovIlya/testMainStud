import {NewBusinessTripSvg} from "../../assets/svg/NewBusinessTripSvg";
import {CurrentBusinessTrip} from "../../assets/svg/CurrentBusinessTrip";
import {ForRevisionSvg} from "../../assets/svg/ForRevisionSvg";
import {Archive} from "../../assets/svg/Archive";
import React, {ReactNode} from "react";



export const navListBusinessTrip = [
    {
        id: '/services/businessTrip/newBusinessTrip',
        icon: <NewBusinessTripSvg/>,
        name: 'NewBusinessTrip'
    },
    {
        id: '/services/businessTrip/currentBusinessTrip',
        icon: <CurrentBusinessTrip/>,
        name: 'CurrentBusinessTrips'
    },
    {
        id: '/services/businessTrip/forRevision',
        icon: <ForRevisionSvg/>,
        name: 'ForRevision'
    },
    {
        id: '/services/businessTrip/archive',
        icon: <Archive/>,
        name: 'Archive'
    },
]
