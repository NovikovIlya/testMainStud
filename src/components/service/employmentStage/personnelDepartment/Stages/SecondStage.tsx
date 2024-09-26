import { Button, ConfigProvider, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { DocumentElem } from './DocumentElem'

export const SecondStage = () => {

	const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false)

	const { TextArea } = Input

	return (
		<>
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
			</>
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
		</>
	)
}