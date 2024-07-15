import {
    Button,
    Col,
    DatePicker,
    Form, InputNumber,
    Row,
    Select,
    Space
} from 'antd';
import { useEffect, useState } from 'react';
import { ArrowLeftSvg } from '../../../../assets/svg';
import { validateMessages } from "../../../../utils/validateMessage";
import { AcademicYear, Department, FilterType, NewPractice, NewPracticeSend } from "../../../../models/Practice";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { OptionsNameSpecialty } from "../roster/registerContracts/RegisterContracts";
import { useGetSpecialtyNamesQuery } from "../../../../store/api/practiceApi/roster";
import { useGetCompentencesQuery, useGetDepartmentDirectorsQuery, useGetDepartmentsQuery, useGetGroupNumbersQuery, useGetPracticeKindQuery, useGetPracticeOneQuery, useGetPracticeTypeQuery, useGetTasksForPracticeQuery, useUpdatePracticeOneMutation } from '../../../../store/api/practiceApi/individualTask';
import { parse } from 'date-fns';
import { processingOfDivisions } from '../../../../utils/processingOfDivisions';
import { useGetCafDepartmentsQuery } from '../../../../store/api/practiceApi/practical';
import { useAppDispatch } from '../../../../store';
import { showNotification } from '../../../../store/reducers/notificationSlice';




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



