import { Button, Modal } from 'antd'
import React from 'react'
import { useGetQrCodeQuery } from '../../store/api/qrcode/QrCodeSlice'
import { useAppSelector } from '../../store'
import Title from 'antd/es/typography/Title'
import { t } from 'i18next'

const QrCodeComponent = ({ isModalOpen, handleOk, handleCancel, phone }: any) => {
    const user = useAppSelector(state => state.auth.user)
    const phoneWithoutPlus = user?.phone ? user.phone.replace("+", "") : "";
    console.log('user', user)
    
    const { data, refetch,isFetching } = useGetQrCodeQuery(phoneWithoutPlus, {
        // pollingInterval: 20000,
        // skipPollingIfUnfocused: true,
    })
    console.log('data', data)

    const handleRefresh = () => {
        refetch()
    }

    return (
        <Modal
            footer={null}
          
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <div className='flex justify-center m'><Title level={1}>{t('qrcode1')}</Title></div>
            <div className='%'><img className='max-w-[100%]' src={data} /></div>
            <div className='flex px-6 mb-2'>
                <Button 
                    loading={isFetching}
                    className='w-full !rounded-[20px]' 
                    type='primary' 
                    size='large'
                    onClick={handleRefresh}
                >
                    {t('refresh')}
                </Button>
            </div>
        </Modal>
    )
}

export default QrCodeComponent