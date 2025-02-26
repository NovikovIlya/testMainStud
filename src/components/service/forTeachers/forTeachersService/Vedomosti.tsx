import { PrinterOutlined } from '@ant-design/icons'
import { Button, Col, Empty, Form, Result, Row, Select, Spin } from 'antd'
import Title from 'antd/es/typography/Title'
import { t } from 'i18next'
import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../../store'
import {
	useGetVedomostForTeacherQuery,
	useGetVedomostGroupsQuery,
	useGetVedomostKindQuery,
	useGetVedomostSubjectsQuery, useSaveVedomostMutation
} from '../../../../store/api/forTeacher/forTeacherApi'
import { setIsEditTableScheduleTeacher } from '../../../../store/reducers/authSlice'

import InfoCard from './InfoCard'
import TableVedomosti from './table/TableVedomosti'
import { getCurrentAcademicYear } from '../../../../utils/getCurrentAcademicYear'

const Vedomosti = () => {
	const dispatch = useAppDispatch()
	const [form2] = Form.useForm()
	const yearForm = useAppSelector(state => state.forTeacher.yearForm)
	const semestrForm = useAppSelector(state => state.forTeacher.semestrForm)
	const discilineForm = Form.useWatch('disciline', form2)
	const groupeForm = Form.useWatch('group', form2)
	const kindForm = Form.useWatch('kind', form2)
	const { data, isFetching } = useGetVedomostForTeacherQuery({ subjectId: discilineForm, groupId: groupeForm,year:yearForm,semester :semestrForm,type:kindForm},{ skip: !discilineForm || !groupeForm || !kindForm})
	const { data: dataSubjects,isFetching:isFetchingSub } = useGetVedomostSubjectsQuery({year:yearForm,semester :semestrForm},{ skip: !yearForm || !semestrForm })
	const { data: dataGroups,isFetching:isFetchingGroup } = useGetVedomostGroupsQuery({subjectId:discilineForm,year:yearForm,semester :semestrForm}, { skip: !discilineForm })
	const { data: dataKind } = useGetVedomostKindQuery({subjectId:discilineForm,year:yearForm,semester :semestrForm,groupId:groupeForm}, { skip: !discilineForm || !groupeForm})
	const [saveBrs, { data: dataSave, isLoading }] = useSaveVedomostMutation()
	const [dataSource, setDataSource] = useState<any>([])
	
	useEffect(() => {
		form2.resetFields(['disciline', 'group']);
		setDataSource([]); // Очищаем данные таблицы
	}, [semestrForm]);

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
			.map(({ key,semesterMark,studName,subjectRate, N, ...rest }: any) => rest)
			.map((student: any) => ({
				...student,
				
			}))

		saveBrs({
			subjectId: String(discilineForm),
			subjectType: data?.subjectType,
			studDate: data?.studDate,
			groupId: groupeForm,
			semester: String(data?.semester),
			students: filteredData,
			journalId: data?.journalId
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
			<Empty className='mt-10' description={t('noSubjects')}></Empty>
		)
	}

	return (
		<Spin spinning={isLoading || isFetching || isFetchingSub}>
			{semestrForm ? (
				<Form onFinish={onFinish} form={form2} className="px-[80px] mb-8">
					<InfoCard text={t('infoTextVed')} />
					<Title className="mt-8" level={2}>
						{t('vedomosti')}
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

							<Col span={24}>
								<Form.Item
									name="kind"
									label={t('kindControl')}
									labelAlign="left"
									labelCol={{ span: 6 }} // Такая же ширина лейбла
									wrapperCol={{ span: 8 }} // Такая же ширина инпута
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
										disabled={!groupeForm}
										allowClear
										options={
											[
												{ label: t('exam'), value: 'e' },
												{ label: t('credit'), value: 'q' },
												{ label: t('difcredit'), value: 'd' }
											]
										}
									/>
								</Form.Item>
							</Col>
						</Row>
					</div>

					{groupeForm && kindForm ? (
						<div className="animate-fade-in">
							<Row className="flex gap-2">
								<a href={data?.emptyPrintForm}  target="_blank">
								<Button  className="rounded-xl" icon={<PrinterOutlined />}>
								
									{t('printJournalEmpty')}
								</Button>
								</a>
								<a href={data?.filledPrintForm}  target="_blank">
								<Button className="rounded-xl" icon={<PrinterOutlined />}>
									{t('printJournalFiled')}
								</Button>
								</a>
							</Row>

							<TableVedomosti subj_type={data?.subj_type} is_session={data?.is_session} dataSource={dataSource} setDataSource={setDataSource} />
							{data?.students?.length === 0 ? <div className='text-red-500 mt-4 w-full justify-center text-center'>Для выбранного вида нет данных, измените вид</div> : ''}
							<Button disabled={getCurrentAcademicYear().value!==yearForm} htmlType="submit" className="mt-8 mb-8 rounded-xl" type="primary">
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
