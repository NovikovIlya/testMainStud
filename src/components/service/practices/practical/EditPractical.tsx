import {
    Button,
    Col,
    DatePicker,
    Form, InputNumber,
    List,
    Row,
    Select,
    Space,
    Spin,
    TreeSelect
} from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeftSvg } from '../../../../assets/svg';
import { validateMessages } from "../../../../utils/validateMessage";
import { Department, FilterType } from "../../../../models/Practice";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import { OptionsNameSpecialty } from "../roster/registerContracts/RegisterContracts";
import { useGetSpecialtyNamesForPractiseQuery } from "../../../../store/api/practiceApi/roster";
import { useGetCompentencesQuery, useGetDepartmentDirectorsQuery, useGetGroupNumbersQuery, useGetPracticeKindQuery, useGetPracticeOneQuery, useGetPracticeTypeForPracticeQuery, useGetSubdivisionForPracticeQuery, useGetTasksForPracticeQuery, useIsPeopleInGroupQuery, useUpdatePracticeOneMutation } from '../../../../store/api/practiceApi/individualTask';
import { processingOfDivisions } from '../../../../utils/processingOfDivisions';
import { useGetCafDepartmentsQuery } from '../../../../store/api/practiceApi/practical';
import { useAppDispatch } from '../../../../store';
import './EditPractical.module.scss';
import { showNotification } from '../../../../store/reducers/notificationSlice';
import { SkeletonPage } from './Skeleton';
import { DeleteOutlined } from '@ant-design/icons';
import { DeleteRedSvg } from '../../../../assets/svg/DeleteRedSvg';
import { disableParents } from '../../../../utils/disableParents';
import { Vector } from '../../../../assets/svg/Vector';

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

