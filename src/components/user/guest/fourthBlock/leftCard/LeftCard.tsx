import React from 'react'

import Ellipse from '../../Ellipse.png'

import Styles from './LeftCard.module.scss'

const LeftCard = () => {
	return (
		<div className={Styles.main}>
			<img className={Styles.img} src={Ellipse} alt="" />
			<span className={Styles.firstTittle}>Новости</span>
			<span className={Styles.secondTittle}>
				В жизни полно лжи и грязи, она не так красива. Даже твой лучший друг
				может не поделиться пивом…
			</span>
		</div>
	)
}

export default LeftCard
