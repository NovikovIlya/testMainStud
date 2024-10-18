import type { GetRef, InputRef, TableProps } from 'antd'
import { Button, Calendar, DatePicker, Form, Input, Select, Table } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import React, { useContext, useEffect, useRef, useState } from 'react'

import './index.css'

type FormInstance<T> = GetRef<typeof Form<T>>

const EditableContext = React.createContext<FormInstance<any> | null>(null)

const optionMock = [
	{
		value: 'Высокий',
		label: 'Высокий'
	},
	{
		value: 'Средний',
		label: 'Средний'
	},
	{
		value: 'Низкий',
		label: 'Низкий'
	},
	{
		value: 'Ниже порогового уровня',
		label: 'Ниже порогового уровня'
	}
]
const optionMockTwo = [
	{
		value: '1',
		label: '1'
	},
	{
		value: '2',
		label: '2'
	},
	{
		value: '3',
		label: '3'
	},
	{
		value: '4',
		label: '4'
	},
	{
		value: '5',
		label: '5'
	}
]


interface Item {
	key: string
	name: string
	period: string
	address: string
}

interface EditableRowProps {
	index: number
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
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
	const inputRef = useRef<InputRef>(null)
	const form = useContext(EditableContext)!

	useEffect(() => {
		if (editing) {
			inputRef.current?.focus()
		}
	}, [editing])

	const toggleEdit = () => {
		setEditing(!editing)
		form.setFieldsValue({ [dataIndex]: record[dataIndex] })
	}



	const save = async(value: any) => {
		console.log('date',value)
        try {
            const values = await form.validateFields();
      
            // toggleEdit();
            handleSave({ ...record, [dataIndex]: value });
          } catch (errInfo) {
            console.log('Save failed:', errInfo);
          }
		
	}
	
	let childNode = children

	// if (editable) {
	// 	childNode = editing ? (
	// 		<Form.Item style={{ margin: 0 }} name={dataIndex} >
	// 			<Select options={optionMock} className="w-32" size={'large'} allowClear onChange={save} />
	// 		</Form.Item>
	// 	) : (
	// 		<div className="editable-cell-value-wrap flex items-center h-10"  onClick={toggleEdit}>
	// 			{children}
	// 		</div>
         
	// 	)
	// }
	if (editable) {
		//@ts-ignore
		if(dataIndex==='grade'){
			childNode = (
				<Form.Item style={{ margin: 0 }} name={dataIndex} >
					 <Select  defaultValue={(record as any).grade} options={optionMockTwo} className="w-32" size={'large'} allowClear onChange={save} />
				</Form.Item>
			) 
		}else{
		childNode = (
			<Form.Item style={{ margin: 0 }} name={dataIndex} >
				 <Select  defaultValue={(record as any).level} options={optionMock} className="w-32" size={'large'} allowClear onChange={save} />
			</Form.Item>
		) 
            // <Form.Item style={{ margin: 0 }} name={dataIndex} >
			// 	<Select options={optionMock} className="w-32" size={'large'} allowClear onChange={save} />
			// </Form.Item>
		}
		
	}

	return <td {...restProps}>{childNode}</td>
}



type ColumnTypes = Exclude<TableProps['columns'], undefined>

const StudentTable = ({ setShow,dataSource ,setDataSource,setIsEdit}: any) => {

	const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
		{
			key: 'number',
			dataIndex: 'number',
			title: '№',
			className: 'text-xs !p-2',
			render: (text: any, record: any, index: any) => <div>{record.number}</div>
		},
		{
			title: 'Компетенции',
			dataIndex: 'name',
			width: '30%'
		},
		{
			title: 'Уровень сформированности компетенции',
			dataIndex: 'level',
			editable: true,
           
		},
		{
			title: 'Оценка руководителя практики за компетенции',
			dataIndex: 'grade',
			editable: true
		}
	]

	const handleSave = (row: any) => {
		setIsEdit(true)
		console.log('row',row)
		const newData = [...dataSource]
        console.warn('newData',newData)
		console.table(newData)
		const index = newData.findIndex(item => row.key === item.key)
		const item = newData[index]
		newData.splice(index, 1, {
			...item,
			...row
		})
		setDataSource(newData)
		// setShow(false)
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
			onCell: (record: any) => ({
				record,
				editable: col.editable,
				dataIndex: col.dataIndex,
				title: col.title,
				handleSave
			})
		}
	})

	return (
		<div className='mt-5'>
			<Table
				components={components}
				rowClassName={() => 'editable-row'}
				bordered
				dataSource={dataSource}
				columns={columns as ColumnTypes}
				pagination={false}
                rowKey={record => record.key}
			/>
		</div>
	)
}

export default StudentTable
