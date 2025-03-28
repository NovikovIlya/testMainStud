import type { GetRef, TableProps } from 'antd'
import { Form, Input, InputNumber, Table } from 'antd'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../../../store'
import './index.css'
import { format, parse } from 'date-fns';

type FormInstance<T> = GetRef<typeof Form<T>>

const EditableContext = React.createContext<FormInstance<any> | null>(null)

interface Item {
	key: string
	name: string
	age: string
	address: string
}

const EditableRow: React.FC<any> = ({ index, ...props }) => {
	const [form] = Form.useForm()
	return (
		<Form form={form} component={false}>
			<EditableContext.Provider value={form}>
				<tr {...props} />
			</EditableContext.Provider>
		</Form>
	)
}

interface EditableCellProps {
	title: React.ReactNode
	editable: boolean
	dataIndex: keyof Item
	record: Item
	handleSave: (record: Item) => void
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
	title,
	editable,
	children,
	dataIndex,
	record,
	handleSave,
	...restProps
}) => {
	const [editing, setEditing] = useState(false)
	const inputRef = useRef<any>(null)
	const form = useContext(EditableContext)!

	const statusRepresentation = useAppSelector(state => state.notification.status)

	useEffect(() => {
		if (editing) {
			inputRef.current?.focus()
		}
	}, [editing])

	const toggleEdit = () => {
		setEditing(!editing)
		form.setFieldsValue({ [dataIndex]: record[dataIndex] })
	}

	const save = async () => {
		try {
			const values = await form.validateFields()

			toggleEdit()
			handleSave({ ...record, ...values })
		} catch (errInfo) {
			console.log('Save failed:', errInfo)
		}
	}

	let childNode = children

	if (editable && statusRepresentation) {
		childNode = editing ? (
			// @ts-ignore
			dataIndex === 'costForDay' || dataIndex === 'arrivingCost' || dataIndex === 'livingCost' ? (
				<Form.Item style={{ margin: 0 }} name={dataIndex}>
					<InputNumber min={0} ref={inputRef} onPressEnter={save} onBlur={save} />
				</Form.Item>
			) : (
				<Form.Item style={{ margin: 0 }} name={dataIndex}>
					<Input ref={inputRef} onPressEnter={save} onBlur={save} />
				</Form.Item>
			)
		) : (
			<div className="editable-cell-value-wrap h-[32px]" onClick={toggleEdit}>
				{children}
			</div>
		)
	}

	return <td {...restProps}>{childNode}</td>
}

interface DataType {
	key: React.Key
	name: string
	age: string
	address: string
}

type ColumnTypes = Exclude<TableProps['columns'], undefined>

export const TableEditView = ({ isSuccessDataOne,visiting, fullTable=[], setFullTable, create=false,setIsFIOProf }: any) => {

	
	const defaultColumns = [
		{
			key: 'number',
			dataIndex: 'number',
			title: '№',
			className: 'text-xs !p-2',
			
		},
		{
			key: 'name',
			dataIndex: 'name',
			title: 'ФИО обучающегося',
			name: 'ФИО обучающегося',
			className: 'text-xs !p-2'
		},

		{
			key: 'practicePeriod',
			dataIndex: 'practicePeriod',
			title: 'Период практики',
			className: 'text-xs !p-2',
			render: (text: any) => <div>{formatDateRange(text)}</div>
		},
		{
			key: 'other',
			dataIndex: 'other',
			title: 'Курc, вид и тип прохождения практики',
			className: 'text-xs !p-2',
			
		},
		
		{
			key: 'specialtyName',
			dataIndex: 'specialtyName',
			title: 'Шифр и наименование спциальности',
			className: 'text-xs !p-2',
			
		},
		{
			key: 'departmentDirector',
			dataIndex: 'departmentDirector',
			title: 'ФИО руководителя практики от Организации',
			className: 'text-xs !p-2',
			
		},
		{
			key: 'profileDirector',
			dataIndex: 'profileDirector',
			title: 'ФИО руководителя практики от Профильной Организации',
			className: 'text-xs !p-2',
			editable:true
			
		},
		
	]

	const formatDateRange = (dates:any) => {
		const startDate = parse(dates[0], 'yyyy/MM/dd', new Date());
		const endDate = parse(dates[1], 'yyyy/MM/dd', new Date());
	  
		return `${format(startDate, 'dd.MM.yyyy')} - ${format(endDate, 'dd.MM.yyyy')}`;
	};

	const handleSave = (row: DataType) => {
		const newData = [...fullTable]
		const index = newData.findIndex(item => row.key === item.key)
		const item = newData[index]
		newData.splice(index, 1, {
			...item,
			...row
		})

		setFullTable(newData)
	}

	const components = {
		body: {
			row: EditableRow,
			cell: EditableCell
		}
	}

	const columns = defaultColumns.map(col => {
		if (!col.editable) {
			return col
		}
		return {
			...col,
			onCell: (record: DataType) => ({
				record,
				editable: col.editable,
				dataIndex: col.dataIndex,
				title: col.title,
				handleSave,
				rules: [{ required: true, message: 'Поле обязательно для заполнения' }]
			})
		}
	})
	// useEffect(()=>{
	// 	if(fullTableValidState.length>0){
	// 		if(fullTableValidState.every((item:any)=>item.FIOProf!==null)){
			
	// 			setIsFIOProf(true)
	// 		}
	// }
	// },[fullTableValidState, setIsFIOProf])
	// console.log('fullTableValidState',fullTableValidState)
	// useEffect(()=>{
	// 	if(isSuccessDataOne && fullTable?.students?.length>0){
	// 		const fullTableValid = fullTable?.students?.map((item:any)=>{
	// 			return {
	// 				name: item.name,
	// 				period:formatDateRange(fullTable.practice.practicePeriod),
	// 				specialtyName: fullTable.practice.specialtyName,
	// 				FIO: fullTable.practice.departmentDirector,
	// 				other: `${fullTable.practice.courseNumber} ${fullTable.practice.practiceKind} ${fullTable.practice.practiceType}`,
	// 				FIOProf:null,
	// 				id:item.name,
	// 				key:item.name
	// 			}
	// 		})
	// 		setFullTableValidState(fullTableValid)
			
	// 	}
	// },[isSuccessDataOne])
	console.log('fullTable',fullTable)
	return (
		<div>
			<Table
				rowKey="id"
				components={components}
				rowClassName={() => 'editable-row'}
				bordered
				dataSource={fullTable.sort((a:any, b:any) => {
					const lastNameA = a.name.split(' ')[0]; 
					const lastNameB = b.name.split(' ')[0]; 
					return lastNameA.localeCompare(lastNameB); 
				}).map((item:any,index:number)=>({...item, number:index+1}))}
				columns={columns as ColumnTypes}
			/>
		</div>
	)
}

export default TableEditView
