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
	
	const [form] = Form.useForm();
	const [dialogs, setDialogs] = useState<any>([]);
	const {t,i18n} = useTranslation()
	const [value, setValue] = useState(t('all'));
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [activeDialog, setActiveDialog] = useState<any>(null);
	const [page,setPage] = useState(0)
	const {data:dataAllDialogs,isLoading,isError,isFetching} = useGetAllDialogsQuery({page,size:15})
	const [sendMessage,{isLoading:isLoadingSend}] = useSendMessageChatMutation()
	const [pageChat,setPageChat] = useState(0)
	const {data:dataOneChat} = useGetOneChatQuery({id:activeDialog?.id,  page: pageChat,    size:15},{skip: !activeDialog?.id})
	const dispatch = useAppDispatch()


	useEffect(()=>{
		if(dataAllDialogs){
			setDialogs((prevDialogs:any) =>[...prevDialogs, ...dataAllDialogs])
		}
	},[dataAllDialogs])


  
	const loadMoreData = () => {
		if(isFetching || isLoading) return
		setPage(p=>p+1)
	  

	};
  
	const showModal = () => setIsModalOpen(true);
	const handleCancel = () => {
		
		setIsModalOpen(false)}



	const clickTextArea = ()=>{

	}
	const refetch = ()=>{

	}
	const onFinish = (values: any) => {
		console.log('Success:', values);
	  };



  
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
			  <List
				dataSource={dialogs}
				renderItem={(item:any) => (
				  <List.Item
					key={item.id}
					onClick={() => setActiveDialog(item.id)}
					className={`cursor-pointer rounded-xl !p-4 ${
					  activeDialog === item.id ? '!bg-[#E9EFF8]' : ''
					}`}
					style={{
					  borderBottom: '1px solid #E9EFF8',
					}}
				  >
					<List.Item.Meta
					  title={<span className="font-extrabold">{item.name}</span>}
					  description={item.lastMessage}
					/>
					<div className=''>
						<div>{item.time}</div>
						{/* <div className='w-full flex justify-center'><div className='rounded-full bg-blue-600 w-4 h-4'></div></div> */}
						<div className='h-4'></div>
					</div>
				  </List.Item>
				)}
			  />
			</InfiniteScroll>
		  </div>
		</div>
  
		<div className="!h-screen   col-span-2  flex justify-center items-center">
		  {!activeDialog ? (
			<div className="text-gray-500">Выберите диалог или создайте новый</div>
		  ) : (
			<>
			<div className="mt-36 p-4 col-span-2  w-full flex justify-center flex-wrap ">
        {!true ? (
          <div className="w-full flex flex-wrap flex-col ">
            <CommentNewTeacher files={[]} refetch={refetch} />
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