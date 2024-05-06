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
import {PopoverContentMain} from "../popover/PopoverContentMain";
import {PointsSvg} from "../../../../assets/svg/PointsSvg";
import {PopoverContent} from "../popover/popoverContent";


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

const IndividualTasks = ({setEdit}: PropsType) => {
    const [dataTable, setDataTable] = useState<CompressedIndividualTask[]>([
        {id: '1', key: '1', specialityName: 'Тест 1', dateFilling: '12.12.2024', practiceType: 'Test 1'},
        {id: '2', key: '2', specialityName: 'Тест 12', dateFilling: '12.12.2024', practiceType: 'Test 1'},
    ])
    const [tableView, setTableView] = useState({
        compressed: true,
        table: false
    })
    const filterData: FilterType[] = [
        {
            value: '',
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
    const filterSpecializationData: FilterType[] = [
        {
            value: '',
            label: 'Все'
        },
        {
            value: '31.08.01',
            label: '31.08.01 Акушерство и гинекология'
        },
        {
            value: '31.08.12',
            label: '31.08.12 Педиатрия'
        }
    ]

    const [filters, setFilters] = useState<{ type: string; spec: string }>({
        type: '',
        spec: ''
    })

    const columns: TableColumnsType<CompressedIndividualTask> = [
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
                <Popover>
                    <Button
                        type="text"
                        className="opacity-50"
                        icon={<PointsSvg/>}
                    />
                </Popover>,
            width: 100,
            align: 'center',
            render: (record) =>
                <Popover trigger={'click'} content={<PopoverContent recordCompressed={record}/>}>
                    <Button
                        type="text"
                        className="opacity-50"
                        icon={<PointsSvg/>}
                        onClick={() => console.log(record.specialityName)}
                    />
                </Popover>
        }
    ]
    const navigate = useNavigate()

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
                        defaultValue=""
                        className="w-full"
                        options={filterSpecializationData}
                        onChange={value => {
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
                        defaultValue=""
                        className="w-full"
                        options={filterData}
                        onChange={value => {
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
                            // options={optionsSort}
                            // onChange={value => {
                            // 	setFilter({
                            // 		...filter,
                            // 		sortDateConclusionContract: value
                            // 	})
                            // }}

                        />
                    </div>

                </Col>
            </Row>
            {
                tableView.compressed
                &&
                <div className={'individualTasks'}>
                    <Table
                        columns={columns}
                        dataSource={dataTable}
                        pagination={false}
                    />
                </div>
            }


        </section>
    )
}

export default IndividualTasks
