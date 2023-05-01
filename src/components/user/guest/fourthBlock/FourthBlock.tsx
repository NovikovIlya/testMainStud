import React from 'react'

import { data } from '../../../../api/auth/types'
import CaruselCard from '../GeneralCards/CaruselCard'

import LeftCard from './leftCard/LeftCard'

const middleBlock: data[] = [
	{ tittle1: 'Математика', tittle2: '01.05.2023' },
	{ tittle1: 'История', tittle2: '02.06.2023' },
	{ tittle1: 'Физика', tittle2: '03.07.2023' },
	{ tittle1: 'География', tittle2: '04.08.2023' }
]

const RightBlock: data[] = [
	{ tittle1: '30ч.', tittle2: '19 000 руб' },
	{ tittle1: '24ч.', tittle2: '15 000 руб' },
	{ tittle1: '16ч.', tittle2: '5 000 руб' },
	{ tittle1: '18ч.', tittle2: '10 000 руб' }
]

const FourthBlock = () => {
	return (
		<div className="flex h-[250px] w-full justify-start mb-5">
			<div className="flex h-full w-8/12 mr-5">
				<LeftCard />
				<div className="flex h-full w-1/2 ml-5">
					<CaruselCard
						info={middleBlock}
						generalTittle="Олимпиады школьникам"
						blockName="middle"
					/>
				</div>
			</div>
			<div className="flex w-4/12 h-full">
				<CaruselCard
					info={RightBlock}
					generalTittle="Курсы подготовки к поступлению"
					someTittle="Рисунок"
					blockName="right"
				/>
			</div>
		</div>
	)
}

export default FourthBlock
