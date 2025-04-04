import { PlusCircleFilled } from '@ant-design/icons'
import { Button, ConfigProvider, Form, Modal, Radio, Select } from 'antd'
import i18next, { t } from 'i18next'
import { useState } from 'react'

import { useGetCountriesQuery } from '../../../store/api/utilsApi'

export const AddEducationModal = () => {
	const { data: countries = [] } = useGetCountriesQuery(i18next.language)

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	const [form] = Form.useForm()

	return (
		<>
			<Button
				type="text"
				className="!pl-0 mt-[32px]"
				onClick={() => {
					setIsModalOpen(true)
				}}
			>
				<PlusCircleFilled className="!text-[28px]/[28px]" style={{ height: 28, width: 28, color: '#3073D7' }} />
				{t('addEducation')}
			</Button>
			<ConfigProvider>
				<Modal
					open={isModalOpen}
					footer={null}
					title={'Добавление образования'}
					onCancel={() => {
						setIsModalOpen(false)
					}}
				>
					<Form form={form} layout="vertical" requiredMark={false} className="w-full">
						<Form.Item name={'language'} label={t('publicationLanguage')}>
							<Radio.Group>
								<Radio value={'RU'}>{t('rus')}</Radio>
								<Radio value={'ENG'}>{t('eng')}</Radio>
							</Radio.Group>
						</Form.Item>
						<div className="flex w-full gap-[32px]">
							<Form.Item
								name={'educationLevelId'}
								label={t('educationLevel') + '*'}
								rules={[{ required: true, message: t('educationNotChosen') }]}
								className="w-full"
							>
								<Select
									options={countries.map(country => ({ value: country.id, label: country.shortName }))}
									placeholder="Выбрать"
								></Select>
							</Form.Item>
							<Form.Item name={'countryId'} label={t('countryEducation')} className="w-full">
								<Select
									options={countries.map(country => ({ value: country.id, label: country.shortName }))}
									placeholder="Выбрать"
								></Select>
							</Form.Item>
						</div>
						<Button htmlType="submit" type="primary" className="!rounded-[54.5px]">
							{t('Save')}
						</Button>
					</Form>
				</Modal>
			</ConfigProvider>
		</>
	)
}
