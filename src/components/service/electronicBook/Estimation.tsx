import { ConfigProvider, Radio, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { performanceItem } from '../../../api/types'
import { DataType, DateSemester } from '../../../models/electronicBook'
import { useGetPerformanceQuery } from '../../../store/api/serviceApi'

import './Styles.scss'

export const Estimation = () => {
	const [semester, setSemester] = useState(0)
	const [data, changeData] = useState<DataType[] | null>(null)
	const { data: performance } = useGetPerformanceQuery()
	const { t } = useTranslation()

	const columnSemester: ColumnsType<DateSemester> = [
		{
			title: t('Semester'),
			dataIndex: 'term',
			key: 'term',
			render: item => <p className="text-base max-w-xs">{item}</p>
		},
		{
			title: t('SemesterRating'),
			dataIndex: 'semesterRating',
			key: 'semesterRating',
			render: item => <p className="text-base max-w-xs">{item}</p>
		},
		{
			title: 'Place in the group',
			dataIndex: 'place',
			key: 'place',
			render: item => <p className="text-base max-w-xs">{item}</p>
		},
		{
			title: 'Place in the Institute for the course',
			dataIndex: 'placeInstitute',
			key: 'placeInstitute',
			render: item => <p className="text-base max-w-xs">{item}</p>
		}
	]

	const columns: ColumnsType<DataType> = [
		{
			title: t('Semester'),
			dataIndex: 'term',
			key: 'term',
			render: item => <p className="text-base max-w-xs">{item}</p>,
			align: 'center'
		},
		{
			title: t('Discipline'),
			dataIndex: 'discipline',
			key: 'discipline',
			render: item => <p className="text-bas text-start">{item}</p>,
			align: 'center'
		},
		{
			title: t('ScoreSemester'),
			dataIndex: 'scoreSemester',
			key: 'scoreSemester',
			render: item => <p className="text-base">{item}</p>,
			align: 'center'
		},
		{
			title: t('Type'),
			key: 'type',
			dataIndex: 'type',
			render: item => <p className="text-base">{t(item)}</p>,
			align: 'center'
		},
		{
			title: t('ScoreReceived'),
			key: 'scoreReceived',
			dataIndex: 'scoreReceived',
			render: item => <p className="text-base">{item}</p>,
			align: 'center'
		},
		{
			title: t('DateDelivery'),
			key: 'dateDelivery',
			dataIndex: 'dateDelivery',
			render: item => <p className="text-base">{item}</p>,
			align: 'center'
		},
		{
			title: t('FinalScore'),
			key: 'finalScore',
			dataIndex: 'finalScore',
			render: item => <p className="text-base">{item}</p>,
			align: 'center'
		},
		{
			title: t('FinalAssessment'),
			key: 'finalAssessment',
			dataIndex: 'finalAssessment',
			render: item => <p className="text-base">{item}</p>,
			align: 'center'
		},
		{
			title: t('AcademicHours'),
			key: 'academicHours',
			dataIndex: 'academicHours',
			render: item => <p className="text-base">{item}</p>,
			align: 'center'
		},
		{
			title: t('Credits'),
			key: 'credits',
			dataIndex: 'credits',
			render: item => <p className="text-base">{item}</p>,
			align: 'center'
		}
	]
	const changeSemester = (semester: number) => {
		if (data && performance) {
			if (semester > 0) {
				changeData(
					getPerformance(
						performance.journal.filter(el => el.semester === semester * 2 || el.semester === semester * 2 - 1)
					)
				)
			} else changeData(getPerformance(performance.journal))
		}
		setSemester(semester)
	}

	useEffect(() => {
		if (performance) {
			changeData(getPerformance(performance.journal))
		}
	}, [performance])

	const getPerformance = (perf: performanceItem[]): DataType[] => {
		const result: DataType[] = perf.map((el, index) => {
			var cred = 2
			if (el.total_points > 55) cred = 3
			if (el.total_points > 70) cred = 4
			if (el.total_points > 84) cred = 5
			return {
				key: index,
				term: el.semester,
				discipline: el.subject_name,
				scoreSemester: el.semester_points,
				// type: el.type === 'e' ? 'exam' : 'quiz',
				type: el.is_exam === 'y' ? 'exam' : el.is_test === 'y' ? 'quiz' : 'Дифзачет',

				scoreReceived: el.exam_points,
				dateDelivery: el.pass_date,
				finalScore: el.total_points,
				finalAssessment: el.points_string.length > 2 ? el.points_string.substring(0, 3) + '.' : el.points_string,
				academicHours: el.hours,
				credits: cred
			}
		})
		return result.sort((a, b) => a.term - b.term)
	}
	const scrollY = `calc(100vh - 340px)`; // но без кавычек внутри calc

	return (
		<div className="radio">
			{/* <div className="mb-14 text-[28px]">{t('ElectronicBook')}</div> */}
			<Radio.Group
				defaultValue="0"
				onChange={e => changeSemester(e.target.value)}
				buttonStyle="solid"
				className="flex gap-[10px] h-9"
			>
				<Radio.Button className="rounded-full bg-transparent h-full flex items-center text-base" value="0">
					{t('AllYears')}
				</Radio.Button>
				<Radio.Button className="rounded-full h-full flex items-center text-base bg-transparent" value="1">
					{t('1st year')}
				</Radio.Button>
				<Radio.Button className="rounded-full h-full flex items-center text-base bg-transparent" value="2">
					{t('SecondYear')}
				</Radio.Button>
				<Radio.Button className="rounded-full h-full flex items-center text-base bg-transparent" value="3">
					{t('ThirdYear')}
				</Radio.Button>
				<Radio.Button className="rounded-full h-full flex items-center text-base bg-transparent" value="4">
					{t('FourthYear')}
				</Radio.Button>
			</Radio.Group>
			<div className="my-10 gap-5 flex flex-col">
				<ConfigProvider
					theme={{
						components: {
							Table: {
								headerBg: 'rgb(218, 231, 251)'
							}
						}
					}}
				>
					<Table
						dataSource={!data ? [] : data}
						columns={columns}
						pagination={false}
						loading={!data ? true : false}
						className="w-full drop-shadow-lg shadow-[#d4e3f1] rounded-none"
						locale={{ emptyText: t('noData') }}
						scroll={{ y: scrollY, x: 'max-content' }}
					/>
				</ConfigProvider>
			</div>
		</div>
	)
}
