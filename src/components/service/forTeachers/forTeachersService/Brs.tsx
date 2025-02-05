import { PrinterOutlined, StarOutlined } from '@ant-design/icons'
import { Button, Col, Form, Result, Row, Select, Spin } from 'antd'
import { t } from 'i18next'
import React, { useEffect, useState } from 'react'

import { dataBrs, Student } from '../../../../models/forTeacher'
import {
	useGetBrsForTeacherQuery,
	useGetBrsGroupsQuery,
	useGetBrsSubjectsQuery,
	useSaveBrsMutation
} from '../../../../store/api/forTeacher/forTeacherApi'

import InfoCard from './InfoCard'
import TableBrs from './table/TableBrs'

const Brs = () => {
	const [form] = Form.useForm()
	const discilineForm = Form.useWatch('disciline', form)
	const groupeForm = Form.useWatch('group', form)
	const { data } = useGetBrsForTeacherQuery(
		{ subjectId: discilineForm, groupId: groupeForm },
		{ skip: !discilineForm || !groupeForm }
	)
	const { data: dataSubjects } = useGetBrsSubjectsQuery()
	const { data: dataGroups } = useGetBrsGroupsQuery(discilineForm, { skip: !discilineForm })
	const [saveBrs,{data:dataSave,isLoading}] = useSaveBrsMutation()
	const [dataSource, setDataSource] = useState<Student[]>([])
	

	console.log('data', data)

	useEffect(() => {
		if (data?.students) {
			setDataSource(data.students.map((item: Student,index:number) => ({
				...item,
				key: item.studId,
				N: index+1
			})))
		}
	}, [data])

	const handleYearChange = () => {
		form.resetFields(['group'])
	}
	console.log('dataSource',dataSource)

	const onFinish = () => {
		const filteredData = dataSource.map(({key, N, ...rest}) => rest);

		saveBrs({
			subjectId: discilineForm,
			groupId: groupeForm,
			semester: data?.semester,
			students:filteredData
		})
	}

	return (
		<Spin spinning={isLoading}>
		<Form  onFinish={onFinish} form={form} className="p-[80px]">
			<InfoCard text={t('infoTextBrs')} />

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

					<TableBrs semester={data.semester} dataSource={dataSource} setDataSource={setDataSource} />

					  <Button htmlType="submit" className='top-[-50px] rounded-xl' type='primary'>{t('Save')}</Button>

					<InfoCard text={t('infoTextBrs2')} />
				</div>
			) : (
				<Result title="" extra={t('selectYearSemest')} />
			)}
		</Form>
		</Spin>
	)
}
export default Brs
