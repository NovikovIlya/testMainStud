import { LoadingOutlined } from '@ant-design/icons'
import { Radio, Spin } from 'antd'
import { useEffect, useRef, useState } from 'react'

import { useLazyGetSeekerRespondsQuery } from '../../../store/api/serviceApi'
import { RespondItemType, respondStatus } from '../../../store/reducers/type'

import { RespondItem } from './RespondItem'

export const MyResponds = () => {
	const [getResponds, getRespondsStatus] = useLazyGetSeekerRespondsQuery()

	const [requestData, setRequestData] = useState<{
		status: string
		page: number
	}>({
		status: '',
		page: 0
	})

	const [showSpin, setShowSpin] = useState<boolean>(true)
	const [morePagesToGo, setMorePagesToGo] = useState<boolean>(true)

	const [blockPageAddition, setBlockPageAddition] = useState<boolean>(true)
	const [isBottomOfCatalogVisible, setIsBottomOfCatalogVisible] = useState<boolean>(true)
	const catalogBottomRef = useRef<null | HTMLDivElement>(null)
	const [responds, setResponds] = useState<RespondItemType[]>([])

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
	}, [responds])

	useEffect(() => {
		if (requestData.page === 0) {
			getResponds({ status: requestData.status, page: requestData.page })
				.unwrap()
				.then(res => {
					setResponds(res.content)
					requestData.page === res.page.totalPages - 1 && setMorePagesToGo(false)
					setBlockPageAddition(false)
				})
		} else {
			getResponds({ status: requestData.status, page: requestData.page })
				.unwrap()
				.then(res => {
					setResponds(prev => [...prev, ...res.content])
					res.content.length === 0 && setShowSpin(false)
					requestData.page === res.page.totalPages - 1 && setMorePagesToGo(false)
					setBlockPageAddition(false)
				})
		}
	}, [requestData])

	useEffect(() => {
		if (isBottomOfCatalogVisible) {
			if (!blockPageAddition) {
				if (morePagesToGo) {
					setRequestData(prev => ({ ...prev, page: prev.page + 1 }))
				}
			}
		}
	}, [isBottomOfCatalogVisible, blockPageAddition, morePagesToGo])

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
			<div className="mt-[120px] pl-[52px] w-full">
				<h1 className="font-content-font font-normal text-black text-[28px]/[28px]">Мои отклики</h1>
				<div className="mt-[52px] mb-[40px] flex items-center gap-[16px]">
					<Radio.Group
						className="flex gap-[8px]"
						value={requestData.status}
						onChange={e => {
							setBlockPageAddition(true)
							setRequestData({ status: e.target.value, page: 0 })
							setMorePagesToGo(true)
							setShowSpin(true)
						}}
					>
						<label
							className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font cursor-pointer ${
								requestData.status === ''
									? 'text-white bg-dasha-blue'
									: 'text-black border-solid border-black border-[1px] hover:bg-white hover:border-dasha-light-blue hover:text-dasha-light-blue'
							} font-normal text-[16px]/[16px]`}
						>
							<Radio value={''} className="hidden"></Radio>
							все
						</label>
						<label
							className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font cursor-pointer ${
								requestData.status ===
								`statuses=${respondStatus[respondStatus.IN_RESERVE]}&statuses=${respondStatus[respondStatus.ARCHIVE]}`
									? 'text-white bg-dasha-blue'
									: 'text-black border-solid border-black border-[1px] hover:bg-white hover:border-dasha-light-blue hover:text-dasha-light-blue'
							} font-normal text-[16px]/[16px]`}
						>
							<Radio
								value={`statuses=${respondStatus[respondStatus.IN_RESERVE]}&statuses=${
									respondStatus[respondStatus.ARCHIVE]
								}`}
								className="hidden"
							></Radio>
							отказано
						</label>
						<label
							className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font cursor-pointer ${
								requestData.status === `statuses=${respondStatus[respondStatus.IN_SUPERVISOR_REVIEW]}`
									? 'text-white bg-dasha-blue'
									: 'text-black border-solid border-black border-[1px] hover:bg-white hover:border-dasha-light-blue hover:text-dasha-light-blue'
							} font-normal text-[16px]/[16px]`}
						>
							<Radio value={`statuses=${respondStatus[respondStatus.IN_SUPERVISOR_REVIEW]}`} className="hidden"></Radio>
							на рассмотрении у руководителя
						</label>
						<label
							className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font cursor-pointer ${
								requestData.status === `statuses=${respondStatus[respondStatus.IN_PERSONNEL_DEPT_REVIEW]}`
									? 'text-white bg-dasha-blue'
									: 'text-black border-solid border-black border-[1px] hover:bg-white hover:border-dasha-light-blue hover:text-dasha-light-blue'
							} font-normal text-[16px]/[16px]`}
						>
							<Radio
								value={`statuses=${respondStatus[respondStatus.IN_PERSONNEL_DEPT_REVIEW]}`}
								className="hidden"
							></Radio>
							на рассмотрении у HR
						</label>
						<label
							className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font cursor-pointer ${
								requestData.status === `statuses=${respondStatus[respondStatus.INVITATION]}`
									? 'text-white bg-dasha-blue'
									: 'text-black border-solid border-black border-[1px] hover:bg-white hover:border-dasha-light-blue hover:text-dasha-light-blue'
							} font-normal text-[16px]/[16px]`}
						>
							<Radio value={`statuses=${respondStatus[respondStatus.INVITATION]}`} className="hidden"></Radio>
							приглашение на собеседование
						</label>
						<label
							className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font cursor-pointer ${
								requestData.status === `statuses=${respondStatus[respondStatus.EMPLOYMENT]}`
									? 'text-white bg-dasha-blue'
									: 'text-black border-solid border-black border-[1px] hover:bg-white hover:border-dasha-light-blue hover:text-dasha-light-blue'
							} font-normal text-[16px]/[16px]`}
						>
							<Radio value={`statuses=${respondStatus[respondStatus.EMPLOYMENT]}`} className="hidden"></Radio>
							трудоустройство
						</label>
					</Radio.Group>
				</div>
				<div className="w-full flex mb-[16px] pl-[20px] pr-[55px]">
					<h3 className="w-[25%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Вакансия
					</h3>
					<h3 className="ml-[5%] w-[8%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Дата отклика
					</h3>
					<h3 className="ml-[2%] w-[25%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
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
						{responds.map(respond => (
							<RespondItem key={respond.id} {...respond} />
						))}
						{getRespondsStatus.isFetching && requestData.page > 0 && showSpin && (
							<div className="text-center ml-auto mr-auto mb-[3%]">
								<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}></Spin>
							</div>
						)}
						<div className="h-[1px]" ref={catalogBottomRef} key={'catalog_bottom_key'}></div>
					</>
				)}
			</div>
		</>
	)
}
