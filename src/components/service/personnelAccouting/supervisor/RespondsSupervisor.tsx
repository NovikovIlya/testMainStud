import { LoadingOutlined } from '@ant-design/icons'
import { Radio, Spin } from 'antd'
import { useEffect, useRef, useState } from 'react'

import { useLazyGetSupervisorRespondsQuery } from '../../../../store/api/serviceApi'
import { VacancyRespondItemType, respondStatus } from '../../../../store/reducers/type'
import { VacancyRespondItem } from '../VacancyRespondItem'

export const RespondsSupervisor = () => {
	const [getResponds, getRespondsStatus] = useLazyGetSupervisorRespondsQuery()

	const [requestData, setRequestData] = useState<{
		status: string
		page: number
	}>({
		status: 'status=',
		page: 0
	})

	const [showSpin, setShowSpin] = useState<boolean>(true)

	const [blockPageAddition, setBlockPageAddition] = useState<boolean>(true)
	const [isBottomOfCatalogVisible, setIsBottomOfCatalogVisible] = useState<boolean>(true)
	const catalogBottomRef = useRef<null | HTMLDivElement>(null)
	const [responds, setResponds] = useState<VacancyRespondItemType[]>([])

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
			getResponds({ status: requestData.status, page: requestData.page })
				.unwrap()
				.then(res => {
					setResponds(res.content)
					setBlockPageAddition(false)
				})
		} else {
			getResponds({ status: requestData.status, page: requestData.page })
				.unwrap()
				.then(res => {
					setResponds(prev => [...prev, ...res.content])
					res.content.length === 0 && setShowSpin(false)
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
			<div className="pl-[54px] pr-[54px] pt-[120px] w-full bg-content-gray">
				<h1 className="font-content-font font-normal text-[28px]/[28px] text-black">Отклики</h1>
				<div className="mt-[52px] mb-[60px] flex items-center gap-[16px]">
					<Radio.Group
						className="flex flex-wrap gap-[12px]"
						value={requestData.status}
						onChange={e => {
							setRequestData({ status: e.target.value, page: 0 })
							setShowSpin(true)
							console.log(status)
						}}
					>
						<label
							className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
								requestData.status === 'status='
									? 'text-white bg-dasha-blue'
									: 'text-black border-solid border-black border-[1px]'
							} font-normal text-[16px]/[16px]`}
						>
							<Radio value={'status='} className="hidden"></Radio>
							все
						</label>
						<label
							className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
								requestData.status === 'status=' + respondStatus[respondStatus.IN_PERSONNEL_DEPT_REVIEW]
									? 'text-white bg-dasha-blue'
									: 'text-black border-solid border-black border-[1px]'
							} font-normal text-[16px]/[16px]`}
						>
							<Radio
								value={'status=' + respondStatus[respondStatus.IN_PERSONNEL_DEPT_REVIEW]}
								className="hidden"
							></Radio>
							на рассмотрении
						</label>
						<label
							className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
								requestData.status === 'status=' + respondStatus[respondStatus.INVITATION]
									? 'text-white bg-dasha-blue'
									: 'text-black border-solid border-black border-[1px]'
							} font-normal text-[16px]/[16px]`}
						>
							<Radio value={'status=' + respondStatus[respondStatus.INVITATION]} className="hidden"></Radio>
							приглашение на собеседование
						</label>
						<label
							className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
								requestData.status === 'status=' + respondStatus[respondStatus.EMPLOYMENT]
									? 'text-white bg-dasha-blue'
									: 'text-black border-solid border-black border-[1px]'
							} font-normal text-[16px]/[16px]`}
						>
							<Radio value={'status=' + respondStatus[respondStatus.EMPLOYMENT]} className="hidden"></Radio>
							этап трудоустройства
						</label>
						<label
							className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
								requestData.status ===
								`status=${respondStatus[respondStatus.IN_RESERVE]}&status=${respondStatus[respondStatus.ARCHIVE]}`
									? 'text-white bg-dasha-blue'
									: 'text-black border-solid border-black border-[1px]'
							} font-normal text-[16px]/[16px]`}
						>
							<Radio
								value={`status=${respondStatus[respondStatus.IN_RESERVE]}&status=${
									respondStatus[respondStatus.ARCHIVE]
								}`}
								className="hidden"
							></Radio>
							отказано
						</label>
					</Radio.Group>
				</div>
				<div className="flex mt-[60px] mb-[16px] pl-[20px] pr-[55px]">
					<h3 className="w-[25%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Соискатель
					</h3>
					<h3 className="ml-[1%] w-[15%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Вакансия
					</h3>
					<h3 className="ml-[10%] w-[8%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Дата отклика
					</h3>
					<h3 className="ml-[5%] w-[15%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Статус
					</h3>
				</div>
				{getRespondsStatus.isFetching && requestData.page === 0 && showSpin ? (
					<>
						{' '}
						<div className="text-center ml-auto mr-auto mb-[3%]">
							<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}></Spin>
						</div>
					</>
				) : (
					<>
						{' '}
						{responds.map(resp => (
							<VacancyRespondItem {...resp} itemType="SUPERVISOR" />
						))}
						{getRespondsStatus.isFetching && requestData.page > 0 && showSpin && (
							<div className="text-center ml-auto mr-auto mb-[3%]">
								<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}></Spin>
							</div>
						)}
					</>
				)}
				<div className="h-[1px]" ref={catalogBottomRef} key={'catalog_bottom_key'}></div>
			</div>
		</>
	)
}
