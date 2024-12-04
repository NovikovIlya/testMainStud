import {
	AutoComplete,
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
import { useGetAllDialogsQuery, useGetEmployeesMessageQuery,  useGetStudentsMessaageQuery, useSendMessageChatMutation } from '../../../../store/api/messages/messageApi'

export const ViewMessage = () => {
	const [form] = Form.useForm();
	const [dialogs, setDialogs] = useState<any>([]);
	const {t,i18n} = useTranslation()
	const [value, setValue] = useState(t('all'));
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [activeDialog, setActiveDialog] = useState<any>(null);
	const [nameEmployee, setNameEmployee] = useState(null)
	const [nameStudent, setNameStudent] = useState(null)
	const {data:dataGetEmployees} = useGetEmployeesMessageQuery(nameEmployee,{skip: !nameEmployee})
	const {data:dataGetStudents} = useGetStudentsMessaageQuery(nameStudent,{skip: !nameStudent})
	const [page,setPage] = useState(0)
	const {data:dataAllDialogs,isLoading,isError,isFetching} = useGetAllDialogsQuery({page,size:15})
	const [sendMessage,{}] = useSendMessageChatMutation()

	useEffect(()=>{
		if(dataAllDialogs){
			setDialogs((prevDialogs:any) =>[...prevDialogs, ...dataAllDialogs])
		}
	},[dataAllDialogs])

	console.log('dataAllDialogs',dataAllDialogs)

  
	const loadMoreData = () => {
		if(isFetching || isLoading) return
		setPage(p=>p+1)
	  

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
			  <AutoComplete
					placeholder={'Введите ФИО'}
					onChange={setNameStudent}
					options={dataGetStudents?.map((student:any) => ({ value: student.name }))}
				/>
			</Form.Item>
			<Form.Item   label="Сотрудник" name={'teacher'}>
				<AutoComplete
					placeholder={'Введите ФИО'}
					onChange={setNameEmployee}
					options={dataGetEmployees?.map((employee:any) => ({ value: employee.name }))}
				/>
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