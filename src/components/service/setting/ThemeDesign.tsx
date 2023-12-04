import type { RadioChangeEvent } from 'antd'
import { Radio } from 'antd'
import React, { useState } from 'react'

export const ThemeDesign = () => {
	const [value, setValue] = useState(1)

	const onChange = (e: RadioChangeEvent) => {
		console.log('radio checked', e.target.value)
		setValue(e.target.value)
	}
	return (
		<section className="max-w-2xl">
			<h1 className="text-black text-2xl font-bold leading-normal">
				Тема оформления
			</h1>
			<section className="mt-10">
				<h1 className="text-black text-sm font-bold">
					Выбери на какой стороне ты
				</h1>
				<Radio.Group
					onChange={onChange}
					value={value}
					defaultValue={1}
					className="flex mt-7 gap-2 flex-col"
				>
					<Radio value={1}>Светлая</Radio>
					<Radio value={2}>Темная</Radio>
					<Radio value={3}>Системная</Radio>
				</Radio.Group>
			</section>
		</section>
	)
}
