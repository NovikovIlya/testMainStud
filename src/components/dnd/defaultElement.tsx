import { CarouselDataTwo, Vacancies } from '../../api/plugs'
import { AboutUniversity } from '../cards/AboutUniversity'
import { Apply } from '../cards/Apply'
import { Events } from '../cards/Events'
import { Olympics } from '../cards/Olympics'
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
		element: <Olympics />
	},
	{
		index: '3',
		element: <Events />
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
	}
]
