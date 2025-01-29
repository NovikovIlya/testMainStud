import { PrinterOutlined, StarOutlined } from '@ant-design/icons'
import { Button, Col, Form, Result, Row, Select } from 'antd'
import { t } from 'i18next'
import React, { useState } from 'react'

import InfoCard from './InfoCard'
import TableBrs from './table/TableBrs'

const Brs = () => {
	const [form] = Form.useForm()
	const discilineForm = Form.useWatch('disciline', form)
	const groupeForm = Form.useWatch('group', form)

	const [dataSource, setDataSource] = useState<any[]>([
		{
			N: '1',
			key: '0',
			name: 'Edward King 0',
			age: '32',
			address: 'London, Park Lane no. 0'
		},
		{
			N: '2',
			key: '1',
			name: 'Edward King 1',
			age: '32',
			address: 'London, Park Lane no. 1'
		}
	])

	

	return (
		<div className="p-[80px]">
			<InfoCard text={t('infoTextBrs')} />

			<Form className="mt-8" form={form}>
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
								options={[
									{ value: '1', label: 'Дисциплина 1' },
									{ value: '2', label: 'Дисциплина 2' }
								]}
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
							<Select disabled={!discilineForm} allowClear />
						</Form.Item>
					</Col>
				</Row>
			</Form>

			{true ? (
				<div className='animate-fade-in'>
					<Row className="flex gap-2">
						<Button className="rounded-xl" icon={<PrinterOutlined />}>
							{t('printJournalEmpty')}
						</Button>
						<Button className="rounded-xl" icon={<PrinterOutlined />}>
							{t('printJournalFiled')}
						</Button>
					</Row>

					<TableBrs setDataSource={setDataSource} dataSource={dataSource} />

					<InfoCard text={t('infoTextBrs2')} />
				</div>
			) : (
				<Result title="" extra={t('selectYearSemest')} />
			)}
		</div>
	)
}

export default Brs
