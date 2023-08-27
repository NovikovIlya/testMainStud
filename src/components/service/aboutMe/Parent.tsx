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
import clsx from 'clsx'
import React, { useState } from 'react'

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

export const Parent = () => {
	const [countParent, setCountParent] = useState([0])
	const handleAddParent = () => {
		setCountParent([...countParent, 1])
	}
	const handleDeleteWork = () => {
		setCountParent(state => state.slice(0, state.length - 1))
	}
	return (
		<div className="m-14 radio">
			<Space direction="vertical" size={20}>
				<Typography.Title
					level={3}
					className="text-black text-2xl font-bold leading-normal"
				>
					Родители
				</Typography.Title>
				{countParent.map((item, index) => (
					<>
						<Space>
							<Typography.Text
								ellipsis
								className="text-black text-sm font-bold"
							>
								Место рождения
							</Typography.Text>
							<Typography.Text
								onClick={handleDeleteWork}
								className={clsx(
									'cursor-pointer opacity-40 text-center text-black text-sm font-normal leading-[18px]',
									index === 0 && 'hidden'
								)}
							>
								Удалить
							</Typography.Text>
						</Space>

						<Space direction="vertical">
							<Typography.Text>ФИО родителя</Typography.Text>
							<Input
								placeholder="Безухов Пьер Кириллович"
								size="large"
								className="w-[624px] shadow rounded-lg"
							/>
						</Space>
						<Space direction="vertical">
							<Typography.Text>Номер телефона родителя</Typography.Text>
							<Input
								placeholder="+7 999 898-88-00"
								size="large"
								className="w-[624px] shadow rounded-lg"
							/>
						</Space>
						<Space direction="vertical">
							<Typography.Text>Email родителя</Typography.Text>
							<Input
								placeholder="BezuPr@gmail.com"
								size="large"
								className="w-[624px] shadow rounded-lg"
							/>
						</Space>
						<Typography.Text ellipsis className="text-black text-sm font-bold">
							Документы родителя
						</Typography.Text>
						<Space direction="vertical">
							<Typography.Text>Тип документа</Typography.Text>
							<Select
								placeholder="Паспорт РФ"
								size="large"
								className="w-[624px] shadow rounded-lg"
							/>
						</Space>
						<Typography.Text ellipsis className="text-black text-sm font-bold">
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
					</>
				))}
				<Space
					direction="vertical"
					size={'small'}
					className="w-full flex items-center"
				>
					<Button
						className="rounded-full text-center p-0 w-8 h-8 text-xl"
						type="primary"
						onClick={handleAddParent}
					>
						+
					</Button>
					<Typography.Text className="opacity-40 text-center text-black text-sm font-normal leading-[18px]">
						добавить родителя
					</Typography.Text>
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
