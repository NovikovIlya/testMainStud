import React, {ReactNode} from 'react';
import {Col} from "antd";

interface IColSpan8 {
    children: ReactNode
}

export const ColSpan8 = ({children}: IColSpan8) => {
    return (
        <Col span={8}>
            {children}
        </Col>
    );
};

