import React from 'react';
import {ButtonLeftBusinessTripSvg} from "../../../../../../assets/svg/ButtonLeftBusinessTripSvg";
import {ButtonRightBusinessTripSvg} from "../../../../../../assets/svg/ButtonRightBusinessTripSvg";
import clsx from "clsx";
import {NavLink, useNavigate} from "react-router-dom";
import {stepBusinessTrip} from "../../../../../../utils/navListForLeftMenu/stepBusinessTrip";

interface IStep {
    stepNumber: number
    nextStep: () => void
    previousStep: () => void
    availableLeftButton?: boolean
    availableRightButton?: boolean
}

export const Step = ({stepNumber, availableRightButton, availableLeftButton, nextStep, previousStep}: IStep) => {

    return (
        <div className={'flex gap-5 items-center'}>
            <button className={
                clsx('border-none bg-inherit',
                    !availableLeftButton && 'opacity-40',
                    availableLeftButton && 'cursor-pointer'
                )}
                    onClick={previousStep}
            >
                <ButtonLeftBusinessTripSvg/>
            </button>
            <span className={'text-2xl font-bold mb-2'}>Шаг {stepNumber}</span>
            <button className={
                clsx('border-none bg-inherit',
                    !availableRightButton && 'opacity-40',
                    availableRightButton && 'cursor-pointer'
                )}
                    onClick={nextStep}
            >
                <ButtonRightBusinessTripSvg/>
            </button>
        </div>
    );
};

