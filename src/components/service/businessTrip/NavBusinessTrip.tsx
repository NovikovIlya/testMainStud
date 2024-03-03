import React from 'react';
import {Header} from "../../layout/Header";
import {useTranslation} from "react-i18next";
import {LeftMenu} from "./leftMenu/LeftMenu";
import {navListBusinessTrip} from "../../../utils/navListForLeftMenu/navBusinessTrip";

export const NavBusinessTrip = () => {

    const { t } = useTranslation()

    return (
        <>
            <Header type={'service'} service={t('Модуль Командировка')}/>
            <LeftMenu navList={navListBusinessTrip}/>
        </>
    );
};

