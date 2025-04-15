import { LoadingOutlined } from '@ant-design/icons'
import { Button, Spin } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

import { useGetPersonnelStagesQuery, useLazyGetPersonnelStagesQuery } from '../../../../store/api/serviceApi'
import { EmploymentStageItemType } from '../../../../store/reducers/type'

import { DepEmploymentItem } from './depEmploymentItem'

export const DepEmployment = () => {
	const [requestData, setRequestData] = useState<{
		status: string
		page: number
	}>({
		status: 'ALL',
		page: 0
	})

	const [showSpin, setShowSpin] = useState<boolean>(true)

	const [blockPageAddition, setBlockPageAddition] = useState<boolean>(true)
	const [isBottomOfCatalogVisible, setIsBottomOfCatalogVisible] = useState<boolean>(true)
	const catalogBottomRef = useRef<null | HTMLDivElement>(null)
	const [stages, setStages] = useState<EmploymentStageItemType[]>([])

	const [getStages, getStagesStatus] = useLazyGetPersonnelStagesQuery()

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
	}, [stages])

	useEffect(() => {
		if (requestData.page === 0) {
			getStages(requestData.page)
				.unwrap()
				.then(res => {
					setStages(res.content)
					setBlockPageAddition(false)
				})
		} else {
			getStages(requestData.page)
				.unwrap()
				.then(res => {
					setStages(prev => [...prev, ...res.content])
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

	const isActive = (filter: string) => requestData.status === filter

	const ColumnFieldHeaderComponent = () => {
		return (
			<div className="flex flex-row mt-[40px]">
				<span className="ml-[1.5%] w-[24%] text-[14px] text-[#626364] font-normal">Соискатель</span>
				<span className="w-[26%] text-[14px] text-[#626364] font-normal">Должность</span>
				<span className="w-[10%] text-[14px] text-[#626364] font-normal">Статус</span>
				<div className="w-[38.5%]"></div>
			</div>
		)
	}
	if (getStagesStatus.isLoading) {
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
			<div id="wrapper" className="flex flex-col bg-[#F5F8FB] px-[53px] pt-[120px] w-full">
				<h1 className="text-[28px] font-normal text-[#000000]">Этап трудоустройства</h1>
				<div className="flex flex-row gap-[12px] mt-[52px]">
					<Button
						id="buttonEmploymentStageAll"
						className={`px-[16px] py-[8px] font-normal rounded-[54.5px] text-[16px]/[16px] cursor-pointer ${
							isActive('ALL')
								? 'bg-[#1F5CB8] text-white border-[1px] border-[#1F5CB8]'
								: 'bg-[#F5F8FB] text-[#4A4B4C] border-[#4A4B4C] border-[1px]'
						}`}
						onClick={() => {
							setRequestData({ status: 'ALL', page: 0 })
						}}
					>
						все
					</Button>
					<Button
						id="buttonEmploymentStageOncheck"
						className={`px-[16px] py-[8px] font-normal rounded-[54.5px] text-[16px]/[16px] cursor-pointer ${
							isActive('VERIFYING')
								? 'bg-[#1F5CB8] text-white border-[1px] border-[#1F5CB8]'
								: 'bg-[#F5F8FB] text-[#4A4B4C] border-[#4A4B4C] border-[1px]'
						}`}
						onClick={() => {
							setRequestData({ status: 'VERIFYING', page: 0 })
						}}
					>
						на проверке
					</Button>
					<Button
						id="buttonEmploymentStageRevision"
						className={`px-[16px] py-[8px] font-normal rounded-[54.5px] text-[16px]/[16px] cursor-pointer ${
							isActive('REFINE')
								? 'bg-[#1F5CB8] text-white border-[1px] border-[#1F5CB8]'
								: 'bg-[#F5F8FB] text-[#4A4B4C] border-[#4A4B4C] border-[1px]'
						}`}
						onClick={() => {
							setRequestData({ status: 'REFINE', page: 0 })
						}}
					>
						доработка
					</Button>
					<Button
						id="buttonEmploymentStageAccepted"
						className={`px-[16px] py-[8px] font-normal rounded-[54.5px] text-[16px]/[16px] cursor-pointer ${
							isActive('ACCEPTED')
								? 'bg-[#1F5CB8] text-white border-[1px] border-[#1F5CB8]'
								: 'bg-[#F5F8FB] text-[#4A4B4C] border-[#4A4B4C] border-[1px]'
						}`}
						onClick={() => {
							setRequestData({ status: 'ACCEPTED', page: 0 })
						}}
					>
						принято
					</Button>
				</div>
				<ColumnFieldHeaderComponent></ColumnFieldHeaderComponent>
				<div className="flex flex-col mt-[16px] pb-[50px] gap-[12px]">
					{getStagesStatus.isFetching && requestData.page === 0 && showSpin ? (
						<>
							{' '}
							<div className="text-center ml-auto mr-auto mb-[3%]">
								<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}></Spin>
							</div>
						</>
					) : (
						<>
							{' '}
							<div className="flex flex-col gap-[12px]">
								{stages.map(item => (
									<DepEmploymentItem {...item} key={item.respondId}></DepEmploymentItem>
								))}
							</div>
							{getStagesStatus.isFetching && requestData.page > 0 && showSpin && (
								<div className="text-center ml-auto mr-auto mb-[3%]">
									<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}></Spin>
								</div>
							)}
							<div className="h-[1px]" ref={catalogBottomRef} key={'catalog_bottom_key'}></div>
						</>
					)}
				</div>
			</div>
		</>
	)
}
