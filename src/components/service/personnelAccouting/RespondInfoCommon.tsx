import { Tag } from 'antd'
import dayjs from 'dayjs'
import { t } from 'i18next'
import uuid from 'react-uuid'

import { MyDocsSvg } from '../../../assets/svg/MyDocsSvg'
import { VacancyRespondItemType } from '../../../store/reducers/type'

export const RespondInfoCommon = (props: {
	res: VacancyRespondItemType
	resume: string
	resumeSize: number
	isSuccess: boolean
}) => {
	return (
		<>
			<hr />
			<div className="flex flex-col gap-[24px]">
				<p className="font-content-font font-normal text-black text-[18px]/[21.6x] opacity-40">{t('coverLetter')}</p>
				<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
					{props.res.respondData.coverLetter}
				</p>
			</div>
			<hr />
			<div className="flex flex-col gap-[24px]">
				<p className="font-content-font font-normal text-black text-[18px]/[21.6x] opacity-40">{t('education')}</p>
				<div className="grid grid-cols-[194px_auto] gap-x-[20px] gap-y-[24px] w-[90%]">
					{props.res.educations.map(edu => (
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
				<p className="font-content-font font-normal text-black text-[18px]/[21.6x] opacity-40">{t('workExperience')}</p>
				{props.res.respondData.portfolio.workExperiences.length === 0 ? (
					<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">{t('hasNoWorkExperience')}</p>
				) : (
					<div className="grid grid-cols-[194px_auto] gap-x-[20px] gap-y-[24px] w-[90%]">
						{props.res.respondData.portfolio.workExperiences.map(exp => (
							<>
								<div className="flex flex-col gap-[4px]">
									<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
										{dayjs(exp.beginWork).format('MM.YYYY')}-
										{/* {parseInt(exp.endWork.substring(0, 4)) === date.getFullYear()
															? 'по наст.время'
															: exp.endWork.substring(0, 4)} */}
										{!dayjs().isAfter(dayjs(exp.endWork), 'month')
											? 'по наст.время'
											: dayjs(exp.endWork).format('MM.YYYY')}
									</p>
									<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
										{parseInt(exp.endWork.substring(0, 4)) - parseInt(exp.beginWork.substring(0, 4)) === 0
											? ''
											: parseInt(exp.endWork.substring(0, 4)) - parseInt(exp.beginWork.substring(0, 4))}
										{parseInt(exp.endWork.substring(0, 4)) - parseInt(exp.beginWork.substring(0, 4)) === 1 && ' год'}
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
				{props.res.respondData.portfolio.url !== '' && (
					<div className="grid grid-cols-[164px_auto] gap-x-[50px] gap-y-[24px] w-[90%]">
						<p>{t('linkPortfolio')}:</p>
						<a href={props.res.respondData.portfolio.url} target="_blank">
							{props.res.respondData.portfolio.url}
						</a>
					</div>
				)}
				{props.isSuccess && (
					<div className="grid grid-cols-[194px_auto] gap-x-[20px] gap-y-[24px] w-[90%]">
						<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">{t('resume')}</p>
						<div className="bg-white rounded-[16px] shadow-custom-shadow h-[59px] w-[65%] p-[20px] flex">
							<MyDocsSvg />
							<p
								className="ml-[20px] font-content-font font-normal text-black text-[16px]/[19.2px] underline cursor-pointer"
								onClick={() => {
									const link = document.createElement('a')
									link.href = props.resume
									link.download = t('resume')
									link.click()
								}}
							>
								{t('resume') +
									' ' +
									props.res.userData?.lastname +
									' ' +
									props.res.userData?.firstname +
									' ' +
									props.res.userData?.middlename}
							</p>
							<p className="ml-auto font-content-font font-normal text-black text-[16px]/[19.2px] opacity-70">
								{Math.round(props.resumeSize / 1000000) > 0
									? Math.round(props.resumeSize / 1000000) + ' Мб'
									: Math.round(props.resumeSize / 1000) > 0
									? Math.round(props.resumeSize / 1000) + ' Кб'
									: props.resumeSize + ' б'}
							</p>
						</div>
					</div>
				)}
			</div>
			<hr />
			<div className="flex flex-col gap-[24px]">
				<p className="font-content-font font-normal text-black text-[18px]/[21.6x] opacity-40">{t('aboutMyself')}</p>
				<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
					{props.res.respondData.skills.aboutMe}
				</p>
			</div>
			<hr />
			<div className="flex flex-col">
				<p className="font-content-font font-normal text-black text-[18px]/[21.6x] opacity-40 w-[194px]">
					{t('professionalSkills')}
				</p>
				<div className="grid grid-cols-[194px_auto] gap-x-[20px] w-[90%]">
					<div className="col-start-2 flex gap-[8px] flex-wrap">
						{props.res.respondData.skills.keySkills.map(skill => (
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
		</>
	)
}
