import { ErrorAlertSvg } from '../assets/svg/ErrorAlertSvg'
import { GalochkaSvg } from '../assets/svg/GalochkaSvg'
import { InfoAlertIconSvg } from '../assets/svg/InfoAlertIconSvg'
import { KrestikSvg } from '../assets/svg/KrestikSvg'

export const AlertMessage = ( props: {type : 'info' | 'success' | 'error'} ) => {

	let alert_message_text : string = ''
	if (props.type === 'error') {
		alert_message_text = 'Что-то пошло не так. Повторите попытку позже'
	}
	if (props.type === 'success') {
		alert_message_text = 'Заявление успешно создано'
	}
	if (props.type === 'info') {
		alert_message_text = 'Продолжительность перенесенного отпуска должна совпадать с изначальной длительностью'
	}

	return (
		<div className='flex flex-row fixed right-[30px] top-[100px] shadow-sm max-w-[463px]'>
			<div className={`flex items-center justify-center\
				 ${props.type === 'error'
				? 'bg-[#FF5A5A]'
				: 'bg-[#FFFFFF]'
			}
				  ${props.type === 'success'
				? 'bg-[#61D689]'
				: 'bg-[#FFFFFF]'
			}
					${props.type === 'info'
				? 'bg-[#63ABFF]'
				: 'bg-[#FFFFFF]'
			}
				  w-[46px] h-[65px]`}>
				{((props.type === 'error') && (
					<ErrorAlertSvg></ErrorAlertSvg>
				))}
				{((props.type === 'success') && (
					<GalochkaSvg></GalochkaSvg>
				))}
				{((props.type === 'info') && (
					<InfoAlertIconSvg></InfoAlertIconSvg>
				))}
			</div>
			<div
				className='flex items-center justify-between pl-[29px] pr-[15px] w-[417px] bg-[#FFFFFF] border-0 rounded-none'>
				<span className="text-black text-[16px]/[20.7px]">{alert_message_text}</span>
				<button className="border-none bg-white cursor-pointer">
					<KrestikSvg></KrestikSvg>
				</button>
			</div>
		</div>
	)
}
