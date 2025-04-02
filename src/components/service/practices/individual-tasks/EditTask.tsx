import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Form, Row, Select, Space, TreeSelect } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Vector } from '../../../../assets/svg/Vector'
import { useCreateTaskMutation } from '../../../../store/api/practiceApi/taskService'
import { validateMessages } from "../../../../utils/validateMessage";
import TextArea from "antd/es/input/TextArea";
import './createTask/CreateTask.scss'
import {
    useEditTaskMutation, useGetDepartmentsQuery,
    useGetOneTaskQuery,
    useGetPracticeTypeQuery
} from "../../../../store/api/practiceApi/individualTask";
import { Department, PracticeType, Task, TaskEdit } from "../../../../models/Practice";
import { OptionsNameSpecialty } from "../roster/registerContracts/RegisterContracts";
import { useGetSpecialtyNamesQuery } from "../../../../store/api/practiceApi/roster";
import { processingOfDivisions } from "../../../../utils/processingOfDivisions";
import { useAppDispatch } from '../../../../store'
import { showNotification } from '../../../../store/reducers/notificationSlice'
import { SkeletonPage } from './Skeleton'
import { disableParents } from '../../../../utils/disableParents'
import { t } from 'i18next'

const EditTask = () => {
    const path = useLocation()
    const id: string = path.pathname.split('/').at(-1)!
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const { data, isSuccess } = useGetOneTaskQuery(id)
    const [edit] = useEditTaskMutation()
    const [msg, setMsg] = useState('')
    const [subDivision, setSubDivision] = useState<any>(null)
    const [podrazdelenie, setPodrazdelenie] = useState<any>(null)
    const [nameSpecialty, setNameSpecialty] = useState<OptionsNameSpecialty[]>()
    const { data: dataNameSpecialty, isSuccess: isSuccessNameSpecialty } = useGetSpecialtyNamesQuery(subDivision)
    const [practiceType, setPracticeType] = useState<PracticeType[]>()
    const { data: dataPracticeType, isSuccess: isSuccessPracticeType } = useGetPracticeTypeQuery(subDivision)
    const [departments, setDepartments] = useState<Department[]>()
    const { data: dataDepartments, isSuccess: isSuccessDepartments, isFetching: isLoading } = useGetDepartmentsQuery()
    const dispatch = useAppDispatch()
    const [treeLine, setTreeLine] = useState(true);
    const [showLeafIcon, setShowLeafIcon] = useState(false);
    const [value, setValue] = useState<any>();

    useEffect(() => {
        if (isSuccessNameSpecialty) {
            setNameSpecialty(dataNameSpecialty)
        }
    }, [dataNameSpecialty]);

    useEffect(() => {
        if (isSuccessPracticeType) {
            setPracticeType(dataPracticeType)
        }
    }, [dataPracticeType]);

    useEffect(() => {
        if (isSuccessDepartments) {
            setDepartments(processingOfDivisions(dataDepartments))
        }
    }, [dataDepartments]);

    useEffect(() => {
        if (isSuccess && isSuccessDepartments) {
            form.setFieldValue('subDivision', [{
                title: data.subdivisionName,
                // @ts-ignore
                value: data.subdivisionNameId
            }]);

            form.setFieldValue('specialityName', data.specialityName)
            form.setFieldValue('practiceType', data.practiceType)
            const listTasks = data.tasks.map(elem => {
                return {
                    task: elem.taskDescription
                }
            })
            form.setFieldValue('tasks', listTasks)
        }
    }, [isSuccess, isSuccessDepartments]);

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

        const newData: TaskEdit = {
            id: data!.id,
            specialityNameId: String(specName!.id),
            practiceTypeId: String(practiceType!.id),
            subdivisionNameId: subDivision,
            tasks: values.tasks.map(elem => elem.task)
        }

        edit(newData)
            .unwrap()
            .then(() => {
                setMsg(t("dataSaved"))
                navigate('/services/practices/individualTasks')
            })
            .catch((error) => {
                if (error.status === 400) {
                    dispatch(showNotification({ message: error.data.message, type: 'error' }));
                }
            })
    }

    const onChange = (newValue: string) => {
        setSubDivision(newValue)
        form.setFieldValue('specialityName', null)
        form.setFieldValue('practiceType', null)
    };

    const onPopupScroll: any = (e: any) => {
        console.log('onPopupScroll', e);
    };

    const treeData = dataDepartments?.map((item) => {
        return {
            title: item.value,
            value: item.id,
            children: item?.responses?.map((item) => {
                return {
                    title: item.value,
                    value: item.id,
                }
            })
        }
    })

    if (isLoading) return <SkeletonPage />

    return (
        <section className="container animate-fade-in">
            <Space size={10} align="center">
                <Button
                    size="large"
                    style={{ width: '48px' }}
                    className="mt-1 mr-6 w-[48px] rounded-full border border-black"
                    icon={<Vector />}
                    type="text"
                    onClick={() => {
                        navigate('/services/practices/individualTasks/')
                    }}
                />
                <span className="text-[28px] font-normal">
                    {t("editTask")}
                </span>
            </Space>
            <Form<Task>
                validateMessages={validateMessages}
                onFinish={(values) => onFinish(values)}
                layout={'vertical'}
                form={form}
            >
                <Row gutter={[16, 16]} className="mt-12">
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Space direction={'vertical'} className={'w-full'}>
                            <Form.Item label={t("subdivision")}
                                rules={[{ required: true }]}
                                name={'subDivision'}>
                                <TreeSelect
                                    treeLine={treeLine && { showLeafIcon }}
                                    showSearch
                                    style={{ height: '38px', width: '100%' }}
                                    value={value}
                                    dropdownStyle={{ overflow: 'auto' }}
                                    placeholder=""
                                    allowClear
                                    treeDefaultExpandAll
                                    onChange={onChange}
                                    treeData={disableParents(treeData)}
                                    onPopupScroll={onPopupScroll}
                                    treeNodeFilterProp="title"
                                />
                            </Form.Item>
                        </Space>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Space direction={'vertical'} className={'w-full'}>
                            <Form.Item label={t("specialityName")}
                                rules={[{ required: true }]}
                                name={'specialityName'}>
                                <Select
                                    disabled={!form.getFieldValue('subDivision')}
                                    size="large"
                                    popupMatchSelectWidth={false}
                                    className="w-full"
                                    options={nameSpecialty?.map((item) => {
                                        return {
                                            key: item.id,
                                            value: item.value,
                                            label: item.label
                                        }
                                    })}
                                />
                            </Form.Item>
                        </Space>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Space direction="vertical" className="w-full z-10">
                            <Form.Item
                                label={t("practiceType")}
                                rules={[{ required: true }]}
                                name={"practiceType"}>
                                <Select
                                    disabled={!form.getFieldValue('subDivision')}
                                    size="large"
                                    popupMatchSelectWidth={false}
                                    className="w-full"
                                    options={practiceType?.map((item) => {
                                        return {
                                            key: item.id,
                                            value: item.value,
                                            label: item.label
                                        }
                                    })}
                                />
                            </Form.Item>
                        </Space>
                    </Col>
                </Row>
                <Space direction="vertical" className="w-full mb-4 mt-8">
                    <span className="font-bold">
                        {t("tasksRange")}
                    </span>
                </Space>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.List name={'tasks'}
                            // rules={[{
                            //     validator: async (_, tasks) => {
                            //         if (tasks.length < 1 || tasks.length > 10) {
                            //             return Promise.reject(new Error(t("errorTaskCount")))
                            //         }
                            //     }
                            // }]}
                        >
                            {(fields, operation, { errors }) => (
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
                                                    >
                                                        <TextArea autoSize
                                                            size="large"
                                                            placeholder={t("taskDescription")}
                                                            className={'textArea'}
                                                        />
                                                    </Form.Item>
                                                </div>
                                                <Button
                                                    className={'mb-[24px]'}
                                                    size="large"
                                                    type="primary"
                                                    icon={<DeleteOutlined />}
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
                                        icon={<PlusOutlined />}
                                        onClick={() => operation.add()}
                                        disabled={fields.length === 72}
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
                                {t("save")}
                            </Button>
                            <span className={'text-lg text-[green]'}>{msg}</span>
                        </Space>
                    </Col>
                </Row>
            </Form>
        </section>
    )
}

export default EditTask
