import { Typography } from 'antd'
import React from 'react'

import Styles from './Guest.module.scss'
import FifthBlock from './fifthBlock/FifthBlock'
import FirstBlock from './firstBlock/FirstBlock'
import FourthBlock from './fourthBlock/FourthBlock'
import SecondBlock from './secondBlock/SeconodBlock'
import ThirdBlock from './thirdBlock/ThirdBlock'

const { Title } = Typography

const Guest = () => {
	return (
		<div className={Styles.main}>
			<div className={Styles.wrapper}>
				<Title className={Styles.tittle}>Личный кабинет КФУ</Title>
				<FirstBlock />
				<SecondBlock />
				<ThirdBlock />
				<FourthBlock />
				<FifthBlock />
			</div>
		</div>
	)
}

export default Guest
