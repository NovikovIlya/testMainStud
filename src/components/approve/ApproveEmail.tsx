import { useEffect } from 'react'
import { FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../store'
import { approveEmail } from '../../store/creators/MainCreators'
import { Layout } from '../layout/Layout'

interface IApproveProps {
	changeIsLogin: (IsLogIn: boolean) => void
}

export const ApproveEmail: FC<IApproveProps> = ({ changeIsLogin }) => {
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	useEffect(() => {
		console.log(searchParams.get('id'), searchParams.get('hash'))
		if (searchParams.get('id') !== null && searchParams.get('hash') !== null) {
			dispatch(
				approveEmail({
					id: searchParams.get('id'),
					hash: searchParams.get('hash')
				})
			)
			changeIsLogin(false)
			navigate('/profile')
		}
	})
	return (
		<Layout>
			<div className="p-32">Почта подтверждена</div>
		</Layout>
	)
}
