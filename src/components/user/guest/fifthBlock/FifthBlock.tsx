import React from 'react'

import { data } from '../../../../api/auth/types'
import OfferOneCard from '../GeneralCards/OfferOneCard'
import OfferTwoCard from '../GeneralCards/OfferTwoCard'

const Vacansies: data[] = [
	{ tittle1: 'Инженер-программист', tittle2: 'от 1 000 р.' },
	{ tittle1: 'Медицинская сестра', tittle2: 'бесплатно' },
	{ tittle1: 'Разнорабочий', tittle2: 'от 2 000 р.' },
	{ tittle1: 'Документовед 2 категории', tittle2: 'от 4 000 р.' }
]

const Events: data[] = [
	{ tittle1: 'Курс по Soft Skills', tittle2: '24.09.2023' },
	{ tittle1: 'Рабочие программы, ФОС', tittle2: '24.09.2023' },
	{ tittle1: 'Планирование  образовательных программ', tittle2: '24.09.2023' },
	{ tittle1: 'Познавательный супер курс ', tittle2: '24.09.2023' }
]

const FifthBlock = () => {
	return (
		<div className="flex h-[400px] w-full justify-start mb-5">
			<OfferOneCard
				info={Vacansies}
				tittle="Курсы профессиональной переподготовки"
			/>
			<OfferTwoCard info={Events} tittle="Курсы повышения квалификации" />
		</div>
	)
}

export default FifthBlock
