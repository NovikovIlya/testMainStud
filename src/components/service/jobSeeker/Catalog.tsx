import { Select, Skeleton, Space } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../../store'
import {
	useGetCategoriesQuery,
	useGetDirectionsQuery,
	useGetSubdivisionsQuery,
	useGetVacancyPreviewByDirectionQuery,
	useGetVacancyPreviewBySubdivisionQuery
} from '../../../store/api/serviceApi'
import { allData } from '../../../store/reducers/SeekerFormReducers/AboutMeReducer'
import { VacancyItemType } from '../../../store/type'
import { SkeletonPage } from '../aboutMe/Skeleton'

import VacancyItem from './VacancyItem'

export default function Catalog() {
	const dispatch = useDispatch()
	const user = useAppSelector(state => state.auth.user)

	const [allVacancyPreviewsByDirections, setAllVacancyPreviewsByDirections] =
		useState<VacancyItemType[]>([])
	const [
		allVacancyPreviewsBySubdivisions,
		setAllVacancyPreviewsBySubdivisions
	] = useState<VacancyItemType[]>([])

	const [categoryTitle, setCategoryTitle] = useState('АУП')
	const [directoryTitle, setDirectoryTitle] = useState('Все')
	const [subdivisionTitle, setSubdivisionTitle] = useState('')
	const [page, setPage] = useState(0)
	const [secondOption, setSecondOption] = useState<string | null>('Все')
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

	useEffect(() => {
		if (user) {
			dispatch(
				allData({
					name: user.firstname,
					surName: user.lastname,
					patronymic: user.middlename,
					phone: user.phone,
					email: user.email,
					birthDay: user.birthday,
					gender: 'M',
					countryId: 184
				})
			)
		}
	}, [])

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

	if (isCategoriesLoading && isDirectionsLoading) {
		return (
			<>
				<Space.Compact direction="vertical" block>
					<Skeleton title={{ width: 0 }} active paragraph={{ rows: 2 }} />
					<Skeleton title={{ width: 0 }} active paragraph={{ rows: 10 }} />
				</Space.Compact>
			</>
		)
	}

	return (
		<>
			<div
				id="wrapper"
				className="pl-[54px] pr-[54px] pt-[60px] w-full bg-content-gray"
			>
				<h1 className="font-content-font font-normal text-[28px]/[28px] text-black">
					Каталог вакансий
				</h1>
				<h2 className="mt-[52px] font-content-font font-normal text-[18px]/[18px] text-black">
					Категория сотрудников
				</h2>

				<Select
					className="mt-[16px]"
					style={{ width: 622 }}
					options={categories.map(category => ({
						value: category.title,
						label: category.title
					}))}
					defaultValue={'АУП'}
					onChange={(value: string) => {
						;(() => {
							setPage(0)
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
					className="mt-[16px]"
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
					defaultValue={'Все'}
					onChange={(value: string) => {
						categories.find(category => category.title === categoryTitle)
							?.direction
							? (() => {
									setPage(0)
									setAllVacancyPreviewsByDirections([])
									setDirectoryTitle(value)
									setSecondOption(value)
							  })()
							: (() => {
									setPage(0)
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
						className="ml-auto mr-auto outline-none border-none bg-button-blue hover:bg-button-blue-hover focus:border-[2px] focus:border-button-focus-border-blue font-content-font font-normal text-[16px]/[16px] text-white text-center h-[32px] pt-[8px] pb-[8px] pl-[24px] pr-[24px] rounded-[54px]"
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
