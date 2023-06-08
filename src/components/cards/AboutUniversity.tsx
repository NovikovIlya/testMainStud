import { Button } from 'antd'

import img from '../../assets/images/aboutUniversity.png'

export const AboutUniversity = () => {
	return (
		<div className="flex overflow-y-auto">
			<div className="ml-[40px] mt-[40px]">
				<div>
					<div className="font-semibold text-xl text-start">
						Об университете
					</div>
					<div className="text-base text-start mt-[30px] max-h-[100px]">
						Мини-текст в 3-4 строки о том какой КФУ крутой, статистика,
						инфографика внутри — хвалебные маркетинговые оды университету
					</div>
				</div>
				<div className="text-start absolute bottom-[40px]">
					<Button className="rounded-full border-black  w-[200px] h-[50px] text-base font-semibold mt-[40px]">
						Посмотреть
					</Button>
				</div>
			</div>
			<div className="min-w-[125px] min-h-[125px] ml-[15px] mt-[50px] mr-[50px] max-h-[125px] bg-[#3E89F9] bg-opacity-80 rounded-full">
				<img className="rounded-b-full -mt-[5px]" src={img} alt="" />
			</div>
		</div>
	)
}
