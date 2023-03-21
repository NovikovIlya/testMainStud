import { Button, Drawer, Form, Input, Typography, Upload, message } from 'antd'
import type { UploadProps } from 'antd'
import { FC } from 'react'

import { UploadSvg } from '../../../../assets/svg/UploadSvg'
import { TitleEmail } from '../title/TitleEmail'

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
	return (
		<Drawer
			title={<TitleEmail onClose={onChildrenDrawerClose} />}
			width={320}
			closable={false}
			onClose={onChildrenDrawerClose}
			open={childrenDrawer}
			headerStyle={{ textAlign: 'center' }}
		>
			<Form layout="vertical" hideRequiredMark>
				<Form.Item
					name="email"
					rules={[
						{ type: 'email' },
						{ required: true, message: 'Please enter user email' }
					]}
				>
					<Input placeholder="Email" size="large" />
				</Form.Item>

				<Form.Item
					name="header"
					rules={[
						{ type: 'string' },
						{ required: true, message: 'Please enter header' }
					]}
				>
					<Input placeholder="Заголовок" size="large" />
				</Form.Item>

				<Form.Item
					name="description"
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
					<Button type="text" icon={<UploadSvg />}>
						Прикрепить файл
					</Button>
				</Upload>
				<Form.Item>
					<Button
						className="w-full mt-[30px]"
						size="large"
						type="primary"
						htmlType="submit"
					>
						Отправить письмо
					</Button>
					<Text className="text-black opacity-50 cursor-pointer flex mt-[10px] text-center">
						Отправляя письмо, вы соглашаетесь на обработку персональных данных
					</Text>
				</Form.Item>
			</Form>
		</Drawer>
	)
}
