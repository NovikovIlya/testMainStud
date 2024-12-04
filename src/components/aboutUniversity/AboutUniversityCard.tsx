import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

import img from '../../assets/images/aboutUniversity.png'
import { useTranslation } from 'react-i18next'

export const AboutUniversityCard = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	
	return (
		<div className="px-[30px] py-[40px] h-full flex gap-2 justify-between bg-white mt-7 rounded-2xl">
			<div className="flex flex-col justify-between">
				<div>
					<div className="font-semibold text-xl text-start relative flex z-10">
					{t('AboutTheUniversity')}
					</div>
					<div className="text-base relative text-start mt-[30px] max-h-[100px] w-full  flex z-10">
					
					{t('infoUniversity')}
					</div>
				</div>
				<div className="text-start">
					<Button
						className="rounded-full border-black w-[200px] h-[50px] text-base font-semibold z-50 relative"
						onClick={e => {
							console.log('click')

							e.stopPropagation()
							navigate('/services/aboutUniversity')
						}}
					>
						{t('watch')}
					</Button>
				</div>
			</div>
			<div className="">
				<div className="absolute -z-10 mt-5 sm:flex hidden min-w-[115px] min-h-[115px] max-w-[115px]  max-h-[115px] bg-[#3E89F9] bg-opacity-80 rounded-full justify-center items-center "></div>
				<img className="sm:flex hidden mt-5 rounded-2xl" src={img} alt="" />
			</div>
		</div>
	)
}
