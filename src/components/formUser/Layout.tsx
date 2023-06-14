import React, { ReactNode } from 'react'

type TypeLayoutProps = {
	title: string
	descriptions: string
	children: ReactNode
}

export const Layout = ({ descriptions, title, children }: TypeLayoutProps) => {
	return (
		<div className="w-full flex justify-center min-h-screen">
			<div className="container max-w-2xl flex flex-col items-center justify-center  p-5">
				<h2 className="text-center font-bold border-solid border-0 border-b-2 border-[#3073D7] pb-2">
					{title}
				</h2>

				<p className="mt-8 text-center font-bold px-7">{descriptions}</p>
				{children}
			</div>
		</div>
	)
}
