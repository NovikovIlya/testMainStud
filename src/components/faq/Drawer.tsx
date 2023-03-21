import {
	Button,
	Collapse,
	Divider,
	Drawer,
	Form,
	Input,
	Typography,
	Upload,
	message
} from 'antd'
import type { UploadProps } from 'antd'
import { FC } from 'react'

import './Drawer.scss'
import { TitleEmail } from './TitleEmail'
import { TitleFaq } from './TitleFaq'

interface IDrawerPros {
	open: boolean
	onClose: () => void
	onChildrenDrawerClose: () => void
	showChildrenDrawer: () => void
	childrenDrawer: boolean
}

const { Panel } = Collapse
const { Text, Link } = Typography

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
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

export const DrawerEmail: FC<IDrawerPros> = ({
	open,
	onClose,
	childrenDrawer,
	onChildrenDrawerClose,
	showChildrenDrawer
}) => {
	return (
		<>
			<Drawer
				title={<TitleFaq showChildrenDrawer={showChildrenDrawer} />}
				onClose={onClose}
				closable={false}
				open={open}
				headerStyle={{ textAlign: 'center' }}
			>
				<Collapse
					expandIcon={() => (
						<svg
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M10.3591 11.4626V11.216C10.3591 10.4176 10.8541 9.99486 11.3491 9.65434C11.8323 9.32557 12.3155 8.90286 12.3155 8.12788C12.3155 7.04762 11.4434 6.17871 10.3591 6.17871C9.27475 6.17871 8.40259 7.04762 8.40259 8.12788M10.3532 14.2689H10.365"
								stroke="#004EC2"
								strokeWidth="1.7613"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<circle
								cx="10.1922"
								cy="9.86577"
								r="8.2194"
								stroke="#004EC2"
								strokeWidth="2.3484"
							/>
						</svg>
					)}
					ghost
				>
					<Panel header="Как подключиться к Wi-Fi КФУ?" key="1">
						<p>{text}</p>
					</Panel>
					<Panel header="Как получить учетные данные?" key="2">
						<p>{text}</p>
					</Panel>
					<Panel header="Ответы на частые вопросы" key="3">
						<p>{text}</p>
					</Panel>
				</Collapse>
				<Divider />
				<Button
					onClick={showChildrenDrawer}
					className="flex items-center w-full gap-2 mb-3"
					icon={
						<svg
							width="21"
							height="18"
							viewBox="0 0 21 18"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M2.79668 5.69054C2.79668 4.30382 3.18103 3.47926 3.69569 2.99199C4.22044 2.49518 5.03854 2.19902 6.20186 2.19902H15.0084C16.1717 2.19902 16.9898 2.49518 17.5145 2.99199C18.0292 3.47926 18.4135 4.30382 18.4135 5.69054V11.976C18.4135 13.3627 18.0292 14.1872 17.5145 14.6745C16.9898 15.1713 16.1717 15.4675 15.0084 15.4675H6.20186C5.03854 15.4675 4.22044 15.1713 3.69569 14.6745C3.18103 14.1872 2.79668 13.3627 2.79668 11.976V5.69054ZM6.20186 0.202881C4.72323 0.202881 3.3397 0.580162 2.32331 1.54246C1.29683 2.51431 0.800537 3.93455 0.800537 5.69054V11.976C0.800537 13.732 1.29683 15.1522 2.32331 16.124C3.3397 17.0863 4.72323 17.4636 6.20186 17.4636H15.0084C16.487 17.4636 17.8705 17.0863 18.8869 16.124C19.9134 15.1522 20.4097 13.732 20.4097 11.976V5.69054C20.4097 3.93455 19.9134 2.51431 18.8869 1.54246C17.8705 0.580162 16.487 0.202881 15.0084 0.202881H6.20186ZM15.3048 6.70279C15.7495 6.37703 15.8459 5.75248 15.5201 5.30782C15.1943 4.86316 14.5698 4.76677 14.1251 5.09253L11.5537 6.97637L11.5532 6.97671C11.3322 7.13792 10.9907 7.24799 10.6012 7.24799C10.2119 7.24799 9.87067 7.1381 9.64962 6.97711L7.08663 5.09344C6.64247 4.767 6.01777 4.86243 5.69133 5.30659C5.3649 5.75076 5.46033 6.37545 5.90449 6.70189L8.46894 8.58665L8.47143 8.58846C9.09701 9.04527 9.87315 9.24413 10.6012 9.24413C11.3292 9.24413 12.1053 9.04527 12.7309 8.58846L12.7321 8.58754L15.3048 6.70279Z"
								fill="#004EC2"
							/>
						</svg>
					}
					type="text"
				>
					Написать письмо
				</Button>
				<Button
					className="flex w-full items-center gap-2 mb-3"
					icon={
						<svg
							width="22"
							height="22"
							viewBox="0 0 22 22"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M20.5858 17.1732C20.5858 17.5114 20.5105 17.859 20.3506 18.1971C20.1907 18.5353 19.9837 18.8547 19.7109 19.1553C19.2499 19.6625 18.7419 20.0289 18.168 20.2637C17.6035 20.4986 16.992 20.6207 16.3335 20.6207C15.3739 20.6207 14.3485 20.3953 13.2666 19.935C12.1847 19.4747 11.1028 18.8547 10.0303 18.075C8.93726 17.2767 7.90578 16.3975 6.9446 15.4448C5.99326 14.4886 5.11584 13.4617 4.31985 12.3731C3.54842 11.3022 2.92751 10.2314 2.47594 9.1699C2.02437 8.09903 1.79858 7.07512 1.79858 6.09819C1.79858 5.45943 1.91148 4.84884 2.13726 4.28523C2.36305 3.71222 2.72054 3.18617 3.21915 2.71649C3.82124 2.1247 4.47978 1.8335 5.17595 1.8335C5.43937 1.8335 5.70278 1.88986 5.93798 2.00258C6.18258 2.1153 6.39896 2.28439 6.56829 2.52862L8.75088 5.60033C8.92022 5.83517 9.04252 6.05122 9.12719 6.25788C9.21186 6.45515 9.2589 6.65241 9.2589 6.83089C9.2589 7.05634 9.19305 7.28178 9.06134 7.49784C8.93904 7.71389 8.76029 7.93934 8.53451 8.16478L7.81952 8.90688C7.71603 9.01021 7.669 9.13232 7.669 9.28262C7.669 9.35777 7.6784 9.42352 7.69722 9.49867C7.72544 9.57382 7.75367 9.63018 7.77248 9.68655C7.94182 9.99653 8.23346 10.4005 8.6474 10.8889C9.07075 11.3774 9.52232 11.8753 10.0115 12.3731C10.5195 12.871 11.0087 13.3313 11.5073 13.754C11.9965 14.1673 12.4011 14.4491 12.7209 14.6182C12.768 14.637 12.8244 14.6652 12.8903 14.6933C12.9655 14.7215 13.0408 14.7309 13.1255 14.7309C13.2854 14.7309 13.4077 14.6745 13.5112 14.5712L14.2262 13.8667C14.4614 13.6319 14.6872 13.4534 14.9035 13.3407C15.1199 13.2091 15.3363 13.1434 15.5715 13.1434C15.7502 13.1434 15.9384 13.181 16.1453 13.2655C16.3523 13.3501 16.5687 13.4722 16.8039 13.6319L19.9178 15.8394C20.1624 16.0084 20.3318 16.2057 20.4353 16.4405C20.5293 16.6754 20.5858 16.9102 20.5858 17.1732Z"
								stroke="#004EC2"
								strokeWidth="2.3484"
								strokeMiterlimit="10"
							/>
						</svg>
					}
					type="text"
				>
					Позвонить
				</Button>
				<Divider />
				<div className="flex justify-center items-center text-lg">
					<Link
						href="mailto:deshelp@kpfu.ru"
						strong
						style={{ color: '#808080' }}
						className=" cursor-pointer"
					>
						deshelp@kpfu.ru
					</Link>
					<Divider className=" h-[25px]" type="vertical" />
					<Link
						href="tel:+7 (843) 206-50-84"
						style={{ color: '#808080' }}
						strong
						className="cursor-pointer"
					>
						+7 (843) 206-50-84
					</Link>
				</div>
				<Drawer
					title={<TitleEmail />}
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
							<Button
								type="text"
								icon={
									<svg
										className="mr-1.5"
										width="14"
										height="11"
										viewBox="0 0 14 11"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M7.36116 5.46385L5.7116 6.84683C5.49413 7.02862 5.32158 7.2446 5.20385 7.4824C5.08611 7.7202 5.02551 7.97514 5.02551 8.23261C5.02551 8.49008 5.08611 8.74502 5.20385 8.98282C5.32158 9.22062 5.49413 9.4366 5.7116 9.61839C5.92843 9.80072 6.18605 9.94538 6.46968 10.0441C6.75332 10.1428 7.0574 10.1936 7.3645 10.1936C7.6716 10.1936 7.97568 10.1428 8.25932 10.0441C8.54295 9.94538 8.80057 9.80072 9.0174 9.61839L11.6153 7.44034C12.491 6.70479 12.9828 5.70801 12.9828 4.66877C12.9828 3.62954 12.491 2.63276 11.6153 1.89721C10.738 1.16306 9.54905 0.750732 8.30949 0.750732C7.06994 0.750732 5.88102 1.16306 5.00369 1.89721L2.17206 4.27124C0.609315 5.58143 0.609315 7.70909 2.17206 9.02488"
											stroke="#004EC2"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								}
							>
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
								Отправляя письмо, вы соглашаетесь на обработку персональных
								данных
							</Text>
						</Form.Item>
					</Form>
				</Drawer>
			</Drawer>
		</>
	)
}
