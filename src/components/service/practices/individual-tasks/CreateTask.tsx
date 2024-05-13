import {DeleteOutlined, PlusOutlined} from '@ant-design/icons'
import {MenuOutlined} from '@ant-design/icons'
import type {DragEndEvent} from '@dnd-kit/core'
import {DndContext} from '@dnd-kit/core'
import {restrictToVerticalAxis} from '@dnd-kit/modifiers'
import {
    SortableContext,
    arrayMove,
    useSortable,
    verticalListSortingStrategy
} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'
import {yupResolver} from '@hookform/resolvers/yup'
import {Button, Col, Form, Input, List, Row, Select, Space, Typography} from 'antd'
import {Table} from 'antd'
import type {ColumnsType} from 'antd/es/table'
import dayjs from 'dayjs'
import React, {useState} from 'react'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import {isDataView} from 'util/types'

import {ArrowLeftSvg} from '../../../../assets/svg'
import {DeleteSvg} from '../../../../assets/svg/DeleteSvg'
import {useCreateTaskMutation} from '../../../../store/api/practiceApi/taskService'
import {INewTaskType, NewTaskSchema} from '../validation'
import {validateMessages} from "../../../../utils/validateMessage";
import TextArea from "antd/es/input/TextArea";
import './CreateTask.scss'
interface IFormInput {
    practiceType: { label: string }
    specialityName: { label: string }
}

interface DataType {
    key: string
    name: string
}

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    'data-row-key': string
}

const Rows = ({children, ...props}: RowProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: props['data-row-key']
    })

    const style: React.CSSProperties = {
        ...props.style,
        transform: CSS.Transform.toString(transform && {...transform, scaleY: 1}),
        transition,
        ...(isDragging ? {position: 'relative', zIndex: 9999} : {})
    }

    return (
        <tr {...props} ref={setNodeRef} style={style} {...attributes}>
            {
                //@ts-ignore
                (React.Children as any).map(children, child => {
                    if ((child as React.ReactElement).key === 'sort') {
                        return React.cloneElement(child as React.ReactElement, {
                            children: (
                                <MenuOutlined
                                    ref={setActivatorNodeRef}
                                    style={{touchAction: 'none', cursor: 'move'}}
                                    {...listeners}
                                />
                            )
                        })
                    }
                    return child
                })
            }
        </tr>
    )
}

