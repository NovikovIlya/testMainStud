import { DeleteTwoTone, EditTwoTone, EyeInvisibleTwoTone, EyeTwoTone } from '@ant-design/icons'
import { useDebounce } from 'ahooks'
import {
	AutoComplete,
	Button,
	Checkbox,
	ConfigProvider,
	Form,
	Input,
	Modal,
	Popconfirm,
	Radio,
	Select,
	Space,
	Spin,
	Table,
	message
} from 'antd'
import type { TableProps } from 'antd'
import { t } from 'i18next'
import { useEffect, useState } from 'react'

import { CertificateTs, LanguageData } from '../../../models/aboutMe'
import {
	useDeleteScientificMutation,
	useEditForeignMutation,
	useEditScientificActivityMutation,
	useGetOneScientificQuery,
	useGetScientificDirectorsQuery,
	useIsPublishedMutation
} from '../../../store/api/aboutMe/forAboutMe'
import { generateYearsArray } from '../../../utils/generateYearsArray'

import './TableLanguage.scss'

const TableScintific = ({ isSuccess, dataLevels, dataScientific, setSelectId, selectId }: any) => {
	const [isModalOpenEdit, setIsModalOpenEdit] = useState<boolean>(false)
	const [selectInfo, setSelectInfo] = useState<any>(null)
	const [selectedLabel, setSelectedLabel] = useState<string | null>(null)
	const [form2] = Form.useForm()
	const [editScientific, { isLoading: isLoadingEdit }] = useEditScientificActivityMutation()
	const [deleteScientific, { isLoading: isLoadingDelete }] = useDeleteScientificMutation()
	const {
		data: getOne,
		isSuccess: isSuccesOne,
		isLoading: isLoadingOne
	} = useGetOneScientificQuery(selectInfo?.id, { skip: !selectInfo?.id })
	const [changeGlaz, { isLoading: isLoadingGlaz }] = useIsPublishedMutation()
	const scientificDirector = Form.useWatch('scientificDirector', form2)
	const debouncedNameStudent = useDebounce(scientificDirector, { wait: 1000 })
	const { data: dataScientificDirectors, isLoading: isLoadingDirectors } = useGetScientificDirectorsQuery(
		debouncedNameStudent,
		{ skip: !debouncedNameStudent }
	)
	const [dataScientificDirectorsValue, setDataScientificDirectorsValue] = useState<any>([])
	const [flag, setFlag] = useState(false)
	const [id, setId] = useState(null)

	useEffect(() => {
		if (dataScientificDirectors) {
			setDataScientificDirectorsValue(dataScientificDirectors)
			setFlag(true)
		}
	}, [dataScientificDirectors])

	const columns: TableProps<any>['columns'] = [
		{
			title: t('Year'),
			dataIndex: 'year',
			key: 'year',
			render: text => <div>{text}</div>
		},
		{
			title: t('themes'),
			dataIndex: 'theme',
			key: 'theme'
		},
		{
			title: t('direction'),
			dataIndex: 'direction',
			key: 'direction'
		},
		{
			title: t('naych'),
			dataIndex: 'scientificDirectorName',
			key: 'scientificDirectorName'
		},

		{
			title: '',
			key: 'action',
			dataIndex: 'isPublished',
			render: (_, record) => (
				<>
					{/* @ts-ignore */}
					{record?.isPublished ? (
						<EyeTwoTone
							// @ts-ignore
							className={`hover:scale-[140%]`}
							onClick={e => {
								e.preventDefault()
								e.stopPropagation()
								// @ts-ignore
								setSelectId(record?.id)
								// @ts-ignore
								changeGlaz(record?.id)
							}}
						/>
					) : (
						<EyeInvisibleTwoTone
							// @ts-ignore
							className={` hover:scale-[140%]`}
							onClick={e => {
								e.preventDefault()
								e.stopPropagation()
								// @ts-ignore
								setSelectId(record?.id)
								// @ts-ignore
								changeGlaz(record?.id)
							}}
						/>
					)}
				</>
			)
		},

		{
			title: '',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<EditTwoTone
						className="hover:scale-[140%] transition-transform duration-200 delay-100"
						onClick={() => {
							setSelectInfo(record)
							showModalEdit()
						}}
					/>
				</Space>
			)
		},
		{
			title: '',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<Popconfirm
						title={t('deleteEducationTitle')}
						description={t('deleteEducationDescription')}
						onConfirm={() => {
							handleDelete(record?.id)
						}}
					>
						<DeleteTwoTone className="hover:scale-[140%] " />
					</Popconfirm>
				</Space>
			)
		}
	]

	useEffect(() => {
		if (getOne) {
			form2.setFieldsValue({
				language: getOne?.isRussian ? 'rus' : 'eng',
				year: getOne?.year,
				theme: getOne?.theme,
				direction: getOne?.direction,
				isPublished: getOne?.isPublished
			})
		}
	}, [isSuccesOne, getOne, form2])

	const handleDelete = (record: any) => {
		console.log('recordDelete', record)
		deleteScientific(record)
	}

	const showModalEdit = () => {
		setIsModalOpenEdit(true)
	}

	const handleOkEdit = () => {
		setIsModalOpenEdit(false)
	}

	const handleCancelEdit = () => {
		setIsModalOpenEdit(false)
		form2.resetFields()
	}

	const onFinishForm2 = async (values: any) => {
		editScientific({
			id: getOne?.id,
			isRussian: values?.languageCode === 1 ? true : false,
			year: values?.year,
			theme: values?.theme,
			direction: values?.direction,
			isPublished: values?.isPublished
			// scientificDirectorId: getOne?.scientificDirectorId,
			// scientificDirector: getOne?.scientificDirector
		})
		handleCancelEdit()
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
			setDataScientificDirectorsValue([])
			setFlag(false)
		} else {
			form2.setFields([
				{
					name: field,
					errors: []
				}
			])
		}
	}

	return (
		<>
			<ConfigProvider
				theme={{
					components: {
						Table: {
							headerBg: 'rgb(218, 231, 251)'
						}
					}
				}}
			>
				<Modal
					className="!z-[10000000]"
					footer={null}
					title={t('scient')}
					open={isModalOpenEdit}
					onOk={handleOkEdit}
					onCancel={handleCancelEdit}
				>
					{isLoadingOne ? (
						<div className="flex w-full justify-center items-center">
							<Spin />
						</div>
					) : (
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
								name="year"
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
								<Input.TextArea rows={4} placeholder="Введите текст здесь" maxLength={200} />
							</Form.Item>

							<div className="mb-1">{t('direction')}</div>
							<Form.Item name="direction" className=" h-[35px]" rules={[{ required: true, message: '' }]}>
								<Input.TextArea rows={4} placeholder="Введите текст здесь" maxLength={200} />
							</Form.Item>

							<Form.Item
								// help={student && student.length < 4 ? t('minimumFour') : ''}
								// validateStatus={student && student.length < 4 ? 'error' : ''}
								className="mt-20 mb-20 min-h-[40px]"
								label={<div className="">{t('naych')}</div>}
								layout="vertical"
								name="scientificDirector"
							>
								{
									<AutoComplete
										className="min-h-[40px] 4"
										onChange={value => handleSearch(value, 'scientificDirector')}
										allowClear
										// disabled={form.getFieldValue('graduate') || form.getFieldValue('teacher')}
										placeholder={t('inputFio')}
										onClear={() => {
											setDataScientificDirectorsValue([])
											setFlag(false)
										}}
										options={
											isLoadingDirectors
												? [
														{
															value: 'NULL',
															disabled: true,
															label: (
																<div className="flex items-center justify-center w-full h-[100px]">
																	<Spin size="large" />
																</div>
															)
														}
												  ]
												: flag && dataScientificDirectorsValue?.length === 0
												? [
														{
															value: 'NULL',
															disabled: true,
															label: (
																<div className="flex items-center justify-center w-full h-[100px]">{t('notFound')}</div>
															)
														}
												  ]
												: dataScientificDirectorsValue?.map((student: any) => ({
														key: student.id,
														value: student.name,
														id: student.id,
														// userType: student.userType,
														// userInfo: student.userInfo,
														label: (
															<div>
																<div className="">{student?.name}</div>

																{/* <div
																	className={'w-auto'}
																	style={{
																		fontSize: '10px',
																		color: '#888',
																		whiteSpace: 'normal',
																		wordBreak: 'break-word'
																	}}
																>
																	{truncateString(160, student?.userInfo)}
																</div> */}
															</div>
														)
												  }))
										}
										onSelect={(value, option) => {
											setId(option.id)
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
					)}
				</Modal>

				<div className={'registerContracts animate-fade-in w-full'}>
					<Spin className="w-full" spinning={isLoadingDelete || isLoadingGlaz || isLoadingEdit}>
						<Table<any>
							pagination={false}
							columns={columns}
							dataSource={dataScientific
								?.map((item: any) => ({
									...item,
									key: item.studLangId
								}))
								?.sort((a: any, b: any) => b.year - a.year)}
							rowClassName={record => {
								return record.isPublished ? '' : 'bg-gray-200 opacity-60'
							}}
							className="w-full my-custom-table select-none"
							locale={{ emptyText: t('noData') }}
						/>
					</Spin>
				</div>
			</ConfigProvider>
		</>
	)
}

export default TableScintific
