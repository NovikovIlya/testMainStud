import {
    Button,
    Checkbox,
    Col,
    List,
    Radio,
    Row,
    Select,
    Space, Tabs,
    Typography
} from 'antd'
import type {CheckboxProps, GetProp} from 'antd'
import {useEffect, useState} from 'react'
import {CompressedView} from "./CompressedView";
import {TableView} from "./TableView";

type CheckboxValueType = GetProp<typeof Checkbox.Group, 'value'>[number]

interface FilterType {
    value: string
    label: string
}

const filterSpecialization: FilterType[] = [
    {
        value: '',
        label: 'Все'
    },
    {
        value: '31.08.01 Акушерство и гинекология',
        label: '31.08.01 Акушерство и гинекология'
    },
    {
        value: '31.08.01 Педиатрия',
        label: '31.08.01 Педиатрия'
    }
]

const filterCourse: FilterType[] = [
    {
        value: '',
        label: 'Все'
    },
    {
        value: '1',
        label: '1'
    },
    {
        value: '2',
        label: '2'
    },
    {
        value: '3',
        label: '3'
    },
    {
        value: '4',
        label: '4'
    },
    {
        value: '5',
        label: '5'
    },
    {
        value: '6',
        label: '6'
    }
]

const filterType: FilterType[] = [
    {
        value: '',
        label: 'Все'
    },
    {
        value: 'Производственная',
        label: 'Производственная'
    },
    {
        value: 'Технологическая',
        label: 'Технологическая'
    }
]

const filterEducationLevel: FilterType[] = [
    {
        value: '',
        label: 'Все'
    },
    {
        value: 'Ординатура',
        label: 'Ординатура'
    },
    {
        value: 'Интернатура',
        label: 'Интернатура'
    }
]

const filterEducationForm: FilterType[] = [
    {
        value: '',
        label: 'Все'
    },
    {
        value: 'Очная',
        label: 'Очная'
    },
    {
        value: 'Заочная',
        label: 'Заочная'
    },
    {
        value: 'Очно - заочная',
        label: 'Очно - заочная'
    }
]

interface DataType {
    key: string
    specialization: string
    fillingDate: string
    type: string
    course: string
    academicYear: string
    group: string
    educationLevel: string
    educationForm: string
    sybtypePractice: string
    periodPractice: string
}

const data: DataType[] = [
    {
        key: '1',
        specialization: 'Лечебно-профилактическое учреждение по договору',
        fillingDate: '00.00.00, 00:00',
        type: 'Бессрочный',
        course: '1',
        academicYear: '2',
        group: '09-033',
        educationLevel: 'Ординатура',
        educationForm: 'Очная',
        sybtypePractice: 'Акушерство',
        periodPractice: '2020-2021'
    },
    {
        key: '2',
        specialization: 'Лечебно-профилактическое учреждение по договору',
        fillingDate: '00.00.00, 00:00',
        type: 'С пролонгацией',
        course: '2',
        academicYear: '2',
        group: '09-033',
        educationLevel: 'Ординатура',
        educationForm: 'Заочная',
        sybtypePractice: 'Акушерство',
        periodPractice: '2020-2021'
    }
]

const plainOptions = data.map(item => item.key)

type PropsType = {
    setIsCreate: (value: boolean) => void
    setIsPreview: (value: boolean) => void
    setIsFinalReview: (value: boolean) => void
}

export const PracticeSchedule = ({
                                     setIsCreate,
                                     setIsPreview,
                                     setIsFinalReview
                                 }: PropsType) => {
    const [stateSchedule, setStateSchedule] = useState({
        compressed: true,
        table: false,
    })
    const [dataTable, setDataTable] = useState<DataType[]>(data)
    const [filters, setFilters] = useState<{
        type: string
        spec: string
        course: string
        level: string
        form: string
    }>({type: '', spec: '', course: '', level: '', form: ''})

    useEffect(() => {
        setDataTable(
            data.filter(
                x =>
                    x.type.includes(filters.type) &&
                    x.specialization.includes(filters.spec) &&
                    x.course.includes(filters.course) &&
                    x.educationLevel.includes(filters.level) &&
                    x.educationForm.includes(filters.form)
            )
        )
    }, [filters])

    const filter = (value: string, index: string) => {
        setFilters(prev => ({...prev, [index]: value}))
    }

    function isCompressedView() {
        setStateSchedule({
            ...stateSchedule,
            compressed: true,
            table: false
        })
    }

    function isTableView() {
        setStateSchedule({
            ...stateSchedule,
            compressed: false,
            table: true,
        })
    }



    return (
        <section className="container">
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Typography.Text className=" text-[28px] mb-14">
                        График практик
                    </Typography.Text>
                </Col>
            </Row>
            <Row gutter={[8, 16]} className="mt-12 w-full flex items-center">
                <Col span={4}>
                    <Typography.Text>Наименование специальности</Typography.Text>
                </Col>
                <Col span={8}>
                    <Select
                        popupMatchSelectWidth={false}
                        defaultValue=""
                        className="w-full"
                        options={filterSpecialization}
                        onChange={value => filter(value, 'spec')}
                    />
                </Col>
                <Col offset={8}>
                    <Button type="primary" className="rounded-full" onClick={() => setIsCreate(true)}>
                        Добавить график практик
                    </Button>
                </Col>
            </Row>
            <Row gutter={[16, 0]} className="mt-4 flex items-center">
                <Col span={1}>
                    <Typography.Text className="whitespace-nowrap">Курс</Typography.Text>
                </Col>
                <Col span={2}>
                    <Select
                        popupMatchSelectWidth={false}
                        defaultValue=""
                        className="w-full"
                        options={filterCourse}
                        onChange={value => filter(value, 'course')}
                    />
                </Col>
                <Col span={2}>
                    <Typography.Text>Вид практики</Typography.Text>
                </Col>
                <Col span={7}>
                    <Select
                        popupMatchSelectWidth={false}
                        defaultValue=""
                        className="w-full"
                        options={filterType}
                        onChange={value => filter(value, 'type')}
                    />
                </Col>
            </Row>
            <Row gutter={[16, 16]} className="mt-4 flex items-center">
                <Col span={4}>
                    <Typography.Text>Уровень образования</Typography.Text>
                </Col>
                <Col span={8}>
                    <Select
                        popupMatchSelectWidth={false}
                        defaultValue=""
                        className="w-full"
                        options={filterEducationLevel}
                        onChange={value => filter(value, 'level')}
                    />
                </Col>
            </Row>
            <Row gutter={[16, 16]} className="mt-4 flex items-center">
                <Col span={4}>
                    <Typography.Text>Форма обучения</Typography.Text>
                </Col>
                <Col span={8}>
                    <Select
                        popupMatchSelectWidth={false}
                        defaultValue=""
                        className="w-full"
                        options={filterEducationForm}
                        onChange={value => filter(value, 'form')}
                    />
                </Col>
            </Row>
            <Row className="mt-4 flex items-center">
                <Col span={12} flex="50%">
                    <Radio.Group defaultValue="compressedView" buttonStyle="solid">
                        <Radio.Button
                            value="compressedView"
                            className="!rounded-l-full"
                            onClick={isCompressedView}>
                            Посмотреть в сжатом виде
                        </Radio.Button>
                        <Radio.Button
                            value="tableView"
                            className="!rounded-r-full"
                            onClick={isTableView}>
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

            <Row className="mt-4">
                <Col flex={'auto'}>
                    { stateSchedule.compressed && <CompressedView/> }
                    { stateSchedule.table && <TableView/>}
                </Col>
            </Row>
        </section>
    )
}

export default PracticeSchedule
