import { Typography } from 'antd'
import React from 'react'

const { Title, Text } = Typography

export const TitleFaq = () => {
	return (
		<div className="shadow-md pb-[25px] rounded-b">
			<Title style={{ marginBottom: 5, marginTop: 20 }} level={3}>
				Центр поддержки
			</Title>
			<Text className="text-black opacity-50 ">
				Работаем с Пн - Пт, 8:00 - 18:00
			</Text>
			<div className="flex justify-center gap-5 mt-[15px]">
				<svg
					className="cursor-pointer"
					width="58"
					height="57"
					viewBox="0 0 58 57"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle cx="28.9819" cy="28.653" r="28.1808" fill="#004EC2" />
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M17.1775 24.4035C17.1775 22.343 17.7623 21.064 18.6033 20.2861C19.4607 19.4929 20.7706 19.0474 22.5581 19.0474H35.6677C37.4552 19.0474 38.7651 19.4929 39.6226 20.2861C40.4635 21.064 41.0483 22.343 41.0483 24.4035V33.546C41.0483 35.6065 40.4635 36.8855 39.6226 37.6635C38.7651 38.4567 37.4552 38.9022 35.6677 38.9022H22.5581C20.7706 38.9022 19.4607 38.4567 18.6033 37.6635C17.7623 36.8855 17.1775 35.6065 17.1775 33.546V24.4035ZM22.5581 16.699C20.4127 16.699 18.4453 17.233 17.0085 18.5622C15.5552 19.9066 14.8291 21.8928 14.8291 24.4035V33.546C14.8291 36.0567 15.5552 38.0429 17.0085 39.3873C18.4453 40.7165 20.4127 41.2506 22.5581 41.2506H35.6677C37.8131 41.2506 39.7806 40.7165 41.2173 39.3873C42.6706 38.0429 43.3967 36.0567 43.3967 33.546V24.4035C43.3967 21.8928 42.6706 19.9066 41.2173 18.5622C39.7806 17.233 37.8131 16.699 35.6677 16.699H22.5581ZM36.3989 25.9759C36.9064 25.5721 36.9904 24.8334 36.5866 24.326C36.1828 23.8185 35.4441 23.7345 34.9367 24.1383L30.8348 27.4023L30.834 27.4029C29.9114 28.1339 28.3022 28.1341 27.3793 27.4033L27.3781 27.4023L23.2907 24.1394C22.7839 23.7348 22.0451 23.8177 21.6405 24.3245C21.2359 24.8313 21.3188 25.5702 21.8256 25.9747L25.9158 29.2399L25.9187 29.2422C27.6964 30.6522 30.5165 30.6522 32.2942 29.2422L32.2956 29.2411L36.3989 25.9759Z"
						fill="white"
					/>
				</svg>
				<svg
					className="cursor-pointer"
					width="57"
					height="57"
					viewBox="0 0 57 57"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle cx="28.3435" cy="28.653" r="28.1808" fill="#004EC2" />
					<path
						d="M40.2531 35.714C40.2531 36.1156 40.1634 36.5283 39.9728 36.9299C39.7821 37.3315 39.5354 37.7107 39.2102 38.0677C38.6608 38.67 38.0553 39.1051 37.3712 39.384C36.6984 39.6628 35.9695 39.8078 35.1846 39.8078C34.0408 39.8078 32.8185 39.5401 31.529 38.9935C30.2394 38.4469 28.9499 37.7107 27.6716 36.7849C26.3687 35.8368 25.1392 34.7928 23.9935 33.6615C22.8596 32.5259 21.8137 31.3066 20.865 30.0138C19.9455 28.7422 19.2054 27.4705 18.6671 26.21C18.1289 24.9384 17.8597 23.7225 17.8597 22.5624C17.8597 21.8038 17.9943 21.0788 18.2634 20.4095C18.5326 19.729 18.9587 19.1044 19.553 18.5466C20.2706 17.8438 21.0556 17.498 21.8854 17.498C22.1994 17.498 22.5133 17.565 22.7937 17.6988C23.0852 17.8327 23.3431 18.0335 23.545 18.3235L26.1465 21.9712C26.3484 22.25 26.4941 22.5066 26.5951 22.752C26.696 22.9863 26.752 23.2205 26.752 23.4325C26.752 23.7002 26.6736 23.9679 26.5166 24.2245C26.3708 24.481 26.1577 24.7487 25.8886 25.0164L25.0364 25.8977C24.913 26.0204 24.857 26.1654 24.857 26.3439C24.857 26.4331 24.8682 26.5112 24.8906 26.6004C24.9242 26.6897 24.9579 26.7566 24.9803 26.8235C25.1822 27.1917 25.5298 27.6713 26.0232 28.2514C26.5278 28.8314 27.066 29.4226 27.6491 30.0138C28.2547 30.6051 28.8378 31.1516 29.4321 31.6536C30.0152 32.1444 30.4974 32.4791 30.8786 32.6799C30.9347 32.7022 31.002 32.7356 31.0805 32.7691C31.1702 32.8026 31.2599 32.8137 31.3608 32.8137C31.5514 32.8137 31.6972 32.7468 31.8205 32.6241L32.6728 31.7875C32.9531 31.5086 33.2222 31.2967 33.4801 31.1628C33.7381 31.0066 33.996 30.9285 34.2763 30.9285C34.4894 30.9285 34.7136 30.9732 34.9603 31.0736C35.207 31.174 35.4649 31.319 35.7453 31.5086L39.4569 34.13C39.7485 34.3308 39.9503 34.565 40.0737 34.8439C40.1858 35.1228 40.2531 35.4017 40.2531 35.714Z"
						stroke="white"
						strokeWidth="2.3484"
						strokeMiterlimit="10"
					/>
				</svg>
			</div>
		</div>
	)
}
