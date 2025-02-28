import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { LargeLogoSVG } from '../../assets/svg/LargeLogoSVG'
import { Header } from '../layout/Header'

// import universityPicture from '../../../assets/images/universityView.png'
// import { StartPlaySVG, StopPlaySVG } from '../../../assets/svg'
// import mp4 from '../../../assets/video/Kfu.mp4'
// import mp4 from '../../../assets/mp4.mp4'
// import { Footer } from '../../layout/Footer'
import Styles from './AboutUniversity.module.scss'

const AboutUniversity = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const [play, changePlay] = useState(false)

	return (
		<div className="h-screen w-screen">
			<Header type="service" service="About University" />
			<div className="flex min-h-full pt-20">
				<div className="flex flex-col w-full min-h-screen">
					<div className="flex flex-col mx-6 my-20">
						<Button
							className={clsx('rounded-2xl border-solid border-black border-[1px] w-min h-auto mb-10', Styles.button)}
							onClick={() => navigate('/user')}
						>
							<div className="flex items-center">
								<ArrowLeftOutlined className={Styles.arrowStyles} />
								<span className="text-lg ml-2" style={{}}>
									{t('back')}
								</span>
							</div>
						</Button>
						<div className="flex justify-between w-full mb-20 max-lg:flex-col max-lg:items-center">
							<div className="flex flex-col w-5/12 max-lg:w-3/4 max-lg:mb-5 justify-center">
								<Typography.Title level={2} className="font-normal">
									{t('AboutTheUniversity')}
								</Typography.Title>

								<Typography.Title level={4} className="font-normal mt-1">
									{t('mission')}
								</Typography.Title>

								<div className="flex flex-col mt-4">
									<p className="leading-1 mb-2">{t('info')}</p>
								</div>
							</div>
							<img
								src="https://i.ibb.co/ZzGHbpZs/image.png"
								alt=""
								className="w-1/2 max-lg:w-3/4 rounded-lg shadow-xl  h-[400px] object-cover"
							/>
						</div>
						<div className='shadow bg-gray-100 rounded-md p-8 flex flex-col w-full mb-20 max-lg:flex-col max-lg:items-center'>
							<div className=" mx-auto flex flex-col gap-10 items-center">
								<LargeLogoSVG />
							</div>
							<span className="mx-auto mt-10  w-4/6 text-center">{t('aboutKFU')}</span>
						</div>
						<div className="relative m-auto min-[1100px]:w-[885px] w-[885px] min-[1100px]:h-[500px] h-[500px] max-[1100px]:hidden">
							{/* <div
						className="absolute right-32 bottom-16 z-10 bg-bluekfu w-[100px] min-[1100px]:w-[80px] min-[1100px]:h-[80px] h-[100px] cursor-pointer flex justify-center items-center rounded-full"
						onClick={() => {
							changePlay(!play)
						}}
					>
						{play ? <StopPlaySVG /> : <StartPlaySVG />}
					</div>  */}
							<Typography.Title
								level={2}
								style={{ color: 'white' }}
								className="absolute z-10 font-normal left-10 bottom-14 rounded-full"
							>
								Kazan <br /> Federal University
							</Typography.Title>
							<div className="left-0 right-0 bottom-0 top-0 absolute">
								{/* <ReactPlayer
							url={'https://www.youtube.com/watch?v=1eP1KLP6llE'}
							width={'100%'}
							height={'100%'}
							playing={play}
							controls={true}
							onEnded={() => changePlay(false)}
							onPause={() => play && changePlay(false)}
							onPlay={() => !play && changePlay(true)}
						/> */}
								<div className="flex justify-center">
									<iframe
										width="640"
										height="390"
										src={`https://www.youtube.com/embed/1eP1KLP6llE`}
										title="YouTube video player"
										frameBorder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen
									></iframe>
								</div>
							</div>
						</div>
					</div>
					{/* <Footer /> */}
				</div>
			</div>
		</div>
	)
}

export default AboutUniversity
