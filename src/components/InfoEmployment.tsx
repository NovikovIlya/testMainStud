import { Card } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'

const InfoStudent = ({ login = '123', password = '123' }) => {
	const { t } = useTranslation()

	return (
		<Card className="border-l-rose-500 mt-5 mb-14 rounded-3xl text-base shadow-md ">
			<div className="font-bold">Дорогие пользователи!</div>
			<div>
				<div>
					С радостью объявляем о тестовом запуске нашего нового проекта «Трудоустройство»! Это значимое событие, которое
					позволит нам улучшить качество наших сервисов и сделать их еще более полезными для вас.{' '}
				</div>
			</div>
			<div>
				Мы приглашаем вас активно участвовать в тестировании и делиться своими впечатлениями. Ваши замечания,
				предложения и сообщения об ошибках будут ценны для нас и помогут создать идеальный продукт.
			</div>
			<div>
				<div>
					Пожалуйста, направляйте ваши отзывы на электронную почту:{' '}
					<a target="_blank" href={`mailto:${'DmBTishkin@kpfu.ru'}`}>
						DmBTishkin@kpfu.ru.
					</a>
				</div>
			</div>
			<div>
				Благодарим вас за поддержку и сотрудничество! <br /> P.S. Обратите внимание, что представленные вакансии лишь
				тестовые и не являются действительными.
			</div>
		</Card>
	)
}

export default InfoStudent
