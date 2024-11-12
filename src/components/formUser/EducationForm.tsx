import { Form, Space, Typography } from 'antd'
import { Button, DatePicker, Input, Select } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import uuid from 'react-uuid'

import { useAppSelector } from '../../store'
import {
	useGetCountriesQuery,
	useGetEducationLevelQuery
} from '../../store/api/utilsApi'
import {
	addEducation,
	countryId,
	documentNumber,
	documentSeries,
	educationLevelId,
	graduateYear,
	idDelete,
	nameOfInstitute,
	specialization
} from '../../store/reducers/FormReducers/EducationReducer'
import { blue307 } from '../../utils/color'

import { ImagesLayout } from './ImagesLayout'
import { usePostEducationMutation } from '../../store/api/formApi'

export const EducationForm = () => {
	const dispatch = useDispatch()
	const userRole = useAppSelector(state => state.auth.user?.roles[0].type)
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()
	const { data: educationLevel } = useGetEducationLevelQuery(i18n.language)
	const { data: countries } = useGetCountriesQuery(i18n.language)
	const educationData = useAppSelector(state => state.Education)
	const [postEducation] = usePostEducationMutation()
	const handleAddEducation = () => {
		dispatch(addEducation(uuid()))
	}
	const handleDeleteEducation = (id: string) => {
		dispatch(idDelete(id))
	}
	const handleCancel = () => {
		navigate('/documents')
	}
	const handleOk = async () => {
		const data={
			
		}
		if (userRole === 'SEEKER') navigate('/work')
		else navigate('/user')
	}
	const handleSkip = () => {
		navigate('/user')
	}
	return (
		<ImagesLayout>
			<Form>
			<div className="w-full flex justify-center  text-sm">
				<div className="container max-w-2xl flex flex-col  pч-5">
					<h3 className="self-start text-xl">{t('education')}</h3>
					<div className="flex flex-col gap-10 w-full">
						{educationData.map((item, index) => (
							<div key={item.id}>
								<Space>
									<Typography.Text ellipsis className="font-bold mr-3">
										{t('educationDocument')}
									</Typography.Text>
									<Typography.Text
										onClick={() => {
											handleDeleteEducation(item.id)
										}}
										className={clsx(
											'cursor-pointer opacity-40 text-center text-black text-sm font-normal leading-[18px] mr-3',
											index === 0 && 'hidden'
										)}
									>
										{t('Delete')}
									</Typography.Text>
								</Space>
								<div className="grid grid-cols-2 gap-10 mt-5 w-full max-sm:grid-cols-1 max-sm:gap-4">
									<div>
										<p>{t('higherEducational')}</p>

										<Form.Item name={'educationLevelId'}>
										<Select
											className="w-full mt-2"
											size="large"
											defaultValue={item.educationLevelId}
											value={item.educationLevelId}
											options={
												!educationLevel
													? []
													: educationLevel.map(el => ({
															value: el.id,
															label: el.name
													  }))
											}
											onChange={e =>
												dispatch(
													educationLevelId({ id: item.id, educationLevelId: e })
												)
											}
										/>
										</Form.Item>
									</div>
									<div>
										<p>{t('countryEducation')}</p>

										<Form.Item name={'studentCountry'}>
										<Select
											className="w-full mt-2"
											size="large"
											onChange={e =>
												dispatch(
													countryId({
														id: item.id,
														countryId: e
													})
												)
											}
											options={
												countries === undefined
													? []
													: countries.map(el => ({
															value: el.id,
															label: el.shortName
													  }))
											}
											value={item.countryId}
										/>
										</Form.Item>
									</div>
								</div>
								<p className="mt-4 self-start">{t('nameEducational')}</p>
								<div className="mt-2">
									<Form.Item name={'nameOfInstitute'}>
									<Input
										placeholder={t('kfu')}
										maxLength={250}
										size="large"
										value={item.nameOfInstitute}
										onChange={e =>
											dispatch(
												nameOfInstitute({
													id: item.id,
													nameOfInstitute: e.target.value
												})
											)
										}
									/>
									</Form.Item>
								</div>
								<div className="grid grid-cols-2 mt-4 gap-x-10 gap-y-4 w-full max-sm:gap-5">
									<div>
										<p>{t('diplomaSeries')}</p>
										<div className="mt-2">
											<Form.Item name={'documentSeries'}>
											<Input
												placeholder="0000"
												size="large"
												maxLength={4}
												value={item.documentSeries}
												onChange={e =>
													dispatch(
														documentSeries({
															id: item.id,
															documentSeries: e.target.value
														})
													)
												}
											/>
											</Form.Item>
										</div>
									</div>
									<div>
										<p>{t('diplomaNumber')}</p>
										<div className="mt-2">
											<Form.Item name={'documentNumber'}><Input
												placeholder="0000"
												size="large"
												maxLength={4}
												value={item.documentNumber}
												onChange={e =>
													dispatch(
														documentNumber({
															id: item.id,
															documentNumber: e.target.value
														})
													)
												}
											/></Form.Item>
										</div>
									</div>
									<div>
										<p>{t('graduateYear')}</p>
										<div className="mt-2">
											<Form.Item name={'graduateYear'}>
												<DatePicker
												className="w-full"
												onChange={e => {
													dispatch(
														graduateYear({
															id: item.id,
															graduateYear:
																e == null ? '' : e.format('YYYY').toString()
														})
													)
												}}
												size="large"
												placeholder={new Date().getFullYear().toString()}
												picker="year"
												value={
													item.graduateYear !== ''
														? dayjs(item.graduateYear, 'YYYY')
														: null
												}
											/></Form.Item>
										</div>
									</div>
									<div>
										<p>{t('specialization')}</p>
										<div className="mt-2">
											<Form.Item name={'specialization'}>
											<Input
												placeholder={t('webDesign')}
												size="large"
												className="w-full"
												value={item.specialization}
												onChange={e =>
													dispatch(
														specialization({
															id: item.id,
															specialization: e.target.value
														})
													)
												}
											/>
											</Form.Item>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="mt-10 flex flex-col items-center">
						<Button
							className="rounded-full text-center p-0 w-8 h-8 text-xl"
							type="primary"
							onClick={handleAddEducation}
						>
							+
						</Button>
						<p className="opacity-40 text-sm mt-2">{t('add')}</p>
						<p className="opacity-40 text-sm lowercase">{t('education')}</p>
					</div>
					<div className="w-full flex justify-center items-center gap-8 mt-[60px]">
						<Button
							onClick={handleCancel}
							type="default"
							className={`w-[200px] h-[50px] font-bold rounded-full border-[${blue307}] text-[${blue307}]`}
						>
							{t('back')}
						</Button>
						<Button
							onClick={handleOk}
							type="primary"
							className="w-[200px] font-bold h-[50px] rounded-full"
						>
							{t('next')}
						</Button>
					</div>
					<div className="w-full flex justify-center">
						<Button
							onClick={handleSkip}
							type="text"
							className="rounded-full w-[200px]  h-[50px] mt-8"
						>
							{t('fillLater')}
						</Button>
					</div>
				</div>
			</div>
			</Form>
		</ImagesLayout>
	)
}