const CreateTask = () => {
    const [createTask] = useCreateTaskMutation()
    const {
        control,
        handleSubmit,
        watch,
        setValue,
        getValues,
        formState: {errors}
    } = useForm<INewTaskType>({
        resolver: yupResolver(NewTaskSchema),
        mode: 'onBlur',
        defaultValues: {
            dataSource: []
        }
    })

    const [dataSource, setDataSource] = useState<{ key: string; name: string }[]>(
        []
    )
    const columns: ColumnsType<DataType> = [
        {
            key: 'sort'
        },
        {
            key: 'x',
            render(_, __, index) {
                return <>{++index}</>
            }
        },
        {
            width: '100%',
            title: '',
            dataIndex: 'name'
        },
        {
            title: '',
            dataIndex: '',
            key: 'x',
            render: (param, __, index) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={<DeleteSvg/>}
                        danger
                        onClick={() => handleDeleteTask(param.key)}
                    />
                </Space>
            )
        }
    ]
    const onDragEnd = ({active, over}: DragEndEvent) => {
        if (active.id !== over?.id) {
            const currentDataSource = getValues('dataSource') || []

            const activeIndex = currentDataSource.findIndex(
                (i: any) => i.key === active.id
            )
            const overIndex = currentDataSource.findIndex(
                (i: any) => i.key === over?.id
            )
            const updatedDataSource = arrayMove(
                currentDataSource,
                activeIndex,
                overIndex
            )

            setValue('dataSource', updatedDataSource, {shouldValidate: true})
        }
    }
    const dataTest = watch('dataSource')
    const handleAddTask = () => {
        const currentInputValue = watch('dataInput')
        const currentDataSource = getValues('dataSource') || []

        const newTask = {
            key: `${currentDataSource.length + 1}`,
            name: currentInputValue
        }

        const updatedDataSource = [...currentDataSource, newTask]

        setValue('dataSource', updatedDataSource, {shouldValidate: true})
        setValue('dataInput', '')
    }
    const handleDeleteTask = (key: string) => {
        const currentDataSource = getValues('dataSource') || []

        const updatedDataSource = currentDataSource.filter(
            (item: any) => item.key !== key
        )

        setValue('dataSource', updatedDataSource, {shouldValidate: true})
    }
    const onSubmit: SubmitHandler<INewTaskType> = data => {
        const {specialityName, practiceType} = data
        const namesArray = data.dataSource?.map((item: { name: any }) => item.name)
        if (namesArray) {
            const newTask = {
                specialityName: specialityName,
                practiceType: practiceType,
                tasks: namesArray
            }
            createTask(newTask)
                .unwrap()
                .then(() => {
                    navigate('/services/practices/individualTasks/')
                })
        }
    }
    const navigate = useNavigate()

    //приходить с бэка
    const optionsSpecialityName = [
        {value: '31.08.01 Акушерство и гинекология', label: '31.08.01 Акушерство и гинекология'},
        {value: '31.08.12 Педиатрия', label: '31.08.12 Педиатрия'}
    ]
    //
    const optionsPracticeType = [
        {
            value: 'Производственная',
            label: 'Производственная'
        },
        {
            value: 'Учебная',
            label: 'Учебная'
        }
    ]
    const [tasks, setTasks] = useState<string[] | undefined>(['1.Test', '2.Test'])

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
            <Form validateMessages={validateMessages}
                  onFinish={(values) => console.log(values)}
                  layout={'vertical'}
            >
                <Row gutter={[16, 16]} className="mt-4">
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Space direction={'vertical'} className={'w-full'}>
                            <span>
								Шифр и наименование специальности
							</span>
                            <Form.Item name={'specialityName'}>
                                <Select
                                    size="large"
                                    popupMatchSelectWidth={false}
                                    className="w-full"
                                    options={optionsSpecialityName}
                                />
                            </Form.Item>
                        </Space>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Space direction="vertical" className="w-full z-10">
                            <span>Тип практики</span>
                            <Form.Item name={"practiceType"}>
                                <Select
                                    size="large"
                                    popupMatchSelectWidth={false}
                                    className="w-full"
                                    options={optionsPracticeType}
                                />
                            </Form.Item>
                        </Space>
                    </Col>
                </Row>
                <Space direction="vertical" className="w-full  mb-4 mt-8">
                    <span className="font-bold">
                        Индивидуальные задания
                    </span>
                </Space>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        {/*<DndContext*/}
                        {/*    modifiers={[restrictToVerticalAxis]}*/}
                        {/*    onDragEnd={onDragEnd}*/}
                        {/*>*/}
                        {/*    <SortableContext*/}
                        {/*        // rowKey array*/}
                        {/*        items={dataTest ? dataTest.map((i: any) => i.key) : []}*/}
                        {/*        strategy={verticalListSortingStrategy}*/}
                        {/*    >*/}
                        {/*        <Table*/}
                        {/*            components={{body: {row: Rows}}}*/}
                        {/*            showHeader={false}*/}
                        {/*            pagination={false}*/}
                        {/*            rowKey="key"*/}
                        {/*            bordered={false}*/}
                        {/*            columns={columns}*/}
                        {/*            dataSource={dataTest}*/}
                        {/*        />*/}
                        {/*    </SortableContext>*/}
                        {/*</DndContext>*/}

                        <Form.List name={'tasks'}
                                   initialValue={[{
                                       task: ''
                                   }]}
                        >
                            {(fields, operation) => (
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
                                                               className={'w-full h-min'}>
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
                                    <Button
                                        size="large"
                                        type="primary"
                                        icon={<PlusOutlined/>}
                                        onClick={() => operation.add()}
                                    />
                                </>
                            )}
                        </Form.List>

                        {/*<Form.Item*/}
                        {/*    name={'tasks'}>*/}
                        {/*    <List*/}
                        {/*        size="small"*/}
                        {/*        bordered*/}
                        {/*        dataSource={tasks}*/}
                        {/*        renderItem={(item) => <List.Item>{item}</List.Item>}*/}
                        {/*    >*/}

                        {/*    </List>*/}

                        {/*</Form.Item>*/}

                    </Col>
                </Row>
                <Row gutter={[16, 16]} className="mt-4">
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        {/*<Controller*/}
                        {/*    name="dataInput"*/}
                        {/*    control={control}*/}
                        {/*    render={({field}) => (*/}
                        {/*        <Space.Compact style={{width: '100%'}}>*/}
                        {/*            <Input*/}
                        {/*                {...field}*/}
                        {/*                size="large"*/}
                        {/*                placeholder="type task..."*/}
                        {/*            />*/}
                        {/*            <Button*/}
                        {/*                size="large"*/}
                        {/*                type="primary"*/}
                        {/*                icon={<PlusOutlined/>}*/}
                        {/*                onClick={handleAddTask}*/}
                        {/*            />*/}
                        {/*        </Space.Compact>*/}
                        {/*    )}*/}
                        {/*/>*/}
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
