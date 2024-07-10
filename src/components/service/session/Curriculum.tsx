import { Radio, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import Column from 'antd/es/table/Column'
import ColumnGroup from 'antd/es/table/ColumnGroup'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useGetStudyPlanQuery } from '../../../store/api/serviceApi'

import './Styles.scss'
import { DataType } from '../../../models/session'



const dataExam: DataType[] = [
	{
		key: '1',
		mainColumn: 'Theoretical training',
		beginFirstTerm: 'September 1st',
		endFirstTerm: 'September 1st',
		termFirstWeek: '24',
		beginSecondTerm: 'September 1st',
		endSecondTerm: 'September 1st',
		termSecondWeek: '24'
	},
	{
		key: '2',
		mainColumn: 'Non-working holidays',
		beginFirstTerm: 'September 1st',
		endFirstTerm: 'September 1st',
		termFirstWeek: '24',
		beginSecondTerm: 'September 1st',
		endSecondTerm: 'September 1st',
		termSecondWeek: '24'
	},
	{
		key: '3',
		mainColumn: 'Examination session',
		beginFirstTerm: 'September 1st',
		endFirstTerm: 'September 1st',
		termFirstWeek: '24',
		beginSecondTerm: 'September 1st',
		endSecondTerm: 'September 1st',
		termSecondWeek: '24'
	},
	{
		key: '4',
		mainColumn: 'Holidays',
		beginFirstTerm: 'September 1st',
		endFirstTerm: 'September 1st',
		termFirstWeek: '24',
		beginSecondTerm: 'September 1st',
		endSecondTerm: 'September 1st',
		termSecondWeek: '24'
	},
	{
		key: '5',
		mainColumn: 'Educational practice (concenter.)',
		beginFirstTerm: 'September 1st',
		endFirstTerm: 'September 1st',
		termFirstWeek: '24',
		beginSecondTerm: 'September 1st',
		endSecondTerm: 'September 1st',
		termSecondWeek: '24'
	}
]

type TypeColumn = {
	key: string
	discipline: string
	total?: number
	totalGost?: number
	totalLectures?: number
	lecturesLectures?: number
	practiceLectures?: number
	laboratoryLectures?: number
	independent?: number
	control?: number
	lecturesFirstSemester?: number
	practiceFirstSemester?: number
	laboratoryFirstSemester?: number
	examFirstSemester?: string
	creditsFirstSemester?: string
	lecturesSecondSemester?: number
	practiceSecondSemester?: number
	laboratorySecondSemester?: number
	examSecondSemester?: string
	creditsSecondSemester?: string
}

