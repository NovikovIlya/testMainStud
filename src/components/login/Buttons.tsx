import { Button, Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { GosSvg } from '../../assets/svg'

export const Buttons = ({ isLoading }: { isLoading: boolean }) => {
	const { t } = useTranslation()
	return (
		<Form.Item>
			<div className="flex flex-col text-base">
				<Button className="mb-5 mt-7 !h-12" size="large" type="primary" htmlType="submit" loading={isLoading}>
					{t('enter')}
				</Button>

				<div className="flex items-center justify-between">
					<span className="flex flex-col tablet:flex-row tablet:gap-[10px]">
						{t('noProfile')}{' '}
						<Link className={`text-base `} to="/registration">
							{t('register')}
						</Link>
					</span>
					<Link to={'https://kpfu.ru/'} className="font-bold text-black opacity-50">
						kpfu.ru
					</Link>
				</div>
			</div>
		</Form.Item>
	)
}
