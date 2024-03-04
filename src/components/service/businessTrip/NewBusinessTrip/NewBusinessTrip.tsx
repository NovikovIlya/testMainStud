import React from 'react';
import {ProgressForm} from "./progressForm/ProgressForm";
import {EmployeeDataPageForm} from "./employeeDataPageForm/employeeDataPageForm";


export const NewBusinessTrip = () => {
    return (
        <section className={'flex flex-col gap-5'}>
            <span className={'text-2xl'}>Новая командировка</span>
            <ProgressForm step={1}/>
            <EmployeeDataPageForm/>
        </section>
    );
};

