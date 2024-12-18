import { SearchInputIconSvg } from "../../../../../assets/svg/SearchInputIconSvg"
import React, {useState} from "react";
import {useGetTestResultsQuery, useSetTestResultHiddenMutation} from "../../../../../store/api/serviceApi";
import {LoadingOutlined} from "@ant-design/icons";
import {Button, ConfigProvider, Modal, Spin} from "antd";
import {WarningModalIconSvg} from "../../../../../assets/svg/WarningModalIconSvg";
import {DeleteIconLaborSvg} from "../../../../../assets/svg/DeleteIconLaborSvg";
import {SignedItemType} from "../../../../../store/reducers/type";
import {SuccessModalIconSvg} from "../../../../../assets/svg/SuccessModalIconSvg";
import {useAlert} from "../../../../../utils/Alert/AlertMessage";
import {DeleteIconHoverLaborSvg} from "../../../../../assets/svg/DeleteIconHoverLaborSvg";


export const Signed = () => {

    const { openAlert } = useAlert()

    const [reLoading, setReLoading] = useState(false);
    const [isApproveSignedModalOpen, setIsApproveSignedModalOpen] = useState(false)
    const [isSuccessSignedModalOpen, setIsSuccessSignedModalOpen] = useState(false)

    let { data: signed_data = [],  isLoading : loading, refetch } = useGetTestResultsQuery({signed : true});

    const [setSeekerHidden, {isLoading}] = useSetTestResultHiddenMutation()

    interface modalProps {
        id: number;
    }

    const handleRefresh = async () => {
        setReLoading(true); // Устанавливаем состояние загрузки
        await refetch(); // Ждем завершения рефреша
        setReLoading(false); // Сбрасываем состояние загрузки

        setIsSuccessSignedModalOpen(true)
    };

    const ApproveSignedModal = ( props : modalProps ) => {
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
                                    onClick={async () => {
                                        try {
                                            setIsApproveSignedModalOpen(false)
                                            await setSeekerHidden({subStageId: props.id})
                                            await handleRefresh()
                                            setIsSuccessSignedModalOpen(true)
                                        } catch (error: any) {
                                        openAlert({ type: 'error', text: 'Извините, что-то пошло не так...' })
                                    }
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

    const SuccessSignedModal = () => {
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
                        open={isSuccessSignedModalOpen}
                        onCancel={() => {
                            setIsSuccessSignedModalOpen(false)
                        }}
                        title={null}
                        footer={null}
                        width={407}
                    >
                        <div className='flex items-center justify-center flex-col px-[15px] pt-[50px] pb-[30px] gap-[34px]'>
                            <SuccessModalIconSvg></SuccessModalIconSvg>
                            <p
                                className="text-center font-content-font font-normal flex items-start text-black text-[16px]/[20px]">
                                Соискатель успешно удалён
                            </p>
                            <Button
                                className="rounded-[54.5px] border-black text-[14px] h-[40px] w-full py-[13px]"
                                type="default"
                                onClick={() => {
                                    setIsSuccessSignedModalOpen(false)
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

    const SignedItem = ( props: SignedItemType ) => {
        return (
            <>
                <ApproveSignedModal id={props.id}/>
                <SuccessSignedModal></SuccessSignedModal>
                <div className="w-[100%] h-[80px] bg-white flex flex-row items-center">
                    <div className="ml-[1.5%] w-[62%] flex flex-row">
                    <span className="w-[38%] text-[16px] text-[##000000] font-normal">
                        {props.seeker.lastname + ' ' + props.seeker.firstname + ' ' + props.seeker.middlename}
                    </span>
                        <span className="w-[54%] text-[16px] text-[##000000] font-normal">
                        {props.post}
                    </span>
                        <span className="w-[8%] text-[16px] text-[##000000] font-normal">
                        {props.testPassed === true ? 'Пройдено' : 'Не пройдено'}
                    </span>
                    </div>
                    <div className="w-[36.5%] flex ">
                        <button
                            className="ml-[50%] gap-[12px] flex bg-[#fff] border-0 cursor-pointer group"
                            onClick={() => {
                                setIsApproveSignedModalOpen(true)
                            }}
                        >
                            <span
                                className="group-hover:hidden"
                            >
                                <DeleteIconLaborSvg></DeleteIconLaborSvg>
                            </span>
                            <span
                                className="hidden group-hover:block"
                            >
                                <DeleteIconHoverLaborSvg></DeleteIconHoverLaborSvg>
                            </span>
                            <span
                                className="group-hover:text-[#EA0000] group-hover:opacity-[50%] text-[16px] text-[#999999] font-normal">Удалить</span>
                        </button>
                    </div>
                </div>
            </>
        )
    }

    if (loading || reLoading || isLoading) {
        return (
            <>
                <div className="w-full h-full flex items-center">
                    <div className="text-center ml-auto mr-auto">
                        <Spin
                            indicator={<LoadingOutlined style={{fontSize: 36}} spin/>}
                        ></Spin>
                        <p className="font-content-font font-normal text-black text-[18px]/[18px]">
                            Идёт загрузка...
                        </p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="w-full px-[53px] pt-[140px] flex flex-col">
                <h2 className="text-[28px] text-black font-normal">Подписанные</h2>
                <label className="relative mt-[52px] flex flex-row>">
                    <div className="absolute left-[16px] top-[7px] cursor-pointer">
                        <SearchInputIconSvg/>
                    </div>
                    <input type="text"
                           className="text-[16px] focus:outline-0 h-[32px] w-[500px] border-[#0000001A] border-[1px] pl-[46px] px-[17px] rounded-[5px]"
                           placeholder="Поиск по ФИО"
                    />
                </label>
                <div>
                    <div className=" flex flex-row mt-[42px]">
                        <div className="ml-[1.5%] w-[62%] flex flex-row">
                            <span className="w-[38%] text-[14px] text-[#626364] font-normal">Соискатель</span>
                            <span className="w-[54%] text-[14px] text-[#626364] font-normal">Должность</span>
                            <span className="w-[8%] text-[14px] text-[#626364] font-normal">Результат</span>
                        </div>
                        <div className="w-[36.5%]"></div>
                    </div>
                    <div className="mt-[16px] gap-[12px] flex flex-col">
                        {signed_data.map(item => (
                            <SignedItem {...item} key={item.id}></SignedItem>
                        ))} 
                    </div>
                </div>
            </div>
        </>
    );
};