export const Curriculum = () => {
	const [course, changeCourse] = useState<string>('1')
	const [sortingWords, changeWords] = useState<string[]>([])
	const { t } = useTranslation()

	const hideInfo = (blockName: string) => {
		if (sortingWords.some(el => el === blockName)) return true
		else return false
	}

	let columns: ColumnsType<TypeColumn> = [
		{
			title: (
				<p className="h-[190px] flex items-center justify-center whitespace-normal min-w-[500px]">
					{t('NameDiscipline')}
				</p>
			),
			dataIndex: 'discipline',
			key: 'discipline',
			width: 580,
			render: item => {
				if (sortingWords.some(el => el === item))
					return (
						<div className="bg-[#e9eff8] justify-start pl-3 items-center p-[16px]">
							{item}
						</div>
					)
				else
					return (
						<div className="absolute top-0 bottom-0">
							<span className="w-1/4">{item.split('~')[0]}</span>
							<span className="w-3/4">{item.split('~')[1]}</span>
						</div>
					)
			},
			onCell: (data, _) => {
				if (sortingWords.length !== 0 && hideInfo(data.discipline))
					return { colSpan: 19 }
				else return { colSpan: 1 }
			}
		},
		{
			title: <p className="rotate">{t('Total')}</p>,
			dataIndex: 'total',
			key: 'total',
			align: 'center',
			width: 32,
			onCell: (data, _) => {
				if (sortingWords.length !== 0 && hideInfo(data.discipline))
					return { colSpan: 0 }
				else return { colSpan: 1 }
			}
		},
		{
			title: <p className="rotate whitespace-nowrap">{t('ByStandard')}</p>,
			dataIndex: 'totalGost',
			key: 'totalGost',
			align: 'center',
			width: 32,
			onCell: (data, _) => {
				if (sortingWords.length !== 0 && hideInfo(data.discipline))
					return { colSpan: 0 }
				else return { colSpan: 1 }
			}
		},
		{
			title: (
				<>
					<p className="absolute bottom-8">{t('Lectures')}</p>
				</>
			),

			children: [
				{
					title: <p className="rotate bottom-[-28px]">{t('Total')}</p>,
					dataIndex: 'totalLectures',
					key: 'totalLectures',
					align: 'center',
					width: 32,
					onCell: (data, _) => {
						if (sortingWords.length !== 0 && hideInfo(data.discipline))
							return { colSpan: 0 }
						else return { colSpan: 1 }
					}
				},
				{
					title: <p className="rotate bottom-[-28px]">{t('Lectures')}</p>,
					dataIndex: 'lecturesLectures',
					key: 'lecturesLectures',
					align: 'center',
					width: 32,
					onCell: (data, _) => {
						if (sortingWords.length !== 0 && hideInfo(data.discipline))
							return { colSpan: 0 }
						else return { colSpan: 1 }
					}
				},
				{
					title: <p className="rotate bottom-[-28px]">{t('Practical')}</p>,
					dataIndex: 'practiceLectures',
					key: 'practiceLectures',
					align: 'center',
					width: 32,
					onCell: (data, _) => {
						if (sortingWords.length !== 0 && hideInfo(data.discipline))
							return { colSpan: 0 }
						else return { colSpan: 1 }
					}
				},
				{
					title: <p className="rotate bottom-[-28px]">{t('Laboratory')}</p>,
					dataIndex: 'laboratoryLectures',
					key: 'laboratoryLectures',
					align: 'center',
					width: 32,
					onCell: (data, _) => {
						if (sortingWords.length !== 0 && hideInfo(data.discipline))
							return { colSpan: 0 }
						else return { colSpan: 1 }
					}
				}
			]
		},
		{
			title: <p className="rotate">{t('Independent')}</p>,
			dataIndex: 'independent',
			key: 'independent',
			align: 'center',
			width: 32,
			onCell: (data, _) => {
				if (sortingWords.length !== 0 && hideInfo(data.discipline))
					return { colSpan: 0 }
				else return { colSpan: 1 }
			}
		},
		{
			title: <p className="rotate">{t('Control')}</p>,
			dataIndex: 'control',
			key: 'control',
			align: 'center',
			width: 32,
			onCell: (data, _) => {
				if (sortingWords.length !== 0 && hideInfo(data.discipline))
					return { colSpan: 0 }
				else return { colSpan: 1 }
			}
		},
		{
			title: (
				<>
					<p className="absolute bottom-8">
						{course}
						{t('FirstSemester')}
					</p>
				</>
			),

			children: [
				{
					title: <p className="rotate bottom-[-28px]">{t('Lectures')}</p>,
					dataIndex: 'lecturesFirstSemester',
					key: 'lecturesFirstSemester',
					align: 'center',
					width: 32,
					render: item => {
						return {
							props: {
								style: {
									background: '#E6F4FF'
								}
							},
							children: <>{item}</>
						}
					},
					onCell: (data, _) => {
						if (sortingWords.length !== 0 && hideInfo(data.discipline))
							return { colSpan: 0 }
						else return { colSpan: 1 }
					}
				},
				{
					title: <p className="rotate bottom-[-28px]">{t('Practical')}</p>,
					dataIndex: 'practiceFirstSemester',
					key: 'practiceFirstSemester',
					align: 'center',
					width: 32,
					render: item => {
						return {
							props: {
								style: {
									background: '#E6F4FF'
								}
							},
							children: <>{item}</>
						}
					},
					onCell: (data, _) => {
						if (sortingWords.length !== 0 && hideInfo(data.discipline))
							return { colSpan: 0 }
						else return { colSpan: 1 }
					}
				},
				{
					title: <p className="rotate bottom-[-28px]">{t('Laboratory')}</p>,
					dataIndex: 'laboratoryFirstSemester',
					key: 'laboratoryFirstSemester',
					align: 'center',
					width: 32,
					render: item => {
						return {
							props: {
								style: {
									background: '#E6F4FF'
								}
							},
							children: <>{item}</>
						}
					},
					onCell: (data, _) => {
						if (sortingWords.length !== 0 && hideInfo(data.discipline))
							return { colSpan: 0 }
						else return { colSpan: 1 }
					}
				},
				{
					title: <p className="rotate bottom-[-28px]">{t('Exams')}</p>,
					dataIndex: 'examFirstSemester',
					key: 'examFirstSemester',
					align: 'center',
					width: 32,
					render: item => {
						return {
							props: {
								style: {
									background: '#C4E4FC'
								}
							},
							children: <>{item}</>
						}
					},
					onCell: (data, _) => {
						if (sortingWords.length !== 0 && hideInfo(data.discipline))
							return { colSpan: 0 }
						else return { colSpan: 1 }
					}
				},
				{
					title: <p className="rotate bottom-[-28px]">{t('Test')}</p>,
					dataIndex: 'creditsFirstSemester',
					key: 'creditsFirstSemester',
					align: 'center',
					width: 32,
					render: item => {
						return {
							props: {
								style: {
									background: '#C4E4FC'
								}
							},
							children: <>{item}</>
						}
					},
					onCell: (data, _) => {
						if (sortingWords.length !== 0 && hideInfo(data.discipline))
							return { colSpan: 0 }
						else return { colSpan: 1 }
					}
				}
			]
		},
		{
			title: (
				<>
					<p className="absolute bottom-8">
						{course}
						{t('SecondSemester')}
					</p>
				</>
			),

			children: [
				{
					title: <p className="rotate bottom-[-28px]">{t('Lectures')}</p>,
					dataIndex: 'lecturesSecondSemester',
					key: 'lecturesSecondSemester',
					align: 'center',
					width: 32,
					render: item => {
						return {
							props: {
								style: {
									background: '#E6F4FF'
								}
							},
							children: <>{item}</>
						}
					},
					onCell: (data, _) => {
						if (sortingWords.length !== 0 && hideInfo(data.discipline))
							return { colSpan: 0 }
						else return { colSpan: 1 }
					}
				},
				{
					title: <p className="rotate bottom-[-28px]">{t('Practical')}</p>,
					dataIndex: 'practiceSecondSemester',
					key: 'practiceSecondSemester',
					align: 'center',
					width: 32,
					render: item => {
						return {
							props: {
								style: {
									background: '#E6F4FF'
								}
							},
							children: <>{item}</>
						}
					},
					onCell: (data, _) => {
						if (sortingWords.length !== 0 && hideInfo(data.discipline))
							return { colSpan: 0 }
						else return { colSpan: 1 }
					}
				},
				{
					title: <p className="rotate bottom-[-28px]">{t('Laboratory')}</p>,
					dataIndex: 'laboratorySecondSemester',
					key: 'laboratorySecondSemester',
					align: 'center',
					width: 32,
					render: item => {
						return {
							props: {
								style: {
									background: '#E6F4FF'
								}
							},
							children: <>{item}</>
						}
					},
					onCell: (data, _) => {
						if (sortingWords.length !== 0 && hideInfo(data.discipline))
							return { colSpan: 0 }
						else return { colSpan: 1 }
					}
				},
				{
					title: <p className="rotate bottom-[-28px]">{t('Exams')}</p>,
					dataIndex: 'examSecondSemester',
					key: 'examSecondSemester',
					align: 'center',
					width: 32,
					render: item => {
						return {
							props: {
								style: {
									background: '#C4E4FC'
								}
							},
							children: <>{item}</>
						}
					},
					onCell: (data, _) => {
						if (sortingWords.length !== 0 && hideInfo(data.discipline))
							return { colSpan: 0 }
						else return { colSpan: 1 }
					}
				},
				{
					title: <p className="rotate bottom-[-28px]">{t('Test')}</p>,
					dataIndex: 'creditsSecondSemester',
					key: 'creditsSecondSemester',
					width: 32,
					align: 'center',
					render: item => {
						return {
							props: {
								style: {
									background: '#C4E4FC'
								}
							},
							children: <>{item}</>
						}
					},
					onCell: (data, _) => {
						if (sortingWords.length !== 0 && hideInfo(data.discipline))
							return { colSpan: 0 }
						else return { colSpan: 1 }
					}
				}
			]
		}
	]
	const { data: studyPlan, isLoading } = useGetStudyPlanQuery()

	const [tableData, changeData] = useState<TypeColumn[]>([])

	useEffect(() => {
		if (studyPlan)
			changeWords(
				studyPlan.subjects
					.map(el => el.type_name)
					.filter((word, index, array) => {
						return array.indexOf(word) === index
					})
			)
	}, [studyPlan])

	const getData = useCallback(() => {
		if (studyPlan && sortingWords.length !== 0) {
			let result: TypeColumn[] = []
			let selectedSubject: string[] = []
			let filtByCourse = studyPlan.subjects.filter(
				el =>
					parseInt(course) * 2 - 1 === el.semester ||
					parseInt(course) * 2 === el.semester
			)
			sortingWords.forEach((it, inIt) => {
				result.push({
					key: sortingWords[inIt],
					discipline: sortingWords[inIt]
				})

				const filtratedBySortWordBySelectWord = filtByCourse.filter(
					el => el.type_name === sortingWords[inIt]
				)

				filtratedBySortWordBySelectWord.forEach(el => {
					if (!selectedSubject.includes(el.subject_name)) {
						const subjects = filtratedBySortWordBySelectWord.filter(
							item => item.subject_name === el.subject_name
						)
						selectedSubject.push(subjects[0].subject_name)

						result.push({
							key: subjects[0].full_shifr,
							discipline:
								subjects[0].full_shifr + '~' + subjects[0].subject_name,
							total:
								subjects[0].total_independent_hours +
								subjects[0].total_laboratory_hours +
								subjects[0].total_lecture_hours +
								subjects[0].total_practice_hours +
								subjects[0].total_seminar_hours,
							totalGost: subjects[0].gost_hours,
							totalLectures:
								subjects[0].total_lecture_hours +
								subjects[0].total_practice_hours +
								subjects[0].total_laboratory_hours,
							lecturesLectures: subjects[0].total_lecture_hours,
							practiceLectures: subjects[0].total_practice_hours,
							laboratoryLectures: subjects[0].total_laboratory_hours,
							independent: subjects[0].total_independent_hours,
							control: subjects[0].total_seminar_hours,
							lecturesFirstSemester: subjects[0].lecture_hours,
							practiceFirstSemester: subjects[0].practice_hours,
							laboratoryFirstSemester: subjects[0].laboratory_hours,
							examFirstSemester: subjects[0].is_exam ? '+' : '-',
							creditsFirstSemester: subjects[0].is_quiz ? '+' : '-',
							lecturesSecondSemester:
								subjects.length > 1 ? subjects[1].lecture_hours : 0,
							practiceSecondSemester:
								subjects.length > 1 ? subjects[1].practice_hours : 0,
							laboratorySecondSemester:
								subjects.length > 1 ? subjects[1].laboratory_hours : 0,
							examSecondSemester:
								subjects.length > 1 ? (subjects[0].is_exam ? '+' : '-') : '-',
							creditsSecondSemester:
								subjects.length > 1 ? (subjects[0].is_exam ? '+' : '-') : '-'
						})
					}
				})
			})
			return result
		} else return []
	}, [course, sortingWords, studyPlan])

	useEffect(() => {
		const result = getData()
		changeData(result)
	}, [course, sortingWords, getData])

	return (
		<div className="radio ">
			<div className="text-black text-3xl font-normal leading-7 mb-10">
				{t('Curriculum')}
			</div>
			<Radio.Group
				onChange={e => changeCourse(e.target.value)}
				defaultValue={course}
				buttonStyle="solid"
				className="flex gap-[10px] h-9"
			>
				<Radio.Button
					className="rounded-full bg-transparent h-full flex items-center  text-base"
					value="1"
				>
					{t('FirstYear')}
				</Radio.Button>
				<Radio.Button
					className="rounded-full h-full flex items-center text-base bg-transparent"
					value="2"
				>
					{t('SecondYear')}
				</Radio.Button>
				<Radio.Button
					className="rounded-full h-full flex items-center text-base bg-transparent"
					value="3"
				>
					{t('ThirdYear')}
				</Radio.Button>
				<Radio.Button
					className="rounded-full h-full flex items-center text-base bg-transparent"
					value="4"
				>
					{t('FourthYear')}
				</Radio.Button>
			</Radio.Group>

			<Table
				bordered
				dataSource={tableData}
				scroll={{ x: true }}
				columns={columns}
				className="tableCustom my-10"
				pagination={false}
				loading={isLoading}
			/>
		</div>
	)
}
