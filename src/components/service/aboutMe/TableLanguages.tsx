import {
	DeleteTwoTone,
	EditTwoTone,
	EyeInvisibleOutlined,
	EyeInvisibleTwoTone,
	EyeTwoTone,
	UploadOutlined
} from '@ant-design/icons'
import { Button, Checkbox, ConfigProvider, Form, Modal, Row, Select, Space, Table, Tag, Upload } from 'antd'
import type { TableProps } from 'antd'
import { t } from 'i18next'
import React, { useState } from 'react'

import { truncateString } from '../../../utils/truncateString'

import './TableLanguage.scss'

interface DataType {
	key: string
	name: string
	age: number
	address: string
	tags: string[]
}

const TableLanguages = ({ dataForeign, setSelectId, selectId }: any) => {
	const [isModalOpenEdit, setIsModalOpenEdit] = useState(false)
	const [rowStates, setRowStates] = useState({})
	console.log('rowStates', rowStates)
	const columns: TableProps<DataType>['columns'] = [
		{
			title: t('language'),
			dataIndex: 'language',
			key: 'name',
			render: text => <div>{text}</div>
		},
		{
			title: t('level'),
			dataIndex: 'languageLevel',
			key: 'age'
		},
		{
			title: t('sert'),
			dataIndex: 'certificates',
			key: 'address',
			render: certificates => (
				<>
					{certificates?.map((item: any, index: any) => (
						<div key={index}>
							<a target="_blank" href={item.certificateLink} rel="noopener noreferrer">
								{item.certificateName} {index === certificates.length - 1 ? '' : ', '}
							</a>
						</div>
					))}
				</>
			)
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
								setSelectId(record?.studLangId)
								// setRowStates(prevState => {
								// 	const newStates = { ...prevState };
								// 	// @ts-ignore
								// 	if (newStates[record?.studLangId]) {
								// 			// @ts-ignore
								// 	  delete newStates[record?.studLangId]; // Снимаем выделение
								// 	// @ts-ignore
								// 	} else {
								// 	// @ts-ignore
								// 	  newStates[record?.studLangId] = true; // Выделяем
								// 	}
								// 	return newStates;
								//   });
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
								setSelectId(record?.studLangId)
								// setRowStates(prevState => {
								// 	const newStates = { ...prevState };
								// 	// @ts-ignore
								// 	if (newStates[record?.studLangId]) {
								// 			// @ts-ignore
								// 	  delete newStates[record?.studLangId]; // Снимаем выделение
								// 	// @ts-ignore
								// 	} else {
								// 	// @ts-ignore
								// 	  newStates[record?.studLangId] = true; // Выделяем
								// 	}
								// 	return newStates;
								//   });
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
							console.log('record', record)
							// @ts-ignore
							setSelectId(record?.studLangId)
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
					<DeleteTwoTone className="hover:scale-[140%] " />
				</Space>
			)
		}
	]

	const data: any = [
		{
			key: '1',
			name: 'John Brown',
			age: 32,
			address: 'New York No. 1 Lake Park'
		},
		{
			key: '2',
			name: 'Jim Green',
			age: 42,
			address: 'London No. 1 Lake Park'
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sydney No. 1 Lake Park',
			tags: ['cool', 'teacher']
		}
	]
	const showModalEdit = () => {
		setIsModalOpenEdit(true)
	}

	const handleOkEdit = () => {
		setIsModalOpenEdit(false)
	}

	const handleCancelEdit = () => {
		setIsModalOpenEdit(false)
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
					className=""
					footer={null}
					title={'Редактирование'}
					open={isModalOpenEdit}
					onOk={handleOkEdit}
					onCancel={handleCancelEdit}
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
				<div className={'registerContracts animate-fade-in w-full'}>
					<Table<DataType>
						pagination={false}
						columns={columns}
						dataSource={dataForeign?.map((item: any) => ({
							...item,
							key: item.studLangId
						}))}
						rowClassName={record => {
							// @ts-ignore
							return record?.isPublished ? '' : 'bg-gray-200 opacity-60'
						}}
						className="w-full my-custom-table  select-none"
						locale={{ emptyText: t('noData') }}
					/>
				</div>
			</ConfigProvider>
		</>
	)
}

export default TableLanguages
