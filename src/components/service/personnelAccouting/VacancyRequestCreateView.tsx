import { LoadingOutlined } from '@ant-design/icons'
import { Button, Checkbox, ConfigProvider, Form, Input, Modal, Select, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ModalOkSvg } from '../../../assets/svg/ModalOkSvg'
import { useAppSelector } from '../../../store'
import {
	useAcceptCreateVacancyRequestMutation,
	useAlterCreateVacancyRequestMutation,
	useGetAllDocumentDefinitionsQuery,
	useGetCategoriesQuery,
	useGetDirectionsQuery,
	useGetSubdivisionsQuery,
	useGetVacancyRequestViewQuery,
	useGetVacancyRequestsQuery,
	useLazyGetVacancyRequestViewQuery
} from '../../../store/api/serviceApi'
import { useAlert } from '../../../utils/Alert/AlertMessage'
import ArrowIcon from '../jobSeeker/ArrowIcon'

export const VacancyRequestCreateView = () => {
	const currentUrl = window.location.pathname

	// Ищем id из URL
	const match = currentUrl.match(/\/create\/(\d+)$/)

	let id_from_url: string
	let page_id: number

	if (match) {
		id_from_url = match[1]
	} else {
		console.error('id miss')
	}
	page_id = Number(id_from_url)

	const requestId = page_id

	const { data: requestView } = useGetVacancyRequestViewQuery(page_id)

	console.log(requestView)

	const navigate = useNavigate()
	const [getVacancyRequestView, queryStatus] = useLazyGetVacancyRequestViewQuery()
	const [acceptRequest, { isLoading: acceptRequestLoading }] = useAcceptCreateVacancyRequestMutation()
	const [alterRequest, { isLoading: alterRequestLoading }] = useAlterCreateVacancyRequestMutation()

	const { openAlert } = useAlert()

	const { refetch } = useGetVacancyRequestsQuery('все')

	const { data: categories = [] } = useGetCategoriesQuery()
	const [categoryTitle, setCategoryTitle] = useState<string>('')
	const { data: directions = [] } = useGetDirectionsQuery(categoryTitle)
	const { data: subdivisions = [] } = useGetSubdivisionsQuery(categoryTitle)
	const { data: definitions = [], isLoading: loading, isFetching: fetching } = useGetAllDocumentDefinitionsQuery()

	const [isEdit, setIsEdit] = useState<boolean>(false)
	const [isEdited, setIsEdited] = useState<boolean>(false)

	const [post, setPost] = useState<string | undefined>(undefined)
	const [experience, setExperience] = useState<string | undefined>(undefined)
	const [employment, setEmployment] = useState<string | undefined>(undefined)
	const [salary, setSalary] = useState<string | undefined>(undefined)
	const [category, setCategory] = useState<string | undefined>(undefined)
	const [direction, setDirection] = useState<string>('')
	const [subdivision, setSubdivision] = useState<string>('')

	const [responsibilities, setResponsibilities] = useState<string | undefined>(undefined)

	const [skills, setSkills] = useState<string | undefined>(undefined)

	const [conditions, setConditions] = useState<string | undefined>(undefined)

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	const [secondOption, setSecondOption] = useState<string | null>(null)

	const [isResultModalOpen, setIsResultModalOpen] = useState<boolean>(false)
	const [resultModalText, setResultModalText] = useState<string>('')

	useEffect(() => {
		getVacancyRequestView(page_id)
			.unwrap()
			.then(req => {
				setPost(req.newData.post)
				setExperience(req.newData.experience)
				setEmployment(req.newData.employment)
				setSalary(req.newData.salary)
				setResponsibilities(
					req.newData.responsibilities
						.replace(/<strong>/g, '')
						.replace(/<\/strong>/g, '')
						.replace(/<u>/g, '')
						.replace(/<\/u>/g, '')
						.replace(/<i>/g, '')
						.replace(/<\/i>/g, '')
						.replace(/<em>/g, '')
						.replace(/<\/em'>/g, '')
						.replace(/<ul>/g, '')
						.replace(/<\/ul>/g, '')
						.replace(/<li>/g, '')
						.replace(/<\/li>/g, '')
				)
				setConditions(
					req.newData.conditions
						.replace(/<strong>/g, '')
						.replace(/<\/strong>/g, '')
						.replace(/<u>/g, '')
						.replace(/<\/u>/g, '')
						.replace(/<i>/g, '')
						.replace(/<\/i>/g, '')
						.replace(/<em>/g, '')
						.replace(/<\/em'>/g, '')
						.replace(/<ul>/g, '')
						.replace(/<\/ul>/g, '')
						.replace(/<li>/g, '')
						.replace(/<\/li>/g, '')
				)
				setSkills(
					req.newData.skills
						.replace(/<strong>/g, '')
						.replace(/<\/strong>/g, '')
						.replace(/<u>/g, '')
						.replace(/<\/u>/g, '')
						.replace(/<i>/g, '')
						.replace(/<\/i>/g, '')
						.replace(/<em>/g, '')
						.replace(/<\/em'>/g, '')
						.replace(/<ul>/g, '')
						.replace(/<\/ul>/g, '')
						.replace(/<li>/g, '')
						.replace(/<\/li>/g, '')
				)
			})
	}, [])

	if (queryStatus.isLoading || queryStatus.isFetching) {
		return (
			<>
				<div className="w-full h-full flex items-center">
					<div className="text-center ml-auto mr-auto">
						<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}></Spin>
						<p className="font-content-font font-normal text-black text-[18px]/[18px]">Идёт загрузка...</p>
					</div>
				</div>
			</>
		)
	}

	return (
		<>
			<ConfigProvider
				theme={{
					token: {
						boxShadow: '0 0 19px 0 rgba(212, 227, 241, 0.6)'
					}
				}}
			>
				<Modal
					bodyStyle={{
						padding: '26px'
					}}
					width={407}
					className="pr-[52px] pl-[52px] pb-[52px]"
					open={isResultModalOpen}
					title={null}
					footer={null}
					centered
					onCancel={() => {
						navigate(-1)
					}}
				>
					<div className="flex flex-col w-full">
						<div className="w-full flex justify-center">
							<ModalOkSvg />
						</div>
						<p className="text-center font-content-font text-black text-[16px]/[20px] font-normal mt-[22px]">
							{resultModalText}
						</p>
						<Button
							className="rounded-[40px] w-full !py-[13px] mt-[40px]"
							type="primary"
							onClick={() => {
								setIsResultModalOpen(false)
								navigate('/services/personnelaccounting/vacancyrequests')
							}}
						>
							Ок
						</Button>
					</div>
				</Modal>
			</ConfigProvider>
			<Modal
				centered
				open={isModalOpen}
				bodyStyle={{
					padding: '26px'
				}}
				className="pr-[52px] pl-[52px] pb-[52px] mt-[100px]"
				footer={null}
				title={null}
				width={622}
				onCancel={() => {
					setIsModalOpen(false)
				}}
			>
				<Form
					layout="vertical"
					initialValues={{
						formDocs: definitions.map(def => {
							if (def.required) {
								return def.id
							}
						})
					}}
					requiredMark={false}
					onFinish={async values => {
						console.log(values.formDocs)
						try {
							if (isEdited) {
								await alterRequest({
									post: post as string,
									experience: experience as string,
									salary: salary as string,
									employment: employment as string,
									responsibilities: responsibilities as string,
									skills: skills as string,
									conditions: conditions as string,
									vacancyRequestId: requestId
								}).unwrap()

								await acceptRequest({
									data: {
										category: categoryTitle,
										direction: direction,
										subdivision: subdivision,
										emplDocDefIds: values.formDocs
									},
									requestId: requestId
								}).unwrap()
							} else {
								await acceptRequest({
									data: {
										category: categoryTitle,
										direction: direction,
										subdivision: subdivision,
										emplDocDefIds: [
											...values.formDocs,
											definitions.find(def => def.employmentStageType === 'SIXTH')?.id
										]
									},
									requestId: requestId
								}).unwrap()
							}

							refetch()
							setIsModalOpen(false)
							setResultModalText('Вакансия успешно опубликована')
							setIsResultModalOpen(true)
						} catch (error: any) {
							console.log(error)
							openAlert({ type: 'error', text: 'Извините, что-то пошло не так...' })
						}
					}}
				>
					<p className="font-content-font font-bold text-[18px]/[21.6px] text-black opacity-80 mb-[40px]">
						Выберите необходимые документы для трудоустройства
					</p>
					<Form.Item
						name={'category'}
						label={
							<label className="text-black text-[18px]/[18px] font-content-font font-normal opacity-80">
								Категория сотрудников
							</label>
						}
						rules={[{ required: true, message: 'Не указана категория' }]}
					>
						<Select
							className="mt-[16px]"
							options={categories.map(category => ({
								value: category.title,
								label: category.title
							}))}
							onChange={(value: string) => {
								setCategoryTitle(value)
								setSecondOption(prev => null)
								console.log('Test?')
							}}
							placeholder="Выбрать"
						/>
					</Form.Item>
					<Form.Item
						label={
							<label className="text-black text-[18px]/[18px] font-content-font font-normal opacity-80">
								{categories.find(cat => cat.title === categoryTitle)?.direction ? 'Профобласть' : 'Подразделение'}
							</label>
						}
						rules={[{ required: true, message: 'Не указана подкатегория' }]}
					>
						<Select
							placeholder="Выбрать"
							options={
								categories.find(cat => cat.title === categoryTitle)?.direction
									? directions.map(dir => ({
											value: dir.title,
											label: dir.title
									  }))
									: subdivisions.map(sub => ({
											value: sub.title,
											label: sub.title
									  }))
							}
							onChange={value => {
								setSecondOption(value)
								categories.find(cat => cat.title === categoryTitle)?.direction
									? setDirection(value)
									: setSubdivision(value)
							}}
							value={secondOption}
						></Select>
					</Form.Item>
					<Form.Item name={'formDocs'} valuePropName="checked">
						<Checkbox.Group
							name="docs"
							defaultValue={definitions.map(def => {
								if (def.required) {
									return def.id
								}
							})}
							className="flex flex-col gap-[8px]"
						>
							<p className="font-content-font text-black font-bold text-[18px]/[21.6px] opacity-80 mb-[16px]">
								1 этап. Прикрепление документов
							</p>
							{definitions.map(def =>
								def.employmentStageType === 'SECOND' ? (
									<Checkbox
										value={def.id}
										disabled={def.required}
										className="font-content-font text-black font-normal text-[16px]/[19.2px]"
									>
										{def.name}
									</Checkbox>
								) : (
									<></>
								)
							)}
							<p className="font-content-font text-black font-bold text-[18px]/[21.6px] opacity-80 mb-[16px] mt-[24px]">
								2 этап. Медицинский осмотр
							</p>
							{definitions.map(def =>
								def.employmentStageType === 'FOURTH' ? (
									<Checkbox
										value={def.id}
										disabled={def.required}
										className="font-content-font text-black font-normal text-[16px]/[19.2px]"
									>
										{def.name}
									</Checkbox>
								) : (
									<></>
								)
							)}
						</Checkbox.Group>
					</Form.Item>
					<Form.Item>
						<div style={{ textAlign: 'right', marginTop: 20 }}>
							<Button
								type="primary"
								className="rounded-[54.5px] w-[121px] ml-auto"
								htmlType="submit"
								disabled={categoryTitle === '' || secondOption === null}
								loading={acceptRequestLoading || alterRequestLoading}
							>
								Опубликовать
							</Button>
						</div>
					</Form.Item>
				</Form>
			</Modal>
			{isEdit ? (
				<Form
					initialValues={{
						post: post,
						salary: salary,
						responsibilities: responsibilities,
						skills: skills,
						conditions: conditions,
						experience: experience,
						employment: employment
					}}
					layout="vertical"
					requiredMark={false}
					className="w-[50%] mt-[112px] ml-[52px]"
					onFinish={values => {
						setPost(prev => values.post)
						setExperience(prev => values.experience)
						setEmployment(prev => values.employment)
						setSalary(prev => values.salary)
						setResponsibilities(prev => values.responsibilities)
						setSkills(prev => values.skills)
						setConditions(prev => values.conditions)
						setIsEdited(true)
						setIsEdit(false)
					}}
				>
					<div className="flex mb-[40px]">
						<button
							onClick={() => {
								setIsEdit(false)
							}}
							className="bg-inherit border-none cursor-pointer"
						>
							<ArrowIcon />
						</button>
						<p className="ml-[40px] font-content-font font-normal text-black text-[28px]/[33.6px]">
							{post !== undefined ? '«' + post + '»' : ''}
						</p>
					</div>
					<Form.Item
						name={'post'}
						label={
							<label className="text-black text-[18px]/[18px] font-content-font font-normal opacity-80">
								Должность
							</label>
						}
						rules={[
							{ required: true, message: 'Не указана должность' },
							{ max: 500, message: 'Количество символов было превышено'}
						]}
					>
						<Input placeholder="Ввести название"></Input>
					</Form.Item>
					<div className="flex gap-[20px] w-full">
						<Form.Item
							name={'experience'}
							label={
								<label className="text-black text-[18px]/[18px] font-content-font font-normal opacity-80">
									Требуемый опыт работы
								</label>
							}
							rules={[{ required: true, message: 'Не указана опыт' }]}
						>
							<Select
								placeholder="Выбрать"
								options={[
									{ value: '0', label: '0' },
									{ value: '1', label: '1' },
									{ value: '2', label: '2' }
								]}
							></Select>
						</Form.Item>
						<Form.Item
							name={'employment'}
							label={
								<label className="text-black text-[18px]/[18px] font-content-font font-normal opacity-80">
									Тип занятости
								</label>
							}
							rules={[{ required: true, message: 'Не указан тип' }]}
						>
							<Select
								placeholder="Выбрать"
								options={[
									{ value: 'Полный день', label: 'Полный день' },
									{ value: 'Пол ставки', label: 'Пол ставки' },
									{ value: 'Четверть ставки', label: 'Четверть ставки' }
								]}
							></Select>
						</Form.Item>
						<Form.Item
							name={'salary'}
							label={
								<label className="text-black text-[18px]/[18px] font-content-font font-normal opacity-80">
									Заработная плата
								</label>
							}
							rules={[
								{ required: true, message: 'Не указана зарплата' },
								{ max: 70, message: 'Количество символов было превышено'}
							]}
						>
							<Input placeholder="Ввести"></Input>
						</Form.Item>
					</div>
					<Form.Item
						name={'responsibilities'}
						label={
							<label className="text-black text-[18px]/[18px] font-content-font font-normal opacity-80">Задачи</label>
						}
						rules={[
							{ required: true, message: 'Не указаны задачи' },
							{ max: 5000, message: 'Количество символов было превышено'}
						]}
					>
						<Input.TextArea autoSize className="!h-[107px]" placeholder="Ввести текст..."></Input.TextArea>
					</Form.Item>
					<Form.Item
						name={'skills'}
						label={
							<label className="text-black text-[18px]/[18px] font-content-font font-normal opacity-80">
								Требования
							</label>
						}
						rules={[
							{ required: true, message: 'Не указаны требования' },
							{ max: 5000, message: 'Количество символов было превышено'}
						]}
					>
						<Input.TextArea autoSize className="!h-[107px]" placeholder="Ввести текст..."></Input.TextArea>
					</Form.Item>
					<Form.Item
						name={'conditions'}
						label={
							<label className="text-black text-[18px]/[18px] font-content-font font-normal opacity-80">Условия</label>
						}
						rules={[
							{ required: true, message: 'Не указаны условия' },
							{ max: 5000, message: 'Количество символов было превышено'}
						]}
					>
						<Input.TextArea autoSize className="!h-[107px]" placeholder="Ввести текст..."></Input.TextArea>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" loading={acceptRequestLoading || alterRequestLoading}>
							Сохранить
						</Button>
					</Form.Item>
				</Form>
			) : (
				<div id="wrapper" className="pl-[54px] pr-[54px] pt-[120px] pb-[52px] w-full">
					<div className="flex">
						<button
							onClick={() => {
								isEdit ? setIsEdit(false) : navigate('/services/personnelaccounting/vacancyrequests')
							}}
							className="bg-inherit border-none cursor-pointer"
						>
							<ArrowIcon />
						</button>
						<p className="ml-[40px] font-content-font font-normal text-black text-[28px]/[33.6px]">
							{post !== undefined ? '«' + post + '»' : ''}
						</p>
					</div>
					<div className="w-[50%] mt-[52px] flex flex-col gap-[40px]">
						<div className="flex gap-[60px]">
							<div className="flex flex-col gap-[16px]">
								<p className="font-content-font font-bold text-black text-[18px]/[21px]">Требуемый опыт работы:</p>
								<p className="font-content-font font-normal text-black text-[18px]/[21px]">
									{experience !== undefined ? experience : ''}
								</p>
							</div>
							<div className="flex flex-col gap-[16px]">
								<p className="font-content-font font-bold text-black text-[18px]/[21px]">Тип занятости:</p>
								<p className="font-content-font font-normal text-black text-[18px]/[21px]">
									{employment !== undefined ? employment : ''}
								</p>
							</div>
							<div className="flex flex-col gap-[16px]">
								<p className="font-content-font font-bold text-black text-[18px]/[21px]">Заработная плата:</p>
								<p className="font-content-font font-normal text-black text-[18px]/[21px]">
									{salary !== undefined ? salary : ''}
								</p>
							</div>
						</div>
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">Задачи:</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">
								{responsibilities !== undefined ? responsibilities : ''}
							</p>
						</div>
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">Требования:</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">
								{skills !== undefined ? skills : ''}
							</p>
						</div>
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">Условия:</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">
								{conditions !== undefined ? conditions : ''}
							</p>
						</div>
						<div className="flex gap-[20px]">
							<Button
								onClick={() => {
									setIsEdit(true)
								}}
								className="w-[151px] font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[24px] border-black bg-inherit"
							>
								Редактировать
							</Button>
							<Button
								onClick={() => {
									setIsModalOpen(true)
								}}
								type="primary"
								className="rounded-[54.5px] w-[121px]"
							>
								Опубликовать
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
