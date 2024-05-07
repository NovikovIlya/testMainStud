import {
    Button,
    Col, Popover, Radio,
    Row,
    Select,
    Space,
    Table,
    TableColumnsType,
} from 'antd'
import React, {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {ContentItem, ITaskFull, TypeGetTasks} from '../../../../models/Practice'
import './IndividualTasks.scss'
import {
    TitleHeadCell
} from "../../businessTrip/NewBusinessTrip/archive/stepTwo/tableStepTwo/titleHeadCell/TitleHeadCell";
import {RegisterPopoverMain} from "../popover/register/RegisterPopoverMain";
import {PointsSvg} from "../../../../assets/svg/PointsSvg";
import {RegisterPopoverContent} from "../popover/register/RegisterPopoverContent";
import {ColumnsTableCompressedView, ColumnsTableFull} from "../roster/registerContracts/RegisterContracts";
import {IndTaskPopoverContent} from "../popover/individualTask/IndTaskPopoverContent";
import {IndTaskPopoverMain} from "../popover/individualTask/IndTaskPopoverMain";


interface FilterType {
    value: string
    label: string
}

type PropsType = {
    setEdit: (edit: string) => void
}

export interface CompressedIndividualTask {
    id: string
    key: string
    specialityName: string
    practiceType: string
    dateFilling: string
}

const mockDataCompressedIndividualTask: CompressedIndividualTask[] = [
    {id: '1', key: '1', specialityName: '31.08.01 Акушерство и гинекология', dateFilling: '2024-12-12', practiceType: 'Производственная'},
    {id: '2', key: '2', specialityName: '31.08.12 Педиатрия', dateFilling: '2024-05-12', practiceType: 'Учебная'},
    {id: '3', key: '3', specialityName: '31.08.12 Педиатрия', dateFilling: '2024-05-12', practiceType: 'Производственная'},
]

export interface FullIndividualTask {
    id: string
    key: string
    specialityName: string
    practiceType: string
    tasks: string[]
}

const mockDataFullIndividualTask: FullIndividualTask[] = [
    {id: '1', key: '1', specialityName: '31.08.01 Акушерство и гинекология', practiceType: 'Производственная', tasks: ['1. Test3', '2. Test4']},
    {id: '2', key: '2', specialityName: '31.08.12 Педиатрия', practiceType: 'Учебная', tasks: ['1. Test3', '2. Test4']},
    {id: '3', key: '3', specialityName: '31.08.12 Педиатрия', practiceType: 'Производственная', tasks: ['1. Test3', '2. Test4']},
]



const IndividualTasks = ({setEdit}: PropsType) => {
    const navigate = useNavigate()
    const [
        tableDataCompressed,
        setTableDataCompressed
    ] = useState<CompressedIndividualTask[]>(mockDataCompressedIndividualTask)

    const [
        tableDataFull,
        setTableDataFull
    ] = useState<FullIndividualTask[]>(mockDataFullIndividualTask)
    const [tableView, setTableView] = useState({
        compressed: true,
        full: false
    })
    const [filter, setFilter] = useState({
        practiceType: 'Все',
        specialityName: 'Все',
    })
    function isCompressedTable() {
        setTableView({
            compressed: true,
            full: false
        })
    }
    function isFullTable() {
        setTableView({
            compressed: false,
            full: true
        })
    }

    const optionsTypePractice: FilterType[] = [
        {
            value: 'Все',
            label: 'Все'
        },
        {
            value: 'Производственная',
            label: 'Производственная'
        },
        {
            value: 'Учебная',
            label: 'Учебная'
        }
    ]
    const optionsSpecName: FilterType[] = [
        {
            value: 'Все',
            label: 'Все'
        },
        {
            value: '31.08.01 Акушерство и гинекология',
            label: '31.08.01 Акушерство и гинекология'
        },
        {
            value: '31.08.12 Педиатрия',
            label: '31.08.12 Педиатрия'
        }
    ]
    const optionsSortDate: FilterType[] = [
        {value: 'По дате(сначала новые)', label: 'По дате(сначала новые)'},
        {value: 'По дате(сначала старые)', label: 'По дате(сначала старые)'},
    ]
    const columnsCompressed: TableColumnsType<CompressedIndividualTask> = [
        {
            title: <TitleHeadCell title={'Шифр и наименование специальности'}/>,
            dataIndex: 'specialityName',
            key: 'specialityName',
            width: '20%',
            render: text => <span className="font-bold">{text}</span>,
        },
        {
            title: <TitleHeadCell title={'Дата заполнения'}/>,
            dataIndex: 'dateFilling',
            key: 'dateFilling',
            width: '20%'
        },
        {
            title: <TitleHeadCell title={'Тип практики'}/>,
            dataIndex: 'practiceType',
            key: 'practiceType',
            width: '20%',

        },
        {
            title:
                <Popover trigger={'click'}
                         content={<IndTaskPopoverMain recordCompressed={tableDataCompressed}/>}
                >
                    <Button
                        type="text"
                        className="opacity-50"
                        icon={<PointsSvg/>}
                    />
                </Popover>,
            width: 100,
            align: 'center',
            render: (record) =>
                <Popover
                    trigger={'click'}
                    content={<IndTaskPopoverContent recordCompressed={record}
                                                    tableDataCompressed={tableDataCompressed}
                                                    setTableDataCompressed={setTableDataCompressed}/>}>
                    <Button
                        type="text"
                        className="opacity-50"
                        icon={<PointsSvg/>}
                        onClick={() => console.log(record.specialityName)}
                    />
                </Popover>
        }
    ]
    const columnsFull: TableColumnsType<FullIndividualTask> = [
        {
            title: <span className={'text-base'}>Шифр и наименование специальности</span>,
            dataIndex: 'specialityName',
            key: 'specialityName',
            width: '20%',
            render: text => <span className="font-bold">{text}</span>,
        },
        {
            title: <span className={'text-base'}>Тип практики</span>,
            dataIndex: 'practiceType',
            key: 'practiceType',
            width: '20%',
        },
        {
            title: <span className={'text-base'}>Индивидуальные задания</span>,
            dataIndex: 'tasks',
            key: 'tasks',
            width: '40%',
            render: (value) => (
                <div className={'flex flex-col gap-2'}>
                    {value.map((elem: string) => (
                        <span key={elem}>{elem}</span>
                    ))}
                </div>
            )
        },
        {
            title:
                <Popover trigger={"click"}
                         content={<IndTaskPopoverMain recordFull={tableDataFull}/>}
                >
                    <Button
                        type="text"
                        className="opacity-50"
                        icon={<PointsSvg/>}
                    />
                </Popover>,
            width: 100,
            align: 'center',
            render: (record) =>
                <Popover trigger={'click'}
                         content={<IndTaskPopoverContent recordFull={record}
                                                         tableDataFull={tableDataFull}
                                                         setTableDataFull={setTableDataFull}
                         />}
                >
                    <Button
                        type="text"
                        className="opacity-50"
                        icon={<PointsSvg/>}
                    />
                </Popover>
        }
    ]

    function filterDataCompressed() {
        function filterPracticeType(elem: CompressedIndividualTask) {
            if (filter.practiceType === 'Все') {
                return elem
            } else {
                return elem.practiceType === filter.practiceType
            }
        }
        function filterNameSpecialty(elem: CompressedIndividualTask) {
            if (filter.specialityName === 'Все') {
                return elem
            } else {
                return elem.specialityName === filter.specialityName
            }
        }
        // function sortDateConclusionContract(a: ColumnsTableCompressedView, b: ColumnsTableCompressedView) {
        //     if (filter.sortDateConclusionContract === 'По дате (сначала новые)') {
        //         return +new Date(b.dateConclusionContract) - +new Date(a.dateConclusionContract)
        //     }
        //     if (filter.sortDateConclusionContract === 'По дате (сначала старые)') {
        //         return +new Date(a.dateConclusionContract) - +new Date(b.dateConclusionContract)
        //     }
        //     return 0
        // }
        return mockDataCompressedIndividualTask
            .filter(elem => filterPracticeType(elem))
            .filter(elem => filterNameSpecialty(elem))
    }

    function filterDataFull() {
        function filterPracticeType(elem: FullIndividualTask) {
            if (filter.practiceType === 'Все') {
                return elem
            } else {
                return elem.practiceType === filter.practiceType
            }
        }
        function filterNameSpecialty(elem: FullIndividualTask) {
            if (filter.specialityName === 'Все') {
                return elem
            } else {
                return elem.specialityName === filter.specialityName
            }
        }
        // function sortDateConclusionContract(a: ColumnsTableCompressedView, b: ColumnsTableCompressedView) {
        //     if (filter.sortDateConclusionContract === 'По дате (сначала новые)') {
        //         return +new Date(b.dateConclusionContract) - +new Date(a.dateConclusionContract)
        //     }
        //     if (filter.sortDateConclusionContract === 'По дате (сначала старые)') {
        //         return +new Date(a.dateConclusionContract) - +new Date(b.dateConclusionContract)
        //     }
        //     return 0
        // }
        return mockDataFullIndividualTask
            .filter(elem => filterPracticeType(elem))
            .filter(elem => filterNameSpecialty(elem))
    }

    useEffect(() => {
        setTableDataCompressed(filterDataCompressed())
        setTableDataFull(filterDataFull())
    }, [filter]);


    return (
        <section className="container">
            <Row>
                <Col>
					<span className="mb-14 text-[28px]">
						Индивидуальные задания
					</span>
                </Col>
            </Row>
            <Row gutter={[16, 16]} className="mt-12">
                <Col span={5}>
                    <span>Наименование специальности</span>
                </Col>
                <Col span={7}>
                    <Select
                        popupMatchSelectWidth={false}
                        defaultValue="Все"
                        className="w-full"
                        options={optionsSpecName}
                        onChange={value => {
                            setFilter({
                                ...filter,
                                specialityName: value
                            })
                        }}
                    />
                </Col>
                <Col span={7} offset={5}>
                    <Space className="w-full flex-row-reverse">
                        <Button
                            type="primary"
                            className="!rounded-full"
                            onClick={() => {
                                navigate('/services/practices/individualTasks/createTask')
                            }}
                        >
                            Добавить индивидуальные задания
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Row gutter={[16, 16]} className="mt-4">
                <Col span={5}>
                    <span>Тип практики</span>
                </Col>
                <Col span={7}>
                    <Select
                        popupMatchSelectWidth={false}
                        defaultValue="Все"
                        className="w-full"
                        options={optionsTypePractice}
                        onChange={value => {
                            setFilter({
                                ...filter,
                                practiceType: value
                            })
                        }}
                    />
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
                            options={optionsSortDate}
                        />
                    </div>

                </Col>
            </Row>
            {
                tableView.compressed
                &&
                <div className={'individualTasks'}>
                    <Table
                        columns={columnsCompressed}
                        dataSource={tableDataCompressed}
                        pagination={false}
                    />
                </div>
            }
            {
                tableView.full
                &&
                <Table
                    className={'mt-5'}
                    columns={columnsFull}
                    dataSource={tableDataFull}
                    pagination={false}
                />
            }


        </section>
    )
}

export default IndividualTasks
