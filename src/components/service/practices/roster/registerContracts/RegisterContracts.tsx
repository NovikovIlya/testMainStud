import {
    Button,
    Col,
    DatePicker,
    Input,
    InputNumber,
    Popover,
    Radio,
    Row,
    Select,
    Table,
    TableProps,
    Typography
} from 'antd'
import React, {ChangeEvent, useEffect, useState} from 'react'
import './RegisterContracts.scss'
import {
    TitleHeadCell
} from "../../../businessTrip/NewBusinessTrip/archive/stepTwo/tableStepTwo/titleHeadCell/TitleHeadCell";
import {EditSvg} from "../../../../../assets/svg/EditSvg";
import {PointsSvg} from "../../../../../assets/svg/PointsSvg";
import dayjs from "dayjs";
import clsx from "clsx";
import {RegisterPopoverContent} from "../../popover/register/RegisterPopoverContent";
import {RegisterPopoverMain} from "../../popover/register/RegisterPopoverMain";
import {useNavigate} from "react-router-dom";
import printJS from "print-js";


export interface ColumnsTableCompressedView {
    key: string
    contractFacility: string
    dateFiling: string
    contractType: string
    dateConclusionContract: string
}

export interface ColumnsTableFull {
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

const mockDataCompressed: ColumnsTableCompressedView[] = [
    {
        key: '1',
        contractFacility: 'Лечебно-профилактическое учреждение по договору',
        dateFiling: '00.00.00',
        contractType: 'Бессрочный',
        dateConclusionContract: '2024-04-24'
    },
    {
        key: '2',
        contractFacility: 'Лечебно-профилактическое учреждение по договору',
        dateConclusionContract: '2024-04-25',
        contractType: 'С пролонгацией',
        dateFiling: '00.00.00'
    },
    {
        key: '3',
        contractFacility: 'Тест 3',
        dateConclusionContract: '2024-04-26',
        contractType: 'Бессрочный',
        dateFiling: '00.00.00'
    },
    {
        key: '4',
        contractFacility: 'Тест 4',
        dateConclusionContract: '2024-04-27',
        contractType: 'С пролонгацией',
        dateFiling: '00.00.00'
    },
    {
        key: '5',
        contractFacility: 'Тест 4',
        dateConclusionContract: '2024-04-26',
        contractType: 'С пролонгацией',
        dateFiling: '00.00.00'
    },
]
const mockDataFull: ColumnsTableFull[] = [
    {
        key: '1',
        nameOrg: 'Лечебно-профилактическое учреждение по договору',
        nameSpecialty: '12.456 Лечебное дело',
        contractNumber: '№1.1.2.77.2.45-04/10/2022',
        dateConclusionContract: '2024-04-27',
        contractType: 'С пролонгацией',
        contractPeriod: 'Бессрочный',
        cipherNameSpecialty: 'Ортодонтия',
        legalAddress: 'ул. Оренбургский тракт, 138, Казань, Респ. Татарстан',
        actualAddress: 'ул. Оренбургский тракт, 138, Казань, Респ. Татарстан',
        numberSeats: '150',
        links: 'Cкан договора'
    },
    {
        key: '2',
        nameOrg: 'Тест 3',
        nameSpecialty: '12.456 Лечебное дело',
        contractNumber: '№1.1.2.77.2.45-04/10/2022',
        dateConclusionContract: '2024-04-25',
        contractType: 'Бессрочный',
        contractPeriod: 'Бессрочный',
        cipherNameSpecialty: 'Ортодонтия',
        legalAddress: 'ул. Оренбургский тракт, 138, Казань, Респ. Татарстан',
        actualAddress: 'ул. Оренбургский тракт, 138, Казань, Респ. Татарстан',
        numberSeats: '100',
        links: 'Cкан договора'
    },
    {
        key: '3',
        nameOrg: 'Тест 3',
        nameSpecialty: '31.08.01 Акушерство и гинекология',
        contractNumber: '№1.1.2.77.2.45-04/10/2022',
        dateConclusionContract: '2024-04-25',
        contractType: 'Бессрочный',
        contractPeriod: 'Бессрочный',
        cipherNameSpecialty: 'Ортодонтия',
        legalAddress: 'ул. Оренбургский тракт, 138, Казань, Респ. Татарстан',
        actualAddress: 'ул. Оренбургский тракт, 138, Казань, Респ. Татарстан',
        numberSeats: '100',
        links: 'Cкан договора'
    }
]
export const RegisterContracts = () => {

    const nav = useNavigate()
    const [filter, setFilter] = useState({
        contractType: 'Все',
        nameOrg: 'Все',
        dateConclusionContract: 'Все',
        sortDateConclusionContract: 'По дате (сначала новые)',
        nameSpecialty: 'Все',
        numberSeats: 'Все',

    })
    const [tableDataCompressed, setTableDataCompressed] = useState<ColumnsTableCompressedView[]>(mockDataCompressed)
    const [tableDataFull, setTableDataFull] = useState<ColumnsTableFull[]>(mockDataFull)
    const [tableView, setTableView] = useState({
        compressed: true,
        table: false
    })


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
                        onClick={() => {
                            nav(`/services/practices/registerContracts/editContract/${record.key}`)
                        }}
                    />
                </div>
        },
        {
            title: <TitleHeadCell title={'Дата заполнения'}/>,
            dataIndex: 'dateFiling',
            align: "left",
            width: 150
        },
        {
            title: <TitleHeadCell title={'Тип договора'}/>,
            dataIndex: 'contractType',
            align: "left",
            width: 150

        },
        {
            title: <TitleHeadCell title={'Дата заключения договора'}/>,
            dataIndex: 'dateConclusionContract',
            align: "left",
            width: 150,
            render: (text) => dayjs(text).format('DD.MM.YYYY')
        },
        {
            title:
                <Popover trigger={'click'} content={<RegisterPopoverMain recordCompressed={mockDataCompressed}/>}>
                    <Button
                        type="text"
                        className="opacity-50"
                        icon={<PointsSvg/>}
                    />
                </Popover>,
            width: 200,
            align: 'center',
            render: (record) =>
                <Popover content={<RegisterPopoverContent recordCompressed={record}
                                                          tableDataCompressed={tableDataCompressed}
                                                          setTableDataCompressed={setTableDataCompressed}/>}
                         trigger={'click'}>
                    <Button
                        type="text"
                        className="opacity-50"
                        icon={<PointsSvg/>}
                    />
                </Popover>
        }
    ]
    const columnsFullView: TableProps<ColumnsTableFull>['columns'] = [
        {
            title: <span className={'text-xs'}>Наименование организации</span>,
            dataIndex: 'nameOrg',
            align: "left",
            className: 'text-xs',
            width: 200,
            render: (text, record) =>
                <div className={'flex items-center'}>
                    <span className={'underline flex w-[150px]'}>
                        {text}
                    </span>
                    <Button
                        type="text"
                        icon={<EditSvg/>}
                        onClick={() => nav(`/services/practices/registerContracts/editContract/${record.key}`)}
                    />
                </div>
        },
        {
            title: <span className={'text-xs'}>Наименование специальности</span>,
            dataIndex: 'nameSpecialty',
            align: "left",
            className: 'text-xs'
        },
        {
            title: <span className={'text-xs'}>Номер договора</span>,
            dataIndex: 'contractNumber',
            align: "center",
            className: 'text-xs'
        },
        {
            title: <span className={'text-xs'}>Дата заключения договора</span>,
            dataIndex: 'dateConclusionContract',
            align: "center",
            className: 'text-xs',
            render: (text) => dayjs(text).format('DD.MM.YYYY')
        },
        {
            title: <span className={'text-xs'}>Тип договора</span>,
            dataIndex: 'contractType',
            align: "center",
            className: 'text-xs'
        },
        {
            title: <span className={'text-xs'}>Срок действия договора</span>,
            dataIndex: 'contractPeriod',
            align: "center",
            className: 'text-xs'
        },
        {
            title: <span className={'text-xs'}>Шифр и наименование специальности</span>,
            dataIndex: 'cipherNameSpecialty',
            align: "center",
            className: 'text-xs'
        },
        {
            title: <span className={'text-xs'}>Юридический адрес организации</span>,
            dataIndex: 'legalAddress',
            align: "center",
            className: 'text-xs'
        },
        {
            title: <span className={'text-xs'}>Фактический адрес организации</span>,
            dataIndex: 'actualAddress',
            align: "center",
            className: 'text-xs'
        },
        {
            title: <span className={'text-xs'}>Количество мест</span>,
            dataIndex: 'numberSeats',
            align: "center",
            className: 'text-xs'
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
                <Popover trigger={'click'} content={<RegisterPopoverMain recordFull={mockDataFull}/>}>
                    <Button
                        type="text"
                        className="opacity-50"
                        icon={<PointsSvg/>}
                    />
                </Popover>,
            align: 'center',
            render: (record) =>
                <Popover trigger={'click'}
                         content={<RegisterPopoverContent recordFull={record}
                                                          tableDataFull={tableDataFull}
                                                          setTableDataFull={setTableDataFull}/>}>
                    <Button
                        type="text"
                        className="opacity-50"
                        icon={<PointsSvg/>}
                    />
                </Popover>,
            fixed: "right",
            width: 50

        }
    ]
    const optionsNameSpecialty = [
        {
            value: 'Все',
            label: 'Все'
        },
        {
            value: '31.08.01 Акушерство и гинекология',
            label: '31.08.01 Акушерство и гинекология'
        },
        {
            value: '12.456 Лечебное дело',
            label: '12.456 Лечебное дело'
        }
    ]
    const optionsTypeContract = [
        {value: 'Все', label: 'Все'},
        {value: 'Бессрочный', label: 'Бессрочный'},
        {value: 'С пролонгацией', label: 'С пролонгацией'}
    ]
    const optionsNameOrg = [
        {
            value: 'Все',
            label: 'Все'
        },
        {
            value: 'Лечебно-профилактическое учреждение по договору',
            label: 'Лечебно-профилактическое учреждение по договору'
        },
        {
            value: 'Тест 3',
            label: 'Тест 3'
        }
    ]
    const optionsSort = [
        {value: 'По дате (сначала новые)', label: 'По дате (сначала новые)'},
        {value: 'По дате (сначала старые)', label: 'По дате (сначала старые)'},
    ]


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

    function setFilterDate(date: dayjs.Dayjs) {
        if (date) {
            setFilter({
                ...filter,
                dateConclusionContract: date.format('YYYY-MM-DD')
            })
        } else {
            setFilter({
                ...filter,
                dateConclusionContract: 'Все'
            })
        }
    }

    function setFilterNumberSeats(value: number | string | null) {
        if (value) {
            setFilter({
                ...filter,
                numberSeats: String(value)
            })
        } else {
            setFilter({
                ...filter,
                numberSeats: 'Все'
            })
        }
    }

    function filterDataCompressed() {
        function filterNameOrg(elem: ColumnsTableCompressedView) {
            if (filter.nameOrg === 'Все') {
                return elem
            } else {
                return elem.contractFacility === filter.nameOrg
            }
        }

        function filterContractType(elem: ColumnsTableCompressedView) {
            if (filter.contractType === 'Все') {
                return elem
            } else {
                return elem.contractType === filter.contractType
            }
        }

        function filterDateConclusionContract(elem: ColumnsTableCompressedView) {
            if (filter.dateConclusionContract === 'Все') {
                return elem
            } else {
                return elem.dateConclusionContract === filter.dateConclusionContract
            }
        }

        function sortDateConclusionContract(a: ColumnsTableCompressedView, b: ColumnsTableCompressedView) {
            if (filter.sortDateConclusionContract === 'По дате (сначала новые)') {
                return +new Date(b.dateConclusionContract) - +new Date(a.dateConclusionContract)
            }
            if (filter.sortDateConclusionContract === 'По дате (сначала старые)') {
                return +new Date(a.dateConclusionContract) - +new Date(b.dateConclusionContract)
            }
            return 0
        }

        return mockDataCompressed
            .filter(elem => filterNameOrg(elem))
            .filter(elem => filterContractType(elem))
            .filter(elem => filterDateConclusionContract(elem))
            .sort((a, b) => sortDateConclusionContract(a, b))

    }

    function filterDataFull() {
        function filterNameOrg(elem: ColumnsTableFull) {
            if (filter.nameOrg === 'Все') {
                return elem
            } else {
                return elem.nameOrg === filter.nameOrg
            }
        }

        function filterContractType(elem: ColumnsTableFull) {
            if (filter.contractType === 'Все') {
                return elem
            } else {
                return elem.contractType === filter.contractType
            }
        }

        function filterDateConclusionContract(elem: ColumnsTableFull) {
            if (filter.dateConclusionContract === 'Все') {
                return elem
            } else {
                return elem.dateConclusionContract === filter.dateConclusionContract
            }
        }

        function filterDataNameSpecialty(elem: ColumnsTableFull) {
            if (filter.nameSpecialty === 'Все') {
                return elem
            } else {
                return elem.nameSpecialty === filter.nameSpecialty
            }
        }

        function filterNumberSeats(elem: ColumnsTableFull) {
            if (filter.numberSeats === 'Все') {
                return elem
            } else {
                return elem.numberSeats === filter.numberSeats
            }
        }

        function sortDateConclusionContract(a: ColumnsTableFull, b: ColumnsTableFull) {
            if (filter.sortDateConclusionContract === 'По дате (сначала новые)') {
                return +new Date(b.dateConclusionContract) - +new Date(a.dateConclusionContract)
            }
            if (filter.sortDateConclusionContract === 'По дате (сначала старые)') {
                return +new Date(a.dateConclusionContract) - +new Date(b.dateConclusionContract)
            }
            return 0
        }

        return mockDataFull
            .filter(elem => filterNameOrg(elem))
            .filter(elem => filterContractType(elem))
            .filter(elem => filterDateConclusionContract(elem))
            .filter(elem => filterDataNameSpecialty(elem))
            .filter(elem => filterNumberSeats(elem))
            .sort((a, b) => sortDateConclusionContract(a, b))

    }

    useEffect(() => {
        setTableDataCompressed(filterDataCompressed())
        setTableDataFull(filterDataFull())
    }, [filter])


    return (
        <section className={'container'}>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Typography.Text className="text-[28px] mb-14">
                        Реестр договоров
                    </Typography.Text>
                </Col>
            </Row>
            <Row gutter={[16, 16]} className={'mt-12'}>
                <Col span={12} className={'flex items-center gap-0'}>
                    <Col span={8} className={clsx(
                        'flex items-center gap-2',
                        !tableView.table && 'hidden')}
                    >
                        <span className={'whitespace-nowrap'}>Количество мест</span>
                        <InputNumber
                            controls={false}
                            type={'number'}
                            onChange={value => setFilterNumberSeats(value)}
                        />
                    </Col>
                    <Col span={16} className={'flex gap-2 items-center'}
                         style={{
                             paddingRight: 0,
                             paddingLeft: tableView.table ? 16 : 8
                         }}>
                        <span className={'whitespace-nowrap'}>Дата заключения договора</span>
                        <DatePicker className={'w-full'}
                                    placeholder={'ДД.ММ.ГГГГ'}
                                    format={'DD.MM.YYYY'}
                                    onChange={date => setFilterDate(date)}
                        />
                    </Col>
                </Col>
                <Col span={3} offset={9}>
                    <Button type={"primary"}
                            onClick={() => {
                                nav('/services/practices/registerContracts/createContract')
                            }}
                    >
                        Создать договор
                    </Button>
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
                            defaultValue="Все"
                            className="w-full"
                            options={optionsNameOrg}
                            onChange={(value, option) => {
                                setFilter({
                                    ...filter,
                                    nameOrg: value
                                })
                            }}
                        />
                    </Col>
                </Col>
            </Row>

            <Row gutter={[16, 16]} className={clsx(
                'mt-4',
                !tableView.table && 'hidden'
            )}>
                <Col span={12} className={'flex items-center gap-2'}>
                    <Col span={8}>
                        <span className={'whitespace-nowrap'}>Наименование специальности</span>
                    </Col>
                    <Col span={16}>
                        <Select
                            popupMatchSelectWidth={false}
                            defaultValue="Все"
                            className="w-full"
                            options={optionsNameSpecialty}
                            onChange={value => {
                                setFilter({
                                    ...filter,
                                    nameSpecialty: value,
                                })
                            }}
                        />
                    </Col>
                </Col>
            </Row>

            <Row gutter={[16, 16]} className={'mt-4'}>
                <Col span={12} className={'flex items-center gap-2'}>
                    <Col span={8}>
                        <span className={'whitespace-nowrap'}>Тип договора</span>
                    </Col>
                    <Col span={16}>
                        <Select
                            popupMatchSelectWidth={false}
                            defaultValue="Все"
                            className="w-full"
                            options={optionsTypeContract}
                            onChange={value => {
                                setFilter({
                                    ...filter,
                                    contractType: value,
                                })
                            }}
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
                            defaultValue="По дате (сначала новые)"
                            className="w-full"
                            options={optionsSort}
                            onChange={value => {
                                setFilter({
                                    ...filter,
                                    sortDateConclusionContract: value
                                })
                            }}

                        />
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
