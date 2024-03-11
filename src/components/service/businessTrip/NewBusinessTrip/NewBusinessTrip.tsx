import React, {useState} from 'react';
import {StepOne} from "./stepOne/StepOne";
import {ProgressForm} from "./progressForm/ProgressForm";
import {StepTwo} from "./stepTwo/StepTwo";



export const NewBusinessTrip = () => {

    const [step, setStep] = useState(1)

    function nextStep() {
        if (step < 4) setStep(step => step + 1)
    }

    function previousStep() {
        if (step > 1) setStep(step => step - 1)
    }

    //availableRightButton должен ещё зависеть от того, заполнена ли форма(но это надо уточнить)
    return (
        <section className={'flex flex-col gap-5'}>
            <span className={'text-2xl'}>Новая командировка</span>
            <ProgressForm
                step={step}
                availableLeftButton={step !== 1}
                availableRightButton={step !== 4}
                nextStep={nextStep}
                previousStep={previousStep}
            />
            {step === 1 && <StepOne nextStep={nextStep}/>}
            {step === 2 && <StepTwo/>}

        </section>
    );
};

