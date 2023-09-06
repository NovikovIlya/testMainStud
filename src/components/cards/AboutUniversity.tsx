import { Button } from 'antd'
import { useTranslation } from 'react-i18next'

import img from '../../assets/images/image15.png'

export const Applications = () => {
	const { t } = useTranslation()
	return (
		<div className="relative h-full flex gap-2">
			<div className="h-full flex justify-start flex-col items-start pl-10">
				<div className="text-neutral-800 text-xl font-bold leading-7 place-content-start mt-8">
					{t('Applications')}
				</div>
				<span className="text-neutral-800 text-start text-base font-normal leading-normal mt-5  ">
					{t('ApplicationsDescription')}
				</span>
				<Button
					block
					className="rounded-full mt-16 h-12 max-w-xs text-black text-base font-bold leading-tight border-black"
				>
					{t('GoOver')}
				</Button>
			</div>
			<div className="w-32 h-32 opacity-80 bg-indigo-100 rounded-full mt-8 mr-10">
				<img src={img} alt="" className="-mt-4" />
			</div>
		</div>
	)
}
