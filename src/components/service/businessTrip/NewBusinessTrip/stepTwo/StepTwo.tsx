import React, {useEffect, useState} from 'react';
import {TitleForm} from "../titleForm/TitleForm";
import {
    ConfigProvider,
    Tooltip,
} from "antd";
import {ToolTipSvg} from "../../../../../assets/svg/ToolTipSvg";
import {FormStepTwo} from "./formStepTwo/formStepTwo";
import {TableStepTwo} from "./tableStepTwo/tableStepTwo";


interface IStepTwo {
    previousStep: () => void
    nextStep: () => void
}

export const StepTwo = ({previousStep, nextStep}: IStepTwo) => {
    const toolTip = 'В блоке фиксируются место и сроки командирования работника (подотчетного лица). Если работник едет последовательно в несколько мест, то необходимо внести данные про все места командирования.'
    const [tableDisplay, setTableDisplay] = useState(false)

    function visibleTable() {
        setTableDisplay(true)
    }
    function notVisibleTable() {
        setTableDisplay(false)
    }

    return (
        <div className={'flex flex-col gap-5'}>
            <div className={'flex gap-2 items-center'}>
                <TitleForm title={'Места и сроки командирования'}/>
                <ConfigProvider
                    theme={{
                        token: {
                            colorBgSpotlight: 'white',
                            colorTextLightSolid: 'black'
                        }
                    }}
                >
                    <Tooltip
                        placement={"bottomLeft"}
                        title={toolTip}
                        className={'pt-2'}
                    >
                        <span> </span>
                        <ToolTipSvg/>
                    </Tooltip>
                </ConfigProvider>
            </div>
            {
                tableDisplay
                ?
                    <TableStepTwo notVisibleTable={notVisibleTable} nextStep={nextStep}/>
                    :
                    <FormStepTwo previousStep={previousStep} setTableDisplay={visibleTable}/>
            }
        </div>
    );
};

