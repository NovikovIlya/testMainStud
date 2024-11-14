import { Schedule } from '../cards/Schedule'
import { TemplateCard } from '../cards/Template'

const cookies = document.cookie.split('; ')

const sId = cookies[2]?.split('=')[1] || ''
const hId = cookies[3]?.split('=')[1] || ''
const aId = cookies[4]?.split('=')[1] || ''
/**
 * s_id:"22408606452196311228958538938715"
 * h_id:"9BC8497C61F2354B23D2AE0FCDCA318E"
 */
export const jsxElements = [
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
				href="https://shelly.kpfu.ru/e-ksu/portal_person.kurs_cifra#tab1"
				img="/image24.png"
				info="StaffInfo"
				title="Staff"
				width={130}
				height={137}
				isRounded
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
				href="https://shelly.kpfu.ru/e-ksu/portal_person.kurs_cifra?p_type_menu_open=2#tab1"
				info="EducationalCoursesInfo"
				title="EducationalCourses"
				img="/image2.png"
				width={177}
				height={150}
				buttonText="SignUp"
				buttonType="primary"
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
				href="https://media.kpfu.ru/news?kn%5B0%5D=Новости%20науки&created="
				info="NewsInfo"
				title="News"
				img="/image3.png"
				positionImage="-mt-4"
				width={177}
				height={170}
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
				info="Сервис поможет вам получить актуальную информацию о ваших практиках"
				title="Мои практики"
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
				info="Практики для учителя"
				title="Практики для учителя"
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
]
