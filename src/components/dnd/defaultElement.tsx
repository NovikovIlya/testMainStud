import { Schedule } from '../cards/Schedule'
import { TemplateCard } from '../cards/Template'

export const jsxElements = [
	{
		index: 'ElectronicBook',
		element: (
			<TemplateCard
				href="/services/electronicBook/estimation"
				img="/image23.png"
				info="Здесь находится план вашего обучения, предметы и отведенные для них часы"
				title="Академический календарь"
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
				info="Вся информация по сессии, материалы и баллы отображаются здесь"
				title="Сессия"
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
				href="/user/#"
				img="/image31.png"
				info="Здесь Вы можете подать заявки на оформление различных документов"
				title="Заявки"
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
	{
		index: 'MyRating',
		element: (
			<TemplateCard
				href="/user/#"
				img="/image18.png"
				info="В разделе отображается рейтинг учащегося за все годы обучения"
				title="Мой рейтинг"
				width={150}
				height={150}
			/>
		),
		place: {
			w: 1,
			h: 1,
			x: 1,
			y: 0,
			i: 'MyRating'
		}
	},
	{
		index: 'Grade',
		element: (
			<TemplateCard
				href="/user/#"
				img="/image725.png"
				info="Оценки и баллы на протяжении всего учебного времени"
				title="Успеваемость"
				width={87}
				height={140}
			/>
		),
		place: {
			w: 1,
			h: 1,
			x: 1,
			y: 0,
			i: 'Grade'
		}
	},
	{
		index: 'Groupmates',
		element: (
			<TemplateCard
				href="/user/#"
				img="/image19.png"
				info="Список одногруппников, адреса их электронной почты, контакты"
				title="Одногруппники"
				width={130}
				height={137}
				isRounded
				mt=""
				positionImage="-mt-[11px]"
			/>
		),
		place: {
			w: 1,
			h: 1,
			x: 1,
			y: 0,
			i: 'Groupmates'
		}
	},
	{
		index: 'Map',
		element: (
			<TemplateCard
				href="/user/#"
				img="/image21.png"
				info="Список одногруппников, адреса их электронной почты, контакты"
				title="Карта зданий КФУ"
				width={134}
				height={124}
				buttonText="Изучить"
			/>
		),
		place: {
			w: 1,
			h: 1,
			x: 1,
			y: 0,
			i: 'Map'
		}
	},
	{
		index: 'Staff',
		element: (
			<TemplateCard
				href="/user/#"
				img="/image24.png"
				info="Поиск по списку сотрудников Казанского федерального университета, а также их контакты"
				title="Сотрудники"
				width={130}
				height={137}
				isRounded
				mt=""
				positionImage="-mt-[11px]"
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
	{
		index: 'Contests',
		element: (
			<TemplateCard
				href="/user/#"
				img="/image1.png"
				info="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
				title="Конкурсы"
				width={120}
				height={120}
				mt="mt-0"
				buttonText="Записаться"
				buttonType="primary"
			/>
		),
		place: {
			w: 1,
			h: 1,
			x: 1,
			y: 0,
			i: 'Contests'
		}
	},
	{
		index: 'Vacancies',
		element: (
			<TemplateCard
				href="/user/#"
				info="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
				title="Вакансии студентам"
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
	{
		index: 'Events',
		element: (
			<TemplateCard
				href="/user/#"
				info="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
				title="Мероприятия"
				buttonText="Записаться"
				buttonType="primary"
			/>
		),
		place: {
			w: 1,
			h: 1,
			x: 1,
			y: 0,
			i: 'Events'
		}
	},
	{
		index: 'EducationalCourses',
		element: (
			<TemplateCard
				href="/user/#"
				info="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tincidunt augue interdum velit euismod in pellentesque massa placerat."
				title="Образовательные курсы"
				img="/image2.png"
				width={177}
				height={150}
				buttonText="Записаться"
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
			x: 0,
			y: 0,
			i: 'Schedule'
		}
	}
]
