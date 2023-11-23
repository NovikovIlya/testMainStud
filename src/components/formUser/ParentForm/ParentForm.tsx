import {
	Button,
	ConfigProvider,
	DatePicker,
	Input,
	Select,
	Space,
	Typography
} from 'antd'
import enPicker from 'antd/locale/en_US'
import ruPicker from 'antd/locale/ru_RU'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/ru'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import uuid from 'react-uuid'

import { useAppSelector } from '../../../store'
import { useGetDocumentQuery } from '../../../store/api/utilsApi'
import {
	FIO,
	addParent,
	dateIssue,
	deleteParent,
	divisionCode,
	documentTypeId,
	eMail,
	inn,
	issuedBy,
	passportNumber,
	passportSeries,
	phone,
	registrationAddress,
	residenceAddress,
	snils
} from '../../../store/reducers/FormReducers/ParentReducer'
import { ImagesLayout } from '../ImagesLayout'

export const ParentForm = () => {
	const { t, i18n } = useTranslation()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	dayjs.locale(i18n.language)
	const parentData = useAppSelector(state => state.Parent)

	const { data: document } = useGetDocumentQuery()

	const handleCancel = () => {
		navigate('/form')
	}
	const handleOk = async () => {
		navigate('/user')
	}
	const handleSkip = () => {
		navigate('/user')
	}

	const handleAddParent = () => {
		dispatch(addParent(uuid()))
	}

	const handleDeleteParent = (id: string) => {
		dispatch(deleteParent(id))
	}

	return (
		<ImagesLayout>
			<div className="radio w-[624px] m-auto">
				<Space direction="vertical" size={'small'}>
					<Typography.Title ellipsis className="font-bold text-black text-sm">
						{t('infoParents')}
					</Typography.Title>
					{parentData.map(item => (
						<div key={item.id}>
							<Space direction="vertical" size={'small'} className="w-full">
								<Space>
									<Typography.Text className="font-bold text-black text-lg">
										{t('Parent')}
									</Typography.Text>
									<Typography.Text
										className=" text-black cursor-pointer"
										onClick={() => handleDeleteParent(item.id)}
									>
										{t('Delete')}
									</Typography.Text>
								</Space>
								<Space direction="vertical" size={2} className="w-full">
									<Typography.Text className=" text-black">
										{t('parentFIO')}
									</Typography.Text>
									<Input
										placeholder="Безухов Пьер Кириллович"
										size="large"
										maxLength={250}
										onChange={e => {
											dispatch(FIO({ id: item.id, FIO: e.target.value }))
										}}
										value={item.FIO}
									/>
								</Space>
								<Space direction="vertical" size={2} className="w-full">
									<Typography.Text className=" text-black">
										{t('parentPhone')}
									</Typography.Text>
									<Input
										placeholder="+7 999 898-88-00"
										size="large"
										onChange={e =>
											dispatch(phone({ id: item.id, phone: e.target.value }))
										}
										value={item.phone}
										maxLength={16}
									/>
								</Space>

								<Space direction="vertical" size={2} className="w-full">
									<Typography.Text className="text-black">
										{t('parentEmail')}
									</Typography.Text>
									<Input
										placeholder="BezuPr@gmail.com"
										size="large"
										onChange={e =>
											dispatch(eMail({ id: item.id, email: e.target.value }))
										}
										value={item.eMail}
									/>
								</Space>
							</Space>
							<Space direction="vertical" size="small" className="w-full mt-8">
								<Space direction="vertical" size={2} className="w-full">
									<Typography.Text className="font-bold text-black text-lg">
										{t('parentDocument')}
									</Typography.Text>
									<Typography.Text className="font-bold text-black">
										{t('documentType')}
									</Typography.Text>
									<Select
										className="w-full shadow rounded-lg"
										placeholder={t('documentType')}
										size="large"
										options={
											document !== undefined
												? document.map(el => ({
														value: el.id,
														label: el.type
												  }))
												: []
										}
										onChange={e =>
											dispatch(
												documentTypeId({ id: item.id, documentTypeId: e })
											)
										}
										value={item.documentTypeId}
									/>
								</Space>
								<Space direction="vertical" size={2} className="w-full">
									<Typography.Text className="font-bold text-black">
										{t('documentInfo')}
									</Typography.Text>
									<div className="grid grid-cols-2 w-full gap-4">
										<Space direction="vertical" size={2} className="w-full">
											<Typography.Text className=" text-black">
												{t('divisionCode')}
											</Typography.Text>
											<Input
												placeholder="000-000"
												maxLength={7}
												size="large"
												onChange={e =>
													dispatch(
														divisionCode({
															id: item.id,
															divisionCode: e.target.value
														})
													)
												}
												value={item.divisionCode}
											/>
										</Space>
										<Space direction="vertical" size={2} className="w-full">
											<Typography.Text className=" text-black">
												{t('whenIssued')}
											</Typography.Text>
											<ConfigProvider
												locale={i18n.language === 'ru' ? ruPicker : enPicker}
											>
												<DatePicker
													className="w-full"
													onChange={e =>
														dispatch(
															dateIssue({
																id: item.id,
																dateIssue:
																	e == null ? '' : e.format('YYYY-MM-DD')
															})
														)
													}
													size="large"
													placeholder={t('date')}
													format={'DD.MM.YYYY'}
													value={
														item.dateIssue
															? dayjs(
																	item.dateIssue.split('-').reverse().join('.'),
																	'DD.MM.YYYY'
															  )
															: null
													}
												/>
											</ConfigProvider>
										</Space>
										<Space direction="vertical" size={2} className="w-full">
											<Typography.Text className=" text-black">
												{t('series')}
											</Typography.Text>
											<Input
												placeholder="0000"
												size="large"
												onChange={e =>
													dispatch(
														passportSeries({
															id: item.id,
															passportSeries: e.target.value
														})
													)
												}
												value={item.passportSeries}
												maxLength={4}
											/>
										</Space>
										<Space direction="vertical" size={2} className="w-full">
											<Typography.Text className=" text-black">
												{t('number')}
											</Typography.Text>
											<Input
												placeholder="0000"
												size="large"
												maxLength={4}
												onChange={e =>
													dispatch(
														passportNumber({
															id: item.id,
															passportNumber: e.target.value
														})
													)
												}
												value={item.passportNumber}
											/>
										</Space>
									</div>
								</Space>
								<Space direction="vertical" size={2} className="w-full">
									<Typography.Text className=" text-black">
										{t('issuedWhom')}
									</Typography.Text>
									<Input
										placeholder={t('location')}
										maxLength={200}
										size="large"
										onChange={e =>
											dispatch(
												issuedBy({ id: item.id, issuedBy: e.target.value })
											)
										}
										value={item.issuedBy}
									/>
								</Space>
							</Space>
							<Space direction="vertical" size={2} className="w-full mt-8">
								<Space direction="vertical" size={2} className="w-full">
									<Typography.Text className="font-bold text-black">
										{t('additionalDocuments')}
									</Typography.Text>
									<Typography.Text className=" text-black">
										{t('snils')}
									</Typography.Text>
									<Input
										placeholder="000-000-000 00"
										size="large"
										onChange={e =>
											dispatch(snils({ id: item.id, snils: e.target.value }))
										}
										value={item.snils}
										maxLength={14}
									/>
								</Space>
								<Space direction="vertical" size={2} className="w-full">
									<Typography.Text className=" text-black">
										{t('inn')}
									</Typography.Text>
									<Input
										placeholder="000000000000"
										maxLength={12}
										size="large"
										className="mt-2"
										onChange={e =>
											dispatch(inn({ id: item.id, inn: e.target.value }))
										}
										value={item.inn}
									/>
								</Space>
								<Space direction="vertical" size={2} className="w-full mt-8">
									<Typography.Text className="font-bold text-black text-lg">
										{t('adress')}
									</Typography.Text>
									<Typography.Text className=" text-black">
										{t('RegAdress')}
									</Typography.Text>
									<Input
										placeholder={t('AdressLocation')}
										size="large"
										maxLength={400}
										onChange={e =>
											dispatch(
												registrationAddress({
													id: item.id,
													registrationAddress: e.target.value
												})
											)
										}
										value={item.registrationAddress}
									/>
								</Space>
								<Space direction="vertical" size={2} className="w-full">
									<Typography.Text className=" text-black">
										{t('ResidenseAdress')}
									</Typography.Text>
									<Input
										placeholder={t('AdressLocation')}
										size="large"
										maxLength={400}
										onChange={e =>
											dispatch(
												residenceAddress({
													id: item.id,
													residenceAddress: e.target.value
												})
											)
										}
										value={item.residenceAddress}
									/>
								</Space>
							</Space>
						</div>
					))}
				</Space>
				<Space
					className="flex items-center w-full mt-8"
					direction="vertical"
					size={'small'}
				>
					<Button
						className="rounded-full text-center p-0 w-8 h-8 text-xl m-auto"
						type="primary"
						onClick={handleAddParent}
					>
						+
					</Button>
				</Space>
				<Space
					direction="vertical"
					size={'small'}
					className="w-full flex items-center"
				>
					<div className="w-full flex justify-center items-center gap-8 mt-[60px]">
						<Button
							onClick={handleCancel}
							type="default"
							className="w-[200px] h-[50px] font-bold rounded-full border-[#3073D7] text-[#3073D7]"
						>
							{t('back')}
						</Button>
						<Button
							onClick={handleOk}
							type="primary"
							className="w-[200px] h-[50px] rounded-full"
						>
							{t('next')}
						</Button>
					</div>
					<Button
						onClick={handleSkip}
						type="text"
						className="rounded-full w-[200px] font-bold h-[50px] mt-8 self-center"
					>
						{t('fillLater')}
					</Button>
				</Space>
			</div>
		</ImagesLayout>
	)
}
