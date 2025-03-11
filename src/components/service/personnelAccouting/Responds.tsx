import { LoadingOutlined } from '@ant-design/icons'
import { Select, Spin } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../../store'
import {
	useGetCategoriesQuery,
	useGetDirectionsQuery,
	useGetSubdivisionsQuery,
	useGetVacancyGroupedResponcesQuery
} from '../../../store/api/serviceApi'
import { keepFilterCategory, keepFilterSubCategory, keepFilterType } from '../../../store/reducers/CatalogFilterSlice'

import { RespondItem } from './RespondItem'

export const Responds = () => {
	const catalogFilter = useAppSelector(state => state.catalogFilter)
	const [categoryTitle, setCategoryTitle] = useState(catalogFilter.category)
	const [directoryTitle, setDirectoryTitle] = useState(catalogFilter.subcategory)
	const [subdivisionTitle, setSubdivisionTitle] = useState(catalogFilter.subcategory)
	const [secondOption, setSecondOption] = useState<string | null>(catalogFilter.subcategory)
	const [requestData, setRequestData] = useState<{
		category: string
		subcategory: string
		type: 'DIRECTORY' | 'SUBDIVISION'
		page: number
	}>({
		category: catalogFilter.category,
		subcategory: catalogFilter.subcategory,
		type: catalogFilter.type,
		page: 0
	})
	const { data: categories = [], isLoading: isCategoriesLoading } = useGetCategoriesQuery()
	const { data: directions = [], isLoading: isDirectionsLoading } = useGetDirectionsQuery(categoryTitle)
	const { data: subdivisions = [], isLoading: isSubdivisionsLoading } = useGetSubdivisionsQuery(categoryTitle)
	const { data: response = {}, isLoading: loading } = useGetVacancyGroupedResponcesQuery(
		requestData.subcategory === 'Все'
			? {
				category: requestData.category,
				role: 'PERSONNEL_DEPARTMENT',
				type: requestData.type,
			}
			: {
				category: requestData.category,
				direction: requestData.subcategory,
				role: 'PERSONNEL_DEPARTMENT',
				type: requestData.type,
			}
	)

	const responds = response.content || []

	const dispatch = useDispatch()

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

	return (
		<>
			<div id="wrapper" className="pl-[54px] pr-[54px] pt-[60px] w-full bg-content-gray mt-[60px]">
				<h1 className="font-content-font font-normal text-[28px]/[28px] text-black">Отклики</h1>
				<h2 className="mt-[52px] font-content-font font-normal text-[18px]/[18px] text-black">Категория сотрудников</h2>
				<Select
					className="mt-[16px]"
					style={{ width: 622 }}
					options={categories.map(category => ({
						value: category.title,
						label: category.title
					}))}
					defaultValue={catalogFilter.category}
					onChange={(value: string) => {
						;(() => {
							console.log(value)
							setRequestData({
								category: value,
								subcategory: '',
								type: 'DIRECTORY',
								page: 0
							})
							setCategoryTitle(value)
							setSecondOption(null)
							dispatch(keepFilterCategory(value))
						})()
					}}
					placeholder={!isCategoriesLoading && 'Выбрать'}
					loading={isCategoriesLoading}
					disabled={isCategoriesLoading}
				/>
				<h2 className="mt-[36px] font-content-font font-normal text-[18px]/[18px] text-black">
					{categories.find(category => category.title === categoryTitle)?.direction ? 'Профобласть' : 'Подразделение'}
				</h2>
				<Select
					className="mt-[16px]"
					style={{ width: 622 }}
					options={
						categories.find(category => category.title === categoryTitle)?.direction
							? [
									{ value: 'Все', label: 'Все' },
									...directions.map(dir => ({
										value: dir.title,
										label: dir.title
									}))
							  ]
							: subdivisions.map(sub => ({
									value: sub.title,
									label: sub.title
							  }))
					}
					defaultValue={catalogFilter.subcategory}
					onChange={(value: string) => {
						categories.find(category => category.title === categoryTitle)?.direction
							? (() => {
									setRequestData(prev => ({
										category: prev.category,
										subcategory: value,
										type: 'DIRECTORY',
										page: 0
									}))
									setSecondOption(value)
									dispatch(keepFilterSubCategory(value))
									dispatch(keepFilterType('DIRECTORY'))
							  })()
							: (() => {
									setRequestData(prev => ({
										category: prev.category,
										subcategory: value,
										type: 'SUBDIVISION',
										page: 0
									}))
									setSecondOption(value)
									dispatch(keepFilterSubCategory(value))
									dispatch(keepFilterType('SUBDIVISION'))
							  })()
					}}
					placeholder={!isDirectionsLoading && !isSubdivisionsLoading && 'Выбрать'}
					loading={categoryTitle === '' ? false : isDirectionsLoading || isSubdivisionsLoading}
					disabled={categoryTitle === '' ? true : isDirectionsLoading || isSubdivisionsLoading}
					value={secondOption}
				/>
				<div className="flex items-center mt-[60px] mb-[16px] pl-[20px] pr-[55px]">
					<h3 className="w-[35%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Вакансия
					</h3>
					<h3 className="ml-[17%] w-[12%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Кол-во откликов
					</h3>
				</div>
				{responds.map(resp => (
					<RespondItem {...resp} />
				))}
			</div>
		</>
	)
}
