import { Button, Drawer, Form, Input, Typography, Upload, message } from 'antd'
import type { UploadProps } from 'antd'
import { FC } from 'react'

import { UploadSvg } from '../../../../assets/svg'
import { TitleEmail } from '../title/TitleEmail'

import styles from './EmailDrawer.module.scss'

interface IEmailDrawerProps {
	childrenDrawer: boolean
	onChildrenDrawerClose: () => void
}

const { Text } = Typography

const props: UploadProps = {
	beforeUpload: file => {
		const isSize = file.size > 4096
		if (!isSize) {
			message.error(`${file.name} file is too big`)
		}
		return isSize || Upload.LIST_IGNORE
	},
	onChange: info => {
		console.log(info.fileList)
	}
}

export const EmailDrawer: FC<IEmailDrawerProps> = ({
	onChildrenDrawerClose,
	childrenDrawer
}) => {
	const width = document.body.clientWidth > 2200 ? 600 : 320

	return (
		<Drawer
			title={<TitleEmail onClose={onChildrenDrawerClose} />}
			width={width}
			closable={false}
			onClose={onChildrenDrawerClose}
			open={childrenDrawer}
			headerStyle={{ textAlign: 'center' }}
		>
			<Form className={styles.form} layout="vertical" requiredMark>
				<Form.Item
					name="email"
					className={styles.input}
					rules={[
						{ type: 'email' },
						{ required: true, message: 'Please enter user email' }
					]}
				>
					<Input placeholder="Email" size="large" />
				</Form.Item>

				<Form.Item
					name="header"
					className={styles.input}
					rules={[
						{ type: 'string' },
						{ required: true, message: 'Please enter header' }
					]}
				>
					<Input placeholder="Заголовок" size="large" />
				</Form.Item>

				<Form.Item
					name="description"
					className={styles.input}
					rules={[
						{ type: 'string' },
						{
							required: true,
							message: 'please enter describe the problem'
						}
					]}
				>
					<Input.TextArea rows={4} placeholder="Текст" />
				</Form.Item>

				<Upload {...props}>
					<Button type="text" className={styles.upload} icon={<UploadSvg />}>
						Прикрепить файл
					</Button>
				</Upload>
				<Form.Item>
					<Button className={styles.send} type="primary" htmlType="submit">
						Отправить письмо
					</Button>
					<Text className={styles.text}>
						Отправляя письмо, вы соглашаетесь на обработку персональных данных
					</Text>
				</Form.Item>
			</Form>
		</Drawer>
	)
}
