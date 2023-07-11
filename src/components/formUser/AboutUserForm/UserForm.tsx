import { useState } from 'react'

import { ImagesLayout } from '../ImagesLayout'

import { Buttons } from './Buttons/Buttons'
import { Inputs } from './Inputs/Inputs'
import { Switcher } from './Radio/Switcher'

export const FormModal = () => {
	const [error, setError] = useState(false)

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
					<Switcher />
					<Inputs error={error} setError={setError} />
					<Buttons setError={setError} error={error} />
				</div>
			</div>
		</ImagesLayout>
	)
}
