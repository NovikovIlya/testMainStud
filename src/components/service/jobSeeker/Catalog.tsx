import { LoadingOutlined } from '@ant-design/icons'
import { Select, Spin } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { useAppSelector } from '../../../store'
import { useLazyGetInfoUserQuery } from '../../../store/api/formApi'
import {
	useGetCategoriesQuery,
	useGetDirectionsQuery,
	useGetSubdivisionsQuery,
	useLazyGetVacancyPreviewByDirectionQuery,
	useLazyGetVacancyPreviewBySubdivisionQuery
} from '../../../store/api/serviceApi'
import { keepFilterCategory, keepFilterSubCategory, keepFilterType } from '../../../store/reducers/CatalogFilterSlice'
import { allData, name, surName } from '../../../store/reducers/SeekerFormReducers/AboutMeReducer'
import { VacancyItemType } from '../../../store/reducers/type'

import VacancyItem from './VacancyItem'

export default function Catalog() {
	const dispatch = useDispatch()
	const user = useAppSelector(state => state.auth.user)
	const catalogFilter = useAppSelector(state => state.catalogFilter)

	const [categoryTitle, setCategoryTitle] = useState(catalogFilter.category)
	const [directoryTitle, setDirectoryTitle] = useState(catalogFilter.subcategory)
	const [subdivisionTitle, setSubdivisionTitle] = useState(catalogFilter.subcategory)
	const [page, setPage] = useState(0)
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
	const [blockPageAddition, setBlockPageAddition] = useState<boolean>(true)
	const [isBottomOfCatalogVisible, setIsBottomOfCatalogVisible] = useState<boolean>(true)
	const catalogBottomRef = useRef<null | HTMLDivElement>(null)
	const [previews, setPreviews] = useState<VacancyItemType[]>([])
	const { data: categories = [], isLoading: isCategoriesLoading } = useGetCategoriesQuery()
	const { data: directions = [], isLoading: isDirectionsLoading } = useGetDirectionsQuery(categoryTitle)
	const { data: subdivisions = [], isLoading: isSubdivisionsLoading } = useGetSubdivisionsQuery(categoryTitle)

	const [getVacByDir, preLoadStatus] = useLazyGetVacancyPreviewByDirectionQuery()
	const [getVacBySub] = useLazyGetVacancyPreviewBySubdivisionQuery()
	const [getInfo] = useLazyGetInfoUserQuery()

	useEffect(() => {
		if (user) {
			dispatch(name(user.firstname))
			dispatch(surName(user.lastname))
			getInfo()
				.unwrap()
				.then(info => {
					dispatch(
						allData({
							name: user.firstname,
							surName: user.lastname,
							patronymic: user.middleName,
							phone: user.phone,
							email: user.email,
							birthDay: user.birthday,
							gender: info.gender,
							countryId: info.countryId,
							isPatronymicSet:
								user.middleName === null || user.middleName === undefined || user.middleName === '' ? false : true,
							isBirthDaySet:
								user.birthday === null || user.birthday === undefined || user.birthday === '' ? false : true,
							isGenderSet: info.gender === null || info.gender === undefined ? false : true
						})
					)
				})
		}
	}, [])

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
	}, [previews.length])

	useEffect(() => {
		if (requestData.page === 0) {
			if (requestData.type === 'DIRECTORY') {
				getVacByDir({
					category: requestData.category,
					direction: requestData.subcategory,
					page: requestData.page
				})
					.unwrap()
					.then(res => {
						setPreviews(res.content)
						setBlockPageAddition(false)
					})
			} else {
				getVacBySub({
					category: requestData.category,
					subdivision: requestData.subcategory,
					page: requestData.page
				})
					.unwrap()
					.then(res => {
						setPreviews(res.content)
						setBlockPageAddition(false)
					})
			}
		} else {
			if (requestData.type === 'DIRECTORY') {
				getVacByDir({
					category: requestData.category,
					direction: requestData.subcategory,
					page: requestData.page
				})
					.unwrap()
					.then(res => {
						setPreviews(prev => [...prev, ...res.content])
						setBlockPageAddition(false)
					})
			} else {
				getVacBySub({
					category: requestData.category,
					subdivision: requestData.subcategory,
					page: requestData.page
				})
					.unwrap()
					.then(res => {
						setPreviews(prev => [...prev, ...res.content])
						setBlockPageAddition(false)
					})
			}
		}
	}, [requestData])

	useEffect(() => {
		if (isBottomOfCatalogVisible) {
			if (!blockPageAddition) {
				setRequestData(prev => ({ ...prev, page: prev.page + 1 }))
			}
		}
	}, [isBottomOfCatalogVisible])

	if (preLoadStatus.isLoading) {
		return (
			<>
				<div className="w-full h-full flex items-center">
					<div className="text-center ml-auto mr-auto">
						<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}></Spin>
						<p className="font-content-font font-normal text-black text-[18px]/[18px]">Идёт загрузка вакансий...</p>
					</div>
				</div>
			</>
		)
	}

	return (
		<>
			<h1 className="font-content-font font-normal text-[28px]/[28px] text-black">Каталог вакансий</h1>
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
						setBlockPageAddition(true)
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
				value={categoryTitle}
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
								setBlockPageAddition(true)
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
								setBlockPageAddition(true)
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

			<div style={previews.length === 0 ? { display: 'none' } : {}} className="mt-[60px] ml-[20px] flex">
				<h3 className="w-[388px] shrink-0 font-content-font font-normal text-[14px]/[14px] text-text-gray">
					Должность
				</h3>
				<div className="ml-[30px] flex gap-[40px]">
					<h3 className="w-[104px] font-content-font font-normal text-[14px]/[14px] text-text-gray">Опыт работы</h3>
					<h3 className="w-[104px] font-content-font font-normal text-[14px]/[14px] text-text-gray">Тип занятости</h3>
				</div>
				<h3 className="ml-[140px] font-content-font font-normal text-[14px]/[14px] text-text-gray">Заработная плата</h3>
			</div>
			<div className="mt-[16px] mb-[50px] flex flex-col w-full gap-[10px]">
				{previews.map(prev => (
					<VacancyItem {...prev} key={prev.id} />
				))}
				<div className="h-[1px]" ref={catalogBottomRef} key={'catalog_bottom_key'}></div>
			</div>
		</>
	)
}
