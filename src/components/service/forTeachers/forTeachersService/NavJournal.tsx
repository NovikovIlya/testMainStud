import { Result, Tabs } from 'antd'
import Title from 'antd/es/typography/Title'
import { t } from 'i18next'
import React, { useEffect } from 'react'

import { useAppSelector } from '../../../../store'

import InfoCard from './InfoCard'
import JournalPosDay from './JournalPosDay'
import JournalPosElem from './JournalPosElem'

const NavJournal = () => {
	const yearForm = useAppSelector(state => state.forTeacher.yearForm)
	const semestrForm = useAppSelector(state => state.forTeacher.semestrForm)


	return (
		<div className="px-[80px] ">
			{semestrForm ? (
				<>
					<InfoCard text={t('textLessonLog')} />
					<Title className="mt-8" level={2}>
						{t('journalPos')}
					</Title>
					<Tabs key={`tabs-${semestrForm}`} defaultActiveKey="1" className="mt-6">
						<Tabs.TabPane tab={t('days')} key={1}>
							<>
								<JournalPosDay />
							</>
						</Tabs.TabPane>
						<Tabs.TabPane tab={t('sem')} key={2}>
							<>
								<JournalPosElem />
							</>
						</Tabs.TabPane>
					</Tabs>
				</>
			) : (
				<Result title="" extra={t('selectYearSemest')} />
			)}
		</div>
	)
}

export default NavJournal
