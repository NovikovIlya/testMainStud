import { BookOutlined, TagOutlined } from '@ant-design/icons'
import { Button, Col, Input, Radio, Row, Typography } from 'antd'
import { RadioChangeEvent } from 'antd/lib'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../store'

type TypeModalProps = {
	close: () => void
}

export const ModalNav = ({ close }: TypeModalProps) => {
	const navigate = useNavigate()
	const { t } = useTranslation()
	const handleNavigate = (url: string) => {
		close()
		navigate(url)
	}
	const onChange = (e: RadioChangeEvent) => {
		console.log(e.target.value)
	}
	const role = useAppSelector(
		state => state.Profile.profileData.CurrentData?.roles
	)
	if (!role) return <></>
	const isStudent = role[0].type === 'STUD'
	return (
		<Row>
			<Col span={24} className="mb-9">
				<Typography.Text className="text-[#1F5CB8] text-2xl font-bold leading-loose">
					{t('OurServices')}
				</Typography.Text>
			</Col>
			<Col span={20}>
				<Input.Search size="large" placeholder={t('SearchFavorite')} />
			</Col>
			<Col offset={1} span={3} className="flex justify-center items-center">
				<Button
					type="text"
					icon={<TagOutlined />}
					className="text-[#1F5CB8] text-base font-semibold leading-relaxed flex items-center justify-center"
				>
					{t('Favorites')}
				</Button>
			</Col>
			<Col span={24} className="mt-8">
				<div
					className={clsx('radio mb-16 w-full h-full ', !isStudent && 'hidden')}
				>
					<Radio.Group
						onChange={onChange}
						defaultValue="monday"
						buttonStyle="solid"
						className="flex gap-1 justify-between h-9"
					>
						<Radio.Button
							className="rounded-full bg-transparent h-full flex items-center justify-center text-base w-60"
							value="monday"
						>
							{t('ToApplicant')}
						</Radio.Button>
						<Radio.Button
							className="rounded-full h-full flex items-center justify-center text-base bg-transparent w-60"
							value="tuesday"
						>
							{t('ToStudent')}
						</Radio.Button>
						<Radio.Button
							className="rounded-full h-full flex items-center justify-center text-base bg-transparent w-60"
							value="wednesday"
						>
							{t('Employee')}
						</Radio.Button>
						<Radio.Button
							className="rounded-full h-full flex items-center justify-center text-base bg-transparent w-60"
							value="thursday"
						>
							{t('ToTeacher')}
						</Radio.Button>
						<Radio.Button
							className="rounded-full h-full flex items-center justify-center text-base bg-transparent w-60"
							value="friday"
						>
							{t('ToWorker')}
						</Radio.Button>
						<Radio.Button
							className="rounded-full h-full flex items-center justify-center text-base bg-transparent w-60"
							value="saturday"
						>
							{t('ToSchool')}
						</Radio.Button>
					</Radio.Group>
				</div>
			</Col>
			<Col span={8} className="bg-white">
				<div
					onClick={() => handleNavigate('/services/aboutMe/aboutMe')}
					className=" h-28 cursor-pointer flex items-center justify-center hover:bg-[#65A1FA] hover:text-white "
				>
					{t('AboutMe')}
				</div>
			</Col>
			<Col span={8} className={clsx('bg-white', !isStudent && 'hidden')}>
				<div
					onClick={() => handleNavigate('/services/schedule/schedule')}
					className="border-solid border-y-0 border-x border-[#B3B3B3] h-28 cursor-pointer flex items-center justify-center hover:bg-[#65A1FA] hover:text-white "
				>
					{t('Schedule')}
				</div>
			</Col>
			<Col span={8} className={clsx('bg-white', !isStudent && 'hidden')}>
				<div
					onClick={() => handleNavigate('/services/session/session')}
					className=" h-28 cursor-pointer flex items-center justify-center hover:bg-[#65A1FA] hover:text-white "
				>
					{t('Session')}
				</div>
			</Col>
			<Col span={8} className={clsx('bg-white', !isStudent && 'hidden')}>
				<div
					onClick={() => handleNavigate('/services/electronicBook/estimation')}
					className="border-solid border-b-0 border-t border-l-0 border-x-0 border-[#B3B3B3] h-28 cursor-pointer flex items-center justify-center hover:bg-[#65A1FA] hover:text-white "
				>
					{t('ElectronicBook')}
				</div>
			</Col>
		</Row>
	)
}
