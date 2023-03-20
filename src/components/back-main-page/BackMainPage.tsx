import { Typography } from 'antd'

const { Link } = Typography
export const BackMainPage = () => {
	return (
		<div className=" flex w-fit items-center gap-[10px] my-[50px] ml-[50px] cursor-pointer">
			<svg
				width="8"
				height="11"
				viewBox="0 0 8 11"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M6.69336 1L0.999929 5.5C3.22335 7.25736 4.46994 8.24264 6.69336 10"
					stroke="black"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>

			<Link className="text-base " style={{ color: 'black' }} href="">
				Назад на главную
			</Link>
		</div>
	)
}
