import React from 'react';
import {Step} from "./step/Step";
import {ProgressPart} from "./progressPart/ProgressPart";

interface IProgressForm {
    step: number
    //позже нужно добавить ссылку на переход в другую страницу для компонента Step
    //позже нужно добавить состояния недоступности кнопки для компонента Step
}

export const ProgressForm = ({step}: IProgressForm) => {
    return (
        <article className={'flex items-center justify-between'}>
            <Step stepNumber={step}/>
            <ProgressPart step={step}/>
        </article>
    );
};

