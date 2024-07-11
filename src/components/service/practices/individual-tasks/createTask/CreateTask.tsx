import {DeleteOutlined, PlusOutlined} from '@ant-design/icons'
import {Button, Col, Form, Row, Select, Space} from 'antd'
import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {ArrowLeftSvg} from '../../../../../assets/svg'
import {validateMessages} from "../../../../../utils/validateMessage";
import TextArea from "antd/es/input/TextArea";
import './CreateTask.scss'
import {Department, NameSpecialty, PracticeType, Task, TaskSend} from "../../../../../models/Practice";
import {
    useCreateTaskMutation,
    useGetDepartmentsQuery,
    useGetPracticeTypeQuery
} from "../../../../../store/api/practiceApi/individualTask";
import {OptionsNameSpecialty} from "../../roster/registerContracts/RegisterContracts";
import {useGetSpecialtyNamesQuery} from "../../../../../store/api/practiceApi/roster";
import {string} from "yup";
import {processingOfDivisions} from "../../../../../utils/processingOfDivisions";





const CreateTask = () => {
    const [createTask] = useCreateTaskMutation()
    const navigate = useNavigate()
    const [form] = Form.useForm()

    const [nameSpecialty, setNameSpecialty] = useState<OptionsNameSpecialty[]>()
    const {data: dataNameSpecialty, isSuccess: isSuccessNameSpecialty} = useGetSpecialtyNamesQuery()

    useEffect(() => {
        if (isSuccessNameSpecialty) {
            setNameSpecialty(dataNameSpecialty)
        }
    }, [dataNameSpecialty]);

    const [practiceType, setPracticeType] = useState<PracticeType[]>()
    const {data: dataPracticeType, isSuccess: isSuccessPracticeType} = useGetPracticeTypeQuery()


    useEffect(() => {
        if (isSuccessPracticeType) {
            setPracticeType(dataPracticeType)
        }
    }, [dataPracticeType]);

    const [departments, setDepartments] = useState<Department[]>()
    const {data: dataDepartments, isSuccess: isSuccessDepartments} = useGetDepartmentsQuery()

    useEffect(() => {
        if (isSuccessDepartments) {
            setDepartments(processingOfDivisions(dataDepartments))
        }
    }, [dataDepartments]);


    function onFinish(values: Task) {
        const specName = dataNameSpecialty!.find(elem => {
            if (elem.value === values.specialityName) {
                return elem
            }
        })
        const practiceType = dataPracticeType!.find(elem => {
            if (elem.value === values.practiceType) {
                return elem
            }
        })
        const subDivision = departments!.find(elem => {
            if (elem.value === values.subDivision) {
                return elem
            }
        })
        const newData: TaskSend = {
            specialityNameId: String(specName!.id),
            practiceTypeId: String(practiceType!.id),
            subdivisionNameId: String(subDivision!.id),
            tasks: values.tasks.map(elem => elem.task)
        }
        createTask(newData)
            .then(data => data)
            .catch(e => e)
        navigate('services/practices/individualTasks/')
    }

    return (
        <section className="container">
            <Space size={10} align="center">
                <Button
                    size="large"
                    className="mt-1"
                    icon={<ArrowLeftSvg className="w-4 h-4 cursor-pointer mt-1"/>}
                    type="text"
                    onClick={() => {
                        navigate('/services/practices/individualTasks/')
                    }}
                />
                <span className="text-[28px] font-normal">
					Добавить задание
				</span>
            </Space>
            <Form<Task>
                validateMessages={validateMessages}
                  onFinish={(values) => {onFinish(values)}}
                  layout={'vertical'}
                  form={form}
            >
                <Row gutter={[16, 16]} className="mt-4">
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Space direction={'vertical'} className={'w-full'}>
                            <Form.Item label={'Подразделение'}
                                       rules={[{required: true}]}
                                       name={'subDivision'}>
                                <Select
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
                        <Space direction={'vertical'} className={'w-full'}>
                            <Form.Item label={'Шифр и наименование специальности'}
                                rules={[{required: true}]}
                                name={'specialityName'}>
                                <Select
                                    size="large"
                                    popupMatchSelectWidth={false}
                                    className="w-full"
                                    options={nameSpecialty}
                                />
                            </Form.Item>
                        </Space>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Space direction="vertical" className="w-full z-10">
                            <Form.Item
                                label={'Тип практики'}
                                rules={[{required: true}]}
                                name={"practiceType"}>
                                <Select
                                    size="large"
                                    popupMatchSelectWidth={false}
                                    className="w-full"
                                    options={practiceType?.map((item)=>{
                                        return {
                                            key:item.id,
                                            value: item.value,
                                            label: item.label
                                        }
                                    })}
                                />
                            </Form.Item>
                        </Space>
                    </Col>
                </Row>
                <Space direction="vertical" className="w-full  mb-4 mt-8">
                    <span className="font-bold">
                        Индивидуальные задания (от 1 до 10)
                    </span>
                </Space>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
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
                                                    <div className={'flex items-center justify-center bg-[#E9EFF8] p-[7px] border-solid border-[1px] border-[#d9d9d9] rounded-l-lg mb-[24px]'}>
                                                        <span className={'text-base font-bold'}>
                                                            {field.name + 1}
                                                        </span>
                                                    </div>
                                                    <Form.Item name={[field.name, 'task']}
                                                               className={'w-full h-min'}
                                                               rules={[{
                                                                   required: true
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

export default CreateTask
