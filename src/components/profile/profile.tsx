import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { RootState } from '../../store'
import { useAppDispatch } from '../../store'
import { get_user_data } from '../../store/auth/actionCreators'
import { logoutSuccess } from '../../store/auth/authReducer'

import styles from './profile.module.scss'

export const Profile: FC = () => {
	const dis = useDispatch()
	const dispatch = useAppDispatch()
	const userdata = useSelector(
		(state: RootState) => state.auth.profileData.CurrentData
	)
	const navigate = useNavigate()
	useEffect(() => {
		dispatch(get_user_data())
		if (localStorage.getItem('token') === null) {
			navigate('/')
		}
	}, [])

	return (
		<div className={styles.main}>
			<div className={styles.box}>
				<div className={styles.caption}>Пользовательские данные</div>
				<div className={styles.input_item}>
					{userdata?.firstName === null
						? 'firstName is null'
						: userdata?.firstName}
				</div>
				<div className={styles.input_item}>
					{userdata?.lastName === null
						? 'lastName is null'
						: userdata?.lastName}
				</div>
				<div className={styles.input_item}>
					{userdata?.middleName === null
						? 'middleName is null'
						: userdata?.middleName}
				</div>
				<div className={styles.input_item}>
					{userdata?.birthDate === null
						? 'birthDate is null'
						: userdata?.birthDate}
				</div>
				<div className={styles.input_item}>
					{userdata?.email === null ? 'email is null' : userdata?.email}
				</div>
				<div className={styles.input_item}>
					{userdata?.fax === null ? 'fax is null' : userdata?.fax}
				</div>
				<div className={styles.input_item}>
					{userdata?.group === null ? 'group is null' : userdata?.group}
				</div>
				<div className={styles.input_item}>
					{userdata?.institut === null
						? 'institut is null'
						: userdata?.institut}
				</div>
				<div className={styles.input_item}>
					{userdata?.kabinet === null ? 'kabinet is null' : userdata?.kabinet}
				</div>
				<div className={styles.input_item}>
					{userdata?.phone === null ? 'phone is null' : userdata?.phone}
				</div>
				<div className={styles.input_item}>
					{userdata?.workPlace === null
						? 'workPlace is null'
						: userdata?.workPlace}
				</div>
				<div className={styles.button_block}>
					<button
						onClick={() => {
							dis(logoutSuccess())
							navigate('/')
						}}
						className={styles.button}
					>
						Выйти с аккаунта
					</button>
				</div>
			</div>
		</div>
	)
}
