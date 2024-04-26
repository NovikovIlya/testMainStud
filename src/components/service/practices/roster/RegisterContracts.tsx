import {
    Button,
    Checkbox,
    CheckboxProps,
    Col, DatePicker,
    GetProp,
    List,
    Radio,
    Row,
    Select,
    Space, Table,
    TableProps,
    Typography
} from 'antd'
import React, {useEffect, useState} from 'react'
import './RegisterContracts.scss'
import {
    TitleHeadCell
} from "../../businessTrip/NewBusinessTrip/archive/stepTwo/tableStepTwo/titleHeadCell/TitleHeadCell";
import {EditSvg} from "../../../../assets/svg/EditSvg";
import {PointsSvg} from "../../../../assets/svg/PointsSvg";

type PropsType = {
    setIsCreate: (value: boolean) => void
    setIsPreview: (value: boolean) => void
    setIsFinalReview: (value: boolean) => void
    setEdit: (value: string) => void
    setPreview: (value: string) => void
}

interface ColumnsTableCompressedView {
    key: string
    contractFacility: string
    dateFiling: string
    contractType: string
    dateConclusionContract: string
}

interface ColumnsTableFull {
    key: string
    nameOrg: string
    nameSpecialty: string
    contractNumber: string
    dateConclusionContract: string
    contractType: string
    contractPeriod: string
    cipherNameSpecialty: string
    legalAddress: string
    actualAddress: string
    numberSeats: string
    links: string
}





const columnsCompressedView: TableProps<ColumnsTableCompressedView>['columns'] = [
    {
        title: <TitleHeadCell title={'Наименование организации'}/>,
        dataIndex: 'contractFacility',
        align: "left",
        width: 150,
        render: (text, record) =>
            <div className={'flex items-center'}>
                    <span className={'underline flex w-[200px]'}>
                        {text}
                    </span>
                <Button
                    type="text"
                    icon={<EditSvg/>}
                    onClick={() => console.log(record.key)}
                />
            </div>
    },
    {
        title: <TitleHeadCell title={'Дата заполнения'}/>,
        dataIndex: 'dateFiling',
        align: "center",
        width: 150
    },
    {
        title: <TitleHeadCell title={'Тип договора'}/>,
        dataIndex: 'contractType',
        align: "center",
        width: 150

    },
    {
        title: <TitleHeadCell title={'Дата заключения договора'}/>,
        dataIndex: 'dateConclusionContract',
        align: "center",
        width: 150
    },
    {
        title:
            <Button
                type="text"
                className="opacity-50"
                icon={<PointsSvg/>}
            />,
        width: 200,
        align: 'center',
        render: (record) =>
            <Button
                type="text"
                className="opacity-50"
                icon={<PointsSvg/>}
                onClick={() => console.log(record.key)}
            />,
    }
]
const columnsFullView: TableProps<ColumnsTableFull>['columns'] = [
    {
        title: <span className={'text-xs'}>Наименование организации</span>,
        dataIndex: 'nameOrg',
        align: "left",
        className: 'text-xs',
        width: 100,
        render: (text, record) =>
            <div className={'flex items-center'}>
                    <span className={'underline flex w-[200px]'}>
                        {text}
                    </span>
                <Button
                    type="text"
                    icon={<EditSvg/>}
                    onClick={() => console.log(record.key)}
                />
            </div>
    },
    {
        title: <span className={'text-xs'}>Наименование специальности</span>,
        dataIndex: 'nameSpecialty',
        align: "left",
        className: 'text-xs'
        //width: '10%'
    },
    {
        title: <span className={'text-xs'}>Номер договора</span>,
        dataIndex: 'contractNumber',
        align: "center",
        className: 'text-xs'
        //width: 100
    },
    {
        title: <span className={'text-xs'}>Дата заключения договора</span>,
        dataIndex: 'dateConclusionContract',
        align: "center",
        className: 'text-xs'
        //width: 100
    },
    {
        title: <span className={'text-xs'}>Тип договора</span>,
        dataIndex: 'contractType',
        align: "center",
        className: 'text-xs'
        //width: 100
    },
    {
        title: <span className={'text-xs'}>Срок действия договора</span>,
        dataIndex: 'contractPeriod',
        align: "center",
        className: 'text-xs'
        //width: 100
    },
    {
        title: <span className={'text-xs'}>Шифр и наименование специальности</span>,
        dataIndex: 'cipherNameSpecialty',
        align: "center",
        className: 'text-xs'
        //width: 100
    },
    {
        title: <span className={'text-xs'}>Юридический адрес организации</span>,
        dataIndex: 'legalAddress',
        align: "center",
        className: 'text-xs'
        //width: 100
    },
    {
        title: <span className={'text-xs'}>Фактический адрес организации</span>,
        dataIndex: 'actualAddress',
        align: "center",
        className: 'text-xs'
        //width: 100
    },
    {
        title: <span className={'text-xs'}>Количество мест</span>,
        dataIndex: 'numberSeats',
        align: "center",
        className: 'text-xs'
        //width: 100
    },
    {
        title: <span className={'text-xs'}>Ссылки</span>,
        dataIndex: 'links',
        align: "center",
        width: 100,
        className: 'text-xs'
    },
    {
        title:
            <Button
                type="text"
                className="opacity-50"
                icon={<PointsSvg/>}
            />,
        align: 'center',
        render: (record) =>
            <Button
                type="text"
                className="opacity-50"
                icon={<PointsSvg/>}
                onClick={() => console.log(record.key)}
            />,
        fixed: "right",
        width: 50

    }
]


