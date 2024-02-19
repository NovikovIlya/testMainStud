import { PlusOutlined } from '@ant-design/icons'
import { MenuOutlined } from '@ant-design/icons'
import type { DragEndEvent } from '@dnd-kit/core'
import { DndContext } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
	SortableContext,
	arrayMove,
	useSortable,
	verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button, Col, Input, Row, Select, Space, Typography } from 'antd'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React, { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { ArrowLeftSvg } from '../../../../assets/svg'
import { DeleteSvg } from '../../../../assets/svg/DeleteSvg'

interface IFormInput {
	type: { label: string; value: string }
	division: { label: string; value: string }
	code: { label: string; value: string }
	department: { label: string; value: string }
	groupNumber: { label: string; value: string }
	term: { label: string; value: string }
	academicYear: { label: string; value: string }
	courseStudy: { label: string; value: string }
	practicePeriod: { label: string; value: string }
	numberPractice: { label: string; value: string }
}

interface DataType {
	key: string
	name: string
}

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
	'data-row-key': string
}

const Rows = ({ children, ...props }: RowProps) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		setActivatorNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({
		id: props['data-row-key']
	})

	const style: React.CSSProperties = {
		...props.style,
		transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
		transition,
		...(isDragging ? { position: 'relative', zIndex: 9999 } : {})
	}

	return (
		<tr {...props} ref={setNodeRef} style={style} {...attributes}>
			{
				//@ts-ignore
				(React.Children as any).map(children, child => {
					if ((child as React.ReactElement).key === 'sort') {
						return React.cloneElement(child as React.ReactElement, {
							children: (
								<MenuOutlined
									ref={setActivatorNodeRef}
									style={{ touchAction: 'none', cursor: 'move' }}
									{...listeners}
								/>
							)
						})
					}
					return child
				})
			}
		</tr>
	)
}

