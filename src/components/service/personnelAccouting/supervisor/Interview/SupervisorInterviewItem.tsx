import { Button, ConfigProvider, Modal } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { InterviewItemType } from '../../../../../store/reducers/type'
import { setCurrentInterview } from '../../../../../store/reducers/CurrentInterviewSlice'
import { useLazyGetInterviewViewQuery } from '../../../../../store/api/serviceApi'

export const SupervisorInterviewItem = ( props : InterviewItemType ) => {

  const [getInterview, result] = useLazyGetInterviewViewQuery()

  const [isUnsuccessModalOpen, setIsUnsuccessModalOpen] = useState(false)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const date = props.date
  const spaceIndex = date.indexOf(' ');
  const dateSplited = date.substring(0, spaceIndex);
  const timeSplited = date.substring(spaceIndex + 1);

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            boxShadow: '0 0 19px 0 rgba(212, 227, 241, 0.6)'
          }
        }}
      >
        <Modal
          bodyStyle={{ padding: 53 }}
          centered
          open={isUnsuccessModalOpen}
          onCancel={() => {
            setIsUnsuccessModalOpen(false)
          }}
          title={null}
          footer={null}
          width={407}
        >
          <p className="font-content-font font-normal text-black text-[16px]/[20px] text-center">
            Произошла ошибка или нет ответа от сервера.
          </p>
          <div className="mt-[40px] flex gap-[12px]">
            <Button
              className="ml-auto mr-auto"
              type="primary"
              onClick={() => {
                setIsUnsuccessModalOpen(false)
              }}
            >
              ОК
            </Button>
          </div>
        </Modal>
      </ConfigProvider>
      <div className="w-full flex bg-white p-5 items-center">
        <span className="w-[25%] ">{props.job_grade}</span>
        <span className="w-[20%] ml-[2%] ">{props.name}</span>
        <span className="w-[8%] ">
              {dateSplited}
          {timeSplited}
            </span>
        <span className="w-[8%] ml-[1%] ">{props.type}</span>
        <div className=" w-[34%] ml-[2%] flex items-center justify-evenly">
          {props.status === "OFFLINE" && (
            <button
              className="opacity-[100%]">
            </button>
          )}
          {props.status === "ONLINE_ACTIVE" && (
            <button
              className="bg-[#3073D7] text-white font-content-font cursor pointer font-normal text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[24px] border-0"
              onClick={() => {
                const MeetingUrl = props.url
                window.open(MeetingUrl, '_blank')
              }}
            >
              Подключится
            </button>
          )}
          {props.status === "ONLINE_INACTIVE" && (
            <button
              className="bg-[#3073D7] opacity-[32%] text-white font-content-font font-normal text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[24px] border-0">
              Осталось {props.time_left}
            </button>
          )}
          <Button
            onClick={() => {
              getInterview(props.id)
                .unwrap()
                .then(result => {
                  dispatch(setCurrentInterview(result))
                  console.log(result)
                  navigate('/services/personnelaccounting/supervisor/invitation/seekerinfo')
                })
                .catch(error => {
                  console.error(error); // Логируем ошибку для отладки
                  setIsUnsuccessModalOpen(true); // Открываем модальное окно при ошибке
                });
            }}
            className="font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[24px] border-black"
          >
            Подробнее
          </Button>
        </div>
      </div>
    </>

  );
};