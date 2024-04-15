import React from 'react';
import {ColSpan8} from "../WrapperForConditionsTabs/ColSpan8";
import {FormFinancing} from "./FormFinancing";
import {Button, Col} from "antd";
import {keysTabsBusinessTrip, setCondition} from "../../../../../../store/reducers/FormReducers/StaffStepFormBusinessTrip";
import {useDispatch} from "react-redux";
import {WrapperForConditionsTabs} from "../WrapperForConditionsTabs/WrapperForConditionsTabs";
import {ColSpan16RowGutter16} from "../WrapperForConditionsTabs/ColSpan16RowGutter16";

export const Financing = () => {

    const dispatch = useDispatch()

    return (
        <WrapperForConditionsTabs>
            <ColSpan16RowGutter16>
                <FormFinancing/>
                <Col span={12}>
                    <div className={`flex gap-5 mt-5`}>
                        <Button type={'default'} shape={'round'} className={`h-10 w-max 
                                    border-[#3073D7]`}
                            onClick={() => {
                                dispatch(setCondition(keysTabsBusinessTrip.livingConditions))
                            }}>
                            <span className={`text-lg 
                                   text-[#3073D7]`}>
                                Назад
                            </span>
                        </Button>

                        <Button
                            type={'primary'}
                            shape={'round'}
                            className={'h-10 w-max'}
                            onClick={() => {
                                dispatch(setCondition(keysTabsBusinessTrip.result))
                            }}
                        >
                            <span className={'text-lg'}>Далее</span>
                        </Button>
                    </div>
                </Col>
            </ColSpan16RowGutter16>

            <ColSpan8>

            </ColSpan8>
        </WrapperForConditionsTabs>
    );
};