const optionsNameSpecialty = [
    {
        value: '',
        label: 'Все'
    },
    {
        value: '31.08.01 Акушерство и гинекология',
        label: '31.08.01 Акушерство и гинекология'
    }
]
const optionsTypeContract = [
    {value: '', label: 'Все'},
    {value: 'Бессрочный', label: 'Бессрочный'},
    {value: 'С пролонгацией', label: 'С пролонгацией'}
]
const optionsNameOrg = [
    {value: '', label: 'Все'},
    {
        value: 'Лечебно-профилактическое учреждение по договору',
        label: 'Лечебно-профилактическое учреждение по договору'
    }
]
const mockDataCompressed: ColumnsTableCompressedView[] = [
    {
        key: '1',
        contractFacility: 'Лечебно-профилактическое учреждение по договору',
        dateFiling: '00.00.00, 00:00',
        contractType: 'Бессрочный',
        dateConclusionContract: '12.12.2012'
    },
    {
        key: '2',
        contractFacility: 'Лечебно-профилактическое учреждение по договору',
        dateConclusionContract: '12.12.2012',
        contractType: 'Бессрочный',
        dateFiling: '00.00.00, 00:00'
    },
]
const mockDataFull: ColumnsTableFull[] = [
    {
        key: '1',
        nameOrg: 'Медико-санитарная часть ФГАОУ ВО КФУ',
        nameSpecialty: '12.456 Лечебное дело',
        contractNumber: '№1.1.2.77.2.45-04/10/2022',
        dateConclusionContract: '02.09.2022',
        contractType: 'Пролонгация 1 год. Потом бессрочный',
        contractPeriod: 'Бессрочный',
        cipherNameSpecialty: 'Ортодонтия',
        legalAddress: 'ул. Оренбургский тракт, 138, Казань, Респ. Татарстан',
        actualAddress: 'ул. Оренбургский тракт, 138, Казань, Респ. Татарстан',
        numberSeats: '150',
        links: 'Cкан договора'
    }
]

