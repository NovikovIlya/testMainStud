import { QuestionCircleOutlined } from '@ant-design/icons'
import { Popover } from 'antd'
import React, { FC, PropsWithChildren } from 'react'

import pencil from '../../assets/images/pencil.png'
import rectangle from '../../assets/images/rectangle.png'
import { LogoIasSvg } from '../../assets/svg'

export const ImagesLayout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<div className="h-full">
			<div className="flex items-center justify-between m-10">
				<LogoIasSvg />
				<Popover content={content} title="">
					<QuestionCircleOutlined />
				</Popover>
			</div>
			{children}
			<div className="fixed flex top-0 right-0 left-0 h-full min-h-screen w-full overflow-y-hidden -z-40">
				<div className="absolute right-0">
					<img src={pencil} alt="" className="w-[30vw]" />
				</div>
				<div className="absolute left-0 bottom-0  -z-10">
					<img src={rectangle} alt="" className="w-[30vw]" />
				</div>
				<div className="absolute w-[50vw] h-[50vw] -z-20 bg-[#D6E3F7] left-0 bottom-0 translate-x-[-50%] translate-y-[50%]  rounded-full" />
			</div>
		</div>
	)
}

const content = (
	<div>
		<p>Мы не передаем Ваши данные третьим лицам</p>
	</div>
)
