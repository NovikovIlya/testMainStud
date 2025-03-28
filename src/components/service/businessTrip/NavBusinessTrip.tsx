import React from 'react';
import {Header} from "../../layout/Header";
import {useTranslation} from "react-i18next";
import {LeftMenu} from "../../leftMenu/LeftMenu";
import {navListBusinessTrip} from "../../../utils/navListForLeftMenu/navBusinessTrip";
import {WrapperForServices} from "../../wrapperForServices/WrapperForServices";
import {useLocation} from "react-router-dom";
import {NewBusinessTrip} from "./NewBusinessTrip/NewBusinessTrip";
import {Test} from "./test";

export const NavBusinessTrip = () => {
    const {pathname} = useLocation()
    const { t } = useTranslation()


    return (
        <>
            <Header type={'service'} service={t("BusinessTripModule")}/>
            <LeftMenu navList={navListBusinessTrip}/>
            <WrapperForServices>
                {pathname === navListBusinessTrip[0].id && <NewBusinessTrip/>}
                {pathname === navListBusinessTrip[1].id && <Test/>}
                {pathname === navListBusinessTrip[2].id && <div>На доработку</div>}
                {pathname === navListBusinessTrip[3].id && <div>Архив</div>}
            </WrapperForServices>
        </>
    );
};

