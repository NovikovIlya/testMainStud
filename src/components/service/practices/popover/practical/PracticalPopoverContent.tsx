import { Popconfirm } from 'antd'
import dayjs from 'dayjs'
import printJS from 'print-js'
import React from 'react'
import { utils, writeFileXLSX } from 'xlsx'

import { DeleteRedSvg } from '../../../../../assets/svg/DeleteRedSvg'
import { Load } from '../../../../../assets/svg/Load'
import { PrintSvg } from '../../../../../assets/svg/PrintSvg'
import { useDeletePractiseMutation } from '../../../../../store/api/practiceApi/practical'
import { TablePractical } from '../../practical/ViewPractical'
import { ColorBg, WrapperButton } from '../WrapperButton'
import { showNotification } from '../../../../../store/reducers/notificationSlice'
import { useAppDispatch } from '../../../../../store'

interface Props {
	recordFullAll?: TablePractical[]
	recordFull?: TablePractical
	setRecordFull?: (arg: TablePractical[]) => void
}

export const PracticalPopoverContent = ({
	recordFull,
	recordFullAll,
	setRecordFull
}: Props) => {
	const [deletePractise] = useDeletePractiseMutation()
	const dispatch = useAppDispatch()
	function translateColumnsIntoRussia({ isPrint }: { isPrint: boolean }) {
		console.log('recordFull,recordFull',recordFull)
		if (recordFull) {
			const stringIndTask = isPrint
			// @ts-ignore
				? recordFull?.tasks
						.map((elem:any, index:number) => `${index + 1}.${elem.taskDescription} `)
						.join('</br>')
							// @ts-ignore
				: recordFull?.tasks
						.map((elem:any, index:number) => `${index + 1}.${elem.taskDescription} `)
						.join('\n')

			const stringCompetencies = isPrint
				? recordFull.competence
						.map((elem:any, index:number) => `${index + 1}.${elem.value} `)
						.join('</br>')
				: recordFull.competence
						.map((elem:any, index:number) => `${index + 1}.${elem.value} `)
						.join('\n')

			const startPractice = `${dayjs(recordFull.practicePeriod[0]).format(
				'DD.MM.YYYY'
			)}`
			const endPractice = `${dayjs(recordFull.practicePeriod[1]).format(
				'DD.MM.YYYY'
			)}`
			const stringPeriodPractice = `${startPractice} - ${endPractice}`

			return {
				'Шифр и наименование специальности': recordFull.specialtyName,
				'Тип практики': recordFull.practiceType,
				Кафедра: recordFull.department,
				'Номер группы': recordFull.groupNumber,
				Семестр: recordFull.semester,
				'Учебный год': recordFull.academicYear,
				Курс: recordFull.courseStudy,
				'Период практики': stringPeriodPractice,
				'Кол-во часов по практике': recordFull.totalHours,
				'Индивидуальные задания': stringIndTask,
				'Код и наименование компетенции': stringCompetencies,
				'Заведующий опорной кафедрой': recordFull.departmentDirector
			}
		}
	}

	function downLoad() {
		const ws = utils.json_to_sheet([
			translateColumnsIntoRussia({ isPrint: false })
		])
		const wb = utils.book_new()
		utils.book_append_sheet(wb, ws, 'Data')
		writeFileXLSX(wb, 'File.xlsx')
	}

	function printTable() {
		function properties() {
			if (recordFull) {
				return [
					'Шифр и наименование специальности',
					'Тип практики',
					'Кафедра',
					'Номер группы',
					'Семестр',
					'Учебный год',
					'Курс',
					'Период практики',
					'Кол-во часов по практике',
					'Индивидуальные задания',
					'Код и наименование компетенции',
					'Заведующий опорной кафедрой'
				]
			}
		}

		printJS({
			printable: [translateColumnsIntoRussia({ isPrint: true })],
			properties: properties(),
			type: 'json',
			style: 'body {font-size: 10px}'
		})
	}

	function deleteData() {
		if (setRecordFull && recordFull && recordFullAll) {
			// const newArr = recordFullAll.filter(elem => {
			// 	return elem.id !== recordFull.id
			// })
			// setRecordFull(newArr)
			// if (setSelectedFieldFull) {
			//     setSelectedFieldFull([])
			// }
			console.log(recordFull)
			// const objIdList: ListIdDeleteContracts = {
			//     listIdDelete: listId
			// }
			//deleteSeveralContracts(objIdList)
		}
		// @ts-ignore
		deletePractise(recordFull?.id)
			.unwrap()
				.then(() => {
					if(setRecordFull && recordFull && recordFullAll){
					const newArr = recordFullAll.filter(elem => {
						return elem.id !== recordFull.id
					})
					setRecordFull(newArr)
					}
				})
				.catch(error => {
					console.log('bb', error)
					if (error.status === 409) {
						console.log('e mama')
						dispatch(
							showNotification({
								message:
									'Удаление невозможно, так как имеются связи, прежде необходимо удалить их',
								type: 'error'
							})
						)
					}
				})
	}

	return (
		<div className={'flex flex-col gap-2 '} onClick={(e) => { e.stopPropagation()}}>
			<WrapperButton color={ColorBg.BLUEF2} onClick={downLoad}>
				<Load />
				<span>Скачать выбранное</span>
			</WrapperButton>

			<WrapperButton color={ColorBg.BLUEF2} onClick={printTable}>
				<PrintSvg />
				<span>Печать выбранного</span>
			</WrapperButton>

			<Popconfirm
				title="Удаление"
				description="Вы уверены, что хотите удалить?"
				onConfirm={deleteData}
				okText="Да"
				cancelText="Нет"
			>
				<WrapperButton color={ColorBg.REDE5} >
					<DeleteRedSvg />
					<span className={'text-[#E04545]'}>Удалить выбранное</span>
				</WrapperButton>
			</Popconfirm>
		</div>
	)
}
