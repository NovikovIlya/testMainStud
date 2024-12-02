import {
    Button, Divider, Form, Input, List, Modal, Segmented, Select, Skeleton, Spin
} from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { useAppSelector } from '../../../../store'
import {
    useGetChatQuery, useGetOneGroupQuery, useSendMessageMutation
} from '../../../../store/api/practiceApi/practiceTeacher'
import { setText } from '../../../../store/reducers/notificationSlice'

import { CommentNewTeacher } from './CommentTeacher'
import InputText from './InputText'
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'
import InfiniteScroll from 'react-infinite-scroll-component';
import TextArea from 'antd/es/input/TextArea'
import { useTranslation } from 'react-i18next'

export const ViewMessage = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [initialLoading, setInitialLoading] = useState(true);
	const [dialogs, setDialogs] = useState<any>([]);
	const {t,i18n} = useTranslation()
	const [value, setValue] = useState(t('all'));
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [activeDialog, setActiveDialog] = useState<any>(null);

	
	
	useEffect(() => {
	  loadInitialData();
	}, []);
  
	const loadInitialData = async () => {
	  setInitialLoading(true);
	  // Simulate initial API call
	  setTimeout(() => {
		const initialDialogs = Array(10).fill(null).map((_, index) => ({
		  id: index.toString(),
		  name: `Пользователь ${index + 1}`,
		  lastMessage: `Последнее сообщение ${index + 1}`,
		  time: `12:${(index + 1).toString().padStart(2, '0')}`,
		  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`
		}));
		setDialogs(initialDialogs);
		setInitialLoading(false);
	  }, 1000);
	};
  
	const loadMoreData = () => {
	  if (loading) return;
	  
	  setLoading(true);
	  // Simulate API call for more data
	  setTimeout(() => {
		const newDialogs = Array(5).fill(null).map((_, index) => ({
		  id: (dialogs.length + index).toString(),
		  name: `Пользователь ${dialogs.length + index + 1}`,
		  lastMessage: `Последнее сообщение ${dialogs.length + index + 1}`,
		  time: `12:${(dialogs.length + index + 1).toString().padStart(2, '0')}`,
		  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${dialogs.length + index}`
		}));
		setDialogs([...dialogs, ...newDialogs]);
		setLoading(false);
	  }, 1000);
	};
  
	const showModal = () => setIsModalOpen(true);
	const handleOk = () => setIsModalOpen(false);
	const handleCancel = () => setIsModalOpen(false)
	const onFinish =()=>{
		handleCancel()
	}
	const clickTextArea = ()=>{

	}
	const refetch = ()=>{

	}
  
	if (initialLoading) {
	  return (
		<div className="screen fixed z-[10000000]">
			<div className="loader">
				<div className="inner one"></div>
				<div className="inner two"></div>
				<div className="inner three"></div>
			</div>
		</div>
	  );
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
			  loader={loading && <Skeleton className='pl-4 pt-4' paragraph={{ rows: 1 }} active />}
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
					<div>{item.time}</div>
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
        {!false ? (
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
            <Skeleton active />
            <Skeleton.Input active className="mt-10 mb-5 !h-[400px] !w-[500px]" />
            <Skeleton.Input active className="mt-10 !h-14 !w-[500px]" />
          </>
        )}
     		 </div></>
		  )}
		</div>
  
		<Modal 
			className='p-12'
		  title="Выберите роль" 
		  open={isModalOpen} 
		  onOk={handleOk} 
		  onCancel={handleCancel} 
		  footer={null}
		>
		  <Form   
		    labelCol={{ span: 6 }}
    		wrapperCol={{ span:18 }} 
			form={form}
			onFinish={onFinish}
			style={{ maxWidth: 600 }}
			>
		  	<Form.Item  className='mt-6'  label="Студент" name={'student'}>
		  		<Select options={  [{ value: 'jack', label: 'Jack' }]} placeholder={'Введите ФИО'} />
			</Form.Item>
			<Form.Item   label="Сотрудник" name={'teacher'}>
		  		<Select placeholder={'Введите ФИО'}/>
			</Form.Item>
			<Form.Item   label="Аспирант" name={'graduate'}>
		  		<Select placeholder={'Введите ФИО'}/>
			</Form.Item>
			<Form.Item   label="Сообщение" name={'text'}>
				<TextArea  placeholder='Введите текст сообщения' />
			</Form.Item>
			
			<div className='w-full flex justify-center'><Button htmlType='submit' type='primary'>Создать диалог</Button></div>
		  </Form>
		</Modal>
	  </div>
	);
  }