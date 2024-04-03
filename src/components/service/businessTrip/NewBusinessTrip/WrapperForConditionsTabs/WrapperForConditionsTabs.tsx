import React, {ReactNode} from 'react';
import {Col, Form, Row} from "antd";

interface IWrapperForConditionsTabs {
    children: ReactNode
}

export const WrapperForConditionsTabs = ({children}: IWrapperForConditionsTabs) => {
    return (
        <Form layout={'vertical'}>
            <Row gutter={[16, 0]} className={`w-full
            `}>
                {children}
            </Row>
        </Form>
    );
};

