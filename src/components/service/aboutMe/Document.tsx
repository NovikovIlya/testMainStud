import { QuestionOutlined, UploadOutlined } from '@ant-design/icons'
import {
	Button,
	DatePicker,
	Input,
	Select,
	Space,
	Tooltip,
	Typography,
	Upload,
	message
} from 'antd'
import type { UploadProps } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { RootState, useAppSelector } from '../../../store'
import { addDocuments } from '../../../store/reducers/FormReducers/CountriesEducationReducer'
import { useGetDocumentsQuery } from '../../../store/slice/documentSlice'

const props: UploadProps = {
	name: 'file',
	action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
	headers: {
		authorization: 'authorization-text'
	},
	onChange(info) {
		if (info.file.status !== 'uploading') {
			console.log(info.file, info.fileList)
		}
		if (info.file.status === 'done') {
			message.success(`${info.file.name} file uploaded successfully`)
		} else if (info.file.status === 'error') {
			message.error(`${info.file.name} file upload failed.`)
		}
	}
}
export const Document = () => {
	const [t, i18n] = useTranslation()
	const dispatch = useDispatch()

	const [SkipCountriesQuery, changeQuerySkip] = useState<boolean>(true)
	const user = useAppSelector(state => state.Profile.profileData.CurrentData)
	const documentStorage = useAppSelector(
		(state: RootState) => state.CountriesEducation.documents
	)

	const { data: documents } = useGetDocumentsQuery(i18n.language, {
		skip: SkipCountriesQuery
	})

	useEffect(() => {
		if (!documentStorage) changeQuerySkip(false)
	}, [documentStorage])

	useEffect(() => {
		if (documents) {
			dispatch(addDocuments(documents))
			changeQuerySkip(true)
		}
	}, [documents])

	return (
		<div className="m-14 radio">
			<Space direction="vertical" size={20}>
				<Typography.Title level={3}>Документы</Typography.Title>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>Тип документа</Typography.Text>
					<Select
						placeholder={user?.citizenship}
						size="large"
						className="w-[624px] shadow rounded-lg"
						options={
							!documentStorage
								? []
								: documentStorage.map(el => ({ value: el.id, label: el.type }))
						}
						value={1}
					/>
				</Space>

				<Typography.Text className="text-black text-sm font-bold">
					Данные документа
				</Typography.Text>

				<Space size={'large'}>
					<Space direction="vertical">
						<Typography.Text>Код подразделения</Typography.Text>
						<Input
							placeholder="000-000"
							size="large"
							className="w-[300px] shadow "
						/>
					</Space>
					<Space direction="vertical">
						<Typography.Text>Когда выдан</Typography.Text>
						<DatePicker
							placeholder="ДД. ММ. ГГГГ"
							size="large"
							className="w-[300px] shadow "
						/>
					</Space>
				</Space>

				<Space size={'large'}>
					<Space direction="vertical">
						<Typography.Text>Серия</Typography.Text>
						<Input
							placeholder="00 00"
							size="large"
							className="w-[300px] shadow "
						/>
					</Space>
					<Space direction="vertical">
						<Typography.Text>Номер</Typography.Text>
						<Input
							placeholder="000000"
							size="large"
							className="w-[300px] shadow "
						/>
					</Space>
				</Space>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>Кем выдан</Typography.Text>
					<Input
						placeholder="МВД ПО РЕСПУБЛИКЕ ТАТАРСТАН"
						size="large"
						className="w-[624px] shadow "
					/>
				</Space>

				<Typography.Text className="text-black text-sm font-bold">
					Данные документа
				</Typography.Text>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>СНИЛС</Typography.Text>
					<Input
						placeholder="000-000-000 00"
						size="large"
						className="w-[624px] shadow "
					/>
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>ИНН</Typography.Text>
					<Input
						placeholder="123456789012"
						size="large"
						className="w-[624px] shadow "
					/>
				</Space>
				<Space size={'small'}>
					<Typography.Text className="text-black opacity-80 text-sm font-normal leading-none">
						Прикрепить документы
					</Typography.Text>
					<Tooltip title="Сюда нужно прикрепить документы в формате PDF, данные которых были введены выше, а именно: Паспорт гражданина РФ (2 и 3 страницы), СНИЛС и ИНН">
						<Button
							type="default"
							className="bg-transparent"
							icon={<QuestionOutlined className="text-xs" />}
						/>
					</Tooltip>
				</Space>

				<Upload {...props}>
					<Button icon={<UploadOutlined />}>Добавить файл</Button>
				</Upload>
			</Space>
		</div>
	)
}
