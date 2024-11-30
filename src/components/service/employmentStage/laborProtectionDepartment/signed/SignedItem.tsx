import React from 'react';
import {DeleteIconLaborSvg} from "../../../../../assets/svg/DeleteIconLaborSvg";
import {Button, ConfigProvider, Modal} from "antd";
import {useState} from "react";
import {useSetTestResultHiddenMutation} from "../../../../../store/api/serviceApi";
import {WarningModalIconSvg} from "../../../../../assets/svg/WarningModalIconSvg";
import {SignedItemType} from "../../../../../store/reducers/type";

export const SignedItem = ( props: SignedItemType ) => {

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
                            <div className="w-full flex justify-center">
                                <WarningModalIconSvg></WarningModalIconSvg>
                            </div>
                            <p
                                className="text-center font-content-font font-normal flex items-start text-black text-[16px]/[20px]">
                                Вы действительно хотите удалить соискателя из этого раздела? При удалении он не будет отображаться ни в одном из разделов.
                            </p>
                            <div className="flex flex-row gap-[12px] px-[20px]">
                                <Button
                                    className="rounded-[54.5px] border-black text-[14px] h-[40px] w-full py-[13px]"
                                    type="default"
                                    onClick={() => {
                                        setIsApproveSignedModalOpen(false)
                                    }}
                                >
                                    Оставить
                                </Button>
                                <button
                                    className="cursor-pointer flex items-center justify-center border-[1px] border-solid outline-0 border-[#FF5A5A] text-white rounded-[54.5px] bg-[#FF5A5A] hover:bg-[#FF8181] text-[14px] h-[40px] w-full py-[13px]"
                                    onClick={() => {
                                        setIsApproveSignedModalOpen(false)
                                        setSeekerHidden({subStageId: props.id})
                                    }}
                                >
                                    Удалить
                                </button>
                            </div>
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
                    <span className="w-[38%] text-[16px] text-[##000000] font-normal">
                        {props.seeker.lastName + ' ' + props.seeker.firstName + ' ' + props.seeker.middleName}
                    </span>
                    <span className="w-[54%] text-[16px] text-[##000000] font-normal">
                        {props.post}
                    </span>
                    <span className="w-[8%] text-[16px] text-[##000000] font-normal">
                        {props.testPassed}
                    </span>
                </div>
                <div className="w-[36.5%] flex ">
                    <button
                        className="ml-[50%] gap-[12px] flex bg-[#fff] border-0 cursor-pointer group"
                        onClick={() => {
                            setIsApproveSignedModalOpen(true)
                        }}
                    >
                        <DeleteIconLaborSvg></DeleteIconLaborSvg>
                        <span className="group-hover:text-[#EA0000] group-hover:opacity-[70%] text-[16px] text-[#999999] font-normal">Удалить</span>
                    </button>
                </div>
            </div>
        </>
    );
};