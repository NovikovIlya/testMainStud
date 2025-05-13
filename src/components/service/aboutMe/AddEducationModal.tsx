import { PlusCircleFilled } from '@ant-design/icons'
import { Button, Checkbox, ConfigProvider, DatePicker, Form, Input, Modal, Popover, Radio, Select, Upload } from 'antd'
import { FormInstance } from 'antd/lib'
import en_US from 'antd/locale/en_US'
import ru_RU from 'antd/locale/ru_RU'
import dayjs from 'dayjs'
import i18next, { t } from 'i18next'
import { useState } from 'react'

import {
	useAddNewEducationMutation,
	useGetEducationTypesQuery,
	useUpdateNewEducationMutation
} from '../../../store/api/serviceApi'
import { useGetCountriesQuery } from '../../../store/api/utilsApi'

export const AddEducationModal = (props: {
	form: FormInstance
	open: boolean
	onCancel: Function
	type: 'ADD' | 'UPDATE'
}) => {
	const { data: countries = [] } = useGetCountriesQuery(i18next.language)
	const { data: levels = { edu_types: [] } } = useGetEducationTypesQuery()

	const [addEducation, addEducationStatus] = useAddNewEducationMutation()
	const [updateEducation, updateEducationStatus] = useUpdateNewEducationMutation()

	return (
		<>
			<ConfigProvider>
				<Modal
					width={'35%'}
					open={props.open}
					footer={null}
					title={'Добавление образования'}
					onCancel={() => {
						props.onCancel()
					}}
				>
					<Form
						form={props.form}
						layout="vertical"
						requiredMark={false}
						className="w-full"
						onFinish={values => {
							console.log(values)
							let data = {
								language_portal: values.language,
								start_date: dayjs(values.beginningYear).format('DD.MM.YYYY'),
								end_date: dayjs(values.graduateYear).format('DD.MM.YYYY'),
								edu_level: values.educationLevelId,
								eduspeciality: values.specialization,
								organization: values.nameOfInstitute,
								edu_country: countries.find(country => country.id === values.countryId)?.shortName!,
								development: values.subdivision,
								qualification: values.qualification,
								issue_date: dayjs(values.issueDate).format('DD.MM.YYYY'),
								docnum: values.number,
								docseries: values.series,
								portal_status: values.accept ? '1' : null,
								id: values.id,
								s_id: values.s_id,
								e_id: values.e_id,
								user_allid: values.user_allid
							}
							let clearData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null))
							let jsonData = JSON.stringify(clearData)
							let blobData = new Blob([jsonData], { type: 'application/json' })
							const formData = new FormData()
							formData.append('data', blobData)
							values.file && formData.append('file', values.file.file.originFileObj)
							props.type === 'ADD'
								? addEducation(formData)
										.then(() => {
											props.form.resetFields()
											props.onCancel()
										})
										.catch(() => {
											console.log('??????')
										})
								: updateEducation(formData)
										.then(() => {
											props.form.resetFields()
											props.onCancel()
										})
										.catch(() => {
											console.log('??????')
										})
						}}
					>
						<Form.Item name={'id'} className="hidden"></Form.Item>
						<Form.Item name={'s_id'} className="hidden"></Form.Item>
						<Form.Item name={'e_id'} className="hidden"></Form.Item>
						<Form.Item name={'user_allid'} className="hidden"></Form.Item>
						<Form.Item name={'language'} label={t('publicationLanguage')} initialValue={1}>
							<Radio.Group>
								<Radio value={1}>{t('rus')}</Radio>
								<Radio value={2}>{t('eng')}</Radio>
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
									options={levels.edu_types.map(level => ({ value: level.id, label: level.name }))}
									placeholder={t('select')}
								></Select>
							</Form.Item>
							<Form.Item name={'countryId'} label={t('countryEducation')} className="w-full">
								<Select
									options={countries.map(country => ({ value: country.id, label: country.shortName }))}
									placeholder={t('select')}
								></Select>
							</Form.Item>
						</div>
						<Form.Item
							name={'nameOfInstitute'}
							label={t('nameEducational') + '*'}
							rules={[{ required: true, message: t('institutionNameNotEntered') }]}
						>
							<Input className="w-full"></Input>
						</Form.Item>
						<Form.Item name={'subdivision'} label={t('educationSubdivision')}>
							<Input className="w-full"></Input>
						</Form.Item>
						<div className="flex w-full gap-[32px]">
							<ConfigProvider locale={i18next.language === 'ru' ? ru_RU : en_US}>
								<Form.Item
									name={'beginningYear'}
									label={t('beginningYear') + '*'}
									rules={[{ required: true, message: t('beginningYearNotChosen') }]}
									className="w-full"
								>
									<DatePicker.YearPicker className="w-full" maxDate={dayjs()}></DatePicker.YearPicker>
								</Form.Item>
							</ConfigProvider>
							<ConfigProvider locale={i18next.language === 'ru' ? ru_RU : en_US}>
								<Form.Item
									name={'graduateYear'}
									label={t('graduateYear') + '*'}
									className="w-full"
									rules={[{ required: true, message: t('graduateYearNotChosen') }]}
								>
									<DatePicker.YearPicker className="w-full" maxDate={dayjs()}></DatePicker.YearPicker>
								</Form.Item>
							</ConfigProvider>
						</div>
						<div className="flex w-full gap-[32px]">
							<Form.Item name={'series'} label={t('documentSeries')} className="w-full">
								<Input></Input>
							</Form.Item>
							<Form.Item name={'number'} label={t('documentNumber')} className="w-full">
								<Input></Input>
							</Form.Item>
						</div>
						<Form.Item name={'specialization'} label={t('specialization')}>
							<Input className="w-full"></Input>
						</Form.Item>
						<Form.Item name={'qualification'} label={t('qualification')}>
							<Input className="w-full"></Input>
						</Form.Item>
						<ConfigProvider locale={i18next.language === 'ru' ? ru_RU : en_US}>
							<Form.Item name={'issueDate'} label={t('issueDate')}>
								<DatePicker className="w-[47%]" maxDate={dayjs()}></DatePicker>
							</Form.Item>
						</ConfigProvider>
						<Form.Item
							name={'file'}
							label={
								<div className="flex gap-[10px]">
									{t('AttachDocuments')}
									<Popover
										overlayClassName="p-[20px] w-[369px]"
										placement="right"
										arrow={false}
										content={
											<>
												<p>{t('addEducationPopover1')}</p>
												<p>
													{' '}
													<span className="font-bold">{t('addEducationPopover2')}</span>
													{t('addEducationPopover3')}
												</p>
											</>
										}
									>
										{' '}
										<p className="h-[18px] w-[18px] border border-black border-solid text-center content-center text-[12px]/[12px] opacity-40">
											?
										</p>
									</Popover>
								</div>
							}
						>
							<Upload
								customRequest={data => {
									const { file, onSuccess } = data
									onSuccess && onSuccess(file)
								}}
								maxCount={1}
								accept=".pdf"
							>
								<Button type="primary">{t('AddFile')}</Button>
							</Upload>
						</Form.Item>
						<Form.Item name={'accept'} valuePropName="checked">
							<Checkbox>{t('razrer')}</Checkbox>
						</Form.Item>
						<Button htmlType="submit" type="primary" className="!rounded-[54.5px]">
							{t('Save')}
						</Button>
					</Form>
				</Modal>
			</ConfigProvider>
		</>
	)
}
