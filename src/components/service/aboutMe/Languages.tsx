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

import { useGetAllNativeLanguagesQuery, useGetNativeLanguagesQuery, useGetforeignLanguagesQuery, useSetNativeMutation } from '../../../store/api/aboutMe/forAboutMe'

import { SkeletonPage } from './Skeleton'
import TableLanguages from './TableLanguages'
import UploadAvatar from './UploadAvatar'

const Languages = () => {
	const [form] = Form.useForm()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectId, setSelectId] = useState(null)
	const { data: dataNative, isFetching: isFetchingNative } = useGetNativeLanguagesQuery()
	const {data:dataAll} = useGetAllNativeLanguagesQuery()
	const { data: dataForeign } = useGetforeignLanguagesQuery()
	const [setNative,{}] = useSetNativeMutation()
	const nativeLanguageForm = Form.useWatch('languages', form)
	console.log('selectId', selectId)

	useEffect(() => {
		form.setFieldsValue({ languages: dataNative }) // Устанавливает '123' как выбранный
	}, [])

	const onFinish = () => {
		// values содержит { checkboxes: [...] }
		console.log('dataNative',dataNative)
		console.log('nativeLanguageForm',nativeLanguageForm)
		setNative(
			{languageCodes:nativeLanguageForm}
		)
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
			<div className=" rounded-xl  animate-fade-in">
				<Spin spinning={false}>
					<Row className='mb-4 mt-3'>
						<Col span={24}>
							<Form form={form} onFinish={onFinish}>	
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
										options={dataAll?.map((item:any) => ({
											value: item.code,
											label: item.language,
										}))}
									/>
								</Form.Item>

								<Button  className="mt-4" type="primary" htmlType="submit">
									{t('save')}
								</Button>
							</Form>
						</Col>
					</Row>
				</Spin>
			</div>

			<div className=" rounded-xl  mt-16 animate-fade-in">
				<Spin spinning={false}>
					<Row className="mb-3">
						<Title className="!mb-0" level={5}>
							{t('foreignLanguage')}
						</Title>
					</Row>
					<Row>
						<TableLanguages selectId={selectId} setSelectId={setSelectId} dataForeign={dataForeign} />
					</Row>
					<Row className="flex items-center justify-start mt-4 gap-2">
						<div onClick={showModal} className='gap-2 flex items-center cursor-pointer hover:animate-pulse transition delay-150 '>
						<Button className='rounded-[50%] !w-[28px] hover:animate-spin transition delay-150 '  type="primary" >
							+ 
						</Button>
						<span>{t('add')}</span>
						</div>
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
