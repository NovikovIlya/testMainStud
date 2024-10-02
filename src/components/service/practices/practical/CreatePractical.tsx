import {
	Button,
	Col,
	DatePicker,
	Form,
	InputNumber,
	List,
	Row,
	Select,
	Space,
	Spin,
	TreeSelect
} from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { ArrowLeftSvg } from '../../../../assets/svg'
import {
	Department,
	NewPractice,
	PracticeType
} from '../../../../models/Practice'
import {
	useGetCompentencesQuery,
	useGetDepartmentDirectorsQuery,
	useGetGroupNumbersNewQuery,
	useGetGroupNumbersQuery,
	useGetPracticeKindQuery,
	useGetPracticeTypeForPracticeQuery,
	useGetSubdivisionForPracticeQuery,
	useGetTasksForPracticeQuery,
	useIsPeopleInGroupQuery,
	usePostPracticesMutation
} from '../../../../store/api/practiceApi/individualTask'
import { useGetCafDepartmentsQuery } from '../../../../store/api/practiceApi/practical'
import { useGetSpecialtyNamesForPractiseQuery } from '../../../../store/api/practiceApi/roster'
import { processingOfDivisions } from '../../../../utils/processingOfDivisions'
import { validateMessages } from '../../../../utils/validateMessage'
import { OptionsNameSpecialty } from '../roster/registerContracts/RegisterContracts'
import { showNotification } from '../../../../store/reducers/notificationSlice'
import { useAppDispatch } from '../../../../store'
import { DeleteRedSvg } from '../../../../assets/svg/DeleteRedSvg'
import { disableParents } from '../../../../utils/disableParents'
import { Vector } from '../../../../assets/svg/Vector'

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


