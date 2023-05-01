import { Carousel } from 'antd'
import React, { FC, useRef } from 'react'

import { data } from '../../../../api/auth/types'
import { ArrLeftSVG } from '../../../../assets/svg/ArrLeftSVG'
import { ArrowRightSvg } from '../../../../assets/svg/ArrowRightSvg'
import Ellipse from '../Ellipse.png'
import Styles from '../GeneralCss/CaruselCard.module.scss'

interface ICarucelProps {
	info: data[]
	generalTittle: string
	someTittle?: string
	blockName: string
}

const CaruselCard: FC<ICarucelProps> = ({
	info,
	generalTittle,
	someTittle,
	blockName
}) => {
	const ref = useRef<any>()
	return (
		<div className={Styles.main}>
			<div className={Styles.tittleBlock}>
				<span className={Styles.tittle}>
					<span className={Styles.TopItem}>{generalTittle}</span>
					<span className={Styles.BottomItem}>{someTittle}</span>
				</span>
				<img className={Styles.img} src={Ellipse} alt="" />
			</div>
			<div className={Styles.carouselBlock}>
				<div className={Styles.arrowBlocks}>
					<button className={Styles.Button} onClick={() => ref.current?.prev()}>
						<ArrLeftSVG />
					</button>
				</div>
				<div className="flex w-full">
					<Carousel className="w-80" dots={false} autoplay ref={ref}>
						{blockName === 'middle' &&
							info.map(el => (
								<div className={Styles.carousel} key={el.tittle1}>
									<span className={Styles.itemsMiddleBlock}>
										<span className="font-bold mr-2">Предмет: </span>
										<span>{el.tittle1}</span>
									</span>
									<span className={Styles.itemsMiddleBlock}>
										<span className="font-bold mr-2">Дата: </span>
										<span>{el.tittle2}</span>
									</span>
								</div>
							))}
						{blockName === 'right' &&
							info.map(el => (
								<div className={Styles.carousel} key={el.tittle1}>
									<span className={Styles.itemsRightBlock}>
										<span className="text-base font-bold text-[#3E89F9]">
											{el.tittle1}
										</span>
										<span className="text-base font-bold text-[#3E89F9]">
											|
										</span>
										<span className="text-base font-bold text-[#3E89F9]">
											{el.tittle2}
										</span>
									</span>
								</div>
							))}
					</Carousel>
				</div>
				<div className={Styles.arrowBlocks}>
					<button className={Styles.Button} onClick={() => ref.current?.next()}>
						<ArrowRightSvg />
					</button>
				</div>
			</div>
			<div className={Styles.buttonBlock}>
				<button className={Styles.mainButton}>Записаться</button>
			</div>
		</div>
	)
}

export default CaruselCard
