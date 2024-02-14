import { Button, Col, List, Row, Select, Space, Typography } from 'antd'

import { DeleteSvg } from '../../../../assets/svg/DeleteSvg'
import { DownloadSvg } from '../../../../assets/svg/DownloadSvg'
import { EditSvg } from '../../../../assets/svg/EditSvg'
import { PrinterSvg } from '../../../../assets/svg/PrinterSvg'

const data = [
	{
		name: 'Лечебно-профилактическое учреждение по договору',
		date: '00.00.00, 00:00',
		type: 'Бессрочный'
	},
	{
		name: 'Лечебно-профилактическое учреждение по договору',
		date: '00.00.00, 00:00',
		type: 'С пролонгацией'
	}
]

type PropsType = {
	setIsCreate: (value: boolean) => void
	setIsPreview: (value: boolean) => void
	setIsFinalReview: (value: boolean) => void
}

export const RegisterContracts = ({
	setIsCreate,
	setIsPreview,
	setIsFinalReview
}: PropsType) => {
	return (
		<section className="container">
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<Typography.Text className=" text-[28px] mb-14">
						Реестр договоров
					</Typography.Text>
				</Col>
			</Row>

			<Row className="mt-12">
				<Col span={2}>
					<Typography.Text>Сортировка</Typography.Text>
				</Col>
				<Col span={8}>
					<Select
						popupMatchSelectWidth={false}
						defaultValue="1"
						className="w-full"
						options={[{ value: '1', label: 'Все' }]}
					/>
				</Col>
				<Col span={8} offset={6}>
					<Space className="w-full flex-row-reverse">
						<Button
							className="!rounded-full"
							onClick={() => setIsFinalReview(true)}
						>
							Посмотреть итоговый реестр
						</Button>
						<Button
							type="primary"
							className="!rounded-full"
							onClick={() => setIsCreate(true)}
						>
							Создать договор
						</Button>
					</Space>
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
						options={[{ value: '1', label: 'Бессрочный' }]}
					/>
				</Col>
			</Row>
			<Row gutter={[16, 16]} className="mt-4">
				<Col span={4}>
					<Typography.Text>Наименование организации</Typography.Text>
				</Col>
				<Col span={6}>
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
			<Row className="mt-4">
				<Col flex={'auto'}>
					<List
						size="large"
						header={
							<div className="w-full justify-between flex items-center">
								<Space size={40} className="max-w-xs min-w-[300px]">
									<Typography.Text>Наименование организации</Typography.Text>
									<Button
										type="text"
										icon={<EditSvg />}
										className="opacity-0"
									/>
								</Space>
								<Typography.Text>Дата заполнения</Typography.Text>
								<Typography.Text>Тип договора</Typography.Text>
								<Space className="opacity-0">
									<Button type="text" icon={<DownloadSvg />} />
									<Button type="text" icon={<PrinterSvg />} />
								</Space>
								<Space size={40} className="opacity-0">
									<Button className="!rounded-full">Режим просмотра</Button>
									<Button type="text" icon={<DeleteSvg />} />
								</Space>
							</div>
						}
						dataSource={data}
						renderItem={item => (
							<List.Item className="bg-white mb-3">
								<Space size={40} className="max-w-xs min-w-[300px]">
									<Typography.Text>{item.name}</Typography.Text>
									<Button
										type="text"
										icon={<EditSvg />}
										onClick={() => setIsCreate(true)}
									/>
								</Space>
								<Typography.Text>{item.date}</Typography.Text>
								<Typography.Text>{item.type}</Typography.Text>
								<Space>
									<Button type="text" icon={<DownloadSvg />} />
									<Button type="text" icon={<PrinterSvg />} />
								</Space>
								<Space size={40}>
									<Button
										className="!rounded-full"
										onClick={() => setIsPreview(true)}
									>
										Режим просмотра
									</Button>
									<Button type="text" icon={<DeleteSvg />} />
								</Space>
							</List.Item>
						)}
					/>
				</Col>
			</Row>
		</section>
	)
}
