import { PlusOutlined } from '@ant-design/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import {
	Button,
	Col,
	DatePicker,
	Input,
	Row,
	Select,
	Space,
	Typography,
	Upload,
	UploadFile,
	UploadProps,
	message
} from 'antd'
import { format } from 'date-fns/format'
import dayjs from 'dayjs'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { ArrowLeftSvg } from '../../../../assets/svg'
import {
	useChangeContractMutation,
	useCreateContractMutation,
	useGetContractQuery
} from '../../../../store/practiceApi/taskService'
import { ICreateContract, ICreateContractFull } from '../../../../store/type'
import { SignInSchema } from '../validation'

type PropsType = {
	edit: string
	setEdit: Dispatch<SetStateAction<string>>
}

export const EditContract = ({ edit, setEdit }: PropsType) => {
	const { data: contract } = useGetContractQuery(edit)
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<any>({
		resolver: yupResolver(SignInSchema),
		mode: 'onBlur'
	})

	const [pdfContract, setPdfContract] = useState<File>()
	const [pdfAgreement, setPdfAgreement] = useState<File>()

	const [editContract] = useChangeContractMutation()
	const [dataContract, setDataContract] = useState<any>()

	useEffect(() => {
		if (contract) {
			reset(contract)
			setDataContract(contract)
		}
	}, [contract])

	console.log(dataContract)
	const props: UploadProps = {
		name: 'pdfContract',
		beforeUpload: file => {
			setPdfContract(file)
			return false
		},
		maxCount: 1
	}

	const pdf_props: UploadProps = {
		name: 'pdfAgreement',
		beforeUpload: file => {
			setPdfAgreement(file)
			return false
		},
		maxCount: 1
	}

	const navigate = useNavigate()

	const onSubmit: SubmitHandler<ICreateContractFull> = data => {
		data.id = edit
		data.prolongation = 3
		data.dateConclusionContract = dataContract?.dateConclusionContract
		data.contractTime = dataContract?.contractTime
		console.log(data)
		editContract(data)
			.unwrap()
			.then(() => {
				setEdit('')
			})
	}
	return (
		<section className="container">
			<Space size={10}>
				<Button
					size="large"
					className="mt-1"
					icon={<ArrowLeftSvg className="w-4 h-4 cursor-pointer mt-1" />}
					type="text"
					onClick={() => setEdit('')}
				/>
				<Typography.Text className="text-black text-3xl font-normal">
					Номер договора {dataContract?.contractNumber}
				</Typography.Text>
			</Space>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Row gutter={[16, 16]} className="mt-12">
					<Col xs={24} sm={24} md={18} lg={16} xl={12}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>
								Наименование организации по договору
							</Typography.Text>
							<Controller
								name="contractFacility"
								control={control}
								render={({ field }) => (
									<Input
										type="text"
										className="w-full"
										size="large"
										{...field}
										suffix={
											errors.contractFacility &&
											errors.contractFacility.message && (
												<Typography.Text type="danger">
													{errors.contractFacility.message as any}
												</Typography.Text>
											)
										}
									/>
								)}
							/>
						</Space>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4">
					<Col xs={24} sm={24} md={18} lg={16} xl={12}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>Номер договора</Typography.Text>
							<Controller
								name="contractNumber"
								control={control}
								render={({ field }) => (
									<Input
										type="text"
										className="w-full"
										size="large"
										{...field}
										suffix={
											errors.contractNumber &&
											errors.contractNumber.message && (
												<Typography.Text type="danger">
													{errors.contractNumber.message as any}
												</Typography.Text>
											)
										}
									/>
								)}
							/>
						</Space>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4">
					<Col xs={24} sm={24} md={18} lg={8} xl={6}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>Дата заключения договора</Typography.Text>
							<Controller
								name="dateConclusionContract"
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
										renderExtraFooter={() =>
											errors.dateConclusionContract &&
											errors.dateConclusionContract.message && (
												<Typography.Text type="danger">
													{errors.dateConclusionContract.message as any}
												</Typography.Text>
											)
										}
									/>
								)}
							/>
						</Space>
					</Col>
					<Col xs={24} sm={24} md={18} lg={8} xl={6}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>Тип договора</Typography.Text>
							<Controller
								name="contractType"
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										size="large"
										popupMatchSelectWidth={false}
										placeholder=""
										className="w-full"
										options={[
											{ value: 'Бессрочный', label: 'Бессрочный' },
											{ value: 'С пролонгацией', label: 'С пролонгацией' }
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
							<Typography.Text>Срок действия договора</Typography.Text>
							<Controller
								name="contractTime"
								control={control}
								render={({ field, fieldState }) => (
									<DatePicker
										{...field}
										status={fieldState.error ? 'error' : undefined}
										value={field.value ? dayjs(field.value) : null}
										onChange={date => {
											field.onChange(date ? date.valueOf() : null)
										}}
										size="large"
										format="DD-MM-YYYY"
										className="w-full"
										renderExtraFooter={() =>
											errors.contractTime &&
											errors.contractTime.message && (
												<Typography.Text type="danger">
													{errors.contractTime.message as any}
												</Typography.Text>
											)
										}
									/>
								)}
							/>
						</Space>
					</Col>
					<Col xs={24} sm={24} md={18} lg={8} xl={6}>
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
												value: '31.08.11 Педиатрия',
												label: '31.08.11 Педиатрия'
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
							<Typography.Text>Юридический адрес организации</Typography.Text>
							<Controller
								name="legalFacility"
								control={control}
								render={({ field }) => (
									<Input
										type="text"
										className="w-full"
										size="large"
										{...field}
										suffix={
											errors.legalFacility &&
											errors.legalFacility.message && (
												<Typography.Text type="danger">
													{errors.legalFacility.message as any}
												</Typography.Text>
											)
										}
									/>
								)}
							/>
						</Space>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4">
					<Col xs={24} sm={24} md={18} lg={16} xl={12}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>Фактический адрес организации</Typography.Text>
							<Controller
								name="actualFacility"
								control={control}
								render={({ field }) => (
									<Input
										type="text"
										className="w-full"
										size="large"
										{...field}
										suffix={
											errors.actualFacility &&
											errors.actualFacility.message && (
												<Typography.Text type="danger">
													{errors.actualFacility.message as any}
												</Typography.Text>
											)
										}
									/>
								)}
							/>
						</Space>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4">
					<Col xs={24} sm={24} md={18} lg={16} xl={12}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>Количество мест</Typography.Text>
							<Controller
								name="placeNumber"
								control={control}
								render={({ field }) => (
									<Input
										type="text"
										className="w-full"
										size="large"
										{...field}
										suffix={
											errors.placeNumber &&
											errors.placeNumber.message && (
												<Typography.Text type="danger">
													{errors.placeNumber.message as any}
												</Typography.Text>
											)
										}
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
								Прикрепить скан договора в формате pdf
							</Typography.Text>
							<Upload {...props}>
								<Button
									className="w-full"
									size="large"
									type="primary"
									icon={<PlusOutlined />}
								>
									Добавить файл
								</Button>
							</Upload>
						</Space>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4">
					<Col xs={24} sm={24} md={18} lg={8} xl={6}>
						<Space direction="vertical" className="w-full">
							<Typography.Text>
								Прикрепить дополнительный документ в формате pdf
							</Typography.Text>
							<Upload {...pdf_props}>
								<Button
									className="w-full"
									size="large"
									type="primary"
									icon={<PlusOutlined />}
								>
									Добавить файл
								</Button>
							</Upload>
						</Space>
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
