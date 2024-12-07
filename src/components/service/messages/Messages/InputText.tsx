import { SendOutlined } from '@ant-design/icons'
import { Button, Form } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useRef, useState } from 'react'

const InputText = ({files,text='',clickTextArea,isModal=false }: any) => {
   const [value,setValue] = useState('')
   const textAreaRef = useRef<HTMLTextAreaElement>(null)

   useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
    }
  }, [value])


    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation(); 
        if(isModal ) {
            if( value==='' || Object.values(files).every(value => !value )){
                alert('Напишите комментарий к работе и выберите хотя бы один файл')
                return
            }
        }
        
    };

	return (
		<>
			<Form.Item className=" w-full" name={'textArea'}>
				<TextArea
					maxLength={75}
					placeholder="Напишите сообщение собеседнику!"
					className={`${isModal ? `rounded-[10px_0px_0px_10px]` : `rounded-[10px_0px_0px_10px]` }   !h-[54px]`}
					onClick={clickTextArea}
                    value={text}
                    onChange={(e) => setValue(e.target.value)}
					required
				/>
			</Form.Item>
			<Button
				htmlType="submit"
				icon={<SendOutlined />}
				className="rounded-[0px_10px_10px_0px] h-[54px] "
				size="large"
                onClick={handleClick}
			/>
		</>
	)
}

export default InputText
