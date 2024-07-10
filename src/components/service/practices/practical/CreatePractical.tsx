import {
    Button,
    Col,
    DatePicker,
    Form,
    Input, InputNumber,
    Row,
    Select,
    Space,
    Typography
} from 'antd'
import React, {useEffect, useState} from 'react'
import {ArrowLeftSvg} from '../../../../assets/svg'
import {validateMessages} from "../../../../utils/validateMessage";
import {
    AcademicYear, Department,
    NewPractice,
    NewPracticeSend,
    PracticeKind,
    PracticeType,
    TasksAll,
    TwoId
} from "../../../../models/Practice";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {string} from "yup";
import {useNavigate} from "react-router-dom";
import {OptionsNameSpecialty} from "../roster/registerContracts/RegisterContracts";
import {useGetSpecialtyNamesQuery} from "../../../../store/api/practiceApi/roster";
import {
    useGetDepartmentsQuery,
    useGetPracticeTypeQuery,
    useLazyGetTasksForPracticeQuery,
    useGetPracticeKindQuery
} from "../../../../store/api/practiceApi/individualTask";
import {useGetCafDepartmentsQuery} from "../../../../store/api/practiceApi/practical";
import {processingOfDivisions} from "../../../../utils/processingOfDivisions";

interface FilterType {
    value: string | number
    label: string | number
}

