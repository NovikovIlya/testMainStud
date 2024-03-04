import { Button, Col, DatePicker, Row, Select, Space, Typography } from 'antd'
import dayjs from 'dayjs'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { ArrowLeftSvg } from '../../../../assets/svg'

interface IFormInput {
	type: { label: string; value: string }
	division: { label: string; value: string }
	code: { label: string; value: string }
	department: { label: string; value: string }
	groupNumber: { label: string; value: string }
	term: { label: string; value: string }
	academicYear: any
	courseStudy: { label: string; value: string }
	practicePeriod: any
	numberPractice: { label: string; value: string }
}

export const CreatePractical = () => {
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
				label: 'Кафедра хирургических болезней постдипломного образования',
				value: '1'
			},
			groupNumber: {
				label: '10.4-134',
				value: '1'
			},
			term: {
				label: '2',
				value: '1'
			},
			academicYear: ['', ''],
			courseStudy: {
				label: '1',
				value: '1'
			},
			practicePeriod: ['', ''],
			numberPractice: {
				label: '120',
				value: '1'
			}
		}
	})

	const onSubmit: SubmitHandler<IFormInput> = data => {
		console.log({ data })
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
								name="department"
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
					<Col xs={12} sm={12} md={9} lg={8} xl={6}>
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
					<Col xs={12} sm={12} md={9} lg={8} xl={6}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>
								Общее количество часов по практике
							</Typography.Text>
							<Controller
								name="numberPractice"
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
												label: '120'
											}
										]}
									/>
								)}
							/>
						</Space>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4">
					<Col xs={12} sm={12} md={9} lg={8} xl={6}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>Семестр</Typography.Text>
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
												label: '1'
											},
											{
												value: 2,
												label: '2'
											},
											{
												value: 3,
												label: '3'
											},
											{
												value: 4,
												label: '4'
											}
										]}
									/>
								)}
							/>
						</Space>
					</Col>
					<Col xs={12} sm={12} md={9} lg={8} xl={6}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>Учебный год</Typography.Text>
							<Controller
								name="academicYear"
								control={control}
								render={({ field, fieldState }) => (
									<DatePicker.RangePicker
										status={fieldState.error ? 'error' : undefined}
										ref={field.ref}
										name={field.name}
										onBlur={field.onBlur}
										value={
											field.value[0] && field.value[1]
												? [dayjs(field.value[0]), dayjs(field.value[1])]
												: null
										}
										onChange={date => {
											field.onChange(date ? date.valueOf() : null)
										}}
										size="large"
										format="YYYY"
										className="w-full"
										picker="year"
									/>
								)}
							/>
						</Space>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4">
					<Col xs={12} sm={12} md={9} lg={8} xl={6}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>Курс обучения </Typography.Text>
							<Controller
								name="courseStudy"
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
												label: '1'
											},
											{
												value: 2,
												label: '2'
											},
											{
												value: 3,
												label: '3'
											},
											{
												value: 4,
												label: '4'
											}
										]}
									/>
								)}
							/>
						</Space>
					</Col>
					<Col xs={12} sm={12} md={9} lg={8} xl={6}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>Период практики</Typography.Text>
							<Controller
								name="practicePeriod"
								control={control}
								render={({ field, fieldState }) => (
									<DatePicker.RangePicker
										status={fieldState.error ? 'error' : undefined}
										ref={field.ref}
										name={field.name}
										onBlur={field.onBlur}
										value={
											field.value[0] && field.value[1]
												? [dayjs(field.value[0]), dayjs(field.value[1])]
												: null
										}
										onChange={date => {
											field.onChange(date ? date.valueOf() : null)
										}}
										size="large"
										format="DD-MM-YYYY"
										className="w-full"
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
					<Col span={12}></Col>
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
