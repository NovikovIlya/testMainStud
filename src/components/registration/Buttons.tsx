import { Button, Checkbox, Form } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { IButtonsProps } from '../../models/registration'


export const Buttons: FC<IButtonsProps> = ({isLoading, setCheck, check }) => {
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
					loading={isLoading}
				>
					{t('register')}
				</Button>
				<Checkbox onChange={onChangeCheckbox} checked={check}>
					<p className="my-4 text-xs">{t('userAgreement')}</p>
				</Checkbox>
				<div className="flex items-center justify-between">
					<span>
						{t('alreadyProfile')}{' '}
						<Link className=" " to="/">
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
