import React from 'react';
import {ButtonLeftBusinessTripSvg} from "../../../../assets/svg/ButtonLeftBusinessTripSvg";
import {ButtonRightBusinessTripSvg} from "../../../../assets/svg/ButtonRightBusinessTripSvg";
import {Progress} from "antd";
import {Step} from "./step/Step";

export const NewBusinessTrip = () => {
    return (
        <section className={'flex flex-col gap-10'}>
            <span className={'text-2xl'}>Новая командировка</span>
            <article className={'flex items-center justify-between'}>
                <Step stepNumber={1}/>
                <Progress percent={25} showInfo={false} className={'w-1/3 h-4'} size={[270, 16]}/>
            </article>
        </section>
    );
};

