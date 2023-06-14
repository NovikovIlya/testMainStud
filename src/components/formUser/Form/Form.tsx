import { Layout } from '../Layout'

import { Buttons } from './Buttons/Buttons'
import { Inputs } from './Inputs/Inputs'
import { Switcher } from './Radio/Switcher'

export const FormModal = () => {
	return (
		<Layout
			descriptions="Это необходимо для полного доступа на платформе, который включает в
						себя возможность записи на курсы, мероприятия и многое другое"
			title="Заполните короткую форму"
		>
			<h3 className="self-start my-7">Обо мне</h3>
			<Switcher />
			<Inputs />
			<Buttons />
		</Layout>
	)
}
