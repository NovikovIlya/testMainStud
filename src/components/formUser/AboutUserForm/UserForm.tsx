import { useState } from 'react'

import { IinfoForm } from '../../../api/types'
import { ImagesLayout } from '../ImagesLayout'

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
			<div className="w-full flex justify-center ">
				<div className="container max-w-2xl flex flex-col items-center justify-center  px-5">
					<h2 className="text-center font-bold text-2xl">
						Заполните короткую форму
					</h2>

					<p className="mt-5 text-center text-sm font-bold px-7">
						Это необходимо для полного доступа на платформе, который включает в
						себя возможность записи на курсы, мероприятия и многое другое
					</p>
					<h3 className="self-start my-7 text-xl">Обо мне</h3>
					<Switcher changeForm={changeForm} formData={form} />
					<Inputs changeForm={changeForm} formData={form} />
					<Buttons formData={form} />
				</div>
			</div>
		</ImagesLayout>
	)
}
