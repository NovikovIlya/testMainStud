import React from 'react';
import {Button} from "antd";
import {PlusSvg} from "../../../../../assets/svg/PlusSvg";

interface IButtonAddData {
    addData: () => void
    nameData: string
}

export const ButtonAddData = ({addData, nameData}: IButtonAddData) => {
    return (
        <div className={`
                        flex
                        gap-4
                        mr-[8px]
                    `}>
            <Button
                icon={<PlusSvg/>}
                type={'primary'}
                className={`
                                h-[32px]
                                rounded-full
                            `}
                onClick={addData}
            >
            </Button>
            <span className={`
                            text-[#B3B3B3]
                            text-lg
                        `}>
                Добавить {nameData}
            </span>
        </div>
    );
};

