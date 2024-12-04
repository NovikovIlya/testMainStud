import { Popconfirm, Spin } from 'antd'
import dayjs from 'dayjs'
import printJS from 'print-js'
import React, { useEffect, useState } from 'react'
import { utils, writeFileXLSX } from 'xlsx'

import { DeleteRedSvg } from '../../../../assets/svg/DeleteRedSvg'
import { Load } from '../../../../assets/svg/Load'
import { PrintSvg } from '../../../../assets/svg/PrintSvg'
import { ColorBg, WrapperButton } from '../popover/WrapperButton'
import { useDeleteMutation, useGetDocQuery } from '../../../../store/api/practiceApi/formingSchedule'

interface Props {
	recordFullAll?: any
	recordFull?: any
	setRecordFull?: (arg: any) => void
	setSelectedFieldFull?: (arg: any) => void
}

export const PopoverContent = ({recordFull,recordFullAll,setRecordFull,setSelectedFieldFull}: Props) => {
	const [deletePractise,{}] = useDeleteMutation()
	const { data: dataBlob, isLoading: isLoadingBlob,isFetching:isFetchingBlob } = useGetDocQuery(recordFull.id,{ skip: !recordFull.id })
	console.log('recordFull', recordFull)
	function translateColumnsIntoRussia({ isPrint }: { isPrint: boolean }) {
		if (isPrint) {
			const newData: any = []
			if (recordFull) {

				const newObj = {
					'Наименование графика': recordFull.name,
					'Дата заполнения': recordFull.dateFilling,
					'Учебный год': recordFull.academicYear,
					'Период практики': recordFull.period
				}
				newData.push(newObj)
				// }
			}
			return newData
		}
		const newObj = {
			'Наименование графика': recordFull.name,
			'Дата заполнения': recordFull.dateFilling,
			'Учебный год': recordFull.academicYear,
			'Период практики': recordFull.period
		}

		// }

		return newObj
	}

	function downLoad() {
		console.log('1',recordFull)
		downloadFile()
	}

	function printTable() {
		function properties() {
			if (recordFull) {
				return [
					'Наименование графика',
					'Дата заполнения',
					'Учебный год',
					'Период практики'
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
		}

		deletePractise(recordFull.id)
	}
	const downloadFile = () => {
		if (dataBlob) {
			const link = document.createElement('a')
			link.href = dataBlob
			link.setAttribute('download', `${recordFull.name}.docx`)
			document.body.appendChild(link)
			link.click()

			// window.URL.revokeObjectURL(dataBlob)
		}
	}
	console.log('rrr',recordFullAll)

	return (
		<div className={'flex flex-col gap-2 '} onClick={(e) => { 
			e.stopPropagation()

			}} >
			<WrapperButton  disabled={isLoadingBlob} color={ColorBg.BLUEF2} onClick={downLoad}>
				{isLoadingBlob ? <Spin/> :''}
				<Load />
				<span>Скачать </span>
			</WrapperButton>

			{/* <WrapperButton color={ColorBg.BLUEF2} onClick={printTable}>
				<PrintSvg />
				<span>Печать выбранного</span>
			</WrapperButton> */}

			<Popconfirm
				title="Удаление"
				description="Вы уверены, что хотите удалить?"
				onConfirm={deleteData}
				okText="Да"
				cancelText="Нет"
			>
				<WrapperButton color={ColorBg.REDE5}>
					<DeleteRedSvg />
					<span className={'text-[#E04545]'}>Удалить </span>
				</WrapperButton>
			</Popconfirm>
		</div>
	)
}
