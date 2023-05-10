import { Button, Carousel } from 'antd'
import React, { FC, useRef } from 'react'

import { data } from '../../../../api/types'
import { ArrLeftSVG, ArrowRightSvg } from '../../../../assets/svg'
import Styles from '../Styles/CarouselCard.module.scss'

interface ICarouseProps {
	info: data[]
	generalTittle: string
	someTittle?: string
	ThereIsDescription: boolean
}

const CarouselCard: FC<ICarouseProps> = ({
	info,
	generalTittle,
	someTittle,
	ThereIsDescription
}) => {
	const ref = useRef<any>()
	return (
		<div className={Styles.main}>
			<div className={Styles.tittleBlock}>
				<span className={Styles.tittle}>
					<span className={Styles.TopItem}>{generalTittle}</span>
					<span className={Styles.BottomItem}>{someTittle}</span>
				</span>
				<div className={Styles.img}></div>
			</div>
			<div className={Styles.carouselBlock}>
				<div className={Styles.arrowBlocks}>
					<button className={Styles.Button} onClick={() => ref.current?.prev()}>
						<ArrLeftSVG />
					</button>
				</div>
				<Carousel className={Styles.carousel} dots={false} autoplay ref={ref}>
					{!ThereIsDescription &&
						info.map(el => (
							<div className={Styles.itemBlock} key={el.tittle1}>
								<span className={Styles.contentWithDescription}>
									<span className={Styles.textStyles}>Предмет: </span>
									<span>{el.tittle1}</span>
								</span>
								<span className={Styles.contentWithDescription}>
									<span className={Styles.textStyles}>Дата: </span>
									<span>{el.tittle2}</span>
								</span>
							</div>
						))}
					{ThereIsDescription &&
						info.map(el => (
							<div className={Styles.itemBlock} key={el.tittle1}>
								<span className={Styles.contentWithOutDescription}>
									<span className={Styles.textStyles}>{el.tittle1}</span>
									<span className={Styles.textStyles}>|</span>
									<span className={Styles.textStyles}>{el.tittle2}</span>
								</span>
							</div>
						))}
				</Carousel>
				<div className={Styles.arrowBlocks}>
					<button className={Styles.Button} onClick={() => ref.current?.next()}>
						<ArrowRightSvg />
					</button>
				</div>
			</div>
			<div className={Styles.buttonBlock}>
				<Button className={Styles.mainButton}>Записаться</Button>
			</div>
		</div>
	)
}

export default CarouselCard
