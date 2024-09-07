import { Button, ConfigProvider, Input, Modal } from 'antd'
import { GreenCheck } from "../../../../assets/svg/GreenCheck"
import { DocumentIcon } from "../../../../assets/svg/DocumentIcon"
import React, { useState } from 'react'
import { additionalInfo } from '../../../../store/reducers/FormReducers/WorkReducer'

export const EmploymentStageInfo = () => {

	const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false)
	const { TextArea } = Input
	interface DocumentElemProps {
		name: string
		weight: string
	}

	const DocumentElem = ( props: DocumentElemProps) => {
		return (
			<div className="flex flex-row w-[388px] justify-between cursor-pointer">
				<div className='flex flex-row items-center'>
					<DocumentIcon></DocumentIcon>
					<span className="underline font-normal ml-[12px] underline-offset-2 text-[16px]/[19.2px] ">{props.name}</span>
				</div>
				<span className="font-normal opacity-[70%] text-[16px]/[19.2px]">{props.weight}</span>
			</div>
		)
	}

	const SecondStage = () => {
		return (
			<div className="flex flex-col w-full bg-[#FFFFFF]">
				<div className="flex flex-row pl-[20px] pt-[27px] items-center justify-between pr-[40px]">
					<div className="flex flex-row">
						<h3 className="font-bold text-[16px]/[19.2px]">2 ЭТАП</h3>
						<h3 className="font-normal ml-[37px] text-[18px]/[21.6px]">«Прикрепление документов»</h3>
					</div>
					<div className="flex flex-row gap-[12px]">
						<Button
							className="text-[#FFFFFF] py-[8px] px-[24px] border-none rounded-[54.5px] text-[16px] font-normal"
							type="primary"
							onClick={() => {
								alert('Эта функция пока недоступна')
							}}>
							Принять
						</Button>
						<Button
							type="default"
							className="min-w-[144px] py-[8px] px-[24px] text-[#333333] border-[#333333] border-[1px] rounded-[54.5px] text-[16px]"
							onClick={() => {
								setIsRevisionModalOpen(true)
							}}
						>На доработку</Button>
					</div>
				</div>
				<div className='flex flex-row py-[20px] px-[20px] gap-[40px]'>
					<div className="flex flex-col gap-[12px] ">
						<DocumentElem name={'Скан паспорта'} weight={'123 кб'}></DocumentElem>
						<DocumentElem name={'Трудовая книжка'} weight={'123 кб'}></DocumentElem>
						<DocumentElem name={'СНИЛС'} weight={'123 кб'}></DocumentElem>
						<DocumentElem name={'ИНН'} weight={'123 кб'}></DocumentElem>
					</div>
					<div className="flex flex-col gap-[12px]">
						<DocumentElem name={'Скан паспорта'} weight={'123 кб'}></DocumentElem>
						<DocumentElem name={'Трудовая книжка'} weight={'123 кб'}></DocumentElem>
						<DocumentElem name={'СНИЛС'} weight={'123 кб'}></DocumentElem>
						<DocumentElem name={'ИНН'} weight={'123 кб'}></DocumentElem>
					</div>
				</div>
			</div>
		)
	}
	const ThirdStage = () => {
		return (
			<div className="w-full py-[20px] bg-[#FFFFFF]">
				<div className="flex flex-row justify-between pr-[200px]">
					<div className="flex flex-row pl-[20px] items-center">
						<h3 className="font-bold text-[16px]/[19.2px]">3 ЭТАП</h3>
						<h3 className="font-normal ml-[37px] text-[18px]/[21.6px]">«Трудовые условия»</h3>
					</div>
					<div className="flex flex-row items-center gap-[12px]">
						<div className="w-[11px] h-[11px] rounded-[100%] bg-[#FFD600]"></div>
						<span>Доработка</span>
					</div>
				</div>
				<div className="flex flex-row pl-[20px] pt-[20px] gap-[12px]">
					<GreenCheck></GreenCheck>
					<span className="text-[16px]/[19.2px] font-normal">Соискатель ознакомлен с трудовыми условиями</span>
				</div>
				<div className="flex flex-col pl-[20px] gap-[4px] mt-[20px]">
					<span className="text-[14px]/[16.8px] text-black opacity-[40%] font-normal">Комментарий на доработку: </span>
					<span className="text-[14px]/[16.8px] text-black opacity-[60%] font-normal">Ваши документы вообще не подходят, отправьте пожалуйста заново.<button
						className="ml-[4px] border-none cursor-pointer bg-white text-[14px]/[16.8px] font-bold text-black opacity-[100%]">Развернуть</button></span>
				</div>
			</div>
		)
	}
	const ForthStage = () => {
		return (
			<div className="flex flex-col w-full bg-[#FFFFFF]">
				<div className="flex flex-row pl-[20px] pt-[27px] items-center justify-between pr-[40px]">
					<div className="flex flex-row">
						<h3 className="font-bold text-[16px]/[19.2px]">4 ЭТАП</h3>
						<h3 className="font-normal ml-[37px] text-[18px]/[21.6px] ">«Медицинский осмотр»</h3>
					</div>
					<div className="flex flex-row gap-[12px]">
						<Button
							className="text-[#FFFFFF] py-[8px] px-[24px] border-none rounded-[54.5px] text-[16px] font-normal"
							type="primary"
							onClick={() => {
								alert('Эта функция пока недоступна')
							}}>
							Принять
						</Button>
						<Button
							type="default"
							className="min-w-[144px] py-[8px] px-[24px] text-[#333333] border-[#333333] border-[1px] rounded-[54.5px] text-[16px]"
							onClick={() => {
								setIsRevisionModalOpen(true)
							}}>
							На доработку
						</Button>
					</div>
				</div>
				<div className="flex flex-col gap-[12px] pl-[20px] py-[20px]">
					<DocumentElem name={'Справка с медицинского осмотра'} weight={'123 кб'}></DocumentElem>
					<DocumentElem name={'Психиатрическое заключение'} weight={'123 кб'}></DocumentElem>
				</div>
			</div>
		)
	}
	const FifthStage = () => {
		return (
			<div className="w-full py-[20px] gap-[20px] bg-[#FFFFFF]">
				<div className="flex flex-row pl-[20px] items-center">
					<h3 className="font-bold text-[16px]/[19.2px]">5 ЭТАП</h3>
					<h3 className="font-normal ml-[37px] text-[18px]/[21.6px]">«Инструктаж»</h3>
				</div>
				<div className="flex flex-row pl-[20px] pt-[20px] gap-[12px]">
					<GreenCheck></GreenCheck>
					<span className="text-[16px]/[19.2px] font-normal">Соискатель прошел инструктаж</span>
				</div>
			</div>
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
					bodyStyle={{ padding: 52 }}
					centered
					open={isRevisionModalOpen}
					onCancel={() => {
						setIsRevisionModalOpen(false)
					}}
					title={null}
					footer={null}
					width={620}
				>
					<p className="font-content-font font-normal mb-[18px] flex items-start text-black opacity-[80%] text-[16px]/[20px]">
						Комментарий
					</p>
					<TextArea
						autoSize={{ minRows: 4, maxRows: 8 }}
						style={{ height: 107, resize: 'none', width: 520, }}
					/>
					<div className="mt-[40px] flex gap-[12px] w-full justify-end ">
						<Button
							className="rounded-[54.5px] py-[12px] px-[24px]  text-[16px]"
							type="primary"
							onClick={() => {
								{/*
								setIsRevisionModalOpen(false)
								*/}
								alert('Эта функция пока недоступна')
							}}
						>
							Отправить
						</Button>
					</div>
				</Modal>
			</ConfigProvider>
			<div className="w-full flex flex-col px-[53px] mt-[140px]">
				<h1 className="font-normal text-[28px]/[28px]">Алексеев Дмитрий Иванович</h1>
				<Button
					type="default"
					className="max-w-[102px] mt-[20px] py-[8px] px-[24px] text-[#333333] border-[#333333] border-[1px] rounded-[54.5px] text-[16px]"
					onClick={() => {
						alert('Эта функция пока недоступна')
					}}
				>Резюме</Button>
				<h3 className="mt-[53px] text-[18px] font-normal">Вакансия: <span className="font-bold">Специалист отдела развития сотрудничества</span>
				</h3>
				<div className="mt-[40px] mb-[100px] gap-[12px] flex flex-col ">
					<SecondStage></SecondStage>
					<ThirdStage></ThirdStage>
					<ForthStage></ForthStage>
					<FifthStage></FifthStage>
				</div>
			</div>
		</>
	)
}