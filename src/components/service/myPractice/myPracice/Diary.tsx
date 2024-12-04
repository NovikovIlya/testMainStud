import { Button, Col, Divider, Popover, Row, Space, Spin, Typography } from 'antd'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

import EditableTableTwo from './EditableTableTwo'
import { useAddDiaryMutation } from '../../../../store/api/practiceApi/mypractice'
import { VerticalAlignBottomOutlined } from '@ant-design/icons'
import './myPracticeStyle.scss'

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
	

	useEffect(()=>{
		if(isSuccess){
			download()
		}
	},[isSuccess])

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



	return (
		<>
		<Spin style={{width:'50%'}} className='w-full sm:w-[50%] flex flex-wrap' spinning={isLoading} >
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
			<Row className=''>
				<Col  xs={24} sm={24} md={24} >
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
			</Spin>
		</>
	)
}

export default Diary
