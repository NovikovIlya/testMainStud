import { Button, Card } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const InfoScammers = () => {
	const { t } = useTranslation()

	const [isShowed, setIsShowed] = useState<boolean>(localStorage.getItem('showScammersNotice') === null)

	return (
		<>
			{isShowed ? (
				<Card className="border-l-rose-500  sm:mt-5 mb-5 sm:mb-14 rounded-3xl text-xs sm:text-base shadow-md ">
					<p>{t('scammersNoticeText1')}</p>
					<br />
					<p> {t('scammersNoticeText2')}</p>
					<p>{t('scammersNoticeText3')} </p>
					<p>{t('scammersNoticeText4')}</p>
					<p>{t('scammersNoticeText5')}</p>
					<br />
					<p>{t('scammersNoticeText6')}</p>
					<div>
						{Array.from({ length: 8 }).map((_, i) => (
							<p>
								{i + 1}. {t(`scammersNoticeSteps${i + 1}`)}
							</p>
						))}
					</div>
					<Button
						onClick={() => {
							setIsShowed(false)
							localStorage.setItem('showScammersNotice', 'true')
						}}
						className="mt-[10px]"
					>
						{t('dontShowAnymore')}
					</Button>
				</Card>
			) : (
				<></>
			)}
		</>
	)
}

export default InfoScammers
