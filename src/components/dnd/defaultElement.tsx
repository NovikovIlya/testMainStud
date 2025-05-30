import { useAppSelector } from '../../store'
import { DirectResume } from '../cards/DirectResume'
import { Schedule } from '../cards/Schedule'
import { Seeker } from '../cards/Seeker'
import { TemplateCard } from '../cards/Template'

const cookies = document.cookie.split('; ')

const sId = cookies[2]?.split('=')[1] || ''
const hId = cookies[3]?.split('=')[1] || ''
const aId = cookies[4]?.split('=')[1] || ''

const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null
const urlObrProgram = () => {
	switch (user?.filialType) {
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
}

export const jsxElements = [
	{
		key: 'jobSeeker',
		element: <Seeker />,
		place: {
			w: 3,
			h: 1,
			minW: 3,
			maxW: 3,
			x: 0,
			y: 0,
			i: 'jobSeeker'
		}
	},
	{
		key: 'myResponds',
		element: (
			<TemplateCard
				title="Мои отклики"
				info="В разделе отображается ваш текущий статус заявления на работу"
				href="/services/myresponds/responds"
				img="/myrespondsicon.png"
				width={146}
				height={136}
				mt="mt-[25px]"
			/>
		),
		place: {
			w: 1,
			h: 1,
			x: 0,
			y: 0,
			i: 'myResponds'
		}
	},
	{
		key: 'DirectResume',
		element: (
			<DirectResume
				href="#"
				img="/directresumeimage.png"
				info="Не нашли подходящую вакансию? Заполняйте резюме, отправляйте на проверку и мы рассмотрим вашу кандидатуру"
				title="Резюме"
				buttonText="Создать"
				buttonType="primary"
				height={99}
				width={85}
				positionImage="mt-2"
			/>
		),
		place: {
			w: 1,
			h: 1,
			x: 1,
			y: 0,
			i: 'DirectResume'
		}
	},
	{
		key: 'personnelAccounting',
		element: <TemplateCard title="Трудоустройство" info="" href="/services/personnelaccounting" buttonText="Изучить" />,
		place: {
			w: 1,
			h: 1,
			x: 2,
			y: 0,
			i: 'personnelAccounting'
		}
	},
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
				href="https://edu.kpfu.ru"
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
				href="https://media.kpfu.ru/news?kn%5B0%5D=Новости%20науки&created="
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
				href={urlObrProgram()}
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
