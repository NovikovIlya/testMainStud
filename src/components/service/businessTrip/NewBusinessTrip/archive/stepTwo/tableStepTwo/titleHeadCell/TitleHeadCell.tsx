import React from 'react';

interface ITitleHeadCell {
    title: string
}

export const TitleHeadCell = ({title}: ITitleHeadCell) => {
    return (
        <span className={'opacity-60 text-[14px]'}>
            {title}
        </span>
    );
};

