import React from 'react'

import { data } from '../../../../api/auth/types'
import OfferOneCard from '../GeneralCards/OfferOneCard'
import OfferTwoCard from '../GeneralCards/OfferTwoCard'

const Vacansies: data[] = [
	{ tittle1: 'Инженер-программист', tittle2: 'от 25 000 р.' },
	{ tittle1: 'Медицинская сестра', tittle2: 'от 15 000 р.' },
	{ tittle1: 'Разнорабочий', tittle2: 'от 15 000 р.' },
	{ tittle1: 'Документовед 2 категории', tittle2: 'от 18 000 р.' }
]

const Events: data[] = [
	{ tittle1: 'День открытых дверей ИВМИТ', tittle2: '24.09.2023' },
	{ tittle1: 'День открытых дверей ИВМИТ', tittle2: '24.09.2023' },
	{ tittle1: 'День открытых дверей ИВМИТ', tittle2: '24.09.2023' },
	{ tittle1: 'День открытых дверей ИВМИТ', tittle2: '24.09.2023' }
]

const ThirdBlock = () => {
	return (
		<div className="flex h-[400px] w-full justify-start mb-5">
			<OfferOneCard info={Vacansies} tittle="Вакансии" />
			<OfferTwoCard info={Events} tittle="Мероприятия" />
		</div>
	)
}

export default ThirdBlock
