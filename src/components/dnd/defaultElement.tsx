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
		index: 'ElectronicBook',
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
			x: 1,
			y: 0,
			i: 'ElectronicBook'
		}
	},
	{
		index: 'Session',
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
			x: 1,
			y: 0,
			i: 'Session'
		}
	},
	{
		index: 'Applications',
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
			x: 1,
			y: 0,
			i: 'Applications'
		}
	},
	// {
	// 	index: 'MyRating',
	// 	element: (
	// 		<TemplateCard
	// 			href="/user/#"
	// 			img="/image18.png"
	// 			info="В разделе отображается рейтинг учащегося за все годы обучения"
	// 			title="Мой рейтинг"
	// 			width={150}
	// 			height={150}
	// 		/>
	// 	),
	// 	place: {
	// 		w: 1,
	// 		h: 1,
	// 		x: 1,
	// 		y: 0,
	// 		i: 'MyRating'
	// 	}
	// },
	// {
	// 	index: 'Grade',
	// 	element: (
	// 		<TemplateCard
	// 			href="/user/#"
	// 			img="/image725.png"
	// 			info="Оценки и баллы на протяжении всего учебного времени"
	// 			title="Успеваемость"
	// 			width={87}
	// 			height={140}
	// 		/>
	// 	),
	// 	place: {
	// 		w: 1,
	// 		h: 1,
	// 		x: 1,
	// 		y: 0,
	// 		i: 'Grade'
	// 	}
	// },
	// {
	// 	index: 'Groupmates',
	// 	element: (
	// 		<TemplateCard
	// 			href="/user/#"
	// 			img="/image19.png"
	// 			info="Список одногруппников, адреса их электронной почты, контакты"
	// 			title="Одногруппники"
	// 			width={130}
	// 			height={137}
	// 			isRounded
	// 		/>
	// 	),
	// 	place: {
	// 		w: 1,
	// 		h: 1,
	// 		x: 1,
	// 		y: 0,
	// 		i: 'Groupmates'
	// 	}
	// },
	// {
	// 	index: 'Map',
	// 	element: (
	// 		<TemplateCard
	// 			href="/user/#"
	// 			img="/image21.png"
	// 			info="Список одногруппников, адреса их электронной почты, контакты"
	// 			title="Карта зданий КФУ"
	// 			width={134}
	// 			height={124}
	// 			buttonText="Изучить"
	// 		/>
	// 	),
	// 	place: {
	// 		w: 1,
	// 		h: 1,
	// 		x: 1,
	// 		y: 0,
	// 		i: 'Map'
	// 	}
	// },
	{
		index: 'Staff',
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
			x: 1,
			y: 0,
			i: 'Staff'
		}
	},
	// {
	// 	index: 'Contests',
	// 	element: (
	// 		<TemplateCard
	// 			href="/user/#"
	// 			img="/image1.png"
	// 			info="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
	// 			title="Конкурсы"
	// 			width={120}
	// 			height={120}
	// 			mt="mt-0"
	// 			buttonText="Записаться"
	// 			buttonType="primary"
	// 		/>
	// 	),
	// 	place: {
	// 		w: 1,
	// 		h: 1,
	// 		x: 1,
	// 		y: 0,
	// 		i: 'Contests'
	// 	}
	// },
	{
		index: 'Vacancies',
		element: (
			<TemplateCard
				href="https://career.kpfu.ru/"
				info="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
				title="VacanciesStudents"
			/>
		),
		place: {
			w: 1,
			h: 1,
			x: 1,
			y: 0,
			i: 'Vacancies'
		}
	},
	// {
	// 	index: 'Events',
	// 	element: (
	// 		<TemplateCard
	// 			href="/user/#"
	// 			info="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
	// 			title="Мероприятия"
	// 			buttonText="Записаться"
	// 			buttonType="primary"
	// 		/>
	// 	),
	// 	place: {
	// 		w: 1,
	// 		h: 1,
	// 		x: 1,
	// 		y: 0,
	// 		i: 'Events'
	// 	}
	// },
	{
		index: 'EducationalCourses',
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
			w: 2,
			h: 1,
			x: 1,
			y: 0,
			i: 'EducationalCourses'
		}
	},
	{
		index: 'Schedule',
		element: <Schedule />,
		place: {
			w: 3,
			h: 1,
			minW: 2,
			x: 0,
			y: 0,
			i: 'Schedule'
		}
	},
	{
		index: 'News',
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
			x: 1,
			y: 0,
			i: 'News'
		}
	},
	{
		index: 'Testing',
		element: (
			<TemplateCard
				href="https://shelly.kpfu.ru/e-ksu/SITE_STUDENT_SH_PR_AC.test_student_personal"
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
			x: 1,
			y: 0,
			i: 'Testing'
		}
	},
	// {
	// 	index: 'Checklist',
	// 	element: (
	// 		<TemplateCard
	// 			href="/user/#"
	// 			info="Заглядывайте в чек-лист, в котором мы описали все шаги для устройства на работу в Казанский федеральный университет"
	// 			title="Чек-лист: как к нам попасть"
	// 			img="/image4.png"
	// 			width={115}
	// 			height={115}
	// 			positionImage="mt-4"
	// 		/>
	// 	),
	// 	place: {
	// 		w: 1,
	// 		h: 1,
	// 		x: 1,
	// 		y: 0,
	// 		i: 'Checklist'
	// 	}
	// },
	// {
	// 	index: 'JobApplicationStatus',
	// 	element: (
	// 		<TemplateCard
	// 			href="/user/#"
	// 			info="В разделе отображается ваш текущий статус заявления на работу"
	// 			title="Статус заявления на работу"
	// 			img="/image5.png"
	// 			width={137}
	// 			height={130}
	// 			positionImage="ml-4 mt-2"
	// 		/>
	// 	),
	// 	place: {
	// 		w: 1,
	// 		h: 1,
	// 		x: 1,
	// 		y: 0,
	// 		i: 'JobApplicationStatus'
	// 	}
	// },
	// {
	// 	index: 'Resume',
	// 	element: (
	// 		<TemplateCard
	// 			href="/user/#"
	// 			info="Мы всегда в поиске крутых специалистов. Заполняйте резюме, отправляйте на проверку и мы рассмотрим Вашу кандидатуру."
	// 			title="Резюме"
	// 			img="/image6.png"
	// 			positionImage="ml-2 -mt-2"
	// 			width={135}
	// 			height={140}
	// 			buttonType="primary"
	// 			buttonText="Отправить"
	// 		/>
	// 	),
	// 	place: {
	// 		w: 1,
	// 		h: 1,
	// 		x: 1,
	// 		y: 0,
	// 		i: 'Resume'
	// 	}
	// },
	// {
	// 	index: 'MyCourses',
	// 	element: (
	// 		<TemplateCard
	// 			href="/user/#"
	// 			info="Здесь хранится история ваших курсов, которые вы когда-либо проходили, проходите или собираетесь пройти"
	// 			title="Мои курсы"
	// 			img="/image7.png"
	// 			positionImage="mt-3"
	// 			width={119}
	// 			height={106}
	// 		/>
	// 	),
	// 	place: {
	// 		w: 1,
	// 		h: 1,
	// 		x: 1,
	// 		y: 0,
	// 		i: 'MyCourses'
	// 	}
	// },
	{
		index: 'DocumentFlow',
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
			x: 1,
			y: 0,
			i: 'DocumentFlow'
		}
	},
	{
		index: 'PaySheet',
		element: (
			<TemplateCard
				href={`https://shelly.kpfu.ru/e-ksu/student_grants.pay_list?p1=${aId}&p2=${sId}&p_h=${hId}`}
				info="PaySheetInfo"
				title="PaySheet"
				img="/image9.png"
				width={140}
				height={140}
				positionImage="-mt-4"
			/>
		),
		place: {
			w: 1,
			h: 1,
			x: 1,
			y: 0,
			i: 'PaySheet'
		}
	},
	// {
	// 	index: 'TasksProjects',
	// 	element: (
	// 		<TemplateCard
	// 			href="/user/#"
	// 			info="Один из старейших университетов в России, основанный в 1804 году. Университет славится своими сильными школами математики..."
	// 			title="Задачи и проекты"
	// 			img="/image10.png"
	// 			width={130}
	// 			height={130}
	// 		/>
	// 	),
	// 	place: {
	// 		w: 1,
	// 		h: 1,
	// 		x: 1,
	// 		y: 0,
	// 		i: 'TasksProjects'
	// 	}
	// },
	// {
	// 	index: 'BusinessTrips',
	// 	element: (
	// 		<TemplateCard
	// 			href=""
	// 			info="Как попасть в двойку и многие другие ответы по местоположению зданий КФУ Вы найдете в этом сервисе"
	// 			title="Командировки"
	// 			img="/image11.png"
	// 			buttonText="Изучить"
	// 			width={120}
	// 			height={130}
	// 		/>
	// 	),
	// 	place: {
	// 		w: 1,
	// 		h: 1,
	// 		x: 1,
	// 		y: 0,
	// 		i: 'BusinessTrips'
	// 	}
	// },
	// {
	// 	index: 'Vacation',
	// 	element: (
	// 		<TemplateCard
	// 			href="/user/#"
	// 			info="В разделе отображается рейтинг сотрудника в списке коллег"
	// 			title="Отпуск"
	// 			img="/image12.png"
	// 			buttonText="Изучить"
	// 			positionImage="pl-6"
	// 			width={140}
	// 			height={130}
	// 		/>
	// 	),
	// 	place: {
	// 		w: 1,
	// 		h: 1,
	// 		x: 1,
	// 		y: 0,
	// 		i: 'Vacation'
	// 	}
	// },
	{
		index: 'Practices',
		element: (
			<TemplateCard
				href="/services/practices"
				info="PracticesInfo"
				title="Practices"
				buttonText="Study"
			/>
		),
		place: {
			w: 1,
			h: 1,
			x: 1,
			y: 0,
			i: 'Practices'
		}
	},
	{
		index: 'SitAnKFU',
		element: (
			<TemplateCard
				href="https://sa.kpfu.ru/news_aggregator/news/"
				info="SitAnKFUInfo"
				title="SitAnKFU"
				img="/image45.png"
				buttonText="Watch"
				height={160}
			/>
		),
		place: {
			w: 1,
			h: 1,
			x: 1,
			y: 0,
			i: 'SitAnKFU'
		}
	},
	{
		index: 'Dormitory',
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
			x: 1,
			y: 0,
			i: 'Dormitory'
		}
	},
	{
		index: 'VirtualAudience',
		element: (
			<TemplateCard
				href="#"
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
			x: 1,
			y: 0,
			i: 'VirtualAudience'
		}
	},
	{
		index: 'PsychologicalHelp',
		element: (
			<TemplateCard
				href="#"
				info="PsychologicalHelpInfo"
				title="PsychologicalHelp"
				buttonText="Watch"
				img={'/image50.png'}
				width={110}
				height={132}
			/>
		),
		place: {
			w: 1,
			h: 1,
			x: 1,
			y: 0,
			i: 'PsychologicalHelp'
		}
	},
	{
		index: 'DigitalDepartments',
		element: (
			<TemplateCard
				href="#"
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
			x: 1,
			y: 0,
			i: 'DigitalDepartments'
		}
	},
	{
		index: 'ManagementScientificProjects',
		element: (
			<TemplateCard
				href="#"
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
			x: 1,
			y: 0,
			i: 'ManagementScientificProjects'
		}
	},
]
