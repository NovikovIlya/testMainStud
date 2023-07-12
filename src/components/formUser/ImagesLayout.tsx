import { QuestionCircleOutlined } from '@ant-design/icons';
import { Popover, Select } from 'antd'
import { FC, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'

import pencil from '../../assets/images/pencil.png'
import rectangle from '../../assets/images/rectangle.png'
import { LogoIasSvg } from '../../assets/svg'

export const ImagesLayout: FC<PropsWithChildren<{ first?: boolean }>> = ({
	children,
	first
}) => {
	const { t, i18n } = useTranslation()

	const changeLanguage = (language: string) => {
		i18n.changeLanguage(language)
	}
	return (
		<div className=" min-h-screen">
			<div className="flex items-center  justify-between py-5 mx-20">
				<LogoIasSvg />
				<div className="flex gap-4 items-center">
					<Select
						defaultValue={i18n.language}
						style={{ width: 100 }}
						bordered={false}
						onChange={e => changeLanguage(e.valueOf())}
						options={[
							{ value: 'ru', label: 'Рус' },
							{ value: 'en', label: 'Eng' }
						]}
					/>
					<Popover
						placement="left"
						className="h-fit"
						content={
							first ? (
								<div>
									<p>Сейчас Вы выбираете Вашу основную роль, позднее</p>
									<p>в разделе “Обо мне” Вы сможете подключить другие роли,</p>
									<p>заполнив дополнительную информацию</p>
								</div>
							) : (
								<p>Мы не передаем Ваши данные третьим лицам</p>
							)
						}
					>
						<QuestionCircleOutlined />
					</Popover>
				</div>
			</div>
			{children}
			<div className="fixed flex top-0 right-0 left-0 h-full  w-full overflow-y-hidden -z-40">
				<div className="absolute right-0">
					<img src={pencil} alt="" className="w-[30vw]" />
				</div>
				<div className="absolute left-0 bottom-0 -z-10">
					<img src={rectangle} alt="" className="w-[30vw]" />
				</div>
				<div className="absolute w-[50vw] h-[50vw] -z-20 bg-[#D6E3F7] left-0 bottom-0 translate-x-[-50%] translate-y-[50%]  rounded-full" />
			</div>
		</div>
	)
}