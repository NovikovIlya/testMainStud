import { Form, Radio, RadioChangeEvent } from 'antd'
import { FC } from 'react'

import styles from './Switcher.module.scss'

interface ISwitherProps {
	setValue: (value: number) => void
}

export const Switcher: FC<ISwitherProps> = ({ setValue }) => {
	const onChangeRadio = (e: RadioChangeEvent) => setValue(e.target.value)

	return (
		<Form.Item className={styles.main}>
			<Radio.Group
				onChange={onChangeRadio}
				defaultValue={0}
				size="large"
				className={styles.switcher}
				buttonStyle="solid"
			>
				<Radio.Button value={0}>По Email</Radio.Button>
				<Radio.Button value={1}>По номеру</Radio.Button>
			</Radio.Group>
		</Form.Item>
	)
}
