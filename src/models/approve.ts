import { AllHTMLAttributes } from "react"

export interface cardProps {
	buttonEffect: () => void
	closeEffect: () => void
	withDots: boolean
	mainTittle: string
	secondTittle: AllHTMLAttributes<HTMLSpanElement>
	buttonText: string
	buttonBgBlue: boolean
}