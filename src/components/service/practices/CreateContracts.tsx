import { PlusOutlined } from '@ant-design/icons'
import {
	Button,
	Col,
	DatePicker,
	Input,
	InputNumber,
	Row,
	Select,
	Space,
	Typography
} from 'antd'

import { ArrowLeftSvg } from '../../../assets/svg'

type PropsType = {
	setIsCreate: (value: boolean) => void
}
export const CreateContracts = ({ setIsCreate }: PropsType) => {
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
			<Row gutter={[16, 16]} className="mt-12">
				<Col xs={24} sm={24} md={18} lg={16} xl={12}>
					<Space direction="vertical" className="w-full">
						<Typography.Text>
							Наименование организации по договору
						</Typography.Text>
						<Input type="text" className="w-full" size="large"></Input>
					</Space>
				</Col>
			</Row>
			<Row gutter={[16, 16]} className="mt-4">
				<Col xs={24} sm={24} md={18} lg={16} xl={12}>
					<Space direction="vertical" className="w-full">
						<Typography.Text>Номер договора</Typography.Text>
						<InputNumber className="w-full" size="large"></InputNumber>
					</Space>
				</Col>
			</Row>
			<Row gutter={[16, 16]} className="mt-4">
				<Col xs={24} sm={24} md={18} lg={8} xl={6}>
					<Space direction="vertical" className="w-full">
						<Typography.Text>Дата заключения договора</Typography.Text>
						<DatePicker
							placeholder=""
							className="w-full"
							size="large"
						></DatePicker>
					</Space>
				</Col>
				<Col xs={24} sm={24} md={18} lg={8} xl={6}>
					<Space direction="vertical" className="w-full">
						<Typography.Text>Тип договора</Typography.Text>
						<Select
							size="large"
							dropdownMatchSelectWidth={false}
							placeholder=""
							className="w-full"
							options={[{ value: '1', label: 'Тип' }]}
						/>
					</Space>
				</Col>
			</Row>
			<Row gutter={[16, 16]} className="mt-4">
				<Col xs={24} sm={24} md={18} lg={8} xl={6}>
					<Space direction="vertical" className="w-full">
						<Typography.Text>Срок действия договора</Typography.Text>
						<DatePicker
							placeholder=""
							className="w-full"
							size="large"
						></DatePicker>
					</Space>
				</Col>
				<Col xs={24} sm={24} md={18} lg={8} xl={6}>
					<Space direction="vertical" className="w-full">
						<Typography.Text>Шифр и наименование специальности</Typography.Text>
						<Select
							size="large"
							dropdownMatchSelectWidth={false}
							placeholder=""
							className="w-full"
							options={[{ value: '1', label: 'Имя' }]}
						/>
					</Space>
				</Col>
			</Row>
			<Row gutter={[16, 16]} className="mt-4">
				<Col xs={24} sm={24} md={18} lg={16} xl={12}>
					<Space direction="vertical" className="w-full">
						<Typography.Text>Шифр и наименование специальности</Typography.Text>
						<Input type="text" className="w-full" size="large"></Input>
					</Space>
				</Col>
			</Row>
			<Row gutter={[16, 16]} className="mt-4">
				<Col xs={24} sm={24} md={18} lg={16} xl={12}>
					<Space direction="vertical" className="w-full">
						<Typography.Text>Юридический адрес организации</Typography.Text>
						<Input type="text" className="w-full" size="large"></Input>
					</Space>
				</Col>
			</Row>
			<Row gutter={[16, 16]} className="mt-4">
				<Col xs={24} sm={24} md={18} lg={16} xl={12}>
					<Space direction="vertical" className="w-full">
						<Typography.Text>Фактический адрес организации</Typography.Text>
						<Input type="text" className="w-full" size="large"></Input>
					</Space>
				</Col>
			</Row>
			<Row gutter={[16, 16]} className="mt-4">
				<Col xs={24} sm={24} md={18} lg={16} xl={12}>
					<Space direction="vertical" className="w-full">
						<Typography.Text>Количество мест</Typography.Text>
						<InputNumber className="w-full" size="large"></InputNumber>
					</Space>
				</Col>
			</Row>
			<Row gutter={[16, 16]} className="mt-4">
				<Col xs={24} sm={24} md={18} lg={8} xl={6}>
					<Space direction="vertical" className="w-full">
						<Typography.Text>
							Прикрепить скан договора в формате pdf
						</Typography.Text>
						<Button
							className="w-full"
							size="large"
							type="primary"
							icon={<PlusOutlined />}
						>
							Добавить файл
						</Button>
					</Space>
				</Col>
			</Row>
			<Row gutter={[16, 16]} className="mt-4">
				<Col xs={24} sm={24} md={18} lg={8} xl={6}>
					<Space direction="vertical" className="w-full">
						<Typography.Text>
							Прикрепить дополнительный документ в формате pdf
						</Typography.Text>
						<Button
							className="w-full"
							size="large"
							type="primary"
							icon={<PlusOutlined />}
						>
							Добавить файл
						</Button>
					</Space>
				</Col>
			</Row>
			<Row gutter={[16, 16]} className="my-8">
				<Col xs={24} sm={24} md={18} lg={8} xl={6}>
					<Space className="w-full">
						<Button className="!rounded-full" size="large" type="primary">
							Сохранить
						</Button>
						<Button className="!rounded-full" size="large">
							Режим просмотра
						</Button>
					</Space>
				</Col>
			</Row>
		</section>
	)
}
