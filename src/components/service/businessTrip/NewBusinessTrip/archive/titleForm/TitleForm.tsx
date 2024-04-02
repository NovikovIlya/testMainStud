import React from 'react';

interface ITitleForm {
    title: string
}

export const TitleForm = ({title}: ITitleForm) => {
    return (
        <span className={'text-xl'}>
            {title}
        </span>
    );
};

