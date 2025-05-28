import { PlusCircleFilled } from '@ant-design/icons'
import { Button, Checkbox, ConfigProvider, DatePicker, Form, Input, Modal, Popover, Radio, Select, Upload } from 'antd'
import { FormInstance } from 'antd/lib'
import en_US from 'antd/locale/en_US'
import ru_RU from 'antd/locale/ru_RU'
import dayjs from 'dayjs'
import i18next, { t } from 'i18next'
import { useState } from 'react'

import {
	useAddNewAwardMutation,
	useAddNewEducationMutation,
	useGetEducationTypesQuery,
	useUpdateNewAwardMutation,
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

	const [addAward, addAwardStatus] = useAddNewAwardMutation()
	const [updateAward, updateAwardStatus] = useUpdateNewAwardMutation()

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
						onFinish={values => {
							console.log(values)
							let data = {
								languagePortal: values.language,
								award: values.award,
								docDate: dayjs(values.awardDocumentDate).format('DD.MM.YYYY'),
								awardDate: dayjs(values.awardDate).format('DD.MM.YYYY'),
								docNum: values.awardDocumentNumber,
								portalStatus: values.accept ? '1' : null,
								url: values.url,
								isModified: values.file && values.file.file ? true : false
							}
							let clearData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null))
							let jsonData = JSON.stringify(clearData)
							let blobData = new Blob([jsonData], { type: 'application/json' })
							const formData = new FormData()
							formData.append('data', blobData)
							values.file &&
								values.file.file &&
								values.file.file.originFileObj &&
								formData.append('file', values.file.file.originFileObj)
							props.type === 'ADD'
								? addAward(formData)
										.then(() => {
											props.form.resetFields()
											props.onCancel()
										})
										.catch(() => {
											console.log('??????')
										})
								: () => {
										updateAward(formData)
											.then(() => {
												props.form.resetFields()
												props.onCancel()
											})
											.catch(() => {
												console.log('??????')
											})
								  }
						}}
					>
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
								<DatePicker className="w-[47%]" maxDate={dayjs()} format="DD.MM.YYYY"></DatePicker>
							</Form.Item>
						</ConfigProvider>
						<Form.Item name={'awardDocumentNumber'} label={t('awardDocumentNumber')}>
							<Input className="w-full" placeholder={t('awardEnterPlaceholder')}></Input>
						</Form.Item>
						<ConfigProvider locale={i18next.language === 'ru' ? ru_RU : en_US}>
							<Form.Item name={'awardDocumentDate'} label={t('awardDocumentDate')}>
								<DatePicker className="w-[47%]" maxDate={dayjs()} format="DD.MM.YYYY"></DatePicker>
							</Form.Item>
						</ConfigProvider>
						<Form.Item name={'url'} className="mt-[18px]" label={<div className="flex gap-[10px]">{t('link')}</div>}>
							<Input placeholder="https://disk.yandex.ru"></Input>
						</Form.Item>
						<Form.Item
							name={'file'}
							label={<div className="flex gap-[10px]">{t('AttachDocuments')}</div>}
							valuePropName="defaultFileList"
							rules={[
								{
									validator: (_, value) => {
										if (
											value &&
											value.fileList &&
											value.fileList.length > 0 &&
											value.fileList[0].size > 5 * 1024 * 1024
										) {
											return Promise.reject(t('fileSizeError'))
										}
										return Promise.resolve()
									}
								}
							]}
						>
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
						<Button
							htmlType="submit"
							type="primary"
							className="!rounded-[54.5px]"
							loading={addAwardStatus.isLoading || updateAwardStatus.isLoading}
						>
							{t('Save')}
						</Button>
					</Form>
				</Modal>
			</ConfigProvider>
		</>
	)
}
