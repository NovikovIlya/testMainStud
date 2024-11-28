import React from 'react';
import {DeleteIconLaborSvg} from "../../../../../assets/svg/DeleteIconLaborSvg";
import {Button, ConfigProvider, Modal} from "antd";
import {useState} from "react";
import {useSetTestResultHiddenMutation} from "../../../../../store/api/serviceApi";

export const SignedItem = () => {

    const [isApproveSignedModalOpen, setIsApproveSignedModalOpen] = useState(false)

    const [setSeekerHidden] = useSetTestResultHiddenMutation()

    const ApproveSignedModal = () => {
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
                        centered
                        open={isApproveSignedModalOpen}
                        onCancel={() => {
                            setIsApproveSignedModalOpen(false)
                        }}
                        title={null}
                        footer={null}
                        width={407}
                    >
                        <div className='flex flex-col px-[15px] pt-[50px] pb-[30px] gap-[34px]'>
                            <p
                                className="text-center font-content-font font-normal flex items-start text-black text-[16px]/[20px]">
                                Вы действительно хотите удалить соискателя из этого раздела? При удалении он не будет отображаться ни в одном из разделов.
                            </p>
                            <Button
                                className="rounded-[54.5px] text-[14px] w-full py-[13px]"
                                type="primary"
                                onClick={() => {
                                    setIsApproveSignedModalOpen(false)
                                    setSeekerHidden({subStageId: 1})
                                    console.log('gayyy')
                                }}
                            >
                                Ок
                            </Button>
                        </div>
                    </Modal>
                </ConfigProvider>
            </>
        )
    }

    return (
        <>
            <ApproveSignedModal/>
            <div className="w-[100%] h-[80px] bg-white flex flex-row items-center">
                <div className="ml-[1.5%] w-[62%] flex flex-row">
                    <span className="w-[38%] text-[16px] text-[##000000] font-normal">Алексеев Дмитрий Иванович</span>
                    <span className="w-[54%] text-[16px] text-[##000000] font-normal">Специалист отдела развития сотрудничества</span>
                    <span className="w-[8%] text-[16px] text-[##000000] font-normal">Пройден</span>
                </div>
                <div className="w-[36.5%] flex ">
                    <button
                        className="ml-[50%] gap-[12px] flex bg-[#fff] border-0 cursor-pointer"
                        onClick={() => {
                            setIsApproveSignedModalOpen(true)
                        }}
                    >
                        <DeleteIconLaborSvg></DeleteIconLaborSvg>
                        <span className="text-[16px] text-[#999999] font-normal">Удалить</span>
                    </button>
                </div>
            </div>
        </>
    );
};