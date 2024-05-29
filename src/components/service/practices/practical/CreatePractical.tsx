import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Row,
    Select,
    Space,
    Typography
} from 'antd'
import React, {useState} from 'react'
import {ArrowLeftSvg} from '../../../../assets/svg'
import {validateMessages} from "../../../../utils/validateMessage";
import {NewPractice, NewPracticeSend} from "../../../../models/Practice";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {string} from "yup";

interface FilterType {
    value: string | number
    label: string | number
}

const optionsSpecialization: FilterType[] = [
    {
        value: '31.08.01 Акушерство и гинекология',
        label: '31.08.01 Акушерство и гинекология'
    },
    {
        value: '31.08.12 Педиатрия',
        label: '31.08.12 Педиатрия'
    }
]
const optionsDepartment: FilterType[] = [
    {
        value: 'Кафедра хирургических болезней постдипломного образования',
        label: 'Кафедра хирургических болезней постдипломного образования'
    },
    {
        value: 'Кафедра онкологических болезней',
        label: 'Кафедра онкологических болезней'
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
        value: 'Технологическая',
        label: 'Технологическая'
    }
]


export const CreatePractical = () => {

    const [form] = Form.useForm()

    function onFinish(values: NewPractice) {
        values.startStudy = dayjs(values.startStudy).format('DD.MM.YYYY')
        values.endStudy = dayjs(values.endStudy).format('DD.MM.YYYY')

        const sendData: NewPracticeSend = {
            specialityName: values.specialityName,
            practiceType: values.practiceType,
            department: values.department,
            groupNumber: values.groupNumber,
            semester: values.semester,
            academicYear: values.academicYear,
            courseStudy: values.courseStudy,
            startStudy: values.startStudy,
            amountHours: values.amountHours,
            endStudy: values.endStudy,
            tasks: values.tasks.map(elem => elem.task),
            codeCompetencies: values.codeCompetencies.map(elem => elem.codeCompetence),
            director: values.director
        }

        console.log(sendData)

    }

    return (
        <section className="container">
            <Space size={10} align="center">
                <Button
                    size="large"
                    className="mt-1"
                    icon={<ArrowLeftSvg className="w-4 h-4 cursor-pointer mt-1"/>}
                    type="text"
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
                                options={optionsSpecialization}
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
                                options={optionsTypePractice}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item
                            rules={[{required: true}]}
                            name={'department'}
                            label={'Кафедра'}>
                            <Select
                                size="large"
                                popupMatchSelectWidth={false}
                                className="w-full"
                                options={optionsDepartment}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item
                            rules={[{required: true}]}
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
                            rules={[{required: true}]}
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
                            rules={[{required: true}]}
                            name={'academicYear'}
                            label={'Учебный год'}>
                            <Select
                                size="large"
                                popupMatchSelectWidth={false}
                                className="w-full"
                                options={[
                                    {value: '2022', label: '2022'},
                                    {value: '2023', label: '2023'},
                                    {value: '2024', label: '2024'}
                                ]}
                            />

                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Form.Item
                            rules={[{required: true}]}
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
                            rules={[{required: true}]}
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
                            rules={[{required: true}]}
                            name={'amountHours'}
                            label={'Общее количество часов по практике'}>
                            <Input
                                type="text"
                                className="w-full"
                                size="large"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Form.Item
                            rules={[{required: true}]}
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
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Space direction="vertical" className="w-full mb-4">
                            <span className="font-bold">
                                Код и наименование компетенции (от 1 до 10)
                            </span>
                        </Space>
                        <Form.List name={'codeCompetencies'}
                                   initialValue={[{}]}
                                   rules={[{
                                       validator: async (_, tasks) => {
                                           if (tasks.length < 1 || tasks.length > 10) {
                                               return Promise.reject(new Error('Компетенций может быть от 1 до 10'))
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
                                                                   required: true
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
                                        disabled={fields.length === 10}
                                    />
                                </>
                            )}
                        </Form.List>
                    </Col>
                </Row>

                <Row gutter={[16, 16]} className={'mt-4'}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item
                            rules={[{required: true}]}
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

