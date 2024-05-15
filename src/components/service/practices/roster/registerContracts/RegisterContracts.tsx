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
import {useGetContractsAllQuery, useGetContractsShortQuery} from "../../../../../store/api/practiceApi/roster";
import {ThemeProvider} from "@material-tailwind/react";
import value = ThemeProvider.propTypes.value;


export interface ColumnsTableCompressedView {
    id: string
    key: string
    contractFacility: string
    dateFiling: string
    contractType: string
    dateConclusionContract: string
}

interface Links {
    documentCopyId: string
    documentAgreementId: string
}

export interface ColumnsTableFull {
    id: string
    key: string
    contractFacility: string
    specialtyName: string
    contractNumber: string
    conclusionDate: string
    contractType: string
    endDate: string
    legalFacility: string
    actualFacility: string
    placesAmount: string
    prolongation: string | null
    links: Links
}

interface ListDataFull {
    firstDataTable: ColumnsTableFull[]
    filteredDataTable: ColumnsTableFull[]
}

const mockDataCompressed: ColumnsTableCompressedView[] = [
    {
        id: '1',
        key: '1',
        contractFacility: 'Лечебно-профилактическое учреждение по договору',
        dateFiling: '00.00.00',
        contractType: 'Бессрочный',
        dateConclusionContract: '2024-04-24'
    },
    {
        id: '2',
        key: '2',
        contractFacility: 'Лечебно-профилактическое учреждение по договору',
        dateConclusionContract: '2024-04-25',
        contractType: 'С пролонгацией',
        dateFiling: '00.00.00'
    },
    {
        id: '3',
        key: '3',
        contractFacility: 'Тест 3',
        dateConclusionContract: '2024-04-26',
        contractType: 'Бессрочный',
        dateFiling: '00.00.00'
    },
    {
        id: '4',
        key: '4',
        contractFacility: 'Тест 4',
        dateConclusionContract: '2024-04-27',
        contractType: 'С пролонгацией',
        dateFiling: '00.00.00'
    },
    {
        id: '5',
        key: '5',
        contractFacility: 'Тест 4',
        dateConclusionContract: '2024-04-26',
        contractType: 'С пролонгацией',
        dateFiling: '00.00.00'
    },
]
const mockDataFull: ColumnsTableFull[] = [
    {
        id: '1',
        key: '1',
        contractFacility: 'Лечебно-профилактическое учреждение по договору',
        specialtyName: '12.456 Лечебное дело',
        contractNumber: '№1.1.2.77.2.45-04/10/2022',
        conclusionDate: '2024-04-27',
        contractType: 'С пролонгацией',
        endDate: '2024-12-12',
        legalFacility: 'ул. Оренбургский тракт, 138, Казань, Респ. Татарстан',
        actualFacility: 'ул. Оренбургский тракт, 138, Казань, Респ. Татарстан',
        placesAmount: '150',
        prolongation: '3',
        links: {documentCopyId: 'sdf', documentAgreementId: '123'}
    },
]
export const RegisterContracts = () => {
    const {data: dataAll, isSuccess} = useGetContractsAllQuery()
    const {data: dataShort} = useGetContractsShortQuery()
    const nav = useNavigate()
    const [filter, setFilter] = useState({
        contractType: 'Все',
        nameOrg: 'Все',
        dateConclusionContract: 'Все',
        sortDateConclusionContract: 'По дате (сначала новые)',
        nameSpecialty: 'Все',
        numberSeats: 'Все',

    })
    const [
        tableDataCompressed,
        setTableDataCompressed
    ] = useState<ColumnsTableCompressedView[]>(mockDataCompressed)
    const [
        tableDataFull,
        setTableDataFull
    ] = useState<ColumnsTableFull[]>()
    const [tableView, setTableView] = useState({
        compressed: true,
        table: false
    })
    const [
        selectedFieldsCompressed,
        setSelectedFieldsCompressed
    ] = useState<ColumnsTableCompressedView[]>()

    const [
        selectedFieldsFull,
        setSelectedFieldFull
    ] = useState<ColumnsTableFull[]>()

    function prolonAge(prolon: string) {
        if (prolon === '1') {
            return 'год'
        } else if (prolon === '2' || prolon === '3' || prolon === '4') {
            return 'года'
        } else if (prolon.at(-1) === '2' || prolon.at(-1) === '3' || prolon.at(-1) === '4') {
            return 'года'
        } else {
            return 'лет'
        }
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
                <Popover trigger={'click'}
                         content={<RegisterPopoverMain
                             recordCompressed={selectedFieldsCompressed}
                             recordCompressedAll={mockDataCompressed}
                             setRecordCompressed={setTableDataCompressed}
                         />}>
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
            dataIndex: 'contractFacility',
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
            title: <span className={'text-xs'}>Шифр и наименование специальности</span>,
            dataIndex: 'specialtyName',
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
            dataIndex: 'conclusionDate',
            align: "center",
            className: 'text-xs',
            render: (text) => dayjs(text).format('DD.MM.YYYY')
        },
        {
            title: <span className={'text-xs'}>Тип договора</span>,
            dataIndex: 'contractType',
            align: "center",
            className: 'text-xs',
            render: (value, record, index) =>
                <div className={'flex flex-col gap-2'}>
                    <span>{value}</span>
                    {record.prolongation
                        &&
                        <span>
                            на {record.prolongation} {prolonAge(record.prolongation)}
                        </span>}
                </div>
        },
        {
            title: <span className={'text-xs'}>Срок действия договора</span>,
            dataIndex: 'endDate',
            align: "center",
            className: 'text-xs'
        },
        {
            title: <span className={'text-xs'}>Юридический адрес организации</span>,
            dataIndex: 'legalFacility',
            align: "center",
            className: 'text-xs'
        },
        {
            title: <span className={'text-xs'}>Фактический адрес организации</span>,
            dataIndex: 'actualFacility',
            align: "center",
            className: 'text-xs'
        },
        {
            title: <span className={'text-xs'}>Количество мест</span>,
            dataIndex: 'placesAmount',
            align: "center",
            className: 'text-xs'
        },
        {
            title: <span className={'text-xs'}>Ссылки</span>,
            dataIndex: 'links',
            align: "center",
            width: 100,
            className: 'text-xs',
            render: (value, record, index) =>
                <div className={'flex flex-col gap-2'}>
                    <a href={`${record.links.documentCopyId}`}>Cкан договора</a>
                    <a href={`${record.links.documentAgreementId}`}>Доп. соглашение к договору</a>
                </div>
        },
        {
            title:
                <Popover trigger={'click'}
                         content={<RegisterPopoverMain
                             recordFull={selectedFieldsFull}
                             recordFullAll={mockDataFull}
                             setRecordFull={setTableDataFull}
                         />}>
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
                return elem.contractFacility === filter.nameOrg
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
                return elem.conclusionDate === filter.dateConclusionContract
            }
        }

        function filterDataNameSpecialty(elem: ColumnsTableFull) {
            if (filter.nameSpecialty === 'Все') {
                return elem
            } else {
                return elem.specialtyName === filter.nameSpecialty
            }
        }

        function filterNumberSeats(elem: ColumnsTableFull) {
            if (filter.numberSeats === 'Все') {
                return elem
            } else {
                return elem.placesAmount === filter.numberSeats
            }
        }

        function sortDateConclusionContract(a: ColumnsTableFull, b: ColumnsTableFull) {
            if (filter.sortDateConclusionContract === 'По дате (сначала новые)') {
                return +new Date(b.conclusionDate) - +new Date(a.conclusionDate)
            }
            if (filter.sortDateConclusionContract === 'По дате (сначала старые)') {
                return +new Date(a.conclusionDate) - +new Date(b.conclusionDate)
            }
            return 0
        }

        if (isSuccess) {
            const mockDataFull: ColumnsTableFull[] = dataAll.map(elem => (
                {
                    id: elem.id,
                    key: elem.id,
                    contractFacility: elem.contractFacility,
                    specialtyName: elem.specialtyName,
                    contractNumber: elem.contractNumber,
                    conclusionDate: elem.conclusionDate,
                    contractType: elem.contractType,
                    endDate: elem.endDate,
                    legalFacility: elem.legalFacility,
                    actualFacility: elem.actualFacility,
                    placesAmount: elem.placesAmount,
                    prolongation: elem.prolongation,
                    links: {
                        documentCopyId: elem.documentCopyId,
                        documentAgreementId: elem.documentAgreementId
                    },
                }
            ))

            return mockDataFull
                .filter(elem => filterNameOrg(elem))
                .filter(elem => filterContractType(elem))
                .filter(elem => filterDateConclusionContract(elem))
                .filter(elem => filterDataNameSpecialty(elem))
                .filter(elem => filterNumberSeats(elem))
                .sort((a, b) => sortDateConclusionContract(a, b))
        }
    }

    useEffect(() => {
        setTableDataCompressed(filterDataCompressed())
        setTableDataFull(filterDataFull())
    }, [filter])




    useEffect(() => {
        console.log(dataAll)
        if (isSuccess) {
            const newDataAll: ColumnsTableFull[] = dataAll.map(elem => (
                {
                    id: elem.id,
                    key: elem.id,
                    contractFacility: elem.contractFacility,
                    specialtyName: elem.specialtyName,
                    contractNumber: elem.contractNumber,
                    conclusionDate: elem.conclusionDate,
                    contractType: elem.contractType,
                    endDate: elem.endDate,
                    legalFacility: elem.legalFacility,
                    actualFacility: elem.actualFacility,
                    placesAmount: elem.placesAmount,
                    prolongation: elem.prolongation,
                    links: {
                        documentCopyId: elem.documentCopyId,
                        documentAgreementId: elem.documentAgreementId
                    },
                }
            ))
            console.log(newDataAll)
            setTableDataFull(newDataAll)
        }

    }, [dataAll]);

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
                        rowSelection={{
                            type: "checkbox",
                            onSelect: (record, selected, selectedRows, nativeEvent) => {
                                setSelectedFieldsCompressed(selectedRows)
                            },
                            onSelectAll: ( selected, selectedRows, changeRows) => {
                                setSelectedFieldsCompressed(selectedRows)
                            }
                        }}
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
                       rowSelection={{
                           type: "checkbox",
                           onSelect: (record, selected, selectedRows, nativeEvent) => {
                               setSelectedFieldFull(selectedRows)
                           },
                           onSelectAll: ( selected, selectedRows, changeRows) => {
                               setSelectedFieldFull(selectedRows)
                           }
                       }}
                />
            }
        </section>
    )
}
