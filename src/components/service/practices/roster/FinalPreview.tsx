import {
	Button,
	Col,
	DatePicker,
	Row,
	Select,
	Space,
	Table,
	TableProps,
	Typography
} from 'antd'

import { ArrowLeftSvg } from '../../../../assets/svg'
import { DownloadSvg } from '../../../../assets/svg/DownloadSvg'
import { LinkSvg } from '../../../../assets/svg/LinkSvg'
import { PrinterSvg } from '../../../../assets/svg/PrinterSvg'

type PropsType = {
	setIsFinalReview: (value: boolean) => void
}

interface DataType {
	key: string
	organizations: string
	specialties: string
	number: string
	date: string
	type: string
	term: string
	code: string
	juridical: string
	actual: string
	quantity: string
	contract: string
	agreement: string
}
const data: DataType[] = [
	{
		key: '1',
		organizations: 'Медико-санитарная часть ФГАОУ ВО КФУ',
		specialties: '12.456 Лечебное дело',
		number: '№1.1.2.77.2.45-04/10/2022',
		date: '02.09.2022',
		type: 'Пролонгация 1 год. Потом бессрочный',
		term: 'Бессрочный',
		code: 'Ортодонтия',
		juridical: 'ул. Оренбургский тракт, 138, Казань, Респ. Татарстан',
		actual: 'ул. Оренбургский тракт, 138, Казань, Респ. Татарстан',
		quantity: '150',
		contract: '#',
		agreement: '#'
	},
	{
		key: '2',
		organizations: 'Организация',
		specialties: '13.666 Хирургия',
		number: '№1.1.2.77.2.45-04/10/2022',
		date: '02.09.2022',
		type: 'Пролонгация 1 год. Потом бессрочный',
		term: 'Бессрочный',
		code: 'Ортодонтия',
		juridical: 'ул. Оренбургский тракт, 138, Казань, Респ. Татарстан',
		actual: 'ул. Оренбургский тракт, 138, Казань, Респ. Татарстан',
		quantity: '150',
		contract: '#',
		agreement: '#'
	},
	{
		key: '3',
		organizations: 'Медико-санитарная часть ФГАОУ ВО КФУ',
		specialties: '13.676 Ортодонтия',
		number: '№1.1.2.77.2.45-04/10/2022',
		date: '02.09.2022',
		type: 'Пролонгация 1 год. Потом бессрочный',
		term: 'Бессрочный',
		code: 'Ортодонтия',
		juridical: 'ул. Оренбургский тракт, 138, Казань, Респ. Татарстан',
		actual: 'ул. Оренбургский тракт, 138, Казань, Респ. Татарстан',
		quantity: '150',
		contract: '#',
		agreement: '#'
	},
	{
		key: '4',
		organizations: 'Медико-санитарная часть ФГАОУ ВО КФУ',
		specialties: '14.555 Стоматология',
		number: '№1.1.2.77.2.45-04/10/2022',
		date: '02.09.2022',
		type: 'Пролонгация 1 год. Потом бессрочный',
		term: 'Бессрочный',
		code: 'Ортодонтия',
		juridical: 'ул. Оренбургский тракт, 138, Казань, Респ. Татарстан',
		actual: 'ул. Оренбургский тракт, 138, Казань, Респ. Татарстан',
		quantity: '150',
		contract: '#',
		agreement: '#'
	}
]
const columns: TableProps<DataType>['columns'] = [
	{
		title: 'Наименование организации',
		dataIndex: 'organizations',
		key: 'organizations'
	},
	{
		title: 'Наименование специальности',
		dataIndex: 'specialties',
		key: 'specialties'
	},
	{
		title: 'Номер договора',
		dataIndex: 'number',
		key: 'number'
	},
	{
		title: 'Дата заключения договора',
		dataIndex: 'date',
		key: 'date'
	},
	{
		title: 'Тип договора',
		dataIndex: 'type',
		key: 'type'
	},
	{
		title: 'Срок действия договора',
		dataIndex: 'term',
		key: 'term'
	},
	{
		title: 'Шифр и наименование специальности',
		dataIndex: 'code',
		key: 'code'
	},
	{
		title: 'Юридический адрес организации',
		dataIndex: 'juridical',
		key: 'juridical'
	},
	{
		title: 'Фактический адрес организации',
		dataIndex: 'actual',
		key: 'actual'
	},
	{
		title: 'Количество мест',
		dataIndex: 'quantity',
		key: 'quantity'
	},
	{
		title: 'Ссылка на скан договора',
		dataIndex: 'contract',
		key: 'contract',
		render: item => (
			<Button type="text" size="large" icon={<LinkSvg />} href={item} />
		)
	},
	{
		title: 'Ссылка на доп. соглашение к договору',
		dataIndex: 'agreement',
		key: 'agreement',
		render: item => (
			<Button type="text" size="large" icon={<LinkSvg />} href={item} />
		)
	}
]

