import { PrinterOutlined } from '@ant-design/icons'
import { Button, Col, Form, Result, Row, Select, Spin } from 'antd'
import Title from 'antd/es/typography/Title'
import { t } from 'i18next'
import React, { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../../store'
import {
	useGetBrsForTeacherQuery,
	useGetBrsGroupsQuery,
	useGetBrsSubjectsQuery,
	useGetVedomostForTeacherQuery,
	useGetVedomostGroupsQuery,
	useGetVedomostSubjectsQuery,
	useSaveBrsMutation
} from '../../../../store/api/forTeacher/forTeacherApi'
import { setIsEditTableScheduleTeacher } from '../../../../store/reducers/authSlice'

import InfoCard from './InfoCard'
import TableVedomosti from './table/TableVedomosti'

const Vedomosti = () => {
	const dispatch = useAppDispatch()
	const [form2] = Form.useForm()
	const yearForm = useAppSelector(state => state.forTeacher.yearForm)
	const semestrForm = useAppSelector(state => state.forTeacher.semestrForm)
	const discilineForm = Form.useWatch('disciline', form2)
	const groupeForm = Form.useWatch('group', form2)
	const { data, isError, error, isFetching } = useGetVedomostForTeacherQuery({ subjectId: discilineForm, groupId: groupeForm,year:yearForm,semester :semestrForm},{ skip: !discilineForm || !groupeForm })
	const { data: dataSubjects,isFetching:isFetchingSub } = useGetVedomostSubjectsQuery({year:yearForm,semester :semestrForm},{ skip: !yearForm || !semestrForm })
	const { data: dataGroups,isFetching:isFetchingGroup } = useGetVedomostGroupsQuery({subjectId:discilineForm,year:yearForm,semester :semestrForm}, { skip: !discilineForm })
	const [saveBrs, { data: dataSave, isLoading }] = useSaveBrsMutation()
	const [dataSource, setDataSource] = useState<any>([])
	

	useEffect(() => {
		if (data?.students) {
			setDataSource(
				data.students.map((item: any, index: number) => ({
					...item,
					key: item.studId,
					N: index + 1
				}))
			)
		}
	}, [data])

	const handleYearChange = () => {
		form2.resetFields(['group'])
	}

	const onFinish = () => {
		const filteredData = dataSource
			.map(({ key, N, ...rest }: any) => rest)
			.map((student: any) => ({
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
	}

	if(isFetchingSub){
		return (
			<Spin className='w-full flex justify-center align-center mt-16' spinning={isLoading || isFetching || isFetchingSub}>
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
		<Spin spinning={isLoading || isFetching || isFetchingSub}>
			{semestrForm ? (
				<Form onFinish={onFinish} form={form2} className="px-[80px] mb-8">
					<InfoCard text={t('infoTextVed')} />
					<Title className="mt-8" level={2}>
						Ведомости
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
											dataSubjects?.subjects?.map((item: any) => ({
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
											dataGroups?.groups?.map((item: any) => ({
												label: item.groupName,
												value: item.groupId
											})) || []
										}
									/>
								</Form.Item>
							</Col>
						</Row>
					</div>

					{groupeForm ? (
						<div className="animate-fade-in">
							<Row className="flex gap-2">
								<Button className="rounded-xl" icon={<PrinterOutlined />}>
									{t('printJournalEmpty')}
								</Button>
								<Button className="rounded-xl" icon={<PrinterOutlined />}>
									{t('printJournalFiled')}
								</Button>
							</Row>

							<TableVedomosti subj_type={data?.subj_type} is_session={data?.is_session} dataSource={dataSource} setDataSource={setDataSource} />

							<Button htmlType="submit" className="mt-8 mb-8 rounded-xl" type="primary">
								{t('Save')}
							</Button>

							<InfoCard text={t('infoTextVed2')} />
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

export default Vedomosti
