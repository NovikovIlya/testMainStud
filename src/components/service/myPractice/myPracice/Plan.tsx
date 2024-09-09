import { Button, Card, Col, Divider, Row, Space, Typography } from 'antd'
import React, { useState } from 'react'

import EditableTable from './EditableTable'

const Plan = () => {
    const [isDisabled,setIsDisabled] = useState(true)
    const [show,setShow] = useState(false)
    
	return (
		<>
			<Row>
				<Col span={12}>
					<Divider />
				</Col>
			</Row>
			<Row>
				<Col>
					<Typography.Title level={2}>План практики</Typography.Title>
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<EditableTable setIsDisabled={setIsDisabled}/>
				</Col>
			</Row>

			<Row gutter={[16, 16]} className="my-8">
				<Col xs={24} sm={24} md={18} lg={8} xl={6}>
					<Space className="w-full">
						<Button
                            disabled={isDisabled}
							className="!rounded-full"
							size="large"
                            onClick={() => setShow(true)}
						>
							Сформировать и скачать направительные документы
						</Button>
					</Space>
				</Col>
			</Row>

            {show ?
			<Row gutter={16} className="mt-14 mb-10">
				<Col span={6}>
					<Card title="Шаблон пакета документов:" bordered={false}>
						<ul className="ml-6">
							<li>Шаблон отчет по практике</li>
							<li>Путевка практиканта</li>
						</ul>
					</Card>
				</Col>
				<Col span={6}>
					<Card title="Обратите внимание" bordered={false}>
						Путевку практиканта необходимо распечатать с использованием двусторонней печати и отнести на подпись в
						Департамент Образования до начала практики — с подписанным документом можно начинать практику в организации.
					</Card>
				</Col>
			</Row> : ''}
		</>
	)
}

export default Plan
