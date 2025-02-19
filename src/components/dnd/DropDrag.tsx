import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons'
import { useLocalStorageState } from 'ahooks'
import { Button, Col, Row, Spin } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import { useDispatch } from 'react-redux'
import 'react-resizable/css/styles.css'
import { Link } from 'react-router-dom'

import { useAppSelector } from '../../store'
import { useGetInfoUserQuery } from '../../store/api/formApi'
import { useCheckIsEmployeeQuery } from '../../store/api/practiceApi/contracts'
import { useGetModulesQuery } from '../../store/api/roleModel/roleModel'
import { useGetRoleQuery } from '../../store/api/serviceApi'
import { changeLayout, removeCard } from '../../store/reducers/LayoutsSlice'
import { AboutUniversityCard } from '../aboutUniversity/AboutUniversityCard'
import { Apply } from '../apply/Apply'
import { Schedule } from '../cards/Schedule'
import { TemplateCard } from '../cards/Template'

import { block } from './constant'
import i18n from '../../18n'

const studentKeys = [
	'Schedule',
	'ElectronicBook',
	'Session',
	'Dormitory',
	'myPractices',
	'EducationalCourses',
	'PsychologicalHelp',
	'News',
	'DocumentFlow',
	'VirtualAudience',
	'DigitalDepartments',
	'ManagementScientificProjects',
	'Testing',
	'Vacancies',
	'petitionForDocument',
	'contractEducation',
	'educationPrograms'
]

const employeeKeys = [
	'News',
	'Practices',
	'practiceTeacher',
	'Staff',
	'forTeachers'
	// 'shortLink'
]

