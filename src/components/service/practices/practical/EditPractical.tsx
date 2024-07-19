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
import { Department, FilterType } from "../../../../models/Practice";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import { OptionsNameSpecialty } from "../roster/registerContracts/RegisterContracts";
import { useGetSpecialtyNamesForPractiseQuery } from "../../../../store/api/practiceApi/roster";
import { useGetCompentencesQuery, useGetDepartmentDirectorsQuery, useGetGroupNumbersQuery, useGetPracticeKindQuery, useGetPracticeOneQuery, useGetPracticeTypeForPracticeQuery, useGetSubdivisionForPracticeQuery, useGetTasksForPracticeQuery, useUpdatePracticeOneMutation } from '../../../../store/api/practiceApi/individualTask';
import { processingOfDivisions } from '../../../../utils/processingOfDivisions';
import { useGetCafDepartmentsQuery } from '../../../../store/api/practiceApi/practical';
import { useAppDispatch } from '../../../../store';
import './EditPractical.module.scss';




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
    const [pickSpeciality, setPickSpeciality] = useState<any>(null)
    const [form] = Form.useForm<any>()
    const [flag,setFlag] = useState(true)
    const [pickKund,setPickKind] = useState(null)
    const [arqTask,setArqTask] = useState<any>(null)
    const [pickDate, setPickDate] = useState<any>(null)
    const [fullDate,setFullDate] = useState<any>(null)
    const [idSub, setIdSub] = useState<any>(null)
    const [subDivisionId,setSubDevisionId] = useState<null | string>(null)
    const [pickType,setPickType] = useState(null)
    const [objType,setObjType] = useState({
            subdivisionId :null,
            specialtyNameId :null 
    })
    const [nameSpecialty, setNameSpecialty] = useState<OptionsNameSpecialty[]>()
    const [objectForCompetences, setObjectForCompetences] = useState<any>({
        specialityId:null,
        practiceKindId:null,
        startYear:null
    })
    const {data:dataOnePractise,isSuccess:isSuccesOnePractise} = useGetPracticeOneQuery(id,{refetchOnMountOrArgChange: true  })
    const {data: dataNameSpecialty, isSuccess: isSuccessNameSpecialty} = useGetSpecialtyNamesForPractiseQuery(subDivisionId, {skip: !subDivisionId})
    const {data:dataCompetences, isSuccess: isSuccessCompetences} = useGetCompentencesQuery(objectForCompetences,{skip: objectForCompetences === null})
    const {data: dataDepartments, isSuccess: isSuccessDepartments} = useGetSubdivisionForPracticeQuery()
    const {data: dataPracticeType, isSuccess: isSuccessPracticeType} = useGetPracticeTypeForPracticeQuery(objType, {skip: objType.subdivisionId === null })
    const {data: dataDepartmentDirector, isSuccess: isSuccessDepartmentDirector} = useGetDepartmentDirectorsQuery(subDivisionId, {skip: !subDivisionId})
    const {data: dataCaf, isSuccess: isSuccessCaf} = useGetCafDepartmentsQuery(subDivisionId,)
    const {data: dataGroupNumbers, isSuccess: isSuccessGroupNumbers} = useGetGroupNumbersQuery(subDivisionId, {skip: !subDivisionId})
    const {data: dataPraciseKind, isSuccess: isSuccesPractiseKind} = useGetPracticeKindQuery(subDivisionId, {skip: !subDivisionId})
    const{data:dataSubdivisonForPractise} = useGetSubdivisionForPracticeQuery()
    const [updateForm] = useUpdatePracticeOneMutation()
    const {data:dataTask, isSuccess:isSuccessTask,error:errorTasks} = useGetTasksForPracticeQuery(arqTask,{skip:!arqTask})



    useEffect(()=>{
        setSubDevisionId(dataOnePractise?.subdivisionId)
    },[isSuccesOnePractise])


    useEffect(()=>{
        const idSubdevision = dataDepartments?.find((item:any)=>{
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


    useEffect(()=>{
            const objTypeZ = {
            ...objType,
            subdivisionId: dataDepartments?.find((item:any)=>{
                if('responses' in item){
                    return item.responses?.find((elem:any)=> {
                        if(form?.getFieldValue('subDivision')?.split(" - ")[1] === elem.value){
             
                            return elem
                        }      
                    })
                }
                if(item.value === form.getFieldValue('subDivision')?.split(" - ")[1]){

                    return item
                }
            })?.responses?.find((item:any)=>item.value === form?.getFieldValue('subDivision')?.split(" - ")[1])?.id,
            specialtyNameId :dataNameSpecialty?.find((item:any)=>{
                if(item.value===form.getFieldValue('specialityName')){
                    return item
                }
            })?.id 
        }
        setObjType(objTypeZ)
    },[pickSpeciality, form, dataDepartments, dataNameSpecialty])


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

    // очистка полей при смене подразделения
    useEffect(() => {
        if(isSuccesOnePractise){
           if(subDivisionId !== dataOnePractise?.subdivisionId){
            form.setFieldValue('specialityName','')
            form.setFieldValue('practiceType','')
            form.setFieldValue('groupNumber','')
            form.setFieldValue('director','')
            form.setFieldValue('department','')    
            form.setFieldValue('practiceKind','')}
        }
    }, [dataOnePractise,subDivisionId,isSuccesOnePractise]);

    // заполнения объекта для компетенции
    useEffect(()=>{
        if(isSuccesOnePractise && isSuccesPractiseKind&&isSuccessNameSpecialty ){
           
           
            setObjectForCompetences({
                specialityId: dataNameSpecialty?.find((elem:any) => {
                    if (elem.value === form.getFieldValue('specialityName')) {
                        return elem
                    }
                })?.id,
                
                practiceKindId: dataPraciseKind?.find(elem => {
                    if (elem.value === form.getFieldValue('practiceKind')) {
                        return elem
                    }
                })?.id,
                startYear:form.getFieldValue('academicYear')[0].$y

            })
        }   
    },[dataNameSpecialty, isSuccesOnePractise,dataPraciseKind,form,pickKund,dataPraciseKind])


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

            dataDepartments?.forEach((item:any)=>{
                if(item.value===dataOnePractise?.subdivision) {
                    form.setFieldValue('subDivision', `${dataOnePractise.subdivision}`)
                    
                    return true
                }
                if('responses' in item){
                    return item.responses?.find((elem:any)=> {
                        if(dataOnePractise?.subdivision.toLowerCase()===elem.value.toLowerCase()){
                            form.setFieldValue('subDivision', `${item.value + ' - ' + elem.value}`)
                        }      
                    })
                }
                else{
                    
                }
            })

            form.setFieldValue('courseStudy', dataOnePractise.courseNumber);
            form.setFieldValue('period', [dayjs(dataOnePractise.practicePeriod[0], 'YYYY.MM.DD'),dayjs(dataOnePractise.practicePeriod[1], 'YYYY.MM.DD')]);
            // form.setFieldValue('period', dayjs(dataOnePractise.practicePeriod[1], 'YYYY.MM.DD'));
            form.setFieldValue('amountHours', dataOnePractise.totalHours);
            form.setFieldValue('director', dataOnePractise.departmentDirector);
        }
    },[isSuccesOnePractise,isSuccessDepartments])

      // получение инд заданий
      useEffect(()=>{
        if(isSuccessPracticeType){
            const pickTypeId = dataPracticeType?.find((elem:any) => {
                if (elem.value === form.getFieldValue('practiceType')) {
                    return elem
                }
            })
            const pickSpecialityId = dataNameSpecialty?.find((elem:any) => {
               
                if (elem.value === form.getFieldValue('specialityName')) {
                    return elem
                }
            })
            setArqTask({...arqTask,specialtyNameId : pickSpecialityId?.id, practiceTypeId : pickTypeId?.id})
        } 
    },[ dataNameSpecialty, dataPracticeType, isSuccessTask, pickSpeciality, pickType,form])

   
    function onFinish(values: any) {
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
        const practisePickId = dataPracticeType?.find((elem:any) => {
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

        const mother = dataSubdivisonForPractise?.find((item:any)=>{     
            if('responses' in item){
                return item.responses?.find((elem:any)=> {
                    if(form.getFieldValue('subDivision').split(" - ")[1] === elem.value){  
                        return elem
                    }      
                })
            }
            
            if(item.value === form.getFieldValue('subDivision').split(" - ")[1]){
                return item
            }else{
                return form.getFieldValue('subDivision').split(" - ")[1]
            }
        })
        const child = mother?.responses?.find((item:any)=>item.value === form.getFieldValue('subDivision').split(" - ")[1]).id
        const sendData: any = {
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
            startDate: `${String(form?.getFieldValue('period')[0].$D)}.${String(form?.getFieldValue('period')[0].$M+1).padStart(2, '0')}.${String(form?.getFieldValue('period')[0].$y)}`,
            endDate: `${String(form?.getFieldValue('period')[1].$D)}.${String(form?.getFieldValue('period')[1].$M+1).padStart(2, '0')}.${String(form?.getFieldValue('period')[1].$y)}`,
            totalHours: String(values.amountHours),
            competenceIds: dataCompetences,
            departmentDirectorId: directorId?.id, 
            subdivisionId: child,
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
      
        updateForm(sendData)
        nav('/services/practices/practical')
    }


    const onChangePicker = (value:any)=>{
        setPickDate([value[0].$y,value[1].$y])
        setFullDate(value)
    }
    const onChangeTypePick = (value:any)=>{
        setPickType(value)
    }
    const handleChange = (value: string) => {
        departments?.find(elem => {
            if (elem.label === value) {
                setSubDevisionId(elem.id)
            }
        })  
    };
    const handleKind = (value:any)=>{
        setPickKind(value)
    }
    const handleSpeciality = (value:any)=>{
        setPickSpeciality(value)
        form.setFieldValue('practiceType','')
    }

    const onChangePickerPeriodPractise = (value:any)=>{
        console.log(value)
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
                    Редактировать практику
                </span>
            </Space>
            <Form<any>
                validateMessages={validateMessages}
                form={form}
                onFinish={(values) => onFinish(values)}
                layout={'vertical'}>
                 <Row gutter={[16, 16]} className="mt-10">
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
                <Row gutter={[16, 16]} className="">
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item
                            label={'Шифр и наименование специальности'}
                            name={'specialityName'}
                            rules={[{required: true}]}>
                            <Select
                                size="large"
                                onChange={handleSpeciality}
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
                                onChange={onChangeTypePick}
                                size="large"
                                popupMatchSelectWidth={false}
                                className="w-full"
                                options={dataPracticeType?.map((item:any)=>{
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
                            name={'practiceKind'}
                            label={'Вид практики'}>
                            <Select
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
                {/* <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Form.Item
                            //rules={[{required: true}]}
                            name={'period'}
                            label={'Период практики'}>

                            <DatePicker.RangePicker 
                                size={'large'}
                                placeholder={['Начало', 'Конец']}
                                format="DD.MM.YYYY"
                                onChange={onChangePickerPeriodPractise}
                                
                            />

                        </Form.Item>
                    </Col>
                </Row> */}
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
                            //rules={[{required: true}]}
                            name={'period'}
                            label={'Период практики'}>

                            <DatePicker.RangePicker 
                                size={'large'}
                                placeholder={['Начало', 'Конец']}
                                format="DD.MM.YYYY"
                                onChange={onChangePickerPeriodPractise}
                                
                            />

                        </Form.Item>
                    </Col>
                    {/* <Col xs={24} sm={24} md={18} lg={8} xl={6}>
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
                    </Col> */}
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Form.Item
                            rules={[{required: true}]}
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
                    {/* <Col xs={24} sm={24} md={18} lg={8} xl={6}>
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
                    </Col> */}
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

                <Row gutter={[16, 16]} className={`mt-4 `}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                    <List
                        className='newAntd'
                        header={<div>Индивидуальные задания:</div>}
                       
                        bordered
                        dataSource={isSuccesOnePractise?dataTaskValid : ''}
                        renderItem={(item:any,index:number) => (
                            <List.Item>
                            {index+ 1}. {item}
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

