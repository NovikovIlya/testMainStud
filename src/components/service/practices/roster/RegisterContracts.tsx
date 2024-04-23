import { Button, Col, List, Row, Select, Space, Typography } from 'antd'
import { useEffect, useState } from 'react'

import { DeleteSvg } from '../../../../assets/svg/DeleteSvg'
import { DownloadSvg } from '../../../../assets/svg/DownloadSvg'
import { EditSvg } from '../../../../assets/svg/EditSvg'
import { PrinterSvg } from '../../../../assets/svg/PrinterSvg'
import {
	useDeleteContractMutation,
	useGetContractsQuery
} from '../../../../store/api/practiceApi/taskService'

import { EditContract } from './EditContract'

type PropsType = {
	setIsCreate: (value: boolean) => void
	setIsPreview: (value: boolean) => void
	setIsFinalReview: (value: boolean) => void
	setEdit: (value: string) => void
	setPreview: (value: string) => void
}

export const RegisterContracts = ({
									  setIsCreate,
									  setIsPreview,
									  setIsFinalReview,
									  setEdit,
									  setPreview
								  }: PropsType) => {
	const [deleteContract] = useDeleteContractMutation()
	const { data } = useGetContractsQuery({ page: 0, size: 20, sort: [''] })
	const [tableData, setTableData] = useState(data?.content)
	const [filters, setFilters] = useState<{
		type: string
		spec: string
		name: string
	}>({ type: '', spec: '', name: '' })

	useEffect(() => {
		setTableData(data?.content)
	}, [data])

	const filter = (value: string, index: string) => {
		setFilters(prev => ({ ...prev, [index]: value }))
	}

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

	const deleteContractOnClick = (id: string) => {
		deleteContract(id).unwrap()
	}

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
						dataSource={tableData}
						renderItem={item => (
							<List.Item className="bg-white mb-3">
								<Space size={40} className="max-w-xs min-w-[300px]">
									<Typography.Text>{item.contractFacility}</Typography.Text>
									<Button
										type="text"
										icon={<EditSvg />}
										onClick={() => setEdit(item.id)}
									/>
								</Space>
								<Typography.Text>{item.dateConclusionContract}</Typography.Text>
								<Typography.Text>{item.contractType}</Typography.Text>
								<Space>
									<Button type="text" icon={<DownloadSvg />} />
									<Button type="text" icon={<PrinterSvg />} />
								</Space>
								<Space size={40}>
									<Button
										className="!rounded-full"
										onClick={() => {
											setIsPreview(true)
											setPreview(item.id)
										}}
									>
										Режим просмотра
									</Button>
									<Button
										type="text"
										icon={<DeleteSvg />}
										value={item.id}
										onClick={() => deleteContractOnClick(item.id)}
									/>
								</Space>
							</List.Item>
						)}
					/>
				</Col>
			</Row>
		</section>
	)
}
