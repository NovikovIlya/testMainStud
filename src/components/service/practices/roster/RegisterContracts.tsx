import {Button, Col, DatePicker, Radio, Row, Select, Table, TableProps, Typography} from 'antd'
import React, {useEffect, useState} from 'react'
import './RegisterContracts.scss'
import {
    TitleHeadCell
} from "../../businessTrip/NewBusinessTrip/archive/stepTwo/tableStepTwo/titleHeadCell/TitleHeadCell";
import {EditSvg} from "../../../../assets/svg/EditSvg";
import {PointsSvg} from "../../../../assets/svg/PointsSvg";
import dayjs from "dayjs";


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
        width: 150,
        render: (text) => dayjs(text).format('DD.MM.YYYY')
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
        value: 'Все',
        label: 'Все'
    },
    {
        value: '31.08.01 Акушерство и гинекология',
        label: '31.08.01 Акушерство и гинекология'
    },
    {
        value: 'Тест 2',
        label: 'Тест 2'
    }
]
const optionsTypeContract = [
    {value: 'Все', label: 'Все'},
    {value: 'Бессрочный', label: 'Бессрочный'},
    {value: 'С пролонгацией', label: 'С пролонгацией'}
]
const optionsNameOrg = [
    {value: 'Все', label: 'Все'},
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
const mockDataCompressed: ColumnsTableCompressedView[] = [
    {
        key: '1',
        contractFacility: 'Лечебно-профилактическое учреждение по договору',
        dateFiling: '00.00.00, 00:00',
        contractType: 'Бессрочный',
        dateConclusionContract: '2024-04-24'
    },
    {
        key: '2',
        contractFacility: 'Лечебно-профилактическое учреждение по договору',
        dateConclusionContract: '2024-04-25',
        contractType: 'С пролонгацией',
        dateFiling: '00.00.00, 00:00'
    },
    {
        key: '3',
        contractFacility: 'Тест 3',
        dateConclusionContract: '2024-04-26',
        contractType: 'Бессрочный',
        dateFiling: '00.00.00, 00:00'
    },
    {
        key: '4',
        contractFacility: 'Тест 4',
        dateConclusionContract: '2024-04-27',
        contractType: 'С пролонгацией',
        dateFiling: '00.00.00, 00:00'
    },
    {
        key: '5',
        contractFacility: 'Тест 4',
        dateConclusionContract: '2024-04-26',
        contractType: 'С пролонгацией',
        dateFiling: '00.00.00, 00:00'
    },
]


export const RegisterContracts = () => {
    const [filter, setFilter] = useState({
        contractType: 'Все',
        nameOrg: 'Все',
        dateConclusionContract: 'Все',
    })

    const [tableDataCompressed, setTableDataCompressed] = useState<ColumnsTableCompressedView[]>(mockDataCompressed)
    const [tableDataFull, setTableDataFull] = useState<ColumnsTableFull[]>()
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

    function setFilterDate(date: dayjs.Dayjs) {
        if (date) {
            setFilter({
                ...filter,
                dateConclusionContract: date.format('DD.MM.YYYY')
            })
        } else {
            setFilter({
                ...filter,
                dateConclusionContract: 'Все'
            })
        }
    }


    function allFilter() {
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

        return mockDataCompressed
            .filter(elem => filterNameOrg(elem))
            .filter(elem => filterContractType(elem))
            .filter(elem => filterDateConclusionContract(elem))
            // .sort((a, b) => {
            //     return new Date(a.dateConclusionContract) - new Date(b.dateConclusionContract)
            // })

    }

    useEffect(() => {
        setTableDataCompressed(allFilter())
    }, [filter])


    const testArr = [
        {id: 1, value: '2024-04-26'},
        {id: 2, value: '2024-06-30'},
    ]
    const newTest = testArr.sort((a, b) => {
        return +new Date(b.value) - +new Date(a.value)
    })
    console.log(newTest)


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
                                    placeholder={'ДД.ММ.ГГГГ'}
                                    format={'DD.MM.YYYY'}
                                    onChange={date => setFilterDate(date)}
                        />
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
