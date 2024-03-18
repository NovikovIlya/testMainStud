import React from 'react';
import {Step} from "./step/Step";
import {ProgressPart} from "./progressPart/ProgressPart";

interface IProgressForm {
    step: number
    nextStep: () => void
    previousStep: () => void
    availableLeftButton?: boolean
    availableRightButton?: boolean
}

export const ProgressForm = (props: IProgressForm) => {
    return (
        <article className={'flex items-center justify-between'}>
            <Step stepNumber={props.step}
                  availableLeftButton={props.availableLeftButton}
                  availableRightButton={props.availableRightButton}
                  nextStep={props.nextStep}
                  previousStep={props.previousStep}
            />
            <ProgressPart step={props.step}/>
        </article>
    );
};

