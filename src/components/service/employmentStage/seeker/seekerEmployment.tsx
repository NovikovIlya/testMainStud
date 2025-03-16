import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useLazyGetSeekerEmploymentRespondsQuery } from '../../../../store/api/serviceApi'
import { setStage } from '../../../../store/reducers/CurrentEmploymentStage'
import { RespondItemType } from '../../../../store/reducers/type'

import { SeekerEmploymentItem } from './SeekerEmploymentItem'

export const SeekerEmployment = () => {
	const [requestData, setRequestData] = useState<{
		page: number
	}>({
		page: 0
	})

	const [showSpin, setShowSpin] = useState<boolean>(true)

	const [blockPageAddition, setBlockPageAddition] = useState<boolean>(true)
	const [isBottomOfCatalogVisible, setIsBottomOfCatalogVisible] = useState<boolean>(true)
	const catalogBottomRef = useRef<null | HTMLDivElement>(null)
	const [responds, setResponds] = useState<RespondItemType[]>([])

	const [getResponds, getRespondsStatus] = useLazyGetSeekerEmploymentRespondsQuery()

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
			getResponds(requestData.page)
				.unwrap()
				.then(res => {
					setResponds(res.content)
					setBlockPageAddition(false)
				})
		} else {
			getResponds(requestData.page)
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

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setStage(''))
	}, [])

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
			<div id="wrapper" className="px-[52px] mt-[120px] w-full">
				<p className="font-content-font font-normal text-[28px]/[28px] text-black">Этап трудоустройства</p>
				{responds.length === 0 ? (
					<p className="text-center mt-[15%] font-content-font text-[20px]/[20px] text-black font-normal opacity-60">
						У вас пока нет вакансий на данном этапе
					</p>
				) : (
					<>
						<div className="mt-[52px] mb-[16px] flex pl-[20px] w-full pr-[55px]">
							<h3 className="w-[30%] font-content-font font-normal text-[14px]/[14px] text-text-gray">Вакансия</h3>
							<h3 className="ml-[10%] font-content-font font-normal text-[14px]/[14px] text-text-gray">Статус</h3>
						</div>
						{responds.map(resp => (
							<SeekerEmploymentItem {...resp} />
						))}
						{getRespondsStatus.isFetching && showSpin && (
							<div className="text-center ml-auto mr-auto">
								<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}></Spin>
								<p className="font-content-font font-normal text-black text-[18px]/[18px]">Идёт загрузка...</p>
							</div>
						)}
						<div className="h-[1px]" ref={catalogBottomRef} key={'catalog_bottom_key'}></div>
					</>
				)}
			</div>
		</>
	)
}
