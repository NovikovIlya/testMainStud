import { Button, Card, Col, Divider, Row, Space, Typography } from 'antd'
import React, { useState } from 'react'

import EditableTableTwo from './EditableTableTwo'

const Diary = () => {
	const [isDisabled, setIsDisabled] = useState(true)
	const [show, setShow] = useState(false)
	return (
		<>
			<Row>
				<Col span={12}>
					<Divider />
				</Col>
			</Row>
			<Row>
				<Col>
					<Typography.Title level={2}>Отчетный дневник практиканта</Typography.Title>
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<EditableTableTwo setIsDisabled={setIsDisabled}/>
				</Col>
			</Row>

			<Row gutter={[16, 16]} className="my-8">
				<Col xs={24} sm={24} md={18} lg={8} xl={6}>
					<Space className="w-full">
						<Button
							className="!rounded-full"
							size="large"
                            disabled={isDisabled}
                            onClick={() => setShow(!show)}
							// htmlType="submit"
						>
							Сформировать дневник практиканта
						</Button>
					</Space>
				</Col>
			</Row>
            {show ?
			<Row gutter={16} className="mt-14 mb-10">
				<Col span={6}>
					<Card title="Дневник практиканта:" bordered={false}>
						<ul className="ml-6">
							<li>Дневник практиканта</li>
						</ul>
					</Card>
				</Col>
				<Col span={6}>
					<Card title="Обратите внимание" bordered={false}>
						Скачайте и проверьте документ
					</Card>
				</Col>
			</Row>:''}
		</>
	)
}

export default Diary
