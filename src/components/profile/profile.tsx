import { FC } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { RootState } from '../../store'
import { useAppDispatch } from '../../store'
import { LogOut } from '../../store/creators/SomeCreators'

import styles from './profile.module.scss'

export const Profile: FC = () => {
	const dispatch = useAppDispatch()

	const userdata = useSelector(
		(state: RootState) => state.Profile.profileData.CurrentData
	)
	const navigate = useNavigate()

	return (
		<div className={styles.main}>
			<div className={styles.box1}>
				<div className={styles.caption}>Пользовательские данные</div>
				<div className={styles.item}>{userdata?.username}</div>
				<div className={styles.item}>{userdata?.lastname}</div>
				<div className={styles.item}>{userdata?.firstname}</div>
				<div className={styles.item}>{userdata?.middlename}</div>
				<div className={styles.item}>{userdata?.birthday}</div>
				<div className={styles.item}>{userdata?.phone}</div>
				<div className={styles.item}>{userdata?.email}</div>
				<div className={styles.item}>{userdata?.citizenship}</div>
				<div className={styles.button_block}>
					<button
						onClick={() => {
							dispatch(LogOut())
							navigate('/')
						}}
						className={styles.button}
					>
						Выйти с аккаунта
					</button>
				</div>
			</div>
			<div className={styles.box2}>
				<div className={styles.caption}>Пользовательские роли</div>
				<>
					{userdata?.roles.map(el => (
						<div className={styles.itembox} key={el.id}>
							<div className={styles.item}>
								{el.id === null ? 'null' : el.id}
							</div>
							<div className={styles.item}>
								{el.login === null ? 'null' : el.login}
							</div>
							<div className={styles.item}>
								{el.type === null ? 'null' : el.type}
							</div>
						</div>
					))}
				</>
			</div>
		</div>
	)
}
