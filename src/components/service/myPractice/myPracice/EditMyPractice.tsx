import { Button, Card, Col, Collapse, Descriptions, Divider, Form, InputNumber, List, Row, Select, Space, Spin, Typography ,Upload,message} from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

import { ArrowLeftSvg } from '../../../../assets/svg'
import { DeleteRedSvg } from '../../../../assets/svg/DeleteRedSvg'

import { validateMessages } from '../../../../utils/validateMessage'


import type { UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons'
import Plan from './Plan'
import Diary from './Diary'


export const EditMyPractice = () => {
	const [form] = Form.useForm<any>()
	const path = useLocation()
	const id = path.pathname.split('/').at(-1)!
	const nav = useNavigate()
	const isLoadingSendForm = false

	const items: any = [
		{
			key: '1',
			label: 'Где будет проходить практика',
			children: 'Zhou Maomao'
		},
		{
			key: '2',
			label: 'Место прохождение практики',
			children: 'Казань'
		},
		{
			key: '3',
			label: 'Шифр',
			children: '12 Химия'
		},
		{
			key: '4',
			label: 'Профиль',
			children: 'empty'
		},
		{
			key: '5',
			label: 'Уровень образования',
			children: 'Бакалавриат'
		},
		{
			key: '6',
			label: 'Курс',
			children: '4'
		},
		{
			key: '7',
			label: 'Группа',
			children: '07-001'
		},
		{
			key: '8',
			label: 'Образовательное учреждение',
			children: 'Высшая школа ииф'
		},
		{
			key: '9',
			label: 'Тип практики',
			children: 'Учебная'
		},
		{
			key: '10',
			label: 'Вид практики',
			children: 'учебно-методическая'
		},
		{
			key: '11',
			label: 'Период практики',
			children: '11'
		},
		{
			key: '12',
			label: 'Учебный год',
			children: '2024'
		},
		{
			key: '13',
			label: 'ФИО руководителя практики',
			children: 'Новиков'
		},
		{
			key: '14',
			label: 'ФИО руководителя от организации',
			children: 'Иванов'
		},
		{
			key: '15',
			label: 'Юридический адресс',
			children: 'ул Оренбусий тракт, 138, Казань'
		}
	]

	const deleteCompetence = () => {}
	const { Panel } = Collapse

    const props: UploadProps = {
        name: 'file',
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
    };

	return (
		<Spin spinning={isLoadingSendForm}>
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
					<span className=" text-[28px] font-normal">Учебная практика на кафедре общей физики с .. по ..</span>
				</Space>
				<Row gutter={16} className="mt-14 mb-10">
					<Col span={6}>
						<Card title="Ваш пакет документов должен содержать:" bordered={false}>
							<ul className="ml-6">
								<li>Отчет по практике</li>
								<li>Путевка практиканта</li>
								<li>Дневник практиканта</li>
							</ul>
						</Card>
					</Col>
					<Col span={6}>
						<Card title="Обратите внимание" bordered={false}>
							Отчет должен заполняться самостоятельно.<br></br> В модуле “Практики студентов” формируется только
							титульный лист отчета.
						</Card>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<Collapse accordion>
							<Panel header="Основная информация" key="1">
								<Row>
									<Descriptions>
										{items.map((item: any) => (
											<Descriptions.Item span={3} label={item.label} key={item.key}>
												{item.children}
											</Descriptions.Item>
										))}
									</Descriptions>
								</Row>
							</Panel>
						</Collapse>
					</Col>
				</Row>

				<Form<any> validateMessages={validateMessages} form={form} layout={'vertical'}>
					<Row gutter={[16, 16]} className={'mt-4'}>
						<Col xs={24} sm={24} md={18} lg={16} xl={12}>
							<List
								header={<div>Код и наименование компетенции:</div>}
								style={{
									overflow: 'auto',
									maxHeight: 300
								}}
								bordered
								// @ts-ignore
								dataSource={[]}
								renderItem={(item: any, index: number) => (
									<List.Item
										style={{
											display: 'flex'
										}}
										// @ts-ignore
										actions={[
											<div onClick={() => deleteCompetence(item)} className="cursor-pointer">
												<DeleteRedSvg />
											</div>
										]}
									>
										<div className="flex items-center">
											<div className=" p-3">{index + 1}</div>
											<div className="ml-2">{item.value}</div>
										</div>
									</List.Item>
								)}
							/>
						</Col>
					</Row>

                   <Plan/>
                    
                   <Diary/>
                    

                    <Row>
                        <Col span={12}>
                        <Divider/>
                        </Col>
                    </Row>
                    <Row gutter={16} className="mt-14 mb-10">
						<Col span={6}>
							<Card title="Пакет отчетных документов:" bordered={false}>
								<ul className="ml-6">
									<li>Готовый отчет</li>
                                    <li>Дневник</li>
                                    <li>Путевка</li>
								</ul>
                                <div className='mt-8'>
                                    <Upload  {...props}>
                                        <Button type='primary' icon={<UploadOutlined />}>Добавить файл</Button>
                                    </Upload>
                                </div>
							</Card>
						</Col>
						<Col span={6}>
							<Card title="Обратите внимание" bordered={false}>
                                   <li>После отправки документов дождитесь появления комментариев от руководителя практики</li>
                                    <li>Если документы оформлены верно, вы увидите комментарий “Принято</li>
                                    <li>Если есть ошибки, преподаватель укажет в комментарии, что следует исправить</li>
							</Card>
						</Col>
					</Row>
                    <Row gutter={[16, 16]} className="my-8">
						<Col xs={24} sm={24} md={18} lg={8} xl={6}>
							<Space className="w-full">
								<Button
									className="!rounded-full"
									size="large"
                                    type='primary'
								>
									Отправить документы на проверку
								</Button>
							</Space>
						</Col>
					</Row>
				</Form>
			</section>
		</Spin>
	)
}
