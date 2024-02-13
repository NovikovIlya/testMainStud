import { PlusOutlined } from '@ant-design/icons'
import {
	Button,
	Col,
	DatePicker,
	Input,
	Row,
	Select,
	Space,
	Typography,
	Upload,
	UploadProps,
	message
} from 'antd'
import dayjs from 'dayjs'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { ArrowLeftSvg } from '../../../../assets/svg'

interface IFormInput {
	name: string
	number: string
	date: string
	type: { label: string; value: string }
	term: string
	code: { label: string; value: string }
	specialty: string
	legal: string
	actual: string
	seats: string
}
const props: UploadProps = {
	name: 'file',
	action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
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

type PropsType = {
	setIsCreate: (value: boolean) => void
	setIsPreview: (value: boolean) => void
}

export const CreateContracts = ({ setIsCreate, setIsPreview }: PropsType) => {
	const { control, handleSubmit } = useForm({
		defaultValues: {
			name: '',
			number: '',
			date: '',
			type: {
				label: '',
				value: ''
			},
			term: '',
			code: {
				label: '',
				value: ''
			},
			specialty: '',
			legal: '',
			actual: '',
			seats: ''
		}
	})
	const onSubmit: SubmitHandler<IFormInput> = data => {
		console.log(data)
	}
	return (
		<section className="container">
			<Space size={10}>
				<Button
					size="large"
					className="mt-1"
					icon={<ArrowLeftSvg className="w-4 h-4 cursor-pointer mt-1" />}
					type="text"
					onClick={() => setIsCreate(false)}
				/>
				<Typography.Text className="text-black text-3xl font-normal">
					Название
				</Typography.Text>
			</Space>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Row gutter={[16, 16]} className="mt-12">
					<Col xs={24} sm={24} md={18} lg={16} xl={12}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>
								Наименование организации по договору
							</Typography.Text>
							<Controller
								name="name"
								control={control}
								render={({ field }) => (
									<Input
										type="text"
										className="w-full"
										size="large"
										{...field}
									/>
								)}
							/>
						</Space>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4">
					<Col xs={24} sm={24} md={18} lg={16} xl={12}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>Номер договора</Typography.Text>
							<Controller
								name="number"
								control={control}
								render={({ field }) => (
									<Input
										type="text"
										className="w-full"
										size="large"
										{...field}
									/>
								)}
							/>
						</Space>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4">
					<Col xs={24} sm={24} md={18} lg={8} xl={6}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>Дата заключения договора</Typography.Text>
							<Controller
								name="date"
								control={control}
								render={({ field, fieldState }) => (
									<DatePicker
										status={fieldState.error ? 'error' : undefined}
										ref={field.ref}
										name={field.name}
										onBlur={field.onBlur}
										value={field.value ? dayjs(field.value) : null}
										onChange={date => {
											field.onChange(date ? date.valueOf() : null)
										}}
										size="large"
										format="DD-MM-YYYY"
										placeholder=""
										className="w-full"
									/>
								)}
							/>
						</Space>
					</Col>
					<Col xs={24} sm={24} md={18} lg={8} xl={6}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>Тип договора</Typography.Text>
							<Controller
								name="type"
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										size="large"
										popupMatchSelectWidth={false}
										placeholder=""
										className="w-full"
										options={[{ value: '1', label: 'Тип' }]}
									/>
								)}
							/>
						</Space>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4">
					<Col xs={24} sm={24} md={18} lg={8} xl={6}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>Срок действия договора</Typography.Text>
							<Controller
								name="term"
								control={control}
								render={({ field, fieldState }) => (
									<DatePicker
										{...field}
										status={fieldState.error ? 'error' : undefined}
										value={field.value ? dayjs(field.value) : null}
										onChange={date => {
											field.onChange(date ? date.valueOf() : null)
										}}
										size="large"
										format="DD-MM-YYYY"
										placeholder=""
										className="w-full"
									/>
								)}
							/>
						</Space>
					</Col>
					<Col xs={24} sm={24} md={18} lg={8} xl={6}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>
								Шифр и наименование специальности
							</Typography.Text>
							<Controller
								name="code"
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										size="large"
										popupMatchSelectWidth={false}
										placeholder=""
										className="w-full"
										options={[{ value: '1', label: 'Имя' }]}
									/>
								)}
							/>
						</Space>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4">
					<Col xs={24} sm={24} md={18} lg={16} xl={12}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>
								Шифр и наименование специальности
							</Typography.Text>
							<Controller
								name="specialty"
								control={control}
								render={({ field }) => (
									<Input
										type="text"
										className="w-full"
										size="large"
										{...field}
									/>
								)}
							/>
						</Space>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4">
					<Col xs={24} sm={24} md={18} lg={16} xl={12}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>Юридический адрес организации</Typography.Text>
							<Controller
								name="legal"
								control={control}
								render={({ field }) => (
									<Input
										type="text"
										className="w-full"
										size="large"
										{...field}
									/>
								)}
							/>
						</Space>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4">
					<Col xs={24} sm={24} md={18} lg={16} xl={12}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>Фактический адрес организации</Typography.Text>
							<Controller
								name="actual"
								control={control}
								render={({ field }) => (
									<Input
										type="text"
										className="w-full"
										size="large"
										{...field}
									/>
								)}
							/>
						</Space>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4">
					<Col xs={24} sm={24} md={18} lg={16} xl={12}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>Количество мест</Typography.Text>
							<Controller
								name="seats"
								control={control}
								render={({ field }) => (
									<Input
										type="text"
										className="w-full"
										size="large"
										{...field}
									/>
								)}
							/>
						</Space>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4">
					<Col xs={24} sm={24} md={18} lg={8} xl={6}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>
								Прикрепить скан договора в формате pdf
							</Typography.Text>
							<Upload {...props}>
								<Button
									className="w-full"
									size="large"
									type="primary"
									icon={<PlusOutlined />}
								>
									Добавить файл
								</Button>
							</Upload>
						</Space>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4">
					<Col xs={24} sm={24} md={18} lg={8} xl={6}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>
								Прикрепить дополнительный документ в формате pdf
							</Typography.Text>
							<Upload {...props}>
								<Button
									className="w-full"
									size="large"
									type="primary"
									icon={<PlusOutlined />}
								>
									Добавить файл
								</Button>
							</Upload>
						</Space>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="my-8">
					<Col xs={24} sm={24} md={18} lg={8} xl={6}>
						<Space className="w-full">
							<Button
								className="!rounded-full"
								size="large"
								type="primary"
								htmlType="submit"
							>
								Сохранить
							</Button>
							<Button
								className="!rounded-full"
								size="large"
								onClick={() => {
									setIsPreview(true)
								}}
							>
								Режим просмотра
							</Button>
						</Space>
					</Col>
				</Row>
			</form>
		</section>
	)
}
