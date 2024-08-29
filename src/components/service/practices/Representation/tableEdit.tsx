import type { GetRef, TableProps } from 'antd'
import { Form, Input, InputNumber, Table } from 'antd'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../../../store'
import './index.css'

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

export const TableEdit = ({ visiting, fullTable, setFullTable, create=false }: any) => {
	const defaultColumns = [
		{
			key: 'number',
			dataIndex: 'number',
			title: '№',
			className: 'text-xs !p-2',
			render: (text: any, record: any, index: any) => <div>{index + 1}</div>
		},
		{
			key: 'nane',
			dataIndex: 'name',
			title: 'ФИО обучающегося',
			name: 'ФИО обучающегося',
			className: 'text-xs !p-2'
		},

		{
			key: `${create ? 'groupNumber' : 'groupNumbers' }`,
			dataIndex:  `${create ? 'groupNumber' : 'groupNumbers' }`,
			title: 'Номер группы',
			className: 'text-xs !p-2'
		},
		{
			key: 'place',
			dataIndex: 'place',
			title: 'Место прохождения практики',
			className: 'text-xs !p-2',
			editable: true
		},
		{
			key: 'departmentDirector',
			dataIndex: 'departmentDirector',
			title: 'ФИО руководителя от кафедры',
			className: 'text-xs !p-2'
		},
		{
			key: 'category',
			dataIndex: 'category',
			title: 'Категория',
			className: `text-xs !p-2 ${visiting ? '' : 'hidden'}`
			// editable: true
		},
		{
			key: 'costForDay',
			dataIndex: 'costForDay',
			title: 'Суточные (50 руб/сут)',
			className: `text-xs !p-2 ${visiting ? '' : 'hidden'}`,
			editable: true
		},
		{
			key: 'arrivingCost',
			dataIndex: 'arrivingCost',
			title: 'Проезд (руб)',
			className: `text-xs !p-2 ${visiting ? '' : 'hidden'}`,
			editable: true
		},
		{
			key: 'livingCost',
			dataIndex: 'livingCost',
			title: 'Оплата проживания (руб)',
			className: `text-xs !p-2 ${visiting ? '' : 'hidden'}`,
			editable: true
		}
		// {
		//     title: '',
		//     dataIndex: 'operation',
		//     render: (_: any, record: Item) => {
		//         const editable = isEditing(record)
		//         return editable ? (
		//             <div className="flex justify-around items-center w-[60px]">
		//                 <Typography.Link
		//                     onClick={() => save(record.key)}
		//                     style={{ marginRight: 8 }}
		//                 >
		//                     <CheckOutlined style={{ color: '#75a4d3' }} />
		//                 </Typography.Link>
		//                 <Popconfirm
		//                     title="Вы действительно хотите отменить действие?"
		//                     onConfirm={cancel}
		//                 >
		//                     <CloseOutlined style={{ color: '#75a4d3' }} />
		//                 </Popconfirm>
		//             </div>
		//         ) : (
		//             <div className="flex justify-around items-center  w-[60px]">
		//                 <Typography.Link
		//                     disabled={editingKey !== ''}
		//                     onClick={() => edit(record)}
		//                 >
		//                     <EditSvg />
		//                 </Typography.Link>
		//                 {/* <Popconfirm title="Вы действительно хотите удалить?" onConfirm={deleteRow}>
		//           <a><DeleteRedSvg/></a>
		//       </Popconfirm> */}
		//             </div>
		//         )
		//     }
		// }
	]

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

	return (
		<div>
			<Table
				rowKey="id"
				components={components}
				rowClassName={() => 'editable-row'}
				bordered
				pagination={{
					pageSize: 10,
				}}
				dataSource={fullTable}
				columns={columns as ColumnTypes}
			/>
		</div>
	)
}

export default TableEdit
