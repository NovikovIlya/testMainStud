import React from 'react';
import {Button, Col, ConfigProvider, Table, TableProps} from "antd";
import {TitleHeadCell} from "./titleHeadCell/TitleHeadCell";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../../store";
// import {IDataFormStepTwo} from "../../../../../../store/reducers/FormReducers/StepFormBusinessTrip";


interface DataType {
    // key: string
    address: string
    inn: string
    organization: string
    startDate: string
    endDate: string
    rangeDate: string
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: <TitleHeadCell title={'Адрес'}/>,
        dataIndex: 'address',
        align: "center",
    },
    {
        title: <TitleHeadCell title={'ИНН организации'}/>,
        dataIndex: 'inn',
        align: "center",
    },
    {
        title: <TitleHeadCell title={'Организация'}/>,
        dataIndex: 'organization',
        align: "center",
    },
    {
        title: <TitleHeadCell title={'Дата начала'}/>,
        dataIndex: 'startDate',
        align: "center",
    },
    {
        title: <TitleHeadCell title={'Дата окончания'}/>,
        dataIndex: 'endDate',
        align: "center",
    },
    {
        title: <TitleHeadCell title={'Продолжительность'}/>,
        dataIndex: 'rangeDate',
        align: "center",
    }
];


interface ITableStepTwo{
    notVisibleTable: () => void
    nextStep: () => void
}



export const TableStepTwo = ({notVisibleTable, nextStep}: ITableStepTwo) => {

    // const data: DataType[] = [
    //     {
    //         // key: '1',
    //         address: useSelector((state: RootState) => state.FormStepTwo.address),
    //         inn: useSelector((state: RootState) => state.FormStepTwo.inn),
    //         organization:  useSelector((state: RootState) => state.FormStepTwo.organisation),
    //         startDate:  useSelector((state: RootState) => state.FormStepTwo.startDate),
    //         endDate:  useSelector((state: RootState) => state.FormStepTwo.endDate),
    //         rangeDate:  useSelector((state: RootState) => state.FormStepTwo.rangeDate),
    //     }
    // ]


    return (
        <div className={'flex flex-col gap-5'}>
            <ConfigProvider
                theme={{
                    token: {
                        fontSize: 16,
                    },
                }}
            >
                {/*<Table*/}
                {/*    bordered*/}
                {/*    columns={columns}*/}
                {/*    dataSource={tableData}*/}
                {/*    pagination={false}*/}
                {/*/>*/}
            </ConfigProvider>
            <div className={'flex gap-5'}>
                <Button
                    type={'primary'}
                    shape={'round'}
                    className={'h-10 w-max'}
                    onClick={notVisibleTable}
                >
                    <span className={'text-lg'}>Назад</span>
                </Button>

                <Button
                    type={'primary'}
                    shape={'round'}
                    className={'h-10 w-max'}
                    onClick={nextStep}
                >
                    <span className={'text-lg'}>Далее</span>
                </Button>

                <ConfigProvider theme={{
                    components: {
                        Button: {
                            defaultColor: '#0958d9',
                            defaultBorderColor: '#0958d9',
                            defaultHoverColor: 'white',
                            defaultHoverBg: '#0958d9',
                        }
                    }
                }}>
                    <Button
                        type={'default'}
                        shape={'round'}
                        className={'h-10 w-max'}
                    >
                        <span className={'text-lg'}>Редактировать</span>
                    </Button>
                </ConfigProvider>

            </div>
        </div>
    );
};

