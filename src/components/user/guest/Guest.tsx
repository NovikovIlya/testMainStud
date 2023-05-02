import { Typography } from 'antd'
import React from 'react'

import styles from './Guest.module.scss'
import FifthBlock from './fifthBlock/FifthBlock'
import FirstBlock from './firstBlock/FirstBlock'
import FourthBlock from './fourthBlock/FourthBlock'
import SecondBlock from './secondBlock/SeconodBlock'
import ThirdBlock from './thirdBlock/ThirdBlock'

const { Title } = Typography

const Guest = () => {
	return (
		<div className={styles.main}>
			<div className={styles.wrapper}>
				<Title className={styles.tittle}>Личный кабинет КФУ</Title>
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
