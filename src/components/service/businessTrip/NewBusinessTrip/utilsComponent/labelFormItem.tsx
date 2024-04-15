import React from 'react';

interface ILabelFormItem {
    label: string
}

export const LabelFormItem = ({label}: ILabelFormItem) => {
    return (
        <span className={'text-lg'}>
            {label}
        </span>
    );
};

