import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './profile.module.scss'

export const Profile: FC = () => {
	const navigate = useNavigate()
	useEffect(() => {
		if (localStorage.getItem('token') === null) {
			navigate('/')
		}
	}, [localStorage.getItem('token')])
	return <div className={styles.main}>Welcome, body</div>
}