export const CreatePractical = () => {
	const [task, setTask] = useState('')
	const { control, handleSubmit } = useForm({
		defaultValues: {
			division: {
				label: 'Институт фундаментальной медицины и биологии. Ординатура',
				value: '1'
			},
			code: {
				label: '31.08.01 Акушерство и гинекология',
				value: '1'
			},
			type: {
				label:
					'Производственная (клиническая) практика: акушерство и гинекология',
				value: '1'
			},
			department: {
				label:
					'Производственная (клиническая) практика: акушерство и гинекология',
				value: '1'
			},
			groupNumber: {
				label:
					'Производственная (клиническая) практика: акушерство и гинекология',
				value: '1'
			},
			term: {
				label:
					'Производственная (клиническая) практика: акушерство и гинекология',
				value: '1'
			},
			academicYear: {
				label:
					'Производственная (клиническая) практика: акушерство и гинекология',
				value: '1'
			},
			courseStudy: {
				label:
					'Производственная (клиническая) практика: акушерство и гинекология',
				value: '1'
			},
			practicePeriod: {
				label:
					'Производственная (клиническая) практика: акушерство и гинекология',
				value: '1'
			},
			numberPractice: {
				label:
					'Производственная (клиническая) практика: акушерство и гинекология',
				value: '1'
			}
		}
	})
	const [dataSource, setDataSource] = useState([
		{
			key: '1',
			name: 'Овладеть методиками кесарева сечения (корпоральное, истмико-корпоральное, в нижнем сегменте матки, экстракорпоральное '
		},
		{
			key: '2',
			name: 'Овладеть методиками родоразрешающих и плодоразрушающих операций'
		},
		{
			key: '3',
			name: 'Акушерский травматизм матери и плода'
		}
	])
	const columns: ColumnsType<DataType> = [
		{
			key: 'sort'
		},
		{
			key: 'x',
			render(_, __, index) {
				return <>{++index}</>
			}
		},
		{
			width: '100%',
			title: '',
			dataIndex: 'name'
		},
		{
			title: '',
			dataIndex: '',
			key: 'x',
			render: (param, __, index) => (
				<Space size="middle">
					<Button
						type="text"
						icon={<DeleteSvg />}
						danger
						onClick={() => handleDeleteTask(param.key)}
					/>
				</Space>
			)
		}
	]
	const onDragEnd = ({ active, over }: DragEndEvent) => {
		if (active.id !== over?.id) {
			setDataSource(previous => {
				const activeIndex = previous.findIndex(i => i.key === active.id)
				const overIndex = previous.findIndex(i => i.key === over?.id)
				return arrayMove(previous, activeIndex, overIndex)
			})
		}
	}

	const handleAddTask = () => {
		setDataSource(prev => [
			...prev,
			{
				key: `${++prev.length}`,
				name: task
			}
		])
		setTask('')
	}
	const handleDeleteTask = (key: string) =>
		setDataSource(prev => [...prev.filter(item => item.key !== key)])

	const onSubmit: SubmitHandler<IFormInput> = data => {
		console.log({ data, dataSource })
	}
	const navigate = useNavigate()
	return (
		<section className="container">
			<Space size={10} align="center">
				<Button
					size="large"
					className="mt-1"
					icon={<ArrowLeftSvg className="w-4 h-4 cursor-pointer mt-1" />}
					type="text"
					onClick={() => {
						navigate('/services/practices/individualTasks/')
					}}
				/>
				<Typography.Text className=" text-[28px] font-normal">
					31.08.01 Акушерство и гинекология
				</Typography.Text>
			</Space>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Row gutter={[16, 16]} className="mt-12">
					<Col xs={24} sm={24} md={18} lg={16} xl={12}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>Подразделение</Typography.Text>
							<Controller
								name="division"
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										size="large"
										popupMatchSelectWidth={false}
										className="w-full"
										options={[
											{
												value: '1',
												label:
													'Институт фундаментальной медицины и биологии. Ординатура'
											}
										]}
									/>
								)}
							/>
						</Space>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4">
					<Col xs={24} sm={24} md={18} lg={16} xl={12}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>
								Шифр и наименование специальности
							</Typography.Text>
							<Controller
								name="code"
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										size="large"
										popupMatchSelectWidth={false}
										placeholder=""
										className="w-full"
										options={[
											{
												value: '1',
												label: '31.08.01 Акушерство и гинекология'
											}
										]}
									/>
								)}
							/>
						</Space>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4">
					<Col xs={24} sm={24} md={18} lg={16} xl={12}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>Тип практики</Typography.Text>
							<Controller
								name="type"
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										size="large"
										popupMatchSelectWidth={false}
										placeholder=""
										className="w-full"
										options={[
											{
												value: 1,
												label:
													'Производственная (клиническая) практика: акушерство и гинекология'
											}
										]}
									/>
								)}
							/>
						</Space>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4">
					<Col xs={24} sm={24} md={18} lg={16} xl={12}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>Кафедра</Typography.Text>
							<Controller
								name="term"
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										size="large"
										popupMatchSelectWidth={false}
										placeholder=""
										className="w-full"
										options={[
											{
												value: 1,
												label:
													'Кафедра хирургических болезней постдипломного образования'
											}
										]}
									/>
								)}
							/>
						</Space>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4">
					<Col xs={24} sm={24} md={18} lg={16} xl={12}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>Номер группы</Typography.Text>
							<Controller
								name="groupNumber"
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										size="large"
										popupMatchSelectWidth={false}
										placeholder=""
										className="w-full"
										options={[
											{
												value: 1,
												label: '10.4-134'
											}
										]}
									/>
								)}
							/>
						</Space>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4">
					<Col xs={24} sm={24} md={18} lg={16} xl={12}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>Номер группы</Typography.Text>
							<Controller
								name="term"
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										size="large"
										popupMatchSelectWidth={false}
										placeholder=""
										className="w-full"
										options={[
											{
												value: 1,
												label: '10.4-134'
											}
										]}
									/>
								)}
							/>
						</Space>
					</Col>
				</Row>
				<Space direction="vertical" className="w-full  my-4">
					<Typography.Text className="font-bold">
						Индивидуальные задания
					</Typography.Text>
				</Space>
				<Row>
					<Col span={12}>
						<DndContext
							modifiers={[restrictToVerticalAxis]}
							onDragEnd={onDragEnd}
						>
							<SortableContext
								// rowKey array
								items={dataSource.map(i => i.key)}
								strategy={verticalListSortingStrategy}
							>
								<Table
									components={{
										body: {
											row: Rows
										}
									}}
									showHeader={false}
									pagination={false}
									rowKey="key"
									bordered={false}
									columns={columns}
									dataSource={dataSource}
								/>
							</SortableContext>
						</DndContext>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4">
					<Col xs={24} sm={24} md={18} lg={16} xl={12}>
						<Space.Compact style={{ width: '100%' }}>
							<Input
								size="large"
								placeholder="type task..."
								value={task}
								onChange={e => setTask(e.target.value)}
							/>
							<Button
								size="large"
								type="primary"
								icon={<PlusOutlined />}
								onClick={handleAddTask}
							/>
						</Space.Compact>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="my-8">
					<Col xs={24} sm={24} md={18} lg={8} xl={6}>
						<Space className="w-full">
							<Button
								className="!rounded-full"
								size="large"
								type="primary"
								htmlType="submit"
							>
								Сохранить
							</Button>
							<Button className="!rounded-full" size="large" onClick={() => {}}>
								Режим просмотра
							</Button>
						</Space>
					</Col>
				</Row>
			</form>
		</section>
	)
}

export default CreatePractical
