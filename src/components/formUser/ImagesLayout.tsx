import React, { FC, PropsWithChildren } from 'react'

import pencil from '../../assets/images/pencil.png'
import rectangle from '../../assets/images/rectangle.png'

export const ImagesLayout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<div className="h-full">
			{children}
			<div className="fixed flex top-0 right-0 left-0 h-full min-h-screen w-full overflow-y-hidden -z-40">
				<div className="absolute right-0">
					<img src={pencil} alt="" />
				</div>
				<div className="absolute left-0 bottom-0 -z-10">
					<img src={rectangle} alt="" />
				</div>
				<div className="absolute w-[600px] h-[600px] -z-20 bg-[#D6E3F7] left-0 bottom-0 translate-x-[-50%] translate-y-[50%]  rounded-full" />
			</div>
		</div>
	)
}
