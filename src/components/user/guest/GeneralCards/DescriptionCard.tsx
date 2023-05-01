import React, { FC } from 'react'

import Styles from '../GeneralCss/DescriptionCard.module.scss'

interface ILeftBlockProps {
	generalTittle: string
	someTittle: string
	ShowButton: boolean
}

const DescriptionCard: FC<ILeftBlockProps> = ({
	generalTittle,
	someTittle,
	ShowButton
}) => {
	return (
		<div className={Styles.main}>
			<span className={Styles.firstTittle}>{generalTittle}</span>
			<span className={Styles.secondTittle}>{someTittle}</span>
			{ShowButton && (
				<div className={Styles.buttonBlock}>
					<button className={Styles.button}>Посмотреть</button>
				</div>
			)}
		</div>
	)
}

export default DescriptionCard
