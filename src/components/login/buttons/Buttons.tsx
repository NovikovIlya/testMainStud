import { Button, Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { GosSvg } from '../../../assets/svg'
import { clearLoginErrors } from '../../../store/creators/SomeCreators'

import styles from './Buttons.module.scss'

export const Buttons = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	return (
		<Form.Item>
			<div className={styles.buttons}>
				<Button
					className={styles.login}
					size="large"
					type="primary"
					htmlType="submit"
				>
					{t('enter')}
				</Button>

				<Button
					className={styles.gos}
					onClick={e => {
						e.preventDefault()
					}}
					size="large"
					type="primary"
					ghost
					htmlType="submit"
				>
					{t('loginVia')}
					<GosSvg />
				</Button>
				<div className={styles.reg}>
					<span>
						{t('noProfile')}{' '}
						<Link
							className={styles.link}
							to="/registration"
							onClick={() => clearLoginErrors(dispatch)}
						>
							{t('register')}
						</Link>
					</span>
					<Link to={'https://kpfu.ru/'} className={styles.kpfu}>
						kpfu.ru
					</Link>
				</div>
			</div>
		</Form.Item>
	)
}
