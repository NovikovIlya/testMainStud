import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../store'
import { useLazyGetInfoUserQuery } from '../../../store/api/formApi'
import { useLazyGetSeekerVacancyRelationQuery, usePostVacancyRespondMutation } from '../../../store/api/serviceApi'
import { useLazyGetVacancyViewQuery } from '../../../store/api/serviceApi'
import { allData } from '../../../store/reducers/SeekerFormReducers/AboutMeReducer'
import { setData } from '../../../store/reducers/SeekerFormReducers/ResponseDataSetReducer'

import ArrowIcon from './ArrowIcon'
import { ResponseForm } from './ResponceForm'

export default function VacancyView(props: { type: 'CATALOG' | 'CHAT' }) {
	const [canRespond, setCanRespond] = useState<boolean>(false)

	const [getVacancy, { data, isLoading }] = useLazyGetVacancyViewQuery()
	const [getRelation, getRelationStatus] = useLazyGetSeekerVacancyRelationQuery()
	const [getInfo, getInfoStatus] = useLazyGetInfoUserQuery()

	const dispatch = useDispatch()

	useEffect(() => {
		// Получаем текущий URL
		const currentUrl = window.location.pathname

		// Ищем id из URL
		const match = currentUrl.match(/\/vacancyview\/(\d+)$/)

		let id_from_url: string | number

		if (match) {
			id_from_url = match[1]
		} else {
			console.error('ID not found')
			return // Возвращаемся, если id нет
		}

		// Если id найден, запускаем запрос
		if (id_from_url) {
			getVacancy(parseInt(id_from_url))
				.unwrap()
				.then(() => {
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
	const isEmpDep = user?.roles.find(role => role.type === 'EMPL')

	useEffect(() => {
		if (user && !dataSet) {
			getInfo()
				.unwrap()
				.then(info => {
					dispatch(
						allData({
							name: user.firstname,
							surName: user.lastname,
							patronymic: user.middleName,
							phone: user.phone,
							email: user.email,
							birthDay: user.birthday,
							gender: info.gender,
							countryId: info.countryId,
							isPatronymicSet:
								user.middleName === null || user.middleName === undefined || user.middleName === '' ? false : true,
							isBirthDaySet:
								user.birthday === null || user.birthday === undefined || user.birthday === '' ? false : true,
							isGenderSet: info.gender === null || info.gender === undefined ? false : true
						})
					)
					dispatch(setData(true))
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
		responsibilities = currentVacancy.acf.responsibilities

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

		skills = currentVacancy.acf.skills

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

		conditions = currentVacancy.acf.conditions

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

	if (isLoading || getRelationStatus.isLoading || getInfoStatus.isLoading) {
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
					<p className="w-[106px] font-content-font font-bold text-black text-[18px]/[21px]">Требуемый опыт работы</p>
					<p className="w-[106px] font-content-font font-bold text-black text-[18px]/[21px]">Тип занятости</p>
					<p className="w-[106px] font-content-font font-bold text-black text-[18px]/[21px]">Заработная плата</p>
					{props.type === 'CATALOG' ? (
						<ResponseForm canRespond={canRespond} />
					) : (
						<>
							<div className="w-[143px]"></div>
						</>
					)}
					<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-nowrap">
						{data?.acf.experience}
					</p>
					<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-nowrap">
						{data?.acf.employment}
					</p>
					<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-nowrap">
						{data?.acf.salary}
					</p>
				</div>
				<div className="w-[60%] mt-[60px] mb-[86px] grid grid-cols-[9%_auto] gap-x-[160px] gap-y-[40px]">
					<p className="font-content-font font-bold text-black text-[18px]/[21px] whitespace-nowrap">Задачи:</p>
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
					<p className="font-content-font font-bold text-black text-[18px]/[21px] whitespace-nowrap">Требования:</p>
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
					<p className="font-content-font font-bold text-black text-[18px]/[21px] whitespace-nowrap">Условия:</p>
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
