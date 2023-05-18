import { Button } from 'antd'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { approveApi } from '../../store/service/ApproveService'
import { Layout } from '../layout/Layout'

export const ApproveEmail = () => {
	const [searchParams] = useSearchParams()
	console.log('render')

	const [approve] = approveApi.useApproveEmailMutation()
	useEffect(() => {
		approve({
			id: searchParams.get('id'),
			hash: searchParams.get('hash')
		})
	}, [])
	return (
		<Layout>
			<div className="p-32">
				Почта подтверждена
				<Button
					onClick={() => {
						approve({
							id: searchParams.get('id'),
							hash: searchParams.get('hash')
						})
					}}
				>
					Approve
				</Button>
			</div>
		</Layout>
	)
}
