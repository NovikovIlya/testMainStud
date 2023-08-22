import { QuestionOutlined, UploadOutlined } from '@ant-design/icons'
import {
	Button,
	Input,
	Select,
	Space,
	Tooltip,
	Typography,
	Upload,
	message
} from 'antd'
import type { UploadProps } from 'antd'

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

export const Education = () => {
	return (
		<div className="m-14 radio">
			<Space direction="vertical" size={20}>
				<Typography.Title
					level={3}
					className="text-black text-2xl font-bold leading-normal"
				>
					Образование
				</Typography.Title>

				<Typography.Text ellipsis>
					Данные документа об образовании
				</Typography.Text>

				<Space size={'large'}>
					<Space direction="vertical">
						<Typography.Text>Уровень образования</Typography.Text>
						<Select
							placeholder="Основное общее"
							size="large"
							className="w-[300px] shadow rounded-lg"
						/>
					</Space>
					<Space direction="vertical">
						<Typography.Text>Страна получения образования</Typography.Text>
						<Select
							placeholder="Россия"
							size="large"
							className="w-[300px] shadow rounded-lg"
						/>
					</Space>
				</Space>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>Наименование учебного заведения</Typography.Text>
					<Input
						placeholder="Лицей №8 г. Бугульма"
						size="large"
						className="w-[624px] shadow "
					/>
				</Space>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>Номер диплома</Typography.Text>
					<Input
						placeholder="12345678901234"
						size="large"
						className="w-[624px] shadow "
					/>
				</Space>

				<Space size={'large'}>
					<Space direction="vertical">
						<Typography.Text>Год окончания</Typography.Text>
						<Select
							placeholder="2022"
							size="large"
							className="w-[300px] shadow rounded-lg"
						/>
					</Space>
					<Space direction="vertical">
						<Typography.Text>Специальность</Typography.Text>
						<Input
							placeholder="Веб-дизайн"
							size="large"
							className="w-[300px] shadow "
						/>
					</Space>
				</Space>
				<Space size={'small'}>
					<Typography.Text className="text-black opacity-80 text-sm font-normal leading-none">
						Прикрепить документы
					</Typography.Text>
					<Tooltip title="Сюда нужно прикрепить документы в формате PDF, данные которых были введены выше,а именно: - скан разворота диплома о высшем образовании, где чётко будут видны серия и номер документа, а также специальность">
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
