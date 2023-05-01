import React, { FC } from 'react'

import { data } from '../../../../api/auth/types'
import Styles from '../GeneralCss/OfferTwoCard.module.scss'

interface IleftBlockProps {
	info: data[]
	tittle: string
}

const OfferTwoCard: FC<IleftBlockProps> = ({ info, tittle }) => {
	return (
		<div className={Styles.main}>
			<span className={Styles.tittleBlock}>{tittle}</span>
			<div className={Styles.baseBlock}>
				{info.map(el => (
					<div className="flex flex-col w-full h-auto" key={el.tittle1}>
						<span className={Styles.Elements}>
							<span>{el.tittle1}</span>
							<hr className={Styles.hr} />
							<span className="font-bold text-[#3E89F9]">{el.tittle2}</span>
						</span>
					</div>
				))}
			</div>
			<div className={Styles.buttonBlock}>
				<button className={Styles.button}>Записаться</button>
			</div>
		</div>
	)
}

export default OfferTwoCard