export const RegisterContracts = () => {
    const [tableDataCompressed, setTableDataCompressed] = useState<ColumnsTableCompressedView[]>(mockDataCompressed)
    const [tableDataFull, setTableDataFull] = useState<ColumnsTableFull[]>(mockDataFull)
    const [tableView, setTableView] = useState({
        compressed: true,
        table: false
    })

    function isCompressedTable() {
        setTableView({
            compressed: true,
            table: false
        })
    }

    function isFullTable() {
        setTableView({
            compressed: false,
            table: true
        })
    }

    return (
        <section className={'container'}>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Typography.Text className=" text-[28px] mb-14">
                        Реестр договоров
                    </Typography.Text>
                </Col>
            </Row>

            <Row gutter={[16, 16]} className={'mt-12'}>
                <Col span={12} className={'flex items-center gap-0'}>
                    {tableView.table &&
                        <Col span={8} className={'flex items-center gap-2'}>
                            <span className={'whitespace-nowrap'}>Количество мест</span>
                            <Select
                                popupMatchSelectWidth={false}
                                defaultValue={""}
                                options={[{value: 100, label: 100}]}
                            />
                        </Col>
                    }

                    <Col span={16} className={'flex gap-2 items-center'}
                         style={{
                             paddingRight: 0,
                             paddingLeft: tableView.table ? 16 : 8
                         }}>
                        <span className={'whitespace-nowrap'}>Дата заключения договора</span>
                        <DatePicker className={'w-full'}
                                    placeholder={'ДД.ММ.ГГ'}
                                    format={'DD.MM.YYYY'}/>
                    </Col>
                </Col>
                <Col span={3} offset={9}>
                    <Button type={"primary"}>Создать договор</Button>
                </Col>
            </Row>
            <Row gutter={[16, 16]} className={'mt-4'}>
                <Col span={12} className={'flex items-center gap-2'}>
                    <Col span={8}>
                        <span className={'whitespace-nowrap'}>Наименование организации</span>
                    </Col>
                    <Col span={16}>
                        <Select
                            popupMatchSelectWidth={false}
                            defaultValue=""
                            className="w-full"
                            options={optionsNameOrg}
                        />
                    </Col>
                </Col>
            </Row>
            {
                tableView.table
                &&
                <Row gutter={[16, 16]} className={'mt-4'}>
                    <Col span={12} className={'flex items-center gap-2'}>
                        <Col span={8}>
                            <span className={'whitespace-nowrap'}>Наименование специальности</span>
                        </Col>
                        <Col span={16}>
                            <Select
                                popupMatchSelectWidth={false}
                                defaultValue=""
                                className="w-full"
                                options={optionsNameSpecialty}
                            />
                        </Col>
                    </Col>
                </Row>
            }
            <Row gutter={[16, 16]} className={'mt-4'}>
                <Col span={12} className={'flex items-center gap-2'}>
                    <Col span={8}>
                        <span className={'whitespace-nowrap'}>Тип договора</span>
                    </Col>
                    <Col span={16}>
                        <Select
                            popupMatchSelectWidth={false}
                            defaultValue=""
                            className="w-full"
                            options={optionsTypeContract}
                        />
                    </Col>
                </Col>
            </Row>
            <Row className="mt-4 flex items-center">
                <Col span={12} flex="50%">
                    <Radio.Group defaultValue="compressedView" buttonStyle="solid">
                        <Radio.Button
                            onClick={isCompressedTable}
                            value="compressedView"
                            className="!rounded-l-full">
                            Посмотреть в сжатом виде
                        </Radio.Button>
                        <Radio.Button
                            onClick={isFullTable}
                            value="tableView"
                            className="!rounded-r-full">
                            Посмотреть данные в таблице
                        </Radio.Button>
                    </Radio.Group>
                </Col>
                <Col span={8} offset={4}>
                    <div className={'flex gap-2 items-center'}>
                        <span className={'mr-2'}>Сортировка</span>
                        <Select
                            popupMatchSelectWidth={false}
                            defaultValue="1"
                            className="w-full"
                            options={[{value: '1', label: 'Все'}]}/>
                    </div>

                </Col>
            </Row>

            {
                tableView.compressed
                &&
                <div className={'registerContracts'}>
                    <Table
                        columns={columnsCompressedView}
                        pagination={false}
                        size={"middle"}
                        dataSource={tableDataCompressed}
                        rowSelection={{type: "checkbox"}}
                    />
                </div>
            }

            {
                tableView.table
                &&

                    <Table columns={columnsFullView}
                           pagination={false}
                           dataSource={tableDataFull}
                           size={"middle"}
                           className={'mt-5'}
                    />


            }


        </section>
    )
}