export const EditPractical = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm<any>()
    const [departments, setDepartments] = useState<Department[]>()
    const path = useLocation()
    const id = path.pathname.split('/').at(-1)!
    const nav = useNavigate()
    const [pickCourse, setPickCourse] = useState<any>(form?.getFieldValue('course'))
    const [pickSpeciality, setPickSpeciality] = useState<any>(null)
    const [pickKind, setPickKind] = useState(null)
    const [arqTask, setArqTask] = useState<any>(null)
    const [pickDate, setPickDate] = useState<any>(null)
    const [fullDate, setFullDate] = useState<any>(null)
    const [idSub, setIdSub] = useState<any>(null)
    const [subDivisionId, setSubDevisionId] = useState<null | string>(null)
    const [pickType, setPickType] = useState(null)
    const [objType, setObjType] = useState({
        subdivisionId: null,
        specialtyNameId: null
    })
    const [nameSpecialtyId, setNameSpecialtyId] = useState<any>(null)
    const [nameSpecialty, setNameSpecialty] = useState<OptionsNameSpecialty[]>()
    const [objectForCompetences, setObjectForCompetences] = useState<any>({
        specialityId: null,
        practiceKindId: null
    })
    const { data: dataOnePractise, isSuccess: isSuccesOnePractise, isFetching: isFetchingDataOnePractise } = useGetPracticeOneQuery(id)
    const { data: dataNameSpecialty, isSuccess: isSuccessNameSpecialty } = useGetSpecialtyNamesForPractiseQuery(subDivisionId, { skip: !subDivisionId })
    const { data: dataCompetences, isSuccess: isSuccessCompetences } = useGetCompentencesQuery(objectForCompetences, { skip: true === null || objectForCompetences.practiceKindId === null })
    const { data: dataDepartments, isSuccess: isSuccessDepartments } = useGetSubdivisionForPracticeQuery()
    const { data: dataPracticeType, isSuccess: isSuccessPracticeType } = useGetPracticeTypeForPracticeQuery(objType, { skip: objType.subdivisionId === null || objType.specialtyNameId === null })
    const { data: dataDepartmentDirector } = useGetDepartmentDirectorsQuery(subDivisionId, { skip: !subDivisionId })
    const { data: dataCaf } = useGetCafDepartmentsQuery(subDivisionId, { skip: !subDivisionId })
    const { data: dataGroupNumbers } = useGetGroupNumbersQuery(subDivisionId, { skip: !subDivisionId })
    const { data: dataPraciseKind, isSuccess: isSuccesPractiseKind } = useGetPracticeKindQuery(subDivisionId, { skip: !subDivisionId })
    const { data: dataSubdivisonForPractise } = useGetSubdivisionForPracticeQuery()
    const { data: dataTask, isSuccess: isSuccessTask } = useGetTasksForPracticeQuery(arqTask, { skip: !arqTask })
    const [updateForm, { isLoading: isLoadingSendForm }] = useUpdatePracticeOneMutation()
    const [copyDataCompetences, setCopyDataCompetences] = useState<any>([])
    const [flagCompetence, setFlagCompentence] = useState(false)
    const [flag, setFlag] = useState(false)
    const dispatch = useAppDispatch()
    const [treeLine, setTreeLine] = useState(true);
    const [showLeafIcon, setShowLeafIcon] = useState(false);
    const [value, setValue] = useState<any>();

    useEffect(() => {
        if (!flagCompetence) {
            setCopyDataCompetences(dataOnePractise?.competence)
        }
        if (flagCompetence) {
            setCopyDataCompetences(dataCompetences)
        }
    }, [dataCompetences, dataOnePractise?.competence, flagCompetence])

    useEffect(() => {
        setSubDevisionId(dataOnePractise?.subdivisionId)
    }, [isSuccesOnePractise])

    useEffect(() => {
        const idSubdevision = dataDepartments?.find((item: any) => {
            if (item.value === dataOnePractise?.subdivision) {
                return item
            }
            return item?.responses?.find((elem: any) => {
                if (elem.value === dataOnePractise?.subdivision) {
                    return elem
                }
            })
        })
        setIdSub(idSubdevision?.id)
    }, [dataDepartments, dataOnePractise?.subdivision])

    // объект для практики
    useEffect(() => {
        if (isSuccessDepartments && isSuccessNameSpecialty) {
            const objTypeZ = {
                ...objType,
                subdivisionId: subDivisionId,
                specialtyNameId: dataNameSpecialty?.find((item: any) => {
                    if (item.value === form.getFieldValue('specialityName')) {
                        return item
                    }
                })?.id
            }
            // @ts-ignore
            setObjType(objTypeZ)
        }
    }, [form, dataNameSpecialty, isSuccessDepartments, isSuccessNameSpecialty])

    useEffect(() => {
        if (isSuccessDepartments && isSuccessNameSpecialty) {
            const objTypeZ = {
                ...objType,
                subdivisionId: subDivisionId || null,
                specialtyNameId: dataNameSpecialty?.find((item: any) => {
                    if (item.value === form.getFieldValue('specialityName')) {
                        return item
                    }
                })?.id || null
            }
            // @ts-ignore
            setObjType(objTypeZ)
        }
    }, [pickSpeciality, form, dataDepartments, dataNameSpecialty, isSuccessDepartments, isSuccessNameSpecialty, subDivisionId])

    // получение подразделений
    useEffect(() => {
        if (isSuccessDepartments) {
            setDepartments(processingOfDivisions(dataDepartments))
        }
    }, [dataDepartments]);

    // получение наименование специальностей
    useEffect(() => {
        if (isSuccessNameSpecialty) {
            setNameSpecialty(dataNameSpecialty)
        }
    }, [dataNameSpecialty]);

    // очистка полей при смене подразделения
    useEffect(() => {
        if (isSuccesOnePractise) {
            if (subDivisionId !== dataOnePractise?.subdivisionId || flag) {
                form.setFieldValue('specialityName', '')
                form.setFieldValue('practiceType', '')
                form.setFieldValue('groupNumber', '')
                form.setFieldValue('director', '')
                form.setFieldValue('department', '')
                form.setFieldValue('practiceKind', '')
            }
            // проверить на работоспособность кода
            else {
                setFlag(true)
            }
        }
    }, [dataOnePractise, subDivisionId, isSuccesOnePractise]);

    // заполнения объекта для компетенции
    useEffect(() => {
        if (isSuccesOnePractise && isSuccesPractiseKind && isSuccessNameSpecialty) {
            setObjectForCompetences({
                specialityId: dataNameSpecialty?.find((elem: any) => {
                    if (elem.value === form.getFieldValue('specialityName')) {
                        return elem
                    }
                })?.id,
                practiceKindId: dataPraciseKind?.find(elem => {
                    if (elem.value === form.getFieldValue('practiceKind')) {
                        return elem
                    }
                })?.id
            })
        }
    }, [dataNameSpecialty, isSuccesOnePractise, dataPraciseKind, form, pickKind, dataPraciseKind, fullDate])

    // вставка
    useEffect(() => {
        if (isSuccesOnePractise) {
            form.setFieldValue('practiceType', dataOnePractise.practiceType);
            form.setFieldValue('practiceKind', dataOnePractise.practiceKind);
            form.setFieldValue('specialityName', dataOnePractise.specialtyName);
            form.setFieldValue('department', dataOnePractise.department);
            form.setFieldValue('groupNumber', dataOnePractise.groupNumber);
            form.setFieldValue('semester', dataOnePractise.semester);

            const [startYear, endYear] = dataOnePractise.academicYear.split('/');
            const startDate = dayjs(startYear, 'YYYY');
            const endDate = dayjs(endYear, 'YYYY');
            form.setFieldValue('academicYear', [startDate, endDate]);

            form.setFieldValue('subDivision', [{
                title: dataOnePractise.subdivision,
                // @ts-ignore
                value: dataOnePractise.subdivisionId
            }]);

            form.setFieldValue('courseStudy', dataOnePractise.courseNumber);
            form.setFieldValue('period', [dayjs(dataOnePractise.practicePeriod[0], 'YYYY.MM.DD'), dayjs(dataOnePractise.practicePeriod[1], 'YYYY.MM.DD')]);
            form.setFieldValue('amountHours', dataOnePractise.totalHours);
            form.setFieldValue('director', dataOnePractise.departmentDirector);
        }
    }, [isSuccesOnePractise, isSuccessDepartments])

    // получение инд заданий
    useEffect(() => {
        if (isSuccessPracticeType) {
            const pickTypeId = dataPracticeType?.find((elem: any) => {
                if (elem.value === form.getFieldValue('practiceType')) {
                    return elem
                }
            })
            const pickSpecialityId = dataNameSpecialty?.find((elem: any) => {
                if (elem.value === form.getFieldValue('specialityName')) {
                    return elem
                }
            })
            setArqTask({ ...arqTask, specialtyNameId: pickSpecialityId?.id, practiceTypeId: pickTypeId?.id })
        }
    }, [dataNameSpecialty, dataPracticeType, isSuccessTask, pickSpeciality, pickType, form])

    function onFinish(values: any) {
        const directorId = dataDepartmentDirector?.find((elem: any) => {
            if (elem.value === values.director) {
                return elem
            }
        })

        const groupNumberId = dataGroupNumbers?.find((elem: any) => {
            if (elem.value === values.groupNumber) {
                return elem
            }
        })
        const pickSpecialityId = dataNameSpecialty?.find((elem: any) => {
            if (elem.value === values.specialityName) {
                return elem
            }
        })
        const practisePickId = dataPracticeType?.find((elem: any) => {
            if (elem.value === values.practiceType) {
                return elem
            }
        })
        const departmenIdZ = dataCaf?.find(elem => {
            if (elem.value === values.department) {
                return elem
            }
        })

        const [startDate, endDate] = form.getFieldValue('academicYear');

        const mother = dataSubdivisonForPractise?.find((item: any) => {
            if (form.getFieldValue('subDivision').includes('-')) {
                if ('responses' in item) {
                    return item.responses?.find((elem: any) => {
                        if (form.getFieldValue('subDivision').split(" - ")[1] === elem.value) {
                            return elem
                        }
                    })
                }

                if (item.value === form.getFieldValue('subDivision').split(" - ")[1]) {
                    return item
                } else {
                    return form.getFieldValue('subDivision').split(" - ")[1]
                }
            } else {
                if ('responses' in item) {
                    return item.responses?.find((elem: any) => {
                        if (form.getFieldValue('subDivision') === elem.value) {
                            return elem
                        }
                    })
                }
                if (item.value === form.getFieldValue('subDivision')) {
                    return item
                } else {
                    return form.getFieldValue('subDivision')
                }
            }
        })

        const child = (form.getFieldValue('subDivision').includes('-')) ?
            mother?.responses?.find((item: any) => item.value === form.getFieldValue('subDivision').split(" - ")[1]).id
            : mother?.id

        const sendData: any = {
            id: dataOnePractise?.id,
            practiceType: values.practiceType,
            department: values.department,
            groupNumberId: groupNumberId?.id,
            semester: values.semester,
            academicYear: {
                start: startDate.$y,
                end: endDate.$y
            },
            courseNumber: values.courseStudy,
            startDate: `${String(form?.getFieldValue('period')[0].$D)}.${String(form?.getFieldValue('period')[0].$M + 1).padStart(2, '0')}.${String(form?.getFieldValue('period')[0].$y)}`,
            endDate: `${String(form?.getFieldValue('period')[1].$D)}.${String(form?.getFieldValue('period')[1].$M + 1).padStart(2, '0')}.${String(form?.getFieldValue('period')[1].$y)}`,
            totalHours: String(values.amountHours),
            competenceIds: copyDataCompetences?.map((item: any) => String(item.id)),
            departmentDirectorId: directorId?.id,
            subdivisionId: subDivisionId,
            specialtyNameId: pickSpecialityId?.id,
            practiceKindId: dataPraciseKind?.find((item) => {
                if (item.value === values.practiceKind) {
                    return item
                }
            })?.id,
            practiceTypeId: practisePickId?.id,
            // @ts-ignore
            departmentId: departmenIdZ?.id,
        }
        updateForm(sendData)
            .unwrap()
            .then(() => {
                nav('/services/practices/practical')
            })
            .catch((error) => {
                if (error.status === 400) {
                    dispatch(showNotification({ message: 'Такая практика уже создана', type: 'error' }));
                }
            })
    }

    const onChangePicker = (value: any) => {
        setPickDate([value[0].$y, value[1].$y])
        setFullDate(value)
        setFlagCompentence(true)
    }

    const onChangeTypePick = (value: any) => {
        setPickType(value)
        setFlagCompentence(true)
    }

    const handleChange = (value: string) => {
        departments?.find(elem => {
            if (elem.label === value) {
                setSubDevisionId(elem.id)
            }
        })
        setFlagCompentence(true)
    };

    const handleKind = (value: any) => {
        setPickKind(value)
        setFlagCompentence(true)
    }

    const handleSpeciality = (value: any) => {
        setPickSpeciality(value)
        form.setFieldValue('practiceType', '')
        setFlagCompentence(true)
    }

    const onChangePickerPeriodPractise = (value: any) => {
        console.log(value)
    }

    const handleCourse = (value: any) => {
        setPickCourse(value)
        form.setFieldValue('semester', '')
    }

    const dataTaskValid = dataTask?.tasks.map((item: any) => item.taskDescription)

    const optionsCourseValid = (() => {
        const validPickCourse = pickCourse === undefined ? dataOnePractise?.courseNumber : pickCourse
        switch (validPickCourse) {
            case '1':
                return [
                    { value: '1', label: '1' },
                    { value: '2', label: '2' }
                ];
            case '2':
                return [
                    { value: '3', label: '3' },
                    { value: '4', label: '4' }
                ];
            case '3':
                return [
                    { value: '5', label: '5' },
                    { value: '6', label: '6' }
                ];
            case '4':
                return [
                    { value: '7', label: '7' },
                    { value: '8', label: '8' }
                ];
            case '5':
                return [
                    { value: '9', label: '9' },
                    { value: '10', label: '10' }
                ];
            case '6':
                return [
                    { value: '11', label: '11' },
                    { value: '12', label: '12' }
                ];
            default:
                return [];
        }
    })()

    const deleteCompetence = (item: any) => {
        const newCompetences = copyDataCompetences.filter((elem: any) => elem.id !== item.id)
        setCopyDataCompetences(newCompetences)
    }

    const onPopupScroll: any = (e: any) => {
        console.log('onPopupScroll', e);
    };

    const onChange = (newValue: string) => {
        console.log('newValue', newValue)
        setSubDevisionId(newValue)
    };

    const treeData = dataDepartments?.map((item: any) => {
        return {
            title: item.value,
            value: item.id,
            // @ts-ignore
            children: item?.responses?.map((item) => {
                return {
                    title: item.value,
                    value: item.id,
                }
            })
        }
    })

    if (isFetchingDataOnePractise) return <SkeletonPage />

    return (
        <Spin spinning={isLoadingSendForm}>
            <section className="container animate-fade-in">
                <Space size={10} align="center">
                    <Button
                        size="large"
                        style={{ width: '48px' }}
                        className="mt-1 mr-6 w-[48px] rounded-full border border-black"
                        icon={<Vector />}
                        type="text"
                        onClick={() => {
                            nav('/services/practices/practical.ts/')
                        }}
                    />
                    <span className=" text-[28px] font-normal">
                        {t('editPractice')}
                    </span>
                </Space>
                <Form<any>
                    validateMessages={validateMessages}
                    form={form}
                    onFinish={(values) => onFinish(values)}
                    layout={'vertical'}>
                    <Row gutter={[16, 16]} className="mt-12">
                        <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                            <Space direction={'vertical'} className={'w-full'}>
                                <Form.Item label={t('department')}
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
                    <Row gutter={[16, 16]} className="">
                        <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                            <Form.Item
                                label={t('specialityName')}
                                name={'specialityName'}
                                rules={[{ required: true }]}>
                                <Select
                                    showSearch
                                    size="large"
                                    onChange={handleSpeciality}
                                    popupMatchSelectWidth={false}
                                    className="w-full"
                                    options={nameSpecialty?.map((item) => {
                                        return {
                                            key: item.id,
                                            value: item.value,
                                            label: item.value
                                        }
                                    })}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                            <Form.Item
                                rules={[{ required: true }]}
                                name={'practiceType'}
                                label={t('practiceKind')}>
                                <Select
                                    showSearch
                                    onChange={onChangeTypePick}
                                    size="large"
                                    popupMatchSelectWidth={false}
                                    className="w-full"
                                    options={dataPracticeType?.map((item: any) => {
                                        return {
                                            key: item.id,
                                            value: item.value,
                                            label: item.value
                                        }
                                    })}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                            <Form.Item
                                rules={[{ required: true }]}
                                name={'practiceKind'}
                                label={t('practiceKind')}>
                                <Select
                                    showSearch
                                    size="large"
                                    popupMatchSelectWidth={false}
                                    onChange={handleKind}
                                    className="w-full"
                                    options={dataPraciseKind}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                            <Form.Item
                                rules={[{ required: true }]}
                                name={'department'}
                                label={t('department')}>
                                <Select
                                    showSearch
                                    size="large"
                                    popupMatchSelectWidth={false}
                                    className="w-full"
                                    options={dataCaf}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                            <Form.Item
                                rules={[{ required: true }]}
                                name={'groupNumber'}
                                label={t('groupNumber')}>
                                <Select
                                 
                                    showSearch
                                    optionFilterProp="label"
                                    size="large"
                                    popupMatchSelectWidth={false}
                                    className="w-full"
                                    options={dataGroupNumbers?.map((item: any) => {
                                        return {
                                            key: item.id,
                                            value: item.value,
                                            label: item.label
                                        }
                                    })}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                            <Form.Item
                                rules={[{ required: true }]}
                                name={'semester'}
                                label={t('semester')}>
                                <Select
                                      showSearch
                                    size="large"
                                    popupMatchSelectWidth={false}
                                    className="w-full"
                                    options={optionsCourseValid}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                            <Form.Item
                                rules={[{ required: true }]}
                                name={'academicYear'}
                                label={t('academicYear')}>
                                <DatePicker.RangePicker
                                    onChange={onChangePicker}
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
                                rules={[{ required: true }]}
                                name={'courseStudy'}
                                label={t('courseStudy')}>
                                <Select
                                    showSearch
                                    size="large"
                                    popupMatchSelectWidth={false}
                                    className="w-full"
                                    options={optionsCourse}
                                    onChange={handleCourse}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                            <Form.Item
                                //rules={[{required: true}]}
                                name={'period'}
                                label={t('practicePeriod')}>
                                <DatePicker.RangePicker
                                    size={'large'}
                                    placeholder={['Начало', 'Конец']}
                                    format="DD.MM.YYYY"
                                    onChange={onChangePickerPeriodPractise}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                            <Form.Item
                                rules={[{ required: true }]}
                                name={'amountHours'}
                                label={t('totalHours')}>
                                <InputNumber
                                    type="number"
                                    className="w-full"
                                    size="large"
                                    controls={false}
                                    min={1}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} className={'mt-4'}>
                        <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                            <Form.Item
                                rules={[{ required: true }]}
                                name={'director'}
                                label={t('director')}>
                                <Select
                                     showSearch
                                    size="large"
                                    popupMatchSelectWidth={false}
                                    className="w-full"
                                    options={dataDepartmentDirector?.map((item) => {
                                        return {
                                            key: item.id,
                                            value: item.value,
                                            label: item.value
                                        }
                                    })}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]} className={'mt-4'}>
                        <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                            <List
                                header={<div>{t('competencies')}</div>}
                                style={{
                                    overflow: 'auto',
                                    maxHeight: 300,
                                }}
                                bordered
                                // @ts-ignore
                                dataSource={isSuccesOnePractise ? copyDataCompetences : ''}
                                renderItem={(item: any, index: number) => (
                                    <List.Item
                                        style={{
                                            display: 'flex',
                                        }}
                                        // @ts-ignore
                                        actions={dataOnePractise?.isInSubmission ? null :
                                            [
                                                <div onClick={() => deleteCompetence(item)} className='cursor-pointer'><DeleteRedSvg /></div>
                                            ]}
                                    >
                                        <div className='flex items-center'>
                                            <div className=' p-3'>{index + 1}</div>
                                            <div className='ml-2'>{item.value}</div>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]} className={`mt-4 `}>
                        <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                            <List
                                className='newAntd'
                                header={<div>{t('individualTasks')}</div>}
                                style={{
                                    overflow: 'auto',
                                    maxHeight: 300,
                                }}
                                bordered
                                dataSource={isSuccesOnePractise ? dataTaskValid : ''}
                                renderItem={(item: any, index: number) => (
                                    <List.Item>
                                        {index + 1}. {item}
                                    </List.Item>
                                )}
                            />
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
                                    {t('save')}
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </Form>
            </section>
        </Spin>
    )
}
