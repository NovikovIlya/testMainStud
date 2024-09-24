import { Button, Card, Col, Divider, Popover, Row, Space, Spin, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'

import EditableTableTwo from './EditableTableTwo'
import { useAddDiaryMutation } from '../../../../store/api/practiceApi/mypractice'
import { useAppDispatch } from '../../../../store'
import { showNotification } from '../../../../store/reducers/notificationSlice'
import { VerticalAlignBottomOutlined } from '@ant-design/icons'

const Diary = ({id,dataDiary,setShowFinalTwo}:any) => {
	
	const [sendDiary,{data,isLoading,isSuccess}] = useAddDiaryMutation()
	const [dataSource, setDataSource] = useState<any>(dataDiary?.map((item:any)=>{
		const [startDateStr, endDateStr] = item?.period ?  item?.period?.split('/') : [null, null];
		const startDate = dayjs(startDateStr, 'DD.MM.YYYY');
		const endDate = dayjs(endDateStr, 'DD.MM.YYYY');
		return{
			key: item.id,
			description: item.description,
			period: item?.period ? [startDate, endDate] : null,
			number: item.number
		}
	}));
	const [isDisabled, setIsDisabled] = useState(true)
	const [show, setShow] = useState(false)
	const dispatch = useAppDispatch()

	const handleSave = async ()=>{
		setShow(true)
		setShowFinalTwo(true)

		
		const obj = {
			practiceId:id,
			lines: dataSource?.map((item:any)=>{
				const startDate = dayjs(item.period?.[0]).format('DD.MM.YYYY')
				const endDate = dayjs(item?.period[1]).format('DD.MM.YYYY')
					return{
						period:startDate+'/'+endDate,
						description:item.description,
						number:item.number
					}
			})
		}

		
		await sendDiary(obj).unwrap()
	}

	const download = async ()=>{
		const link = document.createElement('a')
		link.href = data
		link.setAttribute('download', `Дневник.docx`)
		document.body.appendChild(link)
		link.click()
	}

	useEffect(()=>{
		if(isSuccess){
			download()
		}
		
	},[isSuccess])

	return (
		<>
		<Spin style={{width:'50%'}} className='w-[50%]' spinning={isLoading} >
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
					<EditableTableTwo setShow={setShow} dataSource={dataSource} setDataSource={setDataSource} setIsDisabled={setIsDisabled}/>
				</Col>
			</Row>

			<Row gutter={[16, 16]} className="my-8">
				<Col xs={24} sm={24} md={24} lg={24} xl={24}>
					<Space className="w-full">
					<Popover content={isDisabled ? 'Заполните содержание выполненной работы и период выполнения дневника практиканта, после нажмите сохранить' : null}><Button
							className="!rounded-full text-[10px] sm:text-base"
							size="large"
                            disabled={isDisabled}
                            onClick={handleSave}
							
						>
							<VerticalAlignBottomOutlined />	Сохранить и скачать дневник
						</Button></Popover>
					</Space>
				</Col>
			</Row>
            {show ?
			
			<Row gutter={16} className="mt-14 mb-10">
				{/* <Col span={6}>
					<Card title="Документы практики:" bordered={false}>
						<ul className="ml-6">
							<li><a onClick={download}>Дневник практиканта</a></li>
						</ul>
					</Card>
				</Col> */}
				{/* <Col span={6}>
					<Card title="Обратите внимание" bordered={false}>
						Скачайте и проверьте документ
					</Card>
				</Col> */}
			</Row>:''}
			</Spin>
		</>
	)
}

export default Diary
