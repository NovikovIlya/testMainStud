import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { useEffect, useRef, useState } from 'react'

import { useLazyGetSupervisorInterviewQuery } from '../../../../../store/api/serviceApi'
import { InterviewItemType } from '../../../../../store/reducers/type'

import { SupervisorInterviewItem } from './SupervisorInterviewItem'

export const SupervisorInterviews = () => {
	const [getInterviews, getInterviewsStatus] = useLazyGetSupervisorInterviewQuery()

	const [requestData, setRequestData] = useState<{
		page: number
	}>({
		page: 0
	})

	const [showSpin, setShowSpin] = useState<boolean>(true)

	const [blockPageAddition, setBlockPageAddition] = useState<boolean>(true)
	const [isBottomOfCatalogVisible, setIsBottomOfCatalogVisible] = useState<boolean>(true)
	const catalogBottomRef = useRef<null | HTMLDivElement>(null)
	const [interviews, setInterviews] = useState<InterviewItemType[]>([])

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
	}, [interviews.length])

	useEffect(() => {
		if (requestData.page === 0) {
			getInterviews(requestData.page)
				.unwrap()
				.then(res => {
					setInterviews(res.content)
					setBlockPageAddition(false)
				})
		} else {
			getInterviews(requestData.page)
				.unwrap()
				.then(res => {
					setInterviews(prev => [...prev, ...res.content])
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

	if (getInterviewsStatus.isLoading) {
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
		<div className="w-full mx-16 mt-[120px]">
			<h1 className="font-normal text-3xl mb-14">Все собеседования</h1>
			<div className="flex flex-col">
				<div className="w-full flex flex-row pb-4 px-5">
					<h3
						className="
							w-[22%] shrink-0 font-content-font font-normal text-[14px]/[14px] text-text-gray
							"
					>
						Должность
					</h3>
					<h3
						className="
							w-[22%] ml-[3%] shrink-0 font-content-font font-normal text-[14px]/[14px] text-text-gray
							"
					>
						Соискатель
					</h3>
					<h3
						className="
							w-[10%] ml-[3%] shrink-0 font-content-font font-normal text-[14px]/[14px] text-text-gray
							"
					>
						Дата и время
					</h3>
					<h3
						className="
							w-[10%] ml-[1%] shrink-0 font-content-font font-normal text-[14px]/[14px] text-text-gray
							"
					>
						Формат
					</h3>
					<h3 className="w-[37%] mr-[2%]"></h3>
				</div>
				<div className="flex flex-col gap-[12px]">
					{interviews.map(inter => (
						<SupervisorInterviewItem {...inter} key={inter.id} />
					))}
					{getInterviewsStatus.isFetching && showSpin && (
						<div className="text-center ml-auto mr-auto mb-[3%]">
							<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}></Spin>
						</div>
					)}
					<div className="h-[1px]" ref={catalogBottomRef} key={'catalog_bottom_key'}></div>
				</div>
			</div>
		</div>
	)
}
