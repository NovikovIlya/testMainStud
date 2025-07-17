import { Button, Modal, Spin } from 'antd'
import Title from 'antd/es/typography/Title'
import { t } from 'i18next'
import React from 'react'

import { useAppSelector } from '../../store'
import { useGetQrCodeQuery } from '../../store/api/qrcode/QrCodeSlice'

const QrCodeComponent = ({ isModalOpen, handleOk, handleCancel, phone }: any) => {
	const user = useAppSelector(state => state.auth.user)
	const phoneWithoutPlus = user?.phone ? user.phone.replace('+', '') : ''

	const { data, refetch, isFetching, isError, error,isLoading } = useGetQrCodeQuery(phoneWithoutPlus, {
		// pollingInterval: 20000,
		// skipPollingIfUnfocused: true,
	})

	const handleRefresh = () => {
		refetch()
	}

	const getErrorMessage = () => {
		if (error && 'status' in error && error.status === 400) {
			return t('error_foreign_number') || 'Вероятно иностранный номер'
		}
		if (error && 'status' in error && error.status === 403) {
			return t('error_not_kfu_number') || 'Номер не является номером телефона пользователя КФУ'

		}
		// Стандартное сообщение если ничего не подошло
		return t('error_loading_qr') || 'Error loading QR code'
	}

	return (
		<Modal
			footer={null}
			centered
			closable={{ 'aria-label': 'Custom Close Button' }}
			open={isModalOpen}
			onOk={handleOk}
			onCancel={handleCancel}
		>
			<div className="flex justify-center mt-[20px]">
				<Title level={1}>{t('qrcode1')}</Title>
			</div>

			{isError ? 
            (
				<div className="flex justify-center text-red-500 p-4 text-center">{getErrorMessage()}</div>
			) :
            isLoading ?
              <div className='flex justify-center h-[50px]'><Spin></Spin></div> 
            : 
              (<Spin spinning={isFetching}><div className="flex justify-center">
					<img alt="qrcode" className="max-w-[100%] " src={data} />
				</div></Spin>
			)}

			<div className="flex px-6 mb-2">
				<Button
					loading={isFetching}
					className="w-full !rounded-[20px] mb-[12px]"
					type="primary"
					size="large"
					onClick={handleRefresh}
				>
					{t('refresh')}
				</Button>
			</div>
		</Modal>
	)
}

export default QrCodeComponent
