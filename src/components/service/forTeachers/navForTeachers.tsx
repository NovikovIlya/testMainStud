import { MenuFoldOutlined, MenuUnfoldOutlined, MessageOutlined, PieChartOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Col, Form, Menu, Row, Select } from 'antd'
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

import Vedomosti from './forTeachersService/Vedomosti'
import NavJournal from './forTeachersService/NavJournal'
import { getCurrentAcademicYear } from '../../../utils/getCurrentAcademicYear'

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
	const [collapsed, setCollapsed] = useState(false);

	const toggleCollapsed = () => {
	  setCollapsed(!collapsed);
	};

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
		if (isEditTableScheduleTeacher) {
			let conf = window.confirm('Вы действительно хотите продолжить? Есть несохраненные изменения')
			if (!conf) {
				form.setFieldsValue({ year: yearForm });
				return
			}
		}else{
			form.resetFields(['semestr'])
			dispatch(setIsEditTableScheduleTeacher(false))
		}
		
	}

	const handleSemesctrChange = ()=>{
		if (isEditTableScheduleTeacher) {
			let conf = window.confirm('Вы действительно хотите продолжить? Есть несохраненные изменения')
			if (!conf) {
				form.setFieldsValue({ semestr: semestrForm });
				return
			}
		}else{
			dispatch(setIsEditTableScheduleTeacher(false))
		}
		
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


	function getCurrentSemester() {
		const now = new Date();
		const currentYear = now.getFullYear();
	
		// Определяем начало первого семестра (1 сентября текущего или предыдущего года)
		let startFirstSemester = new Date(currentYear, 8, 1); // 8 = сентябрь
		if (now < startFirstSemester) {
			startFirstSemester = new Date(currentYear - 1, 8, 1);
		}
	
		// Окончание первого семестра (31 января следующего года)
		const endFirstSemester = new Date(startFirstSemester.getFullYear() + 1, 0, 31);
	
		// Начало второго семестра (1 февраля следующего года)
		const startSecondSemester = new Date(startFirstSemester.getFullYear() + 1, 1, 1);
	
		// Окончание второго семестра (30 июня)
		const endSecondSemester = new Date(startFirstSemester.getFullYear() + 1, 5, 30);
	
		if (now >= startFirstSemester && now <= endFirstSemester) {
			return 1;
		} else if (now >= startSecondSemester && now <= endSecondSemester) {
			return 2;
		} else {
			// Для июля, августа и дней после окончания второго семестра возвращаем 2
			return 2;
		}
	}

	return (
		<>
			<Header type={'service'} service={t('ToTeacher')} />
			<Menu
			 inlineCollapsed={collapsed}
				selectedKeys={[current]}
				mode="inline"
				onClick={onClick}
				className=" max-w-[230px] flex flex-col  mt-36 h-[calc(100vh-144px)] shadow"
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
			<Button type="primary" className='fixed bottom-[10px] left-[-10px]' onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>

			<div className="bg-[#F5F8FB] w-full pt-[70px]      ">
				<Form
					form={form}
					initialValues={{
						year: getCurrentAcademicYear().value, // Только значение `value`
						// semestr: getCurrentSemester(),
					  }}
					className="px-[80px] pt-[80px]"
				>
					<Row className='shadow mb-4 pt-4 pb-0 px-4 rounded-lg bg-white'>
						<Col span={7} className=''>
							<Form.Item
								className=''
								name="year"
								label={t('academicYear')}
								labelAlign="left"
								labelCol={{ span: 9 }} // Фиксированная ширина лейбла
								wrapperCol={{ span: 13 }} // Оставшаяся ширина для инпута
							>
								<Select allowClear options={generateYearsArray()} onChange={handleYearChange} />
							</Form.Item>
						</Col>

						<Col span={9}>
							<Form.Item
								className=' '
								name="semestr"
								label={t('Semester')}
								labelAlign="left"
								labelCol={{ span: 5 }}
								wrapperCol={{ span: 10 }}
							>
								<Select
									onChange={handleSemesctrChange}
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
				{current === 'vedomosti' ? <Vedomosti/> : ''}
				{current === 'journalPos' ? <NavJournal collapsed={collapsed}/> : ''}
			</div>
		</>
	)
}
