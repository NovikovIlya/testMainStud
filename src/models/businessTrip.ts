import { ReactNode } from "react"

export interface IProgressPart {
    step: number
}

export interface IStep {
    stepNumber: number
    nextStep: () => void
    previousStep: () => void
    availableLeftButton?: boolean
    availableRightButton?: boolean
}

export interface IProgressForm {
    step: number
    nextStep: () => void
    previousStep: () => void
    availableLeftButton?: boolean
    availableRightButton?: boolean
}

export interface IStepOne {
    nextStep: () => void
}

export interface ITitleForm {
    title: string
}

export interface IRowCardData {
    title: string
    data: string
}

export interface IWrapperForCardData {
    children: ReactNode
}