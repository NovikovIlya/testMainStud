import React, {ReactNode} from 'react';


type TypeQuestion = {
    text: string
    icon: ReactNode
}
export const TextWithSvg = ({text, icon}: TypeQuestion) => {
    return (
        <div className={'flex gap-3 items-center p-[5px]'}>
            {icon}
            <span className={`text-lg`}>{text}</span>
        </div>
    );
};

