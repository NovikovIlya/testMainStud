import React, { FC } from 'react'

import { data } from '../../../../api/auth/types'
import Styles from '../GeneralCss/OfferOneCard.module.scss'

interface IleftBlockProps {
	info: data[]
	tittle: string
}

const OfferOneCard: FC<IleftBlockProps> = ({ info, tittle }) => {
	return (
		<div className={Styles.main}>
			<span className={Styles.tittleBlock}>{tittle}</span>
			<div className={Styles.baseBlock}>
				{info.map(el => (
					<div className="flex flex-col w-full h-auto" key={el.tittle1}>
						<span className={Styles.topElements}>
							<span>{el.tittle1}</span>
							<span className="font-bold text-[#3E89F9]">{el.tittle2}</span>
						</span>
						<hr className={Styles.hr} />
					</div>
				))}
			</div>
			<div className={Styles.buttonBlock}>
				<button className={Styles.button}>Посмотреть</button>
			</div>
		</div>
	)
}

export default OfferOneCard
