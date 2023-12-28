import { Button, Checkbox, Form } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { clearRegistrationErrors } from '../../store/creators/SomeCreators'

interface IButtonsProps {
	check: boolean
	setCheck: (value: boolean) => void
}

export const Buttons: FC<IButtonsProps> = ({ setCheck, check }) => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const onChangeCheckbox = (e: CheckboxChangeEvent) =>
		setCheck(e.target.checked)
	return (
		<Form.Item>
			<div className="flex flex-col">
				<Button
					size="large"
					type="primary"
					htmlType="submit"
					className="!h-12"
					disabled={!check}
				>
					{t('register')}
				</Button>
				<Checkbox onChange={onChangeCheckbox} checked={check}>
					<p className="my-4 text-xs">{t('userAgreement')}</p>
				</Checkbox>
				<div className="flex items-center justify-between">
					<span>
						{t('alreadyProfile')}{' '}
						<Link
							className=" "
							to="/"
							onClick={() => clearRegistrationErrors(dispatch)}
						>
							{t('login')}
						</Link>
					</span>
					<Link
						to={'https://kpfu.ru/'}
						className="flex font-bold text-black opacity-50"
					>
						kpfu.ru
					</Link>
				</div>
			</div>
		</Form.Item>
	)
}
