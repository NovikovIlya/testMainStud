import {
	Button,
	ConfigProvider,
	DatePicker,
	Form,
	Input,
	Modal,
	Radio,
	Select
} from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { EditSvg } from '../../../assets/svg/EditSvg'
import { useAppSelector } from '../../../store'
import { useGetCountriesQuery } from '../../../store/api/utilsApi'

import ArrowIcon from './ArrowIcon'

export const ResponseForm = () => {
	const { t, i18n } = useTranslation()
	const { data: countries, isLoading: isLoadingCountry } = useGetCountriesQuery(
		i18n.language
	)
	const [isFormOpen, setIsFormOpen] = useState(false)
	const [isAllDataSet, setIsAllDataSet] = useState(false)

	const user = useAppSelector(state => state.auth.user)
	const formData = useAppSelector(state => state.Form)
	const { currentVacancy } = useAppSelector(state => state.currentVacancy)

	const [gender, setGender] = useState<string>(formData.gender)
	const [name, setName] = useState(user?.firstname)
	const [surname, setSurname] = useState(user?.lastname)
	const [patronymic, setPatronymic] = useState(user?.middlename)
	const [birthday, setBirthday] = useState<dayjs.Dayjs>(
		dayjs(user?.birthday.split('.').join('-'), 'DD-MM-YYYY')
	)
	const [countryId, setCountryId] = useState(formData.countryId)
	const [phone, setPhone] = useState(user?.phone)
	const [email, setEmail] = useState(user?.email)

	const { pathname } = useLocation()
	const navigate = useNavigate()

	return (
		<>
			<Button
				type="primary"
				onClick={() => {
					navigate('/services/jobseeker/vacancyview/respond/main')
					setIsFormOpen(true)
				}}
			>
				Откликнуться
			</Button>

			<ConfigProvider
				theme={{
					token: {
						boxShadow: '0 0 19px 0 rgba(212, 227, 241, 0.6)'
					}
				}}
			>
				<Modal
					bodyStyle={{
						paddingBottom: 52,
						paddingLeft: 52,
						paddingRight: 52,
						paddingTop: 52
					}}
					width={622}
					className="pr-[52px] pl-[52px] pb-[52px]"
					open={isFormOpen}
					title={null}
					footer={null}
					onCancel={() => {
						setIsFormOpen(false)
						navigate('/services/jobseeker/vacancyview')
					}}
				>
					{pathname.includes(
						'/services/jobseeker/vacancyview/respond/main'
					) && (
						<>
							<p className="font-content-font text-black text-[18px]/[21.6px] font-normal">
								Откликнуться на вакансию
							</p>
							<p className="font-content-font text-black text-[18px]/[21.6px] font-bold">
								{currentVacancy?.title.rendered}
							</p>
							<p className="mt-[36px] font-content-font text-black text-[18px]/[21.px] font-normal">
								Чтобы отправить отклик, необходимо заполнить следующие данные:
							</p>
							<div className="mt-[36px] flex flex-col gap-[12px]">
								<div
									onClick={() => {
										navigate('/services/jobseeker/vacancyview/respond/aboutme')
									}}
									className="h-[43px] pl-[16px] pr-[16px] flex justify-between items-center border-[1px] border-dashed border-blue1f5 rounded-[5px] cursor-pointer"
								>
									<p className="font-content-font text-black text-[16px]/[19.2px] font-bold select-none">
										Личные данные
									</p>
									<EditSvg />
								</div>
								<div
									onClick={() => {
										navigate(
											'/services/jobseeker/vacancyview/respond/education'
										)
									}}
									className="h-[43px] pl-[16px] pr-[16px] flex justify-between items-center border-[1px] border-dashed border-blue1f5 rounded-[5px] cursor-pointer"
								>
									<p className="font-content-font text-black text-[16px]/[19.2px] font-bold select-none">
										Образование
									</p>
									<EditSvg />
								</div>
								<div
									onClick={() => {
										navigate(
											'/services/jobseeker/vacancyview/respond/experience'
										)
									}}
									className="h-[43px] pl-[16px] pr-[16px] flex justify-between items-center border-[1px] border-dashed border-blue1f5 rounded-[5px] cursor-pointer"
								>
									<p className="font-content-font text-black text-[16px]/[19.2px] font-bold select-none">
										Опыт работы
									</p>
									<EditSvg />
								</div>
								<div
									onClick={() => {
										navigate('/services/jobseeker/vacancyview/respond/skills')
									}}
									className="h-[43px] pl-[16px] pr-[16px] flex justify-between items-center border-[1px] border-dashed border-blue1f5 rounded-[5px] cursor-pointer"
								>
									<p className="font-content-font text-black text-[16px]/[19.2px] font-bold select-none">
										Профессиональные навыки
									</p>
									<EditSvg />
								</div>
								<Button
									className="w-[103px] ml-auto mt-[40px] rounded-[54.5px]"
									type="primary"
								>
									Дальше
								</Button>
							</div>
						</>
					)}
					{pathname.includes(
						'/services/jobseeker/vacancyview/respond/aboutme'
					) && (
						<Form
							layout="vertical"
							requiredMark={false}
							initialValues={{
								gender: formData.gender,
								name: user?.firstname,
								surname: user?.lastname,
								patronymic: user?.middlename,
								birthDay: dayjs(
									user?.birthday.split('.').join('-'),
									'DD.MM.YYYY'
								),
								country: formData.countryId,
								phoneNumber: user?.phone,
								email: user?.email
							}}
							onFinish={(values: { name: string; surname: string }) => {
								console.log(values)
							}}
						>
							<div className="flex items-center mb-[38px]">
								<button
									onClick={() => {
										navigate('/services/jobseeker/vacancyview/respond/main')
									}}
									className="bg-white h-[38px] w-[46px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] rounded-[50px] border border-black cursor-pointer"
								>
									<ArrowIcon />
								</button>
								<p className="ml-[15px] font-content-font font-bold text-black text-[18px]/[21.6px]">
									Личные данные
								</p>
							</div>
							<Form.Item
								name={'gender'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Пол
									</label>
								}
								rules={[{ required: true, message: 'Не выбран пол' }]}
							>
								<Radio.Group
									value={gender}
									onChange={e => setGender(e.target.value)}
								>
									<Radio value={'M'}>Мужской</Radio>
									<Radio value={'W'}>Женский</Radio>
								</Radio.Group>
							</Form.Item>
							<Form.Item
								name={'surname'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Фамилия
									</label>
								}
								rules={[
									{ required: true, message: 'Поле фамилии не заполнено' }
								]}
							>
								<Input
									value={surname}
									onChange={e => setSurname(e.target.value)}
								></Input>
							</Form.Item>
							<Form.Item
								name={'name'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Имя
									</label>
								}
								rules={[{ required: true, message: 'Поле имени не заполнено' }]}
							>
								<Input
									value={name}
									onChange={e => setName(e.target.value)}
								></Input>
							</Form.Item>
							<Form.Item
								name={'patronymic'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Отчество
									</label>
								}
								rules={[
									{ required: true, message: 'Поле отчества не заполнено' }
								]}
							>
								<Input
									value={patronymic}
									// onChange={e => setPatronymic(e.target.value)}
								></Input>
							</Form.Item>
							<Form.Item
								name={'birthDay'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Дата рождения
									</label>
								}
								rules={[
									{ required: true, message: 'Не введена дата рождения' }
								]}
							>
								<DatePicker
									format={'DD-MM-YYYY'}
									value={birthday}
									className="w-full"
									// onChange={(e, _) => {
									// 	setBirthday(e)
									// }}
								></DatePicker>
							</Form.Item>
							<Form.Item
								name={'country'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Страна гражданства
									</label>
								}
								rules={[{ required: true, message: 'Не выбрана страна' }]}
							>
								<Select
									className="w-full rounded-lg"
									value={countryId}
									// onChange={e => dispatch(country(e))}
									options={
										countries === undefined
											? []
											: countries.map(el => ({
													value: el.id,
													label: el.shortName
											  }))
									}
								/>
							</Form.Item>
							<Form.Item
								name={'phoneNumber'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Телефон
									</label>
								}
								rules={[
									{
										required: true,
										message: 'Поле номера телефона не заполнено'
									}
								]}
							>
								<Input
									value={phone}
									onChange={e => {
										setPhone(e.target.value)
									}}
								></Input>
							</Form.Item>
							<Form.Item
								name={'email'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Электронная почта
									</label>
								}
								rules={[
									{
										required: true,
										message: 'Поле электронной почты не заполнено'
									}
								]}
							>
								<Input
									value={email}
									onChange={e => {
										setEmail(e.target.value)
									}}
								></Input>
							</Form.Item>
							<div style={{ textAlign: 'right', marginTop: 40 }}>
								<Button type="primary" htmlType="submit">
									Сохранить
								</Button>
							</div>
						</Form>
					)}
					{pathname.includes(
						'/services/jobseeker/vacancyview/respond/education'
					) && <></>}
					{pathname.includes(
						'/services/jobseeker/vacancyview/respond/experience'
					) && <></>}
					{pathname.includes(
						'/services/jobseeker/vacancyview/respond/skills'
					) && <></>}
				</Modal>
			</ConfigProvider>
		</>
	)
}
