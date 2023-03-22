import { Typography } from 'antd'

import { ArrowLeftSvg } from '../../assets/svg/ArrowLeftSvg'

const { Link } = Typography
export const BackMainPage = () => {
	return (
		<div className=" flex w-fit items-center gap-[10px] my-[50px] ml-[50px] cursor-pointer min-[2559px]:m-16">
			<ArrowLeftSvg />
			<Link
				className="min-[2559px]:text-4xl "
				style={{ color: 'black' }}
				href=""
			>
				Назад на главную
			</Link>
		</div>
	)
}
