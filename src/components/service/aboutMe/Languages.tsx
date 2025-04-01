import { QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Divider, Form, Modal, Row, Tooltip, Upload } from 'antd'
import { Descriptions } from 'antd'
import type { DescriptionsProps } from 'antd'
import { Select, Space } from 'antd'
import type { SelectProps } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Title from 'antd/es/typography/Title'
import React, { useEffect, useState } from 'react'

import TableLanguages from './TableLanguages'
import UploadAvatar from './UploadAvatar'
import { useGetforeignLanguagesQuery, useGetNativeLanguagesQuery } from '../../../store/api/aboutMe/forAboutMe'


const Languages = () => {
	const [form] = Form.useForm()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const {data:dataNative} = useGetNativeLanguagesQuery()
	const {data:dataForeign} = useGetforeignLanguagesQuery()
	const nativeLanguageForm = Form.useWatch('languages', form)
	console.log('nativeLanguageForm',nativeLanguageForm)
	

	const onFinish = (values: any) => {
		// values содержит { checkboxes: [...] }
		console.log('Отправка:', values)
	}

	const handleSubmit = (values: { content: string }) => {}
	const showModal = () => {
		setIsModalOpen(true)
	}

	const handleOk = () => {
		setIsModalOpen(false)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}

	return (
		<div className="px-[50px] pt-[60px] mb-[50px]">
			<div className="bg-white rounded-xl shadow-md p-[24px]">
				<Row>
					<Col span={24}>
						<Form form={form}>
							<Form.Item
								label={<div className="text-[16px] font-bold">Родной язык</div>} // Лейбл сверху
								name="languages" // Ключ для данных формы
								labelCol={{ span: 6 }}
								wrapperCol={{ span: 12 }}
								layout="vertical"
							>
								<Select
									loading={false}
								    showSearch
									optionFilterProp="label"
									mode="multiple"
									allowClear
									placeholder="Добавить язык"
									options={
										dataNative ? 
										dataNative?.languages?.map((item:any)=>{
											return {
												label:item.language,
												value:item.code

											}
										})
										: []
									}
								/>
							</Form.Item>

							<Button className='mt-4' type="primary" htmlType="submit">Сохранить</Button>
						</Form>
					</Col>
				</Row>
			</div>

			<div className="bg-white rounded-xl shadow-md mt-4 p-[24px]">
				<Row className="mb-3">
					<Title className="!mb-0" level={5}>
						Иностранные языки
					</Title>
				</Row>
				<Row>
					<TableLanguages dataForeign={dataForeign}/>
				</Row>
				<Row className="flex justify-center mt-4">
					<Button onClick={showModal} type="primary" style={{ marginBottom: 16 }}>
						Добавить язык
					</Button>
				</Row>

				<Modal className='' footer={null} title="Знание языков" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
					<Form  className='mt-4'>
						<Form.Item
								label={<div className="">Язык</div>} 
								name="languagesForm" 
								labelCol={{ span: 6 }}
								wrapperCol={{ span: 24 }}
								layout="vertical"
								className='mt-4'
							>
								<Select
									mode="multiple"
									allowClear
									placeholder="Добавить язык"
									options={[
										{ value: 'en', label: 'English' },
										{ value: 'es', label: 'Spanish' }
									]}
								/>
							</Form.Item>


							<Form.Item
								label={<div className="">Уровень владения</div>} 
								name="levelForm" 
								labelCol={{ span: 12 }}
								wrapperCol={{ span: 24 }}
								layout="vertical"
								className='mt-14'
							>
								<Select
									mode="multiple"
									allowClear
									placeholder="Добавить язык"
									options={[
										{ value: 'en', label: 'English' },
										{ value: 'es', label: 'Spanish' }
									]}
								/>
							</Form.Item>


							<Form.Item
								label={<div className="">Языковые сертификаты</div>} 
								name="sertificateForm" 
								labelCol={{ span: 12 }}
								wrapperCol={{ span: 24 }}
								layout="vertical"
								className='mt-14'
							>
								<Select
									mode="multiple"
									allowClear
									placeholder="Добавить язык"
									options={[
										{ value: 'en', label: 'English' },
										{ value: 'es', label: 'Spanish' }
									]}
								/>
							</Form.Item>


							<div className='mt-14 mb-2'>Прикрепить сертификат</div>
							<Upload className=''  maxCount={1}  >
               					 <Button className=' ' icon={<UploadOutlined />}>Добавить файл</Button>
             				</Upload>

							 <Form.Item className='mt-6' name="sogl" valuePropName="checked" label={null}>
							   <Checkbox>Даю разрешение публиковать на портале КФУ</Checkbox>
							 </Form.Item>
							

							<Button type='primary' htmlType='submit'>Добавить</Button>
					</Form>
				</Modal>
			</div>
		</div>
	)
}

export default Languages
