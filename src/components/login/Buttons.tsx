import { Button, Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { GosSvg } from '../../assets/svg'

export const Buttons = () => {
	const { t } = useTranslation()
	return (
		<Form.Item>
			<div className="flex flex-col text-base">
				<Button
					className="mb-5 mt-7 !h-12"
					size="large"
					type="primary"
					htmlType="submit"
				>
					{t('enter')}
				</Button>

				{/*<Button*/}
				{/*	className="mb-10 mt-0 flex !h-12 w-full items-center justify-center bg-white gap-3"*/}
				{/*	onClick={e => {*/}
				{/*		e.preventDefault()*/}
				{/*	}}*/}
				{/*	size="large"*/}
				{/*	type="primary"*/}
				{/*	ghost*/}
				{/*	htmlType="submit"*/}
				{/*>*/}
				{/*	{t('loginVia')}*/}
				{/*	<GosSvg />*/}
				{/*</Button>*/}
				<div className="flex items-center justify-between">
					<span>
						{t('noProfile')}{' '}
						<Link className={`text-base `} to="/registration">
							{t('register')}
						</Link>
					</span>
					<Link
						to={'https://kpfu.ru/'}
						className="font-bold text-black opacity-50"
					>
						kpfu.ru
					</Link>
				</div>
			</div>
		</Form.Item>
	)
}