// const optionsDepartment: FilterType[] = [
//     {
//         value: 'Кафедра хирургических болезней постдипломного образования',
//         label: 'Кафедра хирургических болезней постдипломного образования'
//     },
//     {
//         value: 'Кафедра онкологических болезней',
//         label: 'Кафедра онкологических болезней'
//     }
// ]
const practiceKind: PracticeKind[] = [
    {
        id: 'Производственная',
        value: 'Производственная',
        label: '1'
    },
    {
        id: 'Учебная',
        value: 'Учебная',
        label: '1'
    },
    {
        id: 'Производственная (клиническая) практик',
        value: 'Производственная (клиническая) практик',
        label: '1'
    }
]
const optionsCourse: FilterType[] = [
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
const optionsSemester: FilterType[] = [
    {
        value: '1',
        label: '1'
    },
    {
        value: '2',
        label: '2'
    }
]
const optionsTypePractice: FilterType[] = [
    {
        value: 'Производственная',
        label: 'Производственная'
    },
    {
        value: 'Учебная',
        label: 'Учебная'
    }
]

// const practiceKindForSelect = practiceKind.map(item => ({
//     value: item.value,
//     id: item.id,
// }));

export const CreatePractical = () => {
    const nav = useNavigate()
    const [form] = Form.useForm()
    const [optionsDepartment,setOptionsDepartment] = useState<FilterType[] | null>(null)
 
    const [subDivisionId,setSubDevisionId] = useState<null | string>(null)
    const [nameSpecialty, setNameSpecialty] = useState<OptionsNameSpecialty[]>()
    const {data: dataNameSpecialty, isSuccess: isSuccessNameSpecialty} = useGetSpecialtyNamesQuery()
    const {data: dataPraciseKind, isSuccess: isSuccesPractiseKind} = useGetPracticeKindQuery(subDivisionId)


    useEffect(() => {
        if (isSuccessNameSpecialty) {
            setNameSpecialty(dataNameSpecialty)
        }
    }, [dataNameSpecialty]);

    const [practiceType, setPracticeType] = useState<PracticeType[]>()
    const {data: dataPracticeType, isSuccess: isSuccessPracticeType} = useGetPracticeTypeQuery()
    // const [practiceKinds, setPracticeKind] = useState<PracticeKind[]>(practiceKind)

    const [departments, setDepartments] = useState<Department[]>()
    const [practiceKindForSelect, setPracticeKindForSelect] = useState<any>()
    const {data: dataDepartments, isSuccess: isSuccessDepartments} = useGetDepartmentsQuery()

    // получение кафедр
    useEffect(() => {
        if (isSuccessDepartments) {
            setDepartments(processingOfDivisions(dataDepartments))
        }
    }, [dataDepartments]);

    
    useEffect(() => {
        if (isSuccessPracticeType) {
            setPracticeType(dataPracticeType)
        }
    }, [dataPracticeType]);

    // получение видов практик
    useEffect(() => {
        if (isSuccesPractiseKind) {
            setPracticeKindForSelect(dataPraciseKind)
        }
    }, [dataDepartments, isSuccesPractiseKind]);

    const [twoId, setTwoId] = useState<TwoId>({
        sp_name_id: null,
        practice_type_id: null,
    })
    const [getTasks, results] = useLazyGetTasksForPracticeQuery()
    const [tasksId, setTasksId] = useState<string>('')

    useEffect(() => {
        if (twoId.sp_name_id && twoId.practice_type_id) {
            getTasks(twoId)
                .then((data) => {
                    if (data.data) {
                        const tasks: TasksAll = data.data
                        setTasksId(tasks.id)
                        const listTasks = tasks.tasks.map(elem => {
                            return {
                                task: elem.taskDescription
                            }
                        })
                        form.setFieldValue('tasks', listTasks)
                        console.log(tasks)
                    }
                })
        }
    }, [twoId]);



    const [dep, setDep] = useState()
    const {data: dataDep, isSuccess: isSuccessDep} = useGetCafDepartmentsQuery(subDivisionId)
    useEffect(()=>{
        if(isSuccessDep)
        setOptionsDepartment(dataDep)
    },[dataDep])



    function onFinish(values: NewPractice) {
        const specialtyNameId = dataNameSpecialty!.find(elem => {
            if (elem.value === values.specialityName) {
                return elem.id
            }
        })
        const practiceTypeId = dataPracticeType!.find(elem => {
            if (elem.value === values.practiceType) {
                return elem.id
            }
        })
        const department = 0
        // values.startStudy = dayjs(values.startStudy).format('DD.MM.YYYY')
        // values.endStudy = dayjs(values.endStudy).format('DD.MM.YYYY')
        // const academicYear: AcademicYear = {
        //     start: dayjs(values.academicYear[0]).format('YYYY'),
        //     end: dayjs(values.academicYear[1]).format('YYYY')
        // }
        //
        // const sendData: NewPracticeSend = {
        //     specialityName: values.specialityName,
        //     practiceType: values.practiceType,
        //     department: values.department,
        //     groupNumber: values.groupNumber,
        //     semester: values.semester,
        //     academicYear: academicYear,
        //     courseStudy: values.courseStudy,
        //     startStudy: values.startStudy,
        //     amountHours: String(values.amountHours),
        //     endStudy: values.endStudy,
        //     tasks: values.tasks.map(elem => elem.task),
        //     codeCompetencies: values.codeCompetencies.map(elem => elem.codeCompetence),
        //     director: values.director
        // }

        console.log(values)

    }

    const handleChange = (value: string) => {
        departments?.find(elem => {
            if (elem.label === value) {
                setSubDevisionId(elem.id)
                console.log('elem.id',elem.id)
            }
        })
        
        console.log(`selected ${value}`);
    };
    console.log('practiceKindForSelect',practiceKindForSelect)

    return (
        <section className="container">
            <Space size={10} align="center">
                <Button
                    size="large"
                    className="mt-1"
                    icon={<ArrowLeftSvg className="w-4 h-4 cursor-pointer mt-1"/>}
                    type="text"
                    onClick={() => {
                        nav('/services/practices/practical.ts/')
                    }}
                />
                <span className=" text-[28px] font-normal">
                    Добавить практику
                </span>
            </Space>
            <Form<NewPractice>
                validateMessages={validateMessages}
                form={form}
                onFinish={(values) => onFinish(values)}
                layout={'vertical'}>
                <Row gutter={[16, 16]} className="mt-4">
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item
                            label={'Шифр и наименование специальности'}
                            name={'specialityName'}
                            rules={[{required: true}]}>
                            <Select
                                size="large"
                                popupMatchSelectWidth={false}
                                className="w-full"
                                options={nameSpecialty}
                                onChange={(value) => {
                                    const id = dataNameSpecialty!.find(elem => {
                                        if (elem.value === value) {
                                            return elem.id
                                        }
                                    })
                                    setTwoId({
                                        ...twoId,
                                        sp_name_id: id!.id
                                    })
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item
                            rules={[{required: true}]}
                            name={'practiceType'}
                            label={'Тип практики'}>
                            <Select
                                size="large"
                                popupMatchSelectWidth={false}
                                className="w-full"
                                options={practiceType}
                                onChange={value => {
                                    const id = dataPracticeType!.find(elem => {
                                        if (elem.value === value) {
                                            return elem
                                        }
                                    })
                                    setTwoId({
                                        ...twoId,
                                        practice_type_id: +id!.id
                                    })
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item
                            // rules={[{required: true}]}
                            name={'practiceKind'}
                            label={'Вид практики'}>
                            <Select
                                size="large"
                                popupMatchSelectWidth={false}
                                disabled={!isSuccesPractiseKind}
                                className="w-full"
                                options={practiceKindForSelect}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]} className="mt-4">
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Space direction={'vertical'} className={'w-full'}>
                            <Form.Item label={'Подразделение'}
                                       rules={[{required: true}]}
                                       name={'subDivision'}>
                                <Select
                                    onChange={handleChange}
                                    size="large"
                                    popupMatchSelectWidth={false}
                                    className="w-full"
                                    options={departments}
                                />
                            </Form.Item>
                        </Space>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item
                            //rules={[{required: true}]}
                            name={'department'}
                            label={'Кафедра'}>
                            <Select 
                                disabled={!isSuccessDep}
                                size="large"
                                popupMatchSelectWidth={false}
                                className="w-full"
                                options={optionsDepartment ? optionsDepartment : undefined}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item
                            //rules={[{required: true}]}
                            name={'groupNumber'}
                            label={'Номер группы'}>
                            <Select
                                size="large"
                                popupMatchSelectWidth={false}
                                className="w-full"
                                options={[
                                    {
                                        value: '09-052',
                                        label: '09-052'
                                    },
                                    {
                                        value: '9383',
                                        label: '9383'
                                    }
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Form.Item
                            //rules={[{required: true}]}
                            name={'semester'}
                            label={'Семестр'}>
                            <Select
                                size="large"
                                popupMatchSelectWidth={false}
                                className="w-full"
                                options={optionsSemester}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Form.Item
                            //rules={[{required: true}]}
                            name={'academicYear'}
                            label={'Учебный год'}>

                            <DatePicker.RangePicker
                                picker={'year'}
                                size={'large'}
                                placeholder={['Начало', 'Конец']}
                            />

                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Form.Item
                            //rules={[{required: true}]}
                            name={'courseStudy'}
                            label={'Курс обучения'}>
                            <Select
                                size="large"
                                popupMatchSelectWidth={false}
                                className="w-full"
                                options={optionsCourse}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Form.Item
                            //rules={[{required: true}]}
                            name={'startStudy'}
                            label={'Дата начала практики'}>
                            <DatePicker
                                size="large"
                                format="DD.MM.YYYY"
                                placeholder=""
                                className="w-full"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Form.Item
                            //rules={[{required: true}]}
                            name={'amountHours'}
                            label={'Общее количество часов по практике'}>
                            <InputNumber
                                type="number"
                                className="w-full"
                                size="large"
                                controls={false}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Form.Item
                            //rules={[{required: true}]}
                            name={'endStudy'}
                            label={'Дата окончания практики'}>
                            <DatePicker
                                size="large"
                                format="DD.MM.YYYY"
                                className="w-full"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                {/*<Space direction="vertical" className="w-full  mb-4 mt-10">*/}
                {/*    <Typography.Text className="font-bold">*/}
                {/*        Индивидуальные задания*/}
                {/*    </Typography.Text>*/}
                {/*</Space>*/}

                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Space direction="vertical" className="w-full mb-4">
                            <span className="font-bold">
                                Индивидуальные задания (от 1 до 10)
                            </span>
                        </Space>
                        <Form.List name={'tasks'}
                                   initialValue={[{}]}
                                   rules={[{
                                       validator: async (_, tasks) => {
                                           if (tasks.length < 1 || tasks.length > 10) {
                                               return Promise.reject(new Error('Заданий может быть от 1 до 10'))
                                           }
                                       }
                                   }]}
                        >
                            {(fields, operation, {errors}) => (
                                <>
                                    {fields.map((field) => (
                                        <Space.Compact className={'w-full'}
                                                       key={field.key}>
                                            <div className={'flex items-center w-full gap-5'}>
                                                <div className={'flex w-full'}>
                                                    <div
                                                        className={'flex items-center justify-center bg-[#E9EFF8] p-[7px] border-solid border-[1px] border-[#d9d9d9] rounded-l-lg mb-[24px]'}>
                                                        <span className={'text-base font-bold'}>
                                                            {field.name + 1}
                                                        </span>
                                                    </div>
                                                    <Form.Item name={[field.name, 'task']}
                                                               className={'w-full h-min'}
                                                               rules={[{
                                                                   //required: true
                                                               }]}
                                                    >
                                                        <TextArea autoSize
                                                                  size="large"
                                                                  placeholder="Добавить задание"
                                                                  className={'textArea'}

                                                        />
                                                    </Form.Item>
                                                </div>
                                                <Button
                                                    className={'mb-[24px]'}
                                                    size="large"
                                                    type="primary"
                                                    icon={<DeleteOutlined/>}
                                                    onClick={() => {
                                                        operation.remove(field.name)
                                                    }}
                                                />
                                            </div>
                                        </Space.Compact>
                                    ))}

                                    <Form.ErrorList
                                        errors={errors}
                                        className={'mb-[15px] text-red-600'}
                                    />

                                    <Button
                                        size="large"
                                        type="primary"
                                        icon={<PlusOutlined/>}
                                        onClick={() => operation.add()}
                                        disabled={fields.length === 10}
                                    />
                                </>
                            )}
                        </Form.List>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Space direction="vertical" className="w-full mb-4">
                            <span className="font-bold">
                                Код и наименование компетенции (от 1 до 15)
                            </span>
                        </Space>
                        <Form.List name={'codeCompetencies'}
                                   initialValue={[{}]}
                                   rules={[{
                                       validator: async (_, tasks) => {
                                           if (tasks.length < 1 || tasks.length > 15) {
                                               return Promise.reject(new Error('Компетенций может быть от 1 до 15'))
                                           }
                                       }
                                   }]}
                        >
                            {(fields, operation, {errors}) => (
                                <>
                                    {fields.map((field) => (
                                        <Space.Compact className={'w-full'}
                                                       key={field.key}>
                                            <div className={'flex items-center w-full gap-5'}>
                                                <div className={'flex w-full'}>
                                                    <div
                                                        className={'flex items-center justify-center bg-[#E9EFF8] p-[7px] border-solid border-[1px] border-[#d9d9d9] rounded-l-lg mb-[24px]'}>
                                                        <span className={'text-base font-bold'}>
                                                            {field.name + 1}
                                                        </span>
                                                    </div>
                                                    <Form.Item name={[field.name, 'codeCompetence']}
                                                               className={'w-full h-min'}
                                                               rules={[{
                                                                   //required: true
                                                               }]}
                                                    >
                                                        <TextArea autoSize
                                                                  size="large"
                                                                  placeholder="Добавить компетенцию"
                                                                  className={'textArea'}

                                                        />
                                                    </Form.Item>
                                                </div>
                                                <Button
                                                    className={'mb-[24px]'}
                                                    size="large"
                                                    type="primary"
                                                    icon={<DeleteOutlined/>}
                                                    onClick={() => {
                                                        operation.remove(field.name)
                                                    }}
                                                />
                                            </div>
                                        </Space.Compact>
                                    ))}

                                    <Form.ErrorList
                                        errors={errors}
                                        className={'mb-[15px] text-red-600'}
                                    />

                                    <Button
                                        size="large"
                                        type="primary"
                                        icon={<PlusOutlined/>}
                                        onClick={() => operation.add()}
                                        disabled={fields.length === 15}
                                    />
                                </>
                            )}
                        </Form.List>
                    </Col>
                </Row>

                <Row gutter={[16, 16]} className={'mt-4'}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item
                            //rules={[{required: true}]}
                            name={'director'}
                            label={'Заведующий опорной кафедрой'}>
                            <Select
                                size="large"
                                popupMatchSelectWidth={false}
                                className="w-full"
                                options={[
                                    {value: 'Тест 1', label: 'Тест 1'},
                                    {value: 'Тест 2', label: 'Тест 2'},
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]} className="my-8">
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Space className="w-full">
                            <Button
                                className="!rounded-full"
                                size="large"
                                type="primary"
                                htmlType="submit"
                            >
                                Сохранить
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Form>
        </section>
    )
}

