import React from 'react';
import { ITitleForm } from '../../../../../../models/businessTrip';



export const TitleForm = ({title}: ITitleForm) => {
    return (
        <span className={'text-xl'}>
            {title}
        </span>
    );
};

