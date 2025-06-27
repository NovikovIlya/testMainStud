import { LoadingOutlined } from '@ant-design/icons'
import { Button, Spin, Tag } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import uuid from 'react-uuid'

import { AvatartandardSvg } from '../../../../../assets/svg/AvatarStandardSvg'
import { MyDocsSvg } from '../../../../../assets/svg/MyDocsSvg'
import { NocircleArrowIconHover } from '../../../../../assets/svg/NocircleArrowIconHover'
import { useAppSelector } from '../../../../../store'
import {
	useGetRespondFullInfoAccountingQuery,
	useLazyGetSeekerResumeFileQuery
} from '../../../../../store/api/serviceApi'
import { useGetCountriesQuery } from '../../../../../store/api/utilsApi'
import { NocircleArrowIcon } from '../../../jobSeeker/NoCircleArrowIcon'
import { RespondInfoCommon } from '../../../personnelAccouting/RespondInfoCommon'

export const RequisiteSeeker = () => {
	const respondId = useAppSelector(state => state.currentResponce)

	const currentUrl = window.location.pathname
	const match = currentUrl.match(/\/requisite-review\/(\d+)(?=\/|$)/)

	let id_from_url: string | undefined

	if (match) {
		id_from_url = match[1]
	} else {
		console.error('id miss')
	}

	const { data, isLoading: loading } = useGetRespondFullInfoAccountingQuery(id_from_url)
	const [getResume, resumeQueryStatus] = useLazyGetSeekerResumeFileQuery()

	const [resume, setResume] = useState<string>('')
	const [resumeSize, setResumeSize] = useState<number>(0)

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

	const { t, i18n } = useTranslation()
	const { data: countries, isLoading: isLoadingCountry } = useGetCountriesQuery(i18n.language)

	const date = new Date()

	const updatedDateStr = data?.userData?.birthday.replace(/-/g, '.')

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
									{data.userData?.sex === 'M' ? 'Мужчина' : 'Женщина'},{' '}
									{dayjs().diff(dayjs(data.userData?.birthday), 'years')}{' '}
									{dayjs().diff(dayjs(data.userData?.birthday), 'years') >= 10 &&
									dayjs().diff(dayjs(data.userData?.birthday), 'years') <= 20
										? 'лет'
										: dayjs().diff(dayjs(data.userData?.birthday), 'years') % 10 >= 2 &&
										  dayjs().diff(dayjs(data.userData?.birthday), 'years') % 10 <= 4
										? 'года'
										: dayjs().diff(dayjs(data.userData?.birthday), 'years') % 10 == 1
										? 'год'
										: 'лет'}
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
					<RespondInfoCommon
						res={data}
						resume={resume}
						resumeSize={resumeSize}
						isSuccess={resumeQueryStatus.isSuccess}
					/>
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
