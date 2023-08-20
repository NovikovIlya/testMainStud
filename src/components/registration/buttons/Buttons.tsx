import { Button, Checkbox, Form } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { useAppDispatch } from '../../../store'
import { clearRegistrationErrors } from '../../../store/creators/SomeCreators'

import styles from './Buttons.module.scss'

interface IButtonsProps {
	check: boolean
	setCheck: (value: boolean) => void
}

export const Buttons: FC<IButtonsProps> = ({ setCheck, check }) => {
	const dispatch = useAppDispatch()
	const { t } = useTranslation()
	const onChangeCheckbox = (e: CheckboxChangeEvent) =>
		setCheck(e.target.checked)
	return (
		<Form.Item className={styles.main}>
			<div className={styles.buttons}>
				<Button size="large" type="primary" htmlType="submit" disabled={!check}>
					{t('register')}
				</Button>
				<Checkbox
					className={styles.check}
					onChange={onChangeCheckbox}
					checked={check}
				>
					<p className={styles.termsUse}>{t('userAgreement')}</p>
				</Checkbox>
				<div className={styles.login}>
					<span>
						{t('alreadyProfile')}{' '}
						<Link
							className={styles.link}
							to="/login"
							onClick={() => dispatch(clearRegistrationErrors())}
						>
							{t('login')}
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
