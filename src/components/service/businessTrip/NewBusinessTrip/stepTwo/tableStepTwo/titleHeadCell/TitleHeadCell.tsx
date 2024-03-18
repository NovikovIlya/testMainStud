import React from 'react';

interface ITitleHeadCell {
    title: string
}

export const TitleHeadCell = ({title}: ITitleHeadCell) => {
    return (
        <span className={'text-lg font-bold'}>
            {title}
        </span>
    );
};

