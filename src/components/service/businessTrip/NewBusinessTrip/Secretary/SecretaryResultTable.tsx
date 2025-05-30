import React from 'react';
import {Col, Row, Table, TableProps} from "antd";
import {TitleHeadCell} from "../archive/stepTwo/tableStepTwo/titleHeadCell/TitleHeadCell";

interface GeneralProperty {
    key: string
    // edit: ReactNode
    // delete: ReactNode
}
interface ColumnsOne extends GeneralProperty{
    address: string
    startDate: string
    endDate: string
    rangeDate: string
}
interface ColumnsTwo extends GeneralProperty{
    typeTransport: string
    departurePoint: string
    destinationPoint: string
    departureDate: string
    arrivalDate: string
    cost: number
}
interface ColumnsThree extends GeneralProperty {
    country: string
    locality: string
    livingConditions: string
    checkInDate: string
    departureDate: string
    costPerDay: number
}
interface ColumnsFour extends GeneralProperty {
    code: string
    name: string
    decoding: string
    currency: string
    cost: number
    topic: string
}


const columnsOne: TableProps<ColumnsOne>['columns'] = [
    {
        title: <TitleHeadCell title={'Адрес'}/>,
        dataIndex: 'address',
        align: "left",
        width: 200
    },
    {
        title: <TitleHeadCell title={'Начало'}/>,
        dataIndex: 'startDate',
        align: "left",
        width: 150
    },
    {
        title: <TitleHeadCell title={'Конец'}/>,
        dataIndex: 'endDate',
        align: "left",
        width: 150

    },
    {
        title: <TitleHeadCell title={'Колчество дней'}/>,
        dataIndex: 'rangeDate',
        align: "left",

    },

    // {
    //     title: <TitleHeadCell title={''}/>,
    //     dataIndex: 'edit',
    //     align: "right",
    // },
    // {
    //     title: <TitleHeadCell title={''}/>,
    //     dataIndex: 'delete',
    //     align: "center",
    // }
]
const columnsTwo: TableProps<ColumnsTwo>['columns'] = [
    {
        title: <TitleHeadCell title={'Вид транспорта'}/>,
        dataIndex: 'typeTransport',
        align: "left",
        width: 200
    },
    {
        title: <TitleHeadCell title={'Пункт отправления'}/>,
        dataIndex: 'departurePoint',
        align: "left",
        width: 150
    },
    {
        title: <TitleHeadCell title={'Пункт назначения'}/>,
        dataIndex: 'destinationPoint',
        align: "left",
        width: 150
    },
    {
        title: <TitleHeadCell title={'Дата отправления'}/>,
        dataIndex: 'departureDate',
        align: "left",
        width: 150
    },

    {
        title: <TitleHeadCell title={'Дата прибытия'}/>,
        dataIndex: 'arrivalDate',
        align: "left",
        width: 150
    },

    {
        title: <TitleHeadCell title={'Стоимость'}/>,
        dataIndex: 'cost',
        align: "left",

    },
]
const columnsThree: TableProps<ColumnsThree>['columns'] = [
    {
        title: <TitleHeadCell title={'Страна'}/>,
        dataIndex: 'country',
        align: "left",
        width: 200
    },
    {
        title: <TitleHeadCell title={'Населенный пункт'}/>,
        dataIndex: 'locality',
        align: "left",
        width: 150
    },
    {
        title: <TitleHeadCell title={'Условия проживания'}/>,
        dataIndex: 'livingConditions',
        align: "left",
        width: 150
    },
    {
        title: <TitleHeadCell title={'Дата заезда'}/>,
        dataIndex: 'checkInDate',
        align: "left",
        width: 150
    },
    {
        title: <TitleHeadCell title={'Дата выезда'}/>,
        dataIndex: 'departureDate',
        align: "left",
        width: 150
    },
    {
        title: <TitleHeadCell title={'Стоимость за сутки'}/>,
        dataIndex: 'costPerDay',
        align: "left",

    },
]
const columnsFour: TableProps<ColumnsFour>['columns'] = [
    {
        title: <TitleHeadCell title={'Код'}/>,
        dataIndex: 'code',
        align: "left",
        width: 200
    },
    {
        title: <TitleHeadCell title={'Наименования'}/>,
        dataIndex: 'name',
        align: "left",
        width: 150
    },
    {
        title: <TitleHeadCell title={'Расшифровка'}/>,
        dataIndex: 'decoding',
        align: "left",
        width: 150
    },
    {
        title: <TitleHeadCell title={'Валюта'}/>,
        dataIndex: 'currency',
        align: "left",
        width: 150
    },
    {
        title: <TitleHeadCell title={'Стоимость'}/>,
        dataIndex: 'cost',
        align: "left",
        width: 150
    },
    {
        title: <TitleHeadCell title={'Тема'}/>,
        dataIndex: 'topic',
        align: "left",
    },
]


export const SecretaryResultTable = () => {

    const dataColumnsOne: ColumnsOne[] = [
        {
            key: '1',
            address: 'Москва, Кремлёвская наб., 1, к1, кв 111',
            startDate: '21.10.23',
            endDate: '30.10.23',
            rangeDate: '9',
        },
    ]

    const dataColumnsTwo: ColumnsTwo[] = [
        {
            key: '1',
            typeTransport: 'Самолет',
            departurePoint: 'Казань',
            destinationPoint: 'Москва',
            departureDate: '01.03.2024',
            arrivalDate: '07.03.2024',
            cost: 5000,
        },
    ]

    const dataColumnsThree: ColumnsThree[] = [
        {
            key: '1',
            country: 'Россия',
            locality: 'Казань',
            livingConditions: 'Хостел',
            checkInDate: '01.03.2024',
            departureDate: '07.03.2024',
            costPerDay: 5000,
        }
    ]

    const dataColumnsFour: ColumnsFour[] = [
        {
            key: '1',
            code: 'Россия',
            name: 'Мероприятие',
            decoding: 'Повышение квалификации',
            currency: 'Рубли',
            cost: 999999,
            topic: 'Повышение квалификации',
        }
    ]


    return (
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <Table
                    columns={columnsOne}
                    pagination={false}
                    size={"middle"}
                    dataSource={dataColumnsOne}

                />
            </Col>
            <Col span={24}>
                <Table
                    columns={columnsTwo}
                    pagination={false}
                    size={"middle"}
                    dataSource={dataColumnsTwo}
                />
            </Col>
            <Col span={24}>
                <Table
                    columns={columnsThree}
                    pagination={false}
                    size={"middle"}
                    dataSource={dataColumnsThree}
                />
            </Col>
            <Col span={24}>
                <Table
                    columns={columnsFour}
                    pagination={false}
                    size={"middle"}
                    dataSource={dataColumnsFour}
                />
            </Col>
        </Row>
    );
};

