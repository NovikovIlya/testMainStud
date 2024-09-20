import { Button, Card, Col, Divider, Popover, Row, Space, Typography } from 'antd'
import React, { useState } from 'react'
import dayjs from 'dayjs'

import EditableTable from './EditableTable'

const Plan = ({dataTasks,setShowFinal}:any) => {
	const [dataSource, setDataSource] = useState<any>(dataTasks.map((item:any)=>{
		return{
		  key:item.id,
		  name:item.description,
		  age:null
		}
	}));
    const [isDisabled,setIsDisabled] = useState(true)
    const [show,setShow] = useState(false)
	const handleButton = ()=>{
	 setShow(true)
     setShowFinal(true)

	 const validData = dataSource.map((item:any)=>{
		const startDate = dayjs(item.age?.[0]).format('DD.MM.YYYY')
		const endDate = dayjs(item?.age[1]).format('DD.MM.YYYY')
		return {
			id:item.key,
			task:item.name,
			date:[startDate,endDate]
		}
	 })
	 console.log('validData',validData)
	}

	return (
		<>
		
			<Row className='mt-6'>
				<Col>
					<Typography.Title level={2}>Отчет и Индивидуальные задания</Typography.Title>
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<EditableTable dataSource={dataSource} setDataSource={setDataSource} setIsDisabled={setIsDisabled}/>
				</Col>
			</Row>

			<Row gutter={[16, 16]} className="my-8">
				<Col xs={24} sm={24} md={18} lg={8} xl={6}>
					<Space className="w-full">
						<Popover content={isDisabled ? 'Заполните период выполнения практики' : null}><Button
                            disabled={isDisabled}
							className="!rounded-full"
							size="large"
                            onClick={handleButton}
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
							<li><a>Отчет по практике</a></li>
							<li><a>Индивидуальные задания</a></li>
						</ul>
					</Card>
				</Col>
				<Col span={6}>
					<Card title="Обратите внимание" bordered={false}>
					<ul className='pl-5 pr-5 '>
						<li className='mb-3'>Отчет должен заполняться самостоятельно.В модуле “Практики студентов” формируется только титульный лист отчета.</li>
						<li className=''>Индивидуальные задания представляют собой план-график на практику студента. Перед началом практики руководитель по практике должен поставить подпись.</li>

					</ul>
					</Card>
				</Col>
			</Row> : ''}
		</>
	)
}

export default Plan
