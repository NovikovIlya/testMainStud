import { LoadingOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Popconfirm, Row, Select, Space, Spin, Steps, Typography } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ArrowLeftSvg } from '../../../../assets/svg'
import { Item, Practice } from '../../../../models/representation'
import { useAppDispatch } from '../../../../store'
import { useGetPracticesAllQuery } from '../../../../store/api/practiceApi/individualTask'
import {
	useAddSubmissionMutation,
	useGetAllSubmissionsQuery,
	useGetOneSubmissionsQuery,
	useGetStudentsQuery
} from '../../../../store/api/practiceApi/representation'
import { useGetContractsAllQuery } from '../../../../store/api/practiceApi/roster'
import { changeStatusTrue, showNotification } from '../../../../store/reducers/notificationSlice'

import PracticeModal from './practicalModal'
import TableEdit from './tableEdit'

export const CreateAppendix = () => {
	const tableRef = useRef(null)
	const originData: any = [
		{
			id: 'czxczxc',
			key: 'czxczxc',
			specialtyName: 'jim',
			academicYear: '2024',
			address: 'Kazan',
			period: [dayjs('2024-07-01'), dayjs('2024-07-15')],
			courseNumber: '1',
			type: null,
			dateFilling: '2024-07-30',
			selectKind: 'Производственная',
			subdivision: '',
			groupNumber: '1',
			level: 'бакалавр'
		},
		{
			id: 'bbq',
			key: 'bbq',
			specialtyName: 'jon',
			academicYear: '2030',
			address: 'Moscw',
			period: null,
			courseNumber: '2',
			type: null,
			dateFilling: '2024-07-29',
			selectKind: 'Производственная',
			groupNumber: '1',
			level: 'бакалавр'
		},
		{
			id: 'ccx',
			key: 'ccx',
			specialtyName: 'jen',
			academicYear: '2030',
			address: 'Moscw',
			period: null,
			courseNumber: '1',
			type: null,
			dateFilling: '2024-07-28',
			selectKind: 'Производственная',
			groupNumber: '2',
			level: 'ордин'
		}
	]
	const nav = useNavigate()
	const [tableData, setTableData] = useState<any>(originData)
	const [filter, setFilter] = useState<any>({
		type: '',
		spec: '',
		courseNumber: 'Все',
		level: 'Все',
		form: '',
		dateFilling: 'По дате (сначала новые)',
		selectKind: 'Все',
		specialtyName: 'Все',
		subdivision: 'Все',
		academicYear: 'Все',
		groupNumber: 'Все'
	})
	const [form] = Form.useForm()
	const [editingKey, setEditingKey] = useState('')
	const isEditing = (record: Item) => record.key === editingKey
	const [isModalOpenOne, setIsModalOpenOne] = useState(true)
	const [selectedPractice, setSelectedPractice] = useState<any>(null)
	const [visiting, setVisiting] = useState(false)
	const [theme, setTheme] = useState('')
	const [sendSubmission, { isLoading: isLoadingAddSub }] = useAddSubmissionMutation()
	const {data: dataGetStudents,isSuccess: isSuccessGetStudents,isLoading: isLoadingStudents} = useGetStudentsQuery(selectedPractice, { skip: !selectedPractice })
	const { data: dataAllSubmissions } = useGetAllSubmissionsQuery(selectedPractice, { skip: !selectedPractice })
	const [fullTable, setFullTable] = useState<any>([])
	const [fullSelectedPractise, setFullSelectedPractise] = useState<Practice[]>([])
	const { data: dataAllPractise, isSuccess: isSuccessAllPractice } = useGetPracticesAllQuery(selectedPractice, {skip: !selectedPractice})
	const { data: dataGetContracts, isSuccess: isSuccessGetContracts } = useGetContractsAllQuery()
	const [contracts, setContracts] = useState<any>([])
	const [step, setStep] = useState(0)
	const [selectContract, setSelectContract] = useState<string | null>(null)
	const {data:dataOne,isSuccess:isSuccessDataOne} = useGetOneSubmissionsQuery(selectedPractice,{skip: !selectedPractice})
	const [isFIOProf, setIsFIOProf] = useState(false)
	const dispatch = useAppDispatch()

	// useEffect(() => {
	// 	if (isSuccessGetStudents) {
	// 		const newArray = dataGetStudents?.map((item: any) => ({
	// 			name: item.name,
	// 			costForDay: null,
	// 			arrivingCost: null,
	// 			livingCost: null,
	// 			place: null,
	// 			category: item.category,
	// 			categoryId: item.categoryId,
	// 			departmentDirector: fullSelectedPractise.departmentDirector,
	// 			groupNumber: fullSelectedPractise.groupNumber
	// 		}))
	// 		setFullTable(newArray.map((item: any) => ({ key: item.name, ...item })))
	// 		setStep(1)
	// 	}
	// }, [isSuccessGetStudents, isSuccessAllPractice, dataGetStudents, dataAllPractise])

	useEffect(() => {
		if (!visiting) {
			if (isSuccessGetStudents && fullTable.length > 0) {
				if (fullTable.every((item: any) => item.place !== null)) {
					setStep(2)
				}
			}
		}
		if (visiting) {
			if (isSuccessGetStudents && fullTable.length > 0) {
				if (
					fullTable.every((item: any) => item.place !== null && item.arrivingCost !== null && item.livingCost !== null)
				) {
					setStep(2)
				} else {
					setStep(1)
				}
			}
		}
	}, [fullTable, isSuccessGetStudents, visiting])

	// useEffect(() => {
	// 	dispatch(changeStatusTrue())
	// }, [])

	useEffect(() => {
		if (isSuccessGetContracts) {

			const newArray = dataGetContracts.map(item => {
				return {
					value: item.id,
					label: `${item.contractFacility} ${item.contractNumber} ${item.conclusionDate}`
				}
			})
			setContracts(newArray)
		}
	}, [isSuccessGetContracts])

	useEffect(()=>{
		if(selectContract && isFIOProf){
			setStep(2)
		}
	},[selectContract,isFIOProf])

	const hanldeSelectedPractise = (id: any) => {
		setSelectedPractice(id)
		setStep(1)
		setIsModalOpenOne(false)
	}

	const showModalOne = () => {
		setIsModalOpenOne(true)
	}

	const handleOkOne = () => {
		setIsModalOpenOne(false)
	}

	const handleCancelOne = () => {
		setIsModalOpenOne(false)
	}

	const handleRowClick = (record: any) => {
		hanldeSelectedPractise(record.id)
		setFullSelectedPractise(record)
	}

	const sendData = () => {
		if (isFIOProf===false) {
			return dispatch(
				showNotification({
					message: `Для сохранения необходимо заполнить "ФИО руководителя практики от Профильной Организации" и выбрать договор`,
					type: 'warning'
				})
			)
		}
		const tableDataStudent = fullTable.map((item: any) => ({
			costForDay: item.costForDay,
			arrivingCost: item.arrivingCost,
			livingCost: item.livingCost,
			name: item.name,
			place: item.place,
			category: item.category
		}))
		const obj = {
			practiceId: selectedPractice,
			isWithDeparture: visiting ? true : false,
			theme: theme,
			students: tableDataStudent
		}

		sendSubmission(obj)
			.unwrap()
			.then(() => {
				nav('/services/practices/representation')
			})
			.catch(error => {
				if (error.status === 409) {
					dispatch(showNotification({ message: 'Такое представление уже имеется, создайте другое', type: 'error' }))
				}
				console.log(error)
			})
	}

	const okayModal = () => {
		showModalOne()
	}

	const handleChange = (value: string) => {
		console.log('Выбранный ID:', value)
		setSelectContract(value)
	}

	return (
		<Spin spinning={isLoadingAddSub}>
			<section className="container">
				<Row gutter={[16, 16]}>
					<Col span={24}>
						<Button
							size="large"
							className="mt-1"
							icon={<ArrowLeftSvg className="w-4 h-4 cursor-pointer mt-1" />}
							type="text"
							onClick={() => {
								nav('/services/practices/representation')
							}}
						/>
						<Typography.Text className=" text-[28px] mb-14">Добавление приложения 4</Typography.Text>
					</Col>
				</Row>

				<Row className="mt-4 flex items-center justify-between">
					<Col span={12} className="justify-start flex">
						<Steps
							size="small"
							current={step}
							items={[
								{
									title: 'Выберите приказ'
								},
								{
									title: 'Выберите договор и заполните таблицу'
								},
								{
									title: 'Сохраните приложение'
								}
							]}
						/>
					</Col>
					{!selectedPractice ? (
						<Col span={24} className="justify-end flex">
							<div>
								<Space>
									{selectedPractice ? (
										<Popconfirm
											title="Редактирование"
											description="Вы уверены, что хотите изменить приказ? Все данные будут удалены."
											onConfirm={okayModal}
											okText="Да"
											cancelText="Нет"
										>
											<Button>Изменить приказ</Button>
										</Popconfirm>
									) : (
										<Button onClick={showModalOne}>Выбрать приказ</Button>
									)}
								</Space>
							</div>
						</Col>
					) : null}
				</Row>

				{selectedPractice ? (
					<>
						{/* <Descriptions className='mt-8'  items={items} /> */}
						<Row className="items-end">
							<Col span={24} className="justify-end flex">
								<div>
									<Space>
										{selectedPractice ? (
											<Popconfirm
												title="Редактирование"
												description="Вы уверены, что хотите изменить приказ? Все данные будут удалены."
												onConfirm={okayModal}
												okText="Да"
												cancelText="Нет"
											>
												<Button>Изменить приказ</Button>
											</Popconfirm>
										) : (
											<Button onClick={showModalOne}>Выбрать приказ</Button>
										)}
									</Space>
								</div>
							</Col>
						</Row>
					</>
				) : (
					''
				)}

				{visiting ? (
					<Row className="mt-4">
						<Col span={1} className="flex items-center">
							<label htmlFor="topic">Тема:</label>
						</Col>
						<Col span={3} className="">
							<Input id="topic" placeholder="" onChange={e => setTheme(e.target.value)} />
						</Col>
					</Row>
				) : (
					''
				)}
				<Row>
					<Col span={24}>
						<Typography.Text>Договор</Typography.Text>
					</Col>
					<Col className="mt-2" span={12}>
						<Select
							style={{ width: '100%' }}
							showSearch
							placeholder="Выберите договор"
							onChange={handleChange}
							filterOption={(input, option) =>
								(option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
							}
							options={contracts}
						/>
					</Col>
				</Row>

				<PracticeModal
					selectedPractice={selectedPractice}
					isModalOpenOne={isModalOpenOne}
					handleOkOne={handleOkOne}
					handleCancelOne={handleCancelOne}
					setFilter={setFilter}
					filter={filter}
					handleRowClick={handleRowClick}
					tableRef={tableRef}
					tableData={tableData}
				/>

				{selectedPractice ? (
					isLoadingStudents ? (
						<Spin className="w-full mt-20" indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
					) : (
						<>
							<Row className="mt-4">
								<Col flex={'auto'}>
									<Form form={form} component={false}>
										<TableEdit isSuccessDataOne={isSuccessDataOne} setIsFIOProf={setIsFIOProf} fullTable={dataOne} visiting={visiting} setFullTable={setFullTable} create={true} />
									</Form>
								</Col>
							</Row>
							<Row className="">
								<Col span={3} className=" mt-6">
									<Space className="w-full ">
										<Button
											type="primary"
											className="!rounded-full"
											onClick={() => {
												sendData()
											}}
										>
											Сохранить
										</Button>
									</Space>
								</Col>
							</Row>
						</>
					)
				) : null}
			</section>
		</Spin>
	)
}

export default CreateAppendix
