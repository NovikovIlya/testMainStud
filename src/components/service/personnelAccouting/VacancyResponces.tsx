import { LoadingOutlined } from '@ant-design/icons'
import { Radio, Spin } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../store'
import { useLazyGetResponcesByVacancyQuery } from '../../../store/api/serviceApi'
import { VacancyRespondItemType, respondStatus } from '../../../store/reducers/type'
import ArrowIcon from '../jobSeeker/ArrowIcon'

import { VacancyRespondItem } from './VacancyRespondItem'

export const VacancyResponces = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const currentVacancyTitle = useAppSelector(state => state.currentVacancyName)

	const pathVacancyId = pathname.split('/').pop() as string

	const vacancyId = parseInt(pathVacancyId)

	const [requestData, setRequestData] = useState<{
		status: string
		page: number
	}>({
		status: 'все',
		page: 0
	})
	const [blockPageAddition, setBlockPageAddition] = useState<boolean>(true)
	const [isBottomOfCatalogVisible, setIsBottomOfCatalogVisible] = useState<boolean>(true)
	const catalogBottomRef = useRef<null | HTMLDivElement>(null)
	const [responds, setResponds] = useState<VacancyRespondItemType[]>([])

	const [getResponds, getRespondsStatus] = useLazyGetResponcesByVacancyQuery()

	useEffect(() => {
		const lowerObserver = new IntersectionObserver(entries => {
			const target = entries[0]
			if (target.isIntersecting) {
				console.log('I see the depths of hell below')
				setIsBottomOfCatalogVisible(true)
			}
			if (!target.isIntersecting) {
				setIsBottomOfCatalogVisible(false)
			}
		})

		if (catalogBottomRef.current) {
			lowerObserver.observe(catalogBottomRef.current)
		}

		return () => {
			if (catalogBottomRef.current) {
				lowerObserver.unobserve(catalogBottomRef.current)
			}
		}
	}, [responds.length])

	useEffect(() => {
		if (requestData.page === 0) {
			getResponds({ status: requestData.status, id: vacancyId, role: 'PERSONNEL_DEPARTMENT', page: requestData.page })
				.unwrap()
				.then(res => {
					setResponds(res.content)
					setBlockPageAddition(false)
				})
		} else {
			getResponds({ status: requestData.status, id: vacancyId, role: 'PERSONNEL_DEPARTMENT', page: requestData.page })
				.unwrap()
				.then(res => {
					setResponds(prev => [...prev, ...res.content])
					setBlockPageAddition(false)
				})
		}
	}, [requestData])

	useEffect(() => {
		if (isBottomOfCatalogVisible) {
			if (!blockPageAddition) {
				setRequestData(prev => ({ ...prev, page: prev.page + 1 }))
			}
		}
	}, [isBottomOfCatalogVisible])

	if (getRespondsStatus.isLoading) {
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
			<div className="w-full pl-[52px] pr-[52px] pt-[60px] mt-[60px]">
				<div className="flex">
					<button
						onClick={() => {
							navigate('/services/personnelaccounting/responds')
						}}
						className="bg-inherit border-none cursor-pointer"
					>
						<ArrowIcon />
					</button>
					<p className="ml-[40px] font-content-font font-normal text-black text-[28px]/[33.6px]">
						Отклики на вакансию «{currentVacancyTitle.vacancyTitle}»
					</p>
				</div>
				<div className="mt-[52px] mb-[60px] flex items-center gap-[16px]">
					<Radio.Group
						className="flex flex-wrap gap-[12px]"
						value={status}
						onChange={e => {
							setRequestData({ status: e.target.value, page: 0 })
						}}
					>
						<label
							className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
								requestData.status === 'все'
									? 'text-white bg-dasha-blue'
									: 'text-black border-solid border-black border-[1px]'
							} font-normal text-[16px]/[16px]`}
						>
							<Radio value={'все'} className="hidden"></Radio>
							все
						</label>
						<label
							className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
								requestData.status === respondStatus[respondStatus.IN_PERSONNEL_DEPT_REVIEW]
									? 'text-white bg-dasha-blue'
									: 'text-black border-solid border-black border-[1px]'
							} font-normal text-[16px]/[16px]`}
						>
							<Radio value={respondStatus[respondStatus.IN_PERSONNEL_DEPT_REVIEW]} className="hidden"></Radio>
							на рассмотрении
						</label>
						<label
							className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
								requestData.status === respondStatus[respondStatus.IN_SUPERVISOR_REVIEW]
									? 'text-white bg-dasha-blue'
									: 'text-black border-solid border-black border-[1px]'
							} font-normal text-[16px]/[16px]`}
						>
							<Radio value={respondStatus[respondStatus.IN_SUPERVISOR_REVIEW]} className="hidden"></Radio>
							на рассмотрении у руководителя
						</label>
						<label
							className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
								requestData.status === respondStatus[respondStatus.INVITATION]
									? 'text-white bg-dasha-blue'
									: 'text-black border-solid border-black border-[1px]'
							} font-normal text-[16px]/[16px]`}
						>
							<Radio value={respondStatus[respondStatus.INVITATION]} className="hidden"></Radio>
							приглашение на собеседование
						</label>
						<label
							className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
								requestData.status === respondStatus[respondStatus.EMPLOYMENT_REQUEST]
									? 'text-white bg-dasha-blue'
									: 'text-black border-solid border-black border-[1px]'
							} font-normal text-[16px]/[16px]`}
						>
							<Radio value={respondStatus[respondStatus.EMPLOYMENT_REQUEST]} className="hidden"></Radio>
							этап трудоустройства
						</label>
					</Radio.Group>
				</div>
				<div className="flex mb-[16px] pl-[20px] pr-[55px]">
					<h3 className="w-[25%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Соискатель
					</h3>

					<h3 className="ml-[10%] w-[8%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Дата отклика
					</h3>
					<h3 className="ml-[1%] w-[25%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Статус
					</h3>
				</div>
				{responds.map(respond => (
					<VacancyRespondItem {...respond} itemType="PERSONNEL_DEPARTMENT" />
				))}
			</div>
		</>
	)
}
