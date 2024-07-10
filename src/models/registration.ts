import { IError } from "../api/types"

export interface IButtonsProps {
	check: boolean
	setCheck: (value: boolean) => void
}

export interface IInputsProps {
	email: string
	error: IError | null
	changeEmail: (email: string) => void
}

export interface IPasswordProps {
	error: IError | null
}

export interface IRegProps {
	changeEmail: (email: string) => void
	email: string
}