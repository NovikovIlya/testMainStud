import { SendOutlined } from '@ant-design/icons'
import { Button, Form } from 'antd'
import TextArea from 'antd/es/input/TextArea'

const InputText = ({files,text='',clickTextArea,isModal=false,form }: any) => {

	const handleKeyPress = (e: any) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault(); // Предотвращаем перенос строки
			form.submit(); // Вызываем отправку формы
		}
	};

	return (
		<>
			<Form.Item className=" w-full" name={'textArea'}>
				<TextArea
                     style={{resize: 'none' }}
					maxLength={75}
					placeholder="Напишите сообщение собеседнику!"
					className={`${isModal ? `rounded-[10px_0px_0px_10px]` : `rounded-[10px_0px_0px_10px]` }   !h-[54px]`}
					onClick={clickTextArea}
                    value={text}
					required
					onKeyPress={handleKeyPress}
				/>
			</Form.Item>
			<Button
				htmlType="submit"
				icon={<SendOutlined />}
				className="rounded-[0px_10px_10px_0px] h-[54px] "
				size="large"
               
			/>
            
		</>
    
	)
}

export default InputText
