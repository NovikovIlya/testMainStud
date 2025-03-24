import { LoadingOutlined } from '@ant-design/icons'
import { Button, Spin, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Margin, usePDF } from 'react-to-pdf'
import uuid from 'react-uuid'

import { AvatartandardSvg } from '../../../../assets/svg/AvatarStandardSvg'
import { MyDocsSvg } from '../../../../assets/svg/MyDocsSvg'
import { NocircleArrowIconHover } from '../../../../assets/svg/NocircleArrowIconHover'
import { useAppSelector } from '../../../../store'
import {
	useGetArchivedRespondFullInfoQuery,
	useGetRespondFullInfoQuery,
	useLazyGetSeekerResumeFileQuery
} from '../../../../store/api/serviceApi'
import { useGetCountriesQuery } from '../../../../store/api/utilsApi'
import { NocircleArrowIcon } from '../../jobSeeker/NoCircleArrowIcon'

export const DepEmploymentSeekerInfo = () => {
	const respondId = useAppSelector(state => state.currentResponce)

	const currentUrl = window.location.pathname
	const match = currentUrl.match(/\/stages\/(\d+)(?=\/|$)/)

	let id_from_url: string | undefined

	if (match) {
		id_from_url = match[1]
	} else {
		console.error('id miss')
	}

	const { data, isLoading: loading } = useGetRespondFullInfoQuery(id_from_url)

	const date = new Date()

	const { t, i18n } = useTranslation()
	const { data: countries, isLoading: isLoadingCountry } = useGetCountriesQuery(i18n.language)

	const [getResume, resumeQueryStatus] = useLazyGetSeekerResumeFileQuery()
	console.log(data)
	const [resume, setResume] = useState<string>('')
	const [resumeSize, setResumeSize] = useState<number>(0)

	const calculateAge = (birthDateStr: string) => {
		const birthDate = new Date(birthDateStr)
		const currentDate = new Date()

		let age = currentDate.getFullYear() - birthDate.getFullYear()
		const monthDifference = currentDate.getMonth() - birthDate.getMonth()

		// Если день рождения еще не был в этом году, уменьшаем возраст на 1
		if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
			age--
		}

		return age
	}

	const birthday = data?.userData?.birthday
	const age = birthday ? calculateAge(birthday) : undefined

	const updatedDateStr = data?.userData?.birthday.replace(/-/g, '.')

	const getFormattedSize = (sizeInBytes: number): string => {
		const sizeInKilobytes = sizeInBytes / 1024

		if (sizeInBytes < 1000) {
			return sizeInBytes + 'байты'
		} else if (sizeInKilobytes < 1000) {
			return sizeInKilobytes.toFixed(0) + ' Кб'
		} else {
			const sizeInMegabytes = sizeInKilobytes / 1024
			return sizeInMegabytes.toFixed(2) + ' Мб'
		}
	}

	useEffect(() => {
		getResume(respondId.respondId)
			.unwrap()
			.then(resume => {
				console.log(resume.size)
				setResume(prev => resume.href)
				setResumeSize(prev => Math.floor(resume.size))
			})
	}, [])

	if (loading) {
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
	if (data?.type === 'RESPOND') {
		return (
			<div className="pl-[52px] pr-[10%] py-[140px] w-full">
				<div>
					<button
						onClick={() => {
							window.history.back()
						}}
						className="
										   group
								 		   items-center
								 		   gap-[8px]
								 		   hover:border-[#004EC2]
								 		   outline-0
								 		   hover:bg-white
								 		   transition-all duration-200
								 		   flex bg-inherit
								 		   h-[38px]
								 		   mb-[30px]
								 		   pt-[12px]
								 		   pb-[12px]
								 		   pr-[16px]
								 		   pl-[16px]
								 		   rounded-[50px]
								 		   border
								 		   border-solid
								 		   border-black
								 		   cursor-pointer
								 		  "
					>
						{/* Иконка при наведении */}
						<div className="absolute mt-[3px] group-hover:opacity-100 group-hover:scale-100 opacity-0 scale-95 transition-all duration-200">
							<NocircleArrowIconHover />
						</div>

						{/* Иконка по умолчанию */}
						<div className="mt-[3px] group-hover:opacity-0 group-hover:scale-95 opacity-100 scale-100 transition-all duration-200">
							<NocircleArrowIcon />
						</div>
						<span className="group-hover:text-[#004EC2] transition-all duration-200 text-[14px] font-normal">
							Назад
						</span>
					</button>
				</div>
				<div className="mt-[52px] flex flex-col gap-[36px]">
					<div className="flex flex-wrap gap-[150px]">
						<div className="flex gap-[20px]">
							<div className="flex h-[167px] w-[167px] bg-[#D9D9D9]">
								<AvatartandardSvg />
							</div>
							<div className="flex flex-col gap-[8px]">
								<p className="font-content-font font-normal text-black text-[24px]/[28.8px]">
									{data?.userData?.lastname + ' ' + data?.userData?.firstname + ' ' + data?.userData?.middlename}
								</p>
								<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
									{data?.userData?.sex === 'M' ? 'Мужчина' : ''}
									{data?.userData?.sex === 'Ж' ? 'Женщина' : ''}, {age} года
								</p>
								<div className="flex gap-[36px]">
									<div className="flex flex-col gap-[8px]">
										<p className="font-content-font font-normal text-black text-[12px]/[14.4x] opacity-40">
											Дата рождения
										</p>
										<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">{updatedDateStr}</p>
									</div>
									<div className="flex flex-col gap-[8px]">
										<p className="font-content-font font-normal text-black text-[12px]/[14.4x] opacity-40">
											Страна гражданства
										</p>
										<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
											{countries?.find(country => country.id === data?.userData?.countryId)?.shortName}
										</p>
									</div>
								</div>
								<div className="flex flex-col gap-[8px]">
									<p className="font-content-font font-normal text-black text-[12px]/[14.4x] opacity-40">Контакты:</p>
									<div className="flex gap-[24px]">
										<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
											{data?.userData?.phone}
										</p>
										<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
											{data?.userData?.email}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<hr />
					<div className="flex flex-col gap-[24px]">
						<p className="font-content-font font-normal text-black text-[18px]/[21.6x] opacity-40">
							Сопроводительное письмо
						</p>
						<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
							{data?.respondData.coverLetter}
						</p>
					</div>
					<hr />
					<div className="flex flex-col gap-[24px]">
						<p className="font-content-font font-normal text-black text-[18px]/[21.6x] opacity-40">Образование</p>
						<div className="grid grid-cols-[194px_auto] gap-x-[20px] gap-y-[24px] w-[90%]">
							{data.educations.map(edu => (
								<>
									<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">{edu.endYear}</p>
									<div className="flex flex-col gap-[8px]">
										<p className="font-content-font font-bold text-black text-[16px]/[19.2px]">
											{edu.institution + ', ' + edu.country}
										</p>
										<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
											{edu.speciality === null ? '' : edu.speciality + ', '}
											{edu.educationLevel}
										</p>
									</div>
								</>
							))}
						</div>
					</div>
					<hr />
					<div className="flex flex-col gap-[24px]">
						<p className="font-content-font font-normal text-black text-[18px]/[21.6x] opacity-40">Опыт работы</p>
						{data.respondData.portfolio.workExperiences.length === 0 ? (
							<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
								Соискатель не имеет опыта работы
							</p>
						) : (
							<div className="grid grid-cols-[194px_auto] gap-x-[20px] gap-y-[24px] w-[90%]">
								{data.respondData.portfolio.workExperiences.map(exp => (
									<>
										<div className="flex flex-col gap-[4px]">
											<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
												{exp.beginWork.substring(0, 4)}-
												{parseInt(exp.endWork.substring(0, 4)) === date.getFullYear()
													? 'по наст.время'
													: exp.endWork.substring(0, 4)}
											</p>
											<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
												{parseInt(exp.endWork.substring(0, 4)) - parseInt(exp.beginWork.substring(0, 4)) === 0
													? ''
													: parseInt(exp.endWork.substring(0, 4)) - parseInt(exp.beginWork.substring(0, 4))}
												{parseInt(exp.endWork.substring(0, 4)) - parseInt(exp.beginWork.substring(0, 4)) === 1 &&
													' год'}
												{parseInt(exp.endWork.substring(0, 4)) - parseInt(exp.beginWork.substring(0, 4)) >= 2 &&
													parseInt(exp.endWork.substring(0, 4)) - parseInt(exp.beginWork.substring(0, 4)) <= 4 &&
													' года'}
												{parseInt(exp.endWork.substring(0, 4)) - parseInt(exp.beginWork.substring(0, 4)) > 4 && ' лет'}
											</p>
										</div>
										<div className="flex flex-col gap-[8px]">
											<p className="font-content-font font-bold text-black text-[16px]/[19.2px]">{exp.position}</p>
											<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">{exp.workPlace}</p>
											<p className="font-content-font font-normal text-black text-[14px]/[16.8px]">{exp.duties}</p>
										</div>
									</>
								))}
							</div>
						)}
						{data?.respondData.portfolio.url !== '' && (
							<div className="grid grid-cols-[164px_auto] gap-x-[50px] gap-y-[24px] w-[90%]">
								<p>Ссылка на портфолио:</p>
								<a href={data?.respondData.portfolio.url} target="_blank">
									{data?.respondData.portfolio.url}
								</a>
							</div>
						)}
						{resumeQueryStatus.isSuccess && (
							<div className="grid grid-cols-[194px_auto] gap-x-[20px] gap-y-[24px] w-[90%]">
								<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">Резюме</p>
								<div className="bg-white rounded-[16px] shadow-custom-shadow h-[59px] w-[65%] p-[20px] flex">
									<MyDocsSvg />
									<p
										className="ml-[20px] font-content-font font-normal text-black text-[16px]/[19.2px] underline cursor-pointer"
										onClick={() => {
											const link = document.createElement('a')
											link.href = resume
											link.download = 'Резюме'
											link.click()
										}}
									>
										{'Резюме ' +
											data?.userData?.lastname +
											' ' +
											data?.userData?.firstname +
											' ' +
											data?.userData?.middlename}
									</p>
									<p className="ml-auto font-content-font font-normal text-black text-[16px]/[19.2px] opacity-70">
										{Math.round(resumeSize / 1000000) > 0
											? Math.round(resumeSize / 1000000) + ' Мб'
											: Math.round(resumeSize / 1000) > 0
											? Math.round(resumeSize / 1000) + ' Кб'
											: resumeSize + ' б'}
									</p>
								</div>
							</div>
						)}
					</div>
					<hr />
					<div className="flex flex-col gap-[24px]">
						<p className="font-content-font font-normal text-black text-[18px]/[21.6x] opacity-40">О себе</p>
						<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
							{data.respondData.skills.aboutMe}
						</p>
					</div>
					<hr />
					<div className="flex flex-col">
						<p className="font-content-font font-normal text-black text-[18px]/[21.6x] opacity-40 w-[194px]">
							Профессиональные навыки
						</p>
						<div className="grid grid-cols-[194px_auto] gap-x-[20px] w-[90%]">
							<div className="col-start-2 mt-[24px] flex gap-[8px] flex-wrap">
								{data.respondData.skills.keySkills.map(skill => (
									<Tag
										className="bg-black bg-opacity-10 rounded-[40px] py-[8px] px-[16px] font-content-font font-normal text-black text-[16px]/[19.2px]"
										key={uuid()}
									>
										{skill}
									</Tag>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
	if (data?.type === 'RESUME') {
		return (
			<div className="pl-[52px] pr-[10%] py-[60px] w-full mt-[60px]">
				<div>
					<Button
						onClick={() => {
							window.history.back()
						}}
						className="bg-inherit h-[38px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] rounded-[50px] border border-black cursor-pointer"
					>
						<NocircleArrowIcon />
						Назад
					</Button>
				</div>
				<div className="mt-[52px] flex flex-col gap-[36px]">
					<div className="flex flex-wrap gap-[150px]">
						<div className="flex gap-[20px]">
							<div className="flex h-[167px] w-[167px] bg-[#D9D9D9]">
								<AvatartandardSvg />
							</div>
							<div className="flex flex-col gap-[8px]">
								<p className="font-content-font font-normal text-black text-[24px]/[28.8px]">
									{data?.userData?.lastname + ' ' + data?.userData?.firstname + ' ' + data?.userData?.middlename}
								</p>
								<div className="flex flex-col gap-[8px]">
									<p className="font-content-font font-normal text-black text-[12px]/[14.4x] opacity-40">Контакты:</p>
									<div className="flex gap-[24px]">
										<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
											{data?.userData?.phone}
										</p>
										<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
											{data?.userData?.email}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<hr />
					<div className="flex flex-col gap-[24px]">
						<div className="grid grid-cols-[194px_auto] gap-x-[20px] gap-y-[24px] w-[90%]">
							<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">Желаемая должность</p>
							<p className="font-content-font font-bold text-black text-[16px]/[19.2px]">{data?.desiredJob}</p>
						</div>
					</div>
					<hr />
					<div className="flex flex-col gap-[24px]">
						<div className="grid grid-cols-[194px_auto] gap-x-[20px] gap-y-[24px] w-[90%]">
							<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">Резюме</p>
							<div className="bg-white rounded-[16px] shadow-custom-shadow h-[59px] w-[65%] p-[20px] flex">
								<MyDocsSvg />
								<p
									className="ml-[20px] font-content-font font-normal text-black text-[16px]/[19.2px] underline cursor-pointer"
									onClick={() => {
										const link = document.createElement('a')
										link.href = resume
										link.download =
											'Резюме ' +
											data?.userData?.lastname +
											' ' +
											data?.userData?.firstname +
											' ' +
											data?.userData?.middlename
										link.click()
									}}
								>
									{'Резюме ' +
										data?.userData?.lastname +
										' ' +
										data?.userData?.firstname +
										' ' +
										data?.userData?.middlename}
								</p>
								<p className="ml-auto font-content-font font-normal text-black text-[16px]/[19.2px] opacity-70">
									{getFormattedSize(resumeSize)}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	} else {
		return <div></div>
	}
}
