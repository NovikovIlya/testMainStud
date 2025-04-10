import { QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Divider, Form, Modal, Result, Row, Spin, Tooltip, Upload, message } from 'antd'
import { Descriptions } from 'antd'
import type { DescriptionsProps } from 'antd'
import { Select, Space } from 'antd'
import type { SelectProps } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Title from 'antd/es/typography/Title'
import { t } from 'i18next'
import React, { useEffect, useState } from 'react'

import {
	useGetAllNativeLanguagesQuery,
	useGetCertificateQuery,
	useGetLevelsQuery,
	useGetNativeLanguagesQuery,
	useGetforeignLanguagesQuery,
	useSetForeignMutation,
	useSetNativeMutation
} from '../../../store/api/aboutMe/forAboutMe'

import './Languages.css'
import { SkeletonPage } from './Skeleton'
import TableLanguages from './TableLanguages'
import UploadAvatar from './UploadAvatar'

const Languages = () => {
	const [form] = Form.useForm()
	const [form2] = Form.useForm()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectId, setSelectId] = useState(null)
	const [fileList, setFileList] = useState<any>([])
	const { data: dataNative, isLoading: isFetchingNative, refetch, isError } = useGetNativeLanguagesQuery()
	const { data: dataLevels } = useGetLevelsQuery()
	const { data: dataCertificate } = useGetCertificateQuery()
	const { data: dataAll } = useGetAllNativeLanguagesQuery()
	const { data: dataForeign, isLoading: isFetchingForeign, isError: isErrorForeign } = useGetforeignLanguagesQuery()
	const [setNative, { isLoading }] = useSetNativeMutation()
	const [setForeign, { isLoading: isLoadingSetForeign }] = useSetForeignMutation()
	const [selectedLabel, setSelectedLabel] = useState(null)
	const nativeLanguageForm = Form.useWatch('languages', form)
	const sertificateFormVal = Form.useWatch('certificateId', form2)

	useEffect(() => {
		console.log('dataNative updated:', dataNative)
		if (dataNative) {
			const initialValues = {
				languages: dataNative.languages?.map((lang: any) => lang.code) || []
			}
			form.setFieldsValue(initialValues)
		}
	}, [dataNative])

	// Добавление Родной язык
	const onFinish = () => {
		setNative({ languageCodes: nativeLanguageForm }).unwrap()
	}

	// Добавление Иностранный язык
	const onFinishForm2 = (values: any) => {
		const formData = new FormData()

		if (fileList.length > 0 && selectedLabel) {
			const originalFile = values.file[0].originFileObj
			const fileExtension = originalFile.name.split('.').pop() // Получаем расширение файла
			const newFileName = `${selectedLabel}.${fileExtension}`

			const modifiedFile = new File([originalFile], newFileName, {
				type: originalFile.type,
				lastModified: originalFile.lastModified
			})

			formData.append('certificate', modifiedFile)
		}

		delete values.file

		const jsonData = JSON.stringify(values)
		const blob = new Blob([jsonData], { type: 'application/json' })
		const reader = new FileReader()
		reader.onload = function () {
			console.log('Содержимое Blob:', reader.result)
		}
		reader.readAsText(blob)

		formData.append('language ', blob)

		setForeign(formData).unwrap()
		setIsModalOpen(false)
		form2.resetFields()
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
		form2.resetFields()
	}
	const beforeUpload = (file: File) => {
		const isImage = file.type === 'application/pdf'
		const isLt5M = file.size / 1024 / 1024 < 5

		if (!isImage) {
			message.error('Можно загружать только PDF!')
			return false
		}

		if (!isLt5M) {
			message.error('Файл должен быть меньше 5MB!')
			return false
		}

		setFileList([file])
		return false
	}
	if (isError || isErrorForeign) {
		return (
			<div className="mt-[75px] ml-[20px]">
				<Result
					status="error"
					title=""
					subTitle={t('errorFetch')}
					
				></Result>
			</div>
		)
	}

	if (isFetchingNative || isFetchingForeign)
		return (
			<div className="mt-[-10px] ml-[6px]">
				<SkeletonPage />
			</div>
		)

	return (
		<div className="px-[50px] pt-[60px] mb-[50px]">
			<div className=" rounded-xl  animate-fade-in">
				<Form form={form} onFinish={onFinish} className=" ">
					<Spin spinning={isLoading} className="flex gap-2">
						<Row className="mb-5">
							<Title level={2}>{t('langZnan')}</Title>
						</Row>
						<Row className="mb-0 mt-3 w-full">
							<Col span={24}>
								<div className="text-[16px] font-bold mb-2">{t('nativeLanguage')}</div>

								<div className="w-full h-auto">
									<Form.Item
										name="languages"
										className="mb-0 w-full !h-auto"
										rules={[
											{
												validator: (_, value) =>
													value?.length > 10 ? Promise.reject(new Error(t('maxLanguagesError'))) : Promise.resolve()
											}
										]}
									>
										<Select
											mode="multiple"
											allowClear
											className=" !h-auto w-full"
											options={dataAll?.map((item: any) => ({
												value: item.code,
												label: item.language
											}))}
											onChange={values => {
												if (values.length > 10) {
													message.error(t('maxLanguagesError'))
													form.setFieldsValue({
														languages: values.slice(0, 10)
													})
												}
											}}
										/>
									</Form.Item>
								</div>
							</Col>
						</Row>
						<Row>
							<Button className="mt-4 w-[100px]" type="primary" htmlType="submit">
								{t('save')}
							</Button>
						</Row>
					</Spin>
				</Form>
			</div>

			<div className=" rounded-xl  mt-16 animate-fade-in">
				<Spin spinning={isLoadingSetForeign}>
					<Row className="mb-3">
						<Title className="!mb-0" level={5}>
							{t('foreignLanguage')}
						</Title>
					</Row>
					<Row>
						<TableLanguages selectId={selectId} setSelectId={setSelectId} dataForeign={dataForeign} />
					</Row>
					<Row className="flex items-center justify-start mt-4 gap-2">
						<div
							onClick={showModal}
							className="gap-2 flex items-center cursor-pointer hover:animate-pulse transition delay-150 "
						>
							<Button className="rounded-[50%] !w-[28px] hover:animate-pulse transition delay-150 text-[28px] " type="primary">
								+
							</Button>
							<span>{t('add')}</span>
						</div>
					</Row>
				</Spin>

				<Modal
					className="!z-[10000000]"
					footer={null}
					title={t('langZnan')}
					open={isModalOpen}
					onOk={handleOk}
					onCancel={handleCancel}
				>
					<Form className="mt-4" form={form2} onFinish={onFinishForm2}>
						<Form.Item
							label={<div className="">{t('language')}</div>}
							name="languageCode"
							labelCol={{ span: 6 }}
							wrapperCol={{ span: 24 }}
							layout="vertical"
							className="mt-4 h-[35px]"
							rules={[{ required: true, message: '' }]}
						>
							<Select
								allowClear
								options={dataAll?.map((item: any) => ({
									value: item.code,
									label: item.language
								}))}
							/>
						</Form.Item>

						<Form.Item
							label={<div className="">{t('level')}</div>}
							name="languageLevelCode"
							labelCol={{ span: 12 }}
							wrapperCol={{ span: 24 }}
							layout="vertical"
							className="mt-14 h-[35px]"
							rules={[{ required: true, message: '' }]}
						>
							<Select
								aria-required
								options={dataLevels?.map((item: any) => ({
									value: item.languageLevelCode,
									label: item.languageLevel
								}))}
								allowClear
							/>
						</Form.Item>

						<Form.Item
							label={<div className="">{t('sert')}</div>}
							name="certificateId"
							labelCol={{ span: 12 }}
							wrapperCol={{ span: 24 }}
							layout="vertical"
							className="mt-14 h-[35px]"
							rules={[{ required: true, message: '' }]}
						>
							<Select
								onSelect={(value: any) => {
									const selectedOption = dataCertificate.find((item: any) => item.id === value)
									if (selectedOption) {
										setSelectedLabel(selectedOption.certificateName)
									}
								}}
								allowClear
								options={dataCertificate?.map((item: any) => ({
									value: item.id,
									label: item.certificateName
								}))}
							/>
						</Form.Item>

						<div className="mt-14 mb-2">{t('prikrep')}</div>
						<Form.Item name="file" getValueFromEvent={e => e?.fileList}>
							<Upload maxCount={1} beforeUpload={beforeUpload} accept=".pdf">
								<Button className=" " icon={<UploadOutlined />}>
									{t('add')}
								</Button>
							</Upload>
						</Form.Item>

						<Form.Item className="mt-6" name="isPublished" valuePropName="checked" label={null}>
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
