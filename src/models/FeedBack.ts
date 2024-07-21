import {RcFile} from "antd/es/upload";
import { ReactNode } from "react";

export interface FeedBackDataWithoutImage {
    email: string
    message: string
}


export interface FeedBackData {
    email: string
    message: string
    image: Blob | RcFile
}



export type TypeFeedbackForm = {
    closeWindow: () => void
    setIsFirstWindow: (step: boolean) => void
}

export type TypeFirstWindow = {
    closeWindow: () => void
    setIsFirstWindow: (step: boolean) => void
}


export type TypeQuestion = {
    text: string
    icon: ReactNode
}

export type TypeFeedbackWindow = {
    closeWindow: () => void
}