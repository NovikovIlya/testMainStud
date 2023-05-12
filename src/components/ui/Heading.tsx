import React, { AllHTMLAttributes, FC, PropsWithChildren } from 'react'

export const Heading: FC<
	PropsWithChildren<AllHTMLAttributes<HTMLDivElement>>
> = ({ children, ...rest }) => {
	return <div {...rest}>{children}</div>
}
