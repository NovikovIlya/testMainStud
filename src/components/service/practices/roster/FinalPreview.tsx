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
import { useEffect, useState } from 'react'

import { ArrowLeftSvg } from '../../../../assets/svg'
import { DownloadSvg } from '../../../../assets/svg/DownloadSvg'
import { LinkSvg } from '../../../../assets/svg/LinkSvg'
import { PrinterSvg } from '../../../../assets/svg/PrinterSvg'
import { useGetContractsQuery } from '../../../../store/practiceApi/taskService'
import { IContractInfoFull } from '../../../../store/type'

type PropsType = {
	setIsFinalReview: (value: boolean) => void
}

export const FinalPreview = ({ setIsFinalReview }: PropsType) => {
	const { data } = useGetContractsQuery({ page: 0, size: 20, sort: [''] })
	const [tableData, setTableData] = useState(data?.content)
	const [filters, setFilters] = useState<{
		type: string
		spec: string
		name: string
	}>({ type: '', spec: '', name: '' })

	const filter = (value: string, index: string) => {
		setFilters(prev => ({ ...prev, [index]: value }))
	}

	useEffect(() => {
		setTableData(data?.content)
	}, [data])

	useEffect(() => {
		setTableData(
			data?.content?.filter(
				(x: any) =>
					x.contractType.includes(filters.type) &&
					x.specialtyName.includes(filters.spec) &&
					x.contractFacility.includes(filters.name)
			)
		)
	}, [filters])

	const columns: TableProps<IContractInfoFull>['columns'] = [
		{
			title: 'Наименование организации',
			dataIndex: 'contractFacility',
			key: 'contractFacility'
		},
		{
			title: 'Наименование специальности',
			dataIndex: 'specialtyName',
			key: 'specialtyName'
		},
		{
			title: 'Номер договора',
			dataIndex: 'contractNumber',
			key: 'contractNumber'
		},
		{
			title: 'Дата заключения договора',
			dataIndex: 'dateConclusionContract',
			key: 'dateConclusionContract'
		},
		{
			title: 'Тип договора',
			dataIndex: 'contractType',
			key: 'contractType'
		},
		{
			title: 'Срок действия договора',
			dataIndex: 'prolongation',
			key: 'prolongation'
		},
		{
			title: 'Юридический адрес организации',
			dataIndex: 'legalFacility',
			key: 'legalFacility'
		},
		{
			title: 'Фактический адрес организации',
			dataIndex: 'actualFacility',
			key: 'actualFacility'
		},
		{
			title: 'Количество мест',
			dataIndex: 'placeNumber',
			key: 'placeNumber'
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
	return (
		<section className="container">
			<Space size={10}>
				<Button
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
					<Typography.Text>Наименование специальности</Typography.Text>
				</Col>
				<Col span={8}>
					<Select
						popupMatchSelectWidth={false}
						defaultValue=""
						className="w-full"
						options={[
							{ value: '', label: 'Все' },
							{
								value: '31.08.01 Акушерство и гинекология',
								label: '31.08.01 Акушерство и гинекология'
							}
						]}
						onChange={value => filter(value, 'spec')}
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
					<Typography.Text>Тип договора</Typography.Text>
				</Col>
				<Col span={4}>
					<Select
						popupMatchSelectWidth={false}
						defaultValue=""
						className="w-full"
						options={[
							{ value: '', label: 'Все' },
							{ value: 'Бессрочный', label: 'Бессрочный' },
							{ value: 'С пролонгацией', label: 'С пролонгацией' }
						]}
						onChange={value => filter(value, 'type')}
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
						defaultValue=""
						className="w-full"
						options={[
							{ value: '', label: 'Все' },
							{
								value: 'Лечебно-профилактическое учреждение по договору',
								label: 'Лечебно-профилактическое учреждение по договору'
							}
						]}
						onChange={value => filter(value, 'name')}
					/>
				</Col>
			</Row>
			<Table
				columns={columns}
				dataSource={tableData}
				bordered
				pagination={false}
				className="my-10"
			/>
		</section>
	)
}
