import { Button } from 'antd'
import React, { FC } from 'react'

import Styles from '../Styles/DescriptionCard.module.scss'

interface ILeftBlockProps {
	generalTittle: string
	someTittle: string
	ShowButton: boolean
	ShowCircle: boolean
}

const DescriptionCard: FC<ILeftBlockProps> = ({
	generalTittle,
	someTittle,
	ShowButton,
	ShowCircle
}) => {
	return (
		<div className={Styles.main}>
			{ShowCircle && <div className={Styles.circle}></div>}
			<span className={Styles.firstTittle}>{generalTittle}</span>
			<span className={Styles.secondTittle}>{someTittle}</span>
			{ShowButton && (
				<div className={Styles.buttonBlock}>
					<Button className={Styles.button}>Посмотреть</Button>
				</div>
			)}
		</div>
	)
}

export default DescriptionCard
