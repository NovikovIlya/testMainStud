import { Form, Radio, RadioChangeEvent } from 'antd';
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import styles from './Switcher.module.scss'

interface ISwitherProps {
	setValue: (value: number) => void
}

export const Switcher: FC<ISwitherProps> = ({ setValue }) => {
	const onChangeRadio = (e: RadioChangeEvent) => setValue(e.target.value)
	const { t } = useTranslation()
	return (
		<Form.Item className={styles.main}>
			<Radio.Group
				onChange={onChangeRadio}
				defaultValue={0}
				size="large"
				className={styles.switcher}
				buttonStyle="solid"
			>
				<Radio.Button value={0}>{t('byEmail')}</Radio.Button>
				<Radio.Button value={1}>{t('byPhone')}</Radio.Button>
			</Radio.Group>
		</Form.Item>
	)
}