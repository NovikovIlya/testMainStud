import { Button } from 'antd'

export const AboutUniversity = () => {
	return (
		<div className="px-[3vh] pt-[3vh] pb-[1vh] h-full flex flex-col justify-around">
			<div className="flex max-sm:flex-col gap-[1vh]">
				<div className="text-start">
					<h3 className="text-[1.7vh] max-[2000px]:text-[2vh]">
						Об университете
					</h3>
					<span className="text-[1vh] mt-[2.5vh] max-[2000px]:mt-[3vh] max-[2000px]:text-[1.7vh]">
						Мини-текст в 3-4 строки о том какой КФУ крутой, статистика,
						инфографика внутри — хвалебные маркетинговые оды университету
					</span>
				</div>
				<div className="flex justify-center items-center">
					<div className="min-w-[130px] bg-[#3E89F9] rounded-full h-[130px]"></div>
				</div>
			</div>
			<div className="flex justify-start">
				<Button className="text-[1.5vh] h-auto my-[1vh] m px-[2vh]">
					Посмотреть
				</Button>
			</div>
		</div>
	)
}
