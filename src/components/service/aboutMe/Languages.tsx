import { QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Divider, Form, Modal, Row, Spin, Tooltip, Upload } from 'antd'
import { Descriptions } from 'antd'
import type { DescriptionsProps } from 'antd'
import { Select, Space } from 'antd'
import type { SelectProps } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Title from 'antd/es/typography/Title'
import { t } from 'i18next'
import React, { useEffect, useState } from 'react'

import { useGetNativeLanguagesQuery, useGetforeignLanguagesQuery } from '../../../store/api/aboutMe/forAboutMe'

import { SkeletonPage } from './Skeleton'
import TableLanguages from './TableLanguages'
import UploadAvatar from './UploadAvatar'

const Languages = () => {
	const [form] = Form.useForm()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectId, setSelectId] = useState(null)
	const { data: dataNative, isFetching: isFetchingNative } = useGetNativeLanguagesQuery()
	const { data: dataForeign } = useGetforeignLanguagesQuery()
	const nativeLanguageForm = Form.useWatch('languages', form)
	console.log('selectId', selectId)

	useEffect(() => {
		form.setFieldsValue({ languages: [{ value: '123', label: '123' }] }) // Устанавливает '123' как выбранный
	}, [])

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

	if (isFetchingNative)
		return (
			<div className="mt-[-10px] ml-[6px]">
				<SkeletonPage />
			</div>
		)

	return (
		<div className="px-[50px] pt-[60px] mb-[50px]">
			<div className="bg-white rounded-xl shadow-md p-[24px]">
				<Spin spinning={false}>
					<Row>
						<Col span={24}>
							<Form form={form}>
								<Form.Item
									label={<div className="text-[16px] font-bold">{t('nativeLanguage')}</div>} // Лейбл сверху
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
										options={[
											{ value: '123', label: '123' },
											{ value: '321', label: '321' }
										]}
									/>
								</Form.Item>

								<Button className="mt-4" type="primary" htmlType="submit">
									{t('save')}
								</Button>
							</Form>
						</Col>
					</Row>
				</Spin>
			</div>

			<div className="bg-white rounded-xl shadow-md mt-4 p-[24px]">
				<Spin spinning={false}>
					<Row className="mb-3">
						<Title className="!mb-0" level={5}>
							{t('foreignLanguage')}
						</Title>
					</Row>
					<Row>
						<TableLanguages setSelectId={setSelectId} dataForeign={dataForeign} />
					</Row>
					<Row className="flex justify-center mt-4">
						<Button onClick={showModal} type="primary" style={{ marginBottom: 16 }}>
							{t('add')}
						</Button>
					</Row>
				</Spin>

				<Modal
					className=""
					footer={null}
					title={t('langZnan')}
					open={isModalOpen}
					onOk={handleOk}
					onCancel={handleCancel}
				>
					<Form className="mt-4">
						<Form.Item
							label={<div className="">{t('language')}</div>}
							name="languagesForm"
							labelCol={{ span: 6 }}
							wrapperCol={{ span: 24 }}
							layout="vertical"
							className="mt-4"
						>
							<Select
								mode="multiple"
								allowClear
								options={[
									{ value: 'en', label: 'English' },
									{ value: 'es', label: 'Spanish' }
								]}
							/>
						</Form.Item>

						<Form.Item
							label={<div className="">{t('level')}</div>}
							name="levelForm"
							labelCol={{ span: 12 }}
							wrapperCol={{ span: 24 }}
							layout="vertical"
							className="mt-14"
						>
							<Select
								mode="multiple"
								allowClear
								options={[
									{ value: 'en', label: 'English' },
									{ value: 'es', label: 'Spanish' }
								]}
							/>
						</Form.Item>

						<Form.Item
							label={<div className="">{t('sert')}</div>}
							name="sertificateForm"
							labelCol={{ span: 12 }}
							wrapperCol={{ span: 24 }}
							layout="vertical"
							className="mt-14"
						>
							<Select
								mode="multiple"
								allowClear
								options={[
									{ value: 'en', label: 'English' },
									{ value: 'es', label: 'Spanish' }
								]}
							/>
						</Form.Item>

						<div className="mt-14 mb-2">{t('prikrep')}</div>
						<Upload className="" maxCount={1}>
							<Button className=" " icon={<UploadOutlined />}>
								{t('add')}
							</Button>
						</Upload>

						<Form.Item className="mt-6" name="sogl" valuePropName="checked" label={null}>
							<Checkbox>{t('razrer')}</Checkbox>
						</Form.Item>

						<Button type="primary" htmlType="submit">
							{t('add')}
						</Button>
					</Form>
				</Modal>
			</div>
		</div>
	)
}

export default Languages
