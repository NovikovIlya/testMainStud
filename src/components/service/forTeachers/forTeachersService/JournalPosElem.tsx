import { PrinterOutlined, StarOutlined } from '@ant-design/icons'
import { Button, Col, Form, Modal, Radio, Result, Row, Select, Spin } from 'antd'
import { t } from 'i18next'
import React, { useEffect, useState } from 'react'

import { useAppSelector } from '../../../../store'
import {
	useGetDataSemesterQuery,
	useGetDisciplineSemesterQuery,
	useSendDataSemesterMutation
} from '../../../../store/api/forTeacher/forTeacherApi'

import InfoCard from './InfoCard'
import TableBrs from './table/TableBrs'
import TableJournalPos from './table/TableJournalPos'

const JournalPosElem = () => {
	const initialDay = ''
	const [form] = Form.useForm()
	const yearForm = useAppSelector(state => state.forTeacher.yearForm)
	const semestrForm = useAppSelector(state => state.forTeacher.semestrForm)
	const discilineForm = Form.useWatch('disciline', form)
	const groupeForm = Form.useWatch('group', form)
	const [monthValue, setMonthValue] = useState(null)
	const [disciplineId, setDisciplineId] = useState<any>(null)
	const [groupId, setGroupId] = useState<any>(null)
	const { data, isFetching } = useGetDisciplineSemesterQuery({ year: yearForm, semester: semestrForm },{ skip: !yearForm || !semestrForm })
	const { data: dataGetSemestr, isFetching: isFetchingData } = useGetDataSemesterQuery({ subjectId: disciplineId, groupId: groupId, month: monthValue, year: yearForm, semester: semestrForm },{ skip: !yearForm || !semestrForm || !monthValue || !groupId })
	const [dataSource, setDataSource] = useState<any[]>([])
	const [checkboxValue, setCheckboxValue] = useState<any>([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [sendData, {}] = useSendDataSemesterMutation()
	const [radioKey, setRadioKey] = useState(Math.random())

	useEffect(() => {
		if (dataGetSemestr) {
			setDataSource(dataGetSemestr)
		}
	}, [dataGetSemestr])

	const getMonthsBySemester = (semester: any, year: any) => {
		if (semester === 1) {
			return ['september', 'october', 'november', 'december']
		}

		if (year === 2025) {
			return ['march', 'april', 'may', 'june']
		}

		return ['february', 'march', 'april', 'may']
	}

	const months = getMonthsBySemester(semestrForm, yearForm)

	const onChange = () => {}

	const showModal = () => {
		setIsModalOpen(true)
	}

	const handleClose = () => {
		setIsModalOpen(false)
	}

	const saveData = () => {
		const checks = checkboxValue.map((item: any) => item.columnNumber)
		const data = {
			students: dataSource,
			approvedColumnNumbers: checks,
			semester: semestrForm,
			year: yearForm,
			groupId: groupId,
			subjectId: disciplineId,
			month: monthValue
		}
		sendData(data)
	}

	const onChangeSelect = () => {
		setMonthValue(null)
		setDataSource([])
		setRadioKey(Math.random())
	}

	return (
		<Spin spinning={isFetchingData} className=" ">
			<Form className="mt-8" form={form}>
				<Row>
					<Col span={24}>
						<Form.Item
							name="disciline"
							label="Предмет/Группа"
							labelAlign="left"
							labelCol={{ span: 3 }} // Фиксированная ширина лейбла
							wrapperCol={{ span: 10 }} // Оставшаяся ширина для инпута
						>
							<Select
								loading={isFetching}
								onSelect={value => {
									if (value) {
										setDisciplineId(Number(value.split('/')[0]))
										setGroupId(Number(value.split('/')[1]))
									} else {
										// setDisciplineId(null)
										// setGroupId(null)
									}
								}}
								onChange={onChangeSelect}
								options={data?.map((item: any) => {
									return {
										label: item.disciplineName + ' / ' + item.groupName,
										value: item.disciplineId + '/' + item.groupId,
										key: item.disciplineId + '/' + item.groupId
									}
								})}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Form>

			{disciplineId ? (
				<>
					<div className={` mt-10  radio  justify-center animate-fade-in mb-6 `}>
						<Radio.Group
							key={radioKey}
							onChange={onChange}
							defaultValue={initialDay}
							buttonStyle="solid"
							className="flex gap-[10px] h-9"
						>
							{months.map((month, index) => (
								<Radio.Button
									className="rounded-full bg-transparent h-full flex items-center text-base"
									onChange={value => {
										setMonthValue(value.target.value)
										console.log('value,', Number(value.target.value))
									}}
									value={index + 1}
								>
									{t(month)}
								</Radio.Button>
							))}
						</Radio.Group>
					</div>
					<div className="animate-fade-in ">
						<Row className="flex gap-2">
							<Button className="rounded-xl" icon={<PrinterOutlined />}>
								{t('printJournalEmpty')}
							</Button>
							<Button className="rounded-xl" icon={<PrinterOutlined />}>
								{t('printJournalFiled')}
							</Button>
						</Row>
						{/* <Button onClick={showModal}>Открыть журнал</Button> */}
						{/* <Modal
							maskClosable={false}
							title="Журнал посещаемости"
							open={isModalOpen}
							onCancel={handleClose}
							footer={null}
							width="100%"
							style={{ height: 'calc(100vh - 55px)' }}
							> */}
						{monthValue && disciplineId ? (
							<>
								<TableJournalPos
									setCheckboxValue={setCheckboxValue}
									setDataSource={setDataSource}
									dataSource={dataSource}
								/>
								{/* </Modal> */}
								<Button onClick={saveData} className="mt-4 mb-4 rounded-xl" type="primary">
									{t('Save')}
								</Button>
							</>
						) : (
							<Result title="Выберите месяц" />
						)}
					</div>
				</>
			) : (
				<Result title="Выберите предмет/группу" />
			)}
		</Spin>
	)
}

export default JournalPosElem
