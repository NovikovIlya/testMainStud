import { CarouselDataTwo, Events, Vacancies } from '../../api/plugs'
import { AboutUniversity } from '../cards/AboutUniversity'
import { Apply } from '../cards/Apply'
import CarouselCard from '../user/guest/Components/CarouselCard'
import DescriptionCard from '../user/guest/Components/DescriptionCard'
import OfferOneCard from '../user/guest/Components/OfferCardOne'
import OfferTwoCard from '../user/guest/Components/OfferCardTwo'

export const jsxElements = [
	{
		index: '0',
		element: <Apply />
	},
	{
		index: '1',
		element: <AboutUniversity />
	},
	{
		index: '2',
		element: (
			<CarouselCard
				info={CarouselDataTwo}
				generalTittle="Олимпиады студентам"
				someTittle="Облачные технологии в образовании"
				ThereIsDescription={true}
			/>
		)
	},
	{
		index: '3',
		element: (
			<DescriptionCard
				generalTittle="Общие результаты вступительных экзаменов"
				someTittle="В этом году всего поступило 450690 студентов."
				ShowButton={true}
				ShowCircle={true}
			/>
		)
	},
	{
		index: '4',
		element: (
			<DescriptionCard
				generalTittle="Новости"
				someTittle="Каждый из нас понимает очевидную вещь: убеждённость некоторых оппонентов влечет за собой процесс."
				ShowButton={false}
				ShowCircle={true}
			/>
		)
	},
	{
		index: '5',
		element: <OfferOneCard info={Vacancies} tittle="Вакансии" />
	},
	{
		index: '6',
		element: <OfferTwoCard info={Events} tittle="Мероприятия" />
	}
]
