import {
	Button,
	ConfigProvider,
	DatePicker,
	Form,
	Input,
	Modal,
	Radio,
	Select,
	Tag
} from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { EditSvg } from '../../../assets/svg/EditSvg'
import { useAppSelector } from '../../../store'
import {
	useGetCountriesQuery,
	useGetEducationLevelQuery
} from '../../../store/api/utilsApi'
import { allData } from '../../../store/reducers/SeekerFormReducers/AboutMeReducer'
import {
	completeAboutMe,
	completeEducation,
	completeSkills
} from '../../../store/reducers/SeekerFormReducers/FormCompletionReducer'
import { setAllData } from '../../../store/reducers/SeekerFormReducers/RespondEducationReducer'
import { allSkillsData } from '../../../store/reducers/SeekerFormReducers/SkillsReducer'

import ArrowIcon from './ArrowIcon'
import { CheckedIcon } from './CheckedIcon'

export const ResponseForm = () => {
	const { t, i18n } = useTranslation()
	const { data: countries, isLoading: isLoadingCountry } = useGetCountriesQuery(
		i18n.language
	)
	const { data: levels } = useGetEducationLevelQuery(i18n.language)
	const [isFormOpen, setIsFormOpen] = useState(false)
	const dispatch = useDispatch()

	const aboutMeData = useAppSelector(state => state.seekerAboutMe)
	const { currentVacancy } = useAppSelector(state => state.currentVacancy)
	const { aboutMeCompleted, skillsCompleted, educationCompleted } =
		useAppSelector(state => state.formCompletion)
	const skillsData = useAppSelector(state => state.skills)
	const educationData = useAppSelector(state => state.RespondEducation)

	const [currentFormskills, setcurrentFormSkills] = useState<string[]>(
		skillsData.skills
	)
	const [skillInputValue, setSkillInputValue] = useState<string>('')
	const date = new Date()

	const { pathname } = useLocation()
	const navigate = useNavigate()

	return (
		<>
			<Button
				type="primary"
				onMouseDown={e => {
					e.preventDefault()
				}}
				onClick={e => {
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
									{aboutMeCompleted ? <CheckedIcon /> : <EditSvg />}
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
									{educationCompleted ? <CheckedIcon /> : <EditSvg />}
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
									{skillsCompleted ? <CheckedIcon /> : <EditSvg />}
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
								gender: aboutMeData.gender,
								name: aboutMeData.name,
								surname: aboutMeData.surName,
								patronymic: aboutMeData.patronymic,
								birthDay: dayjs(
									aboutMeData.birthDay.split('.').join('-'),
									'DD.MM.YYYY'
								),
								country: aboutMeData.countryId,
								phoneNumber: aboutMeData.phone,
								email: aboutMeData.email
							}}
							onFinish={values => {
								dispatch(
									allData({
										...values,
										birthDay: '11-09-2001',
										surName: values.surname,
										phone: values.phoneNumber,
										countryId: values.country
									})
								)
								dispatch(completeAboutMe())
								console.log(aboutMeData)
								navigate('/services/jobseeker/vacancyview/respond/main')
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
									value={aboutMeData.gender}
									// onChange={e => dispatch(gender(e.target.value))}
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
									value={aboutMeData.surName}
									onPressEnter={e => {
										e.preventDefault()
									}}
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
									value={aboutMeData.name}
									onPressEnter={e => {
										e.preventDefault()
									}}
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
									value={aboutMeData.patronymic}
									onPressEnter={e => {
										e.preventDefault()
									}}
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
									value={dayjs(aboutMeData.birthDay, 'DD.MM.YYYY')}
									className="w-full"
									onChange={(e, date) => {
										// dispatch(birthDay(date))
										// setBirthDayDate(date)
									}}
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
									value={aboutMeData.countryId}
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
									value={aboutMeData.phone}
									onPressEnter={e => {
										e.preventDefault()
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
									value={aboutMeData.email}
									onPressEnter={e => {
										e.preventDefault()
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
					) && (
						<Form
							layout="vertical"
							requiredMark={false}
							onFinish={values => {
								dispatch(
									setAllData({
										graduateYear: values.graduateYear,
										specialization: values.specialization,
										nameOfInstitute: values.instituteName,
										countryId: values.country,
										educationLevelId: values.educationLevel
									})
								)
								dispatch(completeEducation())
								navigate('/services/jobseeker/vacancyview/respond/main')
							}}
							initialValues={{
								specialization: educationData.specialization,
								instituteName: educationData.nameOfInstitute,
								country: educationData.countryId,
								educationLevel: educationData.educationLevelId,
								graduateYear: educationData.graduateYear
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
									Образование
								</p>
							</div>
							<Form.Item
								name={'educationLevel'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Уровень образования
									</label>
								}
								rules={[
									{ required: true, message: 'Не выбран уровень образования' }
								]}
							>
								<Select
									className="w-full rounded-lg"
									options={
										levels === undefined
											? []
											: levels.map(el => ({
													value: el.id,
													label: el.name
											  }))
									}
								/>
							</Form.Item>
							<Form.Item
								name={'country'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Страна получения образования
									</label>
								}
								rules={[{ required: true, message: 'Не выбрана страна' }]}
							>
								<Select
									className="w-full rounded-lg"
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
								name={'instituteName'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Учебное заведение
									</label>
								}
								rules={[
									{ required: true, message: 'Не введено учебное заведение' }
								]}
							>
								<Input
									onPressEnter={e => {
										e.preventDefault()
									}}
								></Input>
							</Form.Item>
							<Form.Item
								name={'specialization'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Специальность
									</label>
								}
								rules={[
									{ required: true, message: 'Не введена специальность' }
								]}
							>
								<Input
									onPressEnter={e => {
										e.preventDefault()
									}}
								></Input>
							</Form.Item>
							<Form.Item
								name={'graduateYear'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Год окончания
									</label>
								}
								rules={[{ required: true, message: 'Не выбран год' }]}
							>
								<Select
									className="w-full rounded-lg"
									options={Array.from(
										{
											length:
												date.getMonth() >= 6
													? date.getFullYear() - 1969
													: date.getFullYear() - 1970
										},
										(_, i) => i + 1970
									).map(year => ({
										value: year.toString(),
										label: year.toString()
									}))}
								/>
							</Form.Item>
							<Form.Item>
								<div style={{ textAlign: 'right', marginTop: 40 }}>
									<Button type="primary" htmlType="submit">
										Сохранить
									</Button>
								</div>
							</Form.Item>
						</Form>
					)}
					{/* {pathname.includes(
						'/services/jobseeker/vacancyview/respond/experience/main'
					) && (
						<Form layout="vertical" requiredMark={false}>
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
									Опыт работы
								</p>
							</div>
							<Form.Item>
								<div style={{ textAlign: 'right', marginTop: 40 }}>
									<Button type="primary" htmlType="submit">
										Сохранить
									</Button>
								</div>
							</Form.Item>
						</Form>
					)}
					{pathname.includes(
						'/services/jobseeker/vacancyview/respond/experience/add'
					) && (
						<Form layout="vertical" requiredMark={false}>
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
									Добавить место работы
								</p>
							</div>
							<Form.Item>
								<div style={{ textAlign: 'right', marginTop: 40 }}>
									<Button type="primary" htmlType="submit">
										Сохранить
									</Button>
								</div>
							</Form.Item>
						</Form>
					)}
					{pathname.includes(
						'/services/jobseeker/vacancyview/respond/experience/edit'
					) && (
						<Form layout="vertical" requiredMark={false}>
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
									Добавить место работы
								</p>
							</div>
							<Form.Item>
								<div style={{ textAlign: 'right', marginTop: 40 }}>
									<Button type="primary" htmlType="submit">
										Сохранить
									</Button>
								</div>
							</Form.Item>
						</Form>
					)} */}
					{pathname.includes(
						'/services/jobseeker/vacancyview/respond/skills'
					) && (
						<Form
							layout="vertical"
							requiredMark={false}
							initialValues={{ details: skillsData.details }}
							onFinish={values => {
								dispatch(
									allSkillsData({
										skills: currentFormskills,
										details: values.details
									})
								)
								dispatch(completeSkills())
								setcurrentFormSkills(skillsData.skills)
								navigate('services/jobseeker/vacancyview/respond/main')
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
									Профессиональные навыки
								</p>
							</div>
							<Form.Item
								name={'skills'}
								rules={[
									{
										required: currentFormskills.length === 0,
										message: 'Введите свои навыки'
									}
								]}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Какими ключевыми навыками вы обладаете?
									</label>
								}
							>
								<Input
									placeholder='Например, "Прототипирование"'
									onChange={e => {
										setSkillInputValue(e.target.value)
									}}
									onPressEnter={e => {
										e.preventDefault()
										setcurrentFormSkills([
											...currentFormskills,
											skillInputValue
										])
										setSkillInputValue('')
									}}
								/>
								{currentFormskills.map(skill => (
									<Tag
										closable={true}
										onClose={() => {
											setcurrentFormSkills(
												currentFormskills.filter(currentSkill => {
													return currentSkill !== skill
												})
											)
										}}
									>
										{skill}
									</Tag>
								))}
							</Form.Item>
							<Form.Item
								name={'details'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										О себе (необязательно)
									</label>
								}
							>
								<Input.TextArea autoSize={true} value={skillsData.details} />
							</Form.Item>
							<Form.Item>
								<div style={{ textAlign: 'right', marginTop: 40 }}>
									<Button type="primary" htmlType="submit">
										Сохранить
									</Button>
								</div>
							</Form.Item>
						</Form>
					)}
				</Modal>
			</ConfigProvider>
		</>
	)
}
