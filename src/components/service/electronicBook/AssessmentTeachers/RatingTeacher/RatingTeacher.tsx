import { Button, Form, Rate } from 'antd'
import { t } from 'i18next'
import React from 'react'

import { IRatingTeacher } from '../../../../../models/electronicBook'
import { blue307 } from '../../../../../utils/color'

export const RatingTeacher = (props: IRatingTeacher) => {
	return (
		<>
			<p
				className={`
						text-black 
						text-base 
						font-bold`}
			>
				{t('rating')}
			</p>
			<div
				className={`
						w-full 
						flex 
						flex-col 
						mt-5`}
			>
				<div
					className={`
							flex 
							justify-between`}
				>
					<p>{t('friendliness')}</p>
					<div
						className={`
								flex 
								gap-10 
								items-center`}
					>
						<Form.Item name={'KindnessTact'}>
							<Rate className={`text-[${blue307}]`} />
						</Form.Item>
						<p>{props.kindnessAndTact}</p>
					</div>
				</div>
				<div
					className={`
							flex 
							justify-between`}
				>
					<p>{t('knowledge')}</p>
					<div
						className={`
								flex 
								gap-10 
								items-center`}
					>
						<Form.Item name={'GeneralErudition'}>
							<Rate className={`text-[${blue307}]`} />
						</Form.Item>
						<p>{props.generalErudition}</p>
					</div>
				</div>
				<div
					className={`
							flex 
							justify-between`}
				>
					<p>{t('vid')}</p>
					<div
						className={`
								flex 
								gap-10 
								items-center`}
					>
						<Form.Item name={'AppearanceDemeanor'}>
							<Rate className={`text-[${blue307}]`} />
						</Form.Item>
						<p>{props.appearanceAndDemeanor}</p>
					</div>
				</div>
				<div
					className={`
							flex 
							justify-between`}
				>
					<p>{t('punkt')}</p>
					<div
						className={`
								flex 
								gap-10`}
					>
						<Form.Item name={'Punctuality'}>
							<Rate className={`text-[${blue307}]`} />
						</Form.Item>
						<p>{props.punctuality}</p>
					</div>
				</div>
			</div>
			<div
				className={`
						flex 
						justify-between 
						mt-10`}
			>
				<p>
					{t('allGolos')}: {props.total} {t('golos')}
				</p>
				<Button
					className={`
							!rounded-full`}
					type="primary"
					size="large"
					htmlType={'submit'}
					disabled={props.disabledButton}
				>
					{t('save')}
				</Button>
			</div>
			{props.sendData && <span className={`text-[green]`}>{t('dataSend')}</span>}
		</>
	)
}
