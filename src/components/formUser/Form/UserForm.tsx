import { useState } from 'react'

import { IinfoForm } from '../../../api/types'
import { ImagesLayout } from '../ImagesLayout'
import { Layout } from '../Layout'

import { Buttons } from './Buttons/Buttons'
import { Inputs } from './Inputs/Inputs'
import { Switcher } from './Radio/Switcher'

export const FormModal = () => {
	const [form, changeForm] = useState<IinfoForm>({
		infoForm: {
			name: '',
			surName: '',
			patronymic: null,
			birthDay: '',
			gender: '',
			phoneNumber: '',
			country: ''
		}
	})
	return (
		<ImagesLayout>
			<Layout
				descriptions="Это необходимо для полного доступа на платформе, который включает в
						себя возможность записи на курсы, мероприятия и многое другое"
				title="Заполните короткую форму"
			>
				<h3 className="self-start my-7">Обо мне</h3>
				<Switcher changeForm={changeForm} formData={form} />
				<Inputs changeForm={changeForm} formData={form} />
				<Buttons formData={form} />
			</Layout>
		</ImagesLayout>
	)
}
