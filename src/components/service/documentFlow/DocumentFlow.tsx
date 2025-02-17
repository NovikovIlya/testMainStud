import { Button, Col, List, Row, Select, Space, Typography } from 'antd'
import { useState } from 'react'

import {
	useGetDocumentsDocumentationQuery,
	useGetDocumentsLibrariesQuery,
	useGetDocumentsMyQuery,
	useGetDocumentsPracticeQuery,
	useGetDocumentsTemplatesQuery
} from '../../../store/api/serviceApi'
import { t } from 'i18next'

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
		<section className=" m-14">
			<Row gutter={[16, 16]}>
				<Col span={24}>
					{/* <Typography.Text className=" text-[28px]">Документы</Typography.Text> */}
				</Col>
			</Row>
			<Row gutter={[16, 16]} className="mt-4">
				<Col xs={24} sm={24} md={18} lg={16} xl={12}>
					<Space direction="vertical" className="w-full">
						<Typography.Text>{t('ChooseDocument')}</Typography.Text>
						<Select
							size="large"
							popupMatchSelectWidth={false}
							placeholder=""
							defaultValue={type}
							value={type}
							onChange={handleChange}
							className="w-full"
							options={[
								{ value: 1, label: t('electronicLibraries')},
								{ value: 2, label: t('documentTemplates')},
								{ value: 3, label: t('practicalDocuments') },
								{ value: 4, label: t('myDocuments')},
								{ value: 5, label: t('documentationForWork') }
							]}
						/>
					</Space>
				</Col>
			</Row>
			{type === 5 && (
				<Row gutter={[16, 16]} className="mt-4">
					<Col xs={24} sm={24} md={18} lg={16} xl={12}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>{t("seletctType")}</Typography.Text>
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
									{ value: 'CorporateNetwork', label: t('corporateNetwork') },
									{ value: 'YandexServices', label: t('Yandex 360 services') },
									{ value: 'StudentCabinet', label: t('Student services') }
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
							{t('bilio')}
							{' '}
						</Typography.Text>
						<Typography.Link
							className="!underline"
							href="https://kpfu.ru/portal/docs/F2100705556/VPN.pdf"
						>
							-{'>'}
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
								<Typography.Text>{t('title')}</Typography.Text>
								<Typography.Text>{t('link')}</Typography.Text>
							</div>
						}
						locale={{ emptyText: t('noData') }}
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
									{t('download')}
								</Button>
							</List.Item>
						)}
					/>
				</Col>
			</Row>
		</section>
	)
}
