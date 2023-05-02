import React, { FC } from 'react'

import { data } from '../../../../api/auth/types'
import styles from '../GeneralCss/OfferOneCard.module.scss'

interface ILeftBlockProps {
	info: data[]
	tittle: string
}

const OfferOneCard: FC<ILeftBlockProps> = ({ info, tittle }) => {
	return (
		<div className={styles.main}>
			<span className={styles.tittleBlock}>{tittle}</span>
			<div className={styles.baseBlock}>
				{info.map(el => (
					<div className="flex flex-col w-full h-auto" key={el.tittle1}>
						<span className={styles.topElements}>
							<span>{el.tittle1}</span>
							<span className="font-bold text-[#3E89F9]">{el.tittle2}</span>
						</span>
						<hr className={styles.hr} />
					</div>
				))}
			</div>
			<div className={styles.buttonBlock}>
				<button className={styles.button}>Посмотреть</button>
			</div>
		</div>
	)
}

export default OfferOneCard
