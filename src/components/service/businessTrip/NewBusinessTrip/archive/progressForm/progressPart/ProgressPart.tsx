import React from 'react';
import {ConfigProvider, Progress} from "antd";
import { IProgressPart } from '../../../../../../../models/businessTrip';


export const ProgressPart = ({step}: IProgressPart) => {
    return (
        <div className={'flex flex-col items-center pt-6'}>
            <ConfigProvider
                theme={{
                    components: {
                        Progress: {
                            defaultColor: '#65A1FA'
                        }
                    }
                }}>
                <Progress percent={20 * step}
                          showInfo={false}
                          size={[230, 16]}

                />
            </ConfigProvider>
            <span className={'text-lg'}>{step} из 5</span>
        </div>
    );
};

