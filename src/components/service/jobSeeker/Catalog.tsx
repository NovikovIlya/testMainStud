import { Select } from 'antd'
import { useEffect, useState } from 'react'

import {
	useGetCategoriesQuery,
	useGetDirectionsQuery,
	useGetSubdivisionsQuery,
	useGetVacancyPreviewByDirectionQuery,
	useGetVacancyPreviewBySubdivisionQuery
} from '../../../store/api/serviceApi'
import { VacancyItemType } from '../../../store/type'

import VacancyItem from './VacancyItem'

export default function Catalog() {
	const [allVacancyPreviewsByDirections, setAllVacancyPreviewsByDirections] =
		useState<VacancyItemType[]>([])
	const [
		allVacancyPreviewsBySubdivisions,
		setAllVacancyPreviewsBySubdivisions
	] = useState<VacancyItemType[]>([])

	const [categoryTitle, setCategoryTitle] = useState('')
	const [directoryTitle, setDirectoryTitle] = useState('')
	const [subdivisionTitle, setSubdivisionTitle] = useState('')
	const [page, setPage] = useState(1)
	const [secondOption, setSecondOption] = useState<string | null>(null)
	const { data: categories = [], isLoading: isCategoriesLoading } =
		useGetCategoriesQuery()
	const { data: directions = [], isLoading: isDirectionsLoading } =
		useGetDirectionsQuery(categoryTitle)
	const { data: subdivisions = [], isLoading: isSubdivisionsLoading } =
		useGetSubdivisionsQuery(categoryTitle)
	const { data: vacancyPreviewsByDirections = [] } =
		useGetVacancyPreviewByDirectionQuery({
			category: categoryTitle,
			direction: directoryTitle,
			page: page
		})
	const { data: vacancyPreviewsBySubdivisions = [] } =
		useGetVacancyPreviewBySubdivisionQuery({
			category: categoryTitle,
			subdivision: subdivisionTitle,
			page: page
		})

	// const scrollHandler = (e: Event) => {
	// 	const tar = e.target as Element
	// 	if (tar.scrollHeight - tar.scrollTop - window.innerHeight < 50) {
	// 		setPage(prev => prev + 1)
	// 		console.log(page)
	// 	}
	// }

	// useEffect(() => {
	// 	document.addEventListener('scroll', scrollHandler)

	// 	return () => {
	// 		document.removeEventListener('scroll', scrollHandler)
	// 	}
	// }, [])

	useEffect(() => {
		setAllVacancyPreviewsByDirections(prev => [
			...prev,
			...vacancyPreviewsByDirections
		])
		console.log('Change one')
	}, [vacancyPreviewsByDirections])

	useEffect(() => {
		setAllVacancyPreviewsBySubdivisions(prev => [
			...prev,
			...vacancyPreviewsBySubdivisions
		])
		console.log('Change two')
	}, [vacancyPreviewsBySubdivisions])

	// useEffect(() => {
	// 	setAllVacancyPreviewsByDirections([])
	// 	setAllVacancyPreviewsBySubdivisions([])
	// 	setPage(1)
	// 	console.log('Change of title')
	// }, [directoryTitle, subdivisionTitle])

	// useEffect(() => {
	// 	setAllVacancyPreviewsByDirections([
	// 		...allVacancyPreviewsByDirections,
	// 		...vacancyPreviewsByDirections
	// 	])
	// 	console.log('Change of array of dirs')
	// }, [vacancyPreviewsByDirections])
	// useEffect(() => {
	// 	setAllVacancyPreviewsBySubdivisions([
	// 		...allVacancyPreviewsBySubdivisions,
	// 		...vacancyPreviewsBySubdivisions
	// 	])
	// 	console.log('Change of array of subdivs')
	// }, [vacancyPreviewsBySubdivisions])

	return (
		<>
			<div id="wrapper" className="pl-[54px] pr-[54px] pt-[60px]">
				<h1 className="font-content-font font-normal text-[28px]/[28px] text-black">
					Каталог вакансий
				</h1>
				<h2 className="mt-[52px] font-content-font font-normal text-[18px]/[18px] text-black">
					Категория сотрудников
				</h2>

				<Select
					style={{ width: 622 }}
					options={categories.map(category => ({
						value: category.title,
						label: category.title
					}))}
					onChange={(value: string) => {
						;(() => {
							setPage(1)
							setAllVacancyPreviewsByDirections([])
							setAllVacancyPreviewsBySubdivisions([])
							setCategoryTitle(value)
							setDirectoryTitle('')
							setSubdivisionTitle('')
							setSecondOption(null)
						})()
					}}
					placeholder={!isCategoriesLoading && 'Выбрать'}
					loading={isCategoriesLoading}
					disabled={isCategoriesLoading}
				/>

				<h2 className="mt-[36px] font-content-font font-normal text-[18px]/[18px] text-black">
					{categories.find(category => category.title === categoryTitle)
						?.direction
						? 'Профобласть'
						: 'Подразделение'}
				</h2>

				<Select
					style={{ width: 622 }}
					options={
						categories.find(category => category.title === categoryTitle)
							?.direction
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
					onChange={(value: string) => {
						categories.find(category => category.title === categoryTitle)
							?.direction
							? (() => {
									setPage(1)
									setAllVacancyPreviewsByDirections([])
									setDirectoryTitle(value)
									setSecondOption(value)
							  })()
							: (() => {
									setPage(1)
									setAllVacancyPreviewsBySubdivisions([])
									setSubdivisionTitle(value)
									setSecondOption(value)
							  })()
					}}
					placeholder={
						!isDirectionsLoading && !isSubdivisionsLoading && 'Выбрать'
					}
					loading={
						categoryTitle === ''
							? false
							: isDirectionsLoading || isSubdivisionsLoading
					}
					disabled={
						categoryTitle === ''
							? true
							: isDirectionsLoading || isSubdivisionsLoading
					}
					value={secondOption}
				/>

				<div
					style={
						allVacancyPreviewsByDirections.length === 0 &&
						allVacancyPreviewsBySubdivisions.length === 0
							? { display: 'none' }
							: {}
					}
					className="mt-[60px] ml-[20px] flex"
				>
					<h3 className="w-[388px] shrink-0 font-content-font font-normal text-[14px]/[14px] text-text-gray">
						Должность
					</h3>
					<div className="ml-[30px] flex gap-[25px]">
						<h3 className="w-[104px] font-content-font font-normal text-[14px]/[14px] text-text-gray">
							Опыт работы
						</h3>
						<h3 className="w-[104px] font-content-font font-normal text-[14px]/[14px] text-text-gray">
							График работы
						</h3>
					</div>
					<h3 className="ml-[140px] font-content-font font-normal text-[14px]/[14px] text-text-gray">
						Заработная плата
					</h3>
				</div>
				<div className="mt-[16px] mb-[50px] flex flex-col w-full gap-[10px]">
					{categories.find(category => category.title === categoryTitle)
						?.direction
						? allVacancyPreviewsByDirections.map(vacancyPreview => (
								<VacancyItem {...vacancyPreview} key={vacancyPreview.id} />
						  ))
						: allVacancyPreviewsBySubdivisions.map(vacancyPreview => (
								<VacancyItem {...vacancyPreview} key={vacancyPreview.id} />
						  ))}
					<button
						style={
							vacancyPreviewsByDirections.length === 0 &&
							vacancyPreviewsBySubdivisions.length === 0
								? { display: 'none' }
								: {}
						}
						className="ml-auto mr-auto bg-button-blue hover:bg-button-blue-hover focus:border-[2px] focus:border-button-focus-border-blue font-content-font font-normal text-[16px]/[16px] text-white text-center h-[32px] pt-[8px] pb-[8px] pl-[24px] pr-[24px] rounded-[54px]"
						onClick={() => {
							setPage(page + 1)
						}}
					>
						Загрузить ещё вакансии
					</button>
				</div>
			</div>
		</>
	)
}
