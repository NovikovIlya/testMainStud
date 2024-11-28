import {
    Button, Form, Input, Modal, Segmented, Skeleton, Spin
} from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import { useAppSelector } from '../../../../store'
import {
    useGetChatQuery, useGetOneGroupQuery, useSendMessageMutation
} from '../../../../store/api/practiceApi/practiceTeacher'
import { setText } from '../../../../store/reducers/notificationSlice'

import { CommentNewTeacher } from './CommentTeacher'
import InputText from './InputText'
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'

export const ViewMessage = () => {
	const path = useLocation()
	const id = path.pathname.split('/').at(-1)!
	const [files, setFiles] = useState<any>({
		report: null,
		diary: null,
		tasks: null
	})
	const [form] = Form.useForm()
	const {data: { students, isSentToDekanat, isReportExist } = {},isSuccess: isSuccessOrder,isFetching: isFetchingMyPractice,refetch: refetchAll} = useGetOneGroupQuery(id, { skip: !id })
	const { data: dataChat, isFetching: isFethcingChat, refetch } = useGetChatQuery('123')
	const [sendMessageApi, { isLoading }] = useSendMessageMutation()
	const [activeDialog, setActiveDialog] = useState<any>(null)
    const [value, setValue] = useState<any>('Все');
    const [isModalOpen, setIsModalOpen] = useState(false);

	const clickTextArea = () => {
		// refetch()
	}

	const onFinish = () => {
		
	}

    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };

	return (
		<Form form={form}>
			<Spin spinning={isFetchingMyPractice}>
				<section className=" animate-fade-in">
					<div className="grid grid-cols-3 gap-2">
						{/* Диалоги */}
						<div className="bg-white h-screen  shadow-xl ">
							{/* Блок добавления */}
							<div className="mt-36 ml-4">
								<Button onClick={showModal}><PlusCircleOutlined />Новый диалог</Button>
							</div>
                            <div className="mt-3 p-4 ">
								<Input placeholder='Поиск по сообщениям' prefix={<SearchOutlined />}/>
							</div>
                            <div className="mt-3 p-4 ">
                                <Segmented
                                    value={value} 
                                    options={['Все', 'Новые']}
                                    onChange={(value) => {
                                        setValue(value)
                                    }}
                                />
                            </div>


							{/* Список диалогов */}
							<div className="mt-4 grid grid-cols-1  ">
								{/* Один диалог */}
								<div
									onClick={() => {
										setActiveDialog(1)
									}}
                                    style={{borderBottom: '1px solid #E9EFF8'}}
									className={`${
										activeDialog === 1 ? 'bg-[#E9EFF8]' : ''
									} grid grid-cols-6 gap-2 px-5 py-6 cursor-pointer `}
								>
									<div className="col-span-4">
										<div className="font-extrabold">Собакевич Михаил Семенович</div>
										<div>Вышли срочно ваши отчеты</div>
									</div>

									<div className="col-span-2 ">
										<div className="flex justify-end">12:23</div>
									</div>
								</div>

								<div
									onClick={() => {
										setActiveDialog(2)
									}}
                                    style={{borderBottom: '1px solid #E9EFF8'}}
									className={`${
										activeDialog === 2 ? 'bg-[#E9EFF8]' : ''
									} grid grid-cols-6 gap-2 px-5 py-6 cursor-pointer `}
								>
									<div className="col-span-4">
										<div className="font-extrabold">Черепашкин</div>
										<div>Ниндзязович</div>
									</div>

									<div className="col-span-2 ">
										<div className="flex justify-end">12:43</div>
									</div>
								</div>

							</div>
						</div>

						{/* Чат */}
						<div className="h-screen col-span-2 p-4 w-full flex justify-center">
							{!isFethcingChat ? (
								<div className=" w-full  flex flex-wrap flex-col justify-between">
									<CommentNewTeacher files={files} dataChat={dataChat} refetch={refetch} />

									<Form form={form} className="flex  w-full flex-wrap " onFinish={onFinish}>
										<div className="flex w-full mt-4 ">
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
						</div>
					</div>
				</section>
                <Modal title="Создание диалога" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                </Modal>
			</Spin>
		</Form>
	)
}
