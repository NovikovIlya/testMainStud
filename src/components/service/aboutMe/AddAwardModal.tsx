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

export const AddAwardModal = (props: {
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
					title={t('award')}
					onCancel={() => {
						props.onCancel()
					}}
				>
					<Form
						form={props.form}
						layout="vertical"
						requiredMark={false}
						className="w-full"
						// onFinish={values => {
						// 	let reader = new FileReader()
						// 	reader.onload = e => {
						// 		console.log(values)
						// 		console.log({ ...values, file: e.target?.result })
						// 		props.type === 'ADD'
						// 			? addEducation({
						// 					language_portal: values.language,
						// 					start_date: values.beginningYear,
						// 					end_date: values.graduateYear,
						// 					edu_level: values.educationLevelId,
						// 					eduspeciality: values.specialization,
						// 					organization: values.nameOfInstitute,
						// 					edu_country: countries.find(country => country.id === values.countryId)?.shortName!,
						// 					development: values.subdivision,
						// 					qualification: values.qualification,
						// 					issue_date: values.issueDate,
						// 					docnum: values.number,
						// 					docseries: values.series,
						// 					portal_status: values.accept ? '1' : null,
						// 					edu_file: [
						// 						{ filename: values.file.file.name, file_base64: String(e.target?.result).split(',')[1] }
						// 					]
						// 			  })
						// 					.then(() => {
						// 						props.form.resetFields()
						// 						props.onCancel()
						// 					})
						// 					.catch(() => {
						// 						console.log('??????')
						// 					})
						// 			: updateEducation({
						// 					language_portal: values.language,
						// 					start_date: dayjs(values.beginningYear).format('DD.MM.YYYY'),
						// 					end_date: dayjs(values.graduateYear).format('DD.MM.YYYY'),
						// 					edu_level: values.educationLevelId,
						// 					eduspeciality: values.specialization,
						// 					organization: values.nameOfInstitute,
						// 					edu_country: countries.find(country => country.id === values.countryId)?.shortName!,
						// 					development: values.subdivision,
						// 					qualification: values.qualification,
						// 					issue_date: dayjs(values.issueDate).format('DD.MM.YYYY'),
						// 					docnum: values.number,
						// 					docseries: values.series,
						// 					portal_status: values.accept ? '1' : null,
						// 					id: values.id,
						// 					s_id: values.s_id,
						// 					e_id: values.e_id,
						// 					user_allid: values.user_allid,
						// 					edu_file: [{ filename: values.file.file.name, file_base64: e.target?.result as string }]
						// 			  })
						// 					.then(() => {
						// 						props.form.resetFields()
						// 						props.onCancel()
						// 					})
						// 					.catch(() => {
						// 						console.log('??????')
						// 					})
						// 	}
						// 	values.file
						// 		? reader.readAsDataURL(values.file.file.originFileObj)
						// 		: props.type === 'ADD'
						// 		? addEducation({
						// 				language_portal: values.language,
						// 				start_date: dayjs(values.beginningYear).format('DD.MM.YYYY'),
						// 				end_date: dayjs(values.graduateYear).format('DD.MM.YYYY'),
						// 				edu_level: values.educationLevelId,
						// 				eduspeciality: values.specialization,
						// 				organization: values.nameOfInstitute,
						// 				edu_country: countries.find(country => country.id === values.countryId)?.shortName!,
						// 				development: values.subdivision,
						// 				qualification: values.qualification,
						// 				issue_date: dayjs(values.issueDate).format('DD.MM.YYYY'),
						// 				docnum: values.number,
						// 				docseries: values.series,
						// 				portal_status: values.accept ? '1' : null,
						// 				edu_file: [{ filename: null, file_base64: null }]
						// 		  })
						// 				.then(() => {
						// 					props.form.resetFields()
						// 					props.onCancel()
						// 				})
						// 				.catch(() => {
						// 					console.log('??????')
						// 				})
						// 		: updateEducation({
						// 				language_portal: values.language,
						// 				start_date: dayjs(values.beginningYear).format('DD.MM.YYYY'),
						// 				end_date: dayjs(values.graduateYear).format('DD.MM.YYYY'),
						// 				edu_level: values.educationLevelId,
						// 				eduspeciality: values.specialization,
						// 				organization: values.nameOfInstitute,
						// 				edu_country: countries.find(country => country.id === values.countryId)?.shortName!,
						// 				development: values.subdivision,
						// 				qualification: values.qualification,
						// 				issue_date: dayjs(values.issueDate).format('DD.MM.YYYY'),
						// 				docnum: values.number,
						// 				docseries: values.series,
						// 				portal_status: values.accept ? '1' : null,
						// 				id: values.id,
						// 				s_id: values.s_id,
						// 				e_id: values.e_id,
						// 				user_allid: values.user_allid,
						// 				edu_file: [{ filename: null, file_base64: null }]
						// 		  })
						// 				.then(() => {
						// 					props.onCancel()
						// 				})
						// 				.catch(() => {
						// 					console.log('??????')
						// 				})
						// }}
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
						<Form.Item
							name={'award'}
							label={t('award') + '*'}
							rules={[{ required: true, message: t('awardNameNotEntered') }]}
						>
							<Input className="w-full" placeholder={t('awardEnterPlaceholder')}></Input>
						</Form.Item>
						<ConfigProvider locale={i18next.language === 'ru' ? ru_RU : en_US}>
							<Form.Item
								name={'awardDate'}
								label={t('awardDate') + '*'}
								rules={[{ required: true, message: t('awardDateNotEntered') }]}
							>
								<DatePicker className="w-[47%]" maxDate={dayjs()}></DatePicker>
							</Form.Item>
						</ConfigProvider>
						<Form.Item name={'awardDocumentNumber'} label={t('awardDocumentNumber')}>
							<Input className="w-full" placeholder={t('awardEnterPlaceholder')}></Input>
						</Form.Item>
						<ConfigProvider locale={i18next.language === 'ru' ? ru_RU : en_US}>
							<Form.Item name={'awardDocumentDate'} label={t('awardDocumentDate')}>
								<DatePicker className="w-[47%]" maxDate={dayjs()}></DatePicker>
							</Form.Item>
						</ConfigProvider>
						<Form.Item name={'file'} label={<div className="flex gap-[10px]">{t('AttachDocuments')}</div>}>
							<Upload
								customRequest={data => {
									const { file, onSuccess } = data
									onSuccess && onSuccess(file)
								}}
								maxCount={1}
								accept=".pdf,.jpg,.png,.gif"
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
