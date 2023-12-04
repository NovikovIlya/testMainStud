import { Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'
import React, { useState } from 'react'

export const VisuallyImpaired = () => {
	const [value, setValue] = useState(1)

	const onChange = (e: RadioChangeEvent) => {
		console.log('radio checked', e.target.value)
		setValue(e.target.value)
	}
	return (
		<section className="max-w-2xl">
			<h1 className="text-black text-2xl font-bold leading-normal">
				Версия для слабовидящих
			</h1>
			<section className="mt-10">
				<h1 className="text-black text-sm font-bold">Выберите режим</h1>
				<Radio.Group
					onChange={onChange}
					value={value}
					defaultValue={1}
					className="flex mt-7 gap-2 flex-col"
				>
					<Radio value={1}>Стандартный</Radio>
					<Radio value={2}>Версия для слабовидящих</Radio>
				</Radio.Group>
			</section>
		</section>
	)
}
