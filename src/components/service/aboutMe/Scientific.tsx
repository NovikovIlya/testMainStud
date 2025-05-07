import { AutoComplete, Button, Checkbox, Form, Input, Modal, Radio, Row, Spin } from 'antd'
import { Select } from 'antd'
import Title from 'antd/es/typography/Title'
import { t } from 'i18next'
import { useState } from 'react'

import { LanguageLevel } from '../../../models/aboutMe'
import {
	useGetAllForScientificQuery,
	useGetAllForeignLanguagesQuery,
	useGetCertificateQuery,
	useGetLevelsQuery,
	useGetScientificDirectorsQuery,
	useGetforeignLanguagesQuery,
	useSetForeignMutation
} from '../../../store/api/aboutMe/forAboutMe'
import { generateYearsArray } from '../../../utils/generateYearsArray'

import './Languages.css'
import TableScintific from './TableScintific'
import { useDebounce } from 'ahooks'

const Scientific = () => {
	const [form2] = Form.useForm()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectId, setSelectId] = useState<string | number | null>(null)
	const { data: dataLevels } = useGetLevelsQuery()
	const { data: dataCertificate } = useGetCertificateQuery()
	const {data: dataScientific,isLoading: isFetchingForeign,isError: isErrorForeign,isSuccess} = useGetAllForScientificQuery()

	const [setForeign, { isLoading: isLoadingSetForeign }] = useSetForeignMutation()
	const naych = Form.useWatch('naych', form2)
	const debouncedNameStudent = useDebounce(naych, { wait: 1000 })
	const {data:dataScientificDirectors}= useGetScientificDirectorsQuery(debouncedNameStudent)
	console.log('dataScientificDirectors',dataScientificDirectors)
    console.log('naych',naych)
	const onFinishForm2 = async (values: any) => {
		// Подготовка базовой структуры данных
		console.log('values', values)
	}

	const handleSearch = (value: string, field: string) => {
		console.log('value', value)
		if (value?.length < 4) {
			form2.setFields([
				{
					name: field,
					errors: ['Введите минимум 4 символа']
				}
			])
			// setdataGetStudentsValue([])
			// setFlag(false)
		} else {
			form2.setFields([
				{
					name: field,
					errors: []
				}
			])
		}
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

	return (
		<div className="px-[50px] pt-[60px] mb-[50px]">
			<div className=" rounded-xl   animate-fade-in">
				<Spin spinning={false}>
					<Title className="!text-[28px]">{t('scient')}</Title>

					<Row>
						<TableScintific
							isSuccess={isSuccess}
							dataLevels={dataLevels}
							selectId={selectId}
							setSelectId={setSelectId}
							dataScientific={dataScientific}
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
								<Select placeholder={t('select')} aria-required options={generateYearsArray()} allowClear />
							</Form.Item>

							<div className="mt-12 mb-1">{t('theme')}</div>
							<Form.Item name="theme" className=" mb-6" rules={[{ required: true, message: '' }]}>
								<Input.TextArea rows={4} placeholder="Введите текст здесь" maxLength={200}/>
							</Form.Item>

							<div className="mb-1">{t('direction')}</div>
							<Form.Item name="direction" className=" h-[35px]" rules={[{ required: true, message: '' }]}>
								<Input.TextArea rows={4} placeholder="Введите текст здесь" maxLength={200}/>
							</Form.Item>

							{/* <Form.Item
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
							</Form.Item> */}
							<Form.Item
								// help={student && student.length < 4 ? t('minimumFour') : ''}
								// validateStatus={student && student.length < 4 ? 'error' : ''}
								className="mt-20 mb-20 min-h-[40px]"
								label={<div className="">{t('naych')}</div>}
								
								layout="vertical"
								name="naych"
							>
								{
									<AutoComplete
									    className='min-h-[40px] 4'
										onChange={value => handleSearch(value, 'naych')}
										allowClear
										// disabled={form.getFieldValue('graduate') || form.getFieldValue('teacher')}
										placeholder={t('inputFio')}
										onClear={() => {
											// setdataGetStudentsValue([])
											// setFlag(false)
										}}
										options={
											[]
											// isFetching
											// 	? [
											// 			{
											// 				value: 'NULL',
											// 				disabled: true,
											// 				label: (
											// 					<div className="flex items-center justify-center w-full h-[100px]">
											// 						<Spin size="large" />
											// 					</div>
											// 				)
											// 			}
											// 	  ]
											// 	: flag && dataGetStudentsValue?.length === 0
											// 	? [
											// 			{
											// 				value: 'NULL',
											// 				disabled: true,
											// 				label: <div className="flex items-center justify-center w-full h-[100px]">Не найден</div>
											// 			}
											// 	  ]
											// 	: dataGetStudentsValue?.map((student: any) => ({
											// 			key: student.id,
											// 			value: student.name,
											// 			id: student.id,
											// 			userType: student.userType,
											// 			userInfo: student.userInfo,
											// 			label: (
											// 				<div>
											// 					<div className="">{student?.name}</div>
											// 					{/* <div className={'w-auto h-auto'} style={{ fontSize: '12px', color: '#888' }}>
											// 											{(student?.userInfo)}
											// 											</div> */}
											// 					<div
											// 						className={'w-auto'}
											// 						style={{
											// 							fontSize: '10px',
											// 							color: '#888',
											// 							whiteSpace: 'normal',
											// 							wordBreak: 'break-word'
											// 						}}
											// 					>
											// 						{truncateString(160, student?.userInfo)}
											// 					</div>
											// 				</div>
											// 			)
											// 	  }))
										}
										onSelect={(value, option) => {
											
											// setId(option.id)
											// setType(option.userType)
											// setRecipientName(option.userInfo)
										}}
									/>
								}
							</Form.Item>

							<Form.Item className="" name="isPublished" valuePropName="checked" label={null}>
								<Checkbox className="2">{t('razrer')}</Checkbox>
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