const DropDrag = () => {
	const dispatch = useDispatch()
	const layout = block
	const edit = useAppSelector(state => state.auth.edit)
	const {
		data: dataCheck,
		isSuccess: isSuccessCheck,
		isLoading: isLoadingCheck,
		isFetching: isFetchingIsEmpl
	} = useCheckIsEmployeeQuery()
	const {
		data: dataGetInfoSubrole,
		isLoading: isLoadingGetInfoSubrole,
		isSuccess: isSuccessGetInfoSubrole
	} = useGetInfoUserQuery()
	const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('lg')
	const [mounted, setMounted] = useState(false)
	const [toolbox, setToolbox] = useState<{ [index: string]: any[] }>({ lg: [] })
	const ResponsiveReactGridLayout = useMemo(() => WidthProvider(Responsive), [])
	const [mainRole] = useLocalStorageState<any>('typeAcc', { defaultValue: 'STUD' })
	const { data: dataSubRole, isSuccess: isSuccessSubRole, isLoading: isLoadingSubRole } = useGetRoleQuery(null)
	const [subRole, setSubrole] = useLocalStorageState<any>('subRole', { defaultValue: '' })
	const [windowSize, setWindowSize] = useState(getWindowSize())
	const { data: dataModules } = useGetModulesQuery()
	const [user, setInfo] = useLocalStorageState<any>('user')

	const [href, setHref] = useLocalStorageState<any>('href', {
		defaultValue: ''
	})


	const urlObrProgram = useMemo(() => {
		switch (href) {
			case 'KAZAN':
				return 'https://kpfu.ru/sveden/education/#eduop'
			case 'ELABUGA':
				return 'https://stat-elabuga.kpfu.ru/sveden/education/#eduop'
			case 'CHELNY':
				return 'https://kpfu.ru/chelny/sveden/'
			case 'DZHIZAK':
				return 'https://kpfu.ru/dzhizak/sveden/education/'
			case 'CAIRO':
				return ''
			default:
				return '' // или любое другое значение по умолчанию
		}
	}, [href])

	const jsxElements = [
		{
			key: 'ElectronicBook',
			element: (
				<TemplateCard
					href="/services/electronicBook/estimation"
					img="/image23.png"
					info="ElectronicBookInfo"
					title="ElectronicBook"
				/>
			),
			place: {
				w: 1,
				h: 1,
				x: 0,
				y: 0,
				i: 'ElectronicBook'
			}
		},
		{
			key: 'Session',
			element: (
				<TemplateCard
					href="/services/session/session"
					img="/image28.png"
					info="SessionInfo"
					title="Session"
					width={102}
					height={172}
				/>
			),
			place: {
				w: 1,
				h: 1,
				x: 0,
				y: 0,
				i: 'Session'
			}
		},
		{
			key: 'Applications',
			element: (
				<TemplateCard
					href="https://shelly.kpfu.ru/e-ksu/site_student_sh_pr_ac.offor_document?p_menu=14&p_type_menu_open=151"
					img="/image31.png"
					info="ApplicationsInfo"
					title="Applications"
					width={96}
					height={114}
					isLink
				/>
			),
			place: {
				w: 1,
				h: 1,
				x: 0,
				y: 0,
				i: 'Applications'
			}
		},
		{
			key: 'Staff',
			element: (
				<TemplateCard
					href="https://kpfu.ru/staff/sotrudniki-kfu"
					img="/image24.png"
					info="StaffInfo"
					title="Staff"
					width={130}
					height={137}
					isRounded
					isLink
				/>
			),
			place: {
				w: 1,
				h: 1,
				x: 0,
				y: 0,
				i: 'Staff'
			}
		},
		{
			key: 'Vacancies',
			element: (
				<TemplateCard
					href="https://career.kpfu.ru/"
					info="VacanciesInfo"
					title="Vacancies"
					img={'/image55.png'}
					positionImage={'mt-8 ml-5'}
					isLink
				/>
			),
			place: {
				w: 1,
				h: 1,
				x: 0,
				y: 0,
				i: 'Vacancies'
			}
		},
		{
			key: 'EducationalCourses',
			element: (
				<TemplateCard
					href={`${i18n.language === 'ru' ? "https://edu.kpfu.ru" : " https://edu.kpfu.ru/?lang=en"}`}
					info="EducationalCoursesInfo"
					title="EducationalCourses"
					img="/image2.png"
					width={177}
					height={150}
					buttonText="SignUp"
					buttonType="primary"
					isLink
				/>
			),
			place: {
				w: 1,
				h: 1,
				x: 0,
				y: 0,
				i: 'EducationalCourses'
			}
		},
		{
			key: 'Schedule',
			element: <Schedule />,
			place: {
				w: 3,
				h: 1,

				x: 0,
				y: 0,
				i: 'Schedule',
				static: true
			}
		},
		{
			key: 'News',
			element: (
				<TemplateCard
					href={`${i18n.language === 'ru' ? "https://media.kpfu.ru/news?kn%5B0%5D=Новости%20науки&created=" : "https://eng.kpfu.ru/news-archive/"}`}
					info="NewsInfo"
					title="News"
					img="/image3.png"
					positionImage="-mt-4"
					width={177}
					height={170}
					isLink
				/>
			),
			place: {
				w: 1,
				h: 1,
				x: 0,
				y: 0,
				i: 'News'
			}
		},
		{
			key: 'Testing',
			element: (
				<TemplateCard
					href="https://shelly.kpfu.ru/e-ksu/SITE_STUDENT_SH_PR_AC.test_student_personal?p_menu=28"
					info="TestingInfo"
					title="Testing"
					buttonText="Pass"
					buttonType="primary"
					img="/image46.png"
					width={98}
					height={125}
					positionImage={'mt-2'}
					isLink
				/>
			),
			place: {
				w: 1,
				h: 1,
				x: 0,
				y: 0,
				i: 'Testing'
			}
		},
		{
			key: 'DocumentFlow',
			element: (
				<TemplateCard
					href="/services/unifiedServiceCenter/documentFlow"
					info="DocumentFlowInfo"
					title="DocumentFlow"
					img="/image8.png"
					width={120}
					height={120}
				/>
			),
			place: {
				w: 1,
				h: 1,
				x: 0,
				y: 0,
				i: 'DocumentFlow'
			}
		},
		// {
		// 	key: 'PaySheet',
		// 	element: (
		// 		<TemplateCard
		// 			href={`https://shelly.kpfu.ru/e-ksu/student_grants.pay_list?p1=${aId}&p2=${sId}&p_h=${hId}`}
		// 			info="PaySheetInfo"
		// 			title="PaySheet"
		// 			img="/image9.png"
		// 			width={140}
		// 			height={140}
		// 			positionImage="-mt-4"
		// 		/>
		// 	),
		// 	place: {
		// 		w: 1,
		// 		h: 1,
		// 		x: 0,
		// 		y: 0,
		// 		i: 'PaySheet'
		// 	}
		// },
		{
			key: 'Practices',
			element: (
				<TemplateCard
					href="/services/practices"
					info="PracticesInfo"
					title="Practices"
					buttonText="Study"
					img="/Group499.png"
				/>
			),
			place: {
				w: 1,
				h: 1,
				x: 0,
				y: 0,
				i: 'Practices'
			}
		},
		{
			key: 'myPractices',
			element: (
				<TemplateCard
					href="/services/mypractices"
					info="myPracticeInfo"
					title="myPractices"
					buttonText="Study"
					img="/Group499.png"
				/>
			),
			place: {
				w: 1,
				h: 1,
				x: 0,
				y: 0,
				i: 'myPractices'
			}
		},
		{
			key: 'practiceTeacher',
			element: (
				<TemplateCard
					href="/services/practiceteacher"
					info="practiceTeacherInfo"
					title="practiceTeacher"
					buttonText="Study"
					img="/Group499.png"
				/>
			),
			place: {
				w: 1,
				h: 1,
				x: 0,
				y: 0,
				i: 'practiceTeacher'
			}
		},
		// {
		// 	key: 'SitAnKFU',
		// 	element: (
		// 		<TemplateCard
		// 			href="https://sa.kpfu.ru/news_aggregator/news/"
		// 			info="SitAnKFUInfo"
		// 			title="SitAnKFU"
		// 			img="/image45.png"
		// 			buttonText="Watch"
		// 			height={160}
		// 		/>
		// 	),
		// 	place: {
		// 		w: 1,
		// 		h: 1,
		// 		x: 0,
		// 		y: 0,
		// 		i: 'SitAnKFU'
		// 	}
		// },
		{
			key: 'Dormitory',
			element: (
				<TemplateCard
					href="https://shelly.kpfu.ru/e-ksu/SITE_STUDENT_SH_PR_AC.dormitory_work_document?p_menu=37"
					info="DormitoryInfo"
					title="Dormitory"
					buttonText="Study"
					img={'/image47.png'}
					positionImage={'mt-6'}
					isLink
				/>
			),
			place: {
				w: 1,
				h: 1,
				x: 0,
				y: 0,
				i: 'Dormitory'
			}
		},
		{
			key: 'VirtualAudience',
			element: (
				<TemplateCard
					href="https://shelly.kpfu.ru/e-ksu/site_student_services.study_tasks"
					info="VirtualAudienceInfo"
					title="VirtualAudience"
					buttonText="Watch"
					img={'./image48.png'}
					width={137}
					height={106}
					positionImage={'mt-6'}
					isLink
				/>
			),
			place: {
				w: 1,
				h: 1,
				x: 0,
				y: 0,
				i: 'VirtualAudience'
			}
		},
		{
			key: 'PsychologicalHelp',
			element: (
				<TemplateCard
					href="https://shelly.kpfu.ru/e-ksu/student_psi_test.record_medic?p_menu=42"
					info="PsychologicalHelpInfo"
					title="PsychologicalHelp"
					buttonText="Watch"
					img={'/image50.png'}
					width={110}
					height={132}
					mt={'mt-1'}
					isLink
				/>
			),
			place: {
				w: 1,
				h: 1,
				x: 0,
				y: 0,
				i: 'PsychologicalHelp'
			}
		},
		{
			key: 'DigitalDepartments',
			element: (
				<TemplateCard
					href="https://shelly.kpfu.ru/e-ksu/portal_person.kurs_cifra#tab1"
					info="DigitalDepartmentsInfo"
					title="DigitalDepartments"
					buttonText="Watch"
					img={'/image52.png'}
					width={99}
					height={97}
					positionImage={'mt-7 ml-2'}
					isLink
				/>
			),
			place: {
				w: 1,
				h: 1,
				x: 0,
				y: 0,
				i: 'DigitalDepartments'
			}
		},
		{
			key: 'ManagementScientificProjects',
			element: (
				<TemplateCard
					href="https://shelly.kpfu.ru/e-ksu/portal_person.kurs_cifra?p_type_menu_open=2#tab1"
					info="ManagementScientificProjectsInfo"
					title="ManagementScientificProjects"
					buttonText="Watch"
					img={'/image54.png'}
					width={113}
					height={95}
					positionImage={'mt-7'}
					isLink
				/>
			),
			place: {
				w: 1,
				h: 1,
				x: 0,
				y: 0,
				i: 'ManagementScientificProjects'
			}
		},
		{
			key: 'petitionForDocument',
			element: (
				<TemplateCard
					href="https://shelly.kpfu.ru/e-ksu/SITE_STUDENT_SH_PR_AC.offor_document?p_menu=14"
					info="petitionForDocumentInfo"
					title="petitionForDocument"
					buttonText="Watch"
					img={'/petition.png'}
					className="object-contain"
					positionImage={'mt-7'}
					isLink
				/>
			),
			place: {
				w: 1,
				h: 1,
				x: 0,
				y: 0,
				i: 'ManagementScientificProjects'
			}
		},
		{
			key: 'contractEducation',
			element: (
				<TemplateCard
					href="https://shelly.kpfu.ru/e-ksu/SITE_STUDENT_SH_PR_AC.contracts?p_menu=34"
					info="contractEducationInfo"
					title="contractEducation"
					buttonText="Watch"
					img={'/contractEduc.png'}
					className="object-contain"
					positionImage={'mt-7'}
					isLink
				/>
			),
			place: {
				w: 1,
				h: 1,
				x: 0,
				y: 0,
				i: 'ManagementScientificProjects'
			}
		},
		{
			key: 'educationPrograms',
			element: (
				<TemplateCard
					href={urlObrProgram}
					info="educationProgramsInfo"
					title="educationPrograms"
					buttonText="Watch"
					img={'/educProg.png'}
					className="object-contain"
					positionImage={'mt-7'}
					isLink
				/>
			),
			place: {
				w: 1,
				h: 1,
				x: 0,
				y: 0,
				i: 'ManagementScientificProjects'
			}
		},
		{
			key: 'forTeachers',
			element: (
				<TemplateCard
					info="forTeachersinfo"
					title="forTeachers"
					buttonText="Watch"
					img={'/educProg.png'}
					href="/services/forTeachers"
				/>
			),
			place: {
				w: 1,
				h: 1,
				x: 0,
				y: 0,
				i: 'ManagementScientificProjects'
			}
		},
		{
			key: 'shortLink',
			element: (
				<TemplateCard
					info="shortLinkInfo"
					title="shortLink"
					buttonText="Watch"
					img={'/educProg.png'}
					href="/services/shorturl"
				/>
			),
			place: {
				w: 1,
				h: 1,
				x: 0,
				y: 0,
				i: 'ManagementScientificProjects'
			}
		}
	]

	useEffect(() => {
		if (isSuccessSubRole) {
			if (mainRole === 'OTHER') {
				console.log('dataSubRole', dataSubRole)
				setSubrole(dataSubRole ? dataSubRole[0].role : '')
			}
		}
	}, [isSuccessSubRole, dataSubRole])

	useEffect(() => {
		setMounted(true)
	}, [])

	useEffect(() => {
		function handleWindowResize() {
			setWindowSize(getWindowSize())
		}

		window.addEventListener('resize', handleWindowResize)

		return () => {
			window.removeEventListener('resize', handleWindowResize)
		}
	}, [])

	useEffect(() => {
		if (dataModules && Array.isArray(dataModules)) {
			dataModules?.map((module: any) => {
				return <TemplateCard title={module.moduleName} info={module.description} href={module.link} />
			})
		}
	}, [dataModules])

	const onBreakpointChange = (breakpoint: any) => {
		setCurrentBreakpoint(breakpoint)
		setToolbox({
			...toolbox,
			[breakpoint]: toolbox[breakpoint] || toolbox[currentBreakpoint] || []
		})
	}

	const onLayoutChange = (layout: any, layouts: any) => {
		dispatch(changeLayout(layouts))
	}

	
	const layoutValid = layout.lg.filter(
		obj1 =>
			jsxElements.filter(item => {
				if (mainRole === 'STUD') {
					return studentKeys.includes(item.key)
				} else if (mainRole === 'EMPL') {
					// отображаем Практики для деканата в зависимости от contract
					return (item.key === 'Practices' && isSuccessCheck) || employeeKeys.includes(item.key)
				} else {
					return <>Такой роли нет</>
				}
			})
	)

	const generateDOM = layoutValid
		.map(item => {
			return (
				<div key={item.i} className="bg-white/70 backdrop-blur-sm rounded-[20px] shadow-md ">
					<div className="w-full h-full">
						{/* {edit && item.i !== 'Schedule' && (
						<div
							className="absolute top-2 cursor-pointer right-2"
							onClick={() => onRemoveItem(item.i)}
						>
							<DeleteOutlined className=" mt-2 mr-2 opacity-50" />
						</div>
					)} */}
						{
							jsxElements
								.filter(el => el.key === item.i)
								[0]?.element
						}
					</div>
				</div>
			)
		})
		.filter(item => {
			if (mainRole === 'STUD') {
				return studentKeys.includes(item?.key ? item?.key : '')
			} else if (mainRole === 'EMPL') {
				return (item.key === 'Practices' && isSuccessCheck) || employeeKeys.includes(item?.key ? item?.key : '')
			} else {
				return <>Такой роли не найдено</>
			}
		})

	const renderContent = () => {
		if (mainRole === 'ABITUR' || (mainRole === 'OTHER' && subRole === 'ABIT')) {
			if (isLoadingGetInfoSubrole || isLoadingSubRole)
				return (
					<>
						<Spin className="w-full mt-20" indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
					</>
				)
			return (
				<>
					<Apply />
					<Row className="mb-10">
						<Col span={8}>
							<AboutUniversityCard />
						</Col>
					</Row>
				</>
			)
		}
		if (mainRole === 'OTHER') {
			if (isLoadingSubRole)
				return (
					<>
						<Spin className="w-full mt-20" indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
					</>
				)

			if (subRole === 'SCHOOL') {
				return (
					<>
						<Row>
							<Col span={8}>
								<AboutUniversityCard />
							</Col>
						</Row>
					</>
				)
			}

			if (subRole === 'ATTEND' || subRole === 'GUEST') {
				return (
					<>
						<Row>
							<Col span={8}>
								<AboutUniversityCard />
							</Col>
						</Row>
					</>
				)
			}
			if (subRole === 'SEEKER') {
				return (
					<>
						<Row>
							<Col span={8}>
								<AboutUniversityCard />
							</Col>
						</Row>
					</>
				)
			}
			if (subRole === '') {
				return (
					<>
						<Link to="/infoUser">
							<Button>Вернуться к выбору роли</Button>
						</Link>
					</>
				)
			}
		}

		if (isLoadingCheck)
			return (
				<>
					<Spin className="w-full mt-20" indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
				</>
			)
		return (
			<ResponsiveReactGridLayout
				className="layout mb-10"
				cols={{ lg: 3, md: 2, sm: 2, xs: 2, xxs: 1 }}
				rowHeight={windowSize.innerWidth < 768 ? 210 : 320}
				containerPadding={[0, 0]}
				margin={[20, 20]}
				layouts={layout}
				measureBeforeMount={true}
				useCSSTransforms={mounted}
				onLayoutChange={onLayoutChange}
				onBreakpointChange={onBreakpointChange}
				isDraggable={edit}
				isResizable={false}
				compactType="vertical"
				verticalCompact={true}
				preventCollision={true}
			>
				{generateDOM}
			</ResponsiveReactGridLayout>
		)
		// return (
		// 	<div className="grid grid-cols-3 grid-rows-3 gap-4 ">
		// 		{dataModules?.toSorted((a:any, b:any) => {
		// 			if(mainRole === 'STUD'){
		// 				if (a.moduleName === 'Schedule') return -1;
		// 				if (b.moduleName !== 'Schedule') return 1;
		// 				return 0;
		// 			}
		// 			else if(mainRole === 'ABITUR' || (mainRole === 'OTHER' && subRole === 'ABIT')){
		// 				if (a.moduleName === 'Apply') return -1;
		// 				if (b.moduleName !== 'Apply') return 1;
		// 				return 0;
		// 			}else return 0
		// 		  })
		// 		.map((module:any, index: number) => {
		// 			if(module.moduleName==='Apply'){
		// 				return	<div key={index} className="a col-span-3">
		// 							<Apply />
		// 						</div>
		// 			}
		// 			if(module.moduleName==='Schedule'){
		// 				return	<div key={index} className="a col-span-3">
		// 							<Schedule />
		// 						</div>
		// 			}
		// 			return (
		// 				<TemplateCard key={index} title={module.moduleName} info={'Проверяйте свои знания с помощью тестовых материалов'} href={module.link} img={'https://newlk.kpfu.ru/image23.png'} />
		// 			)
		// 		})}
		// 	</div>
		// )
	}

	return <div className="  ">{renderContent()}</div>
}

function getWindowSize() {
	const { innerWidth, innerHeight } = window
	return { innerWidth, innerHeight }
}

export default DropDrag
