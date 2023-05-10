import { Button } from 'antd'
import React, { FC } from 'react'

import { data } from '../../../../api/types'
import Styles from '../Styles/OfferTwoCard.module.scss'

interface IOfferTwoProps {
	info: data[]
	tittle: string
}

const OfferTwoCard: FC<IOfferTwoProps> = ({ info, tittle }) => {
	return (
		<div className={Styles.main}>
			<span className={Styles.tittleBlock}>{tittle}</span>
			<div className={Styles.wrapper}>
				<div className={Styles.baseBlock}>
					{info.map(el => (
						<div className="flex flex-col w-full h-auto mb-4" key={el.tittle1}>
							<span className={Styles.Elements}>
								<span className="flex text-left whitespace-nowrap">
									{el.tittle1}
								</span>
								<hr className={Styles.hr} />
								<span className="font-bold text-[#3E89F9]">{el.tittle2}</span>
							</span>
						</div>
					))}
				</div>
			</div>
			<div className={Styles.buttonBlock}>
				<Button className={Styles.button}>Записаться</Button>
			</div>
		</div>
	)
}

export default OfferTwoCard
