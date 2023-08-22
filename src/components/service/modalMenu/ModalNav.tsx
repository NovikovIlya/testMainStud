import { Col, Row } from 'antd'
import { useNavigate } from 'react-router-dom'

type TypeModalProps = {
	close: () => void
}

export const ModalNav = ({ close }: TypeModalProps) => {
	const navigate = useNavigate()
	const handleNavigate = (url: string) => {
		close()
		navigate(url)
	}
	return (
		<Row className="h-screen">
			<Col span={8}>
				<div
					onClick={() => handleNavigate('/services/aboutMe/aboutMe')}
					className=" h-28 cursor-pointer flex items-center justify-center hover:bg-[#65A1FA] hover:text-white "
				>
					Обо мне
				</div>
			</Col>
			<Col span={8}>
				<div
					onClick={() => handleNavigate('/services/schedule/schedule')}
					className="border-solid border-y-0 border-x border-[#B3B3B3] h-28 cursor-pointer flex items-center justify-center hover:bg-[#65A1FA] hover:text-white "
				>
					Расписание
				</div>
			</Col>
			<Col span={8}>
				<div
					onClick={() => handleNavigate('/services/session/session')}
					className=" h-28 cursor-pointer flex items-center justify-center hover:bg-[#65A1FA] hover:text-white "
				>
					Сессия
				</div>
			</Col>
		</Row>
	)
}
