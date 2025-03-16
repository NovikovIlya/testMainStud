import { PrinterOutlined, StarOutlined } from '@ant-design/icons'
import { Button, Col, Form, Radio, Result, Row, Select } from 'antd'
import { t } from 'i18next'
import React, { useEffect, useState } from 'react'

import InfoCard from './InfoCard'
import TableBrs from './table/TableBrs'
import TableJournalPos from './table/TableJournalPos'
import { useGetDisciplineSemesterQuery } from '../../../../store/api/forTeacher/forTeacherApi'
import { useAppSelector } from '../../../../store'

const JournalPosElem = () => {
	const initialDay = ''
	const [form] = Form.useForm()
	const yearForm = useAppSelector(state => state.forTeacher.yearForm)
	const semestrForm = useAppSelector(state => state.forTeacher.semestrForm)
	const discilineForm = Form.useWatch('disciline', form)
	const groupeForm = Form.useWatch('group', form)
    const {data} = useGetDisciplineSemesterQuery({year:yearForm,semester:semestrForm},{skip:!yearForm || !semestrForm})
	

	const [dataSource, setDataSource] = useState<any[]>([
		{
			N: '1',
			key: '0',
			name: 'Edward King 0',
			age: '32',
			address: 'London, Park Lane no. 0',
			september:'sad',
			october:'azzsdasd',
			november:'bbasdasd',
			december:'asssdasd',
		},
		{
			N: '2',
			key: '1',
			name: '11',
			age: '32',
			address: 'ии',
			september:'00',
			october:'55',
			november:'66',
			december:'77',
		}
	])
	const onChange = ()=>{

	}

	return (
		<div className="">
			

			<Form className="mt-8" form={form}>
				<Row>
					<Col span={24}>
						<Form.Item
							name="disciline"
							label='Предмет/Группа'
							labelAlign="left"
							labelCol={{ span: 4 }} // Фиксированная ширина лейбла
							wrapperCol={{ span: 18 }} // Оставшаяся ширина для инпута
						>
							<Select
								allowClear
								options={[
									{ value: '1', label: 'Дисциплина 1' },
									{ value: '2', label: 'Дисциплина 2' }
								]}
							/>
						</Form.Item>
					</Col>


				</Row>
			</Form>

			

			{true ? (
				<>
				<div className={` mt-14  radio w-full justify-center animate-fade-in mb-6`}>
					<Radio.Group
						onChange={onChange}
						defaultValue={initialDay}
						buttonStyle="solid"
						className="flex gap-[10px] h-9"
					>
						<Radio.Button
							className="rounded-full bg-transparent h-full flex items-center  text-base"
							value="monday"
						>
							{t('monday')}
						</Radio.Button>
						<Radio.Button
							className="rounded-full h-full flex items-center text-base bg-transparent"
							value="tuesday"
						>
							{t('tuesday')}
						</Radio.Button>
						<Radio.Button
							className="rounded-full h-full flex items-center text-base bg-transparent"
							value="wednesday"
						>
							{t('wednesday')}
						</Radio.Button>
						<Radio.Button
							className="rounded-full h-full flex items-center text-base bg-transparent"
							value="thursday"
						>
							{t('thursday')}
						</Radio.Button>
						<Radio.Button
							className="rounded-full h-full flex items-center text-base bg-transparent"
							value="friday"
						>
							{t('friday')}
						</Radio.Button>
						<Radio.Button
							className="rounded-full h-full flex items-center text-base bg-transparent"
							value="saturday"
						>
							{t('saturday')}
						</Radio.Button>
						<Radio.Button
							className="rounded-full h-full flex items-center text-base bg-transparent"
							value="sunday"
						>
							{t('sunday')}
						</Radio.Button>
					</Radio.Group>
				</div>
				<div className='animate-fade-in'>
					<Row className="flex gap-2">
						<Button className="rounded-xl" icon={<PrinterOutlined />}>
							{t('printJournalEmpty')}
						</Button>
						<Button className="rounded-xl" icon={<PrinterOutlined />}>
							{t('printJournalFiled')}
						</Button>
					</Row>

					<TableJournalPos setDataSource={setDataSource} dataSource={dataSource} />

					
				</div>
				</>
			) : (
				<Result title="" extra={t('selectYearSemest')} />
			)}
		</div>
	)
}

export default JournalPosElem
