import { Button, Col, List, Row, Select, Space, Typography } from 'antd'
import { useState } from 'react'

import {
	useGetDocumentsDocumentationQuery,
	useGetDocumentsLibrariesQuery,
	useGetDocumentsMyQuery,
	useGetDocumentsPracticeQuery,
	useGetDocumentsTemplatesQuery
} from '../../../store/api/serviceApi'

export const DocumentFlow = () => {
	const handleChange = (value: number) => {
		setType(value)
	}
	const { data: libraries } = useGetDocumentsLibrariesQuery()
	const { data: templates } = useGetDocumentsTemplatesQuery()
	const { data: practice } = useGetDocumentsPracticeQuery()
	const { data: myDocs } = useGetDocumentsMyQuery()
	const { data: documentation } = useGetDocumentsDocumentationQuery()

	const selectDataSours = () => {
		if (type === 1) return libraries
		else if (type === 2) return templates
		else if (type === 3) return practice
		else if (type === 4) return myDocs
		else {
			if (typeDocumentation === 'CorporateNetwork')
				return documentation?.links.CorporateNetwork
			else if (typeDocumentation === 'StudentCabinet')
				return documentation?.links.StudentCabinet
			else return documentation?.links.YandexServices
		}
	}
	const [type, setType] = useState(1)
	const [typeDocumentation, setTypeDocumentation] = useState('CorporateNetwork')
	return (
		<section className="m-14">
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<Typography.Text className=" text-[28px]">Документы</Typography.Text>
				</Col>
			</Row>
			<Row gutter={[16, 16]} className="mt-4">
				<Col xs={24} sm={24} md={18} lg={16} xl={12}>
					<Space direction="vertical" className="w-full">
						<Typography.Text>Выбрать тип документов</Typography.Text>
						<Select
							size="large"
							popupMatchSelectWidth={false}
							placeholder=""
							defaultValue={type}
							value={type}
							onChange={handleChange}
							className="w-full"
							options={[
								{ value: 1, label: 'Электронные библиотеки' },
								{ value: 2, label: 'Шаблоны документов' },
								{ value: 3, label: 'Документы по практике' },
								{ value: 4, label: 'Мои документы' },
								{ value: 5, label: 'Документация по работе в КС КФУ' }
							]}
						/>
					</Space>
				</Col>
			</Row>
			{type === 5 && (
				<Row gutter={[16, 16]} className="mt-4">
					<Col xs={24} sm={24} md={18} lg={16} xl={12}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>Выбрать тип документов</Typography.Text>
							<Select
								size="large"
								popupMatchSelectWidth={false}
								placeholder=""
								defaultValue={typeDocumentation}
								value={typeDocumentation}
								onChange={value => {
									setTypeDocumentation(value)
								}}
								className="w-full"
								options={[
									{ value: 'CorporateNetwork', label: 'Корпоративная сеть' },
									{ value: 'YandexServices', label: 'Сервисы Яндекс.360' },
									{ value: 'StudentCabinet', label: 'Кабинет студента' }
								]}
							/>
						</Space>
					</Col>
				</Row>
			)}
			{type === 1 && (
				<Row gutter={[16, 16]} className="mt-12">
					<Col xs={24} sm={24} md={18} lg={16} xl={12}>
						<Typography.Text>
							Для доступа к электронным библиотекам вне университета необходимо
							настроить на своем компьютере VPN-подключение к внутренней сети
							КФУ. Объяснение{' '}
						</Typography.Text>
						<Typography.Link
							className="!underline"
							href="https://kpfu.ru/portal/docs/F2100705556/VPN.pdf"
						>
							здесь.
						</Typography.Link>
					</Col>
				</Row>
			)}

			<Row className="mt-4">
				<Col span={24}>
					<List
						size="large"
						header={
							<div className="w-full justify-between flex items-center px-12">
								<Typography.Text>Название</Typography.Text>
								<Typography.Text>Ссылка</Typography.Text>
							</div>
						}
						dataSource={selectDataSours()}
						renderItem={(item, index) => (
							<List.Item key={item.link} className="bg-white mb-3">
								<Space size={'large'}>
									<Typography.Text>{++index}</Typography.Text>
									<Typography.Text>{item.resourceName}</Typography.Text>
								</Space>
								<Button
									type="default"
									className="rounded-full"
									href={item.link}
								>
									Скачать
								</Button>
							</List.Item>
						)}
					/>
				</Col>
			</Row>
		</section>
	)
}
