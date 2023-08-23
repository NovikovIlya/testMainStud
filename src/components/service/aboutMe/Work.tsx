import { QuestionOutlined, UploadOutlined } from '@ant-design/icons'
import {
	Button,
	Checkbox,
	Input,
	Space,
	Tooltip,
	Typography,
	Upload,
	message
} from 'antd'
import type { UploadProps } from 'antd'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { IWorkHistoryRequest } from '../../../api/types'
import { getAbUsJob } from '../../../store/creators/MainCreators'

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

export const Work = () => {
	const [countWork, setCountWork] = useState([0])
	const dispatch = useDispatch()
	const [fieldData, setFieldData] = useState<IWorkHistoryRequest | null>(null)

	const getData = async () => {
		const response = await getAbUsJob(dispatch)
		setFieldData(response)
		response !== null && setCountWork([response?.items.length])
	}

	useEffect(() => {
		getData()
	}, [])

	const handleAddWork = () => {
		setCountWork([...countWork, 1])
	}
	const handleDeleteWork = () => {
		setCountWork(state => state.slice(0, state.length - 1))
	}
	return (
		<div className="m-14 radio">
			<Space direction="vertical" size={20}>
				<Typography.Title level={3}>Работа</Typography.Title>
				<Checkbox>Я трудоустроен на данный момент</Checkbox>

				{countWork.map(item => (
					<>
						<Space>
							<Typography.Text className="text-black text-sm font-bold">
								Место работы
							</Typography.Text>
							<Typography.Text
								onClick={handleDeleteWork}
								className={clsx(
									'cursor-pointer opacity-40 text-center text-black text-sm font-normal leading-[18px]',
									item === 0 && 'hidden'
								)}
							>
								Удалить
							</Typography.Text>
						</Space>
						<Space direction="vertical" size={'small'}>
							<Typography.Text>
								Предыдущее/нынешнее место работы
							</Typography.Text>
							<Input
								placeholder="Калифорнийский университет в Беркли"
								size="large"
								className="w-[624px] shadow "
							/>
						</Space>
						<Space direction="vertical" size={'small'}>
							<Typography.Text>Период работы</Typography.Text>
							<Input
								placeholder="Месяц начала — месяц окончания"
								size="large"
								className="w-[624px] shadow "
							/>
						</Space>
						<Space direction="vertical" size={'small'}>
							<Typography.Text>Обязанности</Typography.Text>
							<Input.TextArea
								className="w-[624px] shadow "
								maxLength={100}
								style={{ height: 120, resize: 'none' }}
								placeholder="Расскажите в чем заключались ваши рабочие обязанности, напишите о Вашем опыте работы."
							/>
						</Space>
						<Space direction="vertical" size={'small'}>
							<Typography.Text>Дополнительная информация</Typography.Text>
							<Input.TextArea
								className="w-[624px] shadow "
								maxLength={100}
								style={{ height: 120, resize: 'none' }}
								placeholder="Введите текст"
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
						onClick={handleAddWork}
					>
						+
					</Button>
					<Typography.Text className="opacity-40 text-center text-black text-sm font-normal leading-[18px]">
						добавить работу
					</Typography.Text>
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>Ссылка на портфолио</Typography.Text>
					<Input
						placeholder="https://disk.yandex.ru"
						size="large"
						className="w-[624px] shadow "
					/>
				</Space>
				<Space size={'small'}>
					<Typography.Text className="text-black opacity-80 text-sm font-normal leading-none">
						Прикрепить документы
					</Typography.Text>
					<Tooltip title="Ваши работы">
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
