import React from 'react';
import {ButtonLeftBusinessTripSvg} from "../../../../../assets/svg/ButtonLeftBusinessTripSvg";
import {ButtonRightBusinessTripSvg} from "../../../../../assets/svg/ButtonRightBusinessTripSvg";

interface IStep {
    stepNumber: number
    //позже нужно добавить ссылку на переход в другую страницу
    //позже нужно добавить состояния недоступности кнопки
}

export const Step = (props: IStep) => {
    return (
        <div className={'flex gap-5 items-center'}>
            <button className={'cursor-pointer border-none bg-inherit'}>
                <ButtonLeftBusinessTripSvg/>
            </button>
            <span className={'text-2xl font-bold mb-2'}>Шаг {props.stepNumber}</span>
            <button className={'cursor-pointer border-none bg-inherit'}>
                <ButtonRightBusinessTripSvg/>
            </button>
        </div>
    );
};