export const CreatePractical = () => {
	const nav = useNavigate()
	const [form] = Form.useForm()
	const [fullDate, setFullDate] = useState<any>(null)
	const [pickCourse, setPickCourse] = useState<any>(null)
	const [arqTask, setArqTask] = useState<any>(null)
	const [pickDate, setPickDate] = useState<any>(null)
	const [pickSpeciality, setPickSpeciality] = useState<any>(null)
	const [pickKindPractise, setPickKindPractise] = useState<any>(null)
	const [pickTypePractise, setPickTypePractise] = useState<any>(null)
	const [optionsDepartment, setOptionsDepartment] = useState<FilterType[] | null>(null)
	const [departmentDirector, setDepartmentDirector] = useState<any>(null)
	const [subDivisionId, setSubDevisionId] = useState<null | string>(null)
	const [nameSpecialty, setNameSpecialty] = useState<OptionsNameSpecialty[]>()
	const [objectForCompetences, setObjectForCompetences] = useState<any>(null)
	const [practiceType, setPracticeType] = useState<PracticeType[]>()
	const [groupNumbers, setGroupNumbers] = useState<any>(null)
	const [departments, setDepartments] = useState<Department[]>()
	const [objType, setObjType] = useState<any>({subdivisionId: null,specialtyNameId: null})
	const [practiceKindForSelect, setPracticeKindForSelect] = useState<any>(null)
	const [groupId,setGroupId] = useState(null)
	const {data:dataIsPeopleInGroup} = useIsPeopleInGroupQuery({subDivisionId:subDivisionId,groupId : groupId},{skip: !subDivisionId  || !groupId })
	const { data: dataNameSpecialty, isSuccess: isSuccessNameSpecialty } = useGetSpecialtyNamesForPractiseQuery(subDivisionId, {skip: subDivisionId === null})
	const { data: dataPraciseKind, isSuccess: isSuccesPractiseKind } = useGetPracticeKindQuery(subDivisionId, { skip: subDivisionId === null })
	const { data: dataGroupNumbers, isSuccess: isSuccessGroupNumbers } = useGetGroupNumbersQuery({subDivisionId,specialtyNameId : dataNameSpecialty?.find((elem: any) => {
		if (elem.value === pickSpeciality) {
			return elem
		}
	})?.id}, { skip: !subDivisionId || !pickSpeciality})
	// const { data: dataGroupNumbersNew } = useGetGroupNumbersNewQuery(subDivisionId, { skip: subDivisionId === null })
	const {data: dataDepartmentDirector,isSuccess: isSuccessDepartmentDirector} = useGetDepartmentDirectorsQuery(subDivisionId, {skip: !subDivisionId})
	const { data: dataCompetences, isSuccess: isSuccessCompetences } = useGetCompentencesQuery(objectForCompetences, {skip: !objectForCompetences?.specialityId || objectForCompetences?.practiceKindId === null|| objectForCompetences?.startYear === null})
	const { data: dataDepartments, isSuccess: isSuccessDepartments } = useGetSubdivisionForPracticeQuery()
	const { data: dataPracticeType, isSuccess: isSuccessPracticeType } = useGetPracticeTypeForPracticeQuery(objType, {skip: !objType?.specialtyNameId|| !objType?.subdivisionId})
	const { data: dataTask, isSuccess: isSuccessTask } = useGetTasksForPracticeQuery(arqTask,{skip: !arqTask?.practiceTypeId|| !arqTask?.specialtyNameId})
	const { data: dataDep, isSuccess: isSuccessDep } = useGetCafDepartmentsQuery(subDivisionId,{ skip: subDivisionId === null })
	const [copyDataCompetences, setCopyDataCompetences] = useState<any>(dataCompetences)
	const [sendForm, { data,isLoading:isLoadingSendForm }] = usePostPracticesMutation()
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const [treeLine, setTreeLine] = useState(true);
    const [showLeafIcon, setShowLeafIcon] = useState(false);
    const [value, setValue] = useState<string>();

	useEffect(()=>{
		setCopyDataCompetences(dataCompetences)
	}, [dataCompetences])

	// объект для типа практик
	useEffect(() => {
		if (
			isSuccessNameSpecialty &&
			form.getFieldValue('subDivision') &&
			isSuccessNameSpecialty &&
			pickSpeciality
		) {
			const pickSpecialityId = dataNameSpecialty?.find((elem: any) => {
				if (elem.value === pickSpeciality) {
					return elem
				}
			})
			setObjType({
				...objType,
				subdivisionId: subDivisionId,
				specialtyNameId:pickSpecialityId?.id ? pickSpecialityId?.id : null
			})
		}
	}, [isSuccessNameSpecialty, form, pickSpeciality])


	// заполнения объекта для компетенции
	useEffect(() => {
		if (pickKindPractise && pickDate && pickSpeciality) {
			const specId = dataNameSpecialty?.find((elem: any) => {
				if (elem.value === pickSpeciality) {
					return elem
				}
			})
			const pickId = dataPraciseKind?.find(elem => {
				if (elem.value === pickKindPractise) {
					return elem
				}
			})

			const obj = {
				specialityId: specId?.id,
				practiceKindId: pickId?.id,
				startYear: pickDate[0]
			}
			setObjectForCompetences(obj)
		}
	}, [
		dataNameSpecialty,
		dataPraciseKind,
		pickDate,
		pickSpeciality,
		pickKindPractise
	])

	useEffect(() => {
		if (isSuccessNameSpecialty) {
			setNameSpecialty(dataNameSpecialty)
			form.setFieldValue('specialityName', '')
			form.setFieldValue('practiceType', '')
			form.setFieldValue('groupNumber', '')
			form.setFieldValue('director', '')
			form.setFieldValue('department', '')
			form.setFieldValue('practiceKind', '')
		}
	}, [dataNameSpecialty])

	// получение заведущего
	useEffect(() => {
		if (isSuccessDepartmentDirector) {
			setDepartmentDirector(dataDepartmentDirector)
		}
	}, [dataDepartments, isSuccessDepartmentDirector])

	// получчение номера групп
	useEffect(() => {
		if (isSuccessGroupNumbers) {
			setGroupNumbers(dataGroupNumbers)
		}
	}, [dataDepartments, isSuccessGroupNumbers])

	// получение кафедр
	useEffect(() => {
		if (isSuccessDepartments) {
			setDepartments(processingOfDivisions(dataDepartments))
		}
	}, [dataDepartments])

	useEffect(() => {
		if (isSuccessPracticeType) {
			setPracticeType(dataPracticeType)
		}
	}, [dataPracticeType])

	// получение видов практик
	useEffect(() => {
		if (isSuccesPractiseKind) {
			setPracticeKindForSelect(dataPraciseKind)
		}
	}, [dataDepartments, isSuccesPractiseKind])

	// получение инд заданий
	useEffect(() => {
		if (pickSpeciality && pickTypePractise) {
			const pickTypeId = dataPracticeType?.find((elem: any) => {
				if (elem.value === pickTypePractise) {
					return elem
				}
			})
			const pickSpecialityId = dataNameSpecialty?.find((elem: any) => {
				if (elem.value === pickSpeciality) {
					return elem
				}
			})

			setArqTask({
				specialtyNameId: pickSpecialityId?.id,
				practiceTypeId: pickTypeId?.id
			})
		}
	}, [isSuccessTask, pickSpeciality, pickTypePractise])

	useEffect(() => {
		if (isSuccessDep) setOptionsDepartment(dataDep)
	}, [dataDep])

	function onFinish(values: NewPractice) {
		if(!dataIsPeopleInGroup){
            dispatch(showNotification({ message:
                        'В выбранной группе нет студентов, пожалуйста выберите другую группу', type: 'warning'}))
            return
        }

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
		const pickId = dataPraciseKind?.find((elem:any) => {
			if (elem.value === pickKindPractise) {
				return elem
			}
		})
		const practisePickId = dataPracticeType?.find((elem: any) => {
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
				start: pickDate[0],
				end: pickDate[1]
			},
			courseNumber: values.courseStudy,
			startDate: `${String(form?.getFieldValue('period')[0].$D)}.${String(
				form?.getFieldValue('period')[0].$M + 1
			).padStart(2, '0')}.${String(form?.getFieldValue('period')[0].$y)}`,
			totalHours: String(values.amountHours),
			endDate: `${String(form?.getFieldValue('period')[1].$D)}.${String(
				form?.getFieldValue('period')[1].$M + 1
			).padStart(2, '0')}.${String(form?.getFieldValue('period')[1].$y)}`,
			// individualTaskId: dataTask?.id || null,
			competenceIds:
				copyDataCompetences && copyDataCompetences?.length > 0 ? copyDataCompetences.map((item:any)=>String(item.id)) : [],
			departmentDirectorId: directorId?.id,
			subdivisionId: subDivisionId,
			specialtyNameId: pickSpecialityId?.id,
			practiceKindId: pickId?.id,
			practiceTypeId: practisePickId?.id,
			// @ts-ignore
			departmentId: departmenIdZ?.id
		}

		sendForm(sendData)
		.unwrap()
		.then(()=>{
			nav('/services/practices/practical')
		})
		.catch((error)=>{
			console.log(error)
			if (error.status === 409) {
				dispatch(showNotification({ message: 'Такая практика уже создана', type: 'error' }));
			}
			if (error.status === 400) {
				dispatch(showNotification({ message: 'Текст в консоли', type: 'error' }));
			}
		})
	}

	const handleChange = (value: string) => {
		departments?.find(elem => {
			if (elem.label === value) {
				setSubDevisionId(elem.id)
			}
		})
	}

	const onChangePicker = (value: any) => {
		// @ts-ignore
		setPickDate([value[0].$y, value[1].$y])
		setFullDate(value)
	}

	const handleSpeciality = (value: any) => {
		setPickSpeciality(value)
		form.setFieldValue('practiceType', '')
	}

	const handlePracticeKind = (value: any) => {
		setPickKindPractise(value)
	}
	const handlePracticeType = (value: any) => {
		setPickTypePractise(value)
	}

	const onChangePickerPeriodPractise = (value: any) => {
		console.log(value)
	}
	
	const handleCourse = (value:any)=>{
		setPickCourse(value)
		form.setFieldValue('semester', '')
	}

	const onChange = (newValue: string) => {
        console.log('newValue',newValue)
        setSubDevisionId(newValue);
		setObjectForCompetences({	
				specialityId: null,
				practiceKindId: null,
				startYear: null
			}
		)
		setCopyDataCompetences([])

       
      };
    
      const onPopupScroll: any = (e:any) => {
        console.log('onPopupScroll', e);
    };

	const dataTaskValid = dataTask?.tasks.map((item: any) => item.taskDescription)

	const optionsCourseValid = (() => {
		switch (pickCourse) {
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
		const newCompetences = copyDataCompetences.filter((elem:any) => elem.id!== item.id)
		setCopyDataCompetences(newCompetences)
	}

	const treeData = dataDepartments?.map((item:any)=>{
        return{
            title:item.value,
            value:item.id,
            // @ts-ignore
            children: item?.responses?.map((item)=>{
                return{
                    title:item.value,
                    value:item.id,
                }
            })
        }
    })

	return (
		<Spin spinning={isLoadingSendForm}>
		<section className="container animate-fade-in">
			<Space size={10} align="center">
				<Button
					size="large"
					className="mt-1 mt-1 mr-6 rounded-full border border-black"
					style={{width:'48px'}}
           
                    icon={<Vector />}
					type="text"
					onClick={() => {
						nav('/services/practices/practical.ts/')
					}}
				/>
				<span className=" text-[28px] font-normal">Добавить практику</span>
			</Space>
			<Form<NewPractice>
				
				validateMessages={validateMessages}
				form={form}
				onFinish={values => onFinish(values)}
				layout={'vertical'}
			>
				<Row gutter={[16, 16]} className="mt-14">
					<Col xs={24} sm={24} md={18} lg={16} xl={12}>
						<Space direction={'vertical'} className={'w-full'}>
							<Form.Item
								label={'Подразделение'}
								rules={[{ required: true }]}
								name={'subDivision'}
							>
								{/* <Select
									onChange={handleChange}
									size="large"
									popupMatchSelectWidth={false}
									className="w-full"
									options={departments}
								/> */}
								  <TreeSelect
                                    treeLine={treeLine && { showLeafIcon }}
                                    showSearch
                                    style={{ height:'38px',width: '100%' }}
                                    value={value}
                                    dropdownStyle={{  overflow: 'auto' }}
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
							label={'Шифр и наименование специальности'}
							name={'specialityName'}
							rules={[{ required: true }]}
						>
							<Select
								disabled={!isSuccessNameSpecialty}
								size="large"
								popupMatchSelectWidth={false}
								className="w-full"
								options={nameSpecialty?.map(item => ({
									key: item.id,
									value: item.value,
									label: item.label
								}))}
								onChange={handleSpeciality}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={[16, 16]}>
					<Col xs={24} sm={24} md={18} lg={16} xl={12}>
						<Form.Item
							rules={[{ required: true }]}
							name={'practiceType'}
							label={'Тип практики'}
						>
							<Select
								disabled={!pickSpeciality}
								size="large"
								popupMatchSelectWidth={false}
								className="w-full"
								options={dataPracticeType?.map((item: any) => ({
									key: item.id,
									value: item.value,
									label: item.label
								}))}
								onChange={handlePracticeType}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={[16, 16]}>
					<Col xs={24} sm={24} md={18} lg={16} xl={12}>
						<Form.Item
							rules={[{required: true}]}
							name={'practiceKind'}
							label={'Вид практики'}
						>
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

				<Row gutter={[16, 16]}>
					<Col xs={24} sm={24} md={18} lg={16} xl={12}>
						<Form.Item
							rules={[{required: true}]}
							name={'department'}
							label={'Кафедра'}
						>
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
							rules={[{required: true}]}
							name={'groupNumber'}
							label={'Номер группы'}
						>
							<Select
								disabled={!isSuccessGroupNumbers}
								size="large"
								popupMatchSelectWidth={false}
								className="w-full"
								onChange={(value: any) => {
									const groupId = dataGroupNumbers?.find((item: any) => item.value === value);
									if (groupId !== undefined) {
										// @ts-ignore
									  setGroupId(groupId?.id);
									}
								  }}
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
				{/* <Row gutter={[16, 16]}>
					<Col xs={24} sm={24} md={18} lg={16} xl={12}>
						<Form.Item
							//rules={[{required: true}]}
							name={'competences'}
							label={'Код и наименование компетенции'}
						>
							<Select
								disabled={!isSuccessCompetences}
								size="large"
								popupMatchSelectWidth={false}
								className="w-full"
								options={dataCompetences}
							/>
						</Form.Item>
					</Col>
				</Row> */}
				<Row gutter={[16, 16]}>
					<Col xs={24} sm={24} md={18} lg={8} xl={6}>
						<Form.Item
							//rules={[{required: true}]}
							name={'semester'}
							label={'Семестр'}
						>
							<Select
							    disabled={!pickCourse}
								size="large"
								popupMatchSelectWidth={false}
								className="w-full"
								options={optionsCourseValid}
							/>
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={18} lg={8} xl={6}>
						<Form.Item
							//rules={[{required: true}]}
							name={'academicYear'}
							label={'Учебный год'}
						>
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
							//rules={[{required: true}]}
							name={'courseStudy'}
							label={'Курс обучения'}
							rules={[{ required: true }]}
						>
							<Select
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
							label={'Период практики'}
						>
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
                    </Col> */}
				</Row>
				<Row gutter={[16, 16]}>
					<Col xs={24} sm={24} md={18} lg={8} xl={6}>
						<Form.Item
							//rules={[{required: true}]}
							name={'amountHours'}
							label={'Общее кол-во часов'}
						>
							<InputNumber
								type="number"
								className="w-full"
								size="large"
								controls={false}
								min={1}
							/>
						</Form.Item>
					</Col>
					{/* <Col xs={24} sm={24} md={18} lg={8} xl={6}>
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
							rules={[{required: true}]}
							name={'director'}
							label={'Руководитель практики'}
						>
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
							style={{
								overflow: 'auto',
								maxHeight: 300,	
								
							}}
							header={<div>Код и наименование компетенции:</div>}
							bordered
							// @ts-ignore
							dataSource={isSuccessCompetences ? copyDataCompetences : ''}
							renderItem={(item: any, index: number) => (
								<List.Item
								style={{
									display: 'flex',
								}}
								actions={[<div onClick={() => deleteCompetence(item)} className='cursor-pointer' ><DeleteRedSvg  /></div>]}
								>
									<div className=' p-3'>{index + 1}</div> <div className='ml-2'>{item.value}</div>
								</List.Item>
							)}
						/>
					</Col>
				</Row>

				<Row gutter={[16, 16]} className={'mt-4'}>
					<Col xs={24} sm={24} md={18} lg={16} xl={12}>
						<List
							style={{
								overflow: 'auto',
								maxHeight: 300,	
							}}
							header={<div>Индивидуальные задания:</div>}
							bordered
							dataSource={isSuccessTask ? dataTaskValid : ''}
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
								Сохранить
							</Button>
						</Space>
					</Col>
					
					
				</Row>
			</Form>
		</section>
		</Spin>
	)
}
