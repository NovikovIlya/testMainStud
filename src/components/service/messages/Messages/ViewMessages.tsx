import {
	Button, Form, Input, List,
	Skeleton, Spin
} from 'antd'
import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../../store'

import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useGetAllDialogsOldQuery, useGetAllDialogsQuery, useGetOneChatOldQuery, useGetOneChatQuery, useReadMessageMutation, useSearchUserQuery, useSendMessageChatMutation } from '../../../../store/api/messages/messageApi'
import { truncateString } from '../../../../utils/truncateString'
import { CommentNewTeacher } from './CommentTeacher'
import InputText from './InputText'
import { NewDialogModal } from './NewDialogModal'
import SearchComponent from './SearchComponent'


export const ViewMessage = () => {
	const user = useAppSelector(state => state.auth.user)
	const [form] = Form.useForm();
	const [dialogs, setDialogs] = useState<any>([]);
	const {t} = useTranslation()
	const [value, setValue] = useState(t('all'));
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [activeDialog, setActiveDialog] = useState(null);
	const [page,setPage] = useState(0)
	const {data:dataAllDialogsOld} = useGetAllDialogsOldQuery<any>({page,size:8})
	const {data:dataAllDialogs,isLoading,isFetching} = useGetAllDialogsQuery<any>({page:0,size:8},{pollingInterval:5000})
	const [sendMessage,{isLoading:isLoadingSend}] = useSendMessageChatMutation()
	const [pageChat,setPageChat] = useState(0)
	const {data:dataOneChat} = useGetOneChatQuery({id:activeDialog,  page:  0,    size:100},{skip: !activeDialog,
		pollingInterval: 5000,
	})
	const {data:dataOneChatOld,isFetching:isFetchingOneChatOld} = useGetOneChatOldQuery({id:activeDialog,  page:   pageChat,    size:100},{skip: !activeDialog})
	const [chatArray,setChatArray] = useState<any>([])
	const [flag,setFlag] = useState(true)
	const [gotToBottom,setGotoBottom] = useState(0)
	const [isReadArray,setIsReadArray] = useState<any>([])
	const [readMessage] = useReadMessageMutation()
	const [currentItem,setCurrentItem] = useState(null)
	const [searchResults, setSearchResults] = useState<any>(null);
	const [isEmplty,setIsEmpty] = useState(true) 

	console.log('searchResults',searchResults)
	
	useEffect(() => {
		if (dataAllDialogs) {
		  setDialogs((prevDialogs: any[]) => {
			// Создаем Map из предыдущих диалогов для быстрого поиска
			const dialogMap = new Map(prevDialogs.map(dialog => [dialog.id, dialog]));
			
			// Обрабатываем каждый диалог из новых данных
			dataAllDialogs.forEach((newDialog:any) => {
			  const existingDialog = dialogMap.get(newDialog.id);
			  
			  if (existingDialog) {
				// Если диалог существует и данные изменились, обновляем его
				if (existingDialog.lastMessage !== newDialog.lastMessage || 
					existingDialog.lastMessageTime !== newDialog.lastMessageTime ||
					existingDialog.isRead !== newDialog.isRead) {
				  dialogMap.set(newDialog.id, newDialog);
				}
			  } else {
				// Если диалога нет, добавляем новый
				dialogMap.set(newDialog.id, newDialog);
			  }
			});
			
			// Преобразуем Map обратно в массив и сортируем по времени последнего сообщения
			return Array.from(dialogMap.values())
			  .sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime());
		  });
		}
	  }, [dataAllDialogs]);

	useEffect(() => {
	if (dataAllDialogsOld) {
		setDialogs((prevDialogs: any[]) => {
		// Создаем Map из предыдущих диалогов для быстрого поиска
		const dialogMap = new Map(prevDialogs.map(dialog => [dialog.id, dialog]));
		
		// Обрабатываем каждый диалог из новых данных
		dataAllDialogsOld.forEach((newDialog:any) => {
			const existingDialog = dialogMap.get(newDialog.id);
			
			if (existingDialog) {
			// Если диалог существует и данные изменились, обновляем его
			if (existingDialog.lastMessage !== newDialog.lastMessage || 
				existingDialog.lastMessageTime !== newDialog.lastMessageTime ||
				existingDialog.isRead !== newDialog.isRead) {
				dialogMap.set(newDialog.id, newDialog);
			}
			} else {
			// Если диалога нет, добавляем новый
			dialogMap.set(newDialog.id, newDialog);
			}
		});
		
		// Преобразуем Map обратно в массив и сортируем по времени последнего сообщения
		return Array.from(dialogMap.values())
			.sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime());
		});
	}
	}, [dataAllDialogsOld]);
	  
	useEffect(() => {
		if (dataOneChat?.messages) {
		  setChatArray((prevMessages:any) => {
			const newMessages = [...dataOneChat.messages];
			const existingMessageIds = new Set(prevMessages.map((msg: any) => msg.id));
			const uniqueNewMessages = newMessages.filter((msg: any) => !existingMessageIds.has(msg.id));
			return [...prevMessages, ...uniqueNewMessages];
		  });
		}

		setGotoBottom(p=>p+1)
		setFlag(false)
	  }, [dataOneChat]);

	useEffect(() => {
	if (dataOneChatOld?.messages) {
		setChatArray((prevMessages:any) => {
		const newMessages = [...dataOneChatOld.messages];
		const existingMessageIds = new Set(prevMessages.map((msg: any) => msg.id));
		const uniqueNewMessages = newMessages.filter((msg: any) => !existingMessageIds.has(msg.id));
		return [...prevMessages, ...uniqueNewMessages];
		});
	}
    
	
	}, [dataOneChatOld]);
  

	const loadMoreData = () => {
		if(isFetching || isLoading) return
		setPage(p=>p+1)
	};
  
	const showModal = () => setIsModalOpen(true);

	const handleCancel = () => {
		setIsModalOpen(false)
	}

	const clickTextArea = ()=>{

	}

	const refetch = ()=>{

	}

	const onFinish = async() => {
		const obj = {
			message: form.getFieldValue('textArea'),
			senderName: `${user.lastname} ${user.firstname} ${user.middlename}`,
			chatId: activeDialog
		}
		sendMessage(obj).unwrap()
		form.resetFields()
	};

	const loadMessages = ()=>{
		if(isFetchingOneChatOld) return
		setPageChat(p=>p+1)
	}

	const changeIsReady = (id:any)=>{
		const newDialogs = dialogs.map((dialog:any) => {
			if (dialog.id === activeDialog) {
			  return {
				...dialog,
				isRead: true
			  };
			}
			return dialog;
		  });
		  setDialogs(newDialogs);
		  readMessage(id)
	}

	const readOnWindow = (item:any)=>{
		console.log('item',item)
		const validItem = dialogs.find((dialog:any)=>dialog.id===item.id)
		if(validItem.isRead) return
		readMessage(activeDialog)
	}

	const onSearchResults = (results: any) => {
		setSearchResults(results);
	  };
	  const searchEmpty= (values:any)=>{
		setIsEmpty(values)
	  }
	  console.log('isEmplty',isEmplty)

	if(isLoading) return <div className="screen !z-[100000000] relative">
		<div className="loader">
		<div className="inner one"></div>
		<div className="inner two"></div>
		<div className="inner three"></div>
		</div>
	</div>
  
	return (
	  <div className="grid grid-cols-3 gap-2">
		<Spin spinning={isLoadingSend} fullscreen></Spin>
		<div className="bg-white h-screen shadow-xl">
		  <div className="mt-36 "></div>
		  
		  
		  <div className="mt-1 px-4 pb-2 flex justify-between items-center" >
			{/* <Segmented
			  value={value===t('all')?t('all'):t('new')}
			  options={[t('all'), t('new')]}
			  onChange={setValue}
			/> */}
			<Button className='' onClick={showModal}>
			  <PlusCircleOutlined />{t('newDialog')}
			</Button>
		  </div>

		<SearchComponent searchEmpty={searchEmpty} onSearchResults={onSearchResults} />
  
		  <div
			id="scrollableDialogs"
			className="!overflow-y-scroll mt-1"
			style={{
			  height: 'calc(100vh - 255px)',
			  overflow: 'auto',
			  padding: '0 16px',
			}}
		  >
			<InfiniteScroll
			  dataLength={searchResults?.length && !isEmplty ? searchResults.length : dialogs.length}
			  next={loadMoreData}
			  hasMore={dialogs.length < 50}
			  loader={isLoading && <Skeleton className='pl-4 pt-4' paragraph={{ rows: 1 }} active />}
			  scrollableTarget="scrollableDialogs"
			  scrollThreshold="200px"
			>
			 {isLoading ? '': <List
			  	locale={{ emptyText:null }} 
				dataSource={searchResults?.length && !isEmplty ? searchResults : dialogs}
				renderItem={(item:any) => (
				  <List.Item
					key={item.id}
					onClick={() => {
						if(item.id===activeDialog) return
				
						setChatArray([])
						setPageChat(0)
						setActiveDialog(item.id)
						form.resetFields()
						setFlag(true)
						changeIsReady(item.id)
						setCurrentItem(item)
					}}
					className={`cursor-pointer rounded-xl !p-4 ${
					  activeDialog === item.id ? '!bg-[#E9EFF8]' : ''
					}`}
					style={{
					  borderBottom: '1px solid #E9EFF8',
					}}
				  >
					<List.Item.Meta
					  title={<span className="font-extrabold">{truncateString(27,item.userName)}</span>}
					  description={truncateString(10,item.lastMessage)}
					/>
					<div className='pt-2 flex flex-col  gap-[9px]'>
						{dayjs(item.lastMessageTime).isSame(dayjs(), 'day') ? <div className='text-[10px] '>{dayjs(item.lastMessageTime).format('HH:mm')}</div> :
						<div className='text-[10px]'>{dayjs(item.lastMessageTime).format('DD.MM.YYYY')}</div>}
						{/* <div className='w-full flex justify-center'><div className='rounded-full bg-blue-600 w-4 h-4'></div></div> */}
						{!item.isRead?<div className='w-full flex justify-end'><div className='rounded-full bg-blue-600 w-4 h-4'></div></div>:''}
					</div>
				  </List.Item>
				)}
			  />}
			</InfiniteScroll>
		  </div>
		</div>
  
		<div className="!h-screen   col-span-2  flex justify-center items-center">
		  {!activeDialog ? (
			<div className="text-gray-500">Выберите диалог или создайте новый</div>
		  ) : (
			<>
			<div className="mt-36 p-4 col-span-2  w-full flex justify-center flex-wrap ">
        { !flag ? (
          <div onClick={()=>{
			console.log('был клик')
			readOnWindow(currentItem)
		  }} className="w-full flex flex-wrap flex-col ">
            <CommentNewTeacher dataOneChatOld={dataOneChatOld} gotToBottom={gotToBottom} loadMessages={loadMessages} chatArray={chatArray} files={[]} refetch={refetch} />
            <Form form={form} className="flex w-full flex-wrap" onFinish={onFinish}>
              <div className="flex w-full mt-4">
                <InputText form={form} clickTextArea={clickTextArea} />
              </div>
            </Form>
          </div>

        ) : (
          <>
            <Spin  />
          </>
        )}
     		 </div></>
		  )}
		</div>
		 <NewDialogModal 
        	isModalOpen={isModalOpen}
        	onCancel={handleCancel}
      	/>
	  </div>
	);
  }