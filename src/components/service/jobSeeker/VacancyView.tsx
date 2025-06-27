import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import i18next, { t } from 'i18next'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppSelector } from '../../../store'
import { useGetCheckboxQuery, useLazyGetAboutMeQuery } from '../../../store/api/aboutMe/forAboutMe'
import { useLazyGetInfoUserQuery } from '../../../store/api/formApi'
import { useLazyGetSeekerVacancyRelationQuery, usePostVacancyRespondMutation } from '../../../store/api/serviceApi'
import { useLazyGetVacancyViewQuery } from '../../../store/api/serviceApi'
import { useGetCountriesQuery, useLazyGetCountriesQuery } from '../../../store/api/utilsApi'
import { setCurrentVacancy } from '../../../store/reducers/CurrentVacancySlice'
import { allData } from '../../../store/reducers/SeekerFormReducers/AboutMeReducer'
import { setData } from '../../../store/reducers/SeekerFormReducers/ResponseDataSetReducer'

import ArrowIcon from './ArrowIcon'
import { ResponseForm } from './ResponceForm'

export default function VacancyView(props: { type: 'CATALOG' | 'CHAT' }) {
	const [canRespond, setCanRespond] = useState<boolean>(false)
	const { i18n } = useTranslation()

	const [getVacancy, { data, isLoading }] = useLazyGetVacancyViewQuery()
	const [getRelation, getRelationStatus] = useLazyGetSeekerVacancyRelationQuery()
	const [getInfo, getInfoStatus] = useLazyGetInfoUserQuery()
	const [getAboutMe, getAboutMeStatus] = useLazyGetAboutMeQuery()
	const [getCountries, getCountriesStatus] = useLazyGetCountriesQuery()
	const { data: checkboxes, isLoading: checkboxesLoading } = useGetCheckboxQuery()

	const dispatch = useDispatch()

	const parameters = useParams()

	console.log(parameters)

	useEffect(() => {
		let id_from_url = parameters.vacancyId

		// Если id найден, запускаем запрос
		if (id_from_url) {
			getVacancy(parseInt(id_from_url))
				.unwrap()
				.then(res => {
					dispatch(setCurrentVacancy(res))
					getRelation(parseInt(id_from_url))
						.unwrap()
						.then(res => {
							setCanRespond(res.canRespond)
						})
				})
		}
	}, [])

	console.log(data)

	const { user } = useAppSelector(state => state.auth)
	const { dataSet } = useAppSelector(state => state.respondDataSet)
	const { currentVacancy } = useAppSelector(state => state.currentVacancy)
	const navigate = useNavigate()
	const isEmpDep = user?.roles.find((role: { type: string }) => role.type === 'EMPL')

	useEffect(() => {
		if (user && !dataSet) {
			getAboutMe()
				.unwrap()
				.then(info => {
					getCountries(i18next.language)
						.unwrap()
						.then(countries => {
							dispatch(
								allData({
									name: info.FIRSTNAME,
									surName: info.LASTNAME,
									patronymic: info.SECONDNAME,
									phone: user.phone,
									email: user.email,
									birthDay: user.birthday,
									gender: info.SEX === 'm' ? 'M' : 'W',
									countryId:
										i18next.language === 'ru'
											? countries.find(country => country.shortName === info.CITIZENSHIP_COUNTRY)
												? countries.find(country => country.shortName === info.CITIZENSHIP_COUNTRY)?.id
												: user.countryId
											: user.countryId,
									isPatronymicSet:
										info.SECONDNAME === null || info.SECONDNAME === undefined || info.SECONDNAME === '' ? false : true,
									isBirthDaySet:
										user.birthday === null || user.birthday === undefined || user.birthday === '' ? false : true,
									isGenderSet: info.SEX === null || info.SEX === undefined ? false : true
								})
							)
							dispatch(setData(true))
						})
				})
		}
	}, [])

	let responsibilities: string = ''
	let responsibilitiesArr: RegExpMatchArray | null = null
	let skills: string = ''
	let skillsArr: RegExpMatchArray | null = null
	let conditions: string = ''
	let conditionsArr: RegExpMatchArray | null = null

	if (currentVacancy !== null) {
		responsibilities = currentVacancy.acf.responsibilities ? currentVacancy.acf.responsibilities : ''

		responsibilities = responsibilities
			.replace(/<strong>/g, '')
			.replace(/<\/strong>/g, '')
			.replace(/<u>/g, '')
			.replace(/<\/u>/g, '')
			.replace(/<i>/g, '')
			.replace(/<\/i>/g, '')
			.replace(/<em>/g, '')
			.replace(/<\/em'>/g, '')

		responsibilities.includes('<li>')
			? (responsibilitiesArr = responsibilities.match(/<li>[a-zA-Zа-яА-ЯёЁ0-9\s\:\,\.\/\–\—\(\)\+\-]+/g))
			: (responsibilitiesArr = responsibilities.match(/\r\n\r\n—[a-zA-Zа-яА-ЯёЁ0-9\s\:\,\.\/\–\—\(\)\+\-]+/g))

		// responsibilitiesArr = responsibilities.match(
		// 	/<li>[a-zA-Zа-яА-ЯёЁ0-9\s\:\,\.\/\–\—\(\)\+\-]+/g
		// )

		skills = currentVacancy.acf.skills ? currentVacancy.acf.skills : ''

		skills = skills
			.replace(/<strong>/g, '')
			.replace(/<\/strong>/g, '')
			.replace(/<u>/g, '')
			.replace(/<\/u>/g, '')
			.replace(/<i>/g, '')
			.replace(/<\/i>/g, '')
			.replace(/<em>/g, '')
			.replace(/<\/em'>/g, '')

		skillsArr = skills.match(/<li>[a-zA-Zа-яА-ЯёЁ0-9\s\:\,\.\/\–\—\(\)\+\-]+/g)

		conditions = currentVacancy.acf.conditions ? currentVacancy.acf.conditions : ''

		conditions = conditions
			.replace(/<strong>/g, '')
			.replace(/<\/strong>/g, '')
			.replace(/<u>/g, '')
			.replace(/<\/u>/g, '')
			.replace(/<i>/g, '')
			.replace(/<\/i>/g, '')
			.replace(/<em>/g, '')
			.replace(/<\/em'>/g, '')

		conditionsArr = conditions.match(/<li>[a-zA-Zа-яА-ЯёЁ0-9\s\:\,\.\/\–\—\(\)\+\-]+/g)
	}

	if (isLoading || getRelationStatus.isLoading || getAboutMeStatus.isLoading || checkboxesLoading) {
		return (
			<>
				<div className="w-full h-full flex items-center">
					<div className="text-center ml-auto mr-auto">
						<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}></Spin>
						<p className="font-content-font font-normal text-black text-[18px]/[18px]">Идёт загрузка...</p>
					</div>
				</div>
			</>
		)
	}
	return (
		<>
			<div id="wrapper" className={`pl-[54px] pr-[54px] ${props.type === 'CHAT' && 'mt-[120px]'}`}>
				<div className="flex">
					<button
						onClick={() => {
							navigate(-1)
						}}
						className="bg-inherit border-none cursor-pointer"
					>
						<ArrowIcon />
					</button>
					<p className="mb-[2px] ml-[40px] font-content-font font-normal text-black text-[28px]/[33.6px]">
						{'«' + data?.title.rendered + '»'}
					</p>
				</div>
				<div className="w-[50%] mt-[52px] grid grid-cols-[repeat(3,_minmax(106px,_auto))_143px] gap-x-[120px] gap-y-[16px]">
					<p className="w-[106px] font-content-font font-bold text-black text-[18px]/[21px]">{t('workExperience')}</p>
					<p className="w-[106px] font-content-font font-bold text-black text-[18px]/[21px]">{t('employmentType')}</p>
					<p className="w-[106px] font-content-font font-bold text-black text-[18px]/[21px]">{t('salary')}</p>
					{props.type === 'CATALOG' ? (
						<ResponseForm canRespond={canRespond} personalData={true} />
					) : (
						<>
							<div className="w-[143px]"></div>
						</>
					)}
					<p className="font-content-font font-normal text-black text-[18px]/[21px]">{data?.acf.experience}</p>
					<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-nowrap">
						{data?.acf.employment}
					</p>
					<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-nowrap">
						{data?.acf.salary}
					</p>
				</div>
				<div className="w-[60%] mt-[60px] mb-[86px] grid grid-cols-[9%_auto] gap-x-[160px] gap-y-[40px]">
					<p className="font-content-font font-bold text-black text-[18px]/[21px] whitespace-nowrap">
						{t('emplTasks')}:
					</p>
					{responsibilities.includes('<li>') ? (
						<ul className="list-disc">
							{responsibilitiesArr !== null &&
								responsibilitiesArr.map(resp => (
									<li className="font-content-font font-normal text-black text-[16px]/[19.2px]">{resp.substring(4)}</li>
								))}
						</ul>
					) : (
						<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">
							{data?.acf.responsibilities}
						</p>
					)}
					<p className="font-content-font font-bold text-black text-[18px]/[21px] whitespace-nowrap">
						{t('requirements')}:
					</p>
					{skills.includes('<li>') ? (
						<ul className="list-disc">
							{skillsArr !== null &&
								skillsArr.map(skill => (
									<li className="font-content-font font-normal text-black text-[16px]/[19.2px]">
										{skill.substring(4)}
									</li>
								))}
						</ul>
					) : (
						<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">
							{data?.acf.skills}
						</p>
					)}
					<p className="font-content-font font-bold text-black text-[18px]/[21px] whitespace-nowrap">
						{t('conditions')}:
					</p>
					{conditions.includes('<li>') ? (
						<ul className="list-disc">
							{conditionsArr !== null &&
								conditionsArr.map(cond => (
									<li className="font-content-font font-normal text-black text-[16px]/[19.2px]">{cond.substring(4)}</li>
								))}
						</ul>
					) : (
						<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">
							{data?.acf.conditions}
						</p>
					)}
				</div>
			</div>
		</>
	)
}
