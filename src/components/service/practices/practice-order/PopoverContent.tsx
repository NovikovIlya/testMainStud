import { Popconfirm, Spin } from 'antd'
import dayjs from 'dayjs'
import printJS from 'print-js'
import React, { useEffect, useState } from 'react'
import { utils, writeFileXLSX } from 'xlsx'

import { DeleteRedSvg } from '../../../../assets/svg/DeleteRedSvg'
import { Load } from '../../../../assets/svg/Load'
import { PrintSvg } from '../../../../assets/svg/PrintSvg'
import { ColorBg, WrapperButton } from '../popover/WrapperButton'
import { useDeleteSubmissionMutation, useGetDocOrderQuery, useGetDocRepresentationQuery } from '../../../../store/api/practiceApi/representation'

interface Props {
	recordFullAll?: any
	recordFull?: any
	setRecordFull?: (arg: any) => void
	setSelectedFieldFull?: (arg: any) => void
}

export const PopoverContent = ({recordFull,recordFullAll,setRecordFull,setSelectedFieldFull}: Props) => {
	const [deleteRepresentation,{}] = useDeleteSubmissionMutation()
	const {data:dataGetDocRepresentation,isLoading:isLoadingDocRepesentation} = useGetDocOrderQuery(recordFull.id)
	
	function translateColumnsIntoRussia({ isPrint }: { isPrint: boolean }) {
		if (isPrint) {
			const newData: any = []
			if (recordFull) {
				// const recordFullWithoutUndefinedElem = recordFull.filter((elem:any) => elem !== undefined)
				// for (let elem of recordFullWithoutUndefinedElem) {

				// const stringIndTask = isPrint
				//     ?
				//     elem.individualTasks.map((elem:any, index:any) => `${index + 1}.${elem} `).join('</br>')
				//     :
				//     elem.individualTasks.map((elem:any, index:any) => `${index + 1}.${elem} `).join('\n')

				// const stringCompetencies = isPrint
				//     ?
				//     elem.competencies.map((elem:any, index:any) => `${index + 1}.${elem} `).join('</br>')
				//     :
				//     elem.competencies.map((elem:any, index:any) => `${index + 1}.${elem} `).join('\n')

				// const startPractice = `${dayjs(elem.practicePeriod[0]).format('DD.MM.YYYY')}`
				// const endPractice = `${dayjs(elem.practicePeriod[1]).format('DD.MM.YYYY')}`
				// const stringPeriodPractice = `${startPractice} - ${endPractice}`

				const newObj = {
					"Шифр и наименование специальности": recordFull.name,
                    "Дата заполнения": recordFull.dateFilling,
                    "ФИО обучающегося": recordFull.FIO,
                    "Учебный год": recordFull.academicYear,
                    "Курс": recordFull.course,
                    "Номер группы": recordFull.groupNumbers,
                    "Место прохождения практики": recordFull.place,
                    "ФИО руководителя от кафедры, должность": recordFull.director,
                    "Выездные практики": recordFull.isExit,
				}
				newData.push(newObj)
				// }
			}
			return newData
		}
		const newObj = {
					"Шифр и наименование специальности": recordFull.name,
                    "Дата заполнения": recordFull.dateFilling,
                    "ФИО обучающегося": recordFull.FIO,
                    "Учебный год": recordFull.academicYear,
                    "Курс": recordFull.course,
                    "Номер группы": recordFull.groupNumbers,
                    "Место прохождения практики": recordFull.place,
                    "ФИО руководителя от кафедры, должность": recordFull.director,
                    "Выездные практики": recordFull.isExit,
		}

		// }

		return newObj
	}
	const downloadFile = () => {
		if (dataGetDocRepresentation) {
			const link = document.createElement('a')
			link.href = dataGetDocRepresentation
			link.setAttribute('download', 'downloaded-file.docx')
			document.body.appendChild(link)
			link.click()

			// window.URL.revokeObjectURL(dataBlob)
		}
	}

	function downLoad() {
		// const ws = utils.json_to_sheet([
		// 	translateColumnsIntoRussia({ isPrint: false })
		// ])
		// const wb = utils.book_new()
		// utils.book_append_sheet(wb, ws, 'Data')
		// writeFileXLSX(wb, 'File.xlsx')
		downloadFile()
	}

	function printTable() {
		function properties() {
			if (recordFull) {
				return [
					"Шифр и наименование специальности",
                    "Дата заполнения",
                    "ФИО обучающегося",
                    "Учебный год",
                    "Курс",
                    "Номер группы",
                    "Место прохождения практики",
                    "ФИО руководителя от кафедры, должность",
                    "Выездные практики",
				]
			}
		}

		printJS({
			printable: translateColumnsIntoRussia({ isPrint: true }),
			properties: properties(),
			type: 'json',
			style: 'body {font-size: 10px}'
		})
	}

	function deleteData() {
		if (setRecordFull && recordFull && recordFullAll) {
			// const recordFullWithoutUndefinedElem = recordFull.filter(
			// 	(elem: any) => elem !== undefined
			// )

			// const listId = recordFullWithoutUndefinedElem.map((elem: any) => elem.id)
			// setRecordFull(
			// 	recordFullAll.filter((elem: any) => {
			// 		return !listId.includes(elem.id)
			// 	})
			// )
			// if (setSelectedFieldFull) {
			//     setSelectedFieldFull([])
			// }

			// const objIdList: ListIdDeleteContracts = {
			//     listIdDelete: listId
			// }
			//deleteSeveralContracts(objIdList)
			console.log('recordFull.id',recordFull.id)
			deleteRepresentation(recordFull.id).unwrap().then(()=>{
	
					const newArr = recordFullAll.filter((elem:any) => {
						return elem.id !== recordFull.id
					})
					console.log('newArr',newArr)
					setRecordFull(newArr)
					
			})
		}
			
		


		// const listId = recordFull?.map((elem: any) => elem.id)
		// const listIdDelete = {
		// 	listIdDelete: listId
		// }
		// deletePractise(listIdDelete)
	}


	return (
		<div className={'flex flex-col gap-2 '} onClick={(e) => { e.stopPropagation()}} >
			<WrapperButton color={ColorBg.BLUEF2} onClick={downLoad} disabled={isLoadingDocRepesentation}>
				{isLoadingDocRepesentation ? <Spin/> :''}
				<Load />
				<span>Скачать</span>
			</WrapperButton>

			{/* <WrapperButton color={ColorBg.BLUEF2} onClick={printTable}>
				<PrintSvg />
				<span>Печать выбранного</span>
			</WrapperButton> */}

			{/* <Popconfirm
				title="Удаление"
				description="Вы уверены, что хотите удалить?"
				onConfirm={deleteData}
				okText="Да"
				cancelText="Нет"
			>
				<WrapperButton color={ColorBg.REDE5}>
					<DeleteRedSvg />
					<span className={'text-[#E04545]'}>Удалить</span>
				</WrapperButton>
			</Popconfirm> */}
		</div>
	)
}
