import { message } from 'antd'
import React, { ReactNode, createContext, useContext, useRef, useState } from 'react'
import { InfoAlertIconSvg } from "../../assets/svg/InfoAlertIconSvg"
import { KrestikSvg } from '../../assets/svg/KrestikSvg'
import './AlertProvider.css'
import {ErrorAlertIconSvg} from "../../assets/svg/ErrorAlertIconSvg";
import {SuccessAlertIconSvg} from "../../assets/svg/SuccessAlertIconSvg";

// Определяем интерфейс для пропсов openAlert
interface OpenAlertProps {
    type: 'info' | 'error' | 'success' | 'warning'
    text: string
}

// Определяем интерфейс для контекста
interface AlertContextType {
    openAlert: (props: OpenAlertProps) => void
}

// Создаем контекст с начальным значением null
const AlertContext = createContext<AlertContextType | null>(null)

// Создаем провайдер
interface AlertProviderProps {
    children: ReactNode
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
    const [messageApi, contextHolder] = message.useMessage()
    const [keys, setKeys] = useState<string[]>([]) // тут храню ключи

    const openAlert = ({ type, text }: OpenAlertProps) => {
        const key = `msg_${Date.now()}` // генерю ключ

        setKeys((prevKeys) => [...prevKeys, key]) // сохраняю ключ

        messageApi.open({
            key: key,
            type,
            content: (
                <div className="alert-message w-[100%]">
                    {(type === 'info') && (
                        <div className="left-side-icon info-side">
                            <InfoAlertIconSvg />
                        </div>
                    )}
                    {(type === 'error') && (
                        <div className="left-side-icon error-side">
                            <ErrorAlertIconSvg />
                        </div>
                    )}
                    {(type === 'success') && (
                        <div className="left-side-icon success-side">
                            <SuccessAlertIconSvg />
                        </div>
                    )}
                    {(type === 'warning') && (
                        <div className="left-side-icon warning-side">
                            <InfoAlertIconSvg />
                        </div>
                    )}
                    <div className="w-[80%]">
                        {text}
                    </div>
                    <div className="krestik-wrapper"
                         onClick={() => {
                             messageApi.destroy(key)
                             setKeys((prevKeys) => prevKeys.filter(k => k !== key)) // удаляю ненужный ключ
                         }}
                    >
                        <KrestikSvg />
                    </div>
                </div>
            ),
            duration: 5,
            icon: null
        })
    }

    return (
        <AlertContext.Provider value={{ openAlert }}>
            {contextHolder}
            {children}
        </AlertContext.Provider>
    )
}

// Хук для использования контекста
export const useAlert = (): AlertContextType => {
    const context = useContext(AlertContext)
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider')
    }
    return context
}