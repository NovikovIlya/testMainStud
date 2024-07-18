import {
    Button,
    Col,
    DatePicker,
    Form, InputNumber,
    List,
    Row,
    Select,
    Space
} from 'antd';
import { useEffect, useState } from 'react';
import { ArrowLeftSvg } from '../../../../assets/svg';
import { validateMessages } from "../../../../utils/validateMessage";
import {
    Department,
    NewPractice, PracticeType, TwoId
} from "../../../../models/Practice";
import { useNavigate } from "react-router-dom";
import { OptionsNameSpecialty } from "../roster/registerContracts/RegisterContracts";
import { useGetSpecialtyNamesForPractiseQuery, useGetSpecialtyNamesQuery } from "../../../../store/api/practiceApi/roster";
import {
    useGetDepartmentsQuery,
    useGetPracticeTypeQuery,
    useGetPracticeKindQuery,
    useGetGroupNumbersQuery,
    useGetDepartmentDirectorsQuery,
    useGetCompentencesQuery,
    usePostPracticesMutation,
    useGetTasksForPracticeQuery,
    useGetPracticeTypeForPracticeQuery,
    useGetSubdivisionForPracticeQuery
} from "../../../../store/api/practiceApi/individualTask";
import { useGetCafDepartmentsQuery } from "../../../../store/api/practiceApi/practical";
import { processingOfDivisions } from "../../../../utils/processingOfDivisions";

interface FilterType {
    value: string | number
    label: string | number
}


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



