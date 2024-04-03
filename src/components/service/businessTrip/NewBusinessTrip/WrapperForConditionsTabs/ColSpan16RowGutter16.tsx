import React, {ReactNode} from 'react';
import {Col, Row} from "antd";

interface IColSpan16RowGutter16 {
    children: ReactNode
}

export const ColSpan16RowGutter16 = ({children}: IColSpan16RowGutter16) => {
    return (
        <Col span={16}>
            <Row gutter={[16, 16]}>
                {children}
            </Row>
        </Col>
    );
};

