import { Button, Col, Row, Space, Table, TableProps, Typography } from 'antd'
import React from 'react'

import { ArrowLeftSvg } from '../../../assets/svg'
import { DownloadSvg } from '../../../assets/svg/DownloadSvg'
import { PrinterSvg } from '../../../assets/svg/PrinterSvg'

type PropsType = {
	setIsPreview: (value: boolean) => void
	setIsCreate: (value: boolean) => void
	setIsFinalReview: (value: boolean) => void
}
interface DataType {
	key: string
	name: string
	medic: string
}
const data: DataType[] = [
	{
		key: '1',
		name: 'Номер договора',
		medic: '№1.1.2.77.2.45-04/10/2022'
	},
	{
		key: '2',
		name: 'Дата заключения договора',
		medic: '02.09.2022'
	},
	{
		key: '3',
		name: 'Тип договора',
		medic: 'Пролонгация 1 год. Потом бессрочный'
	},
	{
		key: '4',
		name: 'Срок действия договора',
		medic: 'Бессрочный'
	},
	{
		key: '5',
		name: 'Шифр и наименование специальности',
		medic: '12.456 Лечебное дело'
	},
	{
		key: '6',
		name: 'Юридический адрес организации',
		medic: 'ул. Оренбургский тракт, 138, Казань, Респ. Татарстан'
	},
	{
		key: '7',
		name: 'Фактический адрес организации ',
		medic: 'ул. Оренбургский тракт, 138, Казань, Респ. Татарстан'
	},
	{
		key: '8',
		name: 'Количество мест',
		medic: '150'
	},
	{
		key: '9',
		name: 'Ссылка на скан договора',
		medic: 'Скан договора.pdf'
	},
	{
		key: '10',
		name: 'Ссылка на дополнительное соглашение к договору',
		medic: 'ДопСоглашение.pdf'
	}
]
const columns: TableProps<DataType>['columns'] = [
	{
		title: 'Наименование организации договору',
		dataIndex: 'name',
		key: 'name',
		width: 400,
		render: (text: string) => <span>{text}</span>
	},
	{
		title: 'Медико-санитарная часть ФГАОУ ВО КФУ',
		dataIndex: 'medic',
		key: 'medic'
	}
]

export const PreviewContracts = ({
	setIsPreview,
	setIsCreate,
	setIsFinalReview
}: PropsType) => {
	return (
		<section className="container">
			<Space size={10}>
				<Button
					size="large"
					className="mt-1"
					icon={<ArrowLeftSvg className="w-4 h-4 cursor-pointer mt-1" />}
					type="text"
					onClick={() => setIsPreview(false)}
				/>
				<Typography.Text className="text-black text-3xl font-normal">
					Название
				</Typography.Text>
			</Space>

			<Row gutter={[16, 16]} className="mt-12">
				<Col span={7}>
					<Space>
						<Button
							type="text"
							size="large"
							icon={<DownloadSvg />}
							className="flex items-center"
						>
							Скачать
						</Button>
						<Button
							type="text"
							size="large"
							icon={<PrinterSvg />}
							className="flex items-center"
						>
							Печать
						</Button>
					</Space>
				</Col>
				<Col flex={'auto'} />
				<Col span={9}>
					<Space className="w-full flex-row-reverse">
						<Button
							size="large"
							className="!rounded-full"
							onClick={() => setIsFinalReview(true)}
						>
							Посмотреть итоговый реестр
						</Button>
						<Button
							size="large"
							type="primary"
							className="!rounded-full"
							onClick={() => setIsCreate(true)}
						>
							Создать договор
						</Button>
					</Space>
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
