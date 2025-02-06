import { MessageOutlined, PieChartOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Col, Form, Menu, Row, Select } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { BrsSvg } from '../../../assets/svg/BrsSvg'
import { JournalPos } from '../../../assets/svg/JournalPos'
import { Pvd } from '../../../assets/svg/Pvd'
import { Raspis } from '../../../assets/svg/Raspis'
import { VedomostiSvg } from '../../../assets/svg/VedomostiSvg'
import { useAppDispatch, useAppSelector } from '../../../store'
import { setIsEditTableScheduleTeacher } from '../../../store/reducers/authSlice'
import { setSemestrForm, setYearForm } from '../../../store/reducers/forTeacherSlice'
import { Schedule } from '../../cards/Schedule'
import { Header } from '../../layout/Header'

import Brs from './forTeachersService/Brs'
import JournalPosElem from './forTeachersService/JournalPosElem'
import ScheduleTeacher from './forTeachersService/ScheduleTeacher'
import NavJournal from './forTeachersService/navJournal'

export const NavForTeachers = () => {
	const dispatch = useAppDispatch()
	const [current, setCurrent] = useState('schedule')
	const [form] = Form.useForm()
	const navigate = useNavigate()
	const { t } = useTranslation()
	const ref1 = useRef(null)
	const ref2 = useRef(null)
	const ref3 = useRef(null)
	const refArray = [ref1, ref2, ref3]
	const isEditTableScheduleTeacher = useAppSelector(state => state.auth.isEditTableScheduleTeacher)
	const yearForm = Form.useWatch('year', form)
	const semestrForm = Form.useWatch('semestr', form)
	
	useEffect(() => {
		dispatch(setYearForm(yearForm))
	}, [yearForm])

	useEffect(() => {
		dispatch(setSemestrForm(semestrForm))
	}, [semestrForm])

	const items: any = [
		{ key: 'schedule', icon: <Raspis />, label: <p className="ml-[10px]">{t('Schedule')}</p> },
		{ key: 'BRS', icon: <BrsSvg />, label: <p className="ml-[10px]">{t('BRS')}</p> },
		{ key: 'vedomosti', icon: <VedomostiSvg />, label: <p className="ml-[10px]">{t('vedomosti')}</p> },
		{ key: 'journalPos', icon: <JournalPos />, label: <p className="ml-[10px]">{t('journalPos')}</p> },
		// { key: 'rpd', icon: <Pvd />, label: <p className="ml-[10px]">{t('rpd')}</p> }
	]

	const onClick: MenuProps['onClick'] = e => {
		if (isEditTableScheduleTeacher) {
			let conf = window.confirm('Вы действительно хотите продолжить? Есть несохраненные изменения')
			if (!conf) {
				return
			}
		}
		if (e.key === 'sub3') {
			return
		}
		// navigate('/services/' + e.key)
		setCurrent(e.key)
		dispatch(setIsEditTableScheduleTeacher(false))
	}
	const handleYearChange = () => {
		form.resetFields(['semestr'])
	}

	const generateYearsArray = () => {
		const currentYear = new Date().getFullYear()
		const years = []

		for (let year = currentYear; year >= 2008; year--) {
			years.push({
				value: year,
				label: `${year}/${year + 1}`
			})
		}

		return years
	}

	function getCurrentAcademicYear() {
		const now = new Date()
		const year = now.getFullYear()
		const month = now.getMonth() // Месяцы начинаются с 0 (январь)

		// Учебный год обычно начинается в сентябре
		if (month >= 8) {
			return `${year}/${year + 1}`
		} else {
			return `${year - 1}/${year}`
		}
	}

	return (
		<>
			<Header type={'service'} service={t('ToTeacher')} />
			<Menu
				selectedKeys={[current]}
				mode="inline"
				onClick={onClick}
				className="min-w-[230px] max-w-[230px] flex flex-col  mt-36 h-[calc(100vh-144px)]"
				items={items.map((item: any, index: number) => ({
					key: item.key,
					icon: item.icon,
					children: item.children,
					label: (
						<div className="" ref={refArray[index]}>
							{item?.label}
						</div>
					)
				}))}
			/>

			<div className="bg-[#F5F8FB] w-full pt-[70px]      ">
				<Form
					form={form}
					initialValues={{
						year: `${getCurrentAcademicYear()}`
					}}
					className="px-[80px] pt-[80px]"
				>
					<Row>
						<Col span={7}>
							<Form.Item
								name="year"
								label={t('academicYear')}
								labelAlign="left"
								labelCol={{ span: 8 }} // Фиксированная ширина лейбла
								wrapperCol={{ span: 13 }} // Оставшаяся ширина для инпута
							>
								<Select allowClear options={generateYearsArray()} onChange={handleYearChange} />
							</Form.Item>
						</Col>

						<Col span={9}>
							<Form.Item
								name="semestr"
								label={t('Semester')}
								labelAlign="left"
								labelCol={{ span: 4 }}
								wrapperCol={{ span: 10 }}
							>
								<Select
									disabled={!yearForm}
									allowClear
									options={[
										{ value: 1, label: '1' },
										{ value: 2, label: '2' }
									]}
								/>
							</Form.Item>
						</Col>
					</Row>
				</Form>
				{current === 'schedule' && <ScheduleTeacher />}
				{current === 'BRS' ? <Brs /> : ''}
				{current === 'vedomosti' ? <></> : ''}
				{current === 'journalPos' ? <NavJournal /> : ''}
			</div>
		</>
	)
}