export const EditPractical = () => {
    const [departments, setDepartments] = useState<Department[]>()
    const path = useLocation()
    const id: string = path.pathname.split('/').at(-1)!
    const nav = useNavigate()
    const [form] = Form.useForm<any>()
    const [arqTask,setArqTask] = useState<any>(null)
    const [pickDate, setPickDate] = useState<any>(null)
    const [fullDate,setFullDate] = useState<any>(null)
    const [idSub, setIdSub] = useState<any>(null)
    const [subDivisionId,setSubDevisionId] = useState<null | string>(null)
    const {data:dataOnePractise,isSuccess:isSuccesOnePractise} = useGetPracticeOneQuery(id)
    const [nameSpecialty, setNameSpecialty] = useState<OptionsNameSpecialty[]>()
    const [objectForCompetences, setObjectForCompetences] = useState<any>(null)
    const {data: dataNameSpecialty, isSuccess: isSuccessNameSpecialty} = useGetSpecialtyNamesQuery()
    const {data:dataCompetences, isSuccess: isSuccessCompetences} = useGetCompentencesQuery(objectForCompetences,{skip: objectForCompetences === null})
    const {data: dataDepartments, isSuccess: isSuccessDepartments} = useGetDepartmentsQuery()
    const {data: dataPracticeType, isSuccess: isSuccessPracticeType} = useGetPracticeTypeQuery()
    const {data: dataDepartmentDirector, isSuccess: isSuccessDepartmentDirector} = useGetDepartmentDirectorsQuery(idSub, {skip: !idSub})
    const {data: dataCaf, isSuccess: isSuccessCaf} = useGetCafDepartmentsQuery(idSub,{skip: !idSub})
    const {data: dataGroupNumbers, isSuccess: isSuccessGroupNumbers} = useGetGroupNumbersQuery(idSub, {skip: !idSub})
    const {data: dataPraciseKind, isSuccess: isSuccesPractiseKind} = useGetPracticeKindQuery(idSub, {skip: !idSub})
    const [updateForm] = useUpdatePracticeOneMutation()
    const {data:dataTask, isSuccess:isSuccessTask} = useGetTasksForPracticeQuery(arqTask,{skip:!arqTask})
    const dispatch = useAppDispatch()

    useEffect(()=>{
        const idSubdevision = dataDepartments?.find((item)=>{
            if(item.value===dataOnePractise?.subdivision){
                return item
            }
            return item?.responses?.find((elem:any)=>{
                if(elem.value===dataOnePractise?.subdivision){
                    return elem
                }
            })

        })
        setIdSub(idSubdevision?.id)
    },[dataDepartments, dataOnePractise?.subdivision])

    // получение кафедр
    useEffect(() => {
        if (isSuccessDepartments) {
            setDepartments(processingOfDivisions(dataDepartments))
        }
    }, [dataDepartments]);

    useEffect(() => {
        if (isSuccessNameSpecialty) {
            setNameSpecialty(dataNameSpecialty)
        }
    }, [dataNameSpecialty]);

    // заполнения объекта для компетенции
    useEffect(()=>{
        if(isSuccesOnePractise && isSuccesPractiseKind){
            setObjectForCompetences({
                specialityId: dataNameSpecialty?.find((elem) => {
                    if (elem.value === dataOnePractise.specialtyName) {
                        return elem
                    }
                })?.id,
                practiceKindId: dataPraciseKind?.find(elem => {
                    if (elem.value === dataOnePractise.practiceKind) {
                        return elem
                    }
                })?.id,
                startYear:dataOnePractise?.academicYear[0]

            })
        }   
    },[dataNameSpecialty, isSuccesOnePractise,dataPraciseKind])
    console.log('form,form',form)

    // вставка 
    useEffect(()=>{
        if(isSuccesOnePractise){
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

            const fullSubDivision = dataDepartments?.find((item)=>{
                if('responses' in item){
                   return item?.responses?.find((elem=>{
                        if(elem.value===dataOnePractise.subdivision){
                            return elem
                        }
                    }))
                }
                if(item.value===dataOnePractise.subdivision){
                    return item
                }
            })
            console.log('fullSubDivisionfullSubDivision',fullSubDivision)
            form.setFieldValue('subDivision', `${fullSubDivision?.value} - ${dataOnePractise.subdivision}`);

            form.setFieldValue('courseStudy', dataOnePractise.courseNumber);
            form.setFieldValue('startStudy', dayjs(dataOnePractise.practicePeriod[0], 'YYYY.MM.DD'));
            form.setFieldValue('endStudy', dayjs(dataOnePractise.practicePeriod[1], 'YYYY.MM.DD'));

            form.setFieldValue('amountHours', dataOnePractise.totalHours);

            form.setFieldValue('director', dataOnePractise.departmentDirector);

        }
    },[isSuccesOnePractise,isSuccessDepartments])

      // получение инд заданий
      useEffect(()=>{
        if(form.getFieldValue('specialityName') && form.getFieldValue('practiceType') ){
            const pickTypeId = dataPracticeType?.find(elem => {
                if (elem.value === form.getFieldValue('practiceType')) {
                    return elem
                }
            })
            const pickSpecialityId = dataNameSpecialty?.find(elem => {
                if (elem.value === form.getFieldValue('specialityName')) {
                    return elem
                }
            })
       
            setArqTask({specialtyNameId : pickSpecialityId?.id, practiceTypeId : pickTypeId?.id})
        }
    },[isSuccessTask, form])

    // function onFinish(values: NewPractice) {
    //     values.startStudy = dayjs(values.startStudy).format('DD.MM.YYYY')
    //     values.endStudy = dayjs(values.endStudy).format('DD.MM.YYYY')
    //     const academicYear: AcademicYear = {
    //         start: dayjs(values.academicYear[0]).format('YYYY'),
    //         end: dayjs(values.academicYear[1]).format('YYYY')
    //     }

    //     const sendData: NewPracticeSend = {
    //         specialityName: values.specialityName,
    //         practiceType: values.practiceType,
    //         department: values.department,
    //         groupNumber: values.groupNumber,
    //         semester: values.semester,
    //         academicYear: academicYear,
    //         courseStudy: values.courseStudy,
    //         startStudy: values.startStudy,
    //         amountHours: String(values.amountHours),
    //         endStudy: values.endStudy,
    //         tasks: values.tasks.map(elem => elem.task),
    //         codeCompetencies: values.codeCompetencies.map(elem => elem.codeCompetence),
    //         director: values.director
    //     }

    //     console.log(sendData)

    // }
    function onFinish(values: any) {
        // const specialtyNameId = dataNameSpecialty!.find(elem => {
        //     if (elem.value === values.specialityName) {
        //         return elem.id
        //     }
        // })
        // const practiceTypeId = dataPracticeType!.find(elem => {
        //     if (elem.value === values.practiceType) {
        //         return elem.id
        //     }
        // })
        // const department = 0
        // values.startStudy = dayjs(values.startStudy).format('DD.MM.YYYY')
        // values.endStudy = dayjs(values.endStudy).format('DD.MM.YYYY')
        // const academicYear: AcademicYear = {
        //     start: dayjs(values.academicYear[0]).format('YYYY'),
        //     end: dayjs(values.academicYear[1]).format('YYYY')
        // }
        //
        // console.log('form.getFieldsValue',form.getFieldsValue("academicYear"))
        // const dateString = fullDate[0].$d
        // const date = new Date(dateString)
        // const year = date.getFullYear();
        // const month = String(date.getMonth() + 1).padStart(2, '0');
        // const day = String(date.getDate()).padStart(2, '0');
        // const formattedDate = `${year}.${month}.${day}`;
        // console.log('formattedDate',fullDate[0].$y,fullDate[0].$M+1,fullDate[0].$D)
        // console.log('formattedDateformattedDate',formattedDate)
        // const dateStringEnd = fullDate[1].$d
        // const dateEnd = new Date(dateStringEnd)
        // const yearEnd = dateEnd.getFullYear();
        // const monthEnd = String(dateEnd.getMonth() + 1).padStart(2, '0');
        // const dayEnd = String(dateEnd.getDate()).padStart(2, '0');
        // const formattedDateEnd = `${yearEnd}.${monthEnd}.${dayEnd}`;

        const directorId = dataDepartmentDirector?.find((elem:any) => {
            if (elem.value === values.director) {
                return elem
            }
        })
        const groupNumberId = dataGroupNumbers?.find((elem:any) => {
            if (elem.value === values.groupNumber) {
                return elem
            }
        })
        const pickSpecialityId = dataNameSpecialty?.find((elem:any) => {
            if (elem.value === values.specialityName) {
                return elem
            }
        })
          const pickId = dataPraciseKind?.find(elem => {
            if (elem.value === values.practiceKind) {
                return elem
            }
        })
        const practisePickId = dataPracticeType?.find(elem => {
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
    

        const dateString = form.getFieldValue('startStudy').$d
        const date = new Date(dateString)
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}.${month}.${day}`;

        const dateStringEnd = form.getFieldValue('endStudy').$d
        const dateEnd = new Date(dateStringEnd)
        const yearEnd = dateEnd.getFullYear();
        const monthEnd = String(dateEnd.getMonth() + 1).padStart(2, '0');
        const dayEnd = String(dateEnd.getDate()).padStart(2, '0');
        const formattedDateEnd = `${yearEnd}.${monthEnd}.${dayEnd}`;


        const sendData: any = {
            // specialityName: values.specialityName,
            id: dataOnePractise?.id,
            practiceType: values.practiceType,
            department: values.department,
            groupNumberId: groupNumberId?.id,
            semester: values.semester,
            academicYear: {
                       start:startDate.$y,
                      end:endDate.$y
            },
            courseNumber: values.courseStudy,
            startDate: formattedDate,
            endDate: formattedDateEnd,
            totalHours: String(values.amountHours),
            // endDate: dataOnePractise.practicePeriod[1] ,
            individualTaskId: dataTask?.id || null,
            competenceIds: dataCompetences,
            departmentDirectorId: directorId?.id,
            subdivisionId: subDivisionId,
            specialtyNameId:pickSpecialityId?.id,
            practiceKindId: dataPraciseKind?.find((item)=>{
                if(item.value===values.practiceKind){
                    return item
                }
            })?.id,
            practiceTypeId: practisePickId?.id,
            // @ts-ignore
            departmentId : departmenIdZ?.id,
           
        }
     
        
        console.log('sendData',sendData)
        updateForm(sendData)
            .unwrap()
            .then((payload) => console.log('fulfilled', payload))
            .catch((error) => {
                if (error.response.status === 409) {
                    dispatch(showNotification({ message: 'Произошел конфликт', type: 'error' }));
                 }
            })

        // nav('/services/practices/practical')

    }

    const onChangePicker = (value:any)=>{
        setPickDate([value[0].$y,value[1].$y])
        setFullDate(value)
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
                        nav('/services/practices/practical.ts/')
                    }}
                />
                <span className=" text-[28px] font-normal">
                    Редактировать практику
                </span>
            </Space>
            <Form<any>
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
                                options={nameSpecialty?.map((item)=>{
                                    return{
                                        key:item.id,
                                        value:item.value,
                                        label:item.value
                                    }
                                })}
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
                                options={dataPracticeType?.map((item)=>{
                                    return{
                                        key:item.id,
                                        value:item.value,
                                        label:item.value
                                    }
                                })}
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
                                // onChange={handlePracticeKind}
                                size="large"
                                popupMatchSelectWidth={false}
                              
                                className="w-full"
                                options={dataPraciseKind}
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
                                    // onChange={handleChange}
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
                            rules={[{required: true}]}
                            name={'department'}
                            label={'Кафедра'}>
                            <Select
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
                            rules={[{required: true}]}
                            name={'groupNumber'}
                            label={'Номер группы'}>
                            <Select
                                size="large"
                                popupMatchSelectWidth={false}
                                className="w-full"
                                options={dataGroupNumbers?.map((item)=>{
                                    return{
                                        key:item.id,
                                        value:item.value,
                                        label:item.label
                                    }
                                })}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item
                            //rules={[{required: true}]}
                            name={'competences'}
                            label={'Код и наименование компетенции'}>
                            <Select
                               
                                size="large"
                                popupMatchSelectWidth={false}
                                className="w-full"
                                options={dataCompetences}
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

                <Row gutter={[16, 16]}>
                    {/* <Col xs={24} sm={24} md={18} lg={16} xl={12}>
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
                    </Col> */}
                    {/* <Col xs={24} sm={24} md={18} lg={16} xl={12}>
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
                                        disabled={fields.length === 15}
                                    />
                                </>
                            )}
                        </Form.List>
                    </Col> */}
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
                                options={dataDepartmentDirector?.map((item)=>{
                                    return{
                                        key:item.id,
                                        value:item.value,
                                        label:item.value
                                    }
                                })}
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

