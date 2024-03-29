import React from 'react';
import {NewBusinessTripSvg} from "../../assets/svg/NewBusinessTripSvg";
import {CurrentBusinessTrip} from "../../assets/svg/CurrentBusinessTrip";
import {ForRevisionSvg} from "../../assets/svg/ForRevisionSvg";
import {Archive} from "../../assets/svg/Archive";

export const navElectronicBook = [
    {
        id: '/services/businessTrip/newBusinessTrip',
        icon: <NewBusinessTripSvg/>,
        name: 'Новая Командировки'
    },
    {
        id: '/services/businessTrip/currentBusinessTrip',
        icon: <CurrentBusinessTrip/>,
        name: 'Текущие командировки'
    },

]
