import { Button, Card, Col, Divider, Popover, Row, Space, Typography } from 'antd'
import React, { useState } from 'react'

import EditableTableTwo from './EditableTableTwo'

const Diary = ({setShowFinalTwo}:any) => {
	const [dataSource, setDataSource] = useState<any>([
		{
		  key: '0',
		  name: '',
		  age:  null, 
		},
	   
	   
	  ]);
	const [isDisabled, setIsDisabled] = useState(true)
	const [show, setShow] = useState(false)
	const handleButton = ()=>{
		setShow(true)
		setShowFinalTwo(true)
	}
	return (
		<>
			<Row>
				<Col span={12}>
					<Divider />
				</Col>
			</Row>
			<Row>
				<Col>
					<Typography.Title level={2}>Дневник практиканта</Typography.Title>
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<EditableTableTwo dataSource={dataSource} setDataSource={setDataSource} setIsDisabled={setIsDisabled}/>
				</Col>
			</Row>

			<Row gutter={[16, 16]} className="my-8">
				<Col xs={24} sm={24} md={18} lg={8} xl={6}>
					<Space className="w-full">
					<Popover content={isDisabled ? 'Заполните содержание выполненной работы и период выполнения дневника практиканта' : null}><Button
							className="!rounded-full"
							size="large"
                            disabled={isDisabled}
                            onClick={handleButton}
							// htmlType="submit"
						>
							Сохранить данные и сформировать документы
						</Button></Popover>
					</Space>
				</Col>
			</Row>
            {show ?
			<Row gutter={16} className="mt-14 mb-10">
				<Col span={6}>
					<Card title="Скачать документы:" bordered={false}>
						<ul className="ml-6">
							<li><a>Дневник практиканта</a></li>
						</ul>
					</Card>
				</Col>
				{/* <Col span={6}>
					<Card title="Обратите внимание" bordered={false}>
						Скачайте и проверьте документ
					</Card>
				</Col> */}
			</Row>:''}
		</>
	)
}

export default Diary