export const FinalPreview = ({ setIsFinalReview }: PropsType) => {
	return (
		<section className="container">
			<Space size={10}>
				<Button
					size="large"
					className="mt-1"
					icon={<ArrowLeftSvg className="w-4 h-4 cursor-pointer mt-1" />}
					type="text"
					onClick={() => setIsFinalReview(false)}
				/>
				<Typography.Text className="text-black text-3xl font-normal">
					Итоговый просмотр реестра
				</Typography.Text>
			</Space>
			<Row gutter={[16, 16]} className="mt-12">
				<Col span={2}>
					<Typography.Text>Сортировка</Typography.Text>
				</Col>
				<Col span={6}>
					<Select
						popupMatchSelectWidth={false}
						defaultValue="1"
						className="w-full"
						options={[{ value: '1', label: 'Все' }]}
					/>
				</Col>
				<Col flex={'auto'} />
				<Col span={6}>
					<Space className="w-full flex justify-end">
						<Button
							type="text"
							icon={<DownloadSvg />}
							className="flex items-center"
						>
							Скачать
						</Button>
						<Button
							type="text"
							icon={<PrinterSvg />}
							className="flex items-center"
						>
							Печать
						</Button>
					</Space>
				</Col>
			</Row>
			<Row gutter={[16, 16]} className="mt-4">
				<Col span={2}>
					<Typography.Text>Количество мест</Typography.Text>
				</Col>
				<Col span={2}>
					<Select
						popupMatchSelectWidth={false}
						defaultValue="1"
						className="w-full"
						options={[{ value: '1', label: '100' }]}
					/>
				</Col>
				<Col span={3} offset={1}>
					<Typography.Text>Дата заключения договора</Typography.Text>
				</Col>
				<Col span={4}>
					<DatePicker placeholder="" className="w-full"></DatePicker>
				</Col>
			</Row>
			<Row gutter={[16, 16]} className="mt-4">
				<Col span={4}>
					<Typography.Text>Наименование организации</Typography.Text>
				</Col>
				<Col span={8}>
					<Select
						popupMatchSelectWidth={false}
						defaultValue="1"
						className="w-full"
						options={[
							{
								value: '1',
								label: 'Лечебно-профилактическое учреждение по договору'
							}
						]}
					/>
				</Col>
			</Row>
			<Row gutter={[16, 16]} className="mt-4">
				<Col span={4}>
					<Typography.Text>Наименование специальности</Typography.Text>
				</Col>
				<Col span={8}>
					<Select
						popupMatchSelectWidth={false}
						defaultValue="1"
						className="w-full"
						options={[
							{
								value: '1',
								label: '31.08.01 Акушерство и гинекология'
							}
						]}
					/>
				</Col>
			</Row>
			<Row gutter={[16, 16]} className="mt-4">
				<Col span={2}>
					<Typography.Text>Тип договора</Typography.Text>
				</Col>
				<Col span={4}>
					<Select
						popupMatchSelectWidth={false}
						defaultValue="1"
						className="w-full"
						options={[
							{
								value: '1',
								label: 'Бессрочный'
							}
						]}
					/>
				</Col>
			</Row>
			<Table
				columns={columns}
				dataSource={data}
				bordered
				pagination={false}
				className="my-10"
			/>
		</section>
	)
}
