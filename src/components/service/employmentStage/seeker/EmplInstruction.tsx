import { LoadingOutlined } from '@ant-design/icons'
import { Button, Spin } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../../../store'
import { setStageProgressAsReady } from '../../../../store/reducers/EmploymentProgressSlice'

export const EmplInstruction = (props: { respondId: number; stageId: number; stageName: string }) => {
	const { empData } = useAppSelector(state => state.employmentData)
	const foundStage = empData.stages.find(stage => stage.type === props.stageName)
	const dispatch = useDispatch()

	const [firstLoad, setFirstLoad] = useState<boolean>(true)
	const [secondLoad, setSecondLoad] = useState<boolean>(true)
	const [thirdLoad, setThirdLoad] = useState<boolean>(true)
	const [fourthLoad, setFourthLoad] = useState<boolean>(true)

	return (
		<>
			<div className="font-content-font font-normal text-black text-[16px]/[19.2px] flex flex-col">
				<div className="flex flex-col pointer-events-auto gap-[12px]">
					<span className="font-content-font font-normal text-black text-[16px]/[19.2px]">
						Посмотрите видео-инструктаж, а затем пройдите тест
					</span>
					<div className="overflow-hidden rounded-2xl w-[730px] h-[400px] items-center relative">
						{firstLoad ? (
							<div className="absolute top-0 left-0 right-0 bottom-0 bg-[#F5F8FB] z-10 text-center ml-auto mr-auto flex flex-col">
								<Spin className="my-auto" indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}></Spin>
							</div>
						) : (
							<></>
						)}
						<iframe
							width="100%"
							height="100%"
							src="https://rutube.ru/play/embed/90a608d867f646a2edddd9447299a5d9/?p=U2AqjyedJJuAdzoSe3kIiw"
							frameBorder="0"
							allow="clipboard-write; autoplay"
							webkitAllowFullScreen
							mozallowfullscreen
							allowFullScreen
							onLoad={() => {
								setFirstLoad(prev => false)
							}}
						></iframe>
					</div>
					<div className="overflow-hidden rounded-2xl w-[730px] h-[400px] items-center relative">
						{secondLoad ? (
							<div className="absolute top-0 left-0 right-0 bottom-0 bg-[#F5F8FB] z-10 text-center ml-auto mr-auto flex flex-col">
								<Spin className="my-auto" indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}></Spin>
							</div>
						) : (
							<></>
						)}
						<iframe
							width="100%"
							height="100%"
							src="https://rutube.ru/play/embed/4503bb06599a0090e9391a8e58e7f17b/?p=xgwVjgi8Hq8pfnrAVwehnQ"
							frameBorder="0"
							allow="clipboard-write; autoplay"
							webkitAllowFullScreen
							mozallowfullscreen
							allowFullScreen
							onLoad={() => {
								setSecondLoad(prev => false)
							}}
						></iframe>
					</div>
					<div className="overflow-hidden rounded-2xl w-[730px] h-[400px] items-center relative">
						{thirdLoad ? (
							<div className="absolute top-0 left-0 right-0 bottom-0 bg-[#F5F8FB] z-10 text-center ml-auto mr-auto flex flex-col">
								<Spin className="my-auto" indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}></Spin>
							</div>
						) : (
							<></>
						)}
						<iframe
							width="100%"
							height="100%"
							src="https://rutube.ru/play/embed/ec4b40a32d7feb115da5258ab729b9db/?p=Xq9rvH69Tnhs0YdWmwe2ow"
							frameBorder="0"
							allow="clipboard-write; autoplay"
							webkitAllowFullScreen
							mozallowfullscreen
							allowFullScreen
							onLoad={() => {
								setThirdLoad(prev => false)
							}}
						></iframe>
					</div>
					<div className="overflow-hidden rounded-2xl w-[730px] h-[400px] items-center relative">
						{fourthLoad ? (
							<div className="absolute top-0 left-0 right-0 bottom-0 bg-[#F5F8FB] z-10 text-center ml-auto mr-auto flex flex-col">
								<Spin className="my-auto" indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}></Spin>
							</div>
						) : (
							<></>
						)}
						<iframe
							width="100%"
							height="100%"
							src="https://rutube.ru/play/embed/543c7afafe1ce60d4069eb2677f956d3/?p=fexHgSJcDSghQCCS9d0wPA"
							frameBorder="0"
							allow="clipboard-write; autoplay"
							webkitAllowFullScreen
							mozallowfullscreen
							allowFullScreen
							onLoad={() => {
								setFourthLoad(prev => false)
							}}
						></iframe>
					</div>
				</div>
				<Button
					type="link"
					className="mt-[40px] w-[131px] bg-dasha-blue text-white no-underline rounded-[54.5px]"
					href={foundStage?.testLink}
					target="_blank"
				>
					Пройти тест
				</Button>
				<Button
					type="primary"
					className="rounded-[54.5px] mt-[40px] w-[131px]"
					onClick={() => {
						dispatch(setStageProgressAsReady(props.stageName))
					}}
				>
					Я прошёл тест
				</Button>
			</div>
		</>
	)
}
