import {
	Button, Form, Input, List, Segmented, Skeleton, Spin
} from 'antd'
import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../../store'

import { CommentNewTeacher } from './CommentTeacher'
import InputText from './InputText'
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useTranslation } from 'react-i18next'
import { useAddNewChatMutation, useGetAllDialogsQuery, useGetOneChatQuery, useSendMessageChatMutation } from '../../../../store/api/messages/messageApi'
import { NewDialogModal } from './NewDialogModal'
import { apiSlice } from '../../../../store/api/apiSlice'

export const ViewMessage = () => {
	const user = useAppSelector(state => state.auth.user)
	const [form] = Form.useForm();
	const [dialogs, setDialogs] = useState<any>([]);
	const {t,i18n} = useTranslation()
	const [value, setValue] = useState(t('all'));
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [activeDialog, setActiveDialog] = useState<any>(null);
	const [page,setPage] = useState(0)
	const {data:dataAllDialogs,isLoading,isError,isFetching} = useGetAllDialogsQuery({page,size:15})
	const [sendMessage,{isLoading:isLoadingSend}] = useSendMessageChatMutation()
	//////////////////////////////
	const [pageChat,setPageChat] = useState(1)
	const [isLast,setIslast] = useState(false)
	const {data:dataOneChat,isFetching:isFetchingOneChat,isLoading:isLoadingChat} = useGetOneChatQuery({id:activeDialog,  page:  isLast ? 1 : pageChat,    size:50},{skip: !activeDialog,
		pollingInterval: 5000,
	})
	const [chatArray,setChatArray] = useState<any>([])
	const dispatch = useAppDispatch()
	const [hideBtn,setHideBtn] = useState(false)
	const [gotToBottom,setGotoBottom] = useState(0)
	////// если false - то нет скрола вниз(при нажатии на "добавить еще" становится false)
	const [flag,setFlag] = useState(true)


	useEffect(() => {
		if (dataAllDialogs) {
		  setDialogs((prevDialogs:any) => {
			
			if (dataAllDialogs.length === prevDialogs.length) return prevDialogs;
	  
			// Создаем Set из ID существующих диалогов
			// Set используется для быстрого поиска, так как операция проверки наличия элемента в Set происходит за O(1)
			const existingDialogIds = new Set(
			  prevDialogs.map((dialog:any) => dialog.id)
			);
	  
			// Фильтруем новые диалоги, оставляя только те, которых еще нет в существующем массиве
			// Проверяем каждый диалог из dataAllDialogs на наличие его ID в Set существующих диалогов
			const uniqueNewDialogs = dataAllDialogs.filter(
			  (dialog:any) => !existingDialogIds.has(dialog.id)
			);
	  
			// Возвращаем объединенный массив: существующие диалоги + новые уникальные
			return [...prevDialogs, ...uniqueNewDialogs];
		  });
		}
	  }, [dataAllDialogs]);

	useEffect(() => {
		if (dataOneChat?.messages) {
		  // Append new messages to existing ones
		  setChatArray((prevMessages:any) => {
			const newMessages = [...dataOneChat.messages];
			const existingMessageIds = new Set(prevMessages.map((msg: any) => msg.id));
			const uniqueNewMessages = newMessages.filter((msg: any) => !existingMessageIds.has(msg.id));
			return [...prevMessages, ...uniqueNewMessages];
		  });
		}
		if(flag)  setGotoBottom(p=>p+1)
		// setGotoBottom(p=>p+1)
	  }, [dataOneChat]);

  
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
	const onFinish = async(values: any) => {
		const obj = {
			message: form.getFieldValue('textArea'),
			senderName: `${user.lastname} ${user.firstname} ${user.middlename}`,
			chatId: activeDialog
		}
		console.log('obj',obj)
		sendMessage(obj).unwrap()
		.then(()=>{
			//////////////////////////////////
			/////////////// надо узнать последняя ли это страница
			setIslast(true)
			
		})

		setFlag(true)
		form.resetFields()
	  };

	const loadMessages = ()=>{
		if(isFetchingOneChat) return
		setFlag(false)

		setPageChat(p=>p-1)
		setIslast(false)
	}

  
	return (
		
	  <div className="grid grid-cols-3 gap-2">
		<div className="bg-white h-screen shadow-xl">
		  <div className="mt-36 "></div>
		  
		  <div className="mt-5 p-4">
			<Input placeholder={t('searchMEssage')} prefix={<SearchOutlined />} />
		  </div>
		  
		  <div className="mt-1 px-4 pb-4 flex justify-between items-center" style={{ borderBottom: '1px solid #E9EFF8' }}>
			<Segmented
			  value={value===t('all')?t('all'):t('new')}
			  options={[t('all'), t('new')]}
			  onChange={setValue}
			/>
			<Button className='' onClick={showModal}>
			  <PlusCircleOutlined />{t('newDialog')}
			</Button>
		  </div>
  
		  <div
			id="scrollableDialogs"
			className="!overflow-y-scroll"
			style={{
			  height: 'calc(100vh - 285px)',
			  overflow: 'auto',
			  padding: '0 16px',
			}}
		  >
			<InfiniteScroll
			  dataLength={dialogs.length}
			  next={loadMoreData}
			  hasMore={dialogs.length < 50}
			  loader={isLoading && <Skeleton className='pl-4 pt-4' paragraph={{ rows: 1 }} active />}
			  scrollableTarget="scrollableDialogs"
			  scrollThreshold="200px"
			>
			 {isLoading ? '': <List
			  	locale={{ emptyText:null }} 
				dataSource={dialogs}
				renderItem={(item:any) => (
				  <List.Item
					key={item.id}
					onClick={() => {
						if(item.id===activeDialog) return
						setHideBtn(false)
						/////////////////////// чат максимальный
						setChatArray([])
						setPageChat(0)
						setActiveDialog(item.id)
					}}
					className={`cursor-pointer rounded-xl !p-4 ${
					  activeDialog === item.id ? '!bg-[#E9EFF8]' : ''
					}`}
					style={{
					  borderBottom: '1px solid #E9EFF8',
					}}
				  >
					<List.Item.Meta
					  title={<span className="font-extrabold">{item.userName}</span>}
					  description={item.lastMessage}
					/>
					<div className=''>
						<div>{item.time}</div>
						{/* <div className='w-full flex justify-center'><div className='rounded-full bg-blue-600 w-4 h-4'></div></div> */}
						<div className='h-4'></div>
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
        {!isLoadingChat ? (
		
          <div className="w-full flex flex-wrap flex-col ">
            <CommentNewTeacher gotToBottom={gotToBottom} loadMessages={loadMessages} hideBtn={hideBtn} chatArray={chatArray} files={[]} refetch={refetch} />
            <Form form={form} className="flex w-full flex-wrap" onFinish={onFinish}>
              <div className="flex w-full mt-4">
                <InputText clickTextArea={clickTextArea} />
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