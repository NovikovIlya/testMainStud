import { Typography } from 'antd'

import { ArrowLeftSvg } from '../../assets/svg/ArrowLeftSvg'

const { Link } = Typography
export const BackMainPage = () => {
	return (
		<div className=" flex w-fit items-center gap-[10px] my-[50px] ml-[50px] cursor-pointer">
			<ArrowLeftSvg />

			<Link className="text-base " style={{ color: 'black' }} href="">
				Назад на главную
			</Link>
		</div>
	)
}
