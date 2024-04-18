import React from 'react';
import {useParams} from "react-router-dom";
import {Space, Spin} from "antd";

export const Redirect = () => {
    const params = useParams()

    return (
        <div className={'w-full h-screen flex items-center justify-center'}>
            <div className={'flex flex-col gap-5'}>
                <Spin size={'large'}/>
                <span>Выполняется переадресация: {params.id}</span>
            </div>

        </div>
    );
};

