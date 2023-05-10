import React from 'react'
import { Link } from 'react-router-dom'

import { LongArrowRightSvg } from '../../../../assets/svg'
import Styles from '../Styles/Navigation.module.scss'

import Img from './../beautiful_girl.webp'

const FirstBlock = () => {
	return (
		<div className={Styles.main}>
			<div className={Styles.leftBlock}>
				<span className={Styles.tittle}>Как поступить</span>
				<div className={Styles.menu}>
					<Link to={'#'} className={Styles.item}>
						Бакалавриат
					</Link>
					<Link to={'#'} className={Styles.item}>
						Магистратура
					</Link>
					<Link to={'#'} className={Styles.item}>
						Аспирантура
					</Link>
					<Link to={'#'} className={Styles.item}>
						Ординатура
					</Link>
				</div>
			</div>
			<div className="h-full w-1/4 relative">
				<img className={Styles.img} src={Img} alt="" />
			</div>
			<div className={Styles.arrowBlock}>
				<LongArrowRightSvg />
			</div>
		</div>
	)
}

export default FirstBlock