export const CreatePractical = () => {
    const nav = useNavigate()
    const [form] = Form.useForm()
    const [fullDate,setFullDate] = useState<any>(null)
    const [arqTask,setArqTask] = useState<any>(null)
    const [pickDate, setPickDate] = useState<any>(null)
    const [pickSpeciality, setPickSpeciality] = useState<any>(null)
    const [pickKindPractise,setPickKindPractise]=useState<any>(null)
    const [pickTypePractise,setPickTypePractise]=useState<any>(null)
    const [optionsDepartment,setOptionsDepartment] = useState<FilterType[] | null>(null)
    const [departmentDirector, setDepartmentDirector] = useState<any>(null)
    const [subDivisionId,setSubDevisionId] = useState<null | string>(null)
    const [nameSpecialty, setNameSpecialty] = useState<OptionsNameSpecialty[]>()
    const [objectForCompetences, setObjectForCompetences] = useState<any>(null)
    const [practiceType, setPracticeType] = useState<PracticeType[]>()
    const [groupNumbers, setGroupNumbers] = useState<any>(null)
    const [departments, setDepartments] = useState<Department[]>()
    const [objType,setObjType] = useState<any>({subdivisionId:null,
        specialtyNameId:null})
    const [practiceKindForSelect, setPracticeKindForSelect] = useState<any>(null)
    const {data: dataNameSpecialty, isSuccess: isSuccessNameSpecialty} = useGetSpecialtyNamesForPractiseQuery(subDivisionId, {skip: subDivisionId === null})
    const {data: dataPraciseKind, isSuccess: isSuccesPractiseKind} = useGetPracticeKindQuery(subDivisionId, {skip: subDivisionId === null})
    const {data: dataGroupNumbers, isSuccess: isSuccessGroupNumbers} = useGetGroupNumbersQuery(subDivisionId, {skip: subDivisionId === null})
    const {data: dataDepartmentDirector, isSuccess: isSuccessDepartmentDirector} = useGetDepartmentDirectorsQuery(subDivisionId, {skip: subDivisionId === null})
    const {data:dataCompetences, isSuccess: isSuccessCompetences} = useGetCompentencesQuery(objectForCompetences,{skip: objectForCompetences === null})    
    const {data: dataDepartments, isSuccess: isSuccessDepartments} = useGetSubdivisionForPracticeQuery()
    const {data: dataPracticeType, isSuccess: isSuccessPracticeType} = useGetPracticeTypeForPracticeQuery(objType, {skip: objType.subDivisionId === null})
    const {data:dataTask, isSuccess:isSuccessTask} = useGetTasksForPracticeQuery(arqTask)
    const {data: dataDep, isSuccess: isSuccessDep} = useGetCafDepartmentsQuery(subDivisionId,{skip: subDivisionId === null})

    const [sendForm,{data}] = usePostPracticesMutation()

    // объект для типа практик
    useEffect(()=>{
        if(isSuccessNameSpecialty && form.getFieldValue('subDivision') && isSuccessNameSpecialty && pickSpeciality){
            const pickSpecialityId = dataNameSpecialty?.find((elem:any) => {
                if (elem.value === pickSpeciality) {
                    return elem
                }
            })
            setObjType({
                ...objType,
                subdivisionId:subDivisionId,
                specialtyNameId:pickSpecialityId?.id
            })
        }
    
    },[isSuccessNameSpecialty,form,pickSpeciality])
   
    console.log('dataCompetences',dataCompetences)
    // заполнения объекта для компетенции
    useEffect(()=>{
        if(pickKindPractise && pickDate && pickSpeciality){
            const specId = dataNameSpecialty?.find((elem:any) => {
                if (elem.value === pickSpeciality) {
                    return elem
                }
            })
            console.log('specId',specId)
            const pickId = dataPraciseKind?.find(elem => {
                if (elem.value === pickKindPractise) {
                    return elem
                }
            })
        
            const obj = {
                specialityId: specId?.id,
                practiceKindId: pickId?.id,
                startYear:pickDate[0]
            }
            console.log('obj',obj)
            setObjectForCompetences(obj)
        }
    },[dataNameSpecialty, dataPraciseKind, pickDate, pickSpeciality, pickKindPractise])

    useEffect(() => {
        if (isSuccessNameSpecialty) {
            setNameSpecialty(dataNameSpecialty)
            form.setFieldValue('specialityName','')
            form.setFieldValue('practiceType','')
            form.setFieldValue('groupNumber','')
            form.setFieldValue('director','')
            form.setFieldValue('department','')    
            form.setFieldValue('practiceKind','')
        }
    }, [dataNameSpecialty]);

    // получение заведущего
    useEffect(() => {
        if (isSuccessDepartmentDirector) {
            setDepartmentDirector(dataDepartmentDirector)
        }
    }, [dataDepartments,isSuccessDepartmentDirector]);

    // получчение номера групп
    useEffect(() => {
        if (isSuccessGroupNumbers) {
            setGroupNumbers(dataGroupNumbers)
        }
    }, [dataDepartments,isSuccessGroupNumbers]);

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

    // const [twoId, setTwoId] = useState<TwoId>({
    //     sp_name_id: null,
    //     practice_type_id: null,
    // })

    // const [tasksId, setTasksId] = useState<string>('')
    
    // получение инд заданий
    useEffect(()=>{
        if(pickSpeciality && pickTypePractise){
            const pickTypeId = dataPracticeType?.find((elem:any) => {
                if (elem.value === pickTypePractise) {
                    return elem
                }
            })
            const pickSpecialityId = dataNameSpecialty?.find((elem:any) => {
                if (elem.value === pickSpeciality) {
                    return elem
                }
            })
       
            setArqTask({specialtyNameId : pickSpecialityId?.id, practiceTypeId : pickTypeId?.id})
        }
    },[isSuccessTask, pickSpeciality, pickTypePractise])

    // useEffect(() => {
    //     if (twoId.sp_name_id && twoId.practice_type_id) {
    //         getTasks(twoId)
    //             .then((data) => {
    //                 if (data.data) {
    //                     const tasks: TasksAll = data.data
    //                     setTasksId(tasks.id)
    //                     const listTasks = tasks.tasks.map(elem => {
    //                         return {
    //                             task: elem.taskDescription
    //                         }
    //                     })
    //                     form.setFieldValue('tasks', listTasks)
    //                     console.log(tasks)
    //                 }
    //             })
    //     }
    // }, [twoId]);

    useEffect(()=>{
        if(isSuccessDep)
        setOptionsDepartment(dataDep)
    },[dataDep])


    function onFinish(values: NewPractice) {
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
        const dateString = fullDate[0].$d
        const date = new Date(dateString)
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}.${month}.${day}`;

        const dateStringEnd = fullDate[1].$d
        const dateEnd = new Date(dateStringEnd)
        const yearEnd = dateEnd.getFullYear();
        const monthEnd = String(dateEnd.getMonth() + 1).padStart(2, '0');
        const dayEnd = String(dateEnd.getDate()).padStart(2, '0');
        const formattedDateEnd = `${yearEnd}.${monthEnd}.${dayEnd}`;

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
            if (elem.value === pickKindPractise) {
                return elem
            }
        })
        const practisePickId = dataPracticeType?.find((elem:any) => {
            if (elem.value === pickTypePractise) {
                return elem
            }
        })
        const departmenIdZ = optionsDepartment?.find(elem => {
            if (elem.value === values.department) {
                return elem
            }
        })

        const sendData: any = {
            // specialityName: values.specialityName,
            practiceType: values.practiceType,
            department: values.department,
            groupNumberId: groupNumberId?.id,
            semester: values.semester,
            academicYear: {
                       start:pickDate[0],
                      end:pickDate[1]
                 },
                 courseNumber: values.courseStudy,
            startDate: formattedDate,
            totalHours: String(values.amountHours),
            endDate: formattedDateEnd ,
            // individualTaskId: dataTask?.id || null,
            competenceIds: dataCompetences && dataCompetences?.length > 0 ? dataCompetences : [],
            departmentDirectorId: directorId?.id,
            subdivisionId: subDivisionId,
            specialtyNameId:pickSpecialityId?.id,
            practiceKindId: pickId?.id,
            practiceTypeId: practisePickId?.id,
            // @ts-ignore
            departmentId : departmenIdZ?.id
        }
        // const pickId = dataPraciseKind?.find(elem => {
        //     if (elem.value === pickKindPractise) {
        //         return elem
        //     }
        // })
        // const obj = {
        //     specialtyNameId:pickSpeciality,
        //     subdivisionId: subDivisionId,
        //     practiceKindId: pickId?.id,
        //     practiceTypeId: pickTypePractise,
        //     departmentId: subDivisionId,
        //     groupNumbers:pickGroupNumber,
        //     semestr: pickSemestr,
        //     academicYear:{
        //         start:pickDate[0],
        //         end:pickDate[1]
        //     },
        //     courseNumber:pickCourseNumber,
        //     startDate:pickDate[0],
        //     endDate:pickDate[1],

            


        // }
        
        console.log('sendData',sendData)
        sendForm(sendData)
        nav('/services/practices/practical')

    }

    const handleChange = (value: string) => {
        departments?.find(elem => {
            if (elem.label === value) {
                setSubDevisionId(elem.id)
            }
        })  
    };

    const onChangePicker = (value:any)=>{
        // @ts-ignore
        setPickDate([value[0].$y,value[1].$y])
        setFullDate(value)
    }

    const handleSpeciality = (value:any)=>{
        setPickSpeciality(value)
    }

    const handlePracticeKind = (value:any)=>{
        setPickKindPractise(value)
    }
    const handlePracticeType = (value:any)=>{
        setPickTypePractise(value)
    }

    const dataTaskValid = dataTask?.tasks.map((item:any)=>item.taskDescription)

    

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
                                disabled={!isSuccessNameSpecialty}
                                size="large"
                                popupMatchSelectWidth={false}
                                className="w-full"
                                options={nameSpecialty?.map((item)=>(
                                    {key:item.id,
                                    value:item.value,
                                    label:item.label}
                                 ))}
                                 onChange={handleSpeciality}

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
                                disabled={!form.getFieldValue('specialityName')}
                                size="large"
                                
                                popupMatchSelectWidth={false}
                                className="w-full"
                                options={dataPracticeType?.map((item:any)=>(
                                    {key:item.id,
                                    value:item.value,
                                    label:item.label}
                                 ))}
                                 onChange={handlePracticeType}
                            
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
                                onChange={handlePracticeKind}
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
                                disabled={!isSuccessGroupNumbers}
                                size="large"
                                popupMatchSelectWidth={false}
                                className="w-full"
                                options={dataGroupNumbers?.map((item:any)=>{
                                    return {
                                        key:item.id,
                                        value:item.value,
                                        label:item.label}
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
                                disabled={!isSuccessCompetences}
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
                            label={'Общее кол-во часов'}>
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
                    </Col> */}
                    
                </Row>

                <Row gutter={[16, 16]} className={'mt-4'}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item
                            //rules={[{required: true}]}
                            name={'director'}
                            label={'Заведующий опорной кафедрой'}>
                            <Select
                                disabled={!isSuccessDepartmentDirector}
                                size="large"
                                popupMatchSelectWidth={false}
                                className="w-full"
                                options={dataDepartmentDirector}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]} className={'mt-4'}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                    <List
                        header={<div>Индивидуальные задания:</div>}
                       
                        bordered
                        dataSource={isSuccessTask?dataTaskValid : ''}
                        renderItem={(item:any,index:number) => (
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
                                Сохранить
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Form>
        </section>
    )
}

