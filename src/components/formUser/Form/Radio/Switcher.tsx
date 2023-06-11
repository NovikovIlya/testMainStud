import { Form, Radio } from 'antd'

export const Switcher = () => {
	return (
		<div className="flex h-8 w-full">
			<Form.Item name="radio" initialValue={'Woman'}>
				<Radio.Group>
					<Radio value={'Woman'}>Женщина</Radio>
					<Radio value={'Men'}>Мужчина</Radio>
				</Radio.Group>
			</Form.Item>
		</div>
	)
}
