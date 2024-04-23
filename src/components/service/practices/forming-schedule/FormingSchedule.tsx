import {
    Button,
    Col,
    DatePicker,
    Input,
    Row,
    Select,
    Space,
    Typography,
} from 'antd'
import {format} from 'date-fns/format'
import dayjs from 'dayjs'
import {useEffect, useState} from 'react'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'

import {ArrowLeftSvg} from '../../../../assets/svg'
import {
    useCreateDocumentMutation,
    useCreatePracticSceduleMutation
} from '../../../../store/api/practiceApi/taskService'
import {IDocumentInfo} from "../../../../models/Practice";


type PropsType = {
    setIsCreate: (value: boolean) => void
}

export const FormingSchedule = ({setIsCreate}: PropsType) => {
    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm<any>({
        mode: 'onBlur'
    })
    const [available, setAvailable] = useState(true)
    const [id, setId] = useState('')
    const [document, {data, isLoading, isSuccess}] = useCreateDocumentMutation()
    const [scedule] = useCreatePracticSceduleMutation()
    const navigate = useNavigate()

    const formDocument = () => {
        const data = {
            description: 'График практик'
        }
        document(data)
            .unwrap()
            .then(res => {
                setId(res.id)
            })
    }

    useEffect(() => {
        if (id) {
            setAvailable(false)
        }
    }, [id])

    const onSubmit: SubmitHandler<IDocumentInfo> = data => {
        const start = format(new Date(data.practiceStartDate), 'MM.dd.yyyy')
        const end = format(new Date(data.practiceEndDate), 'MM.dd.yyyy')
        const second = +data.firstYear + 1
        data.practiceStartDate = start
        data.practiceEndDate = end
        data.secondYear = second
        data.documentId = id

        scedule(data)
            .unwrap()
            .then(() => {
                setIsCreate(false)
            })
    }
    return (
        <section className="container">
            <Space size={10}>
                <Button
                    size="large"
                    className="mt-1"
                    icon={<ArrowLeftSvg className="w-4 h-4 cursor-pointer mt-1"/>}
                    type="text"
                    onClick={() => setIsCreate(false)}
                />
                <Typography.Text className="text-black text-3xl font-normal">
                    Формирование графика практик
                </Typography.Text>
            </Space>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Row gutter={[16, 16]} className="mt-12">
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Space direction="vertical" className="w-full">
                            <Typography.Text>Подразделение</Typography.Text>
                            <Controller
                                name="specialtyName"
                                control={control}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        size="large"
                                        popupMatchSelectWidth={false}
                                        placeholder=""
                                        defaultValue=""
                                        className="w-full"
                                        options={[
                                            {
                                                value:
                                                    'Институт фундаментальной медицины и биологии. Ординатура',
                                                label:
                                                    'Институт фундаментальной медицины и биологии. Ординатура'
                                            },
                                            {
                                                value: 'Институт фундаментальной медицины',
                                                label: 'Институт фундаментальной медицины'
                                            }
                                        ]}
                                    />
                                )}
                            />
                        </Space>
                    </Col>
                </Row>
                <Row gutter={[16, 16]} className="mt-4">
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Space direction="vertical" className="w-full">
                            <Typography.Text>Учебный год</Typography.Text>
                            <Controller
                                name="firstYear"
                                control={control}
                                render={({field, fieldState}) => (
                                    <Select
                                        {...field}
                                        size="large"
                                        popupMatchSelectWidth={false}
                                        placeholder=""
                                        defaultValue=""
                                        className="w-full"
                                        options={[
                                            {value: '2023', label: '2023'},
                                            {
                                                value: '2024',
                                                label: '2024'
                                            }
                                        ]}
                                    />
                                )}
                            />
                        </Space>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Space direction="vertical" className="w-full">
                            <Typography.Text>Курс обучения</Typography.Text>
                            <Controller
                                name="courseNumber"
                                control={control}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        size="large"
                                        popupMatchSelectWidth={false}
                                        placeholder=""
                                        defaultValue=""
                                        className="w-full"
                                        options={[
                                            {value: '1', label: '1'},
                                            {value: '2', label: '2'},
                                            {value: '3', label: '3'},
                                            {value: '4', label: '4'},
                                            {value: '5', label: '5'},
                                            {value: '6', label: '6'}
                                        ]}
                                    />
                                )}
                            />
                        </Space>
                    </Col>
                </Row>

                <Row gutter={[16, 16]} className="mt-4">
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Space direction="vertical" className="w-full">
                            <Typography.Text>Номер группы</Typography.Text>
                            <Controller
                                name="groupNumbers"
                                control={control}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        size="large"
                                        popupMatchSelectWidth={false}
                                        placeholder=""
                                        defaultValue=""
                                        className="w-full"
                                        options={[
                                            {
                                                value: '09-052',
                                                label: '09-052'
                                            },
                                            {
                                                value: '11-052',
                                                label: '11-052'
                                            }
                                        ]}
                                    />
                                )}
                            />
                        </Space>
                    </Col>
                </Row>

                <Row gutter={[16, 16]} className="mt-4">
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Space direction="vertical" className="w-full">
                            <Typography.Text>
                                Шифр и наименование специальности
                            </Typography.Text>
                            <Controller
                                name="specialtyCode"
                                control={control}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        size="large"
                                        popupMatchSelectWidth={false}
                                        placeholder=""
                                        defaultValue=""
                                        className="w-full"
                                        options={[
                                            {
                                                value: '31.08.01. Акушерство и гинекология',
                                                label: '31.08.01. Акушерство и гинекология'
                                            },
                                            {
                                                value: '31.08.02. Акушерство',
                                                label: '31.08.02. Акушерство'
                                            }
                                        ]}
                                    />
                                )}
                            />
                        </Space>
                    </Col>
                </Row>

                <Row gutter={[16, 16]} className="mt-4">
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Space direction="vertical" className="w-full">
                            <Typography.Text>Уровень образования</Typography.Text>
                            <Controller
                                name="educationLevel"
                                control={control}
                                render={({field, fieldState}) => (
                                    <Select
                                        {...field}
                                        size="large"
                                        popupMatchSelectWidth={false}
                                        placeholder=""
                                        defaultValue=""
                                        className="w-full"
                                        options={[
                                            {value: 'MASTER_DEGREE', label: 'MASTER_DEGREE'},
                                            {
                                                value: 'SPECIALIST_DEGREE',
                                                label: 'SPECIALIST_DEGREE'
                                            },
                                            {value: 'BACHELOR_DEGREE', label: 'BACHELOR_DEGREE'},
                                            {value: 'RESIDENCY_DEGREE', label: 'RESIDENCY_DEGREE'}
                                        ]}
                                    />
                                )}
                            />
                        </Space>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Space direction="vertical" className="w-full">
                            <Typography.Text>Форма обучения</Typography.Text>
                            <Controller
                                name="educationType"
                                control={control}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        size="large"
                                        popupMatchSelectWidth={false}
                                        placeholder=""
                                        defaultValue=""
                                        className="w-full"
                                        options={[{value: 'Очное', label: 'Очное'}]}
                                    />
                                )}
                            />
                        </Space>
                    </Col>
                </Row>

                <Row gutter={[16, 16]} className="mt-4">
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Space direction="vertical" className="w-full">
                            <Typography.Text>Вид практики</Typography.Text>
                            <Controller
                                name="educationalOrProductionType"
                                control={control}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        size="large"
                                        popupMatchSelectWidth={false}
                                        placeholder=""
                                        defaultValue=""
                                        className="w-full"
                                        options={[
                                            {
                                                value: 'Производственная',
                                                label: 'Производственная'
                                            }
                                        ]}
                                    />
                                )}
                            />
                        </Space>
                    </Col>
                </Row>

                <Row gutter={[16, 16]} className="mt-4">
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Space direction="vertical" className="w-full">
                            <Typography.Text>Тип практики</Typography.Text>
                            <Controller
                                name="practiceType"
                                control={control}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        size="large"
                                        popupMatchSelectWidth={false}
                                        placeholder=""
                                        defaultValue=""
                                        className="w-full"
                                        options={[
                                            {
                                                value: 'Производственная',
                                                label: 'Производственная'
                                            }
                                        ]}
                                    />
                                )}
                            />
                        </Space>
                    </Col>
                </Row>

                <Row gutter={[16, 16]} className="mt-4">
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Space direction="vertical" className="w-full">
                            <Typography.Text>Начало периода практики</Typography.Text>
                            <Controller
                                name="practiceStartDate"
                                control={control}
                                render={({field, fieldState}) => (
                                    <DatePicker
                                        {...field}
                                        status={fieldState.error ? 'error' : undefined}
                                        value={field.value ? dayjs(field.value) : null}
                                        onChange={date => {
                                            field.onChange(date ? date.valueOf() : null)
                                        }}
                                        size="large"
                                        format="DD-MM-YYYY"
                                        placeholder=""
                                        className="w-full"
                                        renderExtraFooter={() =>
                                            errors.contractTime &&
                                            errors.contractTime.message && (
                                                <Typography.Text type="danger">
                                                    {errors.contractTime.message as any}
                                                </Typography.Text>
                                            )
                                        }
                                    />
                                )}
                            />
                        </Space>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Space direction="vertical" className="w-full">
                            <Typography.Text>Окончание периода практики</Typography.Text>
                            <Controller
                                name="practiceEndDate"
                                control={control}
                                render={({field}) => (
                                    <DatePicker
                                        {...field}
                                        // status={fieldState.error ? 'error' : undefined}
                                        value={field.value ? dayjs(field.value) : null}
                                        onChange={date => {
                                            field.onChange(date ? date.valueOf() : null)
                                        }}
                                        size="large"
                                        format="DD-MM-YYYY"
                                        placeholder=""
                                        className="w-full"
                                        renderExtraFooter={() =>
                                            errors.contractTime &&
                                            errors.contractTime.message && (
                                                <Typography.Text type="danger">
                                                    {errors.contractTime.message as any}
                                                </Typography.Text>
                                            )
                                        }
                                    />
                                )}
                            />
                        </Space>
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
                                disabled={available}
                            >
                                Сохранить
                            </Button>
                            <Button
                                className="!rounded-full"
                                size="large"
                                loading={isLoading}
                                disabled={data ? true : false}
                                onClick={formDocument}
                            >
                                Сформировать документ
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </form>
        </section>
    )
}
