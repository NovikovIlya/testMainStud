import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
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
import {
	Button,
	Col,
	DatePicker,
	Input,
	Row,
	Select,
	Space,
	Typography
} from 'antd'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { format } from 'date-fns'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { isDataView } from 'util/types'

import { ArrowLeftSvg } from '../../../../assets/svg'
import { DeleteSvg } from '../../../../assets/svg/DeleteSvg'
import {
	useCreatePracticeMutation,
	useCreateTaskMutation
} from '../../../../store/api/practiceApi/taskService'
import {
	INewPracticeType,
	INewTaskType,
	NewPracticeSchema,
	NewTaskSchema
} from '../validation'

interface IFormInput {
	practiceType: { label: string }
	specialtyName: { label: string }
	semester: { label: number }
	academicYear: { label: number }
	courseStudy: { label: number }
	practiceStartDate: { label: string }
	practiceEndDate: { label: string }
	totalHours: { label: number }
	department: { label: string }
	groupNumber: { label: string }
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
		...(isDragging ? { position: 'relative', zIndex: -1 } : {})
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

const CreatePractical = () => {
	const [createPractice] = useCreatePracticeMutation()
	const {
		control,
		handleSubmit,
		watch,
		setValue,
		getValues,
		formState: { errors }
	} = useForm<INewPracticeType>({
		//resolver: yupResolver(NewPracticeSchema),
		mode: 'onBlur',
		defaultValues: {
			dataSource: []
		}
	})

	console.log(errors)
	const [dataSource, setDataSource] = useState<{ key: string; name: string }[]>(
		[]
	)
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
			const currentDataSource = getValues('dataSource') || []

			const activeIndex = currentDataSource.findIndex(
				(i: any) => i.key === active.id
			)
			const overIndex = currentDataSource.findIndex(
				(i: any) => i.key === over?.id
			)

			const updatedDataSource = arrayMove(
				currentDataSource,
				activeIndex,
				overIndex
			)

			setValue('dataSource', updatedDataSource, { shouldValidate: true })
		}
	}

	const dataTest = watch('dataSource')

	const handleAddTask = () => {
		const currentInputValue = watch('dataInput')
		const currentDataSource = getValues('dataSource') || []

		const newTask = {
			key: `${currentDataSource.length + 1}`,
			name: currentInputValue
		}

		const updatedDataSource = [...currentDataSource, newTask]

		setValue('dataSource', updatedDataSource, { shouldValidate: true })
		setValue('dataInput', '')
	}

	const handleDeleteTask = (key: string) => {
		const currentDataSource = getValues('dataSource') || []

		const updatedDataSource = currentDataSource.filter(
			(item: any) => item.key !== key
		)

		setValue('dataSource', updatedDataSource, { shouldValidate: true })
	}

	const onSubmit: SubmitHandler<INewPracticeType> = data => {
		const {
			specialtyName,
			practiceType,
			department,
			groupNumber,
			semester,
			academicYear,
			courseStudy,
			practiceStartDate,
			practiceEndDate,
			totalHours
		} = data
		const namesArray = data.dataSource?.map(item => item.name)
		if (namesArray) {
			const newTask = {
				specialtyName: specialtyName,
				practiceType: practiceType,
				individualTasks: namesArray.join(' '),
				department: department,
				groupNumber: groupNumber,
				semester: parseInt(semester),
				academicYear: parseInt(academicYear),
				courseStudy: parseInt(courseStudy),
				practiceStartDate: format(new Date(practiceStartDate), 'MM.dd.yyyy'),
				practiceEndDate: format(new Date(practiceEndDate), 'MM.dd.yyyy'),
				totalHours: parseInt(totalHours),
				competence: 'string',
				departmentDirector: 'string'
			}
			createPractice(newTask)
				.unwrap()
				.then(() => {
					navigate('/services/practices/practical')
				})
		}
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
						navigate('/services/practices/practical')
					}}
				/>
				<Typography.Text className=" text-[28px] font-normal">
					Выберите
				</Typography.Text>
			</Space>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Row gutter={[16, 16]} className="mt-4">
					<Col xs={24} sm={24} md={18} lg={16} xl={12}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>
								Шифр и наименование специальности
							</Typography.Text>
							<Controller
								name="specialtyName"
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										size="large"
										popupMatchSelectWidth={false}
										placeholder=""
										defaultValue=""
										className="w-full"
										options={[
											{
												value: '31.08.01 Акушерство и гинекология',
												label: '31.08.01 Акушерство и гинекология'
											},
											{
												value: '31.08.12 Педиатрия',
												label: '31.08.12 Педиатрия'
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
						<Space direction="vertical" className="w-full z-10">
							<Typography.Text>Тип практики</Typography.Text>
							<Controller
								name="practiceType"
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										size="large"
										popupMatchSelectWidth={false}
										placeholder=""
										defaultValue=""
										className="w-full"
										options={[
											{
												value: 'Производственная',
												label: 'Производственная'
											},
											{
												value: 'Учебная',
												label: 'Учебная'
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
								name="department"
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										size="large"
										popupMatchSelectWidth={false}
										placeholder=""
										defaultValue=""
										className="w-full"
										options={[
											{
												value: 'Акушерство и гинекология',
												label: 'Акушерство и гинекология'
											},
											{
												value: 'Педиатрия',
												label: 'Педиатрия'
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
						<Space direction="vertical" className="w-full z-10">
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
										defaultValue=""
										className="w-full"
										options={[
											{
												value: '09-052',
												label: '09-052'
											},
											{
												value: '9383',
												label: '9383'
											}
										]}
									/>
								)}
							/>
						</Space>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4">
					<Col xs={24} sm={24} md={18} lg={8} xl={6}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>Семестр</Typography.Text>
							<Controller
								name="semester"
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										size="large"
										popupMatchSelectWidth={false}
										placeholder=""
										defaultValue=""
										className="w-full"
										options={[
											{ value: '1', label: '1' },
											{ value: '2', label: '2' }
										]}
									/>
								)}
							/>
						</Space>
					</Col>
					<Col xs={24} sm={24} md={18} lg={8} xl={6}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>Учебный год</Typography.Text>
							<Controller
								name="academicYear"
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										size="large"
										popupMatchSelectWidth={false}
										placeholder=""
										defaultValue=""
										className="w-full"
										options={[
											{ value: '2022', label: '2022' },
											{ value: '2023', label: '2023' },
											{ value: '2024', label: '2024' }
										]}
									/>
								)}
							/>
						</Space>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4">
					<Col xs={24} sm={24} md={18} lg={8} xl={6}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>Курс обучения</Typography.Text>
							<Controller
								name="courseStudy"
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										size="large"
										popupMatchSelectWidth={false}
										placeholder=""
										defaultValue=""
										className="w-full"
										options={[
											{ value: '1', label: '1' },
											{ value: '2', label: '2' },
											{ value: '3', label: '3' },
											{ value: '4', label: '4' },
											{ value: '5', label: '5' },
											{ value: '6', label: '6' }
										]}
									/>
								)}
							/>
						</Space>
					</Col>
					<Col xs={24} sm={24} md={18} lg={8} xl={6}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>Дата начала практики</Typography.Text>
							<Controller
								name="practiceStartDate"
								control={control}
								render={({ field, fieldState }) => (
									<DatePicker
										status={fieldState.error ? 'error' : undefined}
										ref={field.ref}
										name={field.name}
										onBlur={field.onBlur}
										value={field.value ? dayjs(field.value) : null}
										onChange={date => {
											field.onChange(date ? date.valueOf() : null)
										}}
										size="large"
										format="DD.MM.YYYY"
										placeholder=""
										className="w-full"
									/>
								)}
							/>
						</Space>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4">
					<Col xs={24} sm={24} md={18} lg={8} xl={6}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>
								Общее количество часов по практике
							</Typography.Text>
							<Controller
								name="totalHours"
								control={control}
								render={({ field }) => (
									<Input
										type="text"
										className="w-full"
										size="large"
										{...field}
									/>
								)}
							/>
						</Space>
					</Col>
					<Col xs={24} sm={24} md={18} lg={8} xl={6}>
						<Space direction="vertical" className="w-full z-10">
							<Typography.Text>Дата окончания практики</Typography.Text>
							<Controller
								name="practiceEndDate"
								control={control}
								render={({ field, fieldState }) => (
									<DatePicker
										status={fieldState.error ? 'error' : undefined}
										ref={field.ref}
										name={field.name}
										onBlur={field.onBlur}
										value={field.value ? dayjs(field.value) : null}
										onChange={date => {
											field.onChange(date ? date.valueOf() : null)
										}}
										size="large"
										format="DD.MM.YYYY"
										placeholder=""
										className="w-full"
									/>
								)}
							/>
						</Space>
					</Col>
				</Row>
				<Space direction="vertical" className="w-full  mb-4 mt-10">
					<Typography.Text className="font-bold">
						Индивидуальные задания
					</Typography.Text>
				</Space>
				<Row className="-z-1">
					<Col span={24}>
						<DndContext
							modifiers={[restrictToVerticalAxis]}
							onDragEnd={onDragEnd}
						>
							<SortableContext
								items={dataTest ? dataTest.map((i: any) => i.key) : []}
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
									dataSource={dataTest}
								/>
							</SortableContext>
						</DndContext>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4 -z-1">
					<Col xs={24} sm={24} md={18} lg={16} xl={12}>
						<Controller
							name="dataInput"
							control={control}
							render={({ field }) => (
								<Space.Compact style={{ width: '100%' }}>
									<Input
										{...field}
										size="large"
										placeholder="type task..."
										suffix={
											errors.dataSource &&
											errors.dataSource.message && (
												<Typography.Text type="danger">
													{errors.dataSource.message}
												</Typography.Text>
											)
										}
									/>
									<Button
										size="large"
										type="primary"
										icon={<PlusOutlined />}
										onClick={handleAddTask}
									/>
								</Space.Compact>
							)}
						/>
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
						</Space>
					</Col>
				</Row>
			</form>
		</section>
	)
}

export default CreatePractical
