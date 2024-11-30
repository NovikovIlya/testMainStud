import React, {useState} from 'react';
import {Button, ConfigProvider, Modal} from "antd";
import {useSetTestResultSignedMutation} from "../../../../../store/api/serviceApi";
import {SignedItemType} from "../../../../../store/reducers/type";


export const TestResultItem = ( props: SignedItemType ) => {

    const [isTestResultApproveModalOpen, setIsTestResultApproveModalOpen] = useState(false)

    const [setSeekerSigned] = useSetTestResultSignedMutation()

    const TestResultApproveModal = () => {
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
                        open={isTestResultApproveModalOpen}
                        onCancel={() => {
                            setIsTestResultApproveModalOpen(false)
                        }}
                        title={null}
                        footer={null}
                        width={407}
                    >
                        <div className='flex flex-col px-[15px] pt-[50px] pb-[30px] gap-[34px]'>
                            <p
                                className="text-center font-content-font font-normal flex items-start text-black text-[16px]/[20px]">
                                Вы действительно хотите отметить, что соискатель подписал все необходимые документы?
                            </p>
                            <div className="flex flex-row gap-[12px] px-[20px]">
                                <Button
                                    className="rounded-[54.5px] border-black text-[14px] h-[40px] w-full py-[13px]"
                                    type="default"
                                    onClick={() => {
                                        setIsTestResultApproveModalOpen(false)
                                    }}
                                >
                                    Нет
                                </Button>
                                <Button
                                    className="rounded-[54.5px] text-[14px] h-[40px] w-full py-[13px]"
                                    type="primary"
                                    onClick={() => {
                                        setIsTestResultApproveModalOpen(false)
                                        setSeekerSigned({ subStageId: props.id })
                                    }}
                                >
                                    Да
                                </Button>
                            </div>
                        </div>
                    </Modal>
                </ConfigProvider>
            </>
        )
    }

    return (
        <>
            <TestResultApproveModal></TestResultApproveModal>
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
                        className=" hover:opacity-[100%] opacity-[80%] ml-[45%] gap-[12px] text-[16px] flex border-[1px] border-solid black cursor-pointer bg-white px-[24px] py-[8px] rounded-[5px]"
                        onClick={() => {
                            setIsTestResultApproveModalOpen(true)
                        }}
                    >
                        Подписано
                    </button>
                </div>
            </div>
        </>
    );
};