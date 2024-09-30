import { ExclamationCircleTwoTone, LoadingOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons'
import { Button, Card, Col, Collapse, Descriptions, Divider, Form, List, Popover, Row, Skeleton, Space, Spin, Tabs, Tooltip, Typography } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { ArrowLeftSvg } from '../../../../assets/svg'
import {  useAddReportQuery, useGetOneMyPracticesQuery } from '../../../../store/api/practiceApi/mypractice'
import { validateMessages } from '../../../../utils/validateMessage'

import Diary from './Diary'
import Final from './Final'
import Plan from './Plan'

export const EditMyPractice = () => {
	const [form] = Form.useForm<any>()
	const path = useLocation()
	const id = path.pathname.split('/').at(-1)!
	const nav = useNavigate()
	const [showFinal, setShowFinal] = useState(false)
	const [showFinalTwo, setShowFinalTwo] = useState(false)
	const { data: dataOne, isFetching, isSuccess,refetch } = useGetOneMyPracticesQuery(id)
	const {data,isLoading,isSuccess:isSuccessReport}  = useAddReportQuery(id,{skip:!id})

	
	const formatedDate = () => {
		if (isSuccess) {
			const [start, end] = dataOne?.practicePeriod?.split('-')
			const formattedStart = dayjs(start).format('DD.MM.YYYY')
			const formattedEnd = dayjs(end).format('DD.MM.YYYY')
			return [formattedStart, formattedEnd]
		}
		return []
	}

	const items: any = [
		{
			key: '1',
			label: 'Где будет проходить практика',
			children: dataOne?.place ? dataOne.place : 'Не указано'
		},
		{
			key: '2',
			label: 'Место прохождение практики',
			children: dataOne?.profilePlace ? dataOne.profilePlace : 'Не указано',
			className: dataOne?.profilePlace ? '' : 'hide'
		},
		{
			key: '3',
			label: 'Шифр',
			children: dataOne?.specialty ? dataOne.specialty : 'Не указано'
		},
		{
			key: '4',
			label: 'Профиль',
			children: dataOne?.profile ? dataOne.profile : 'Не указано'
		},
		{
			key: '5',
			label: 'Уровень образования',
			children: dataOne?.educationLevel ? dataOne.educationLevel : 'Не указано'
		},
		{
			key: '6',
			label: 'Курс',
			children: dataOne?.course ? dataOne.course : 'Не указано'
		},
		{
			key: '7',
			label: 'Группа',
			children: dataOne?.group ? dataOne.group : 'Не указано'
		},

		{
			key: '9',
			label: 'Тип практики',
			children: dataOne?.practiceType ? dataOne.practiceType : 'Не указано'
		},
		{
			key: '10',
			label: 'Вид практики',
			children: dataOne?.practiceKind ? dataOne.practiceKind : 'Не указано'
		},
		{
			key: '11',
			label: 'Период практики',
			children: dataOne?.practicePeriod ? `${formatedDate()[0]} - ${formatedDate()[1]}` : 'Не указано'
		},
		{
			key: '12',
			label: 'Учебный год',
			children: dataOne?.academicYear ? dataOne.academicYear : 'Не указано'
		},
		{
			key: '13',
			label: 'ФИО руководителя практики',
			children: dataOne?.departmentDirector ? dataOne.departmentDirector : 'Не указано'
		},
		{
			key: '14',
			label: 'ФИО руководителя от организации',
			children: dataOne?.contractDepartmentDirector ? dataOne.contractDepartmentDirector : 'Не указано'
		},
		{
			key: '15',
			label: 'Юридический адресс',
			children: dataOne?.contractAddress ? dataOne.contractAddress : 'Не указано'
		}
	]

	const onChange = (key: string) => {
		console.log(key)
	}

	const download = async ()=>{
		if(data){
			const link = document.createElement('a')
			link.href = data
			link.setAttribute('download', `Отчет.docx`)
			document.body.appendChild(link)
			link.click()
		}
	}

	const handleSave = ()=>{
		download()
	}
	

	

	return (
		<Spin spinning={isFetching}>
		<section className="container animate-fade-in">
			<Space size={10} align="center">
				<Button
					size="large"
					className="mt-1 mr-6 rounded-full border border-black"
					icon={<ArrowLeftSvg className="w-4 h-4 cursor-pointer mt-1" />}
					type="text"
					onClick={() => {
						nav('/services/mypractices/')
					}}
				/>
				<span className="text-[10px] lg:text-[28px] font-normal">
					{isFetching ? <><Skeleton.Input style={{width:'300px'}}  active   /></> : <>Учебная практика по специальности "{dataOne?.specialty}" с {formatedDate()[0]} по {formatedDate()[1]}{' '}</>}
				</span>
			</Space>
			<Tabs defaultActiveKey="1" onChange={onChange} className="mt-6">
				<Tabs.TabPane tab={'Основная информация'} key={1}>
						<>
							<Row className="mb-4 mt-4">
								<Col xs={24} sm={12} span={12} className="pr-[8px] ">
									<Card title="Оценка:" bordered={false} className="mb-4">
										<Row>
											<Descriptions.Item className="block sm:flex" span={3} label={'1'} key={'1'}>
												<div className="">{dataOne?.grade ? dataOne.grade : 'Нет оценки'}</div>
											</Descriptions.Item>
										</Row>
									</Card>
									<Card title="Основные сведения:" bordered={false}>
										<Row>
											<Descriptions className="">
												{items.map((item: any) => (
													<Descriptions.Item className="" span={3} label={item.label} key={item.key}>
														<div className="">{item.children}</div>
													</Descriptions.Item>
												))}
											</Descriptions>
										</Row>
									</Card>
								</Col>
							</Row>
						</>
				</Tabs.TabPane>
				<Tabs.TabPane tab={'Заполнение документов'} key={2}>
					<Form<any> validateMessages={validateMessages} form={form} layout={'vertical'} className="mb-8">
						<Spin style={{width:'50%',display:'flex',flexWrap:'wrap'}} className='w-[50%] flex !flex-wrap' spinning={isLoading} >
						<Row className='mt-6'>
							<Col>
								<Typography.Title level={2}>Отчет</Typography.Title>
							</Col>
						</Row>
						<Row gutter={[16, 16]} className={'mt-4'}>
							<Col xs={24} sm={24} md={18} lg={16} xl={12}>
								<List
									header={<div>Код и наименование компетенции:</div>}
									style={{
										overflow: 'auto',
										maxHeight: 300
									}}
									bordered
									dataSource={dataOne?.competences}
									renderItem={(item: any, index: number) => (
										<List.Item
											style={{
												display: 'flex'
											}}
										>
											<div className="flex items-center">
												<div className=" p-3">{index + 1}</div>
												<div className="ml-2">{item}</div>
											</div>
										</List.Item>
									)}
								/>
								<Row className='mt-4'>
									<Col xs={24} md={24} span={24}>
										<Card title={<div className='flex gap-3'><ExclamationCircleTwoTone />Обратите внимание</div>} bordered={false}>
										<ul className='pl-5 pr-5 '>
											<li className='mb-3'>Отчет должен заполняться самостоятельно.В модуле “Практики студентов” формируется только титульный лист отчета.</li>
											
										</ul>
										</Card>
									</Col>
								</Row>
								<Row gutter={[16, 16]} className="my-8">
									<Col xs={24} sm={24} md={18} lg={8} xl={6}>
										<Space className="w-full">
											<Button
												className="!rounded-full text-[10px] sm:text-base"
												size="large"
												onClick={handleSave}
											>
												<VerticalAlignBottomOutlined />	Скачать отчет
											</Button>
										</Space>
									</Col>
								</Row>
								<Divider />
							</Col>
						</Row>
						</Spin>
					</Form>
					

					<Plan id={id} dataTasks={dataOne?.tasks} setShowFinal={setShowFinal} dataOnePlace={dataOne?.place} />
					<Diary id={id} dataDiary={dataOne?.diary} setShowFinalTwo={setShowFinalTwo} />
				</Tabs.TabPane>
				<Tabs.TabPane
					tab={<Popover content={!showFinal || !showFinalTwo ? null : null}>Отправка документов</Popover>}
					key={3}
				>
					<Row gutter={16} className="mt-14 mb-10">
						<Col sm={24} md={12} lg={12}>
							<Card
								title={
									<div className="flex gap-3">
										<ExclamationCircleTwoTone />
										Обратите внимание:
									</div>
								}
								bordered={false}
							>
								<div className="mb-3">Ваш пакет документов должен содержать:</div>
								<ul className="ml-6">
									<li>Отчет по практике</li>
									{dataOne?.place === 'На кафедре КФУ' ? <li>Индивидуальные задания</li> : <li>Путевка</li>}
									<li>Дневник практиканта (по требованию кафедры)</li>
								</ul>
							</Card>
						</Col>
					</Row>
					<Final dataOneLength={dataOne?.chat?.length} isSuccessFull={isSuccess} refetch={refetch} id={id} dataOnePlace={dataOne?.place} chat={dataOne?.chat}/>
				</Tabs.TabPane>
			</Tabs>
		</section>
		</Spin>
	)
}
