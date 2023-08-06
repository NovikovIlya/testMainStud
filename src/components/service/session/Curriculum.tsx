import { Button, Table } from 'antd'
import Column from 'antd/es/table/Column'
import ColumnGroup from 'antd/es/table/ColumnGroup'
import React from 'react'

import Styles from './Curriculum.module.scss'

interface DataType {
	key: string
	mainColumn: string
	beginFirstTerm: string
	endFirstTerm: string
	termFirstWeek: string
	beginSecondTerm: string
	endSecondTerm: string
	termSecondWeek: string
}

const data: DataType[] = [
	{
		key: '1',
		mainColumn: 'Теоретическое обучение',
		beginFirstTerm: '1 сентября',
		endFirstTerm: '1 сентября',
		termFirstWeek: '24',
		beginSecondTerm: '1 сентября',
		endSecondTerm: '1 сентября',
		termSecondWeek: '24'
	},
	{
		key: '2',
		mainColumn: 'Теоретическое обучение',
		beginFirstTerm: '1 сентября',
		endFirstTerm: '1 сентября',
		termFirstWeek: '24',
		beginSecondTerm: '1 сентября',
		endSecondTerm: '1 сентября',
		termSecondWeek: '24'
	},
	{
		key: '3',
		mainColumn: 'Теоретическое обучение',
		beginFirstTerm: '1 сентября',
		endFirstTerm: '1 сентября',
		termFirstWeek: '24',
		beginSecondTerm: '1 сентября',
		endSecondTerm: '1 сентября',
		termSecondWeek: '24'
	},
	{
		key: '4',
		mainColumn: 'Теоретическое обучение',
		beginFirstTerm: '1 сентября',
		endFirstTerm: '1 сентября',
		termFirstWeek: '24',
		beginSecondTerm: '1 сентября',
		endSecondTerm: '1 сентября',
		termSecondWeek: '24'
	},
	{
		key: '5',
		mainColumn: 'Теоретическое обучение',
		beginFirstTerm: '1 сентября',
		endFirstTerm: '1 сентября',
		termFirstWeek: '24',
		beginSecondTerm: '1 сентября',
		endSecondTerm: '1 сентября',
		termSecondWeek: '24'
	}
]

export const Curriculum = () => {
	return (
		<div>
			<div className="text-black text-3xl font-normal leading-7 mb-10">
				Учебный план
			</div>
			<div>
				<Button className={Styles.button}>1 курс</Button>
				<Button className={Styles.button}>2 курс</Button>
				<Button className={Styles.button}>3 курс</Button>
				<Button className={Styles.button}>4 курс</Button>
			</div>
			<div className="overflow-auto w-full min-w-[600px]">
				<Table
					dataSource={data}
					pagination={false}
					className={Styles.table}
					bordered={true}
				>
					<Column title="" dataIndex="mainColumn" key="mainColumn"></Column>
					<ColumnGroup title="1 семестр">
						<Column
							title="Начало"
							dataIndex="beginFirstTerm"
							key="beginFirstTerm"
						/>
						<Column
							title="Окончание"
							dataIndex="endFirstTerm"
							key="endFirstTerm"
						/>
						<Column
							title="Неделя"
							dataIndex="termFirstWeek"
							key="termFirstWeek"
						/>
					</ColumnGroup>
					<ColumnGroup title="2 семестр">
						<Column
							title="Начало"
							dataIndex="beginSecondTerm"
							key="beginSecondTerm"
						/>
						<Column
							title="Окончание"
							dataIndex="endSecondTerm"
							key="endSecondTerm"
						/>
						<Column
							title="Неделя"
							dataIndex="termSecondWeek"
							key="termSecondWeek"
						/>
					</ColumnGroup>
				</Table>
			</div>
		</div>
	)
}
