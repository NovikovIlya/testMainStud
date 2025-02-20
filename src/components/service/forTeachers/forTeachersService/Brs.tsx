import { PrinterOutlined, StarOutlined } from '@ant-design/icons'
import { Button, Col, Form, Result, Row, Select, Spin ,message} from 'antd'
import Title from 'antd/es/typography/Title'
import { t } from 'i18next'
import React, { useEffect, useState } from 'react'

import { Student, dataBrs } from '../../../../models/forTeacher'
import { useAppDispatch, useAppSelector } from '../../../../store'
import {
	useGetBrsForTeacherQuery,
	useGetBrsGroupsQuery,
	useGetBrsSubjectsQuery,
	useSaveBrsMutation
} from '../../../../store/api/forTeacher/forTeacherApi'
import { logOut, setIsEditTableScheduleTeacher } from '../../../../store/reducers/authSlice'

import InfoCard from './InfoCard'
import TableBrs from './table/TableBrs'

const Brs = () => {
	const dispatch = useAppDispatch()
	const [form2] = Form.useForm()
	const discilineForm = Form.useWatch('disciline', form2)
	const groupeForm = Form.useWatch('group', form2)
	const yearForm = useAppSelector(state => state.forTeacher.yearForm)
	const semestrForm = useAppSelector(state => state.forTeacher.semestrForm)
	const { data, isError, error, isFetching } = useGetBrsForTeacherQuery({ subjectId: discilineForm, groupId: groupeForm,year:yearForm,semester :semestrForm },{ skip: !discilineForm || !groupeForm || !yearForm || !semestrForm })
	const { data: dataSubjects,isFetching:isFetchingSubject } = useGetBrsSubjectsQuery({year:yearForm,semester :semestrForm},{skip: !yearForm || !semestrForm})
	const { data: dataGroups,isFetching:isFetchingGroup } = useGetBrsGroupsQuery({subjectId:discilineForm,year:yearForm,semester :semestrForm}, { skip: !discilineForm || !yearForm || !semestrForm})
	const [saveBrs, { data: dataSave, isLoading,isError:isErrorSave ,error:errorSave}] = useSaveBrsMutation()
	const [dataSource, setDataSource] = useState<Student[]>([])
	const [errorDisplayed, setErrorDisplayed] = useState(false);

	useEffect(() => {
		if (data?.students) {
			setDataSource(
				data.students.map((item: Student, index: number) => ({
					...item,
					key: item.studId,
					N: index + 1
				}))
			)
		}
	}, [data])

	useEffect(() => {
		form2.resetFields();
		setDataSource([]); 
	}, [semestrForm]);

	const handleYearChange = () => {
		form2.resetFields(['group'])
	}
	console.log('isErrorSave',isErrorSave)
	// if(isErrorSave){
	// 	// @ts-ignore
	// 	message.info(errorSave?.data);
 	// 	// dispatch(logOut())
	//  }
	useEffect(() => {
		if (isErrorSave && !errorDisplayed) {
		 // @ts-ignore
		  message.info(errorSave?.data === 'OK' ?  'Сохранено':errorSave?.data);
		  setErrorDisplayed(true);
		}
	  }, [isErrorSave, errorDisplayed, errorSave]);

	const onFinish = () => {
		const filteredData = dataSource
			.map(({ key, N, ...rest }) => rest)
			.map(student => ({
				...student,
				firstMonth: Number(student.firstMonth),
				secondMonth: Number(student.secondMonth),
				thirdMonth: Number(student.thirdMonth),
				fourthMonth: Number(student.fourthMonth)
			}))

		saveBrs({
			subjectId: discilineForm,
			groupId: groupeForm,
			semester: data?.semester,
			students: filteredData
		})
		dispatch(setIsEditTableScheduleTeacher(false))
		setErrorDisplayed(false);
	}

	if(dataSave) {
		console.log('dataSave',dataSave);
	}

	if(isFetchingSubject){
		return (
			<Spin className='w-full flex justify-center align-center mt-16' spinning={isFetchingSubject }>
			</Spin>
		)
	}

	if(dataSubjects?.subjects?.length === 0){
		return (
			<Result
				status="info"
				title={t('noSubjects')}
			/>
		)
	}
	

	return (
		<Spin spinning={ isFetching}>
			{semestrForm ? (
				<Form onFinish={onFinish} form={form2} className="px-[80px] mb-8">
					<InfoCard text={t('infoTextBrs')} />
					<Title className="mt-8" level={2}>
						{t('BRS')}
					</Title>
					<div className="mt-8">
						<Row>
							<Col span={24}>
								<Form.Item
									name="disciline"
									label={t('discipline')}
									labelAlign="left"
									labelCol={{ span: 4 }} // Фиксированная ширина лейбла
									wrapperCol={{ span: 18 }} // Оставшаяся ширина для инпута
								>
									<Select
										loading={isFetchingSubject}
										allowClear
										showSearch
										filterOption={(input, option) => {
											if (option?.label) {
												// Проверяем, что label существует
												return option.label.toString().toLowerCase().includes(input.toLowerCase())
											}
											return false
										}}
										options={
											dataSubjects?.map((item: any) => ({
												label: item.subjectName,
												value: item.subjectId
											})) || []
										}
										onChange={handleYearChange}
									/>
								</Form.Item>
							</Col>

							<Col span={24}>
								<Form.Item
									name="group"
									label={t('group')}
									labelAlign="left"
									labelCol={{ span: 4 }} // Такая же ширина лейбла
									wrapperCol={{ span: 10 }} // Такая же ширина инпута
								>
									<Select
									    loading={isFetchingGroup}
										showSearch
										filterOption={(input, option) => {
											if (option?.label) {
												// Проверяем, что label существует
												return option.label.toString().toLowerCase().includes(input.toLowerCase())
											}
											return false
										}}
										disabled={!discilineForm}
										allowClear
										options={
											dataGroups?.map((item: any) => ({
												label: item.groupName,
												value: item.groupId
											})) || []
										}
									/>
								</Form.Item>
							</Col>
						</Row>
					</div>

					{groupeForm && data?.students?.length ? (
						<div className="animate-fade-in">
							<Row className="flex gap-2">
								<Button className="rounded-xl" icon={<PrinterOutlined />}>
									{t('printJournalEmpty')}
								</Button>
								<Button className="rounded-xl" icon={<PrinterOutlined />}>
									{t('printJournalFiled')}
								</Button>
							</Row>
							<Spin spinning={isLoading}>
							<TableBrs semester={data.semester} dataSource={dataSource} setDataSource={setDataSource} />
							</Spin>
							<Button htmlType="submit" className="mt-8 mb-8 rounded-xl" type="primary">
								{t('Save')}
							</Button>

							<InfoCard text={t('infoTextBrs2')} />
						</div>
					) : (
						<Result className="mb-4" title="" extra={t('selectDis')} />
					)}
				</Form>
			) : (
				<Result title="" extra={t('selectYearSemest')} />
			)}
		</Spin>
	)
}
export default Brs
