import { Tabs } from 'antd'
import React from 'react'

import InfoCard from './InfoCard'
import JournalPosDay from './JournalPosDay'
import JournalPosElem from './JournalPosElem'
import Title from 'antd/es/typography/Title'

const NavJournal = () => {
	return (
		<div className="px-[80px]">
			<InfoCard text="Перед работой со вкладкой «Журнал посещений» необходимо зайти во вкладку «Расписание» и проверить правильность занесения Вашим деканатом расписания Ваших занятий." />
               <Title className='mt-8' level={2}>Журнал посещений</Title>
               <Tabs defaultActiveKey="1" className="mt-6">
				<Tabs.TabPane tab={'Заполнение по дням'} key={1}>
					<>
						<JournalPosDay />
					</>
				</Tabs.TabPane>
				<Tabs.TabPane tab={'Заполнение на семестр'} key={2}>
					<>
						<JournalPosElem />
					</>
				</Tabs.TabPane>
			</Tabs>
		</div>
	)
}

export default NavJournal
