import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Form, Input, List, Skeleton, Spin } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import InfiniteScroll from 'react-infinite-scroll-component'

import { ChatResponse } from '../../../../models/chat'
import { useAppDispatch, useAppSelector } from '../../../../store'
import {
	useGetAllDialogsOldQuery,
	useGetAllDialogsQuery,
	useGetOneChatOldQuery,
	useGetOneChatQuery,
	useReadMessageMutation,
	useSearchUserOldQuery,
	useSearchUserQuery,
	useSendMessageChatMutation
} from '../../../../store/api/messages/messageApi'
import { ContentWithinBrackets, extractContentWithinBrackets, hasBrackets } from '../../../../utils/extractBrackets'
import { truncateString } from '../../../../utils/truncateString'

import { CommentNewTeacher } from './CommentTeacher'
import InputText from './InputText'
import { NewDialogModal } from './NewDialogModal'
import SearchComponent from './SearchComponent'

export const ViewMessage = () => {
	const user = useAppSelector(state => state.auth.user)
	const [form] = Form.useForm()
	const [dialogs, setDialogs] = useState<ChatResponse[]>([])
	const { t } = useTranslation()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [activeDialog, setActiveDialog] = useState(null)
	const [page, setPage] = useState(0)
	const { data: dataAllDialogsOld } = useGetAllDialogsOldQuery({ page, size: 8 })
	const {data: dataAllDialogs,isLoading,isFetching} = useGetAllDialogsQuery({ page: 0, size: 8 }, { pollingInterval: 5000 })
	const [sendMessage, { isLoading: isLoadingSend }] = useSendMessageChatMutation()
	const [pageChat, setPageChat] = useState(0)
	const { data: dataOneChat } = useGetOneChatQuery({ id: activeDialog, page: 0, size: 100 },{ skip: !activeDialog, pollingInterval: 5000 })
	const { data: dataOneChatOld, isFetching: isFetchingOneChatOld } = useGetOneChatOldQuery({ id: activeDialog, page: pageChat, size: 100 },{ skip: !activeDialog })
	const [chatArray, setChatArray] = useState<ChatResponse[]>([])
	const [flag, setFlag] = useState(true)
	const [gotToBottom, setGotoBottom] = useState(0)
	const [readMessage] = useReadMessageMutation()
	const [currentItem, setCurrentItem] = useState<ChatResponse | null>(null)
	const [isEmplty, setIsEmpty] = useState(true)
	const [debouncedSearchValue, setDebouncedSearchValue] = useState('')
	const [pageSearch, setPageSearch] = useState(0)
	const { data: dataSearch, isFetching: isFetchingSearch } = useSearchUserQuery({ name: debouncedSearchValue, page: 0, size: 15 },{ skip: !debouncedSearchValue, pollingInterval: 5000 })
	const { data: dataSearchOld, isFetching: isFetchingSearchOld } = useSearchUserOldQuery({ name: debouncedSearchValue, page: pageSearch, size: 15 },{ skip: !debouncedSearchValue })
	const [dataSearchValue, setdataSearchValue] = useState<ChatResponse[]>([])

	useEffect(() => {
		if (dataSearch?.length > 0) {
			setdataSearchValue(dataSearch)
		}
		if (dataSearch?.length === 0) {
			setdataSearchValue([])
		}
	}, [dataSearch])

	useEffect(() => {
		if (dataSearchOld) {
			setdataSearchValue(prevDialogs => {
				const dialogMap = new Map(prevDialogs.map(dialog => [dialog.id, dialog]))

				dataSearchOld.forEach((newDialog: ChatResponse) => {
					const existingDialog = dialogMap.get(newDialog.id)

					if (existingDialog) {
						if (
							existingDialog.lastMessage !== newDialog.lastMessage ||
							existingDialog.lastMessageTime !== newDialog.lastMessageTime ||
							existingDialog.isRead !== newDialog.isRead
						) {
							dialogMap.set(newDialog.id, newDialog)
						}
					} else {
						dialogMap.set(newDialog.id, newDialog)
					}
				})

				return Array.from(dialogMap.values()).sort(
					(a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
				)
			})
		}
	}, [dataSearchOld])

	useEffect(() => {
		if (dataAllDialogs) {
			setDialogs(prevDialogs => {
				const dialogMap = new Map(prevDialogs.map(dialog => [dialog.id, dialog]))

				dataAllDialogs.forEach(newDialog => {
					const existingDialog = dialogMap.get(newDialog.id)

					if (existingDialog) {
						if (
							existingDialog.lastMessage !== newDialog.lastMessage ||
							existingDialog.lastMessageTime !== newDialog.lastMessageTime ||
							existingDialog.isRead !== newDialog.isRead
						) {
							dialogMap.set(newDialog.id, newDialog)
						}
					} else {
						dialogMap.set(newDialog.id, newDialog)
					}
				})

				return Array.from(dialogMap.values()).sort(
					(a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
				)
			})
		}
	}, [dataAllDialogs])

	useEffect(() => {
		if (dataAllDialogsOld) {
			setDialogs(prevDialogs => {
				const dialogMap = new Map(prevDialogs.map(dialog => [dialog.id, dialog]))

				dataAllDialogsOld.forEach(newDialog => {
					const existingDialog = dialogMap.get(newDialog.id)

					if (existingDialog) {
						// Если диалог существует и данные изменились, обновляем его
						if (
							existingDialog.lastMessage !== newDialog.lastMessage ||
							existingDialog.lastMessageTime !== newDialog.lastMessageTime ||
							existingDialog.isRead !== newDialog.isRead
						) {
							dialogMap.set(newDialog.id, newDialog)
						}
					} else {
						// Если диалога нет, добавляем новый
						dialogMap.set(newDialog.id, newDialog)
					}
				})

				return Array.from(dialogMap.values()).sort(
					(a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
				)
			})
		}
	}, [dataAllDialogsOld])

	useEffect(() => {
		if (dataOneChat?.messages) {
			setChatArray(prevMessages => {
				const newMessages = [...dataOneChat.messages]
				const existingMessageIds = new Set(prevMessages.map((msg: any) => msg.id))
				const uniqueNewMessages = newMessages.filter((msg: any) => !existingMessageIds.has(msg.id))
				return [...prevMessages, ...uniqueNewMessages]
			})
		}

		setGotoBottom(p => p + 1)
		setFlag(false)
	}, [dataOneChat])

	useEffect(() => {
		if (dataOneChatOld?.messages) {
			setChatArray(prevMessages => {
				const newMessages = [...dataOneChatOld.messages]
				const existingMessageIds = new Set(prevMessages.map((msg: any) => msg.id))
				const uniqueNewMessages = newMessages.filter((msg: any) => !existingMessageIds.has(msg.id))
				return [...prevMessages, ...uniqueNewMessages]
			})
		}
	}, [dataOneChatOld])


	useEffect(() => {
		if (isEmplty) {
			setdataSearchValue([])
		}
	}, [isEmplty])

	const loadMoreData = () => {
		if (isFetching || isLoading) return
		if (!isEmplty) {
			setPageSearch(p => p + 1)
			return
		}
		setPage(p => p + 1)
	}

	const showModal = () => setIsModalOpen(true)

	const handleCancel = () => {
		setIsModalOpen(false)
	}

	const clickTextArea = () => {}

	const refetch = () => {}

	const onFinish = async () => {
		const obj = {
			message: form.getFieldValue('textArea'),
			senderName: `${user.lastname} ${user.firstname} ${user.middlename}`,
			chatId: activeDialog
		}
		sendMessage(obj).unwrap()
		form.resetFields()
	}

	const loadMessages = () => {
		if (isFetchingOneChatOld) return
		setPageChat(p => p + 1)
	}

	const changeIsReady = (id: number) => {
		const newDialogs = dialogs.map((dialog: any) => {
			if (dialog.id === activeDialog) {
				return {
					...dialog,
					isRead: true
				}
			}
			return dialog
		})
		setDialogs(newDialogs)
		readMessage(id)
	}

	const readOnWindow = (item: any) => {
		const validItem = dialogs.find((dialog: any) => dialog.id === item.id)
		if (validItem?.isRead) return
		readMessage(activeDialog)
	}

	const searchEmpty = (values: any) => {
		setIsEmpty(values)
		setPageSearch(0)
	}

	const handleDebouncedValueChange = (value: string) => {
		setDebouncedSearchValue(value)
	}

	if (isLoading)
		return (
			<div className="screen !z-[100000000] relative">
				<div className="loader">
					<div className="inner one"></div>
					<div className="inner two"></div>
					<div className="inner three"></div>
				</div>
			</div>
		)

	return (
		<div className="grid grid-cols-4 gap-2">
			<Spin spinning={isLoadingSend} fullscreen></Spin>
			<div className="bg-white h-screen shadow-xl col-span-1 ">
				<div className="mt-36 "></div>

				<div className="mt-1 px-4 pb-2 flex justify-between items-center">
					<Button type="primary" className="!rounded-full  h-10 w-full " onClick={showModal}>
						<PlusCircleOutlined />
						{t('newDialog')}
					</Button>
				</div>

				<SearchComponent onDebouncedValueChange={handleDebouncedValueChange} searchEmpty={searchEmpty} />

				{
					<div
						id="scrollableDialogs"
						className="!overflow-y-scroll mt-1"
						style={{
							height: 'calc(100vh - 265px)',
							overflow: 'auto',
							padding: '0 16px'
						}}
					>
						<InfiniteScroll
							dataLength={!isEmplty ? dataSearchValue.length : dialogs.length}
							next={loadMoreData}
							hasMore={dialogs.length < 50}
							loader={isLoading && <Skeleton className="pl-4 pt-4" paragraph={{ rows: 1 }} active />}
							scrollableTarget="scrollableDialogs"
							scrollThreshold="200px"
						>
							{isLoading ? (
								''
							) : (
								<List
									locale={{
										emptyText: <div></div>
									}}
									dataSource={!isEmplty ? dataSearchValue : dialogs}
									renderItem={(item: any) => (
										<List.Item
											key={item.id}
											onClick={e => {
												if (item.id === activeDialog) return
												e.stopPropagation()
												setChatArray([])
												setPageChat(0)
												setActiveDialog(item.id)
												form.resetFields()
												setFlag(true)
												changeIsReady(item.id)
												setCurrentItem(item)
											}}
											className={`cursor-pointer rounded-xl !p-4 ${activeDialog === item.id ? '!bg-[#E9EFF8]' : ''}`}
											style={{
												borderBottom: '1px solid #E9EFF8'
											}}
										>
											<List.Item.Meta
												title={
													<>
														<span className="font-extrabold">
															{hasBrackets(item.userName)
																? hasBrackets(ContentWithinBrackets(item.userName))
																	? ContentWithinBrackets(ContentWithinBrackets(item.userName))
																	: ContentWithinBrackets(item.userName)
																: item.userName}
														</span>
														<div style={{ fontSize: '12px', color: '#888' }}>
															{hasBrackets(item.userName) ? extractContentWithinBrackets(item.userName) : ''}
														</div>
													</>
												}
												description={truncateString(10, item.lastMessage)}
											/>
											<div className="pt-2 flex flex-col  gap-[9px]">
												{dayjs(item.lastMessageTime).isSame(dayjs(), 'day') ? (
													<div className="text-[10px] ">{dayjs(item.lastMessageTime).format('HH:mm')}</div>
												) : (
													<div className="text-[10px]">{dayjs(item.lastMessageTime).format('DD.MM.YYYY')}</div>
												)}

												{!item.isRead ? (
													<div className="w-full flex justify-end">
														<div className="rounded-full bg-blue-600 w-4 h-4"></div>
													</div>
												) : (
													''
												)}
											</div>
										</List.Item>
									)}
								/>
							)}
						</InfiniteScroll>
					</div>
				}
			</div>

			<div className="!h-screen   col-span-3  flex justify-center items-center">
				{!activeDialog ? (
					<div className="text-gray-500">{t('selectDialog')}</div>
				) : (
					<>
						<div className="mt-36 p-4 col-span-2  w-full flex justify-center flex-wrap ">
							{!flag ? (
								<div
									onClick={() => {
										readOnWindow(currentItem)
									}}
									className="w-full flex flex-wrap flex-col "
								>
									<CommentNewTeacher
										dataOneChatOld={dataOneChatOld}
										gotToBottom={gotToBottom}
										loadMessages={loadMessages}
										chatArray={chatArray}
										files={[]}
										refetch={refetch}
									>
										<>
											<span className="font-extrabold">
												{hasBrackets(currentItem ? currentItem?.userName : '')
													? hasBrackets(ContentWithinBrackets(currentItem ? currentItem?.userName : ''))
														? ContentWithinBrackets(ContentWithinBrackets(currentItem ? currentItem?.userName : ''))
														: ContentWithinBrackets(currentItem ? currentItem?.userName : '')
													: currentItem?.userName}
											</span>
											<div style={{ fontSize: '12px', color: '#888' }}>
												{hasBrackets(currentItem ? currentItem?.userName : '')
													? extractContentWithinBrackets(currentItem ? currentItem?.userName : '')
													: ''}
											</div>
										</>
									</CommentNewTeacher>
									<Form form={form} className="flex w-full flex-wrap" onFinish={onFinish}>
										<div className="flex w-full mt-4">
											<InputText form={form} clickTextArea={clickTextArea} />
										</div>
									</Form>
								</div>
							) : (
								<>
									<Spin />
								</>
							)}
						</div>
					</>
				)}
			</div>
			<NewDialogModal isModalOpen={isModalOpen} onCancel={handleCancel} />
		</div>
	)
}
