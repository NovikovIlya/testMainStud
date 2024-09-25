import { Button, Card, Col, Divider, Popover, Row, Space, Spin, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'

import EditableTable from './EditableTable'
import { ExclamationCircleTwoTone, ExclamationOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons'
import { useAddTasksMutation } from '../../../../store/api/practiceApi/mypractice'

const Plan = ({id,dataOnePlace,dataTasks,setShowFinal}:any) => {
	const [dataSource, setDataSource] = useState<any>(dataTasks?.map((item:any)=>{
		const [startDateStr, endDateStr] = item?.period ?  item?.period?.split('/') : [null, null];
		const startDate = dayjs(startDateStr, 'DD.MM.YYYY');
		const endDate = dayjs(endDateStr, 'DD.MM.YYYY');
		return{
		  key:item.id,
		  name:item.description,
		  period: item?.period ? [startDate, endDate] : null,
		  number:item.number
		}
	}));
    const [isDisabled,setIsDisabled] = useState(true)
    const [show,setShow] = useState(false)
	const [sendTask,{data,isLoading,isSuccess} ] = useAddTasksMutation()
	const [file,setFile] = useState<any>(null)


	
	const handleSave = async ()=>{
	 setShow(true)
     setShowFinal(true)

	 const validData = dataSource.map((item:any)=>{
		const startDate = dayjs(item.period?.[0]).format('DD.MM.YYYY')
		const endDate = dayjs(item?.period[1]).format('DD.MM.YYYY')
		return {
			taskId:item.key,
			
			// period:item.period,
			period:startDate + '/' + endDate
		}
	 })

	 const obj = {
		 practiceId:id,
		 tasks:validData
	 }
	 await sendTask(obj)
	}

	const download = async ()=>{
		if(data){
			const link = document.createElement('a')
			link.href = data
			link.setAttribute('download', `${dataOnePlace==='На кафедре КФУ'? 'Индивидуальные задания' : 'Путевка'}.docx`)
			document.body.appendChild(link)
			link.click()
		}
	}

	useEffect(()=>{
		if(isSuccess){
			download()
		}
		
	},[isSuccess])

	return (
		<>
			<Spin style={{width:'50%'}} className='w-[50%]' spinning={isLoading} >
			<Row className='mt-6'>
				<Col>
					<Typography.Title level={2}>{dataOnePlace==='На кафедре КФУ'? 'Индивидуальные задания' : 'Путевка'}</Typography.Title>
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<EditableTable setShow={setShow} dataSource={dataSource} setDataSource={setDataSource} setIsDisabled={setIsDisabled}/>
				</Col>
			</Row>

			<Row gutter={[16, 16]} className="my-8">
				<Col xs={24} sm={24} md={18} lg={8} xl={6}>
					<Space className="w-full">
						<Popover content={isDisabled ? 'Заполните период выполнения практики' : null}><Button
                            disabled={isDisabled}
							className="!rounded-full text-[10px] sm:text-base"
							size="large"
                            onClick={handleSave}
						>
							<VerticalAlignBottomOutlined />	Сохранить и скачать {dataOnePlace==='На кафедре КФУ' ? <a>Индивидуальные задания</a> : <a>Путевку</a>}
						</Button></Popover>
					</Space>
				</Col>
			</Row>

          
		
			<Row gutter={16} className="mt-14 mb-10">
				{/* <Col xs={24} sm={24} md={6} >
					<Card title="Документы практики:" bordered={false}>
						<ul className="ml-6">
							<li><a onClick={download}>Отчет по практике и {dataOnePlace==='На кафедре КФУ' ? <a>Индивидуальные задания</a> : <a> Путевка</a>}</a></li>
						</ul>
					</Card>
				</Col> */}
				<Col xs={12} md={12} span={12}>
					<Card title={<div className='flex gap-3'><ExclamationCircleTwoTone />Обратите внимание</div>} bordered={false}>
					<ul className='pl-5 pr-5 '>
						
						{dataOnePlace==='На кафедре КФУ' ?<li className=''>Индивидуальные задания представляют собой план-график на практику студента. Перед началом практики руководитель по практике должен поставить подпись.</li>:
						<li className=''>Путевку практиканта необходимо распечатать с использованием двусторонней печати и отнести на подпись в Департамент Образования до начала практики — с подписанным документом можно начинать практику в организации</li>}
					</ul>
					</Card>
				</Col>
			</Row>  
			</Spin>
		</>
	)
}

export default Plan
