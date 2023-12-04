import { Select } from 'antd'
import React from 'react'

export const Language = () => {
	return (
		<section className="max-w-2xl">
			<h1 className="text-black text-2xl font-bold leading-normal">Язык</h1>
			<Select
				showSearch
				className="w-full mt-7"
				defaultValue={'1'}
				defaultActiveFirstOption
				optionFilterProp="children"
				filterOption={(input, option) => (option?.label ?? '').includes(input)}
				filterSort={(optionA, optionB) =>
					(optionA?.label ?? '')
						.toLowerCase()
						.localeCompare((optionB?.label ?? '').toLowerCase())
				}
				options={[
					{
						value: '1',
						label: 'Русский'
					},
					{
						value: '2',
						label: 'English'
					},
					{
						value: '3',
						label: 'Español'
					},
					{
						value: '4',
						label: '中国人'
					}
				]}
			/>
		</section>
	)
}
