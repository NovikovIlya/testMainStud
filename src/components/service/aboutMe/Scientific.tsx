import { UploadOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Form, Input, Modal, Radio, Result, Row, Spin, Upload, message } from 'antd'
import { Select } from 'antd'
import Title from 'antd/es/typography/Title'
import { t } from 'i18next'
import { useEffect, useState } from 'react'

import { Certificate, ForeignLanguage, Language, LanguageLevel } from '../../../models/aboutMe'
import {
	useGetAllForeignLanguagesQuery,
	useGetAllNativeLanguagesQuery,
	useGetCertificateQuery,
	useGetLevelsQuery,
	useGetNativeLanguagesQuery,
	useGetOneCertificateQuery,
	useGetforeignLanguagesQuery,
	useLazyGetOneCertificateQuery,
	useSetForeignMutation,
	useSetNativeMutation
} from '../../../store/api/aboutMe/forAboutMe'

import './Languages.css'
import { SkeletonPage } from './Skeleton'
import TableLanguages from './TableLanguages'
import TableScintific from './TableScintific'

const Scientific = () => {
	const [form] = Form.useForm()
	const [form2] = Form.useForm()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectId, setSelectId] = useState<string | number | null>(null)
	const [fileList, setFileList] = useState<File[]>([])
	const { data: dataNative, isLoading: isFetchingNative, refetch, isError } = useGetNativeLanguagesQuery()
	const { data: dataLevels } = useGetLevelsQuery()
	const { data: dataCertificate } = useGetCertificateQuery()
	const { data: dataAll } = useGetAllNativeLanguagesQuery()
	const { data: dataAllForeignLang } = useGetAllForeignLanguagesQuery()
	const {
		data: dataForeign,
		isLoading: isFetchingForeign,
		isError: isErrorForeign,
		isSuccess
	} = useGetforeignLanguagesQuery()
	const [setNative, { isLoading }] = useSetNativeMutation()
	const [setForeign, { isLoading: isLoadingSetForeign }] = useSetForeignMutation()
	const [idCert, setIdCert] = useState<null | number>(null)
	const { data: dataOneCertificate } = useGetOneCertificateQuery(idCert, { skip: !idCert })
	const [selectedLabel, setSelectedLabel] = useState<string | null>(null)
	const [triger, {}] = useLazyGetOneCertificateQuery()
	const nativeLanguageForm = Form.useWatch('languages', form)
	const sertificateFormVal = Form.useWatch('certificateId', form2)

	useEffect(() => {
		if (dataNative) {
			const initialValues = {
				languages: dataNative.languages?.map((lang: Language) => lang.code) || []
			}
			form.setFieldsValue(initialValues)
		}
	}, [dataNative])

	// Добавление Родного языка
	const onFinish = () => {
		setNative({ languageCodes: nativeLanguageForm }).unwrap()
	}

	// Добавление Иностранного языка!!
	const onFinishForm2 = async (values: any) => {
		// Подготовка базовой структуры данных
		console.log('values', values)
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
	

	const handleIdCert = (id: number) => {
		setIdCert(id)
	}

	return (
		<div className="px-[50px] pt-[60px] mb-[50px]">
			<div className=" rounded-xl   animate-fade-in">
				<Spin spinning={false}>
					<Title className="!text-[28px]">{t('scient')}</Title>

					<Row>
						<TableScintific
							triger={triger}
							handleIdCert={handleIdCert}
							isSuccess={isSuccess}
							dataCertificate={dataCertificate}
							dataLevels={dataLevels}
							dataAll={dataAllForeignLang}
							selectId={selectId}
							setSelectId={setSelectId}
							dataForeign={dataForeign}
						/>
					</Row>
					<Row className="flex items-center justify-start mt-4 gap-2">
						<div
							onClick={showModal}
							className="gap-2 flex items-center cursor-pointer  hover:bg-gray-200 p-2 rounded-xl"
						>
							<Button size="small" className="rounded-[50%] !w-[28px] !h-[28px] text-[24px] " type="primary">
								+
							</Button>
							<span>{t('add')}</span>
						</div>
					</Row>
				</Spin>
				{isLoadingSetForeign ? (
					''
				) : (
					<Modal
						className="!z-[10000000]"
						footer={null}
						title={t('scient')}
						open={isModalOpen}
						onOk={handleOk}
						onCancel={handleCancel}
					>
						<Form className="mt-4" form={form2} onFinish={onFinishForm2} initialValues={{ languageCode: 1 }}>
							<Form.Item
								label={<div className="">{t('language')}</div>}
								name="languageCode"
								labelCol={{ span: 6 }}
								wrapperCol={{ span: 24 }}
								layout="vertical"
								className="mt-4 h-[35px]"
								rules={[{ required: true, message: '' }]}
							>
								<Radio.Group
									options={[
										{ value: 1, label: t('rus') },
										{ value: 2, label: t('eng') }
									]}
								/>
							</Form.Item>

							<Form.Item
								label={<div className="">{t('Year')}</div>}
								name="languageLevelCode"
								labelCol={{ span: 12 }}
								wrapperCol={{ span: 24 }}
								layout="vertical"
								className="mt-14"
								// rules={[{ required: true, message: '' }]}
							>
								<Select
									placeholder={t('select')}
									aria-required
									options={dataLevels?.map((item: LanguageLevel) => ({
										value: item.languageLevelCode,
										label: item.languageLevel
									}))}
									allowClear
								/>
							</Form.Item>

							<div className="mt-12 mb-1">{t('theme')}</div>
							<Form.Item name="theme" className=" mb-6" rules={[{ required: true, message: '' }]}>
								<Input.TextArea rows={4} placeholder="Введите текст здесь" />
							</Form.Item>

							<div className="mb-1">{t('direction')}</div>
							<Form.Item name="direction" className=" h-[35px]" rules={[{ required: true, message: '' }]}>
								<Input.TextArea rows={4} placeholder="Введите текст здесь" />
							</Form.Item>

							<Form.Item
								label={<div className="">{t('naych')}</div>}
								name="naych"
								labelCol={{ span: 12 }}
								wrapperCol={{ span: 24 }}
								layout="vertical"
								className="mt-20"
								// rules={[{ required: true, message: '' }]}
							>
								<Select
									placeholder={t('select')}
									aria-required
									options={dataLevels?.map((item: LanguageLevel) => ({
										value: item.languageLevelCode,
										label: item.languageLevel
									}))}
									allowClear
								/>
							</Form.Item>

							<Form.Item className="" name="isPublished" valuePropName="checked" label={null}>
								<Checkbox className="mt-12">{t('razrer')}</Checkbox>
							</Form.Item>

							<Button type="primary" htmlType="submit">
								{t('add')}
							</Button>
						</Form>
					</Modal>
				)}
			</div>
		</div>
	)
}

export default Scientific
