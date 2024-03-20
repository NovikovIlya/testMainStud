import { Button } from 'antd'

import { AttachIcon } from '../jobSeeker/AttachIcon'

export const ChatPage = () => {
	return (
		<>
			<div className="w-full h-full flex flex-col justify-between pt-[60px] pr-[85px] pl-[40px]">
				<div className="self-center font-content-font font-normal text-black text-[14px]/[16.8px] opacity-60">
					<p>31 сентября</p>
				</div>
				<div className="self-end w-[50%] rounded-[16px] rounded-br-none bg-[#4F6AFB1A] bg-opacity-10 p-[20px] flex flex-col font-content-font font-normal text-black text-[16px]/[19.2px]">
					<p>
						Здравствуйте! Меня заинтересовала ваша вакансия. Я очень хочу у вас
						работать. Мой опыт очень подходит вам. Спасибо за внимание!
					</p>
					<p className="ml-auto font-content-font font-normal text-black text-[12px]/[14.4px] opacity-[52%]">
						14:01
					</p>
				</div>
				<div className="self-start w-[50%] rounded-[16px] rounded-bl-none bg-white p-[20px] flex flex-col font-content-font font-normal text-black text-[16px]/[19.2px]">
					<p className="opacity-50">Анастасия, HR-менджер</p>
					<p>Здравствуйте! мы рассмотрим ваше резюме в течение 3 дней.</p>
					<p className="ml-auto font-content-font font-normal text-black text-[12px]/[14.4px] opacity-[52%]">
						14:01
					</p>
				</div>
				<div className="self-start w-[50%] rounded-[16px] rounded-bl-none bg-white p-[20px] flex flex-col font-content-font font-normal text-black text-[16px]/[19.2px]">
					<p>
						<strong>Приглашение</strong>
						<br />
						Мы приглашаем вас на собеседование обсудить условия работы и уровень
						заработной платы. Если вы согласны позвоните пожалуйста в рабочее
						время по указанному ниже телефону. Спасибо! Анастасия тел: +7965 595
						66 66
					</p>
					<p className="ml-auto font-content-font font-normal text-black text-[12px]/[14.4px] opacity-[52%]">
						14:01
					</p>
				</div>
				<div className=" h-[80px] w-auto bg-white flex py-[24px] pl-[40px] pr-[85px] -ml-[40px] -mr-[85px]">
					<textarea
						className="w-full h-full font-content-font font-normal text-black text-[16px]/[16px] placeholder:opacity-50 resize-none border-none focus:outline-none pt-[8px]"
						placeholder="Ввести сообщение"
					></textarea>
					<div className="ml-auto flex gap-[8px]">
						<Button type="text" icon={<AttachIcon />} />
						<Button
							className="rounded-[54.5px] h-[32px] px-[24px]"
							type="primary"
							htmlType="submit"
						>
							Отправить
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}
